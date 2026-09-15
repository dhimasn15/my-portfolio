import AdminShell from '@/app/components/admin/AdminShell';
import { getAdminSession } from '@/app/lib/admin-guard';
import { listItems } from '@/app/lib/store';
import { redirect } from 'next/navigation';
import MessagesClient from './MessagesClient';

export const metadata = { title: 'Messages - DHIMAS CMS', robots: 'noindex, nofollow' };

export default async function AdminMessagesPage() {
  if (!getAdminSession()) redirect('/admin/login');
  const items = (await listItems('messages')).reverse();
  return (
    <AdminShell active="/admin/messages">
      <MessagesClient items={items} />
    </AdminShell>
  );
}
