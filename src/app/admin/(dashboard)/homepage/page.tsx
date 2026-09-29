import { getSections } from '@/lib/data/portfolio';
import { HomepageEditorForm } from './HomepageEditorForm';

export default async function AdminHomepagePage() {
  const sections = await getSections();

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Homepage Content Editor
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Edit section headers, narrative copy, and call-to-actions across the main landing page.
        </p>
      </div>

      <HomepageEditorForm initialSections={sections} />
    </div>
  );
}
