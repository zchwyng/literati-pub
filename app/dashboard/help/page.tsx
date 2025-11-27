import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, BookOpen, Video, MessageCircle, FileText, ExternalLink, Search } from 'lucide-react';

export default function HelpPage() {
  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of using Literati Publish',
      icon: BookOpen,
      articles: 12,
    },
    {
      title: 'Video Tutorials',
      description: 'Watch step-by-step guides',
      icon: Video,
      articles: 8,
    },
    {
      title: 'Formatting Guide',
      description: 'Best practices for your manuscript',
      icon: FileText,
      articles: 15,
    },
    {
      title: 'Distribution',
      description: 'Publishing to platforms',
      icon: ExternalLink,
      articles: 10,
    },
  ];

  const faqs = [
    {
      question: 'What file formats do you support?',
      answer: 'We support Microsoft Word (.docx) files for import. You can export to PDF for print and MP3 for audiobooks.',
    },
    {
      question: 'How long does it take to generate an audiobook?',
      answer: 'Audiobook generation typically takes 5-15 minutes depending on the length of your manuscript. You\'ll receive a notification when it\'s ready.',
    },
    {
      question: 'Are the files ready for Amazon KDP?',
      answer: 'Yes! All exported PDFs meet Amazon KDP requirements including proper margins, bleed, and page sizing. No additional formatting needed.',
    },
    {
      question: 'Can I customize the AI voice?',
      answer: 'Yes, you can choose from multiple voice options and adjust pacing, tone, and emphasis in the project workspace.',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Help & Documentation
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Find answers and learn how to make the most of Literati Publish
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-zinc-400" />
              <input
                type="search"
                placeholder="Search help articles..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
              />
            </div>
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {helpCategories.map((category) => {
          const Icon = category.icon;
          return (
            <Card key={category.title} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </div>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-zinc-500">{category.articles} articles</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
            <CardDescription>
              Get up and running in minutes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  1
                </span>
                <div>
                  <p className="font-medium">Upload your manuscript</p>
                  <p className="text-zinc-500">Import your Word document or paste text directly</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  2
                </span>
                <div>
                  <p className="font-medium">Generate formats</p>
                  <p className="text-zinc-500">Create audiobook and print-ready PDF in one click</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                  3
                </span>
                <div>
                  <p className="font-medium">Export and publish</p>
                  <p className="text-zinc-500">Download files ready for your chosen platforms</p>
                </div>
              </li>
            </ol>
            <Button className="mt-4 w-full">
              Read Full Guide
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>
              Common questions and answers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <p className="font-medium mb-2">{faq.question}</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full">
              View All FAQs
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Still Need Help?</CardTitle>
              <CardDescription>
                Our support team is here to assist you
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button>
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              Community Forum
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

