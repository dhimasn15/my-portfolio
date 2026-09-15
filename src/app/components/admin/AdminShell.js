'use client';

import { useState } from 'react';

const NAV = [
  { group: null, items: [{ href: '/admin', label: 'Overview' }] },
  {
    group: 'Content',
    items: [
      { href: '/admin/profile', label: 'Profile' },
      { href: '/admin/projects', label: 'Projects' },
      { href: '/admin/experience', label: 'Experience' },
      { href: '/admin/education', label: 'Education' },
      { href: '/admin/skills', label: 'Skills' },
      { href: '/admin/messages', label: 'Messages' },
    ],
  },
  {
    group: 'Settings',
    items: [
      { href: '/admin/socials', label: 'Social Links' },
      { href: '/admin/settings', label: 'Site Settings' },
    ],
  },
  {
    group: 'System',
    items: [
      { href: '/', label: 'Preview Website ↗' },
      { href: '/admin/login', label: 'Logout', action: 'logout' },
    ],
  },
];

export default function AdminShell({ children, active }) {
  const [open, setOpen] = useState(false);

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  const nav = (
    <div className="flex h-full flex-col">
      <a href="/admin" className="border-b border-border p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">DHIMAS CMS</p>
        <p className="mt-1 font-extrabold tracking-tight">Portfolio Admin</p>
      </a>
      <nav aria-label="Admin" className="flex-1 overflow-auto p-3">
        {NAV.map((g, gi) => (
          <div key={gi} className="mb-4">
            {g.group && <p className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{g.group}</p>}
            {g.items.map((item) => {
              const isActive = active === item.href;
              if (item.action === 'logout') {
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={logout}
                    className="block w-full px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <a
                  key={item.href + item.label}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                  className={`block border-l-2 px-3 py-2 text-sm ${
                    isActive ? 'border-accent bg-muted font-semibold' : 'border-transparent text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
      <div className="border-t border-border p-4 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        JSON-file CMS · no demo data
      </div>
    </div>
  );

  return (
    <div className="mx-auto grid min-h-screen w-full max-w-content md:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-border bg-card md:block">{nav}</aside>
      <div className="min-w-0">
        <div className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background px-4 py-3 md:hidden">
          <p className="font-mono text-xs uppercase tracking-[0.18em]">DHIMAS CMS</p>
          <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Toggle admin menu" className="border border-border px-3 py-1.5 font-mono text-sm">
            {open ? '× Close' : '≡ Menu'}
          </button>
        </div>
        {open && <div className="max-h-[60vh] overflow-auto border-b border-border bg-card md:hidden">{nav}</div>}
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
