import Link from 'next/link';
import { stackServerApp } from '../stack';
import LandingUploader from './components/LandingUploader';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  CheckCircle2,
  Compass,
  FileText,
  Headphones,
  PenLine,
  Printer,
  ScrollText,
  Sparkles,
} from 'lucide-react';

export default async function Home() {
  const user = await stackServerApp.getUser();

  return (
    <div className="relative min-h-screen font-sans">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-white via-primary/5 to-primary/10 dark:from-zinc-950 dark:via-zinc-900 dark:to-primary/20" />
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-10 top-24 h-80 w-80 rounded-full bg-amber-200/40 dark:bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-10 left-24 h-72 w-72 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.8),transparent_35%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.55),transparent_25%)] dark:bg-[radial-gradient(circle_at_15%_25%,rgba(255,255,255,0.05),transparent_35%),radial-gradient(circle_at_85%_5%,rgba(255,255,255,0.06),transparent_30%)]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center max-w-6xl mx-auto">
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
      <div className="relative z-10 pt-20 pb-16 sm:pt-28 sm:pb-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary backdrop-blur-md shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
              Built for indie authors ready to launch
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
              Take your story
              <span className="block text-primary mt-2">from dream to published.</span>
            </h1>

            <p className="text-lg sm:text-xl text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
              Literati Pub is the publishing studio for writers with a book in their head or a draft in their hands. Upload your manuscript and we turn it into a beautifully narrated audiobook and a print-ready novel—without learning design software or hiring a team.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <Highlight title="Start where you are" description="Bring a rough draft or a polished manuscript—our formatting, voice, and export presets meet you there." />
              <Highlight title="Zero technical hurdles" description="No templates, no wrestling with margins, no audio mixing. We automate the boring parts." />
            </div>

            <div className="flex flex-wrap gap-3">
              {user ? (
                <Button asChild className="rounded-full px-6 shadow-lg">
                  <Link href="/dashboard">Jump back in</Link>
                </Button>
              ) : (
                <>
                  <Button asChild className="rounded-full px-6 shadow-lg">
                    <Link href="/handler/sign-up">Start for free</Link>
                  </Button>
                  <Button asChild variant="ghost" className="rounded-full px-6">
                    <Link href="/handler/sign-in">I already have an account</Link>
                  </Button>
                </>
              )}
            </div>

            <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Free to try with your first project
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Files ready for Audible & KDP
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-white/40 dark:bg-zinc-900/40 border border-white/60 dark:border-zinc-800 rounded-3xl blur-xl" />
            <div className="relative rounded-3xl border border-white/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 shadow-xl backdrop-blur-md p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary font-semibold">Upload a chapter</p>
                  <p className="text-lg font-semibold text-zinc-900 dark:text-white">Hear your book come alive</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Instant preview
                </div>
              </div>
              <LandingUploader />
              <div className="grid grid-cols-2 gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                <ChecklistItem label="Narration with emotion" />
                <ChecklistItem label="Print-safe margins & bleed" />
                <ChecklistItem label="Chapter detection" />
                <ChecklistItem label="Exports for KDP, ACX, IngramSpark" />
              </div>
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-4 text-sm text-zinc-700 dark:text-zinc-200">
                Made for writers who are juggling day jobs, parenting, and late-night writing sprints. We keep the tech invisible so your story stays center stage.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promise Bar */}
      <div className="relative z-10 pb-8">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid gap-4 sm:grid-cols-3 bg-white/70 dark:bg-zinc-900/60 border border-white/60 dark:border-zinc-800 rounded-2xl shadow-sm backdrop-blur-md p-6">
            <Stat title="Built for first-time authors" description="Guided templates and defaults so you don't need a design degree." />
            <Stat title="Ready for distribution" description="Audiobook + print exports tuned for Audible, ACX, KDP, and Ingram." />
            <Stat title="Hours saved per book" description="Skip fiddling with margins, pacing, and specs—upload and listen." />
          </div>
        </div>
      </div>

      {/* Why Indie Authors Love It */}
      <div className="relative z-10 py-24 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">Made for indie authors, debut or seasoned</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Whether you&apos;re drafting on weekends or publishing your third series, Literati Pub keeps the production work light so you can stay in the writing flow.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Feature
              title="Drafting your first book"
              description="Upload a single chapter to hear how your characters sound. Iterate on pacing before you ever hit publish."
              icon={<PenLine className="h-7 w-7 text-primary" />}
            />
            <Feature
              title="Side-hustle authors"
              description="Short on time? Auto-format chapters, drop in cover art, and export compliant files between life’s commitments."
              icon={<Sparkles className="h-7 w-7 text-primary" />}
            />
            <Feature
              title="Series builders & small presses"
              description="Keep every title on-brand with consistent typography, audio quality, and distribution-ready exports."
              icon={<BookOpen className="h-7 w-7 text-primary" />}
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="relative z-10 py-24 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">Your book, ready in three moves</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              A guided path from messy draft to shelf-ready files. No design tools, no audio mixing, just you and your story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Step
              number="1"
              title="Drop in your manuscript"
              description="Upload a DOCX or paste chapters. We detect chapters, scene breaks, and headings without you cleaning up styles."
              image="https://images.unsplash.com/photo-1529079688708-22168e9b5f2b?w=900&q=80&auto=format&fit=crop"
            />
            <Step
              number="2"
              title="Hear & see the preview"
              description="Choose a voice, pick pacing, and watch the typesetting update live. Adjust spacing, chapter openers, and audio tone with simple toggles."
              image="https://images.unsplash.com/photo-1523475472560-d2df97ec485c?w=900&q=80&auto=format&fit=crop"
            />
            <Step
              number="3"
              title="Export for every platform"
              description="Download an ACX-compliant audiobook and a print PDF tuned for KDP and Ingram. No extra fees, no rejections for specs."
              image="https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=900&q=80&auto=format&fit=crop"
            />
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="relative z-10 py-28 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">Everything you need to publish confidently</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Professional production without the maze of tools. Literati Pub keeps the creative decisions in your hands while handling the technical details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Feature
              title="Narration that matches your tone"
              description="Pick voices with the right warmth, grit, or humor. Our AI keeps breaths, pauses, and emphasis human so your characters sound like you imagined."
              icon={<Headphones className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=900&q=80&auto=format&fit=crop"
            />
            <Feature
              title="Instant, print-ready layout"
              description="Auto-typesetting with proper trim sizes, bleed, and line spacing. Choose chapter opener styles and keep widows and orphans in check without ever opening InDesign."
              icon={<Printer className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80&auto=format&fit=crop"
            />
            <Feature
              title="Guided launch presets"
              description="Exports pre-labeled for KDP, ACX, and Ingram. No guesswork about bitrates, ISBN placement, or page count limits—we bake the requirements in."
              icon={<Compass className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?w=900&q=80&auto=format&fit=crop"
            />
            <Feature
              title="Multiple formats, one upload"
              description="Generate MP3 audiobooks, shareable chapter samples, and print PDFs from the same manuscript. Keep everything in sync without duplicating work."
              icon={<FileText className="h-8 w-8 text-primary" />}
              image="https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=900&q=80&auto=format&fit=crop"
            />
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="relative z-10 py-24 bg-white/60 dark:bg-zinc-950/60 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl mb-4">Confidence for the big launch day</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-3xl mx-auto">
              Every tool is tuned to calm the nerves of publishing your first—or next—book. You stay in control, we clear the friction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Benefit
              title="Skip expensive production"
              description="Audio engineers, layout artists, and endless revisions add up. Literati Pub gives you professional polish at a fraction of the cost."
            />
            <Benefit
              title="Always passes platform checks"
              description="No more rejected files. We enforce ACX and KDP requirements automatically so your uploads are accepted the first time."
            />
            <Benefit
              title="Own every file"
              description="Download clean MP3s, WAV masters, and print PDFs—no locked ecosystems or recurring fees to access your work."
            />
            <Benefit
              title="Built by authors for authors"
              description="We obsessed over the spots where writers get stuck: page numbers, section breaks, audio pacing. The platform removes those headaches."
            />
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="relative z-10 py-20 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Ready to hear your book for the first time?
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-3xl mx-auto">
            Upload a chapter, listen to a narrated sample, and export a print-ready layout before you ever pay. Your story deserves a beautiful debut—and you deserve a calm launch.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild className="rounded-full px-6 shadow-lg">
              <Link href={user ? '/dashboard' : '/handler/sign-up'}>{user ? 'Go to your dashboard' : 'Start free today'}</Link>
            </Button>
            <Button asChild variant="ghost" className="rounded-full px-6">
              <Link href="#">See how exports look</Link>
            </Button>
          </div>
          <div className="flex justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <span>No credit card required</span>
            <span>Keep every file you create</span>
            <span>Built for dreamers writing after hours</span>
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

function Highlight({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-white/80 dark:border-zinc-800 bg-white/60 dark:bg-zinc-900/60 shadow-sm backdrop-blur p-4 text-left space-y-1">
      <p className="text-sm font-semibold text-primary uppercase tracking-wide">{title}</p>
      <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">{description}</p>
    </div>
  );
}

function Stat({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-white/60 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/50 p-4 shadow-sm">
      <p className="text-sm font-semibold text-primary mb-2">{title}</p>
      <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">{description}</p>
    </div>
  );
}

function ChecklistItem({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-1 h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
        <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
      </div>
      <p className="text-sm text-zinc-700 dark:text-zinc-200 leading-snug">{label}</p>
    </div>
  );
}
