'use client';

import { useEffect, useState } from 'react';
import { SectionHead } from '@/app/components/ui/bits';
import { useLocale } from '@/app/components/site/LocaleProvider';

function timeAgo(iso, locale) {
  const d = new Date(iso).getTime();
  if (Number.isNaN(d)) return '';
  const s = Math.floor((Date.now() - d) / 1000);
  if (locale === 'en') {
    if (s < 60) return 'just now';
    if (s < 3600) return `${Math.floor(s / 60)}m ago`;
    if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
    return `${Math.floor(s / 86400)}d ago`;
  }
  if (s < 60) return 'baru saja';
  if (s < 3600) return `${Math.floor(s / 60)}m lalu`;
  if (s < 86400) return `${Math.floor(s / 3600)}j lalu`;
  return `${Math.floor(s / 86400)}h lalu`;
}

export default function GithubSection({ enabled, username }) {
  const { locale, t } = useLocale();
  const [data, setData] = useState(null);
  const [state, setState] = useState(enabled ? 'loading' : 'disabled');

  useEffect(() => {
    if (!enabled) return;
    let alive = true;
    fetch('/api/github')
      .then(async (r) => {
        if (!r.ok) throw new Error(`github ${r.status}`);
        return r.json();
      })
      .then((j) => alive && (setData(j), setState('ready')))
      .catch(() => alive && setState('error'));
    return () => { alive = false; };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <section id="github" className="border-b border-border">
      <div className="wrap py-14 md:py-20">
        <SectionHead
          index={t.github.index}
          title={t.github.title}
          hint={t.github.hint}
          action={
            <a href={`https://github.com/${username || 'dhimasn15'}`} target="_blank" rel="noreferrer" className="btn-secondary hidden sm:inline-flex">
              {t.github.open} ↗
            </a>
          }
        />
        <div className="mt-8">
          {state === 'loading' && (
            <div className="grid gap-px border border-border bg-border sm:grid-cols-4" aria-busy="true">
              {[0, 1, 2, 3].map((i) => <div key={i} className="skeleton h-24 bg-card" />)}
            </div>
          )}
          {state === 'error' && (
            <div className="border border-dashed border-border p-8 text-center">
              <p className="text-sm font-medium">{t.github.errorTitle}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t.github.errorHint}</p>
              <a href={`https://github.com/${username || 'dhimasn15'}`} target="_blank" rel="noreferrer" className="btn-secondary mt-4">{t.github.open} ↗</a>
            </div>
          )}
          {state === 'ready' && data && (
            <div>
              <div className="grid gap-px border border-border bg-border sm:grid-cols-4">
                {[
                  [t.github.repositories, data?.stats?.totalRepos ?? data?.user?.public_repos ?? '-'],
                  [t.github.followers, data?.stats?.followers ?? data?.user?.followers ?? '-'],
                  [t.github.following, data?.stats?.following ?? data?.user?.following ?? '-'],
                  [t.github.updated, data?.lastUpdated ? timeAgo(data.lastUpdated, locale) : '-'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-card p-5">
                    <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{k}</p>
                    <p className="mt-2 text-2xl font-extrabold tracking-tight">{v}</p>
                  </div>
                ))}
              </div>
              {(data.pinnedRepos || []).length > 0 && (
                <div className="mt-6 grid gap-px border border-border bg-border md:grid-cols-3">
                  {data.pinnedRepos.slice(0, 6).map((r) => (
                    <a key={r.id || r.name} href={r.html_url} target="_blank" rel="noreferrer" className="bg-card p-5 transition-colors hover:bg-muted">
                      <p className="font-semibold hover:text-accent">{r.name}</p>
                      {r.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.description}</p>}
                      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                        ★ {r.stargazers_count ?? 0} · {r.language || 'code'}
                      </p>
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
