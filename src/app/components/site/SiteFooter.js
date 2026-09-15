import { getDictionary } from '@/app/lib/i18n';
import { getLocale } from '@/app/lib/locale';

export default function SiteFooter({ profile, socials }) {
  const locale = getLocale();
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="wrap grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">© {year}</p>
          <p className="mt-2 text-xl font-bold tracking-tight">{profile?.name || 'Dhimas Nurhidayat'}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {profile?.headline || 'Full Stack Developer'} - {profile?.location || 'Indonesia'}.
          </p>
        </div>
        <nav aria-label={t.a11y.footerNav}>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.footer.sitemap}</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a className="hover:text-accent" href="/#work">{t.footer.selectedWork}</a>
            <a className="hover:text-accent" href="/projects">{t.footer.projectIndex}</a>
            <a className="hover:text-accent" href="/#about">{t.footer.about}</a>
            <a className="hover:text-accent" href="/#experience">{t.footer.experience}</a>
            <a className="hover:text-accent" href="/#contact">{t.footer.contact}</a>
          </div>
        </nav>
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.footer.elsewhere}</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {socials?.github && <a className="hover:text-accent" href={socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
            {socials?.linkedin && <a className="hover:text-accent" href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
            {profile?.email && <a className="hover:text-accent" href={`mailto:${profile.email}`}>{profile.email}</a>}
          </div>
          <a href="#top" className="mt-6 inline-block border border-border px-4 py-2 text-sm font-medium hover:border-foreground">
            {t.footer.backToTop} ↑
          </a>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="wrap flex flex-col gap-2 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{t.footer.builtBy}</span>
          <span>{t.footer.location}</span>
        </div>
      </div>
    </footer>
  );
}
