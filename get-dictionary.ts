import 'server-only';
import type { Locale } from './i18n-config';
import type { Dictionary } from './dictionaries/types';

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import('./dictionaries/en').then((module) => module.default),
  sv: () => import('./dictionaries/sv').then((module) => module.default),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
