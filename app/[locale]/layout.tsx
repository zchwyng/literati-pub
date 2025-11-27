import type { ReactNode } from 'react';

const locales = ['en', 'sv'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}
