import Link from 'next/link';
import Image from 'next/image';
import { stackServerApp } from '../stack';
import LandingUploader from './components/LandingUploader';
import { Button } from '@/components/ui/button';
import { BookOpen, Headphones, Printer } from 'lucide-react';

export default async function Home() {
  const user = await stackServerApp.getUser();

  return (
    <div className="relative min-h-screen font-sans">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1481627834887-b9d27e2252db?q=80&w=2832&auto=format&fit=crop"
          alt="Library background"
          fill
          className="object-cover"
          priority
          unoptimized
        />
        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-b from-white/90 via-white/80 to-white/95 dark:from-black/80 dark:via-black/70 dark:to-black/90 backdrop-blur-[2px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-zinc-900 dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center font-bold shadow-sm">
            L
          </div>
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Literati Pub
          </span>
        </div>
        <div className="flex gap-4 items-center">
          {user ? (
            <Button
              asChild
              variant="ghost"
              className="bg-white/50 dark:bg-black/50 hover:bg-white/80 dark:hover:bg-black/80 backdrop-blur-sm"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                className="hover:bg-white/20 dark:hover:bg-black/20"
              >
                <Link href="/handler/sign-in">Sign In</Link>
              </Button>
              <Button
                asChild
                className="rounded-full px-6 shadow-lg hover:shadow-xl transition-all"
              >
                <Link href="/handler/sign-up">Sign Up</Link>
              </Button>
            </>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 pt-24 pb-20 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border border-zinc-300/50 bg-white/30 dark:bg-zinc-800/30 px-3 py-1 text-sm text-zinc-800 dark:text-zinc-200 backdrop-blur-md mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            Now in Open Beta
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-8 drop-shadow-sm">
            Your Words.
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 mt-1 pb-4">
              Beautifully Published.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto mb-12 leading-relaxed font-medium text-pretty">
            Transform your manuscript into a professional{' '}
            <span className="text-zinc-900 dark:text-white font-semibold underline decoration-blue-500/50 decoration-2 underline-offset-2">
              audiobook
            </span>{' '}
            and{' '}
            <span className="text-zinc-900 dark:text-white font-semibold underline decoration-violet-500/50 decoration-2 underline-offset-2">
              print-ready novel
            </span>{' '}
            in minutes. The modern publishing suite for independent authors.
          </p>

          {/* Upload Component */}
          <div className="mb-20 transform hover:scale-[1.01] transition-transform duration-300">
            <LandingUploader />
            <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400 font-medium">
              No credit card required • Free for your first project
            </p>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="relative z-10 py-32 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              Everything you need to self-publish.
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Professional tools without the learning curve.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <Feature
              title="Cinema-Grade AI Narration"
              description="Generate emotive, human-like narration for your audiobook using the latest neural voice models. Listen and export instantly."
              icon={
                <Headphones className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              }
            />
            <Feature
              title="Instant Typesetting"
              description="Forget about margins and bleed. We automatically format your Word doc into a professional 6x9″ novel PDF ready for print."
              icon={
                <Printer className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              }
            />
            <Feature
              title="Global Distribution Ready"
              description="Export compliant files for Amazon KDP, IngramSpark, Audible, and ACX. No rejection headaches."
              icon={
                <BookOpen className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              }
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 py-12 text-center text-sm text-zinc-600 dark:text-zinc-400 bg-zinc-50/50 dark:bg-black/50 border-t border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <p className="mb-4">
            © {new Date().getFullYear()} Literati Pub. Built for the modern
            author.
          </p>
          <div className="flex justify-center gap-6">
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Contact
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
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-start p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all">
      <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
