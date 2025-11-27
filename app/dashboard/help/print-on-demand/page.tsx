import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ArrowUpRight,
  CheckCircle2,
  ClipboardList,
  Factory,
  Globe2,
  Info,
} from 'lucide-react';

const publishers = [
  {
    name: 'Amazon KDP',
    summary:
      'Fastest route to Amazon listings with optional expanded distribution and low upfront costs.',
    focus: ['Largest retail marketplace', 'Free or custom ISBNs', 'Print & Kindle bundle'],
    specs: {
      trim: '5\"x8\" to 8.5\"x11\" (most common POD sizes)',
      cover: 'PDF/X-1a with 0.125\" bleed; matte or gloss',
      interior: 'B&W or color PDF with embedded fonts',
      distribution: 'Amazon storefront + optional Expanded Distribution',
    },
    bestFor:
      'Indie authors prioritizing speed, Amazon traffic, and simple setup without bulk discounts.',
  },
  {
    name: 'IngramSpark',
    summary:
      'Global wholesale reach through bookstores and libraries with solid POD quality.',
    focus: ['Wide distribution network', 'Bookstore-friendly returns', 'Hardcover options'],
    specs: {
      trim: '4\"x6\" to 8.5\"x11\" plus case laminate and jacketed hardcovers',
      cover: 'PDF with 0.125\" bleed, 300 DPI images, spine width required',
      interior: 'B&W or premium color, PDF/X-1a preferred',
      distribution: 'Ingram wholesale + major retailers (Barnes & Noble, IndieBound)',
    },
    bestFor:
      'Authors who need bookstore access, hardcovers, or professional-grade offset alternatives later.',
  },
  {
    name: 'Lulu',
    summary:
      'Flexible formats with solid print quality and simple storefront tools.',
    focus: ['Coil-bound and photo-friendly options', 'Free ISBNs or BYO', 'Direct-storefront sales'],
    specs: {
      trim: '4.25\"x6.87\" to 8.5\"x11\" plus coil-bound and square photo sizes',
      cover: 'PDF with bleed; matte or gloss; custom case-wrap for hardcovers',
      interior: 'Standard and premium color, B&W on white or cream',
      distribution: 'Lulu bookstore + optional Amazon/Barnes & Noble distribution',
    },
    bestFor:
      'Workbooks, photo-heavy projects, or creators who want both POD and direct storefront fulfillment.',
  },
  {
    name: 'Draft2Digital Print',
    summary:
      'Hands-off distribution paired with their ebook network and simple onboarding.',
    focus: ['Automated metadata sharing from ebooks', 'Library reach via partners', 'Author copies at cost'],
    specs: {
      trim: '5\"x8\" to 8.5\"x11\"; gloss or matte covers',
      cover: 'PDF with bleed; spine text after ~100 pages',
      interior: 'B&W or standard color PDF',
      distribution: 'Amazon, Barnes & Noble, and library partners through D2D channels',
    },
    bestFor:
      'Authors already using D2D for ebooks who want unified metadata and royalty reporting.',
  },
  {
    name: 'Blurb',
    summary:
      'High-end photo and art books with bookstore distribution via Ingram.',
    focus: ['Premium photo papers', 'Layflat options', 'Design tools and templates'],
    specs: {
      trim: 'Square, landscape, and magazine formats; layflat photo options',
      cover: 'PDF with bleed; image-heavy cover templates available',
      interior: 'Premium photo papers with color management tools',
      distribution: 'Direct store + Ingram for global book trade',
    },
    bestFor:
      'Photography, portfolios, or visual-heavy books where print fidelity matters more than unit cost.',
  },
];

const prepChecklist = [
  'Export interior as PDF/X-1a with fonts embedded and images at 300 DPI.',
  'Add 0.125\" bleed to all edges on covers; extend background colors past trim.',
  'Set margins for 6x9 novels to at least 0.75\" outer and 0.875\" gutter for readability.',
  'Use CMYK color profiles for covers when possible; avoid rich-black text on interiors.',
  'Order a single proof before enabling distribution to validate paper stock and color.',
];

const quickPicks = [
  {
    title: 'Fastest path to Amazon sales',
    recommendation: 'Amazon KDP',
    rationale: 'Free ISBNs, rapid ingestion, and automatic Kindle pairing.',
  },
  {
    title: 'Bookstore and library availability',
    recommendation: 'IngramSpark',
    rationale: 'Best wholesale reach with returns and hardcovers for retail shelves.',
  },
  {
    title: 'Photo or design-forward books',
    recommendation: 'Blurb or Lulu premium color',
    rationale: 'Photo-calibrated papers and trim sizes beyond standard trade formats.',
  },
  {
    title: 'One dashboard for print + ebooks',
    recommendation: 'Draft2Digital Print',
    rationale: 'Reuse ebook metadata and consolidate royalty reporting.',
  },
];

export default function PrintOnDemandKnowledgeBase() {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Print-on-Demand Publishers Knowledge Base
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Compare major POD services, understand their strengths, and prep your files so they
          pass validation on the first try.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Factory className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Publisher snapshots</CardTitle>
              <CardDescription>
                Key specs and best-fit scenarios for the most common POD partners.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {publishers.map((publisher) => (
            <div
              key={publisher.name}
              className="rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 bg-white dark:bg-zinc-900"
            >
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {publisher.name}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {publisher.summary}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  POD
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {publisher.focus.map((item) => (
                  <Badge key={item} variant="outline" className="text-xs">
                    {item}
                  </Badge>
                ))}
              </div>
              <dl className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex gap-2">
                  <span className="font-medium text-zinc-900 dark:text-white">Trim:</span>
                  <span>{publisher.specs.trim}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-zinc-900 dark:text-white">Cover:</span>
                  <span>{publisher.specs.cover}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-zinc-900 dark:text-white">Interior:</span>
                  <span>{publisher.specs.interior}</span>
                </div>
                <div className="flex gap-2">
                  <span className="font-medium text-zinc-900 dark:text-white">Distribution:</span>
                  <span>{publisher.specs.distribution}</span>
                </div>
              </dl>
              <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {publisher.bestFor}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <ClipboardList className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>File prep checklist</CardTitle>
                <CardDescription>Specs that prevent the most common POD rejections.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-zinc-700 dark:text-zinc-300">
              {prepChecklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 h-2 w-2 rounded-full bg-primary" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Globe2 className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Quick picks</CardTitle>
                <CardDescription>Match your goal with a recommended partner.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {quickPicks.map((pick) => (
                <div
                  key={pick.title}
                  className="rounded-lg border border-zinc-200 dark:border-zinc-800 p-3 bg-zinc-50 dark:bg-zinc-900/40"
                >
                  <p className="text-xs uppercase tracking-wide text-zinc-500">{pick.title}</p>
                  <p className="font-semibold text-zinc-900 dark:text-white">{pick.recommendation}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{pick.rationale}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Info className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Next steps</CardTitle>
              <CardDescription>
                Apply these specs inside your project before exporting PDF and cover files.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/dashboard/help">
              Back to Help Center
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/dashboard/distribution">
              Review Distribution Settings
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
