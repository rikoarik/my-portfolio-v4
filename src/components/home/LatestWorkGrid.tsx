'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '@/types/cms';

import { useLanguage } from '@/context/LanguageContext';

interface LatestWorkGridProps {
  projects: Project[];
}

export function LatestWorkGrid({ projects }: LatestWorkGridProps) {
  const { t } = useLanguage();
  const displayProjects = projects.slice(0, 4);

  return (
    <div className="space-y-[var(--layout-gap)]">
      {/* Header Card */}
      <div className="p-[var(--content-padding)] rounded-[var(--card-radius)] bg-[var(--surface)] flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
          <span className="font-medium">{t('home.latest_work')}</span>
          <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-teal)]" />
        </div>
        <Link
          href="/work"
          className="text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors relative after:content-[''] after:block after:w-full after:h-px after:bg-current after:transition-all hover:after:w-4"
        >
          {t('home.view_all')}
        </Link>
      </div>

      {/* Grid of Work Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--layout-gap)]">
        {displayProjects.map((project, index) => (
          <motion.div
            key={project.id || project.slug}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href={`/work/${project.slug}`}
              className="interactive-card relative aspect-[3/4] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface)] block group focus-visible:outline-none shadow-xs"
            >
              {/* Top-Left Inverted Cutout Badge */}
              <div className="card-badge-top-left">
                <span className="font-normal text-sm text-[var(--text-primary)]">
                  {project.title}
                </span>
                <span className="card-arrow inline-flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-teal)]" />
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

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e]/85 via-transparent to-transparent opacity-80 pointer-events-none" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
