import AdminShell from '@/app/components/admin/AdminShell';
import { CollectionManager } from '@/app/components/admin/CollectionManager';
import { getAdminSession } from '@/app/lib/admin-guard';
import { listItems } from '@/app/lib/store';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Skills - DHIMAS CMS', robots: 'noindex, nofollow' };

export default async function AdminSkillsPage() {
  if (!getAdminSession()) redirect('/admin/login');
  const items = await listItems('skills');
  return (
    <AdminShell active="/admin/skills">
      <CollectionManager
        collection="skills"
        items={items}
        header="Skills"
        hint="Tanpa skill bar - hanya nama + kategori yang dipakai di proyek nyata."
        newLabel="+ New skill"
        searchKeys={['name', 'category']}
        blank={{ category: 'Frontend', order: 99, featured: false }}
        columns={[
          { key: 'name', label: 'Skill' },
          { key: 'category', label: 'Category' },
          { key: 'order', label: 'Order' },
        ]}
      />
    </AdminShell>
  );
}
