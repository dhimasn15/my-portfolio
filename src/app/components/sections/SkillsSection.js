import { SectionHead } from '@/app/components/ui/bits';
import { getDictionary, localized } from '@/app/lib/i18n';

const ORDER = ['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'];

export default function SkillsSection({ skills, locale = 'id' }) {
  const t = getDictionary(locale);
  const all = skills || [];
  const groups = ORDER.map((cat) => ({
    cat,
    items: all.filter((s) => s.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <section id="skills" className="border-b border-border">
      <div className="wrap py-14 md:py-20">
        <SectionHead index={t.skills.index} title={t.skills.title} hint={t.skills.hint} />
        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.cat} className="bg-card p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{g.cat}</p>
              <ul className="mt-4 space-y-2.5">
                {g.items.map((s) => (
                  <li key={s.id} className="flex items-baseline justify-between gap-3 border-b border-border pb-2 text-sm last:border-0 last:pb-0">
                    <span className="font-medium" title={localized(s, 'description', locale) || undefined}>{s.name}</span>
                    {s.featured && <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{t.skills.core}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
