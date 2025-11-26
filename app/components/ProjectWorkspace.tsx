'use client';

import { useState } from 'react';
import * as React from 'react';
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
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from '@/components/ui/empty';
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Mic, Printer, BookOpen, Tablet, Upload, ExternalLink, Download, X, Eye, Palette, Settings, Loader2, FileEdit, Sparkles, MoreHorizontal } from 'lucide-react';
import ProjectActions from './ProjectActions';
import { useFilePreview } from './FilePreviewContext';
import { usePathname } from 'next/navigation';
import mammoth from 'mammoth';
import { updateProject, generateCoverImage, getCoverGenerations } from '../actions';

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

interface CoverGeneration {
  id: string;
  project_id: string;
  cover_url: string;
  prompt: string;
  model: string;
  created_at: string;
  style?: string;
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
  coverGenerations?: CoverGeneration[];
}

export default function ProjectWorkspace({
  project,
  printJobs,
  audioGenerations,
  coverGenerations: initialCoverGenerations = [],
}: ProjectWorkspaceProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingPrint, setIsGeneratingPrint] = useState(false);
  const [isGeneratingEbook, setIsGeneratingEbook] = useState(false);
  const [selectedFont, setSelectedFont] = useState<FontKey>('baskerville');
  const [activeTab, setActiveTab] = useState('edit');
  const [audioApi, setAudioApi] = useState<'openai' | 'elevenlabs'>('openai');
  const [audioVoice, setAudioVoice] = useState('alloy');
  const [audioStyle, setAudioStyle] = useState('natural');
  const [coverModel, setCoverModel] = useState('nano-banana');
  const [coverStyle, setCoverStyle] = useState('realistic');
  const [coverPrompt, setCoverPrompt] = useState('');
  const [editorFocus, setEditorFocus] = useState('all');
  const [editorLanguage, setEditorLanguage] = useState('en');
  const [editorDepth, setEditorDepth] = useState('standard');
  const [editorTone, setEditorTone] = useState('professional');
  const [isDragging, setIsDragging] = useState(false);
  const [isGeneratingCover, setIsGeneratingCover] = useState(false);
  const [coverGenerations, setCoverGenerations] = useState<CoverGeneration[]>(initialCoverGenerations);
  const { preview, setPreview } = useFilePreview();
  const pathname = usePathname();
  const isProjectPage = pathname?.startsWith('/dashboard/project/');

  // Auto-switch tab when a file is selected
  React.useEffect(() => {
    if (preview) {
      if (preview.type === 'pdf') {
        // Determine if it's print or ebook based on format
        if (preview.format === 'ebook') {
          setActiveTab('ebook');
        } else {
          setActiveTab('print');
        }
      } else if (preview.type === 'audio') {
        setActiveTab('audio');
      } else if (preview.type === 'cover') {
        setActiveTab('cover');
      }
    }
  }, [preview]);

  const handleFileUpload = async (file: File) => {
    if (!file.name.match(/\.(docx|doc)$/i)) {
      alert('Please upload a .docx or .doc file');
      return;
    }

    setIsUploading(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const { value: rawText } = await mammoth.extractRawText({ arrayBuffer });
      
      // Update project content
      await updateProject(project.id, { content: rawText });
      
      // Refresh the page to show updated content
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert('Failed to process file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await handleFileUpload(file);
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
    <div className="flex flex-col h-full w-full">
      <main className="flex-1 w-full space-y-6">
        {/* File Preview - Show on top when preview exists */}
        {isProjectPage && preview && (
          ((activeTab === 'print' || activeTab === 'ebook') && preview.type === 'pdf') ||
          (activeTab === 'audio' && preview.type === 'audio') ||
          (activeTab === 'cover' && preview.type === 'cover')
        ) ? (
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <div className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  {preview.projectTitle ? (
                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                        {preview.projectTitle}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                        {preview.name}
                      </p>
                    </div>
                  ) : (
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-white truncate">
                      {preview.name}
                    </h3>
                  )}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => window.open(preview.url, '_blank')}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open in New Tab
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = preview.url;
                        link.download = '';
                        link.click();
                      }}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setPreview(null)}>
                      <X className="mr-2 h-4 w-4" />
                      Close Preview
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            {preview.type === 'pdf' ? (
              <div className="aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-950 relative">
                <iframe
                  src={`${preview.url}#toolbar=0&view=FitH`}
                  className="w-full h-full absolute inset-0"
                  title="PDF Preview"
                />
              </div>
            ) : preview.type === 'audio' ? (
              <div className="aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-950 relative flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mic className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                      Audio Preview
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                      Click the buttons above to open or download the audio file
                    </p>
                    <audio controls className="w-full max-w-md">
                      <source src={preview.url} type="audio/mpeg" />
                      <source src={preview.url} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                </div>
              </div>
            ) : (
              <div className="aspect-[16/10] w-full bg-zinc-100 dark:bg-zinc-950 relative flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 p-8">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Palette className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white mb-1">
                      Cover Preview
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                      Cover image will appear here
                    </p>
                    {preview.url && (
                      <img src={preview.url} alt="Cover preview" className="max-w-full max-h-96 rounded-lg shadow-lg" />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : null}

        {/* Production Studio - Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="edit">
              <FileEdit className="h-4 w-4 mr-2" />
              Edit
            </TabsTrigger>
            <TabsTrigger value="cover">
              <Palette className="h-4 w-4 mr-2" />
              Cover
            </TabsTrigger>
            <TabsTrigger value="print">
              <BookOpen className="h-4 w-4 mr-2" />
              Print
            </TabsTrigger>
            <TabsTrigger value="ebook">
              <Tablet className="h-4 w-4 mr-2" />
              E-book
            </TabsTrigger>
            <TabsTrigger value="audio">
              <Mic className="h-4 w-4 mr-2" />
              Audiobook
            </TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="mt-6">
            <div className="relative flex flex-col p-6 rounded-2xl bg-gradient-to-br from-violet-700 to-violet-800 hover:from-violet-700/95 hover:to-violet-800/95 text-left max-w-4xl transition-all">
              <div className="absolute top-4 right-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/80 hover:text-white/90 hover:bg-white/10"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-72">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="editor-focus" className="text-sm font-medium mb-2 block">Focus Area</Label>
                        <Select value={editorFocus} onValueChange={setEditorFocus}>
                          <SelectTrigger id="editor-focus" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            <SelectItem value="dramaturgy">Dramaturgy</SelectItem>
                            <SelectItem value="style">Style</SelectItem>
                            <SelectItem value="spelling">Spelling</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Choose what to analyze
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="editor-language" className="text-sm font-medium mb-2 block">Language</Label>
                        <Select value={editorLanguage} onValueChange={setEditorLanguage}>
                          <SelectTrigger id="editor-language" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="it">Italian</SelectItem>
                            <SelectItem value="pt">Portuguese</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Language for analysis
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="editor-depth" className="text-sm font-medium mb-2 block">Analysis Depth</Label>
                        <Select value={editorDepth} onValueChange={setEditorDepth}>
                          <SelectTrigger id="editor-depth" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quick">Quick</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="thorough">Thorough</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Level of detail in feedback
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="editor-tone" className="text-sm font-medium mb-2 block">Tone Preference</Label>
                        <Select value={editorTone} onValueChange={setEditorTone}>
                          <SelectTrigger id="editor-tone" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="conversational">Conversational</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Preferred writing tone
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-[1.02]">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl text-white mb-2">Editor</h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Get intelligent feedback on dramaturgy, style, and spelling. Improve your manuscript with professional editing insights.
                  </p>
                </div>
              </div>
              <div className="text-sm text-white/80 mb-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Dramaturgy analysis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Style suggestions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Spelling & grammar check</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      // TODO: Implement dramaturgy analysis
                      console.log('Dramaturgy analysis clicked');
                    }}
                    disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileEdit className="h-5 w-5 text-white mb-2" />
                    <span className="text-xs font-medium text-white">Dramaturgy</span>
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement style analysis
                      console.log('Style analysis clicked');
                    }}
                    disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="h-5 w-5 text-white mb-2" />
                    <span className="text-xs font-medium text-white">Style</span>
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement spelling check
                      console.log('Spelling check clicked');
                    }}
                    disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText className="h-5 w-5 text-white mb-2" />
                    <span className="text-xs font-medium text-white">Spelling</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Analysis Type</p>
                    <p className="text-sm text-white/90">Intelligent</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Use Case</p>
                    <p className="text-sm text-white/90">Writing improvement</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Coverage</p>
                    <p className="text-sm text-white/90">Full manuscript</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Language</p>
                    <p className="text-sm text-white/90">Multiple</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Empty State - Upload Section */}
            {isProjectPage && !preview && (
              <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm p-0 mt-6">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-200/80 dark:hover:border-zinc-800/80 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <div className={`p-4 rounded-full transition-colors ${
                      isDragging
                        ? 'bg-primary/10'
                        : 'bg-zinc-100 dark:bg-zinc-800'
                    }`}>
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      ) : (
                        <Upload className={`h-8 w-8 ${
                          isDragging ? 'text-primary' : 'text-zinc-500'
                        }`} />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                        {isUploading ? 'Uploading...' : isDragging ? 'Drop your file here' : 'Upload New Version'}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {isUploading
                          ? 'Processing your document...'
                          : 'Click to select or drag and drop a .docx file to update the manuscript'
                        }
                      </p>
                    </div>
                    {!isUploading && (
                      <>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".docx,.doc"
                          onChange={handleFileInput}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="mt-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Select Document
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="print" className="mt-6">
            <div className="relative flex flex-col p-6 rounded-2xl bg-gradient-to-br from-emerald-700 to-emerald-800 hover:from-emerald-700/95 hover:to-emerald-800/95 text-left transition-all group h-full max-w-4xl">
                <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-white/80 hover:text-white/90 hover:bg-white/10"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-64">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="font-select-print" className="text-sm font-medium mb-2 block">Typography</Label>
                          <Select value={selectedFont} onValueChange={(value) => setSelectedFont(value as FontKey)}>
                            <SelectTrigger id="font-select-print" size="sm">
                              <SelectValue>
                                {FONT_OPTIONS.find(f => f.key === selectedFont)?.name || selectedFont}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {FONT_OPTIONS.map((font) => (
                                <SelectItem key={font.key} value={font.key}>
                                  <div className="flex flex-col">
                                    <span>{font.name}</span>
                                    <span className="text-xs text-muted-foreground">{font.description}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1.5">
                            Choose the font style for your print book
                          </p>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-[1.02]">
                    <BookOpen className="h-7 w-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-xl text-white mb-2">Print Book PDF</h3>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Standard 6x9&quot; layout with industry margins. Perfect for physical printing and distribution.
                    </p>
                  </div>
                </div>
                <div className="text-sm text-white/80 mb-5 space-y-2.5">
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                    <span>Professional typesetting</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                    <span>Industry-standard margins</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                    <span>Print-ready format</span>
                  </div>
                </div>
                <div className="mt-auto pt-4 border-t border-white/20">
                  <div className="space-y-3 mb-4">
                    <div>
                      <p className="text-xs font-medium text-white/70 mb-1">Format</p>
                      <p className="text-sm text-white/90">6x9&quot; PDF</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/70 mb-1">Use Case</p>
                      <p className="text-sm text-white/90">Physical printing, POD services</p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/70 mb-1">Typical Size</p>
                      <p className="text-sm text-white/90">~2-5 MB per file</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleGenerateFromText('print')}
                    disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
                    className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/25 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGeneratingPrint ? 'Typesetting...' : 'Generate Print'}
                  </button>
                </div>
              </div>
            
            {/* Empty State - Upload Section */}
            {isProjectPage && !preview && (
              <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm p-0 mt-6">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-200/80 dark:hover:border-zinc-800/80 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <div className={`p-4 rounded-full transition-colors ${
                      isDragging
                        ? 'bg-primary/10'
                        : 'bg-zinc-100 dark:bg-zinc-800'
                    }`}>
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      ) : (
                        <Upload className={`h-8 w-8 ${
                          isDragging ? 'text-primary' : 'text-zinc-500'
                        }`} />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                        {isUploading ? 'Uploading...' : isDragging ? 'Drop your file here' : 'Upload New Version'}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {isUploading
                          ? 'Processing your document...'
                          : 'Click to select or drag and drop a .docx file to update the manuscript'
                        }
                      </p>
                    </div>
                    {!isUploading && (
                      <>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".docx,.doc"
                          onChange={handleFileInput}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="mt-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Select Document
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="ebook" className="mt-6">
            <div className="relative flex flex-col p-6 rounded-2xl bg-gradient-to-br from-cyan-700 to-cyan-800 hover:from-cyan-700/95 hover:to-cyan-800/95 text-left transition-all group h-full max-w-4xl">
              <div className="absolute top-4 right-4" onClick={(e) => e.stopPropagation()}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/80 hover:text-white/90 hover:bg-white/10"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="font-select-ebook" className="text-sm font-medium mb-2 block">Typography</Label>
                        <Select value={selectedFont} onValueChange={(value) => setSelectedFont(value as FontKey)}>
                          <SelectTrigger id="font-select-ebook" size="sm">
                            <SelectValue>
                              {FONT_OPTIONS.find(f => f.key === selectedFont)?.name || selectedFont}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {FONT_OPTIONS.map((font) => (
                              <SelectItem key={font.key} value={font.key}>
                                <div className="flex flex-col">
                                  <span>{font.name}</span>
                                  <span className="text-xs text-muted-foreground">{font.description}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Choose the font style for your eBook
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-[1.02]">
                  <Tablet className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl text-white mb-2">E-book PDF</h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Digital-first A5 layout optimized for screens. Ideal for e-readers and tablets.
                  </p>
                </div>
              </div>
              <div className="text-sm text-white/80 mb-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Screen-optimized layout</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Reflowable text</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>E-reader compatible</span>
                </div>
              </div>
              <div className="mt-auto pt-4 border-t border-white/20">
                <div className="space-y-3 mb-4">
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Format</p>
                    <p className="text-sm text-white/90">A5 PDF</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Use Case</p>
                    <p className="text-sm text-white/90">E-readers, tablets, digital distribution</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Typical Size</p>
                    <p className="text-sm text-white/90">~1-3 MB per file</p>
                  </div>
                </div>
                <button
                  onClick={() => handleGenerateFromText('ebook')}
                  disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/25 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingEbook ? 'Converting...' : 'Generate E-book'}
                </button>
              </div>
            </div>
            
            {/* Empty State - Upload Section */}
            {isProjectPage && !preview && (
              <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm p-0 mt-6">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-200/80 dark:hover:border-zinc-800/80 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <div className={`p-4 rounded-full transition-colors ${
                      isDragging
                        ? 'bg-primary/10'
                        : 'bg-zinc-100 dark:bg-zinc-800'
                    }`}>
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      ) : (
                        <Upload className={`h-8 w-8 ${
                          isDragging ? 'text-primary' : 'text-zinc-500'
                        }`} />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                        {isUploading ? 'Uploading...' : isDragging ? 'Drop your file here' : 'Upload New Version'}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {isUploading
                          ? 'Processing your document...'
                          : 'Click to select or drag and drop a .docx file to update the manuscript'
                        }
                      </p>
                    </div>
                    {!isUploading && (
                      <>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".docx,.doc"
                          onChange={handleFileInput}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="mt-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Select Document
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cover" className="mt-6">
            <div className="relative flex flex-col p-6 rounded-2xl bg-gradient-to-br from-orange-700 to-orange-800 hover:from-orange-700/95 hover:to-orange-800/95 text-left max-w-4xl transition-all">
              <div className="absolute top-4 right-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/20"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cover-model-select" className="text-sm font-medium mb-2 block">Image Model</Label>
                        <Select value={editorFocus} onValueChange={setEditorFocus}>
                          <SelectTrigger id="editor-focus" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Areas</SelectItem>
                            <SelectItem value="dramaturgy">Dramaturgy</SelectItem>
                            <SelectItem value="style">Style</SelectItem>
                            <SelectItem value="spelling">Spelling</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Choose what to analyze
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="editor-language" className="text-sm font-medium mb-2 block">Language</Label>
                        <Select value={editorLanguage} onValueChange={setEditorLanguage}>
                          <SelectTrigger id="editor-language" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="it">Italian</SelectItem>
                            <SelectItem value="pt">Portuguese</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Language for analysis
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="editor-depth" className="text-sm font-medium mb-2 block">Analysis Depth</Label>
                        <Select value={editorDepth} onValueChange={setEditorDepth}>
                          <SelectTrigger id="editor-depth" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="quick">Quick</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="thorough">Thorough</SelectItem>
                            <SelectItem value="comprehensive">Comprehensive</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Level of detail in feedback
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="editor-tone" className="text-sm font-medium mb-2 block">Tone Preference</Label>
                        <Select value={editorTone} onValueChange={setEditorTone}>
                          <SelectTrigger id="editor-tone" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="professional">Professional</SelectItem>
                            <SelectItem value="casual">Casual</SelectItem>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="creative">Creative</SelectItem>
                            <SelectItem value="conversational">Conversational</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Preferred writing tone
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-[1.02]">
                  <Sparkles className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl text-white mb-2">Editor</h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Get intelligent feedback on dramaturgy, style, and spelling. Improve your manuscript with professional editing insights.
                  </p>
                </div>
              </div>
              <div className="text-sm text-white/80 mb-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Dramaturgy analysis</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Style suggestions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Spelling & grammar check</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button
                    onClick={() => {
                      // TODO: Implement dramaturgy analysis
                      console.log('Dramaturgy analysis clicked');
                    }}
                    disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileEdit className="h-5 w-5 text-white mb-2" />
                    <span className="text-xs font-medium text-white">Dramaturgy</span>
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement style analysis
                      console.log('Style analysis clicked');
                    }}
                    disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Sparkles className="h-5 w-5 text-white mb-2" />
                    <span className="text-xs font-medium text-white">Style</span>
                  </button>
                  <button
                    onClick={() => {
                      // TODO: Implement spelling check
                      console.log('Spelling check clicked');
                    }}
                    disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/10 hover:bg-white/15 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FileText className="h-5 w-5 text-white mb-2" />
                    <span className="text-xs font-medium text-white">Spelling</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Analysis Type</p>
                    <p className="text-sm text-white/90">Intelligent</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Use Case</p>
                    <p className="text-sm text-white/90">Writing improvement</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Coverage</p>
                    <p className="text-sm text-white/90">Full manuscript</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Language</p>
                    <p className="text-sm text-white/90">Multiple</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Empty State - Upload Section */}
            {isProjectPage && !preview && (
              <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm p-0 mt-6">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-200/80 dark:hover:border-zinc-800/80 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <div className={`p-4 rounded-full transition-colors ${
                      isDragging
                        ? 'bg-primary/10'
                        : 'bg-zinc-100 dark:bg-zinc-800'
                    }`}>
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      ) : (
                        <Upload className={`h-8 w-8 ${
                          isDragging ? 'text-primary' : 'text-zinc-500'
                        }`} />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                        {isUploading ? 'Uploading...' : isDragging ? 'Drop your file here' : 'Upload New Version'}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {isUploading
                          ? 'Processing your document...'
                          : 'Click to select or drag and drop a .docx file to update the manuscript'
                        }
                      </p>
                    </div>
                    {!isUploading && (
                      <>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".docx,.doc"
                          onChange={handleFileInput}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="mt-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Select Document
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <div className="relative flex flex-col p-6 rounded-2xl bg-gradient-to-br from-rose-700 to-rose-800 hover:from-rose-700/95 hover:to-rose-800/95 text-left max-w-4xl transition-all">
              <div className="absolute top-4 right-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/80 hover:text-white/90 hover:bg-white/10"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="audio-advanced" className="text-sm font-medium mb-2 block">Advanced Settings</Label>
                        <p className="text-xs text-muted-foreground">
                          Additional configuration options coming soon
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                  <Mic className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl text-white mb-2">Audiobook</h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    High-quality neural text-to-speech narration. Convert your manuscript into a professional audiobook.
                  </p>
                </div>
              </div>
              <div className="text-sm text-white/80 mb-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Natural-sounding voices</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Multiple voice options</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>MP3 format</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <Label htmlFor="audio-model" className="text-xs font-medium text-white/80 mb-2 block">Model</Label>
                    <Select value={audioApi} onValueChange={(value) => setAudioApi(value as 'openai' | 'elevenlabs')}>
                      <SelectTrigger id="audio-model" className="bg-white/20 border-white/30 text-white h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="openai">OpenAI</SelectItem>
                        <SelectItem value="elevenlabs">ElevenLabs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="audio-voice" className="text-xs font-medium text-white/80 mb-2 block">Voice</Label>
                    <Select value={audioVoice} onValueChange={setAudioVoice}>
                      <SelectTrigger id="audio-voice" className="bg-white/20 border-white/30 text-white h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="alloy">Alloy</SelectItem>
                        <SelectItem value="echo">Echo</SelectItem>
                        <SelectItem value="fable">Fable</SelectItem>
                        <SelectItem value="onyx">Onyx</SelectItem>
                        <SelectItem value="nova">Nova</SelectItem>
                        <SelectItem value="shimmer">Shimmer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="audio-style" className="text-xs font-medium text-white/80 mb-2 block">Style</Label>
                    <Select value={audioStyle} onValueChange={setAudioStyle}>
                      <SelectTrigger id="audio-style" className="bg-white/20 border-white/30 text-white h-9">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="natural">Natural</SelectItem>
                        <SelectItem value="dramatic">Dramatic</SelectItem>
                        <SelectItem value="conversational">Conversational</SelectItem>
                        <SelectItem value="narrative">Narrative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Format</p>
                    <p className="text-sm text-white/90">MP3 Audio</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Use Case</p>
                    <p className="text-sm text-white/90">Audiobook platforms</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Typical Size</p>
                    <p className="text-sm text-white/90">~1-2 MB/min</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Duration</p>
                    <p className="text-sm text-white/90">Varies</p>
                  </div>
                </div>
                <ProjectActions projectId={project.id} />
              </div>
            </div>
            
            {/* Empty State - Upload Section */}
            {isProjectPage && !preview && (
              <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm p-0 mt-6">
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`min-h-[400px] flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging
                      ? 'border-primary bg-primary/5'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-200/80 dark:hover:border-zinc-800/80 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30'
                  }`}
                >
                  <div className="flex flex-col items-center gap-4 text-center max-w-md">
                    <div className={`p-4 rounded-full transition-colors ${
                      isDragging
                        ? 'bg-primary/10'
                        : 'bg-zinc-100 dark:bg-zinc-800'
                    }`}>
                      {isUploading ? (
                        <Loader2 className="h-8 w-8 text-primary animate-spin" />
                      ) : (
                        <Upload className={`h-8 w-8 ${
                          isDragging ? 'text-primary' : 'text-zinc-500'
                        }`} />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                        {isUploading ? 'Uploading...' : isDragging ? 'Drop your file here' : 'Upload New Version'}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {isUploading
                          ? 'Processing your document...'
                          : 'Click to select or drag and drop a .docx file to update the manuscript'
                        }
                      </p>
                    </div>
                    {!isUploading && (
                      <>
                        <input
                          id="file-upload"
                          type="file"
                          className="hidden"
                          accept=".docx,.doc"
                          onChange={handleFileInput}
                        />
                        <Button
                          variant="outline"
                          onClick={() => document.getElementById('file-upload')?.click()}
                          className="mt-2"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Select Document
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cover" className="mt-6">
            <div className="relative flex flex-col p-6 rounded-2xl bg-gradient-to-br from-orange-700 to-orange-800 hover:from-orange-700/95 hover:to-orange-800/95 text-left max-w-4xl transition-all">
              <div className="absolute top-4 right-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-white/80 hover:text-white hover:bg-white/20"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-64">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cover-model-select" className="text-sm font-medium mb-2 block">Image Model</Label>
                        <Select value={coverModel} onValueChange={setCoverModel}>
                          <SelectTrigger id="cover-model-select" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nano-banana">Nano Banana</SelectItem>
                            <SelectItem value="flux">Flux</SelectItem>
                            <SelectItem value="dalle-3">DALL-E 3</SelectItem>
                            <SelectItem value="midjourney">Midjourney</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Choose the generation model for cover creation
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="cover-style-select" className="text-sm font-medium mb-2 block">Style</Label>
                        <Select value={coverStyle} onValueChange={setCoverStyle}>
                          <SelectTrigger id="cover-style-select" size="sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="realistic">Realistic</SelectItem>
                            <SelectItem value="illustrated">Illustrated</SelectItem>
                            <SelectItem value="minimalist">Minimalist</SelectItem>
                            <SelectItem value="vintage">Vintage</SelectItem>
                            <SelectItem value="modern">Modern</SelectItem>
                            <SelectItem value="fantasy">Fantasy</SelectItem>
                            <SelectItem value="abstract">Abstract</SelectItem>
                            <SelectItem value="photographic">Photographic</SelectItem>
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground mt-1.5">
                          Choose the visual style for the cover
                        </p>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                  <Palette className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-xl text-white mb-2">Cover Design</h3>
                  <p className="text-sm text-white/90 leading-relaxed">
                    Intelligent book cover generation. Create stunning covers that capture your book's essence.
                  </p>
                </div>
              </div>
              <div className="text-sm text-white/80 mb-5 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Generated designs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>Multiple style options</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/70 flex-shrink-0"></span>
                  <span>High-resolution output</span>
                </div>
              </div>
              <div className="pt-4 border-t border-white/20 space-y-4">
                <div>
                  <Label htmlFor="cover-prompt" className="text-xs font-medium text-white/80 mb-2 block">Prompt</Label>
                  <Textarea
                    id="cover-prompt"
                    value={coverPrompt}
                    onChange={(e) => setCoverPrompt(e.target.value)}
                    placeholder="Describe the cover design you want... (e.g., 'A mysterious forest at twilight with glowing fireflies')"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/50 min-h-[80px] resize-none max-w-2xl"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Format</p>
                    <p className="text-sm text-white/90">PNG / JPG</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Use Case</p>
                    <p className="text-sm text-white/90">Book covers</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Resolution</p>
                    <p className="text-sm text-white/90">300 DPI+</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-white/70 mb-1">Dimensions</p>
                    <p className="text-sm text-white/90">Standard sizes</p>
                  </div>
                </div>
                <button
                  onClick={async () => {
                    if (!coverPrompt.trim()) {
                      alert('Please enter a prompt for the cover design');
                      return;
                    }
                    setIsGeneratingCover(true);
                    try {
                      // Incorporate style into the prompt
                      const stylePrefix = coverStyle !== 'realistic' ? `, ${coverStyle} style` : '';
                      const fullPrompt = `${coverPrompt}${stylePrefix}`;
                      const coverUrl = await generateCoverImage(project.id, fullPrompt, coverModel);
                      const newCover: CoverGeneration = {
                        id: Date.now().toString(),
                        project_id: project.id,
                        cover_url: coverUrl,
                        prompt: coverPrompt,
                        model: coverModel,
                        created_at: new Date().toISOString(),
                        style: coverStyle,
                      };
                      setCoverGenerations([newCover, ...coverGenerations]);
                      setPreview({
                        url: coverUrl,
                        type: 'cover',
                        name: 'Generated Cover',
                        format: 'image',
                        projectTitle: project.title,
                      });
                    } catch (error) {
                      console.error('Error generating cover:', error);
                      alert('Failed to generate cover. Please try again.');
                    } finally {
                      setIsGeneratingCover(false);
                    }
                  }}
                  disabled={isGeneratingPrint || isGeneratingEbook || isUploading || isGeneratingCover || !coverPrompt.trim()}
                  className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white text-sm font-semibold hover:bg-white/25 transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingCover ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    'Design Cover'
                  )}
                </button>
              </div>
            </div>

            {/* Cover Gallery - Show template covers or generated covers */}
            <div className="mt-6">
              {coverGenerations.length === 0 ? (
                <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Template Covers</CardTitle>
                    <CardDescription className="text-sm">
                      Browse template covers or generate a custom one using the prompt above
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {[
                        { id: '1', title: 'Minimalist', description: 'Clean and simple design' },
                        { id: '2', title: 'Abstract', description: 'Modern abstract art' },
                        { id: '3', title: 'Nature', description: 'Natural landscapes' },
                        { id: '4', title: 'Urban', description: 'Cityscapes and architecture' },
                        { id: '5', title: 'Fantasy', description: 'Mystical and magical' },
                        { id: '6', title: 'Vintage', description: 'Classic retro style' },
                        { id: '7', title: 'Geometric', description: 'Bold shapes and patterns' },
                        { id: '8', title: 'Photographic', description: 'Real photography' },
                      ].map((template) => (
                        <div
                          key={template.id}
                          className="group relative aspect-[2/3] rounded-xl border-2 border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-900 hover:border-orange-500 dark:hover:border-orange-500 transition-all cursor-pointer overflow-hidden shadow-sm hover:shadow-md"
                          onClick={() => {
                            // For templates, we could show a preview or use them as inspiration
                            // For now, just show a placeholder
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center p-4">
                            <div className="text-center">
                              <Palette className="h-8 w-8 mx-auto mb-2 text-zinc-400 dark:text-zinc-600 transition-transform group-hover:scale-110" />
                              <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{template.title}</p>
                            </div>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1">
                              <p className="text-xs text-white font-medium">{template.title}</p>
                              <p className="text-xs text-white/80 leading-tight">{template.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg">Generated Covers</CardTitle>
                    <CardDescription className="text-sm">
                      Your generated cover designs
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {coverGenerations.map((cover) => (
                        <div
                          key={cover.id}
                          className="group relative aspect-[2/3] rounded-xl border-2 border-zinc-200 dark:border-zinc-800 overflow-hidden hover:border-orange-500 dark:hover:border-orange-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
                          onClick={() => {
                            setPreview({
                              url: cover.cover_url,
                              type: 'cover',
                              name: 'Generated Cover',
                              format: 'image',
                              projectTitle: project.title,
                            });
                          }}
                        >
                          <img
                            src={cover.cover_url}
                            alt={cover.prompt || 'Generated cover'}
                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <div className="absolute bottom-0 left-0 right-0 p-3 space-y-2">
                              <p className="text-xs text-white font-medium line-clamp-2 leading-tight">{cover.prompt}</p>
                              <div className="flex items-center gap-1.5">
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="h-7 text-xs px-2.5 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(cover.cover_url, '_blank');
                                  }}
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Open
                                </Button>
                                <Button
                                  size="sm"
                                  variant="secondary"
                                  className="h-7 text-xs px-2.5 bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const link = document.createElement('a');
                                    link.href = cover.cover_url;
                                    link.download = `cover-${cover.id}.png`;
                                    link.click();
                                  }}
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Empty State - Upload Section */}
        {isProjectPage && !preview && activeTab !== 'cover' && (
          <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm p-0 mt-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`min-h-[400px] flex flex-col items-center justify-center p-8 border border-dashed rounded-lg transition-colors ${
                isDragging
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-200/60 dark:hover:border-zinc-800/60 hover:bg-zinc-50/30 dark:hover:bg-zinc-900/30'
              }`}
            >
              <div className="flex flex-col items-center gap-4 text-center max-w-md">
                <div className={`p-4 rounded-full transition-colors ${
                  isDragging
                    ? 'bg-primary/10'
                    : 'bg-zinc-100 dark:bg-zinc-800'
                }`}>
                  {isUploading ? (
                    <Loader2 className="h-8 w-8 text-primary animate-spin" />
                  ) : (
                    <Upload className={`h-8 w-8 ${
                      isDragging ? 'text-primary' : 'text-zinc-500'
                    }`} />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-zinc-900 dark:text-white">
                    {isUploading ? 'Uploading...' : isDragging ? 'Drop your file here' : 'Upload New Version'}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    {isUploading
                      ? 'Processing your document...'
                      : 'Click to select or drag and drop a .docx file to update the manuscript'
                    }
                  </p>
                </div>
                {!isUploading && (
                  <>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".docx,.doc"
                      onChange={handleFileInput}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                      className="mt-2"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Select Document
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        )}

      </main>

    </div>
  );
}

