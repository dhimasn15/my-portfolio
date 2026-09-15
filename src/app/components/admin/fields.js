'use client';

import { useState } from 'react';

export function Field({ label, error, children, hint }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function TextInput({ value, onChange, ...rest }) {
  return <input className="field-input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...rest} />;
}

export function TextArea({ value, onChange, ...rest }) {
  return <textarea className="field-input resize-y" value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...rest} />;
}

export function Select({ value, onChange, options, ...rest }) {
  return (
    <select className="field-input" value={value ?? ''} onChange={(e) => onChange(e.target.value)} {...rest}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}

export function Check({ checked, onChange, label }) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm">
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} className="h-4 w-4 accent-[hsl(var(--accent))]" />
      {label}
    </label>
  );
}

export function ListEditor({ values, onChange, placeholder }) {
  const [draft, setDraft] = useState('');
  const arr = values || [];
  return (
    <div>
      <ul className="space-y-1.5">
        {arr.map((v, i) => (
          <li key={i} className="flex items-center gap-2 border border-border px-3 py-1.5 text-sm">
            <span className="flex-1">{v}</span>
            <button type="button" aria-label={`Remove ${v}`} onClick={() => onChange(arr.filter((_, j) => j !== i))} className="font-mono text-muted-foreground hover:text-red-600">×</button>
          </li>
        ))}
      </ul>
      <div className="mt-2 flex gap-2">
        <input
          className="field-input"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={placeholder || 'Add item + Enter'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && draft.trim()) {
              e.preventDefault();
              onChange([...arr, draft.trim()]);
              setDraft('');
            }
          }}
        />
        <button
          type="button"
          onClick={() => {
            if (draft.trim()) {
              onChange([...arr, draft.trim()]);
              setDraft('');
            }
          }}
          className="btn-secondary !px-3"
        >
          Add
        </button>
      </div>
    </div>
  );
}

export function ImageUpload({ value, onChange, folder, label }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', folder || 'projects');
      const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'Upload gagal');
      onChange(j.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt={label || 'preview'} className="h-24 w-32 border border-border object-cover object-top" />
        ) : (
          <div className="flex h-24 w-32 items-center justify-center border border-dashed border-border font-mono text-[10px] uppercase text-muted-foreground">
            no image
          </div>
        )}
        <div className="flex-1">
          <TextInput value={value} onChange={onChange} placeholder="/uploads/… atau /projects/…" />
          <label className="btn-secondary mt-2 inline-flex cursor-pointer !px-3 !py-2 text-xs">
            {busy ? 'Uploading…' : 'Upload gambar'}
            <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={pick} className="hidden" disabled={busy} />
          </label>
        </div>
      </div>
      {error && <p className="field-error">{error}</p>}
      <p className="mt-1 text-xs text-muted-foreground">PNG/JPG/WEBP/GIF, maksimal 5MB. Tersimpan di /public/uploads.</p>
    </div>
  );
}

export function GalleryUpload({ values, onChange, folder }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const arr = values || [];

  const pick = async (e) => {
    const files = Array.from(e.target.files || []);
    e.target.value = '';
    if (files.length === 0) return;
    setBusy(true);
    setError('');
    try {
      const uploaded = [];
      for (const file of files) {
        const fd = new FormData();
        fd.append('file', file);
        fd.append('folder', folder || 'projects');
        const r = await fetch('/api/admin/upload', { method: 'POST', body: fd });
        const j = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(j.error || `Upload gagal: ${file.name}`);
        uploaded.push(j.url);
      }
      onChange([...arr, ...uploaded]);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      {arr.length > 0 && (
        <div className="mb-3 grid grid-cols-3 gap-2 sm:grid-cols-4">
          {arr.map((src, i) => (
            <div key={i} className="relative border border-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt={`gallery ${i + 1}`} className="aspect-[4/3] w-full object-cover object-top" />
              <button
                type="button"
                aria-label={`Remove image ${i + 1}`}
                onClick={() => onChange(arr.filter((_, j) => j !== i))}
                className="absolute right-1 top-1 bg-black/70 px-1.5 font-mono text-xs text-white hover:bg-red-600"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
      <ListEditor values={arr} onChange={onChange} placeholder="Tempel URL gambar + Enter" />
      <label className="btn-secondary mt-2 inline-flex cursor-pointer !px-3 !py-2 text-xs">
        {busy ? 'Uploading…' : 'Upload beberapa gambar'}
        <input type="file" accept="image/png,image/jpeg,image/webp,image/gif" multiple onChange={pick} className="hidden" disabled={busy} />
      </label>
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

export function ConfirmDialog({ open, title, body, confirmLabel, onCancel, onConfirm, busy }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="alertdialog" aria-modal="true" aria-label={title}>
      <button aria-label="Cancel" onClick={onCancel} className="absolute inset-0 bg-black/40" />
      <div className="relative w-full max-w-sm border border-border bg-card p-6 shadow-xl">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{body}</p>
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onCancel} className="btn-secondary !px-4 !py-2 text-sm">Cancel</button>
          <button type="button" onClick={onConfirm} disabled={busy} className="inline-flex items-center bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60">
            {busy ? 'Deleting…' : confirmLabel || 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Toast({ toast }) {
  if (!toast) return null;
  return (
    <div role="status" className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 border px-4 py-2.5 text-sm shadow-lg ${toast.type === 'error' ? 'border-red-300 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200' : 'border-border bg-card'}`}>
      {toast.text}
    </div>
  );
}
