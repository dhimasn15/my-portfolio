import HeroSection from '@/app/components/sections/HeroSection';
import WorkSection from '@/app/components/sections/WorkSection';
import AboutSection from '@/app/components/sections/AboutSection';
import ExperienceSection from '@/app/components/sections/ExperienceSection';
import ProjectsSection from '@/app/components/sections/ProjectsSection';
import SkillsSection from '@/app/components/sections/SkillsSection';
import GithubSection from '@/app/components/sections/GithubSection';
import ContactSection from '@/app/components/sections/ContactSection';
import CommandMenu from '@/app/components/site/CommandMenu';
import { getPublicPortfolio } from '@/app/lib/content';
import { getLocale } from '@/app/lib/locale';

export const revalidate = 60;

export default async function Home() {
  const data = await getPublicPortfolio();
  const locale = getLocale();
  const githubUser = process.env.GITHUB_USERNAME || process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'dhimasn15';

  return (
    <>
      <HeroSection profile={data.profile} socials={data.socials} locale={locale} />
      <WorkSection projects={data.projects} locale={locale} />
      <AboutSection profile={data.profile} education={data.education} locale={locale} />
      <ExperienceSection experience={data.experience} />
      <ProjectsSection projects={data.projects} />
      <SkillsSection skills={data.skills} locale={locale} />
      <GithubSection enabled={data.settings?.showGithubSection !== false} username={githubUser} />
      <ContactSection profile={data.profile} socials={data.socials} formEnabled={data.settings?.showContactForm !== false} />
      <CommandMenu />
    </>
  );
}
