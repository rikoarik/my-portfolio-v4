import React from 'react';
import Image from 'next/image';
import { getFeaturedRepositories, getProjects } from '@/lib/data/portfolio';
import { ExplorationGallery } from '@/components/exploration/ExplorationGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exploration · Arik Riko Prasetya',
  description:
    'A collection of open-source architectures, experiments, and technical prototypes exploring mobile, backend, and full-stack systems.',
  alternates: {
    canonical: 'https://arikriko.com/exploration',
  },
};

export default async function ExplorationPage() {
  const [repositories, projects] = await Promise.all([
    getFeaturedRepositories(false),
    getProjects({ includeAll: false }),
  ]);

  // Combine projects and repositories as exploration items
  const explorationItems = [
    ...projects.map((p) => ({
      id: p.id,
      title: p.title,
      category: p.role,
      description: p.summary,
      image_url: p.cover_image_url,
      link: `/work/${p.slug}`,
      isExternal: false,
      tag: p.technologies?.[0]?.technology || 'Full-stack',
    })),
    ...repositories.map((r) => ({
      id: r.id,
      title: r.title_override || r.repo_full_name.split('/')[1] || r.repo_full_name,
      category: 'Open Source',
      description: r.description_override || 'Open-source experiment and architecture.',
      image_url: '/images/projects/puas-hub/cover.svg',
      link: r.url || `https://github.com/${r.repo_full_name}`,
      isExternal: true,
      tag: r.language || 'Code',
    })),
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--layout-gap)] items-start">
      {/* LEFT COLUMN: Sticky Exploration Hero Banner */}
      <div className="relative w-full h-[400px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface)] border border-[var(--surface-border)]">
        <Image
          src="/images/projects/puas-hub/cover.svg"
          alt="Engineering Exploration Showcase"
          fill
          priority
          className="object-cover object-center"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        <div className="absolute bottom-8 left-8 z-10 max-w-sm space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-white/70">
            Prototypes & Systems
          </span>
          <p className="text-sm text-white/80 leading-relaxed font-light">
            Continuous technical experiments across Android, Go microservices, Flutter internals, and automated digital product workflows.
          </p>
        </div>

        {/* Bottom-Right Inverted Cutout Badge */}
        <div className="card-badge-bottom-right">
          <span className="font-medium text-xs tracking-tight">
            Engineering Exploration
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: Intro Card & Exploration Gallery */}
      <div className="space-y-[var(--layout-gap)] min-w-0">
        {/* Intro Card */}
        <div className="p-[var(--content-padding)] rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] space-y-6">
          <h1 className="text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
            Exploration
          </h1>
          <p className="text-[15px] sm:text-base text-[var(--text-secondary)] leading-relaxed font-light">
            A collection of open-source architectures, experiments, and technical prototypes where I test new stacks, build mobile/backend utilities, and explore different ways to solve engineering challenges.
          </p>
        </div>

        {/* Exploration Gallery Grid with Motion */}
        <ExplorationGallery items={explorationItems} />
      </div>
    </div>
  );
}
