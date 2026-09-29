import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Experience } from '@/types/cms';

interface HomeExperienceRowsProps {
  experiences: Experience[];
}

export function HomeExperienceRows({ experiences }: HomeExperienceRowsProps) {
  return (
    <div className="p-[var(--content-padding)] rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-4">
        <h2 className="text-sm font-medium text-[var(--text-primary)]">
          Career Timeline
        </h2>
        <span className="text-xs font-mono text-[var(--text-secondary)]">
          Engineering History
        </span>
      </div>

      <div className="space-y-2">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-3.5 -mx-2 rounded-lg hover:bg-[var(--surface-hover)] transition-colors flex items-center justify-between group cursor-default"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {exp.role}
                </span>
                {exp.is_current && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Present
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                {exp.company} · {exp.employment_type}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-[var(--text-secondary)] whitespace-nowrap">
                {exp.start_date.slice(0, 4)} – {exp.is_current ? 'Present' : exp.end_date?.slice(0, 4)}
              </span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
