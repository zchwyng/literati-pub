'use client';

import { usePathname, useRouter } from 'next/navigation';
import { Globe } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { i18n, type Locale } from '../../i18n-config';

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  // Extract current locale from pathname
  const currentLocale = i18n.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  ) || i18n.defaultLocale;

  const handleLocaleChange = (newLocale: string) => {
    // Remove current locale from pathname if present
    let pathnameWithoutLocale = pathname;
    
    // Check if pathname starts with a locale
    const pathLocale = i18n.locales.find(
      (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
    );
    
    if (pathLocale) {
      // Remove locale prefix
      pathnameWithoutLocale = pathname.replace(`/${pathLocale}`, '') || '/';
    }
    
    // If pathname doesn't start with /, ensure it does
    if (!pathnameWithoutLocale.startsWith('/')) {
      pathnameWithoutLocale = `/${pathnameWithoutLocale}`;
    }
    
    // Navigate to new locale path
    const newPath = `/${newLocale}${pathnameWithoutLocale}`;
    router.push(newPath);
  };

  const localeNames: Record<Locale, string> = {
    en: 'English',
    sv: 'Svenska',
  };

  return (
    <Select value={currentLocale} onValueChange={handleLocaleChange}>
      <SelectTrigger className="w-[140px] h-8">
        <Globe className="h-4 w-4 mr-2 text-primary" />
        <SelectValue>
          {localeNames[currentLocale as Locale]}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {i18n.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {localeNames[locale]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

