'use client';

import { useState } from 'react';
import { createPrintJob, createPrintJobFromContent } from '../actions/print';
import { FONTS, type FontKey } from '../lib/print-constants';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

export default function PrintManager({
  projectId,
  jobs,
}: {
  projectId: string;
  jobs: PrintJob[];
}) {
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingPrint, setIsGeneratingPrint] = useState(false);
  const [isGeneratingEbook, setIsGeneratingEbook] = useState(false);
  const [selectedFont, setSelectedFont] = useState<FontKey>('baskerville');

  // State for PDF preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(() => {
    const latestCompletedJob = jobs.find(
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
      await createPrintJob(projectId, formData, 'print', selectedFont);
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
      await createPrintJobFromContent(projectId, format, selectedFont);
    } catch (error) {
      console.error(error);
      alert(`Generation failed for ${format}`);
    } finally {
      if (format === 'print') setIsGeneratingPrint(false);
      else setIsGeneratingEbook(false);
    }
  };

  return (
    <div className="space-y-8">
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
              onValueChange={(value) => setSelectedFont(value as FontKey)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a font" />
              </SelectTrigger>
              <SelectContent>
                {FONT_OPTIONS.map((font) => (
                  <SelectItem key={font.key} value={font.key} className="py-3">
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
              Standard 6x9&quot; layout with industry margins, headers, and
              serif typography. Best for KDP/Ingram.
            </p>
          </div>
          <button
            onClick={() => handleGenerateFromText('print')}
            disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
            className="w-full py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm group-hover:shadow-md disabled:opacity-50"
          >
            {isGeneratingPrint ? 'Typesetting...' : 'Generate Print PDF'}
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
              Digital-first A5 layout with larger text, optimized spacing, and
              sans-serif fonts for screens.
            </p>
          </div>
          <button
            onClick={() => handleGenerateFromText('ebook')}
            disabled={isGeneratingPrint || isGeneratingEbook || isUploading}
            className="w-full py-2.5 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-all shadow-sm group-hover:shadow-md disabled:opacity-50"
          >
            {isGeneratingEbook ? 'Converting...' : 'Generate eBook PDF'}
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

      {/* Results List */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
            Generated Files
          </h3>
          <span className="text-xs text-zinc-400">{jobs.length} files</span>
        </div>

        {jobs.length === 0 ? (
          <div className="text-center py-8 bg-zinc-50/50 dark:bg-zinc-900/50 rounded-lg border border-zinc-100 dark:border-zinc-800">
            <p className="text-zinc-400 text-xs">No files generated yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map(job => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 transition-all"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`
                    w-10 h-10 rounded-lg flex items-center justify-center text-lg border
                    ${
                      job.format === 'ebook'
                        ? 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-900/30 text-purple-600 dark:text-purple-400'
                        : 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/30 text-blue-600 dark:text-blue-400'
                    }
                  `}
                  >
                    {job.format === 'ebook' ? '📱' : '📖'}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-white capitalize">
                      {job.format || 'Print'} Version
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <span>
                        {new Date(job.created_at).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      {job.font && (
                        <>
                          <span className="capitalize">{job.font}</span>
                          <span>•</span>
                        </>
                      )}
                      <span
                        className={`
                        capitalize
                        ${
                          job.status === 'completed'
                            ? 'text-green-600 dark:text-green-400'
                            : ''
                        }
                        ${
                          job.status === 'failed'
                            ? 'text-red-600 dark:text-red-400'
                            : ''
                        }
                        ${
                          job.status === 'processing'
                            ? 'text-amber-600 dark:text-amber-400'
                            : ''
                        }
                      `}
                      >
                        {job.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Preview Button */}
                  {job.status === 'completed' && job.pdf_file_url && (
                    <button
                      onClick={() => setPreviewUrl(job.pdf_file_url)}
                      className={`
                          p-2 rounded-lg transition-colors border
                          ${
                            previewUrl === job.pdf_file_url
                              ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                              : 'text-zinc-400 border-transparent hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }
                        `}
                      title="Preview PDF"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>
                  )}

                  {job.original_file_url && (
                    <a
                      href={job.original_file_url}
                      download
                      className="p-2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      title="Download Original Doc"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </a>
                  )}

                  {job.status === 'completed' && job.pdf_file_url && (
                    <a
                      href={job.pdf_file_url}
                      download
                      className="px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                    >
                      Download PDF
                      <svg
                        className="w-3 h-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
