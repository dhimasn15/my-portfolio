import AdminShell from '@/app/components/admin/AdminShell';
import { CollectionManager } from '@/app/components/admin/CollectionManager';
import { getAdminSession } from '@/app/lib/admin-guard';
import { listItems } from '@/app/lib/store';
import { redirect } from 'next/navigation';

export const metadata = { title: 'Projects - DHIMAS CMS', robots: 'noindex, nofollow' };

export default async function AdminProjectsPage() {
  if (!getAdminSession()) redirect('/admin/login');
  const items = await listItems('projects');
  return (
    <AdminShell active="/admin/projects">
      <CollectionManager
        collection="projects"
        items={items}
        header="Projects"
        hint="Draft tidak tampil di publik. Publish agar masuk ke website + sitemap."
        newLabel="+ New project"
        searchKeys={['title', 'slug', 'category']}
        blank={{ status: 'draft', category: 'WEB', order: 99, featured: false, technologies: [], images: [], features: [] }}
        columns={[
          { key: 'title', label: 'Project' },
          { key: 'category', label: 'Category' },
          { key: 'translations', label: 'Languages' },
          { key: 'order', label: 'Order' },
          { key: 'updatedAt', label: 'Updated' },
        ]}
      />
    </AdminShell>
  );
}
