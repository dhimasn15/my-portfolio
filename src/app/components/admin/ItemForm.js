'use client';

import { useState } from 'react';
import { Field, TextInput, TextArea, Select, Check, ListEditor, ImageUpload, GalleryUpload, Toast } from '@/app/components/admin/fields';
import { getTranslationStatus } from '@/app/components/admin/translation';

function toList(v) {
  if (Array.isArray(v)) return v;
  if (typeof v === 'string') return v.split(',').map((s) => s.trim()).filter(Boolean);
  return [];
}

function LangTabs({ lang, setLang, form, collection }) {
  return (
    <div className="flex items-center gap-2 border-y border-border py-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Konten bahasa:</span>
      {['id', 'en'].map((l) => {
        const status = getTranslationStatus(form, collection, l);
        return (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${
            lang === l ? 'border-foreground bg-foreground text-background' : 'border-border text-muted-foreground hover:border-foreground'
          }`}
        >
          <span>{l === 'id' ? 'Indonesia' : 'English'}</span>
          <span className={status.isComplete ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}>
            {status.complete}/{status.total} {status.isComplete ? 'OK' : '!'}
          </span>
        </button>
        );
      })}
    </div>
  );
}

export function ItemForm({ collection, initial, onClose, onSaved }) {
  const [form, setForm] = useState(initial || {});
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState('id');
  const isEdit = !!initial?.id;
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const slugify = (t) =>
    String(t || '')
      .toLowerCase()
      .normalize('NFKD')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
      .slice(0, 80);
  const setTitle = (v) =>
    setForm((f) => ({ ...f, title: v, slug: slugTouched ? f.slug : slugify(v) }));
  const setSlug = (v) => {
    setSlugTouched(true);
    set('slug')(v);
  };
  const err = (k) => (errors[k] ? errors[k].join(', ') : null);

  const save = async (e) => {
    e.preventDefault();
    setErrors({});
    const local = {};
    if (!String(form.title || '').trim() || String(form.title).trim().length < 3) local.title = ['Judul minimal 3 karakter.'];
    if (String(form.shortDescription || '').trim().length < 10) local.shortDescription = ['Deskripsi singkat minimal 10 karakter.'];
    if (String(form.description || '').trim().length < 20) local.description = ['Deskripsi minimal 20 karakter.'];
    if (collection === 'projects' && String(form.role || '').trim().length < 2) local.role = ['Role minimal 2 karakter.'];
    if (collection === 'experience') {
      if (String(form.company || '').trim().length < 2) local.company = ['Company minimal 2 karakter.'];
      if (String(form.startDate || '').trim().length < 4) local.startDate = ['Tanggal mulai wajib (mis. 2025-08-01).'];
    }
    if (collection === 'education') {
      if (String(form.institution || '').trim().length < 2) local.institution = ['Institusi minimal 2 karakter.'];
      if (String(form.field || '').trim().length < 2) local.field = ['Field minimal 2 karakter.'];
      if (String(form.startDate || '').trim().length < 4) local.startDate = ['Tanggal mulai wajib.'];
    }
    if (collection === 'skills' && String(form.name || '').trim().length < 1) local.name = ['Nama skill wajib diisi.'];
    if (Object.keys(local).length > 0) {
      setErrors(local);
      setLang('id');
      setToast({ type: 'error', text: 'Lengkapi field yang wajib diisi.' });
      setTimeout(() => setToast(null), 3000);
      return;
    }
    setSaving(true);
    try {
      const method = isEdit ? 'PUT' : 'POST';
      const r = await fetch('/api/admin/item', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ collection, id: initial?.id, data: form }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        if (j.issues) {
          setErrors(j.issues);
          const first = Object.values(j.issues)[0];
          throw new Error(Array.isArray(first) ? first[0] : j.error || 'Validasi gagal');
        }
        throw new Error(j.error || 'Save gagal');
      }
      setToast({ text: isEdit ? 'Updated ✓' : 'Created ✓' });
      setTimeout(() => onSaved?.(j), 600);
    } catch (e2) {
      setToast({ type: 'error', text: e2.message });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const id = lang === 'id';
  const f = (k) => (id ? k : `${k}_en`);
  const setL = (k) => set(f(k));

  return (
    <form onSubmit={save} className="panel space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">{isEdit ? 'Edit' : 'New'} {collection}</h2>
        <button type="button" onClick={onClose} className="text-sm underline underline-offset-4 hover:text-accent">← Back to list</button>
      </div>

      {['projects', 'experience', 'education', 'skills'].includes(collection) && (
        <LangTabs lang={lang} setLang={setLang} form={form} collection={collection} />
      )}

      {collection === 'projects' && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Title (${lang.toUpperCase()})`} error={id ? err('title') : null}>
              <TextInput value={form[f('title')]} onChange={id ? setTitle : setL('title')} />
            </Field>
            <Field label="Slug" hint="Otomatis dari judul - bisa diubah manual">
              <TextInput value={form.slug} onChange={setSlug} />
            </Field>
          </div>
          <Field label={`Short description (${lang.toUpperCase()})`} error={id ? err('shortDescription') : null}>
            <TextInput value={form[f('shortDescription')]} onChange={setL('shortDescription')} />
          </Field>
          <Field label={`Description (${lang.toUpperCase()})`} error={id ? err('description') : null}>
            <TextArea rows={4} value={form[f('description')]} onChange={setL('description')} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Category"><TextInput value={form.category} onChange={set('category')} placeholder="WEB" /></Field>
            <Field label={`Role (${lang.toUpperCase()})`} error={id ? err('role') : null}>
              <TextInput value={form[f('role')]} onChange={setL('role')} />
            </Field>
            <Field label="Order"><TextInput type="number" value={form.order ?? 99} onChange={(v) => set('order')(Number(v))} /></Field>
          </div>
          <Field label="Technologies (comma or list)"><ListEditor values={toList(form.technologies)} onChange={(v) => set('technologies')(v)} placeholder="React + Enter" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Thumbnail" error={err('thumbnail')}><ImageUpload value={form.thumbnail} onChange={set('thumbnail')} folder="projects" label="thumbnail" /></Field>
            <Field label="Status">
              <Select value={form.status || 'draft'} onChange={set('status')} options={[{ value: 'draft', label: 'draft' }, { value: 'published', label: 'published' }, { value: 'archived', label: 'archived' }]} />
            </Field>
          </div>
          <Field label="Gallery images"><GalleryUpload values={toList(form.images)} onChange={(v) => set('images')(v)} folder="projects" /></Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="GitHub URL"><TextInput value={form.githubUrl} onChange={set('githubUrl')} /></Field>
            <Field label="Live URL"><TextInput value={form.liveUrl} onChange={set('liveUrl')} /></Field>
          </div>
          <Field label={`Problem (${lang.toUpperCase()})`}><TextArea rows={2} value={form[f('problem')]} onChange={setL('problem')} /></Field>
          <Field label={`Solution (${lang.toUpperCase()})`}><TextArea rows={2} value={form[f('solution')]} onChange={setL('solution')} /></Field>
          <Field label={`Features (${lang.toUpperCase()})`}><ListEditor values={toList(form[f('features')])} onChange={(v) => set(f('features'))(v)} /></Field>
          <Check checked={form.featured} onChange={set('featured')} label="Featured on homepage" />
        </>
      )}

      {collection === 'experience' && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Title (${lang.toUpperCase()})`} error={id ? err('title') : null}>
              <TextInput value={form[f('title')]} onChange={setL('title')} />
            </Field>
            <Field label={`Company (${lang.toUpperCase()})`} error={id ? err('company') : null}>
              <TextInput value={form[f('company')]} onChange={setL('company')} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={`Type (${lang.toUpperCase()})`}><TextInput value={form[f('type')]} onChange={setL('type')} placeholder="Teaching" /></Field>
            <Field label="Location"><TextInput value={form.location} onChange={set('location')} /></Field>
            <Field label="Order"><TextInput type="number" value={form.order ?? 99} onChange={(v) => set('order')(Number(v))} /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Start date"><TextInput value={form.startDate} onChange={set('startDate')} placeholder="2025-08-01" /></Field>
            <Field label="End date"><TextInput value={form.endDate} onChange={set('endDate')} placeholder="2025-12-31" /></Field>
          </div>
          <Field label={`Description (${lang.toUpperCase()})`} error={id ? err('description') : null}>
            <TextArea rows={4} value={form[f('description')]} onChange={setL('description')} />
          </Field>
          <Field label={`Responsibilities (${lang.toUpperCase()})`}><ListEditor values={toList(form[f('responsibilities')])} onChange={(v) => set(f('responsibilities'))(v)} /></Field>
          <Field label="Technologies"><ListEditor values={toList(form.technologies)} onChange={(v) => set('technologies')(v)} /></Field>
          <div className="flex gap-6">
            <Check checked={form.current} onChange={set('current')} label="Current" />
            <Check checked={form.featured} onChange={set('featured')} label="Featured" />
          </div>
        </>
      )}

      {collection === 'education' && (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Institution" error={err('institution')}><TextInput value={form.institution} onChange={set('institution')} /></Field>
            <Field label={`Field (${lang.toUpperCase()})`} error={id ? err('field') : null}>
              <TextInput value={form[f('field')]} onChange={setL('field')} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label={`Degree (${lang.toUpperCase()})`}><TextInput value={form[f('degree')]} onChange={setL('degree')} placeholder="S1 / SMK" /></Field>
            <Field label="Start"><TextInput value={form.startDate} onChange={set('startDate')} /></Field>
            <Field label="End"><TextInput value={form.endDate} onChange={set('endDate')} /></Field>
          </div>
          <Field label={`Description (${lang.toUpperCase()})`}><TextArea rows={3} value={form[f('description')]} onChange={setL('description')} /></Field>
          <div className="flex gap-6">
            <Field label="Order"><TextInput type="number" value={form.order ?? 99} onChange={(v) => set('order')(Number(v))} /></Field>
            <Check checked={form.current} onChange={set('current')} label="Current" />
          </div>
        </>
      )}

      {collection === 'skills' && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Name" error={err('name')}><TextInput value={form.name} onChange={set('name')} /></Field>
            <Field label="Category">
              <Select value={form.category || 'Frontend'} onChange={set('category')} options={['Frontend', 'Backend', 'Database', 'DevOps', 'Tools', 'Other'].map((v) => ({ value: v, label: v }))} />
            </Field>
            <Field label="Order"><TextInput type="number" value={form.order ?? 99} onChange={(v) => set('order')(Number(v))} /></Field>
          </div>
          <Field label={`Description (${lang.toUpperCase()})`}><TextInput value={form[f('description')]} onChange={setL('description')} /></Field>
          <Check checked={form.featured} onChange={set('featured')} label="Core skill" />
        </>
      )}

      <div className="flex gap-3 border-t border-border pt-5">
        <button type="submit" disabled={saving} className="btn-primary !px-5 !py-2.5 text-sm disabled:opacity-60">{saving ? 'Saving…' : isEdit ? 'Save changes' : 'Create'}</button>
        <button type="button" onClick={onClose} className="btn-secondary !px-5 !py-2.5 text-sm">Cancel</button>
      </div>
      <Toast toast={toast} />
    </form>
  );
}
