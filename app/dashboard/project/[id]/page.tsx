import { notFound } from 'next/navigation';
import { getProject, getAudioGenerations } from '../../../actions';
import { getPrintJobs } from '../../../actions/print';
import ProjectWorkspace from '../../../components/ProjectWorkspace';

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
    <ProjectWorkspace
      project={project}
      printJobs={printJobs}
      audioGenerations={audioGenerations}
    />
  );
}
