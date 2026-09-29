import { ProjectEditorForm } from '../ProjectEditorForm';

export default function NewProjectPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Create New Project
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Draft a new case study, upload metadata, and author structured sections.
        </p>
      </div>

      <ProjectEditorForm />
    </div>
  );
}
