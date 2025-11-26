import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Library, FileText, BookOpen, Download, Eye } from 'lucide-react';

export default function TemplatesPage() {
  const templates = [
    {
      id: 1,
      name: 'Novel Template',
      description: 'Standard 6x9" novel format with proper margins and typography',
      category: 'Print',
      icon: BookOpen,
    },
    {
      id: 2,
      name: 'Audiobook Script',
      description: 'Formatted script template optimized for narration',
      category: 'Audio',
      icon: FileText,
    },
    {
      id: 3,
      name: 'Non-Fiction Template',
      description: 'Professional layout for non-fiction works with chapter headings',
      category: 'Print',
      icon: BookOpen,
    },
    {
      id: 4,
      name: 'Poetry Collection',
      description: 'Elegant formatting for poetry and verse collections',
      category: 'Print',
      icon: BookOpen,
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
          Templates
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400">
          Professional templates to get you started quickly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon;
          return (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <span className="text-xs px-2 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400">
                      {template.category}
                    </span>
                  </div>
                </div>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                  <Button className="flex-1">
                    <Download className="h-4 w-4 mr-2" />
                    Use Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Library className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Custom Templates</CardTitle>
              <CardDescription>
                Create and save your own templates for future projects
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Save your formatting preferences as reusable templates. Once you've created a project with your preferred settings, you can save it as a template to use for future manuscripts.
          </p>
          <Button variant="outline">
            Learn More About Templates
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

