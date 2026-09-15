import AdminShell from '@/app/components/admin/AdminShell';
import { getAdminSession } from '@/app/lib/admin-guard';
import { getDB } from '@/app/lib/store';
import { redirect } from 'next/navigation';
import AdminOverview from './AdminOverview';

export const metadata = { title: 'Overview - DHIMAS CMS', robots: 'noindex, nofollow' };

export default async function AdminPage() {
  const session = getAdminSession();
  if (!session) redirect('/admin/login');
  const db = await getDB();
  return (
    <AdminShell active="/admin">
      <AdminOverview db={db} session={session} />
    </AdminShell>
  );
}
