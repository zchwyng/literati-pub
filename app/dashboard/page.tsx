import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getProjects } from '../actions';
import { Plus } from 'lucide-react';

export default async function Dashboard() {
  const projects = await getProjects();

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <Card className="col-span-full py-16 border-dashed bg-zinc-50/50 dark:bg-zinc-900/20">
            <CardContent className="flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mb-4 text-2xl">
                📚
              </div>
              <h3 className="text-lg font-semibold mb-2">No manuscripts yet</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-sm">
                Start your publishing journey by creating your first project or
                uploading an existing Word document.
              </p>
              <Button asChild variant="outline">
                <Link href="/dashboard/new">Create Project</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          projects.map((project: any) => (
            <Link
              key={project.id}
              href={`/dashboard/project/${project.id}`}
              className="group"
            >
              <Card className="h-full transition-all duration-200 hover:shadow-md hover:border-zinc-300 dark:hover:border-zinc-700">
                <div className="h-40 bg-zinc-100 dark:bg-zinc-800/50 border-b p-6 flex flex-col justify-center items-center text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="text-4xl mb-3 transform group-hover:scale-110 transition-transform duration-200">
                    📖
                  </span>
                </div>
                <CardHeader>
                  <CardTitle className="truncate group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2 h-10">
                    {project.content}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="text-xs text-zinc-400 border-t pt-4 mt-auto">
                  <span>
                    Last edited{' '}
                    {new Date(project.created_at).toLocaleDateString()}
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
