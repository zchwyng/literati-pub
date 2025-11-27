import { NextRequest, NextResponse } from 'next/server';
import Negotiator from 'negotiator';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import { i18n } from './i18n-config';

function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

  return matchLocale(languages, i18n.locales, i18n.defaultLocale);
}

function getPathnameLocale(pathname: string): string | undefined {
  return i18n.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
}

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  const activeLocale = getPathnameLocale(pathname) ?? getLocale(request);
  const pathnameIsMissingLocale = !getPathnameLocale(pathname);

  if (pathnameIsMissingLocale) {
    return NextResponse.redirect(
      new URL(`/${activeLocale}${pathname}`, request.url)
    );
  }

  const headers = new Headers(request.headers);
  headers.set('x-locale', activeLocale);

  // For all routes with locale, pass through to Next.js
  // Next.js will match app/[locale]/... routes
  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
};
