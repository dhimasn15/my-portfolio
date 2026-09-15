'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';
import { useLocale } from './LocaleProvider';
import { localized } from '@/app/lib/i18n';

export default function SiteHeader({ profile }) {
  const { locale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [progress, setProgress] = useState(0);

  const links = [
    { href: '/#work', label: t.nav.work, key: 'work' },
    { href: '/#about', label: t.nav.about, key: 'about' },
    { href: '/#experience', label: t.nav.experience, key: 'experience' },
    { href: '/projects', label: t.nav.index, key: '' },
    { href: '/#contact', label: t.nav.contact, key: 'contact' },
  ];

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
      const ids = ['work', 'about', 'experience', 'contact'];
      let current = '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="/#top" className="flex items-baseline gap-3">
          <span className="text-base font-extrabold tracking-tight">{profile?.shortName || 'DHIMAS.N'}</span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:inline">
            / portfolio
          </span>
        </a>

        <nav aria-label={t.a11y.primaryNav} className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const isActive = l.key && active === l.key;
            return (
              <a
                key={l.href + l.label}
                href={l.href}
                aria-current={isActive ? 'true' : undefined}
                className={`font-mono text-xs uppercase tracking-[0.14em] transition-colors ${
                  isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {isActive ? '● ' : ''}
                {l.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <span className="inline-flex items-center gap-2 border border-border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em]">
            <span
              aria-hidden
              className={`inline-block h-1.5 w-1.5 rounded-full ${profile?.availability === false ? 'bg-muted-foreground' : 'bg-green-600'}`}
            />
            {profile?.availability === false ? t.nav.busy : t.nav.available}
          </span>
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t.nav.close : t.nav.menu}
            className="inline-flex h-9 w-9 items-center justify-center border border-border font-mono text-sm"
          >
            {open ? '×' : '≡'}
          </button>
        </div>
      </div>

      <div aria-hidden className="h-px bg-border">
        <div className="h-px bg-accent transition-[width]" style={{ width: `${progress}%` }} />
      </div>

      {open && (
        <nav aria-label={t.a11y.mobileNav} className="border-t border-border bg-background md:hidden">
          <div className="wrap flex flex-col py-3">
            {links.map((l) => (
              <a
                key={l.href + l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-border py-3 font-mono text-sm uppercase tracking-[0.14em] text-foreground last:border-0"
              >
                {l.label}
              </a>
            ))}
            <p className="py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {localized(profile, 'availabilityNote', locale) || (profile?.availability === false ? t.nav.busyNote : t.nav.availableNote)}
            </p>
          </div>
        </nav>
      )}
    </header>
  );
}
