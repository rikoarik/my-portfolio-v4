import React from 'react';
import Image from 'next/image';
import { getFeaturedRepositories } from '@/lib/data/portfolio';
import { ExplorationGallery } from '@/components/exploration/ExplorationGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exploration · Arik Riko Prasetya — Lab & Open Source',
  description:
    'A collection of open-source architectures, experiments, and technical prototypes exploring mobile, backend, and full-stack systems.',
  alternates: {
    canonical: 'https://arklabs.my.id/exploration',
  },
};

const REPO_IMAGES: Record<string, string> = {
  'Frontend-Lembar': '/images/projects/lembar/cover.webp',
  'Backend-Lembar': '/images/projects/lembar/cover.webp',
  'crm-frontend': '/images/projects/crm-platform/cover.webp',
  'crm-backend': '/images/projects/crm-platform/cover.webp',
  'Puas-app': '/images/projects/puas-hub/cover.webp',
  'ExploreBojonegoro': '/images/projects/explore-bojonegoro/cover.webp',
  'nara-app': '/images/projects/merchant-payment-platform/cover.webp',
  'nara-api': '/images/projects/member-app-ecosystem/cover.webp',
};

export default async function ExplorationPage() {
  const repositories = await getFeaturedRepositories(false);

  const explorationItems = repositories.map((r) => {
    const title = r.title_override || r.repo_full_name.split('/')[1] || r.repo_full_name;
    return {
      id: r.id,
      title,
      category: 'Open Source',
      description: r.description_override || 'Open-source experiment and architecture.',
      image_url: REPO_IMAGES[title] || '/images/projects/member-app-ecosystem/cover.webp',
      link: r.url || `https://github.com/${r.repo_full_name}`,
      isExternal: true,
      tag: r.language || 'Code',
    };
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--layout-gap)] items-start">
      {/* LEFT COLUMN: Sticky Exploration Hero Banner */}
      <div className="relative w-full h-[400px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface-solid)]">
        <Image
          src="/images/projects/member-app-ecosystem/cover.webp"
          alt="Engineering Exploration Showcase"
          fill
          priority
          className="object-cover object-center"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

        <div className="absolute bottom-8 left-8 z-10 max-w-sm space-y-2">
          <span className="text-xs font-mono uppercase tracking-widest text-white/70">
            Open Source & Lab
          </span>
          <p className="text-sm text-white/80 leading-relaxed font-light">
            Architectural prototypes, open-source repositories, and experimental codebases spanning mobile systems, APIs, and developer utilities.
          </p>
        </div>

        {/* Bottom-Right Inverted Cutout Badge */}
        <div className="card-badge-bottom-right">
          <span className="font-medium text-xs tracking-tight">
            Engineering Lab
          </span>
        </div>
      </div>

      {/* RIGHT COLUMN: Intro Card & Exploration Gallery */}
      <div className="space-y-[var(--layout-gap)] min-w-0">
        {/* Intro Card */}
        <div className="glass-card p-[var(--content-padding)] rounded-[var(--card-radius)] space-y-4">
          <h1 className="text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
            Exploration
          </h1>
          <p className="text-[15px] sm:text-base text-[var(--text-secondary)] leading-relaxed font-light">
            A curated collection of open-source architectures, experiments, and technical prototypes where I test emerging frameworks, engineer client/server utilities, and share practical codebases with the community.
          </p>
        </div>

        {/* Exploration Gallery Grid with Motion */}
        <ExplorationGallery items={explorationItems} />
      </div>
    </div>
  );
}
