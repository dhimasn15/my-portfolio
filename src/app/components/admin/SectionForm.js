'use client';

import { useState } from 'react';
import { Field, TextInput, TextArea, Check, ImageUpload, Toast } from '@/app/components/admin/fields';
import { getTranslationStatus } from '@/app/components/admin/translation';

function LangTabs({ lang, setLang, form, section }) {
  return (
    <div className="flex items-center gap-2 border-y border-border py-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Konten bahasa:</span>
      {['id', 'en'].map((l) => {
        const status = getTranslationStatus(form, section, l);
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

export function SectionForm({ section, initial, onSaved }) {
  const [form, setForm] = useState(initial || {});
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [saving, setSaving] = useState(false);
  const [lang, setLang] = useState('id');
  const set = (k) => (v) => setForm((f) => ({ ...f, [k]: v }));
  const id = lang === 'id';
  const f = (k) => (id ? k : `${k}_en`);
  const setL = (k) => set(f(k));

  const save = async (e) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);
    try {
      const r = await fetch('/api/admin/section', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ section, data: form }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        if (j.issues) setErrors(j.issues);
        const first = Object.values(j.issues || {})[0];
        throw new Error(Array.isArray(first) ? first[0] : j.error || 'Save gagal');
      }
      setErrors({});
      setToast({ text: 'Saved ✓ public website updated.' });
      onSaved?.(j);
    } catch (err) {
      setToast({ type: 'error', text: err.message });
    } finally {
      setSaving(false);
      setTimeout(() => setToast(null), 3000);
    }
  };

  const err = (k) => (errors[k] ? errors[k].join(', ') : null);

  return (
    <form onSubmit={save} className="panel space-y-5 p-6">
      {section === 'profile' && (
        <>
          <LangTabs lang={lang} setLang={setLang} form={form} section={section} />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" error={err('name')}><TextInput value={form.name} onChange={set('name')} /></Field>
            <Field label="Short name" error={err('shortName')}><TextInput value={form.shortName} onChange={set('shortName')} /></Field>
          </div>
          <Field label={`Headline (${lang.toUpperCase()})`} error={id ? err('headline') : null}>
            <TextInput value={form[f('headline')]} onChange={setL('headline')} />
          </Field>
          <Field label={`Bio - hero (${lang.toUpperCase()})`} error={id ? err('bio') : null}>
            <TextArea rows={3} value={form[f('bio')]} onChange={setL('bio')} />
          </Field>
          <Field label={`Long bio - about (${lang.toUpperCase()})`} error={id ? err('longBio') : null}>
            <TextArea rows={5} value={form[f('longBio')]} onChange={setL('longBio')} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label={`Location (${lang.toUpperCase()})`} error={id ? err('location') : null}>
              <TextInput value={form[f('location')]} onChange={setL('location')} />
            </Field>
            <Field label={`Availability note (${lang.toUpperCase()})`}>
              <TextInput value={form[f('availabilityNote')]} onChange={setL('availabilityNote')} />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Email" error={err('email')}><TextInput value={form.email} onChange={set('email')} /></Field>
            <Field label="Phone" error={err('phone')}><TextInput value={form.phone} onChange={set('phone')} /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Profile image" error={err('profileImage')}><ImageUpload value={form.profileImage} onChange={set('profileImage')} folder="profile" label="profile" /></Field>
            <Field label="Resume URL"><TextInput value={form.resumeUrl} onChange={set('resumeUrl')} /></Field>
          </div>
          <Check checked={form.availability} onChange={set('availability')} label="Available for projects" />
        </>
      )}
      {section === 'socials' && (
        <div className="grid gap-4 sm:grid-cols-2">
          {['github', 'linkedin', 'instagram', 'whatsapp', 'website'].map((k) => (
            <Field key={k} label={k} error={err(k)}><TextInput value={form[k]} onChange={set(k)} placeholder="https://…" /></Field>
          ))}
          <Field label="Email link" error={err('email')}><TextInput value={form.email} onChange={set('email')} /></Field>
        </div>
      )}
      {section === 'settings' && (
        <>
          <LangTabs lang={lang} setLang={setLang} form={form} section={section} />
          <Field label={`Site title (${lang.toUpperCase()})`} error={id ? err('siteTitle') : null}>
            <TextInput value={form[f('siteTitle')]} onChange={setL('siteTitle')} />
          </Field>
          <Field label={`Site description (${lang.toUpperCase()})`} error={id ? err('siteDescription') : null}>
            <TextArea rows={3} value={form[f('siteDescription')]} onChange={setL('siteDescription')} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="OG image" error={err('ogImage')}><ImageUpload value={form.ogImage} onChange={set('ogImage')} folder="site" label="og image" /></Field>
            <Field label="Accent"><TextInput value={form.accent} onChange={set('accent')} /></Field>
          </div>
          <div className="flex flex-col gap-3">
            <Check checked={form.showGithubSection} onChange={set('showGithubSection')} label="Show GitHub section" />
            <Check checked={form.showContactForm} onChange={set('showContactForm')} label="Enable contact form" />
          </div>
        </>
      )}
      <div className="flex items-center gap-3 border-t border-border pt-5">
        <button type="submit" disabled={saving} className="btn-primary !px-5 !py-2.5 text-sm disabled:opacity-60">
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <a href="/" target="_blank" rel="noreferrer" className="text-sm underline underline-offset-4 hover:text-accent">Preview ↗</a>
      </div>
      <Toast toast={toast} />
    </form>
  );
}
