import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProjects, getAudioGenerations, getCoverGenerations } from '../../actions';
import { getPrintJobs } from '../../actions/print';
import { Archive, BookOpen, FileText, RotateCcw } from 'lucide-react';
import { getBookCoverColor } from '@/lib/utils';
import { PinButton } from '../../components/PinButton';

interface Project {
  id: string;
  title: string;
  content: string;
  created_at: string;
  pinned?: boolean;
  archived?: boolean;
}

async function getFileCount(projectId: string) {
  try {
    const [audioFiles, printJobs, coverGenerations] = await Promise.all([
      getAudioGenerations(projectId),
      getPrintJobs(projectId),
      getCoverGenerations(projectId),
    ]);

    // Count unique manuscript versions (from print jobs with original_file_url)
    const manuscriptVersions = new Set(
      printJobs
        .filter((job: any) => job.original_file_url && job.original_file_url.trim() !== '')
        .map((job: any) => job.original_file_url)
    ).size;

    // Count all files
    const totalFiles = 
      audioFiles.length + 
      printJobs.length + 
      coverGenerations.length + 
      manuscriptVersions;

    return totalFiles;
  } catch (error) {
    console.error('Failed to get file count for project', projectId, error);
    return 0;
  }
}

export default async function ArchivePage() {
  const allProjects = await getProjects();
  
  // Filter archived projects
  const archivedProjects = allProjects.filter((project: any) => project.archived === true);

  // Get file counts for all archived projects
  const projectsWithCounts = await Promise.all(
    archivedProjects.map(async (project) => {
      const fileCount = await getFileCount(project.id);
      return { ...project, fileCount };
    })
  );

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            Archive
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Archived projects and manuscripts
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
        >
          <Link href="/dashboard">
            <RotateCcw className="mr-2 h-4 w-4" /> Back to Projects
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {projectsWithCounts.length === 0 ? (
          <Card className="col-span-full py-24 border-dashed bg-zinc-50/50 dark:bg-zinc-900/20">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
                <Archive className="h-10 w-10 text-zinc-600 dark:text-zinc-400" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                No archived projects
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm leading-relaxed">
                Archived projects will appear here. Archive projects you want to keep but don&apos;t need in your main workspace.
              </p>
              <Button asChild size="lg">
                <Link href="/dashboard">View Active Projects</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          projectsWithCounts.map((project: Project & { fileCount: number }) => {
            const coverColor = getBookCoverColor(project.title);
            return (
              <Link
                key={project.id}
                href={`/dashboard/project/${project.id}`}
                className="group block h-full"
              >
                <div className="relative h-full transition-all duration-200 hover:shadow-sm hover:border-zinc-300 dark:hover:border-zinc-700 rounded-lg overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col opacity-75">
                  {/* Book Cover Aspect */}
                  <div
                    className={`aspect-2/3 w-full ${coverColor} p-4 flex flex-col justify-center items-center text-center relative overflow-hidden`}
                  >
                    {/* Pin Button */}
                    <PinButton projectId={project.id} isPinned={project.pinned ?? false} />

                    {/* Spine/Shadow Effects */}
                    <div className="absolute left-0 top-0 bottom-0 w-2 bg-white/10 z-10" />
                    <div className="absolute left-2 top-0 bottom-0 w-1 bg-black/5 z-10" />

                    {/* Title on Cover */}
                    <h3 className="font-serif font-bold text-xl text-white/95 drop-shadow-md line-clamp-3 tracking-wide leading-tight">
                      {project.title}
                    </h3>

                    {/* Texture/Gradient Overlay */}
                    <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-white/10 pointer-events-none" />
                  </div>

                  {/* Footer Info */}
                  <div className="p-4 border-t border-zinc-100 dark:border-zinc-800 flex-1 flex flex-col bg-white dark:bg-zinc-900">
                    <div className="mb-3">
                      <h4 className="font-medium text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mt-1 font-medium">
                        {project.content}
                      </p>
                    </div>

                    <div className="mt-auto flex items-center justify-between text-xs text-zinc-400 dark:text-zinc-500">
                      <span>
                        {new Date(project.created_at).toLocaleDateString(
                          undefined,
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>
                      {project.fileCount > 0 && (
                        <span className="flex items-center gap-1 text-zinc-600 dark:text-zinc-300 font-medium">
                          <FileText className="h-3 w-3" />
                          {project.fileCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}

