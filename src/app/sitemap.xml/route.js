import { getDB } from '@/app/lib/store';

export default async function Sitemap() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  let projects = [];
  try {
    const db = await getDB();
    projects = (db.projects || []).filter((p) => p.status === 'published');
  } catch {}
  const urls = [
    `${base}/`,
    `${base}/projects`,
    ...projects.map((p) => `${base}/projects/${p.slug}`),
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u}</loc></url>`)
    .join('\n')}\n</urlset>`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
