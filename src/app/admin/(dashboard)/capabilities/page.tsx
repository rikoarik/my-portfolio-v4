import { getSkillGroups } from '@/lib/data/portfolio';
import { CapabilitiesManager } from './CapabilitiesManager';

export default async function AdminCapabilitiesPage() {
  const groups = await getSkillGroups(true);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Capabilities Manager
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Manage skill categories and technical proficiencies (Primary, Secondary, Basic).
        </p>
      </div>

      <CapabilitiesManager initialGroups={groups} />
    </div>
  );
}
