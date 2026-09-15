import { createHmac, timingSafeEqual } from 'node:crypto';

const COOKIE_NAME = 'dn_admin';
const SESSION_TTL_MS = 1000 * 60 * 60 * 12; // 12h

function getConfig() {
  const email = process.env.ADMIN_EMAIL || 'admin@local.test';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const secret = process.env.ADMIN_SESSION_SECRET || 'dev-only-secret-change-me';
  const isDefault = !process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD;
  return { email, password, secret, isDefault };
}

export const adminCookieName = COOKIE_NAME;
export const adminConfigWarning = () =>
  getConfig().isDefault
    ? 'ADMIN_EMAIL / ADMIN_PASSWORD belum diset - memakai kredensial default dev.'
    : null;

function sign(payload, secret) {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function createSession(email) {
  const { secret } = getConfig();
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `${email}:${exp}`;
  const sig = sign(payload, secret);
  const token = Buffer.from(`${payload}:${sig}`).toString('base64url');
  return { token, exp };
}

export function verifySession(token) {
  try {
    if (!token) return null;
    const { secret, email } = getConfig();
    const decoded = Buffer.from(token, 'base64url').toString('utf-8');
    const [tokenEmail, expStr, sig] = decoded.split(':');
    if (!tokenEmail || !expStr || !sig) return null;
    if (tokenEmail !== email) return null;
    const exp = Number(expStr);
    if (!Number.isFinite(exp) || exp < Date.now()) return null;
    const expected = sign(`${tokenEmail}:${exp}`, secret);
    const a = Buffer.from(expected);
    const b = Buffer.from(sig);
    if (a.length !== b.length) return null;
    if (!timingSafeEqual(a, b)) return null;
    return { email: tokenEmail, exp };
  } catch {
    return null;
  }
}

export function checkCredentials(email, password) {
  const cfg = getConfig();
  return email === cfg.email && password === cfg.password;
}

export function sessionCookie(token, exp) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=43200${secure}`;
}

export function clearSessionCookie() {
  return `${COOKIE_NAME}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0`;
}
