import { SkillGroup } from '@/types/cms';

interface CapabilitiesSectionProps {
  groups: SkillGroup[];
}

export function CapabilitiesSection({ groups }: CapabilitiesSectionProps) {
  return (
    <section id="capabilities" className="py-20 md:py-28 max-w-6xl mx-auto px-6 border-t border-[#E8E6E1]">
      {/* Header */}
      <div className="max-w-2xl space-y-4 mb-14 md:mb-16">
        <div className="inline-flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#787672]">
            Engineering Breadth
          </span>
        </div>
        <h2 className="editorial-title text-3xl sm:text-5xl text-[#121214]">
          Capabilities
        </h2>
        <p className="text-base sm:text-lg text-[#575653] leading-relaxed">
          Production-proven technical capabilities across mobile platforms, backend architectures, databases, hardware integrations, and modern delivery workflows.
        </p>
      </div>

      {/* Grid of Groups */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {groups.map((group) => {
          const isAdditional = group.name.toLowerCase().includes('additional');

          return (
            <div
              key={group.id || group.name}
              className={`p-6 sm:p-7 rounded-2xl border transition-all ${
                isAdditional
                  ? 'bg-[#F9F8F5] border-[#E8E6E1]/60'
                  : 'bg-[#FFFFFF] border-[#E8E6E1]'
              }`}
            >
              <div className="space-y-1 mb-5">
                <h3 className="text-lg font-bold text-[#121214]">{group.name}</h3>
                {group.description && (
                  <p className="text-xs text-[#787672]">{group.description}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills?.map((skill) => {
                  const isPrimary = skill.level === 'primary';
                  const isBasic = skill.level === 'basic' || skill.name.includes('(Basic)');

                  return (
                    <span
                      key={skill.id || skill.name}
                      className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                        isPrimary
                          ? 'bg-[#F3F2EE] text-[#121214] font-medium border border-[#E8E6E1]'
                          : isBasic
                          ? 'bg-transparent text-[#787672] border border-dashed border-[#D5D2CA]'
                          : 'bg-[#FAF9F6] text-[#575653] border border-[#E8E6E1]'
                      }`}
                    >
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
