import { getExperiences } from '@/lib/data/portfolio';
import { notFound } from 'next/navigation';
import { ExperienceForm } from '../ExperienceForm';

interface EditExperiencePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;
  const experiences = await getExperiences(true);
  const experience = experiences.find((e) => e.id === id);

  if (!experience) {
    notFound();
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Edit Experience: {experience.company}
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Update employment details, achievements, and timeline.
        </p>
      </div>

      <ExperienceForm initialData={experience} />
    </div>
  );
}
