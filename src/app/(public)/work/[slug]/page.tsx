import { getProjectBySlug, getProjects } from '@/lib/data/portfolio';
import { MarkdownContent } from '@/components/ui/MarkdownContent';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, GitBranch, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects({ includeAll: false });
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found | Arik Riko Prasetya',
    };
  }

  const title = `${project.title} · ${project.subtitle || 'Case Study'} | Arik Riko Prasetya`;
  const description = project.summary;
  const canonicalUrl = `https://arikriko.com/work/${project.slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: project.cover_image_url
        ? [
            {
              url: project.cover_image_url,
              width: 1200,
              height: 750,
              alt: project.cover_alt_text || project.title,
            },
          ]
        : [],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Fetch all projects to find next project
  const allProjects = await getProjects({ includeAll: false });
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    currentIndex >= 0 && currentIndex < allProjects.length - 1
      ? allProjects[currentIndex + 1]
      : allProjects[0];

  const sections = project.sections || [];
  const getSection = (type: string) => sections.find((s) => s.section_type === type);

  const contextSec = getSection('context');
  const roleSec = getSection('role');
  const builtSec = getSection('built');
  const decisionsSec = getSection('decisions');
  const integrationsSec = getSection('integrations');
  const challengesSec = getSection('challenges');
  const resultSec = getSection('result');
  const stackSec = getSection('stack');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--layout-gap)] items-start">
      {/* LEFT COLUMN: Sticky Hero Showcase */}
      <div className="relative w-full h-[400px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface-solid)]">
        {project.cover_image_url ? (
          <Image
            src={project.cover_image_url}
            alt={project.cover_alt_text || project.title}
            fill
            priority
            className="object-cover object-top"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-8 text-center font-mono text-sm text-[var(--text-secondary)]">
            {project.title}
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 pointer-events-none" />

        {/* Back Link at top left */}
        <Link
          href="/work"
          className="absolute top-6 left-6 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md text-white text-xs font-mono hover:bg-black/70 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Work</span>
        </Link>

        {/* Bottom Left Quick Links */}
        <div className="absolute bottom-8 left-6 sm:left-8 z-10 flex flex-wrap gap-2">
          {project.demo_url && (
            <a
              href={project.demo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-mono hover:bg-black/80 transition-colors"
            >
              <span>Live Application</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
          {project.repo_url && (
            <a
              href={project.repo_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-xs font-mono hover:bg-black/80 transition-colors"
            >
              <GitBranch className="w-3 h-3" />
              <span>Source Code</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Bottom Right Cutout Badge */}
        <div className="card-badge-bottom-right">
          <span className="font-medium text-xs tracking-tight">Case Study</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Editorial Narrative Stack */}
      <div className="space-y-[var(--layout-gap)] min-w-0">
        {/* Intro Card */}
        <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)]">
              {project.role}
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
              {project.title}
            </h1>
            {project.subtitle && (
              <p className="text-base text-[var(--text-secondary)] font-medium">
                {project.subtitle}
              </p>
            )}
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--text-secondary)] font-light">
            {project.summary}
          </p>
        </article>

        {/* Project Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-[var(--layout-gap)]">
          <div className="p-4 sm:p-5 rounded-[var(--card-radius)] glass-card flex flex-col justify-center space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">
              Role
            </span>
            <span className="text-xs font-medium text-[var(--text-primary)] line-clamp-1">
              {project.role}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-[var(--card-radius)] glass-card flex flex-col justify-center space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">
              Timeline
            </span>
            <span className="text-xs font-medium text-[var(--text-primary)]">
              {project.period_label || (project.start_date ? `${project.start_date.slice(0, 7)} to ${project.end_date?.slice(0, 7) || 'Complete'}` : 'Complete')}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-[var(--card-radius)] glass-card flex flex-col justify-center space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">
              Type
            </span>
            <span className="text-xs font-medium text-[var(--text-primary)] line-clamp-1">
              {project.project_type || 'Production'}
            </span>
          </div>

          <div className="p-4 sm:p-5 rounded-[var(--card-radius)] glass-card flex flex-col justify-center space-y-1">
            <span className="text-[11px] font-mono text-[var(--text-secondary)] uppercase">
              Stack
            </span>
            <span className="text-xs font-medium text-[var(--text-primary)] line-clamp-1">
              {project.technologies?.[0]?.technology || 'Full-stack'}
            </span>
          </div>
        </div>

        {/* Case Study Sections */}
        {contextSec && (
          <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              {contextSec.title || 'Problem & Context'}
            </h2>
            <div className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <MarkdownContent content={contextSec.body_md} />
            </div>
          </article>
        )}

        {roleSec && (
          <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              {roleSec.title || 'Role & Responsibilities'}
            </h2>
            <div className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <MarkdownContent content={roleSec.body_md} />
            </div>
          </article>
        )}

        {decisionsSec && (
          <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              {decisionsSec.title || 'System & Technical Decisions'}
            </h2>
            <div className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <MarkdownContent content={decisionsSec.body_md} />
            </div>
          </article>
        )}

        {builtSec && (
          <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              {builtSec.title || 'Core Implementation'}
            </h2>
            <div className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <MarkdownContent content={builtSec.body_md} />
            </div>
          </article>
        )}

        {integrationsSec && (
          <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              {integrationsSec.title || 'Integrations & Protocols'}
            </h2>
            <div className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <MarkdownContent content={integrationsSec.body_md} />
            </div>
          </article>
        )}

        {challengesSec && (
          <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              {challengesSec.title || 'Challenges & Practical Solutions'}
            </h2>
            <div className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <MarkdownContent content={challengesSec.body_md} />
            </div>
          </article>
        )}

        {resultSec && (
          <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              {resultSec.title || 'Results & Practical Delivery'}
            </h2>
            <div className="text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)]">
              <MarkdownContent content={resultSec.body_md} />
            </div>
          </article>
        )}

        {/* Technology Stack Card */}
        {project.technologies && project.technologies.length > 0 && (
          <article className="p-[var(--content-padding)] rounded-[var(--card-radius)] glass-card space-y-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t.id || t.technology}
                  className="px-3 py-1.5 rounded-md text-xs font-mono bg-[var(--page-background)] border border-white/15 text-[var(--text-primary)]"
                >
                  {t.technology}
                </span>
              ))}
            </div>
            {stackSec && (
              <div className="text-sm text-[var(--text-secondary)] pt-2 border-t border-white/15">
                <MarkdownContent content={stackSec.body_md} />
              </div>
            )}
          </article>
        )}

        {/* Next Case Study Preview */}
        {nextProject && nextProject.slug !== slug && (
          <Link
            href={`/work/${nextProject.slug}`}
            className="interactive-card p-6 sm:p-8 rounded-[var(--card-radius)] glass-card hover:bg-[var(--surface-hover)] transition-all flex items-center justify-between group block"
          >
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase text-[var(--text-secondary)]">
                Next Case Study
              </span>
              <p className="text-lg sm:text-xl font-normal text-[var(--text-primary)] group-hover:text-[var(--accent-blue)] transition-colors">
                {nextProject.title}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {nextProject.role}
              </p>
            </div>
            <ArrowUpRight className="w-5 h-5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        )}
      </div>
    </div>
  );
}
