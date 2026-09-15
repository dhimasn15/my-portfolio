import fs from 'node:fs/promises';
import path from 'node:path';
import { isGitHubContentConfigured, readGitHubContent, writeGitHubContent } from '@/app/lib/github-content';

const DB_PATH = path.join(process.cwd(), 'data', 'portfolio.json');

export async function getDB() {
  if (isGitHubContentConfigured()) {
    const { data } = await readGitHubContent();
    return data;
  }
  const raw = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(raw);
}

export async function saveDB(db) {
  if (isGitHubContentConfigured()) {
    await writeGitHubContent(db, 'Update portfolio content');
    return db;
  }
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2) + '\n', 'utf-8');
  return db;
}

const ALLOWED_COLLECTIONS = ['projects', 'experience', 'education', 'skills', 'messages'];

export function assertCollection(name) {
  if (!ALLOWED_COLLECTIONS.includes(name)) {
    throw new Error(`Unknown collection: ${name}`);
  }
}

function newId(prefix = 'id') {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

function slugify(text = '') {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 80) || `item-${Date.now().toString(36)}`;
}

async function uniqueSlug(items, base, ignoreId) {
  const taken = new Set(
    items.filter((i) => i.id !== ignoreId && i.slug).map((i) => i.slug)
  );
  if (!taken.has(base)) return base;
  let n = 2;
  while (taken.has(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

export async function listItems(collection) {
  assertCollection(collection);
  const db = await getDB();
  const items = Array.isArray(db[collection]) ? db[collection] : [];
  return [...items].sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

export async function getItem(collection, id) {
  const items = await listItems(collection);
  return items.find((i) => i.id === id || i.slug === id) || null;
}

export async function createItem(collection, payload) {
  assertCollection(collection);
  const db = await getDB();
  const item = { ...payload };
  if (!item.id) item.id = newId(collection.slice(0, 4));
  if (collection === 'projects') {
    item.slug = slugify(item.slug || item.title);
    item.slug = await uniqueSlug(db.projects || [], item.slug);
  }
  const now = new Date().toISOString().slice(0, 10);
  if (!item.createdAt) item.createdAt = now;
  item.updatedAt = now;
  db[collection] = [...(db[collection] || []), item];
  await saveDB(db);
  return item;
}

export async function updateItem(collection, id, patch) {
  assertCollection(collection);
  const db = await getDB();
  const items = db[collection] || [];
  const idx = items.findIndex((i) => i.id === id || i.slug === id);
  if (idx === -1) return null;
  const updated = {
    ...items[idx],
    ...patch,
    id: items[idx].id,
    updatedAt: new Date().toISOString().slice(0, 10),
  };
  if (collection === 'projects') {
    const base = slugify(patch.slug || items[idx].slug || updated.title);
    updated.slug = await uniqueSlug(items, base, items[idx].id);
  }
  db[collection][idx] = updated;
  await saveDB(db);
  return updated;
}

export async function deleteItem(collection, id) {
  assertCollection(collection);
  const db = await getDB();
  const before = (db[collection] || []).length;
  db[collection] = (db[collection] || []).filter((i) => i.id !== id && i.slug !== id);
  await saveDB(db);
  return db[collection].length < before;
}

export async function updateSection(section, payload) {
  const db = await getDB();
  if (!['profile', 'socials', 'settings'].includes(section)) {
    throw new Error(`Unknown section: ${section}`);
  }
  db[section] = { ...db[section], ...payload };
  await saveDB(db);
  return db[section];
}

export function publicPortfolio(db) {
  return {
    profile: db.profile,
    socials: db.socials,
    settings: db.settings,
    projects: (db.projects || [])
      .filter((p) => p.status === 'published')
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    experience: [...(db.experience || [])].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    education: [...(db.education || [])].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    skills: [...(db.skills || [])].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
  };
}
