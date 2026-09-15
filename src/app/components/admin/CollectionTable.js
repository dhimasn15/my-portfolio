'use client';

import { useMemo, useState } from 'react';
import { StatusPill } from '@/app/components/ui/bits';
import { ConfirmDialog, Toast } from '@/app/components/admin/fields';
import { TranslationStatus } from '@/app/components/admin/translation';

export function CollectionTable({ collection, items, columns, onEdit, onChanged, searchKeys }) {
  const [q, setQ] = useState('');
  const [pending, setPending] = useState(null);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const visible = useMemo(() => {
    const needle = q.toLowerCase();
    return (items || []).filter((it) => {
      if (!needle) return true;
      return (searchKeys || ['title', 'name', 'subject']).some((k) => String(it[k] || '').toLowerCase().includes(needle));
    });
  }, [items, q, searchKeys]);

  const remove = async () => {
    if (!pending) return;
    setBusy(true);
    try {
      const r = await fetch(`/api/admin/item?collection=${collection}&id=${encodeURIComponent(pending.id)}`, { method: 'DELETE' });
      if (!r.ok) throw new Error('Delete gagal');
      setToast({ text: 'Deleted ✓' });
      onChanged?.();
    } catch (e) {
      setToast({ type: 'error', text: e.message });
    } finally {
      setBusy(false);
      setPending(null);
      setTimeout(() => setToast(null), 2500);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${collection}…`} aria-label={`Search ${collection}`} className="field-input sm:!w-64" />
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{visible.length} items</p>
      </div>
      <div className="overflow-x-auto border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              {columns.map((c) => <th key={c.key} className="px-4 py-2.5">{c.label}</th>)}
              <th className="px-4 py-2.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-card">
            {visible.map((it) => (
              <tr key={it.id}>
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3">
                     {c.key === 'translations' ? <TranslationStatus item={it} collection={collection} compact /> : c.render ? c.render(it) : String(it[c.key] ?? '-')}
                    {c.key === 'title' && it.status && <span className="ml-2"><StatusPill status={it.status} /></span>}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    {collection === 'projects' && it.status === 'draft' && (
                      <a href={`/admin/projects/preview/${encodeURIComponent(it.slug || it.id)}`} target="_blank" rel="noreferrer" className="border border-border px-3 py-1 text-xs hover:border-foreground">Preview</a>
                    )}
                    <button type="button" onClick={() => onEdit(it)} className="border border-border px-3 py-1 text-xs hover:border-foreground">Edit</button>
                    <button type="button" onClick={() => setPending(it)} className="border border-border px-3 py-1 text-xs text-red-600 hover:border-red-600 dark:text-red-400">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visible.length === 0 && <p className="bg-card p-8 text-center text-sm text-muted-foreground">No items yet. Create the first one.</p>}
      </div>
      <ConfirmDialog
        open={!!pending}
        title={`Delete “${pending?.title || pending?.name || pending?.subject}”?`}
        body="Tindakan ini permanen dan langsung mengubah website publik."
        confirmLabel="Delete permanently"
        busy={busy}
        onCancel={() => setPending(null)}
        onConfirm={remove}
      />
      <Toast toast={toast} />
    </div>
  );
}
