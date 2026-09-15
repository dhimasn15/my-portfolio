'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { Meta } from '@/app/components/ui/bits';
import { useLocale } from '@/app/components/site/LocaleProvider';
import { localized } from '@/app/lib/i18n';

export default function ProjectsIndexClient({ projects }) {
  const { locale, t } = useLocale();
  const all = projects || [];
  const cats = useMemo(
    () => ['ALL', ...Array.from(new Set(all.map((p) => (p.category || 'WEB').toUpperCase())))],
    [all]
  );
  const [filter, setFilter] = useState('ALL');
  const [q, setQ] = useState('');
  const visible = all.filter((p) => {
    const okCat = filter === 'ALL' || (p.category || '').toUpperCase() === filter;
    const hay = `${localized(p, 'title', locale)} ${(p.technologies || []).join(' ')} ${localized(p, 'shortDescription', locale)}`.toLowerCase();
    return okCat && hay.includes(q.toLowerCase());
  });

  return (
    <div className="wrap py-12 md:py-16">
      <p className="section-index">{t.index.eyebrow}</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">{t.index.title}</h1>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground md:text-base">{t.index.description}</p>

      <div className="mt-8 flex flex-col gap-3 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2" role="group" aria-label={t.index.filter}>
          {cats.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] ${
                filter === c ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {c === 'ALL' ? t.projects.all : c}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{t.index.search}</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.index.searchPh} className="field-input !w-56" />
        </label>
      </div>

      <div className="mt-0 divide-y divide-border border-b border-border">
        {visible.map((p, i) => {
          const title = localized(p, 'title', locale);
          return (
            <a key={p.slug} href={`/projects/${p.slug}`} className="group grid gap-4 py-6 sm:grid-cols-[56px_120px_1fr_auto] sm:items-center">
              <span className="font-mono text-sm text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
              <span className="relative hidden aspect-[4/3] w-[120px] overflow-hidden border border-border bg-muted sm:block">
                {p.thumbnail && <Image src={p.thumbnail} alt="" fill className="object-cover object-top" sizes="120px" loading="lazy" />}
              </span>
              <span>
                <Meta>{p.category} - {(p.technologies || []).slice(0, 4).join(' / ')}</Meta>
                <span className="mt-1 block text-lg font-bold group-hover:text-accent">{title}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{localized(p, 'shortDescription', locale)}</span>
              </span>
              <span className="text-sm font-semibold">{t.index.view} →</span>
            </a>
          );
        })}
      </div>
      {visible.length === 0 && <p className="mt-8 border border-dashed border-border p-8 text-center text-sm text-muted-foreground">{t.index.empty}</p>}
      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{visible.length} / {all.length} {t.index.count}</p>
    </div>
  );
}
