'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProject } from '../../actions';
import { useUser } from '@stackframe/stack';
import mammoth from 'mammoth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Upload, FileText, Trash2, ArrowLeft } from 'lucide-react';

export default function NewProject() {
  const user = useUser();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState(user?.displayName || '');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [fileStats, setFileStats] = useState<{
    name: string;
    size: string;
  } | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError(null);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const { value: rawText } = await mammoth.extractRawText({ arrayBuffer });
      setContent(rawText);

      setFileStats({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB',
      });

      if (!title) {
        const name = file.name.replace(/\.docx?$/, '');
        setTitle(
          name
            .split(/[-_]/)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        );
      }
    } catch (err) {
      console.error(err);
      setUploadError('Failed to read file. Please try again.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    setIsSubmitting(true);
    try {
      const fullContent = `Author: ${author}\n\n${content}`;
      await createProject(title, fullContent);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
      alert('Failed to create project');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-8 flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Cancel
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">New Manuscript</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Book Details</CardTitle>
            <CardDescription>
              Basic information about your manuscript.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-2">
              <Label htmlFor="title">Book Title</Label>
              <Input
                id="title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Enter book title"
                className="text-lg font-medium"
                autoFocus
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                placeholder="e.g. J.K. Rowling"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manuscript Content</CardTitle>
            <CardDescription>
              Import your text from a Word document or paste it directly.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!content ? (
              <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 transition-colors text-center">
                <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-4">
                  <Upload className="h-6 w-6 text-zinc-500" />
                </div>
                <div className="space-y-1 mb-4">
                  <p className="font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-sm text-zinc-500">
                    Microsoft Word (.docx)
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  accept=".docx"
                  onChange={handleFileUpload}
                />
                <Button
                  variant="outline"
                  onClick={() =>
                    document.getElementById('file-upload')?.click()
                  }
                >
                  Select File
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 border rounded-lg bg-green-50/50 border-green-200 dark:bg-green-900/10 dark:border-green-900/30">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-400">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100">
                      {fileStats?.name || 'Manuscript Content'}
                    </p>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Ready to import •{' '}
                      {fileStats?.size || content.length + ' chars'}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-green-700 hover:text-green-900 hover:bg-green-100 dark:text-green-300 dark:hover:bg-green-900/20"
                  onClick={() => {
                    setContent('');
                    setFileStats(null);
                  }}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Remove
                </Button>
              </div>
            )}

            {uploadError && (
              <p className="text-sm text-destructive font-medium">
                {uploadError}
              </p>
            )}

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or paste text
                </span>
              </div>
            </div>

            <Textarea
              placeholder="Paste your manuscript text here..."
              className="min-h-[150px] font-mono text-sm"
              value={content}
              onChange={e => setContent(e.target.value)}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !title || !content}
            className="min-w-[150px]"
          >
            {isSubmitting ? 'Creating...' : 'Create Project'}
          </Button>
        </div>
      </form>
    </div>
  );
}
