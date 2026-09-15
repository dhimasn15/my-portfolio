'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SectionHead, Meta } from '@/app/components/ui/bits';
import { useLocale } from '@/app/components/site/LocaleProvider';
import { localized } from '@/app/lib/i18n';

export default function ProjectsSection({ projects }) {
  const { locale, t } = useLocale();
  const all = projects || [];
  const cats = ['ALL', ...Array.from(new Set(all.map((p) => (p.category || 'WEB').toUpperCase())))];
  const [filter, setFilter] = useState('ALL');
  const visible = all.filter((p) => filter === 'ALL' || (p.category || '').toUpperCase() === filter);

  return (
    <section id="projects" className="border-b border-border">
      <div className="wrap py-14 md:py-20">
        <SectionHead
          index={t.projects.index}
          title={t.projects.title}
          hint={t.projects.hint}
          action={<a href="/projects" className="btn-secondary hidden sm:inline-flex">{t.work.fullIndex} →</a>}
        />

        <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label={t.index.filter}>
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors ${
                filter === c ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {c === 'ALL' ? t.projects.all : c}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => {
            const title = localized(p, 'title', locale);
            return (
              <a key={p.slug || p.id} href={`/projects/${p.slug}`} className="group bg-card p-0 transition-colors hover:bg-muted">
                <span className="relative block aspect-[16/9] w-full overflow-hidden border-b border-border bg-muted">
                  {p.thumbnail ? (
                    <Image
                      src={p.thumbnail}
                      alt={`${title} preview`}
                      fill
                      className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  ) : null}
                </span>
                <span className="block p-5">
                  <Meta>{p.category} - {localized(p, 'role', locale)}</Meta>
                  <span className="mt-2 block text-lg font-bold tracking-tight group-hover:text-accent">{title}</span>
                  <span className="mt-1.5 block text-sm leading-relaxed text-muted-foreground">{localized(p, 'shortDescription', locale)}</span>
                  <span className="mt-3 block font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {(p.technologies || []).slice(0, 4).join(' / ')}
                  </span>
                  <span className="mt-3 block text-sm font-semibold">{t.work.viewCase} →</span>
                </span>
              </a>
            );
          })}
        </div>
        {visible.length === 0 && <p className="mt-8 border border-dashed border-border p-8 text-center text-sm text-muted-foreground">{t.projects.empty}</p>}
      </div>
    </section>
  );
}
