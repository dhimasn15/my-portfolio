import Image from 'next/image';
import { SectionHead, Meta } from '@/app/components/ui/bits';
import { getDictionary, localized } from '@/app/lib/i18n';

export default function WorkSection({ projects, locale = 'id' }) {
  const t = getDictionary(locale);
  const featured = (projects || []).filter((p) => p.featured).slice(0, 3);
  const list = featured.length > 0 ? featured : (projects || []).slice(0, 3);

  return (
    <section id="work" className="border-b border-border">
      <div className="wrap py-14 md:py-20">
        <SectionHead
          index={t.work.index}
          title={t.work.title}
          hint={t.work.hint}
          action={<a href="/projects" className="btn-secondary hidden sm:inline-flex">{t.work.fullIndex} →</a>}
        />

        <div className="mt-8">
          {list.map((p, i) => {
            const title = localized(p, 'title', locale);
            const short = localized(p, 'shortDescription', locale);
            const role = localized(p, 'role', locale);
            return (
              <article key={p.slug || p.id} className="group grid gap-6 border-b border-border py-8 last:border-0 md:grid-cols-[64px_1fr_1.1fr] md:items-start">
                <p className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, '0')}</p>
                <div>
                  <Meta>{p.category} - {role}</Meta>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight">
                    <a href={`/projects/${p.slug}`} className="transition-colors group-hover:text-accent">
                      {title}
                    </a>
                  </h3>
                  <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">{short}</p>
                  <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {(p.technologies || []).join(' / ')}
                  </p>
                  <a href={`/projects/${p.slug}`} className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:text-accent">
                    {t.work.viewCase} →
                  </a>
                </div>
                <a href={`/projects/${p.slug}`} aria-label={`${title} case study`} className="block overflow-hidden border border-border bg-muted">
                  {p.thumbnail ? (
                    <span className="relative block aspect-[16/9] w-full">
                      <Image
                        src={p.thumbnail}
                        alt={`${title} preview`}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </span>
                  ) : (
                    <span className="block aspect-[16/9] w-full" />
                  )}
                </a>
              </article>
            );
          })}
        </div>

        <a href="/projects" className="btn-secondary mt-8 w-full sm:hidden">{t.work.fullIndex} →</a>
      </div>
    </section>
  );
}
