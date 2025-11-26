'use client';

import * as React from 'react';
import { useParams, usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  FileAudio,
  Download,
  Loader2,
  RefreshCw,
  ChevronDown,
  FileText,
  Printer,
  Smartphone,
} from 'lucide-react';
import { getAudioGenerations } from '../actions';
import { getPrintJobs } from '../actions/print';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

function CollapsibleGroup({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <SidebarGroup>
      <div className="flex items-center justify-between px-2 mb-2">
        <SidebarGroupLabel className="p-0">{title}</SidebarGroupLabel>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5"
          onClick={() => setIsOpen(!isOpen)}
        >
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              isOpen ? '' : '-rotate-90'
            }`}
          />
        </Button>
      </div>
      {isOpen && <SidebarGroupContent>{children}</SidebarGroupContent>}
    </SidebarGroup>
  );
}

export function ProjectRightSidebar() {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.id as string;
  const isProjectPage =
    pathname?.startsWith('/dashboard/project/') && !!projectId;

  const [audioFiles, setAudioFiles] = React.useState<any[]>([]);
  const [printJobs, setPrintJobs] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const fetchFiles = React.useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const [audio, print] = await Promise.all([
        getAudioGenerations(projectId),
        getPrintJobs(projectId),
      ]);
      setAudioFiles(audio);
      setPrintJobs(print);
    } catch (error) {
      console.error('Failed to fetch files', error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  React.useEffect(() => {
    if (isProjectPage) {
      fetchFiles();
      // Poll for updates if there are processing jobs
      const interval = setInterval(() => {
        // In a real app, check if any job is 'processing' before polling
        // simplified here to auto-refresh
        fetchFiles();
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isProjectPage, fetchFiles]);

  if (!isProjectPage) return null;

  return (
    <Sidebar
      side="right"
      variant="floating"
      collapsible="none"
      className="w-80 border-l bg-zinc-50/50 dark:bg-zinc-900/50"
    >
      <SidebarHeader className="h-16 border-b px-4 flex flex-row items-center justify-between bg-background">
        <span className="text-sm font-semibold">Generated Files</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={fetchFiles}
          disabled={loading}
          className="h-8 w-8"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          {/* Audio Files */}
          <CollapsibleGroup title="Audiobook">
            <SidebarMenu>
              {audioFiles.length === 0 ? (
                <div className="px-4 py-4 text-xs text-muted-foreground text-center border-dashed border rounded-md mx-2 mt-2">
                  No audio generated yet.
                </div>
              ) : (
                audioFiles.map((file: any) => (
                  <SidebarMenuItem key={file.id}>
                    <SidebarMenuButton asChild className="h-auto py-3">
                      <a
                        href={file.audio_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 group"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                          <FileAudio className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col gap-1 overflow-hidden flex-1">
                          <span className="text-xs font-medium truncate leading-none">
                            Audio Version
                          </span>
                          <span className="text-[10px] text-muted-foreground truncate">
                            {new Date(file.created_at).toLocaleString()}
                          </span>
                        </div>
                        <Download className="h-4 w-4 opacity-0 group-hover:opacity-50 transition-opacity" />
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </CollapsibleGroup>

          <SidebarSeparator className="mx-2" />

          {/* Print Files */}
          <CollapsibleGroup title="Print & eBook">
            <SidebarMenu>
              {printJobs.length === 0 ? (
                <div className="px-4 py-4 text-xs text-muted-foreground text-center border-dashed border rounded-md mx-2 mt-2">
                  No PDFs generated yet.
                </div>
              ) : (
                printJobs.map((job: any) => (
                  <SidebarMenuItem key={job.id}>
                    <div className="flex flex-col p-2 rounded-md hover:bg-muted/50 transition-colors gap-2 mx-2 border border-transparent hover:border-border">
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-8 h-8 rounded-md flex items-center justify-center shrink-0 border ${
                            job.format === 'ebook'
                              ? 'bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/30'
                              : 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30'
                          }`}
                        >
                          {job.format === 'ebook' ? (
                            <Smartphone className="h-4 w-4" />
                          ) : (
                            <Printer className="h-4 w-4" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-medium truncate capitalize">
                              {job.format} PDF
                            </span>
                            <Badge
                              variant="outline"
                              className={`text-[9px] px-1 py-0 h-4 ${
                                job.status === 'completed'
                                  ? 'text-green-600 border-green-200 bg-green-50'
                                  : job.status === 'processing'
                                  ? 'text-amber-600 border-amber-200 bg-amber-50'
                                  : 'text-red-600 border-red-200 bg-red-50'
                              }`}
                            >
                              {job.status}
                            </Badge>
                          </div>
                          <span className="text-[10px] text-muted-foreground truncate mt-0.5">
                            {new Date(job.created_at).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {job.status === 'completed' && job.pdf_file_url && (
                        <div className="flex items-center gap-2 mt-1 pl-11">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-6 text-[10px] px-2 h-7"
                            asChild
                          >
                            <a
                              href={job.pdf_file_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <FileText className="h-3 w-3 mr-1.5" /> Preview
                            </a>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            asChild
                          >
                            <a href={job.pdf_file_url} download>
                              <Download className="h-3.5 w-3.5" />
                            </a>
                          </Button>
                        </div>
                      )}
                    </div>
                  </SidebarMenuItem>
                ))
              )}
            </SidebarMenu>
          </CollapsibleGroup>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}

