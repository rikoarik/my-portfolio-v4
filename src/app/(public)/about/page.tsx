import {
  getProfile,
  getExperiences,
  getSeoPage,
} from '@/lib/data/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoPage('about');
  return {
    title: seo?.title || 'About · Arik Riko Prasetya — Mobile & Full-Stack Software Engineer',
    description:
      seo?.description ||
      'Mobile & Full-Stack Software Engineer specializing in production mobile apps, fintech systems, hardware integrations, backend architectures, and AI workflows.',
    alternates: {
      canonical: seo?.canonical_url || 'https://arklabs.my.id/about',
    },
  };
}

function ArrowUpRightIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M198,64V168a6,6,0,0,1-12,0V78.48L68.24,196.24a6,6,0,0,1-8.48-8.48L177.52,70H88a6,6,0,0,1,0-12H192A6,6,0,0,1,198,64Z" />
    </svg>
  );
}

function GithubIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function MailIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M224,50H32a6,6,0,0,0-6,6V192a14,14,0,0,0,14,14H216a14,14,0,0,0,14-14V56A6,6,0,0,0,224,50Zm-96,85.86L47.42,62H208.58ZM101.67,128,38,186.36V69.64Zm8.88,8.14L124,148.42a6,6,0,0,0,8.1,0l13.4-12.28L208.58,194H47.43ZM154.33,128,218,69.64V186.36Z" />
    </svg>
  );
}

function SendIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-.15,0L19.57,82.84a16,16,0,0,0-2.49,29.8L102,154l41.3,84.87A16,16,0,0,0,157.62,248a16.14,16.14,0,0,0,6.72-1.48,15.86,15.86,0,0,0,8.68-12l58.27-191.9A16,16,0,0,0,227.32,28.68ZM157.62,232l-37.19-76.43,51.81-51.81a8,8,0,0,0-11.31-11.31L109.12,144.26,32.7,107.07l192-58.19Z"/>
    </svg>
  );
}

function FileDocIcon({ className = 'w-[18px] h-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="currentColor" aria-hidden="true">
      <path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM152,43.31,196.69,88H152ZM200,216H56V40h80V88a8,8,0,0,0,8,8h48v120Z"/>
    </svg>
  );
}

interface ExpertiseItem {
  title: string;
  description: string;
}

const CORE_EXPERTISE: ExpertiseItem[] = [
  {
    title: 'Mobile Engineering',
    description:
      'Native Android, Flutter, and React Native applications designed and implemented for production environments.',
  },
  {
    title: 'Application Architecture',
    description:
      'Clean Architecture, MVVM, BLoC, modular architecture, state management, and maintainable application structure.',
  },
  {
    title: 'Fintech & Transaction Systems',
    description:
      'PPOB, payment gateway integration, QRIS, wallet flows, transaction processing, billing, and payment-oriented applications.',
  },
  {
    title: 'Device & Hardware Integration',
    description:
      'NFC, Bluetooth, card-based transactions, peripheral integration, and POS-related workflows.',
  },
  {
    title: 'Backend & API Engineering',
    description:
      'REST APIs, WebSocket communication, authentication, backend services, business logic, database integration, and third-party services.',
  },
  {
    title: 'Product & SaaS Engineering',
    description:
      'End-to-end implementation of dashboards, CRM, marketplaces, membership systems, invoicing, internal tools, and multi-role applications.',
  },
  {
    title: 'AI & Developer Automation',
    description:
      'AI-assisted software development, LLM integration, coding agents, agent workflows, prompt/context engineering, MCP/tool integration, debugging, refactoring, code review, and engineering automation.',
  },
  {
    title: 'Deployment & Delivery',
    description:
      'Docker, CI/CD, VPS/Linux deployment, Cloudflare, environment management, Git workflows, and mobile application release processes.',
  },
];

interface TechGroup {
  category: string;
  items: string[];
}

const TECH_GROUPS: TechGroup[] = [
  {
    category: 'Mobile',
    items: ['Kotlin / Android', 'Flutter / Dart', 'React Native / Expo'],
  },
  {
    category: 'Architecture & State',
    items: ['Clean Architecture', 'MVVM', 'BLoC', 'Zustand'],
  },
  {
    category: 'Backend',
    items: ['Laravel', 'Node.js', 'Fastify', 'Prisma'],
  },
  {
    category: 'Web',
    items: ['React', 'Next.js', 'TypeScript'],
  },
  {
    category: 'Data & Services',
    items: ['PostgreSQL', 'Firebase', 'Supabase'],
  },
  {
    category: 'API & Integration',
    items: [
      'REST API',
      'WebSocket',
      'Authentication',
      'Third-party APIs',
      'QRIS',
      'Payment Gateway',
      'NFC',
      'Bluetooth',
    ],
  },
  {
    category: 'AI & Automation',
    items: [
      'LLM API Integration',
      'AI Coding Agents',
      'Agent Workflows',
      'Prompt & Context Engineering',
      'MCP / Tool Integration',
      'Function / Tool Calling',
      'Structured Output',
      'AI-assisted Debugging',
      'AI-assisted Refactoring',
      'AI-assisted Code Review',
    ],
  },
  {
    category: 'Infrastructure',
    items: ['Docker', 'CI/CD', 'VPS / Linux', 'Cloudflare', 'Git / GitHub'],
  },
  {
    category: 'Development Tools',
    items: ['Postman', 'Figma', 'Android Studio', 'VS Code'],
  },
];

