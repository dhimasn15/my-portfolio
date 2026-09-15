import { redirect, notFound } from 'next/navigation';
import ProjectCaseStudy from '@/app/components/site/ProjectCaseStudy';
import { getAdminProjectBySlug } from '@/app/lib/content';
import { getAdminSession } from '@/app/lib/admin-guard';
import { getDictionary } from '@/app/lib/i18n';
import { getLocale } from '@/app/lib/locale';

export const metadata = { title: 'Project Preview - DHIMAS CMS', robots: 'noindex, nofollow' };

export default async function ProjectPreviewPage({ params }) {
  if (!getAdminSession()) redirect(`/admin/login?next=/admin/projects/preview/${encodeURIComponent(params.slug)}`);
  const data = await getAdminProjectBySlug(params.slug);
  if (!data || data.project.status !== 'draft') notFound();
  const locale = getLocale();
  return <ProjectCaseStudy data={data} locale={locale} dictionary={getDictionary(locale)} preview />;
}
