import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProjects } from '../actions';
import { Plus } from 'lucide-react';
import { getBookCoverColor } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default async function Dashboard() {
  const projects = await getProjects();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2">
            Your Projects
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400">
            Manage your manuscripts and productions
          </p>
        </div>
        <Button
          asChild
          className="bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-zinc-900"
        >
          <Link href="/dashboard/new">
            <Plus className="mr-2 h-4 w-4" /> New Manuscript
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {projects.length === 0 ? (
          <Card className="col-span-full py-24 border-dashed bg-zinc-50/50 dark:bg-zinc-900/20">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-6 text-4xl shadow-sm">
                📚
              </div>
              <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">
                No manuscripts yet
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm leading-relaxed">
                Start your publishing journey by creating your first project or
                uploading an existing Word document.
              </p>
              <Button asChild size="lg">
                <Link href="/dashboard/new">Create Project</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          projects.map((project: Project) => {
            const coverColor = getBookCoverColor(project.title);
            return (
              <Link
                key={project.id}
                href={`/dashboard/project/${project.id}`}
                className="group block h-full"
              >
                <div className="relative h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col">
                  {/* Book Cover Aspect */}
                  <div
                    className={`aspect-2/3 w-full ${coverColor} p-6 flex flex-col justify-center items-center text-center relative overflow-hidden`}
                  >
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
