'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { Project } from '@/types/cms';

interface WorkClientProps {
  projects: Project[];
}

export function WorkClient({ projects }: WorkClientProps) {
  const { t } = useLanguage();
  const [activeProject, setActiveProject] = useState<Project>(projects[0] || null);

  // Helper to extract clean year string
  const getProjectYear = (p: Project) => {
    if (p.period_label) {
      const match = p.period_label.match(/\d{4}/g);
      if (match && match.length > 0) {
        return match[match.length - 1];
      }
    }
    if (p.end_date) return p.end_date.slice(0, 4);
    if (p.start_date) return p.start_date.slice(0, 4);
    return '2026';
  };

  return (
    <div className="work-page">
      {/* LEFT COLUMN: Sticky Project Preview (Desktop >= 1024px) */}
      <aside className="work-preview" aria-label="Project Preview">
        <div className="work-preview__slides">
          {projects.map((project) => {
            const isActive = activeProject?.id === project.id;
            return (
              <Link
                key={project.id || project.slug}
                href={`/work/${project.slug}`}
                className="work-preview__slide block"
                data-active={isActive}
                tabIndex={isActive ? 0 : -1}
                aria-hidden={!isActive}
              >
                {project.cover_image_url ? (
                  <Image
                    src={project.cover_image_url}
                    alt={project.cover_alt_text || project.title}
                    fill
                    priority={project.id === projects[0]?.id}
                    className="work-preview__image"
                    sizes="50vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-mono text-sm text-[var(--text-secondary)]">
                    {project.title}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom Right Cutout Label displaying the active project title */}
        {activeProject && (
          <span className="card-badge-bottom-right pointer-events-none">
            {activeProject.title}
          </span>
        )}
      </aside>

      {/* RIGHT COLUMN: Intro, Project Rows & Mobile Cards */}
      <div className="work-content">
        {/* Intro Card */}
        <section className="work-intro">
          <h1>{t('work.title')}</h1>
          <p>{t('work.subtitle')}</p>
        </section>

        {/* Desktop List of Rows (>= 1024px) */}
        <div className="work-rows" role="list" aria-label="Project List">
          {projects.map((project) => {
            const isActive = activeProject?.id === project.id;
            return (
              <Link
                key={project.id || project.slug}
                href={`/work/${project.slug}`}
                className="work-row group"
                data-active={isActive}
                onMouseEnter={() => setActiveProject(project)}
                onFocus={() => setActiveProject(project)}
              >
                <h2>{project.title}</h2>
                <span className="work-row__meta">
                  <span>{project.project_type || project.platform}</span>
                  <span>{getProjectYear(project)}</span>
                </span>
                <svg
                  className="work-row__arrow"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            );
          })}
        </div>

        {/* Mobile / Tablet Cards Grid (< 1024px) */}
        <div className="work-cards" aria-label="Project Grid">
          {projects.map((project) => (
            <Link
              key={project.id || project.slug}
              href={`/work/${project.slug}`}
              className="work-card group"
            >
              {project.cover_image_url ? (
                <Image
                  src={project.cover_image_url}
                  alt={project.cover_alt_text || project.title}
                  fill
                  className="work-card__image"
                  sizes="(min-width: 640px) 50vw, 100vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-mono text-xs text-[var(--text-secondary)]">
                  {project.title}
                </div>
              )}
              <h2 className="work-card__title">{project.title}</h2>
            </Link>
          ))}
        </div>

        {/* Contact Action Card at Bottom */}
        <Link href="/contact" className="work-contact">
          <span>{t('work.contact')}</span>
          <span className="work-contact__icons">
            <ArrowRight className="w-[18px] h-[18px]" />
            <ArrowRight className="w-[18px] h-[18px]" />
          </span>
        </Link>
      </div>
    </div>
  );
}