const AI_TOOLS = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'Claude Code',
  'Codex',
  'Cursor',
  'GitHub Copilot',
];

const LANGUAGES = [
  { name: 'Indonesian', proficiency: 'Native' },
  { name: 'English', proficiency: 'Professional Working Proficiency' },
];

export default async function AboutPage() {
  const [profile, experiences] = await Promise.all([
    getProfile(),
    getExperiences(false),
  ]);

  // Normalize experiences list
  const experienceList =
    experiences.length > 0
      ? experiences.map((exp) => {
          const startYear = exp.start_date ? new Date(exp.start_date).getFullYear() : '2024';
          const endYear = exp.is_current ? 'Present' : exp.end_date ? new Date(exp.end_date).getFullYear() : 'Present';
          const period = startYear === endYear ? `${startYear}` : `${startYear} – ${endYear}`;
          const isPuas = exp.company.toLowerCase().includes('puas');
          const isTki = exp.company.toLowerCase().includes('teknologi');
          const isDiprojectin = exp.company.toLowerCase().includes('diprojectin');

          return {
            id: exp.id,
            role: exp.role,
            company: exp.company,
            period,
            url: isPuas
              ? '/work/puas-hub'
              : isTki
              ? 'https://closepay.id'
              : isDiprojectin
              ? 'https://diprojectin.com'
              : 'https://github.com/rikoarik',
          };
        })
      : [
          { id: '1', role: 'Mobile Developer', company: 'PT Teknologi Kartu Indonesia', period: '2025 – Present', url: 'https://closepay.id' },
          { id: '2', role: 'Mobile Developer', company: 'PUAS Hub', period: '2026', url: '/work/puas-hub' },
          { id: '3', role: 'Full-stack Developer', company: 'Diprojectin', period: '2025 – 2026', url: 'https://diprojectin.com' },
          { id: '4', role: 'Android Developer', company: 'PT Mahawangsa', period: '2024 – 2025', url: 'https://github.com/rikoarik' },
          { id: '5', role: 'Software Engineer (Freelance)', company: 'Self-Employed', period: '2024 – Present', url: 'https://github.com/rikoarik' },
        ];

  if (experienceList.length === 4) {
    experienceList.push({
      id: 'ext-freelance',
      role: 'Software Engineer (Freelance)',
      company: 'Self-Employed',
      period: '2024 – Present',
      url: 'https://github.com/rikoarik',
    });
  }

  return (
    <main className="about-page">
      {/* LEFT COLUMN: Sticky Portrait Figure */}
      <figure className="about-portrait">
        <Image
          src={profile.avatar_url || '/images/profile/ark.jpg'}
          alt={`Portrait of ${profile.full_name}`}
          fill
          priority
          className="about-portrait__image"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <figcaption className="card-badge-bottom-right">
          {profile.full_name}
        </figcaption>
      </figure>

      {/* RIGHT COLUMN: Editorial Content Stack */}
      <div className="about-content">
        {/* 1. INTRO / HERO: Profile + Social Section */}
        <section className="profile-social about-profile-social" aria-label="Profile and social links">
          <div className="profile-card about-profile-card">
            <div className="about-profile-identity">
              <div className="relative w-[60px] h-[60px] rounded-full overflow-hidden shrink-0 bg-[var(--surface-hover)]">
                <Image
                  src={profile.avatar_url || '/images/profile/ark.jpg'}
                  alt={profile.full_name}
                  width={60}
                  height={60}
                  className="object-cover object-top w-full h-full"
                />
              </div>
              <div className="about-profile-details">
                <h1>{profile.full_name}</h1>
                <p>Mobile & Full-Stack Software Engineer</p>
              </div>
            </div>
            <p className="about-profile-summary">
              I build production mobile applications and supporting backend systems, with experience across fintech, payment systems, NFC/Bluetooth integration, POS, SaaS products, system integrations, and AI-assisted engineering workflows.
            </p>
          </div>

          <div className="social-stack about-social-stack">
            <a
              className="social-card"
              href={profile.github_url || 'https://github.com/rikoarik'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>GitHub</span>
              <span className="social-card__icons">
                <span className="social-card__icon flex items-center justify-center">
                  <GithubIcon />
                </span>
                <span className="social-card__icon social-card__icon--arrow flex items-center justify-center">
                  <ArrowUpRightIcon />
                </span>
              </span>
            </a>
            <a
              className="social-card"
              href={profile.linkedin_url || 'https://linkedin.com/in/arikriko'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>LinkedIn</span>
              <span className="social-card__icons">
                <span className="social-card__icon flex items-center justify-center">
                  <LinkedinIcon />
                </span>
                <span className="social-card__icon social-card__icon--arrow flex items-center justify-center">
                  <ArrowUpRightIcon />
                </span>
              </span>
            </a>
            <a
              className="social-card"
              href={`mailto:${profile.email || 'arikrikoprasetya@gmail.com'}`}
            >
              <span>Email</span>
              <span className="social-card__icons">
                <span className="social-card__icon flex items-center justify-center">
                  <MailIcon />
                </span>
                <span className="social-card__icon social-card__icon--arrow flex items-center justify-center">
                  <ArrowUpRightIcon />
                </span>
              </span>
            </a>
            <Link className="social-card social-card--contact" href="/contact">
              <span>Contact Me</span>
              <span className="social-card__icons">
                <span className="social-card__icon flex items-center justify-center">
                  <SendIcon />
                </span>
                <span className="social-card__icon social-card__icon--arrow flex items-center justify-center">
                  <ArrowUpRightIcon />
                </span>
              </span>
            </Link>
          </div>
        </section>

        {/* 2. CORE EXPERTISE: Concrete 8-Area Editorial Layout */}
        <section className="about-card space-y-5" aria-labelledby="core-expertise-heading">
          <h2 id="core-expertise-heading">Core Expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 pt-1">
            {CORE_EXPERTISE.map((item) => (
              <div key={item.title} className="space-y-1.5">
                <h3 className="text-[15px] font-medium text-[var(--text-primary)] tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[13px] leading-[20px] text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. TECHNICAL CAPABILITIES, AI WORKFLOW & LANGUAGES */}
        <section className="about-card space-y-7" aria-labelledby="tech-capabilities-heading">
          <div>
            <h2 id="tech-capabilities-heading">Technical Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
              {TECH_GROUPS.map((group) => (
                <div key={group.category} className="space-y-2">
                  <h3 className="text-[12px] font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {group.items.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[12px] rounded-[5px] bg-[var(--page-background)] text-[var(--text-secondary)] border border-[var(--surface-border)] font-normal leading-snug"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Engineering Workflow */}
          <div className="pt-6 border-t border-[var(--surface-border)] space-y-3">
            <h3 className="text-[14px] font-medium text-[var(--text-primary)] tracking-tight">
              AI Engineering Workflow
            </h3>
            <p className="text-[13px] leading-[20px] text-[var(--text-secondary)]">
              AI tools and coding agents are an integral part of my engineering workflow—applied across system planning, architectural exploration, implementation, systematic debugging, refactoring, code review, and engineering automation. I prioritize technical capability, system integrity, and rigorous verification over indiscriminate code generation.
            </p>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[12.5px] pt-1">
              <span className="text-[var(--text-primary)] font-medium font-mono text-[11px] uppercase tracking-wider mr-1">
                Workflow Tools:
              </span>
              {AI_TOOLS.map((tool, idx) => (
                <span key={tool} className="text-[var(--text-secondary)] flex items-center gap-2">
                  <span>{tool}</span>
                  {idx < AI_TOOLS.length - 1 && (
                    <span className="text-[var(--surface-border)] select-none" aria-hidden="true">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="pt-5 border-t border-[var(--surface-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-[12px] font-mono uppercase tracking-wider text-[var(--text-primary)] font-medium m-0">
              Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map((lang) => (
                <div
                  key={lang.name}
                  className="px-3 py-1 rounded-[5px] bg-[var(--page-background)] border border-[var(--surface-border)] text-[12.5px] flex items-center gap-2"
                >
                  <span className="font-medium text-[var(--text-primary)]">{lang.name}</span>
                  <span className="text-[var(--text-secondary)] font-mono text-[11.5px]">
                    — {lang.proficiency}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. EXPERIENCE: Intro Card & Timeline Rows */}
        <section className="about-card about-experience-intro">
          <h2>Experience</h2>
          <p>
            Across production, agency, and engineering consulting roles, I work end-to-end to deliver reliable mobile and full-stack software—turning complex business requirements and hardware protocols into resilient production deployments.
          </p>
        </section>

        <section className="about-experience" aria-label="Experience">
          {experienceList.map((exp) => (
            <a
              key={exp.id}
              href={exp.url || 'https://github.com/rikoarik'}
              target={exp.url?.startsWith('http') ? '_blank' : undefined}
              rel={exp.url?.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="about-experience__item"
            >
              <span className="about-experience__role">{exp.role}</span>
              <span className="about-experience__meta">
                <span className="about-experience__details">
                  <span className="about-experience__organization">{exp.company}</span>
                  <span className="about-experience__period">{exp.period}</span>
                </span>
                <ArrowUpRightIcon className="about-experience__arrow" />
              </span>
            </a>
          ))}
        </section>

        {/* 5. RESUME: Download My CV Button */}
        <a
          className="home-ending__cv about-cv"
          href={profile.resume_url || '/resume/Arik_Riko_Prasetya_Software_Engineer.pdf'}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>Download My CV</span>
          <span className="home-ending__icons" aria-hidden="true">
            <FileDocIcon />
            <FileDocIcon />
          </span>
        </a>
      </div>
    </main>
  );
}
