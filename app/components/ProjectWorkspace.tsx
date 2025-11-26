'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createPrintJob, createPrintJobFromContent } from '../actions/print';
import { FONTS, type FontKey } from '../lib/print-constants';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, FileText, Mic, Printer } from 'lucide-react';
import ProjectActions from './ProjectActions';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/components/ui/select';

interface PrintJob {
  id: string;
  project_id: string;
  original_file_url: string;
  pdf_file_url: string | null;
  status: string;
  created_at: string;
  format: string;
  font?: string;
}

interface AudioGeneration {
  id: string;
  project_id: string;
  audio_url: string;
  created_at: string;
}

const FONT_OPTIONS: { key: FontKey; name: string; description: string }[] = [
  {
    key: 'garamond',
    name: 'Garamond',
    description: 'Classic, elegant, old-style serif.',
  },
  {
    key: 'baskerville',
    name: 'Baskerville',
    description: 'High contrast, transitional serif.',
  },
  {
    key: 'caslon',
    name: 'Caslon',
    description: 'Traditional, readable, old-style.',
  },
  {
    key: 'merriweather',
    name: 'Merriweather',
    description: 'Modern, sturdy, high readability.',
  },
  {
    key: 'lora',
    name: 'Lora',
    description: 'Contemporary with calligraphy roots.',
  },
  {
    key: 'crimson',
    name: 'Crimson Text',
    description: 'Old-style, similar to Minion/Jenson.',
  },
];

interface ProjectWorkspaceProps {
  project: any;
  printJobs: PrintJob[];
  audioGenerations: AudioGeneration[];
}

