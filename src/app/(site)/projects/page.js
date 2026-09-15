import { getDB } from '@/app/lib/store';
import ProjectsIndexClient from './ProjectsIndexClient';

export const metadata = {
  title: 'Project Index - Dhimas Nurhidayat',
  description: 'Full index of published projects by Dhimas Nurhidayat.',
};

export default async function ProjectsIndexPage() {
  const db = await getDB();
  const projects = (db.projects || [])
    .filter((p) => p.status === 'published')
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  return <ProjectsIndexClient projects={projects} />;
}
