export default function Robots() {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const body = `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/admin/\n\nSitemap: ${base}/sitemap.xml\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
