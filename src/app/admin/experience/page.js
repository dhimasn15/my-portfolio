import AdminShell from '@/app/components/admin/AdminShell';
import { CollectionManager } from '@/app/components/admin/CollectionManager';
import { getAdminSession } from '@/app/lib/admin-guard';
import { listItems } from '@/app/lib/store';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Experience - DHIMAS CMS', robots: 'noindex, nofollow' };

export default async function AdminExperiencePage() {
  if (!getAdminSession()) redirect('/admin/login');
  const items = await listItems('experience');
  return (
    <AdminShell active="/admin/experience">
      <CollectionManager
        collection="experience"
        items={items}
        header="Experience"
        hint="Timeline publik membaca data ini. Jangan mengarang pengalaman."
        newLabel="+ New experience"
        searchKeys={['title', 'company', 'type']}
        blank={{ type: 'Teaching', order: 99, featured: false, responsibilities: [], technologies: [] }}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'company', label: 'Company' },
          { key: 'startDate', label: 'Start' },
          { key: 'order', label: 'Order' },
        ]}
      />
    </AdminShell>
  );
}
