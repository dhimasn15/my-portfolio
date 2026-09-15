'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AdminLoginForm() {
  const params = useSearchParams();
  const next = params.get('next') || '/admin';
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const r = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || 'Login gagal');
      window.location.href = next;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-sm flex-col justify-center px-5 py-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">DHIMAS CMS / login</p>
      <h1 className="mt-3 text-3xl font-extrabold tracking-tight">Admin access</h1>
      <p className="mt-2 text-sm text-muted-foreground">Halaman ini tidak untuk visitor. Kredensial via environment variables.</p>
      <form onSubmit={submit} className="panel mt-8 space-y-4 p-6">
        {error && <p role="alert" className="border border-red-300 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-200">{error}</p>}
        <div>
          <label className="field-label" htmlFor="a-email">Email</label>
          <input id="a-email" type="email" autoComplete="username" className="field-input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        </div>
        <div>
          <label className="field-label" htmlFor="a-pass">Password</label>
          <input id="a-pass" type="password" autoComplete="current-password" className="field-input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in →'}
        </button>
        <p className="font-mono text-[11px] leading-relaxed text-muted-foreground">
          Default dev: admin@local.test / admin123 - ganti via ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET.
        </p>
      </form>
      <a href="/" className="mt-6 text-sm underline underline-offset-4 hover:text-accent">← Back to website</a>
    </div>
  );
}
