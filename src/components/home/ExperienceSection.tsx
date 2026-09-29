import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Experience } from '@/types/cms';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 md:py-28 max-w-6xl mx-auto px-6 border-t border-[#E8E6E1]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Left Column */}
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#787672]">
              Track Record
            </span>
          </div>
          <h2 className="editorial-title text-3xl sm:text-4xl text-[#121214]">
            Experience
          </h2>
          <p className="text-base text-[#575653] leading-relaxed">
            Professional roles focused on mobile development, API integrations, and full-stack product systems.
          </p>
          <div className="pt-2">
            <Link
              href="/about#experience"
              className="tap-target inline-flex items-center gap-2 text-sm font-semibold text-[#121214] hover:text-[#2563EB] transition-colors focus-visible:ring-2 focus-visible:ring-[#121214] rounded-sm"
            >
              <span>View Full Experience History</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Column / Concise Timeline */}
        <div className="md:col-span-7 space-y-6">
          <div className="divide-y divide-[#E8E6E1] border-y border-[#E8E6E1]">
            {experiences.map((exp) => (
              <div key={exp.id || exp.company} className="py-6 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-lg font-bold text-[#121214]">
                    {exp.company}
                  </h3>
                  <div className="flex items-center gap-2 font-mono text-xs text-[#787672]">
                    <span>
                      {exp.start_date.slice(0, 7)} to {exp.is_current ? 'Present' : exp.end_date?.slice(0, 7)}
                    </span>
                    {exp.is_current && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#DCFCE7] text-[#15803D]">
                        Current
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm text-[#575653]">
                  <span className="font-medium text-[#121214]">{exp.role}</span>
                  {exp.employment_type && (
                    <>
                      <span>·</span>
                      <span className="text-[#787672]">{exp.employment_type}</span>
                    </>
                  )}
                </div>

                {exp.summary && (
                  <p className="text-sm text-[#575653] leading-relaxed pt-1">
                    {exp.summary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
