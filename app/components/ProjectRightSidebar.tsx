'use client';

import * as React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { PanelRightIcon } from 'lucide-react';
import {
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  Download,
  RefreshCw,
  ExternalLink,
  FileText,
  MoreHorizontal,
} from 'lucide-react';
import { getAudioGenerations, getProject } from '../actions';
import { getPrintJobs } from '../actions/print';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useFilePreview } from './FilePreviewContext';

const SIDEBAR_WIDTH = '16rem';

// Right Sidebar Context
type RightSidebarContextProps = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};

const RightSidebarContext = React.createContext<RightSidebarContextProps | null>(null);

function useRightSidebar() {
  const context = React.useContext(RightSidebarContext);
  if (!context) {
    throw new Error('useRightSidebar must be used within a RightSidebarProvider.');
  }
  return context;
}

export function RightSidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(true);

  const toggleSidebar = React.useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<RightSidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      toggleSidebar,
    }),
    [state, open, setOpen, toggleSidebar]
  );

  return (
    <RightSidebarContext.Provider value={contextValue}>
      {children}
    </RightSidebarContext.Provider>
  );
}

export function RightSidebarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar } = useRightSidebar();

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("size-7", className)}
      onClick={(event) => {
        props.onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      <PanelRightIcon />
      <span className="sr-only">Toggle Right Sidebar</span>
    </Button>
  );
}

