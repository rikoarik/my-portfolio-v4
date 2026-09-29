import {
  getProfile,
  getExperiences,
  getSkillGroups,
} from '@/lib/data/portfolio';
import Image from 'next/image';
import { FileDown, Mail } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About · Arik Riko Prasetya',
  description:
    'Software engineer background, professional timeline, full capabilities, and engineering philosophy.',
  alternates: {
    canonical: 'https://arikriko.com/about',
  },
};

export default async function AboutPage() {
  const [profile, experiences, skillGroups] = await Promise.all([
    getProfile(),
    getExperiences(false),
    getSkillGroups(false),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--layout-gap)] items-start">
      {/* LEFT COLUMN: Sticky Portrait Showcase */}
      <div className="relative w-full h-[450px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface-solid)]">
        <Image
          src={profile.avatar_url || '/images/profile/ark.jpg'}
          alt={`${profile.full_name} - ${profile.title}`}
          fill
          priority
          className="object-cover object-top"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        <div className="absolute bottom-8 left-8 z-10 max-w-sm space-y-2 text-white">
          <p className="text-xl font-normal tracking-tight">
            {profile.full_name}
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-white/70">
            {profile.title} · {profile.descriptor}
          </p>
        </div>

        {/* Bottom Right Inverted Badge */}
        <div className="card-badge-bottom-right">
          <span className="font-medium text-xs tracking-tight">Software Engineer</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Bio, Experience, Competencies */}
      <div className="space-y-[var(--layout-gap)] min-w-0">
        {/* Bio Card */}
        <article className="glass-card p-[var(--content-padding)] rounded-[var(--card-radius)] space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)]">
              Engineering Biography
            </span>
            <h1 className="text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
              About Ark
            </h1>
          </div>

          <div className="space-y-4 text-sm sm:text-[15px] leading-relaxed text-[var(--text-secondary)] font-light">
            <p className="text-[var(--text-primary)] font-normal">
              I am a software engineer whose professional work started primarily in mobile development and expanded into backend systems, databases, and full-stack product engineering.
            </p>
            <p>
              I have engineered production payment applications, operational agent platforms, backend APIs, web applications, and embedded hardware workflows including QRIS, NFC contactless cards, and Bluetooth thermal printers.
            </p>
            <p>
              My engineering approach centers on end-to-end ownership: understanding real-world operational requirements, designing resilient architectures, handling hardware and network edge cases, and delivering stable code to production.
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="pt-4 flex flex-wrap gap-3 border-t border-white/15">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--contrast-background)] text-[var(--contrast-text)] text-xs font-medium hover:bg-[var(--contrast-background-hover)] transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Directly</span>
            </a>
            <a
              href={profile.resume_url || '/resume/Arik_Riko_Prasetya_Software_Engineer.pdf'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--surface-hover)] border border-[var(--surface-border)] text-[var(--text-primary)] text-xs font-medium hover:bg-[var(--surface)] transition-colors"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </article>

        {/* Experience Timeline Card */}
        <article className="glass-card p-[var(--content-padding)] rounded-[var(--card-radius)] space-y-6">
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              Work Experience
            </h2>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              2024 – Present
            </span>
          </div>

          <div className="space-y-6">
            {experiences.map((exp) => (
              <div
                key={exp.id}
                className="space-y-2 border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-medium text-[var(--text-primary)]">
                      {exp.role}
                    </h3>
                    {exp.is_current && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[var(--accent-teal)]/10 text-[var(--accent-teal)] border border-[var(--accent-teal)]/25">
                        Present
                      </span>
                    )}
                  </div>
                  <span className="text-xs font-mono text-[var(--text-secondary)]">
                    {exp.start_date.slice(0, 7)} to {exp.is_current ? 'Present' : exp.end_date?.slice(0, 7)}
                  </span>
                </div>

                <p className="text-xs font-medium text-[var(--text-secondary)]">
                  {exp.company} · {exp.employment_type} · {exp.location}
                </p>

                {exp.summary && (
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed font-light pt-1">
                    {exp.summary}
                  </p>
                )}
              </div>
            ))}
          </div>
        </article>

        {/* Technical Competencies Card */}
        <article className="glass-card p-[var(--content-padding)] rounded-[var(--card-radius)] space-y-6">
          <div className="flex items-center justify-between border-b border-white/15 pb-4">
            <h2 className="text-lg font-medium text-[var(--text-primary)]">
              Competencies & Tools
            </h2>
            <span className="text-xs font-mono text-[var(--text-secondary)]">
              Categorized
            </span>
          </div>

          <div className="space-y-5">
            {skillGroups.map((group) => (
              <div key={group.id} className="space-y-2">
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
                  {group.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(group.skills || []).map((skill) => (
                    <span
                      key={skill.id}
                      className={`text-xs px-3 py-1.5 rounded-md border transition-colors ${
                        skill.level === 'primary'
                          ? 'bg-[var(--page-background)] text-[var(--text-primary)] border-[var(--surface-border)] font-medium'
                          : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border-transparent'
                      }`}
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
