'use client';

import { useRouter } from 'next/navigation';
import { useLocale } from './LocaleProvider';
import { LOCALE_COOKIE } from '@/app/lib/i18n';

export default function LanguageToggle() {
  const { locale, t } = useLocale();
  const router = useRouter();
  const next = locale === 'id' ? 'en' : 'id';

  const switchTo = () => {
    document.cookie = `${LOCALE_COOKIE}=${next}; Path=/; Max-Age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={switchTo}
      aria-label={t.lang.switchTo}
      title={t.lang.switchTo}
      className="inline-flex h-9 items-center justify-center gap-1 border border-border px-2.5 font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-foreground"
    >
      <span className={locale === 'id' ? 'text-accent' : 'text-muted-foreground'}>ID</span>
      <span className="text-border" aria-hidden>/</span>
      <span className={locale === 'en' ? 'text-accent' : 'text-muted-foreground'}>EN</span>
    </button>
  );
}
