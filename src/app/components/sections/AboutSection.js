import { SectionHead } from '@/app/components/ui/bits';
import { formatDate } from '@/app/lib/format';
import { getDictionary, localized } from '@/app/lib/i18n';

export default function AboutSection({ profile, education, locale = 'id' }) {
  const t = getDictionary(locale);
  const longBio = localized(profile, 'longBio', locale) || localized(profile, 'bio', locale);
  const availabilityNote = localized(profile, 'availabilityNote', locale);

  const rows = [
    [
      `01 / ${t.about.educationLabel}`,
      (education || [])
        .map((e) => `${e.institution} - ${localized(e, 'field', locale)}`)
        .join(' · ') || '-',
    ],
    [`02 / ${t.about.focus}`, t.about.focusValue],
    [`03 / ${t.about.currently}`, availabilityNote || t.nav.availableNote.replace('● ', '')],
  ];

  return (
    <section id="about" className="border-b border-border">
      <div className="wrap py-14 md:py-20">
        <SectionHead index={t.about.index} title={t.about.title} hint={t.about.hint} />
        <div className="mt-8 grid gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-muted-foreground">
            <p className="text-base text-foreground">{longBio}</p>
            <p>{t.about.extra}</p>
          </div>
          <div className="grid content-start gap-px border border-border bg-border">
            {rows.map(([k, v]) => (
              <div key={k} className="bg-card p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.about.educationLabel}</h3>
          <div className="mt-4 divide-y divide-border border-y border-border">
            {(education || []).map((e) => (
              <div key={e.id} className="grid gap-2 py-4 sm:grid-cols-[180px_1fr_auto] sm:items-baseline">
                <p className="font-mono text-xs text-muted-foreground">
                  {formatDate(e.startDate)} → {e.current ? t.experience.now : formatDate(e.endDate)}
                </p>
                <div>
                  <p className="font-semibold">{e.institution}</p>
                  <p className="text-sm text-muted-foreground">
                    {localized(e, 'degree', locale)} - {localized(e, 'field', locale)}
                  </p>
                </div>
                {localized(e, 'description', locale) && (
                  <p className="max-w-md text-sm text-muted-foreground">{localized(e, 'description', locale)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
