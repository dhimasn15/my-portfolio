import { Suspense } from 'react';
import AdminLoginForm from './AdminLoginForm';

export const metadata = { title: 'Admin Login - DHIMAS CMS', robots: 'noindex, nofollow' };

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<p className="wrap py-16 text-sm text-muted-foreground">Loading…</p>}>
      <AdminLoginForm />
    </Suspense>
  );
}
