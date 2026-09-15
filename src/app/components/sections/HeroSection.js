import Image from 'next/image';
import { getDictionary, localized } from '@/app/lib/i18n';

export default function HeroSection({ profile, socials, locale = 'id' }) {
  const t = getDictionary(locale);
  const headline = localized(profile, 'headline', locale);
  const bio = localized(profile, 'bio', locale);
  const availabilityNote = localized(profile, 'availabilityNote', locale);

  return (
    <section id="top" className="border-b border-border">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr] md:py-20">
        <div>
          <p className="section-index">{t.hero.index}</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
            {profile?.name || 'Dhimas Nurhidayat'}
          </h1>
          <p className="mt-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
            {headline || 'Full Stack Developer'}
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {bio}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/#work" className="btn-primary">{t.hero.viewWork} →</a>
            <a href="/#contact" className="btn-secondary">{t.hero.letsTalk}</a>
            {profile?.resumeUrl && (
              <a href={profile.resumeUrl} download className="btn-secondary">
                {t.hero.downloadCv} ↓
              </a>
            )}
          </div>
          <dl className="mt-10 grid max-w-xl grid-cols-1 gap-4 border-t border-border pt-6 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.hero.basedIn}</dt>
              <dd className="mt-1 font-medium">{profile?.location || 'Indonesia'}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.hero.status}</dt>
              <dd className="mt-1 font-medium">{availabilityNote || t.nav.availableNote.replace('● ', '')}</dd>
            </div>
            <div>
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.hero.study}</dt>
              <dd className="mt-1 font-medium">{t.hero.studyValue}</dd>
            </div>
          </dl>
        </div>

        <aside className="panel p-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.hero.profileFile}</span>
            <span className="font-mono text-[11px] text-muted-foreground">{t.hero.readOnly}</span>
          </div>
          <div className="grid grid-cols-[120px_1fr] gap-4 p-4">
            {profile?.profileImage ? (
              <div className="relative h-28 w-[120px] overflow-hidden border border-border bg-muted">
                <Image src={profile.profileImage} alt={profile.name || 'Profile photo'} fill className="object-cover" sizes="120px" priority />
              </div>
            ) : (
              <div className="flex h-28 w-[120px] items-center justify-center border border-border bg-muted font-mono text-xs">DN</div>
            )}
            <div className="font-mono text-xs leading-relaxed">
              <p><span className="text-accent">name</span> = &quot;{profile?.name}&quot;</p>
              <p><span className="text-accent">role</span> = &quot;{headline}&quot;</p>
              <p><span className="text-accent">stack</span> = [react, next, laravel]</p>
              <p><span className="text-accent">open</span> = {profile?.availability === false ? 'false' : 'true'}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 border-t border-border p-4 text-sm">
            {socials?.github && <a className="underline underline-offset-4 hover:text-accent" href={socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
            {socials?.linkedin && <a className="underline underline-offset-4 hover:text-accent" href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
            {profile?.email && <a className="underline underline-offset-4 hover:text-accent" href={`mailto:${profile.email}`}>Email ↗</a>}
          </div>
        </aside>
      </div>
    </section>
  );
}
