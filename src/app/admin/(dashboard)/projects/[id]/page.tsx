import { getProjects } from '@/lib/data/portfolio';
import { notFound } from 'next/navigation';
import { ProjectEditorForm } from '../ProjectEditorForm';

interface EditProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const projects = await getProjects({ includeAll: true });
  const project = projects.find((p) => p.id === id || p.slug === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Edit Project: {project.title}
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Update case study sections, technologies, media, and publishing status.
        </p>
      </div>

      <ProjectEditorForm initialProject={project} />
    </div>
  );
}
