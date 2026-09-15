'use client';

import { useEffect, useState } from 'react';
import { useLocale } from './LocaleProvider';

export default function CommandMenu() {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  const items = [
    { label: t.menu.goWork, href: '/#work', key: 'W' },
    { label: t.menu.goAbout, href: '/#about', key: 'A' },
    { label: t.menu.goExperience, href: '/#experience', key: 'E' },
    { label: t.menu.goIndex, href: '/projects', key: 'P' },
    { label: t.menu.goContact, href: '/#contact', key: 'C' },
    { label: t.menu.toggleTheme, action: 'theme', key: 'T' },
    { label: t.menu.copyEmail, action: 'email', key: 'M' },
  ];

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setQ('');
  }, [open]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.menu.button}
        className="fixed bottom-5 right-5 z-40 border border-border bg-card px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground shadow-sm hover:border-foreground hover:text-foreground"
      >
        ⌘K
      </button>
    );
  }

  const run = async (item) => {
    if (item.action === 'theme') {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('dn-theme', isDark ? 'dark' : 'light');
    } else if (item.action === 'email') {
      const el = document.querySelector('#contact');
      const mail = el?.textContent || '';
      const m = mail.match(/[\w.+-]+@[\w-]+\.[\w.]+/);
      if (m) {
        try { await navigator.clipboard.writeText(m[0]); } catch {}
      }
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (item.href) {
      window.location.href = item.href;
    }
    setOpen(false);
  };

  const filtered = items.filter((i) => i.label.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-[15vh]" role="dialog" aria-modal="true" aria-label={t.menu.button}>
      <button aria-label={t.nav.close} onClick={() => setOpen(false)} className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-md border border-border bg-card shadow-xl">
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={t.menu.placeholder}
          aria-label={t.menu.search}
          className="w-full border-b border-border bg-transparent px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <ul className="max-h-64 overflow-auto p-1.5">
          {filtered.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => run(item)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm hover:bg-muted"
              >
                <span>{item.label}</span>
                <kbd className="border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">{item.key}</kbd>
              </button>
            </li>
          ))}
          {filtered.length === 0 && <li className="px-3 py-4 text-sm text-muted-foreground">{t.menu.noResults}</li>}
        </ul>
      </div>
    </div>
  );
}
