import { notFound } from 'next/navigation';
import { getProjectBySlug } from '@/app/lib/content';
import { getLocale } from '@/app/lib/locale';
import { getDictionary, localized } from '@/app/lib/i18n';
import ProjectCaseStudy from '@/app/components/site/ProjectCaseStudy';

export const revalidate = 60;

export async function generateMetadata({ params }) {
  const data = await getProjectBySlug(params.slug);
  if (!data) return { title: 'Project not found' };
  const locale = getLocale();
  const title = localized(data.project, 'title', locale);
  const short = localized(data.project, 'shortDescription', locale);
  return {
    title: `${title} - Dhimas Nurhidayat`,
    description: short,
    openGraph: {
      title,
      description: short,
      images: data.project.thumbnail ? [data.project.thumbnail] : [],
      type: 'article',
    },
  };
}

export default async function ProjectDetailPage({ params }) {
  const data = await getProjectBySlug(params.slug);
  if (!data) notFound();
  const locale = getLocale();
  const t = getDictionary(locale);
  return <ProjectCaseStudy data={data} locale={locale} dictionary={t} />;
}
