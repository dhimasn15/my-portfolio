import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { getAdminSession } from '@/app/lib/admin-guard';
import { put } from '@vercel/blob';

const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);

function safeName(name = 'upload') {
  const base = path.basename(name).toLowerCase().replace(/[^a-z0-9._-]+/g, '-').slice(0, 80);
  return base || 'image';
}

export async function POST(request) {
  const session = getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const form = await request.formData();
    const file = form.get('file');
    const folderRaw = String(form.get('folder') || 'projects');
    const folder = folderRaw.toLowerCase().replace(/[^a-z0-9-]+/g, '').slice(0, 30) || 'projects';
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'File wajib diisi' }, { status: 400 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json({ error: 'Hanya PNG, JPG, WEBP, GIF yang diizinkan' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Maksimal 5MB' }, { status: 400 });
    }
    const stamp = Date.now().toString(36);
    const filename = `${stamp}-${safeName(file.name)}`;
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`portfolio/${folder}/${filename}`, file, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
        addRandomSuffix: false,
      });
      return NextResponse.json({ url: blob.url, storage: 'vercel-blob' }, { status: 201 });
    }
    const dir = path.join(process.cwd(), 'public', 'uploads', folder);
    await mkdir(dir, { recursive: true });
    const bytes = Buffer.from(await file.arrayBuffer());
    await writeFile(path.join(dir, filename), bytes);
    return NextResponse.json({ url: `/uploads/${folder}/${filename}`, storage: 'local' }, { status: 201 });
  } catch (error) {
    console.error('upload error:', error);
    return NextResponse.json({ error: 'Upload gagal' }, { status: 500 });
  }
}
