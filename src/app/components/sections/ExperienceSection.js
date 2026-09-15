'use client';

import { useState } from 'react';
import { SectionHead } from '@/app/components/ui/bits';
import { formatDate } from '@/app/lib/format';
import { useLocale } from '@/app/components/site/LocaleProvider';
import { localized } from '@/app/lib/i18n';

export default function ExperienceSection({ experience }) {
  const { locale, t } = useLocale();
  const [openId, setOpenId] = useState(null);
  const items = experience || [];

  return (
    <section id="experience" className="border-b border-border">
      <div className="wrap py-14 md:py-20">
        <SectionHead index={t.experience.index} title={t.experience.title} hint={t.experience.hint} />
        <div className="mt-8 divide-y divide-border border-y border-border">
          {items.map((e) => {
            const open = openId === e.id;
            const title = localized(e, 'title', locale);
            const company = localized(e, 'company', locale);
            const description = localized(e, 'description', locale);
            const responsibilities = localized(e, 'responsibilities', locale) || [];
            return (
              <div key={e.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(open ? null : e.id)}
                  aria-expanded={open}
                  className="grid w-full gap-2 py-5 text-left sm:grid-cols-[140px_1fr_auto] sm:items-baseline"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {formatDate(e.startDate)} → {e.current ? t.experience.now : formatDate(e.endDate)}
                  </span>
                  <span>
                    <span className="block font-semibold">{title}</span>
                    <span className="block text-sm text-muted-foreground">{company} - {localized(e, 'type', locale)}</span>
                  </span>
                  <span className="font-mono text-sm text-muted-foreground" aria-hidden>{open ? '−' : '+'}</span>
                </button>
                {open && (
                  <div className="grid gap-4 pb-6 sm:grid-cols-[140px_1fr]">
                    <span />
                    <div className="max-w-2xl">
                      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                      {responsibilities.length > 0 && (
                        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                          {responsibilities.map((r, i) => <li key={i}>{r}</li>)}
                        </ul>
                      )}
                      {(e.technologies || []).length > 0 && (
                        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          {e.technologies.join(' / ')}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
          {items.length === 0 && <p className="py-8 text-sm text-muted-foreground">{t.experience.empty}</p>}
        </div>
      </div>
    </section>
  );
}
