'use client';

import { createContext, useContext } from 'react';
import { getDictionary, DEFAULT_LOCALE } from '@/app/lib/i18n';

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  t: getDictionary(DEFAULT_LOCALE),
});

export function useLocale() {
  return useContext(LocaleContext);
}

export default function LocaleProvider({ locale, children }) {
  const t = getDictionary(locale);
  return (
    <LocaleContext.Provider value={{ locale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}
