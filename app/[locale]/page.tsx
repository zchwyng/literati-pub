import Link from 'next/link';
import { stackServerApp } from '../../stack';
import LandingUploader from '../components/LandingUploader';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Headphones,
  Printer,
  Zap,
  CheckCircle2,
  FileText,
  Sparkles,
  ScrollText,
  Feather,
} from 'lucide-react';
import type { Locale } from '../../i18n-config';
import { getDictionary } from '../../get-dictionary';
import type { FeatureIcon } from '../../dictionaries/types';
import type { ReactNode } from 'react';

const featureIcons: Record<FeatureIcon, JSX.Element> = {
  headphones: <Headphones className="h-8 w-8 text-primary" />,
  printer: <Printer className="h-8 w-8 text-primary" />,
  book: <BookOpen className="h-8 w-8 text-primary" />,
  zap: <Zap className="h-8 w-8 text-primary" />,
  sparkles: <Sparkles className="h-8 w-8 text-primary" />,
  file: <FileText className="h-8 w-8 text-primary" />,
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  const user = await stackServerApp.getUser();
  const dictionary = await getDictionary(locale);
  const copyright = dictionary.footer.copyright.replace(
    '{year}',
    String(new Date().getFullYear())
  );

  const localizedPath = (path: string) =>
    path === '/' ? `/${locale}` : `/${locale}${path}`;

  return (
    <div className="relative min-h-screen font-sans">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-linear-to-br from-amber-50 via-white to-sky-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-sky-950" />
        <div className="absolute inset-x-10 top-12 h-64 rounded-[48px] bg-white/70 dark:bg-white/5 blur-3xl border border-white/60 dark:border-white/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(14,165,233,0.18),transparent_32%),radial-gradient(circle_at_80%_0%,rgba(251,191,36,0.18),transparent_28%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-white/70 via-white/80 to-white dark:from-black/70 dark:via-black/70 dark:to-black backdrop-blur-xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center shadow-sm">
            <ScrollText className="h-4 w-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {dictionary.nav.brand}
            </span>
            <Badge className="bg-primary/10 text-primary border-primary/30 text-xs px-2 py-0.5">
              {dictionary.nav.beta}
            </Badge>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <LanguageSwitcher />
          {user ? (
            <Button
              asChild
              variant="ghost"
              className="bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm"
            >
              <Link href={localizedPath('/dashboard')}>
                {dictionary.nav.dashboard}
              </Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-white/20 dark:hover:bg-black/20"
              >
                <Link href={localizedPath('/handler/sign-in')}>
                  {dictionary.nav.signIn}
                </Link>
              </Button>
              <Button
                asChild
                className="rounded-full px-6 shadow-lg hover:shadow-md transition-all"
              >
                <Link href={localizedPath('/handler/sign-up')}>
                  {dictionary.nav.signUp}
                </Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-16 pb-16 sm:pt-24 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              {dictionary.hero.badge}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white drop-shadow-sm leading-tight">
                {dictionary.hero.title}
                <span className="block text-primary">{dictionary.hero.highlight}</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed font-medium text-pretty">
                {dictionary.hero.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-300">
              {dictionary.hero.checklist.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full bg-white/80 dark:bg-zinc-900/60 px-3 py-2 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                >
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {item}
                </span>
              ))}
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-lg shadow-lg p-4">
                <LandingUploader />
                <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {dictionary.hero.uploaderNote}
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                {dictionary.hero.quickSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold">
                      {index + 1}
                    </div>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 bg-primary/10 blur-3xl rounded-3xl" />
            <div className="relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 shadow-2xl p-8 space-y-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl bg-primary/15 text-primary flex items-center justify-center">
                  <Feather className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {dictionary.hero.cardLabel}
                  </p>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                    {dictionary.hero.cardTitle}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {dictionary.hero.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      {stat.label}
                    </p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-white">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-primary/10 p-6 border border-primary/20 space-y-3">
                <div className="flex items-center gap-3 text-primary font-semibold">
                  <Sparkles className="h-5 w-5" />
                  {dictionary.hero.promiseTitle}
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  {dictionary.hero.promiseDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 py-24 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl border-y border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              {dictionary.howItWorks.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {dictionary.howItWorks.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {dictionary.howItWorks.steps.map((step) => (
              <Step key={step.number} {...step} />
            ))}
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="relative z-10 py-28 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              {dictionary.features.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {dictionary.features.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {dictionary.features.items.map((feature) => (
              <Feature
                key={feature.title}
                title={feature.title}
                description={feature.description}
                icon={featureIcons[feature.icon]}
                image={feature.image}
              />
            ))}
          </div>

          <div className="rounded-3xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs uppercase tracking-wide text-primary border border-primary/20">
                {dictionary.callout.tag}
              </div>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                {dictionary.callout.title}
              </h3>
              <p className="text-base text-zinc-700 dark:text-zinc-300">
                {dictionary.callout.description}
              </p>
            </div>
            <Button asChild className="rounded-full px-6 shadow-lg hover:shadow-md transition-all">
              <Link href={localizedPath('#')}>{dictionary.callout.action}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10 py-24 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              {dictionary.benefits.title}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {dictionary.benefits.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {dictionary.benefits.items.map((benefit) => (
              <Benefit key={benefit.title} {...benefit} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-black/50 border-t border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-4">{copyright}</p>
          <div className="flex justify-center gap-6">
            <Link
              href={localizedPath('#')}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {dictionary.footer.privacy}
            </Link>
            <Link
              href={localizedPath('#')}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {dictionary.footer.terms}
            </Link>
            <Link
              href={localizedPath('#')}
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              {dictionary.footer.contact}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  title,
  description,
  icon,
  image,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  image?: string;
}) {
  return (
    <div className="flex flex-col items-start p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-sm transition-all overflow-hidden">
      {image && (
        <div className="w-full h-48 -m-6 mb-4 relative overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-zinc-900/50 to-transparent" />
        </div>
      )}
      <div className="mb-6 p-4 bg-primary/10 rounded-xl">{icon}</div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function Step({
  number,
  title,
  description,
  image,
}: {
  number: string;
  title: string;
  description: string;
  image?: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      {image && (
        <div className="mb-6 w-full h-48 rounded-xl overflow-hidden relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shadow-lg">
            {number}
          </div>
        </div>
      )}
      {!image && (
        <div className="mb-6 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
          {number}
        </div>
      )}
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function Benefit({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 p-6 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800">
      <CheckCircle2 className="h-6 w-6 text-primary mt-1 shrink-0" />
      <div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
