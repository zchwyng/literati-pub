import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProject, getAudioGenerations } from '../../../actions';
import { getPrintJobs } from '../../../actions/print';
import PrintManager from '../../../components/PrintManager';
import ProjectActions from '../../../components/ProjectActions';
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

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const [audioGenerations, printJobs] = await Promise.all([
    getAudioGenerations(id),
    getPrintJobs(id),
  ]);

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column: Production */}
          <div className="lg:col-span-2 space-y-8">
            {/* Print & eBook Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-md text-primary">
                    <Printer className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle>Print & eBook Files</CardTitle>
                    <CardDescription>
                      Generate production-ready PDFs from your manuscript.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <PrintManager projectId={id} jobs={printJobs} />
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
                <ProjectActions projectId={id} />
              </CardHeader>
              <CardContent>
                {audioGenerations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center border-2 border-dashed rounded-lg bg-muted/50">
                    <Mic className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">
                      No audio generated yet.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {audioGenerations.map(audio => (
                      <div
                        key={audio.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                            ▶
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Version {audio.id.slice(0, 4)}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Created{' '}
                              {new Date(audio.created_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <audio
                          controls
                          src={audio.audio_url}
                          className="h-8 w-full sm:w-48"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar: Source */}
          <div className="space-y-6">
            <Card className="sticky top-24 h-[calc(100vh-8rem)] flex flex-col">
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
              <Separator />
              <ScrollArea className="flex-1">
                <div className="p-6">
                  <div className="text-sm text-muted-foreground mb-4">
                    This project currently uses the text content stored in the
                    database.
                  </div>
                  <div className="bg-muted/50 p-4 rounded-md border font-mono text-xs text-muted-foreground whitespace-pre-wrap">
                    {project.content?.slice(0, 500)}
                    {project.content?.length > 500 && '...'}
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="p-3 bg-background border rounded-md text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {project.content
                          ?.split(/\s+/)
                          .length.toLocaleString() || 0}
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
                </div>
              </ScrollArea>
              <Separator />
              <div className="p-4 bg-muted/30 text-xs text-center text-muted-foreground">
                To update content, create a new project or upload a new version
                via Print Manager.
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
