import { headers } from 'next/headers';
import { i18n, type Locale } from '../i18n-config';

export default function Loading() {
  const localeHeader = headers().get('x-locale');
  const locale: Locale = i18n.locales.includes(localeHeader as Locale)
    ? (localeHeader as Locale)
    : i18n.defaultLocale;

  const label = locale === 'sv' ? 'Laddar...' : 'Loading...';

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="animate-pulse text-zinc-500">{label}</div>
    </div>
  );
}

