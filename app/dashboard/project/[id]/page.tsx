import { notFound } from 'next/navigation';
import {
  getProject,
  getAudioGenerations,
  getCoverGenerations,
} from '../../../actions';
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

  const [audioGenerations, printJobs, coverGenerations] = await Promise.all([
    getAudioGenerations(id),
    getPrintJobs(id),
    getCoverGenerations(id),
  ]);

  return (
    <ProjectWorkspace
      project={project}
      printJobs={printJobs}
      audioGenerations={audioGenerations}
      coverGenerations={coverGenerations}
    />
  );
}