export function ProjectRightSidebar() {
  const params = useParams();
  const pathname = usePathname();
  const projectId = params.id as string;
  const isProjectPage =
    pathname?.startsWith('/dashboard/project/') && !!projectId;

  const { state, open } = useRightSidebar();
  const { preview, setPreview } = useFilePreview();

  const [audioFiles, setAudioFiles] = React.useState<any[]>([]);
  const [printJobs, setPrintJobs] = React.useState<any[]>([]);
  const [project, setProject] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);

  const fetchFiles = React.useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const [audio, print, projectData] = await Promise.all([
        getAudioGenerations(projectId),
        getPrintJobs(projectId),
        getProject(projectId),
      ]);
      setAudioFiles(audio);
      setPrintJobs(print);
      setProject(projectData);
    } catch (error) {
      console.error('Failed to fetch files', error);
    } finally {
      setLoading(false);
    }
  }, [projectId]);

  React.useEffect(() => {
    if (isProjectPage) {
      fetchFiles();
      const interval = setInterval(fetchFiles, 10000);
      return () => clearInterval(interval);
    }
  }, [isProjectPage, fetchFiles]);

  if (!isProjectPage) return null;

  const isCollapsed = state === 'collapsed';

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-state={state}
      data-collapsible={isCollapsed ? 'offcanvas' : ''}
      data-side="right"
      data-slot="sidebar"
    >
      {/* Sidebar gap for layout */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative bg-transparent transition-[width] duration-200 ease-linear",
          "w-[16rem]",
          "group-data-[collapsible=offcanvas]:w-0"
        )}
        style={{ width: isCollapsed ? 0 : SIDEBAR_WIDTH }}
      />
      {/* Sidebar container with smooth animation */}
      <div
        data-slot="sidebar-container"
        className={cn(
          "fixed inset-y-0 z-10 hidden h-svh md:flex",
          "transition-[right] duration-200 ease-linear",
          "border-l border-sidebar-border"
        )}
        style={{
          width: SIDEBAR_WIDTH,
          right: isCollapsed ? `calc(${SIDEBAR_WIDTH} * -1)` : 0,
        }}
      >
        <div
          data-sidebar="sidebar"
          data-slot="sidebar-inner"
          className="bg-sidebar flex h-full w-full flex-col overflow-hidden"
        >
          <SidebarHeader className="h-16 border-b border-sidebar-border flex flex-row items-center justify-between px-4">
            <span className="text-sm font-semibold">Generated Files</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={fetchFiles}
              disabled={loading}
              className="h-8 w-8"
            >
              <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
              <span className="sr-only">Refresh files</span>
            </Button>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-auto">
            {/* Audio Files */}
            <SidebarGroup>
              <SidebarGroupLabel>Audiobook</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {audioFiles.length === 0 ? (
                    <SidebarMenuItem>
                      <div className="px-2 py-2 text-xs text-muted-foreground text-center">
                        No audio generated yet.
                      </div>
                    </SidebarMenuItem>
                  ) : (
                    audioFiles.map((file: any) => (
                      <SidebarMenuItem key={file.id}>
                        <SidebarMenuButton
                          onClick={() => {
                            setPreview({
                              type: 'audio',
                              url: file.audio_url,
                              name: 'Audiobook',
                              projectTitle: project?.title,
                            });
                          }}
                          isActive={preview?.type === 'audio' && preview?.url === file.audio_url}
                          className="group"
                        >
                          <span className="truncate">Audio Version</span>
                        </SidebarMenuButton>
                        <DropdownMenu>
                          <SidebarMenuAction asChild showOnHover>
                            <DropdownMenuTrigger asChild>
                              <button
                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">More options</span>
                              </button>
                            </DropdownMenuTrigger>
                          </SidebarMenuAction>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(file.audio_url, '_blank');
                              }}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open in new tab
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                const link = document.createElement('a');
                                link.href = file.audio_url;
                                link.download = '';
                                link.click();
                              }}
                            >
                              <Download className="mr-2 h-4 w-4" />
                              Download
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarSeparator />

            {/* Print Files */}
            <SidebarGroup>
              <SidebarGroupLabel>Print & eBook</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {printJobs.length === 0 ? (
                    <SidebarMenuItem>
                      <div className="px-2 py-2 text-xs text-muted-foreground text-center">
                        No PDFs generated yet.
                      </div>
                    </SidebarMenuItem>
                  ) : (
                    printJobs.map((job: any) => (
                      <SidebarMenuItem key={job.id}>
                        {job.status === 'completed' && job.pdf_file_url ? (
                          <>
                            <SidebarMenuButton
                              onClick={() => {
                                setPreview({
                                  type: 'pdf',
                                  url: job.pdf_file_url,
                                  name: `${job.format} PDF`,
                                  format: job.format,
                                  projectTitle: project?.title,
                                });
                              }}
                              isActive={preview?.type === 'pdf' && preview?.url === job.pdf_file_url}
                              className="group"
                            >
                              <span className="truncate capitalize">{job.format} PDF</span>
                            </SidebarMenuButton>
                            <DropdownMenu>
                              <SidebarMenuAction asChild showOnHover>
                                <DropdownMenuTrigger asChild>
                                  <button
                                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">More options</span>
                                  </button>
                                </DropdownMenuTrigger>
                              </SidebarMenuAction>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    window.open(job.pdf_file_url, '_blank');
                                  }}
                                >
                                  <ExternalLink className="mr-2 h-4 w-4" />
                                  Open in new tab
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    const link = document.createElement('a');
                                    link.href = job.pdf_file_url;
                                    link.download = '';
                                    link.click();
                                  }}
                                >
                                  <Download className="mr-2 h-4 w-4" />
                                  Download
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </>
                        ) : (
                          <SidebarMenuButton disabled className="group">
                            <span className="truncate capitalize">{job.format} PDF</span>
                            <span className="ml-auto text-xs text-muted-foreground capitalize">
                              {job.status}
                            </span>
                          </SidebarMenuButton>
                        )}
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator className="mx-0" />
          <SidebarFooter className="border-t border-sidebar-border p-4 mt-auto shrink-0">
            {project && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Manuscript Stats</span>
                </div>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="text-lg font-bold text-foreground font-mono">
                      {project.content?.split(/\s+/).length.toLocaleString() || 0}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Words</div>
                  </div>
                  <div className="w-px h-8 bg-sidebar-border" />
                  <div>
                    <div className="text-lg font-bold text-foreground font-mono">
                      {Math.round((project.content?.split(/\s+/).length || 0) / 250).toLocaleString()}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Pages</div>
                  </div>
                  <div className="w-px h-8 bg-sidebar-border" />
                  <div>
                    <div className="text-lg font-bold text-foreground font-mono">
                      {project.content?.length.toLocaleString() || 0}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Chars</div>
                  </div>
                </div>
                {project.content && (
                  <div className="pt-2">
                    <Badge variant="outline" className="bg-background font-mono font-normal text-[10px] w-full justify-start">
                      {project.content.slice(0, 30)}...
                    </Badge>
                  </div>
                )}
              </div>
            )}
          </SidebarFooter>
          <SidebarRail />
        </div>
      </div>
    </div>
  );
}
