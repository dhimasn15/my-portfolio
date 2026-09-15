import { cookies } from 'next/headers';
import { verifySession, adminCookieName } from '@/app/lib/auth';

export function getAdminSession() {
  const token = cookies().get(adminCookieName)?.value;
  return verifySession(token);
}

export function requireAdmin() {
  const session = getAdminSession();
  if (!session) {
    return null;
  }
  return session;
}
