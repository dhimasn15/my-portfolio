import AdminShell from '@/app/components/admin/AdminShell';
import { CollectionManager } from '@/app/components/admin/CollectionManager';
import { getAdminSession } from '@/app/lib/admin-guard';
import { listItems } from '@/app/lib/store';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Education - DHIMAS CMS', robots: 'noindex, nofollow' };

export default async function AdminEducationPage() {
  if (!getAdminSession()) redirect('/admin/login');
  const items = await listItems('education');
  return (
    <AdminShell active="/admin/education">
      <CollectionManager
        collection="education"
        items={items}
        header="Education"
        newLabel="+ New education"
        searchKeys={['institution', 'field', 'degree']}
        blank={{ order: 99, current: false }}
        columns={[
          { key: 'institution', label: 'Institution' },
          { key: 'field', label: 'Field' },
          { key: 'startDate', label: 'Start' },
          { key: 'order', label: 'Order' },
        ]}
      />
    </AdminShell>
  );
}