export default function ProjectWorkspace({
  project,
  printJobs,
  audioGenerations,
}: ProjectWorkspaceProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingPrint, setIsGeneratingPrint] = useState(false);
  const [isGeneratingEbook, setIsGeneratingEbook] = useState(false);
  const [selectedFont, setSelectedFont] = useState<FontKey>('baskerville');

  // State for PDF preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    const latestCompletedJob = printJobs.find(
      j => j.status === 'completed' && j.pdf_file_url
    );
    return latestCompletedJob?.pdf_file_url || null;
  });

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;

    setIsUploading(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      await createPrintJob(project.id, formData, 'print', selectedFont);
    } catch (error) {
      console.error(error);
      alert('Upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGenerateFromText = async (format: 'print' | 'ebook') => {
    if (format === 'print') setIsGeneratingPrint(true);
    else setIsGeneratingEbook(true);

    try {
      await createPrintJobFromContent(project.id, format, selectedFont);
    } catch (error) {
      console.error(error);
      alert(`Generation failed for ${format}`);
    } finally {
      if (format === 'print') setIsGeneratingPrint(false);
      else setIsGeneratingEbook(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between bg-background sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-lg font-semibold truncate max-w-md">
            {project.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">Project Workspace</Badge>
        </div>
      </header>

      <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Column (Left): Stats, Preview, Controls, Audio */}
          <div className="lg:col-span-2 space-y-8">
            {/* Manuscript Source & Stats (Moved here) */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <CardTitle className="text-base">
                      Manuscript Source
                    </CardTitle>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-500/10 text-green-600 hover:bg-green-500/20 border-green-500/20"
                  >
                    Active
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 p-4 rounded-md border font-mono text-xs text-muted-foreground whitespace-pre-wrap mb-4">
                  {project.content?.slice(0, 300)}
                  {project.content?.length > 300 && '...'}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-background border rounded-md text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {project.content?.split(/\s+/).length.toLocaleString() ||
                        0}
                    </div>
                    <div className="text-xs text-muted-foreground">Words</div>
                  </div>
                  <div className="p-3 bg-background border rounded-md text-center">
                    <div className="text-2xl font-bold text-foreground">
                      {project.content?.length.toLocaleString() || 0}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Characters
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Print Manager Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <Printer className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>Print & eBook Production</CardTitle>
                    <CardDescription>
                      Typeset and preview your book.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* PDF Previewer */}
                {previewUrl && (
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-xl overflow-hidden shadow-sm">
                    <div className="p-4 border-b border-zinc-200 dark:border-zinc-700/50 flex justify-between items-center bg-white dark:bg-zinc-900/50">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        PDF Preview
                      </h3>
                      <button
                        onClick={() => setPreviewUrl(null)}
                        className="text-xs text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 transition-colors"
                      >
                        Close Preview
                      </button>
                    </div>
                    <div className="aspect-3/4 w-full bg-zinc-100 dark:bg-zinc-900/50 relative">
                      <iframe
                        src={`${previewUrl}#toolbar=0&view=FitH`}
                        className="w-full h-full absolute inset-0"
                        title="PDF Preview"
                      />
                    </div>
                  </div>
                )}

                {/* Settings */}
                <div className="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-xl p-4">
                  <label className="block text-xs font-medium text-zinc-500 uppercase tracking-wider mb-3">
                    Typesetting Settings
                  </label>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium text-zinc-900 dark:text-white mb-1.5 block">
                        Book Font
                      </label>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Choose the primary typeface for the book body.
                      </p>
                    </div>
                    <div className="w-full sm:w-64">
                      <Select
                        value={selectedFont}
                        onValueChange={value =>
                          setSelectedFont(value as FontKey)
                        }
                      >
                        <SelectTrigger className="w-full text-left h-auto py-2">
                          <span style={FONTS[selectedFont]?.previewStyle}>
                            {
                              FONT_OPTIONS.find(f => f.key === selectedFont)
                                ?.name
                            }
                          </span>
                        </SelectTrigger>
                        <SelectContent>
                          {FONT_OPTIONS.map(font => (
                            <SelectItem
                              key={font.key}
                              value={font.key}
                              className="py-3"
                            >
                              <div className="flex flex-col gap-1">
                                <span
                                  className="text-base font-medium"
                                  style={FONTS[font.key].previewStyle}
                                >
                                  {font.name}
                                </span>
                                <span className="text-xs text-muted-foreground font-sans">
                                  {font.description}
                                </span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Generation Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Print Book Card */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-xl p-5 flex flex-col justify-between h-full hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors group">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl shadow-sm">
                          📖
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">
                          Print Book
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                        Standard 6x9&quot; layout with industry margins,
                        headers, and serif typography. Best for KDP/Ingram.
                      </p>
                    </div>
                    <button
                      onClick={() => handleGenerateFromText('print')}
                      disabled={
                        isGeneratingPrint || isGeneratingEbook || isUploading
                      }
                      className="w-full py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm group-hover:shadow-md disabled:opacity-50"
                    >
                      {isGeneratingPrint
                        ? 'Typesetting...'
                        : 'Generate Print PDF'}
                    </button>
                  </div>

                  {/* eBook Card */}
                  <div className="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-700/50 rounded-xl p-5 flex flex-col justify-between h-full hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors group">
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-xl shadow-sm">
                          📱
                        </div>
                        <h3 className="font-semibold text-zinc-900 dark:text-white">
                          eBook
                        </h3>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-6 leading-relaxed">
                        Digital-first A5 layout with larger text, optimized
                        spacing, and sans-serif fonts for screens.
                      </p>
                    </div>
                    <button
                      onClick={() => handleGenerateFromText('ebook')}
                      disabled={
                        isGeneratingPrint || isGeneratingEbook || isUploading
                      }
                      className="w-full py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm group-hover:shadow-md disabled:opacity-50"
                    >
                      {isGeneratingEbook
                        ? 'Converting...'
                        : 'Generate eBook PDF'}
                    </button>
                  </div>
                </div>

                 {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white dark:bg-zinc-900 px-3 text-xs text-zinc-400 font-medium">
                      OR UPDATE SOURCE
                    </span>
                  </div>
                </div>

                {/* Upload Action */}
                <label className="cursor-pointer flex items-center justify-center gap-3 w-full p-4 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-all group">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    📂
                  </span>
                  <div className="text-center">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300 block">
                      Upload new .docx version
                    </span>
                    <span className="text-xs text-zinc-400 block mt-0.5">
                      Replaces current manuscript content
                    </span>
                  </div>
                  <input
                    type="file"
                    accept=".docx"
                    className="hidden"
                    onChange={handleUpload}
                    disabled={isUploading}
                  />
                </label>

              </CardContent>
            </Card>

            {/* Audio Section */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <Mic className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>Audiobook Files</CardTitle>
                    <CardDescription>
                      Neural text-to-speech generation.
                    </CardDescription>
                  </div>
                </div>
                <ProjectActions projectId={project.id} />
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-lg bg-muted/50">
                  <Mic className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    Manage audio files in the sidebar.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

    </div>
  );
}

