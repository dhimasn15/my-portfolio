import AdminShell from '@/app/components/admin/AdminShell';
import { SectionForm } from '@/app/components/admin/SectionForm';
import { getAdminSession } from '@/app/lib/admin-guard';
import { getDB } from '@/app/lib/store';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Social Links - DHIMAS CMS', robots: 'noindex, nofollow' };

export default async function AdminSocialsPage() {
  if (!getAdminSession()) redirect('/admin/login');
  const db = await getDB();
  return (
    <AdminShell active="/admin/socials">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">CMS / socials</p>
      <h1 className="mb-6 mt-2 text-2xl font-extrabold tracking-tight">Social links</h1>
      <SectionForm section="socials" initial={db.socials} />
    </AdminShell>
  );
}
