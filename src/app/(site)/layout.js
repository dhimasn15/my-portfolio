import SiteHeader from '@/app/components/site/SiteHeader';
import SiteFooter from '@/app/components/site/SiteFooter';
import { getDB } from '@/app/lib/store';

export default async function SiteLayout({ children }) {
  let data = null;
  try {
    const db = await getDB();
    data = { profile: db.profile, socials: db.socials };
  } catch {
    data = null;
  }

  return (
    <>
      <SiteHeader profile={data?.profile} />
      {children}
      <SiteFooter profile={data?.profile} socials={data?.socials} />
    </>
  );
}
