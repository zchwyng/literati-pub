'use client';

import * as React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { PanelRightIcon } from 'lucide-react';
import {
  Sidebar,
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
  SidebarMenuBadge,
} from '@/components/ui/sidebar';
import {
  Download,
  ExternalLink,
  FileText,
  MoreHorizontal,
  Mic,
  File,
  Palette,
  Loader2,
  BookOpen,
  Tablet,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { getAudioGenerations, getProject, getCoverGenerations } from '../actions';
import { getPrintJobs } from '../actions/print';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '@/components/ui/empty';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
  const [coverGenerations, setCoverGenerations] = React.useState<any[]>([]);
  const [project, setProject] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [showAllPrint, setShowAllPrint] = React.useState(false);
  const [showAllEbook, setShowAllEbook] = React.useState(false);
  const [manuscriptVersionsOpen, setManuscriptVersionsOpen] = React.useState(false);
  const [coversOpen, setCoversOpen] = React.useState(false);
  const [audiobookOpen, setAudiobookOpen] = React.useState(false);
  const [printOpen, setPrintOpen] = React.useState(false);
  const [ebookOpen, setEbookOpen] = React.useState(false);

  // Extract unique manuscript versions from print jobs
  const manuscriptVersions = React.useMemo(() => {
    if (!printJobs || printJobs.length === 0) {
      return [];
    }
    
    const versions = printJobs
      .filter((job: any) => job.original_file_url && typeof job.original_file_url === 'string' && job.original_file_url.trim() !== '')
      .map((job: any) => {
        // Use original filename if available, otherwise fall back to date-based name
        const fileName = job.original_filename || `Manuscript ${new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;
        return {
          id: `ms-${job.id}`,
          url: job.original_file_url,
          name: fileName,
          created_at: job.created_at,
          format: job.format || 'print',
          font: job.font || 'Default',
        };
      })
      // Remove duplicates by URL
      .filter((version, index, self) => 
        index === self.findIndex((v) => v.url === version.url)
      )
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    
    return versions;
  }, [printJobs]);

  const fetchFiles = React.useCallback(async () => {
    if (!projectId) return;
    setLoading(true);
    try {
      const [audio, print, covers, projectData] = await Promise.all([
        getAudioGenerations(projectId),
        getPrintJobs(projectId),
        getCoverGenerations(projectId),
        getProject(projectId),
      ]);
      setAudioFiles(audio);
      setPrintJobs(print);
      setCoverGenerations(covers);
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

  // Auto-open manuscript versions section if there are versions
  React.useEffect(() => {
    if (manuscriptVersions.length > 0 && !manuscriptVersionsOpen) {
      setManuscriptVersionsOpen(true);
    }
  }, [manuscriptVersions.length, manuscriptVersionsOpen]);

  if (!isProjectPage) return null;

  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar
      side="right"
      collapsible={isCollapsed ? 'offcanvas' : 'none'}
      className={cn(
        "sticky top-0 hidden h-svh border-l lg:flex",
        isCollapsed && "hidden"
      )}
    >
          <SidebarHeader className="h-16 border-b border-sidebar-border flex flex-row items-center justify-between px-4">
            <span className="text-sm font-semibold">Binder</span>
          </SidebarHeader>
          <SidebarContent className="flex-1 overflow-y-auto overflow-x-hidden">
            {/* Manuscript Versions - Moved to top */}
            <Collapsible 
              open={manuscriptVersionsOpen} 
              onOpenChange={setManuscriptVersionsOpen}
              defaultOpen={false}
            >
              <SidebarGroup>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent/50">
                    <ChevronDown className={`h-3 w-3 transition-transform ${manuscriptVersionsOpen ? 'rotate-0' : '-rotate-90'}`} />
                    Manuscript Versions
                    {manuscriptVersions.length > 0 && (
                      <SidebarMenuBadge>{manuscriptVersions.length}</SidebarMenuBadge>
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {manuscriptVersions.length === 0 ? (
                        <SidebarMenuItem>
                          <Empty className="p-2 border-0">
                            <EmptyContent>
                              <EmptyMedia variant="icon">
                                <FileText className="h-3 w-3" />
                              </EmptyMedia>
                              <EmptyHeader>
                                <EmptyTitle className="text-xs">No manuscripts</EmptyTitle>
                                <EmptyDescription className="text-[10px]">
                                  Upload a .docx file to get started
                                </EmptyDescription>
                              </EmptyHeader>
                            </EmptyContent>
                          </Empty>
                        </SidebarMenuItem>
                      ) : (
                    manuscriptVersions.map((version: any) => (
                      <SidebarMenuItem key={version.id}>
                        <SidebarMenuButton
                          onClick={() => {
                            // Set preview to show manuscript in Edit tab
                            setPreview({
                              type: 'manuscript',
                              url: version.url,
                              name: version.name,
                              format: version.format,
                              projectTitle: project?.title,
                            });
                          }}
                          isActive={preview?.type === 'manuscript' && preview?.url === version.url}
                          disabled={loading}
                          className="group"
                        >
                          <FileText className="h-4 w-4 shrink-0" />
                          <div className="flex flex-col items-start overflow-hidden">
                            <span className="truncate font-medium">{version.name}</span>
                            <span className="text-[10px] text-muted-foreground truncate">
                              {new Date(version.created_at).toLocaleDateString()} • {version.format === 'ebook' ? 'E-book' : 'Print'} • {version.font || 'Default'}
                            </span>
                          </div>
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
                                window.open(version.url, '_blank');
                              }}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open in new tab
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                const link = document.createElement('a');
                                link.href = version.url;
                                link.download = version.name.replace(/\s+/g, '-') + '.docx';
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
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <SidebarSeparator />

            {/* Covers */}
            <Collapsible 
              open={coversOpen} 
              onOpenChange={setCoversOpen}
              defaultOpen={false}
            >
              <SidebarGroup>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent/50">
                    <ChevronDown className={`h-3 w-3 transition-transform ${coversOpen ? 'rotate-0' : '-rotate-90'}`} />
                    Covers
                    {coverGenerations.length > 0 && (
                      <SidebarMenuBadge>{coverGenerations.length}</SidebarMenuBadge>
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {coverGenerations.length === 0 ? (
                        <SidebarMenuItem>
                          <Empty className="p-2 border-0">
                            <EmptyContent>
                              <EmptyMedia variant="icon">
                                <Palette className="h-3 w-3" />
                              </EmptyMedia>
                              <EmptyHeader>
                                <EmptyTitle className="text-xs">No covers</EmptyTitle>
                                <EmptyDescription className="text-[10px]">
                                  Generate a cover in the Cover tab
                                </EmptyDescription>
                              </EmptyHeader>
                            </EmptyContent>
                          </Empty>
                        </SidebarMenuItem>
                      ) : (
                    coverGenerations.map((cover: any) => (
                      <SidebarMenuItem key={cover.id}>
                        <SidebarMenuButton
                          onClick={() => {
                            setPreview({
                              type: 'cover',
                              url: cover.cover_url,
                              name: cover.prompt || 'Generated Cover',
                              format: 'image',
                              projectTitle: project?.title,
                            });
                          }}
                          isActive={preview?.type === 'cover' && preview?.url === cover.cover_url}
                          disabled={loading}
                          className="group"
                        >
                          <Palette className="h-4 w-4 shrink-0" />
                          <span className="truncate">{cover.prompt || 'Cover'}</span>
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
                                window.open(cover.cover_url, '_blank');
                              }}
                            >
                              <ExternalLink className="mr-2 h-4 w-4" />
                              Open in new tab
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                const link = document.createElement('a');
                                link.href = cover.cover_url;
                                link.download = `cover-${cover.id}.png`;
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
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <SidebarSeparator />

            {/* Audio Files */}
            <Collapsible 
              open={audiobookOpen} 
              onOpenChange={setAudiobookOpen}
              defaultOpen={false}
            >
              <SidebarGroup>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent/50">
                    <ChevronDown className={`h-3 w-3 transition-transform ${audiobookOpen ? 'rotate-0' : '-rotate-90'}`} />
                    Audiobook
                    {audioFiles.length > 0 && (
                      <SidebarMenuBadge>{audioFiles.length}</SidebarMenuBadge>
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {audioFiles.length === 0 ? (
                        <SidebarMenuItem>
                          <Empty className="p-2 border-0">
                            <EmptyContent>
                              <EmptyMedia variant="icon">
                                <Mic className="h-3 w-3" />
                              </EmptyMedia>
                              <EmptyHeader>
                                <EmptyTitle className="text-xs">No audio</EmptyTitle>
                                <EmptyDescription className="text-[10px]">
                                  Generate audio in the Audiobook tab
                                </EmptyDescription>
                              </EmptyHeader>
                            </EmptyContent>
                          </Empty>
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
                          disabled={loading}
                          className="group"
                        >
                          <Mic className="h-4 w-4 shrink-0" />
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
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <SidebarSeparator />

            {/* Print Files */}
            <Collapsible 
              open={printOpen} 
              onOpenChange={setPrintOpen}
              defaultOpen={false}
            >
              <SidebarGroup>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent/50">
                    <ChevronDown className={`h-3 w-3 transition-transform ${printOpen ? 'rotate-0' : '-rotate-90'}`} />
                    Print
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {(() => {
                        const printFiles = printJobs.filter((job: any) => job.format === 'print');
                        const displayCount = showAllPrint ? printFiles.length : 5;
                        const hasMore = printFiles.length > 5;
                        
                        if (printFiles.length === 0) {
                          return null;
                        }
                    
                    return (
                      <>
                        {printFiles.slice(0, displayCount).map((job: any) => (
                          <SidebarMenuItem key={job.id}>
                            {job.status === 'completed' && job.pdf_file_url ? (
                              <>
                                <SidebarMenuButton
                                  onClick={() => {
                                    setPreview({
                                      type: 'pdf',
                                      url: job.pdf_file_url,
                                      name: 'Print PDF',
                                      format: 'print',
                                      projectTitle: project?.title,
                                    });
                                  }}
                                  isActive={preview?.type === 'pdf' && preview?.url === job.pdf_file_url && preview?.format === 'print'}
                                  disabled={loading}
                                  className="group"
                                >
                                  <BookOpen className="h-4 w-4 shrink-0" />
                                  <div className="flex flex-col items-start overflow-hidden">
                                    <span className="truncate font-medium">Print PDF</span>
                                    <span className="text-[10px] text-muted-foreground truncate">
                                      {new Date(job.created_at).toLocaleDateString()} • {job.font || 'Default'}
                                    </span>
                                  </div>
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
                              <SidebarMenuButton disabled className="group opacity-70">
                                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                                <span className="truncate">Print PDF</span>
                                <span className="ml-auto text-xs text-muted-foreground capitalize">
                                  {job.status}
                                </span>
                              </SidebarMenuButton>
                            )}
                          </SidebarMenuItem>
                        ))}
                        {hasMore && (
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              onClick={() => setShowAllPrint(!showAllPrint)}
                              className="text-xs text-muted-foreground justify-center h-8"
                            >
                              {showAllPrint ? (
                                <>
                                  <ChevronUp className="h-3 w-3 mr-1" />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-3 w-3 mr-1" />
                                  View {printFiles.length - 5} more
                                </>
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )}
                      </>
                    );
                  })()}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>

            <SidebarSeparator />

            {/* eBook Files */}
            <Collapsible 
              open={ebookOpen} 
              onOpenChange={setEbookOpen}
              defaultOpen={false}
            >
              <SidebarGroup>
                <CollapsibleTrigger asChild>
                  <SidebarGroupLabel className="cursor-pointer hover:bg-sidebar-accent/50">
                    <ChevronDown className={`h-3 w-3 transition-transform ${ebookOpen ? 'rotate-0' : '-rotate-90'}`} />
                    E-book
                    {printJobs.filter((job: any) => job.format === 'ebook').length > 0 && (
                      <SidebarMenuBadge>{printJobs.filter((job: any) => job.format === 'ebook').length}</SidebarMenuBadge>
                    )}
                  </SidebarGroupLabel>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {(() => {
                        const ebookFiles = printJobs.filter((job: any) => job.format === 'ebook');
                        const displayCount = showAllEbook ? ebookFiles.length : 5;
                        const hasMore = ebookFiles.length > 5;
                        
                        if (ebookFiles.length === 0) {
                          return null;
                        }
                        
                        return (
                          <>
                            {ebookFiles.slice(0, displayCount).map((job: any) => (
                          <SidebarMenuItem key={job.id}>
                            {job.status === 'completed' && job.pdf_file_url ? (
                              <>
                                <SidebarMenuButton
                                  onClick={() => {
                                    setPreview({
                                      type: 'pdf',
                                      url: job.pdf_file_url,
                                      name: 'E-book PDF',
                                      format: 'ebook',
                                      projectTitle: project?.title,
                                    });
                                  }}
                                  isActive={preview?.type === 'pdf' && preview?.url === job.pdf_file_url && preview?.format === 'ebook'}
                                  disabled={loading}
                                  className="group"
                                >
                                  <Tablet className="h-4 w-4 shrink-0" />
                                  <div className="flex flex-col items-start overflow-hidden">
                                    <span className="truncate font-medium">E-book PDF</span>
                                    <span className="text-[10px] text-muted-foreground truncate">
                                      {new Date(job.created_at).toLocaleDateString()} • {job.font || 'Default'}
                                    </span>
                                  </div>
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
                              <SidebarMenuButton disabled className="group opacity-70">
                                <Loader2 className="h-4 w-4 shrink-0 animate-spin" />
                                <span className="truncate">E-book PDF</span>
                                <span className="ml-auto text-xs text-muted-foreground capitalize">
                                  {job.status}
                                </span>
                              </SidebarMenuButton>
                            )}
                          </SidebarMenuItem>
                        ))}
                        {hasMore && (
                          <SidebarMenuItem>
                            <SidebarMenuButton
                              onClick={() => setShowAllEbook(!showAllEbook)}
                              className="text-xs text-muted-foreground justify-center h-8"
                            >
                              {showAllEbook ? (
                                <>
                                  <ChevronUp className="h-3 w-3 mr-1" />
                                  Show Less
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="h-3 w-3 mr-1" />
                                  View {ebookFiles.length - 5} more
                                </>
                              )}
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        )}
                      </>
                    );
                  })()}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          </SidebarContent>
          <SidebarSeparator className="mx-0" />
          <SidebarFooter className="border-t border-sidebar-border p-4 mt-auto shrink-0">
            {project && (
              <div className="flex items-center gap-3">
                <div>
                  <div className="text-lg font-bold text-foreground font-mono">
                    {Math.round((project.content?.split(/\s+/).length || 0) / 250).toLocaleString()}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Pages</div>
                </div>
                <div className="w-px h-8 bg-sidebar-border" />
                <div>
                  <div className="text-lg font-bold text-foreground font-mono">
                    {project.content?.split(/\s+/).length.toLocaleString() || 0}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Words</div>
                </div>
                <div className="w-px h-8 bg-sidebar-border" />
                <div>
                  <div className="text-lg font-bold text-foreground font-mono">
                    {project.content?.length.toLocaleString() || 0}
                  </div>
                  <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Chars</div>
                </div>
              </div>
            )}
          </SidebarFooter>
          <SidebarRail />
    </Sidebar>
  );
}
