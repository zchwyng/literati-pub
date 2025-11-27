import type { ReactNode } from 'react';
import { i18n, type Locale } from '../../i18n-config';

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  
  // Just pass through children - root layout handles html/body
  return children;
}
