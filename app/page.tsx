import Link from 'next/link';
import { stackServerApp } from '../stack';
import LandingUploader from './components/LandingUploader';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  Headphones,
  Printer,
  Zap,
  CheckCircle2,
  FileText,
  Sparkles,
  ScrollText,
} from 'lucide-react';

export default async function Home() {
  const user = await stackServerApp.getUser();

  return (
    <div className="relative min-h-screen font-sans">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        {/* Base emerald/white gradient background */}
        <div className="absolute inset-0 bg-linear-to-br from-white via-white to-primary/10 dark:from-zinc-950 dark:via-zinc-900 dark:to-primary/10" />

        {/* Clean minimalist background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60 dark:opacity-20 grayscale-20"
          style={{
            backgroundImage:
              'url(https://images.pexels.com/photos/3747463/pexels-photo-3747463.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />

        {/* Gradient Overlay for readability */}
        <div className="absolute inset-0 bg-linear-to-b from-white/90 via-white/80 to-white/95 dark:from-black/80 dark:via-black/70 dark:to-black/90 backdrop-blur-[1px]" />
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
      <div className="relative z-10 pt-24 pb-20 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary backdrop-blur-md mb-8 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
            Now in Open Beta
          </div>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-zinc-900 dark:text-white mb-8 drop-shadow-sm">
            Your Words.
            <span className="block text-primary mt-1 pb-4">
              Beautifully Published.
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto mb-8 leading-relaxed font-medium text-pretty">
            Transform your manuscript into a professional{' '}
            <span className="text-zinc-900 dark:text-white font-semibold underline decoration-primary/50 decoration-2 underline-offset-2">
              audiobook
            </span>{' '}
            and{' '}
            <span className="text-zinc-900 dark:text-white font-semibold underline decoration-primary/50 decoration-2 underline-offset-2">
              print-ready novel
            </span>{' '}
            in minutes. The modern publishing suite for independent authors.
          </p>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Stop wrestling with formatting software and distribution
            requirements. Upload your Word document, and we&apos;ll handle the
            rest—from AI-powered narration to print-ready PDFs that meet
            industry standards.
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

      {/* How It Works */}
      <div className="relative z-10 py-24 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              How It Works
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Three simple steps from manuscript to market-ready formats
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Step
              number="1"
              title="Upload Your Manuscript"
              description="Simply drag and drop your Word document (.docx). Our system instantly extracts your text and prepares it for processing. No formatting required—we handle everything."
            />
            <Step
              number="2"
              title="Generate & Customize"
              description="Create your audiobook narration with AI voices that capture emotion and nuance. Format your print-ready PDF with professional typesetting. Preview and adjust as needed."
            />
            <Step
              number="3"
              title="Export & Publish"
              description="Download industry-standard files ready for Amazon KDP, IngramSpark, Audible, and ACX. All files meet platform requirements—no rejections, no headaches."
            />
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="relative z-10 py-32 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              Everything you need to self-publish
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Professional tools without the learning curve. Built specifically
              for authors who want to focus on writing, not formatting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Feature
              title="Cinema-Grade AI Narration"
              description="Generate emotive, human-like narration for your audiobook using the latest neural voice models. Our AI captures the subtle nuances of your prose—pauses, emphasis, and emotional tone. Listen and export instantly in high-quality audio formats."
              icon={<Headphones className="h-8 w-8 text-primary" />}
            />
            <Feature
              title="Instant Professional Typesetting"
              description="Forget about margins, bleed, and page breaks. We automatically format your Word document into a professional 6x9″ novel PDF ready for print. Includes proper chapter breaks, page numbering, and industry-standard typography."
              icon={<Printer className="h-8 w-8 text-primary" />}
            />
            <Feature
              title="Global Distribution Ready"
              description="Export compliant files for Amazon KDP, IngramSpark, Audible, and ACX. All formats meet strict platform requirements—no rejection headaches, no last-minute fixes. Your files are ready to upload and publish immediately."
              icon={<BookOpen className="h-8 w-8 text-primary" />}
            />
            <Feature
              title="Lightning Fast Processing"
              description="What used to take days or weeks now happens in minutes. Upload your manuscript and get both audiobook and print-ready formats simultaneously. No waiting, no delays—just fast, professional results."
              icon={<Zap className="h-8 w-8 text-primary" />}
            />
            <Feature
              title="No Technical Skills Required"
              description="You don't need to learn InDesign, understand print specifications, or master audio editing software. Our platform handles all the technical complexity so you can focus on what matters: your story."
              icon={<Sparkles className="h-8 w-8 text-primary" />}
            />
            <Feature
              title="Multiple Format Support"
              description="Export in all the formats you need: MP3 for audiobooks, PDF for print-on-demand, and more. Each format is optimized for its platform, ensuring the best quality and compatibility."
              icon={<FileText className="h-8 w-8 text-primary" />}
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10 py-24 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">
              Why Choose Literati Pub?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              The publishing platform designed for modern authors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Benefit
              title="Save Time & Money"
              description="Skip expensive designers and audio engineers. What costs thousands and takes weeks can now be done in minutes for a fraction of the cost."
            />
            <Benefit
              title="Professional Quality"
              description="Every output meets industry standards. Your audiobook sounds professional, and your print files pass platform requirements on the first try."
            />
            <Benefit
              title="Complete Control"
              description="Own your files and your process. No subscriptions, no locked formats. Download everything and publish wherever you want."
            />
            <Benefit
              title="Built for Authors"
              description="We understand the publishing journey because we built this for authors, by authors. Every feature is designed to make your life easier."
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
    <div className="flex flex-col items-start p-6 rounded-2xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-sm transition-all">
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
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6">
      <div className="mb-6 w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
        {number}
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
