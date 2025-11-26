import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Headphones, FileText, Play, Download, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ExamplesPage() {
  const examples = [
    {
      id: 1,
      title: 'Sample Novel Format',
      description: 'See how a professionally formatted novel looks in print-ready PDF',
      type: 'Print',
      icon: BookOpen,
      format: 'PDF',
    },
    {
      id: 2,
      title: 'Audiobook Sample',
      description: 'Listen to an example of AI-generated narration quality',
      type: 'Audio',
      icon: Headphones,
      format: 'MP3',
    },
    {
      id: 3,
      title: 'Non-Fiction Layout',
      description: 'Explore formatting options for non-fiction works',
      type: 'Print',
      icon: FileText,
      format: 'PDF',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Examples
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Explore sample outputs to see what's possible with Literati Pub
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {examples.map((example) => {
          const Icon = example.icon;
          return (
            <Card key={example.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{example.title}</CardTitle>
                    <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">
                      {example.type}
                    </span>
                  </div>
                </div>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Format:</span>
                    <span className="font-medium">{example.format}</span>
                  </div>
                  <div className="flex gap-2">
                    {example.type === 'Audio' ? (
                      <Button className="flex-1">
                        <Play className="h-4 w-4 mr-2" />
                        Listen
                      </Button>
                    ) : (
                      <Button variant="outline" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    )}
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Print Format Examples</CardTitle>
            <CardDescription>
              See professional typesetting in action
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Our print-ready PDFs meet industry standards for Amazon KDP, IngramSpark, and other print-on-demand services. View examples of proper margins, typography, chapter breaks, and page numbering.
            </p>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                6x9" standard novel format
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Professional typography and spacing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Proper bleed and margins
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Chapter breaks and page numbering
              </li>
            </ul>
            <Button>
              <BookOpen className="h-4 w-4 mr-2" />
              View Print Examples
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audiobook Quality</CardTitle>
            <CardDescription>
              Experience AI narration at its finest
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              Our AI-powered narration captures emotion, nuance, and proper pacing. Listen to samples to hear the quality difference—voices that sound natural and engaging, not robotic.
            </p>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Natural, human-like voices
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                Emotional tone and pacing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                High-quality audio output
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                ACX and Audible compliant
              </li>
            </ul>
            <Button>
              <Headphones className="h-4 w-4 mr-2" />
              Listen to Samples
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

