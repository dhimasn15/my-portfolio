import Image from 'next/image';
import { Meta } from '@/app/components/ui/bits';
import { localized } from '@/app/lib/i18n';
import { formatDate } from '@/app/lib/format';

export default function ProjectCaseStudy({ data, locale, dictionary, preview = false }) {
  const { project: p, related } = data;
  const gallery = (p.images && p.images.length > 0 ? p.images : [p.thumbnail]).filter(Boolean);
  const title = localized(p, 'title', locale);
  const features = localized(p, 'features', locale) || [];
  const problem = localized(p, 'problem', locale);
  const solution = localized(p, 'solution', locale);

  return (
    <article className="wrap py-12 md:py-16">
      {preview && (
        <div className="mb-6 border border-amber-600/40 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
          <p className="font-semibold">Draft preview</p>
          <p className="mt-1">Halaman ini hanya bisa dilihat saat login admin dan belum tampil di website publik.</p>
        </div>
      )}
      <p className="section-index"><a href={preview ? '/admin/projects' : '/projects'} className="hover:text-accent">← {preview ? 'Back to CMS' : dictionary.detail.back}</a> / {dictionary.detail.caseStudy}</p>
      <Meta>{p.category} - {localized(p, 'role', locale)}</Meta>
      <h1 className="mt-3 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">{title}</h1>
      <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">{localized(p, 'shortDescription', locale)}</p>

      <dl className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {[
          [dictionary.detail.role, localized(p, 'role', locale)],
          [dictionary.detail.stack, (p.technologies || []).join(', ')],
          [dictionary.detail.status, p.status],
          [dictionary.detail.updated, formatDate(p.updatedAt || p.createdAt)],
        ].map(([k, v]) => (
          <div key={k} className="bg-card p-5">
            <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</dt>
            <dd className="mt-1.5 text-sm font-medium">{v || '-'}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn-secondary">{dictionary.detail.github} ↗</a>}
        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">{dictionary.detail.live} ↗</a>}
      </div>

      {p.thumbnail && (
        <div className="relative mt-10 aspect-[16/8] w-full overflow-hidden border border-border bg-muted">
          <Image src={p.thumbnail} alt={`${title} hero preview`} fill className="object-cover object-top" sizes="100vw" priority />
        </div>
      )}

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1fr]">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{dictionary.detail.overview}</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{localized(p, 'description', locale)}</p>
        </div>
        <div className="space-y-8">
          {problem && <div><h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{dictionary.detail.problem}</h2><p className="mt-3 text-[15px] leading-relaxed">{problem}</p></div>}
          {solution && <div><h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{dictionary.detail.solution}</h2><p className="mt-3 text-[15px] leading-relaxed">{solution}</p></div>}
        </div>
      </div>

      {features.length > 0 && (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{dictionary.detail.features}</h2>
          <ul className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-2">
            {features.map((f, i) => <li key={i} className="bg-card p-4 text-sm leading-relaxed"><span className="mr-2 font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>{f}</li>)}
          </ul>
        </div>
      )}

      {gallery.length > 1 && (
        <div className="mt-10 border-t border-border pt-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{dictionary.detail.screenshots} - {gallery.length}</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {gallery.map((src, i) => <div key={i} className="relative aspect-[16/10] overflow-hidden border border-border bg-muted"><Image src={src} alt={`${title} screenshot ${i + 1}`} fill className="object-cover object-top" sizes="(max-width:768px) 100vw, 50vw" loading="lazy" /></div>)}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">{dictionary.detail.related}</h2>
          <div className="mt-4 grid gap-px border border-border bg-border sm:grid-cols-3">
            {related.map((r) => <a key={r.slug} href={`/projects/${r.slug}`} className="bg-card p-5 hover:bg-muted"><Meta>{r.category}</Meta><p className="mt-1.5 font-bold hover:text-accent">{localized(r, 'title', locale)}</p><p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{localized(r, 'shortDescription', locale)}</p></a>)}
          </div>
        </div>
      )}
    </article>
  );
}
