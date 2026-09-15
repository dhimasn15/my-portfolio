import './globals.css';
import LocaleProvider from './components/site/LocaleProvider';
import { getDB } from '@/app/lib/store';
import { getLocale } from '@/app/lib/locale';
import { localized } from '@/app/lib/i18n';

export async function generateMetadata() {
  try {
    const db = await getDB();
    const locale = getLocale();
    const s = db.settings || {};
    const p = db.profile || {};
    const title = localized(s, 'siteTitle', locale) || `${p.name || 'Dhimas Nurhidayat'} - Full Stack Developer`;
    const description = localized(s, 'siteDescription', locale) || localized(p, 'bio', locale);
    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: s.ogImage ? [s.ogImage] : [],
        type: 'website',
      },
      twitter: { card: 'summary_large_image' },
      metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    };
  } catch {
    return {
      title: 'Dhimas Nurhidayat - Full Stack Developer',
      description: 'Personal website of Dhimas Nurhidayat.',
    };
  }
}

export default async function RootLayout({ children }) {
  const locale = getLocale();

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body className="font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('dn-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})();`,
          }}
        />
        <LocaleProvider locale={locale}>
          <main id="main">{children}</main>
        </LocaleProvider>
      </body>
    </html>
  );
}
