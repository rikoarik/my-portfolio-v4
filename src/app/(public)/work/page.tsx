import { getProjects } from '@/lib/data/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work · Arik Riko Prasetya',
  description:
    'Detailed case studies across mobile engineering, backend architectures, payment systems, and full-stack web platforms.',
  alternates: {
    canonical: 'https://arikriko.com/work',
  },
};

export default async function WorkPage() {
  const projects = await getProjects({ includeAll: false });
  const featured = projects[0];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--layout-gap)] items-start">
      {/* LEFT COLUMN: Sticky Featured Highlight */}
      <div className="relative w-full h-[450px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface-solid)]">
        {featured?.cover_image_url ? (
          <Image
            src={featured.cover_image_url}
            alt={featured.cover_alt_text || featured.title}
            fill
            priority
            className="object-cover object-top"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 text-center font-mono text-sm text-[var(--text-secondary)]">
            Selected Work
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        <div className="absolute bottom-8 left-8 z-10 max-w-sm space-y-2 text-white">
          <span className="text-xs font-mono uppercase tracking-widest text-white/70">
            Featured Production
          </span>
          <p className="text-xl font-normal tracking-tight">
            {featured?.title}
          </p>
          <p className="text-xs text-white/80 line-clamp-2 font-light">
            {featured?.summary}
          </p>
        </div>

        {/* Bottom Right Cutout Badge */}
        <div className="card-badge-bottom-right">
          <span className="font-medium text-xs tracking-tight">Case Studies</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Intro Card & Project Gallery */}
      <div className="space-y-[var(--layout-gap)] min-w-0">
        {/* Intro Card */}
        <div className="glass-card p-[var(--content-padding)] rounded-[var(--card-radius)] space-y-4">
          <h1 className="text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
            Selected Work
          </h1>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed font-light">
            Detailed case studies across production mobile applications, backend systems, payment gateways, and full-stack web products.
          </p>
        </div>

        {/* 2-Column Grid of 3:4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--layout-gap)]">
          {projects.map((project) => (
            <Link
              key={project.id || project.slug}
              href={`/work/${project.slug}`}
              className="interactive-card relative aspect-[3/4] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface-solid)] block group focus-visible:outline-none"
            >
              {/* Top-Left Inverted Cutout Badge with Expanding Arrow */}
              <div className="card-badge-top-left">
                <span className="font-normal text-sm text-[var(--text-primary)]">
                  {project.title}
                </span>
                <span className="card-arrow inline-flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                </span>
              </div>

              {/* Background Project Image */}
              {project.cover_image_url ? (
                <Image
                  src={project.cover_image_url}
                  alt={project.cover_alt_text || project.title}
                  fill
                  className="card-image object-cover object-top"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs font-mono text-[var(--text-secondary)] p-4 text-center">
                  {project.title}
                </div>
              )}

              {/* Bottom Card Overlay with Role & Period */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5 text-white z-2">
                <span className="text-[11px] font-mono text-white/70 uppercase">
                  {project.role}
                </span>
                <p className="text-xs text-white/90 font-medium">
                  {project.period_label || (project.start_date ? `${project.start_date.slice(0, 4)} – ${project.end_date?.slice(0, 4) || 'Complete'}` : 'Complete')}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
