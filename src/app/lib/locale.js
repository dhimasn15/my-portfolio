import { cookies } from 'next/headers';
import { DEFAULT_LOCALE, LOCALE_COOKIE, normalizeLocale } from '@/app/lib/i18n';

export function getLocale() {
  try {
    const value = cookies().get(LOCALE_COOKIE)?.value;
    return normalizeLocale(value || DEFAULT_LOCALE);
  } catch {
    return DEFAULT_LOCALE;
  }
}
