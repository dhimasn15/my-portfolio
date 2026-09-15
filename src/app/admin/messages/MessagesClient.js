'use client';

import { useState } from 'react';
import { ConfirmDialog, Toast } from '@/app/components/admin/fields';

export default function MessagesClient({ items }) {
  const [openId, setOpenId] = useState(null);
  const [pending, setPending] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const markRead = async (m, read) => {
    try {
      const r = await fetch('/api/admin/item', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection: 'messages', id: m.id, data: { read } }),
      });
      if (!r.ok) throw new Error('Update gagal');
      window.location.reload();
    } catch (e) {
      setToast({ type: 'error', text: e.message });
      setTimeout(() => setToast(null), 2500);
    }
  };

  const remove = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/item?collection=messages&id=${encodeURIComponent(pending.id)}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('Delete gagal');
      window.location.reload();
    } catch (e) {
      setToast({ type: 'error', text: e.message });
      setBusy(false);
      setPending(null);
      setTimeout(() => setToast(null), 2500);
    }
  };

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">CMS / messages</p>
      <h1 className="mt-2 text-2xl font-extrabold tracking-tight">Inbox - {(items || []).filter((m) => !m.read).length} unread</h1>
      <p className="mt-1 text-sm text-muted-foreground">Pesan dari form kontak publik (rate-limited).</p>
      <div className="mt-6 divide-y divide-border border-y border-border">
        {(items || []).map((m) => {
          const open = openId === m.id;
          return (
            <div key={m.id} className={m.read ? '' : 'bg-muted/40'}>
              <button type="button" onClick={() => setOpenId(open ? null : m.id)} aria-expanded={open} className="grid w-full gap-1 py-4 text-left sm:grid-cols-[1fr_auto] sm:items-center">
                <span>
                  <span className="block text-sm font-semibold">{!m.read && '● '}{m.subject}</span>
                  <span className="block text-sm text-muted-foreground">{m.name} - {m.email}</span>
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{m.createdAt}</span>
              </button>
              {open && (
                <div className="pb-5">
                  <p className="max-w-2xl whitespace-pre-wrap text-sm leading-relaxed">{m.message}</p>
                  <div className="mt-3 flex gap-2">
                    <button type="button" onClick={() => markRead(m, !m.read)} className="border border-border px-3 py-1.5 text-xs hover:border-foreground">
                      {m.read ? 'Mark unread' : 'Mark read'}
                    </button>
                    <a href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject || '')}`} className="border border-border px-3 py-1.5 text-xs hover:border-foreground">Reply ↗</a>
                    <button type="button" onClick={() => setPending(m)} className="border border-border px-3 py-1.5 text-xs text-red-600 hover:border-red-600 dark:text-red-400">Delete</button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {(items || []).length === 0 && <p className="py-8 text-sm text-muted-foreground">No messages yet.</p>}
      </div>
      <ConfirmDialog open={!!pending} title="Delete this message?" body="Pesan akan dihapus permanen dari inbox." confirmLabel="Delete" busy={busy} onCancel={() => setPending(null)} onConfirm={remove} />
      <Toast toast={toast} />
    </div>
  );
}
