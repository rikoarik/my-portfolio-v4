import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Project } from '@/types/cms';

interface SelectedWorkProps {
  title?: string;
  lead?: string;
  projects: Project[];
}

export function SelectedWork({
  title = 'Selected Work',
  lead = 'A selection of production and personal projects across mobile, backend, web, payments, integrations, and AI-assisted products.',
  projects,
}: SelectedWorkProps) {
  if (!projects || projects.length === 0) {
    return (
      <section id="work" className="py-20 max-w-6xl mx-auto px-6 border-t border-[#E8E6E1]">
        <div className="space-y-4">
          <h2 className="editorial-title text-3xl sm:text-4xl text-[#121214]">{title}</h2>
          <p className="text-base text-[#575653]">{lead}</p>
          <div className="p-12 text-center border border-dashed border-[#D5D2CA] rounded-xl text-[#787672]">
            No published projects available at this time.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="work" className="py-20 md:py-28 max-w-6xl mx-auto px-6 border-t border-[#E8E6E1]">
      {/* Section Header */}
      <div className="max-w-2xl space-y-4 mb-14 md:mb-20">
        <div className="inline-flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#787672]">
            Portfolio Index
          </span>
        </div>
        <h2 className="editorial-title text-3xl sm:text-5xl text-[#121214]">
          {title}
        </h2>
        <p className="text-base sm:text-lg text-[#575653] leading-relaxed">
          {lead}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
        {projects.map((project, index) => (
          <article
            key={project.id || project.slug}
            className="group flex flex-col justify-between bg-[#FFFFFF] border border-[#E8E6E1] hover:border-[#D5D2CA] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-sm"
          >
            {/* Project Image */}
            <Link
              href={`/work/${project.slug}`}
              className="relative aspect-[16/10] w-full bg-[#F3F2EE] overflow-hidden block focus-visible:ring-2 focus-visible:ring-[#121214]"
              tabIndex={-1}
              aria-hidden="true"
            >
              {project.cover_image_url ? (
                <Image
                  src={project.cover_image_url}
                  alt={project.cover_alt_text || `${project.title} project preview`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-sm font-mono text-[#787672]">
                  {project.title}
                </div>
              )}
            </Link>

            {/* Content Meta */}
            <div className="p-7 md:p-8 flex flex-col flex-1 justify-between gap-6">
              <div className="space-y-3">
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[#787672]">
                  <span>{project.role}</span>
                  <span>{project.period_label}</span>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#121214] group-hover:text-[#2563EB] transition-colors">
                  <Link
                    href={`/work/${project.slug}`}
                    className="focus-visible:ring-2 focus-visible:ring-[#121214] rounded-sm"
                  >
                    {project.title}
                  </Link>
                </h3>

                {/* Summary */}
                <p className="text-sm sm:text-base text-[#575653] leading-relaxed line-clamp-3">
                  {project.summary}
                </p>
              </div>

              {/* Stack tags & CTA */}
              <div className="pt-4 border-t border-[#F3F2EE] flex flex-col gap-4">
                <div className="flex flex-wrap gap-1.5" aria-label="Technologies used">
                  {project.technologies?.slice(0, 5).map((tech) => (
                    <span
                      key={typeof tech === 'string' ? tech : tech.technology}
                      className="px-2.5 py-1 text-xs font-mono bg-[#F3F2EE] text-[#575653] rounded-md"
                    >
                      {typeof tech === 'string' ? tech : tech.technology}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-1">
                  <Link
                    href={`/work/${project.slug}`}
                    className="tap-target inline-flex items-center gap-1.5 text-sm font-semibold text-[#121214] group-hover:text-[#2563EB] transition-colors focus-visible:ring-2 focus-visible:ring-[#121214] rounded-sm"
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span className="font-mono text-xs text-[#A1A1AA]">
                    0{index + 1}
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
