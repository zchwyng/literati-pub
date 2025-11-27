import Link from 'next/link';
import LandingUploader from './components/LandingUploader';
import { Button } from '@/components/ui/button';
import { getAuthenticatedUser } from '../lib/auth';
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

export default async function Home() {
  const user = await getAuthenticatedUser();

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
                className="rounded-full px-6 shadow-lg hover:shadow-md transition-all"
              >
                <Link href="/handler/sign-up">Sign Up</Link>
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
              For indie authors and first-time writers
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-white drop-shadow-sm leading-tight">
                Turn your draft into a bookstore-ready book.
                <span className="block text-primary">No formatting. No overwhelm.</span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl leading-relaxed font-medium text-pretty">
                Upload the story you&apos;ve been dreaming about. We polish it into an audiobook and a print-ready novel that meets industry standards—so you can finally hold your book and share it with readers.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 text-sm text-zinc-600 dark:text-zinc-300">
              {[
                'Upload your Word doc, we handle the specs',
                'Narration tuned for tone and emotion',
                'Print PDFs ready for Amazon KDP & IngramSpark',
              ].map((item) => (
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
                  Free to start. Your first project is on us.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold">
                    1
                  </div>
                  Idea to final files in minutes
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-semibold">
                    2
                  </div>
                  Keep ownership of every file
                </div>
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
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">Indie launchpad</p>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">From manuscript to market</h3>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Audiobook chapters', value: 'Ready in ~10 min' },
                  { label: 'Print layout', value: '6x9” novel PDF' },
                  { label: 'Compliance', value: 'ACX + KDP specs' },
                  { label: 'Control', value: 'Download & own everything' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-4"
                  >
                    <p className="text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                    <p className="text-base font-semibold text-zinc-900 dark:text-white">{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl bg-primary/10 p-6 border border-primary/20 space-y-3">
                <div className="flex items-center gap-3 text-primary font-semibold">
                  <Sparkles className="h-5 w-5" />
                  Built for writers who never want to touch InDesign.
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Upload once, preview, and export polished files you can publish today. Keep writing—we&apos;ll handle the tech.
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
              Your writing journey, without the tech headaches
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              From the spark of an idea to a finished book you can share, every step is clear, fast, and author-friendly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Step
              number="1"
              title="Upload and breathe"
              description="Drop in your draft and skip the formatting rules. We clean, structure, and prep your story the moment it lands."
              image="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80&auto=format&fit=crop"
            />
            <Step
              number="2"
              title="Choose your voice & look"
              description="Pick narration that matches your tone and watch your chapters flow into a beautiful, print-ready layout. Preview before you export."
              image="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80&auto=format&fit=crop"
            />
            <Step
              number="3"
              title="Publish with confidence"
              description="Export ACX-compliant audio and KDP-ready PDFs. No guessing, no rejections—just files you can upload today."
              image="https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80&auto=format&fit=crop"
            />
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="relative z-10 py-28 bg-white/90 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              Crafted for writers who are publishing themselves
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              We took the painful parts of indie publishing and automated them—without losing the soul of your book.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Feature
              title="Voice that fits your story"
              description="Cinema-grade AI narration tuned for pacing, emotion, and clarity. Hear your book as if a professional actor read it."
              icon={<Headphones className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&q=80&auto=format&fit=crop"
            />
            <Feature
              title="Typesetting without the tutorials"
              description="Automatic 6x9″ print layout with chapter breaks, ornaments, margins, and page numbers dialed to spec."
              icon={<Printer className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1448932252197-d19750584e56?w=600&q=80&auto=format&fit=crop"
            />
            <Feature
              title="Distribution ready files"
              description="Export packages that pass ACX, KDP, and IngramSpark on the first try. No fiddling with file settings."
              icon={<BookOpen className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80&auto=format&fit=crop"
            />
            <Feature
              title="Fast enough for launch week"
              description="Generate narration and print layout in minutes, not months. Perfect for hitting preorder dates or crowdfunding promises."
              icon={<Zap className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80&auto=format&fit=crop"
            />
            <Feature
              title="Yours to own"
              description="No subscriptions or locked formats. Download the mastered audio and print files, keep your IP, and publish anywhere."
              icon={<Sparkles className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80&auto=format&fit=crop"
            />
            <Feature
              title="Formats for every reader"
              description="MP3 for audiobooks, PDF for print-on-demand, EPUB on the roadmap. Each output is optimized for quality and compatibility."
              icon={<FileText className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&q=80&auto=format&fit=crop"
            />
          </div>

          <div className="rounded-3xl border border-primary/20 bg-primary/5 dark:bg-primary/10 p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-lg">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 dark:bg-zinc-900/60 px-3 py-1 text-xs uppercase tracking-wide text-primary border border-primary/20">
                built for authors, by authors
              </div>
              <h3 className="text-2xl font-semibold text-zinc-900 dark:text-white">
                You focus on the story. We&apos;ll package it for every shelf.
              </h3>
              <p className="text-base text-zinc-700 dark:text-zinc-300">
                Preview narration, tweak pacing, and export ready-to-upload files in one sitting. No more juggling freelancers or learning design software.
              </p>
            </div>
            <Button asChild className="rounded-full px-6 shadow-lg hover:shadow-md transition-all">
              <Link href="#">Start your first book</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10 py-24 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              Why writers choose Literati Pub
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              We obsessed over the indie author journey so you don&apos;t have to hire a team or learn new software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Benefit
              title="Save launch budget"
              description="Replace multiple freelancers with one workflow. Get pro-grade audio and print files for a fraction of the usual cost."
            />
            <Benefit
              title="Confidence in every export"
              description="Outputs are tuned to ACX, KDP, and Ingram specs, so you avoid rejections, delays, and re-upload fees."
            />
            <Benefit
              title="Creative control stays yours"
              description="You keep the master files and rights. Publish wide, run ads, or release special editions however you want."
            />
            <Benefit
              title="Built for busy dreamers"
              description="If you&apos;re writing before work or after bedtime, we&apos;ve got you. No complicated UI—just clear steps that ship your book."
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
  image,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
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
