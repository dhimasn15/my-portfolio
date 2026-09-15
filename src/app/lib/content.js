import { getDB, publicPortfolio } from '@/app/lib/store';

export async function getPublicPortfolio() {
  const db = await getDB();
  return publicPortfolio(db);
}

export async function getProjectBySlug(rawSlug) {
  const db = await getDB();
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    slug = rawSlug;
  }
  const norm = slug.toLowerCase().trim();
  const projects = db.projects || [];
  const project = projects.find((p) => {
    if (p.status !== 'published') return false;
    const pSlug = decodeURIComponent(p.slug || '');
    return pSlug === slug || pSlug.toLowerCase() === norm || p.id === slug;
  });
  if (!project) return null;
  const related = projects
    .filter((p) => p.status === 'published' && p.id !== project.id)
    .filter((p) => p.category === project.category)
    .concat(
      projects.filter(
        (p) => p.status === 'published' && p.id !== project.id && p.category !== project.category
      )
    )
    .slice(0, 3);
  return { project, related, profile: db.profile, socials: db.socials };
}

export async function getAdminProjectBySlug(rawSlug) {
  const db = await getDB();
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    slug = rawSlug;
  }
  const norm = slug.toLowerCase().trim();
  const projects = db.projects || [];
  const project = projects.find((p) => {
    const pSlug = decodeURIComponent(p.slug || '');
    return pSlug === slug || pSlug.toLowerCase() === norm || p.id === slug;
  });
  if (!project) return null;
  const related = projects
    .filter((p) => p.status === 'published' && p.id !== project.id)
    .filter((p) => p.category === project.category)
    .concat(
      projects.filter(
        (p) => p.status === 'published' && p.id !== project.id && p.category !== project.category
      )
    )
    .slice(0, 3);
  return { project, related, profile: db.profile, socials: db.socials };
}

export function formatDate(value) {
  if (!value) return '-';
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'short' });
}
