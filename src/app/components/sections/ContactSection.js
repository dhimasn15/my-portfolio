'use client';

import { useState } from 'react';
import { SectionHead } from '@/app/components/ui/bits';
import { useLocale } from '@/app/components/site/LocaleProvider';

export default function ContactSection({ profile, socials, formEnabled }) {
  const { t } = useLocale();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile?.email || '');
      setStatus('copied');
      setTimeout(() => setStatus((s) => (s === 'copied' ? 'idle' : s)), 2000);
    } catch {
      setStatus('idle');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setErrors({});
    const errs = {};
    if (form.name.trim().length < 2) errs.name = t.contact.errName;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = t.contact.errEmail;
    if (form.subject.trim().length < 2) errs.subject = t.contact.errSubject;
    if (form.message.trim().length < 10) errs.message = t.contact.errMessage;
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setStatus('sending');
    try {
      const r = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j.error || t.contact.errGeneric);
      }
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setErrors({ form: err.message });
      setStatus('idle');
    }
  };

  return (
    <section id="contact">
      <div className="wrap py-14 md:py-20">
        <SectionHead index={t.contact.index} title={t.contact.title} hint={t.contact.hint} />
        <div className="mt-8 grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div>
            <div className="panel divide-y divide-border">
              <div className="flex items-center justify-between gap-3 p-5">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.contact.email}</p>
                  <p className="mt-1 font-semibold">{profile?.email || '-'}</p>
                </div>
                <button type="button" onClick={copyEmail} className="btn-secondary !px-3 !py-2 text-xs">
                  {status === 'copied' ? `${t.contact.copied} ✓` : t.contact.copy}
                </button>
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.contact.elsewhere}</p>
                <div className="mt-2 flex flex-col gap-1.5 text-sm">
                  {socials?.github && <a className="hover:text-accent" href={socials.github} target="_blank" rel="noreferrer">GitHub ↗</a>}
                  {socials?.linkedin && <a className="hover:text-accent" href={socials.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}
                  {socials?.whatsapp && <a className="hover:text-accent" href={socials.whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>}
                </div>
              </div>
              <div className="p-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{t.contact.location}</p>
                <p className="mt-1 text-sm">{profile?.location || 'Indonesia'}</p>
              </div>
            </div>
          </div>

          <div className="panel p-6">
            {!formEnabled ? (
              <p className="text-sm text-muted-foreground">{t.contact.disabled}</p>
            ) : status === 'sent' ? (
              <div role="status" className="py-10 text-center">
                <p className="text-xl font-bold">{t.contact.successTitle} ✓</p>
                <p className="mt-2 text-sm text-muted-foreground">{t.contact.successBody}</p>
                <button type="button" onClick={() => setStatus('idle')} className="btn-secondary mt-6">{t.contact.sendAnother}</button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 className="text-lg font-bold">{t.contact.formTitle}</h3>
                {errors.form && <p role="alert" className="mt-3 border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{errors.form}</p>}
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="field-label" htmlFor="c-name">{t.contact.name}</label>
                    <input id="c-name" className="field-input" value={form.name} onChange={set('name')} placeholder={t.contact.namePh} autoComplete="name" />
                    {errors.name && <p className="field-error">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="field-label" htmlFor="c-email">{t.contact.emailLabel}</label>
                    <input id="c-email" type="email" className="field-input" value={form.email} onChange={set('email')} placeholder={t.contact.emailPh} autoComplete="email" />
                    {errors.email && <p className="field-error">{errors.email}</p>}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="field-label" htmlFor="c-subject">{t.contact.subject}</label>
                  <input id="c-subject" className="field-input" value={form.subject} onChange={set('subject')} placeholder={t.contact.subjectPh} />
                  {errors.subject && <p className="field-error">{errors.subject}</p>}
                </div>
                <div className="mt-4">
                  <label className="field-label" htmlFor="c-message">{t.contact.message}</label>
                  <textarea id="c-message" rows={6} className="field-input resize-y" value={form.message} onChange={set('message')} placeholder={t.contact.messagePh} />
                  {errors.message && <p className="field-error">{errors.message}</p>}
                </div>
                <button type="submit" disabled={status === 'sending'} className="btn-primary mt-6 w-full disabled:opacity-60">
                  {status === 'sending' ? t.contact.sending : `${t.contact.send} →`}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
