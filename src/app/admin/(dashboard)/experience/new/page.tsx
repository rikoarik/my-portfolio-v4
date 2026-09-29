import { ExperienceForm } from '../ExperienceForm';

export default function NewExperiencePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Add New Experience
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Record a new verified employment or client engagement.
        </p>
      </div>

      <ExperienceForm />
    </div>
  );
}
