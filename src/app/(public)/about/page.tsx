import {
  getProfile,
  getExperiences,
  getSkillGroups,
  getSeoPage,
} from '@/lib/data/portfolio';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoPage('about');
  return {
    title: seo?.title || 'About · Arik Riko Prasetya',
    description:
      seo?.description ||
      'Software engineer background, professional timeline, full capabilities, and engineering philosophy.',
    alternates: {
      canonical: seo?.canonical_url || 'https://arikriko.com/about',
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

const PARTNERS = [
  { name: 'CLOSEPAY', tag: 'PAYMENT' },
  { name: 'PT TEKNOLOGI KARTU INDONESIA', tag: 'SMARTCARD' },
  { name: 'PUAS HUB', tag: 'FINTECH' },
  { name: 'LEMBAR APP', tag: 'EDTECH' },
  { name: 'PRESENSI CRM', tag: 'ENTERPRISE' },
  { name: 'PONDOK PESANTREN LIRBOYO', tag: 'ECOSYSTEM' },
  { name: 'UNIVERSITAS BRAWIJAYA', tag: 'ACADEMIC' },
  { name: 'BPBAP SITUBONDO', tag: 'RESEARCH' },
  { name: 'PT MAHAWANGSA', tag: 'ENGINEERING' },
  { name: 'DIPROJECTIN', tag: 'AGENCY' },
  { name: 'BNI QRIS', tag: 'BANKING' },
  { name: 'CASHLESS POS', tag: 'HARDWARE' },
];

export default async function AboutPage() {
  const [profile, experiences, skillGroups] = await Promise.all([
    getProfile(),
    getExperiences(false),
    getSkillGroups(false),
  ]);

  // Normalize experiences list
  const experienceList = experiences.length > 0
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
          url: isPuas ? '/work/puas-hub' : (isTki ? 'https://closepay.id' : (isDiprojectin ? 'https://diprojectin.com' : 'https://github.com/rikoarik')),
        };
      })
    : [
        { id: '1', role: 'Mobile Developer', company: 'PT Teknologi Kartu Indonesia', period: '2025 – Present', url: 'https://closepay.id' },
        { id: '2', role: 'Mobile Developer', company: 'PUAS Hub', period: '2026', url: '/work/puas-hub' },
        { id: '3', role: 'Full-stack Developer', company: 'Diprojectin', period: '2025 – 2026', url: 'https://diprojectin.com' },
        { id: '4', role: 'Android Developer', company: 'PT Mahawangsa', period: '2024 – 2025', url: 'https://github.com/rikoarik' },
        { id: '5', role: 'Software Engineer (Freelance)', company: 'Self-Employed', period: '2024 – Present', url: 'https://github.com/rikoarik' },
      ];

  // If fewer than 5, append freelance to match 5 entries
  if (experienceList.length === 4) {
    experienceList.push({
      id: 'ext-freelance',
      role: 'Software Engineer (Freelance)',
      company: 'Self-Employed',
      period: '2024 – Present',
      url: 'https://github.com/rikoarik',
    });
  }

  // Tools categorization with emojis
  const toolsWithEmojis = [
    'Flutter 📱',
    'Kotlin ⚡️',
    'Dart 🎯',
    'Next.js ⚛️',
    'React ⚛️',
    'TypeScript 🔷',
    'Laravel 🐘',
    'Node.js 🟢',
    'PostgreSQL 🐘',
    'Supabase ⚡️',
    'Git 🐙',
    'Docker 🐳',
    'Figma 🎨',
    'Postman 🚀',
  ];

  const skillChips = [
    'Mobile Development',
    'Backend Architecture',
    'RESTful & WebSocket APIs',
    'Payment Gateway & QRIS',
    'POS & Hardware Protocols',
    'Database Architecture',
    'Full-Stack Engineering',
    'Offline-First Sync',
    'State Management',
    'CI/CD & App Store Delivery',
    'System Optimization',
    'Technical Problem Solving',
  ];

  return (
    <main className="about-page">
      {/* LEFT COLUMN: Sticky Portrait Figure with Inverted Bottom-Right Badge */}
      <figure className="about-portrait">
        <Image
          src={profile.avatar_url || '/images/profile/ark.jpg'}
          alt={`About ${profile.full_name}`}
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
        {/* 1. Profile + Social Section */}
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
                <p>{profile.title} · {profile.descriptor}</p>
              </div>
            </div>
            <p className="about-profile-summary">
              {profile.tagline_primary ||
                'I build software systems across mobile engineering, payment architectures, and backend systems. Focused on resilient architecture, real-world hardware integration, and reliable execution.'}
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

        {/* 2. Biography Card */}
        <section className="about-card about-biography">
          <h2>About</h2>
          <div className="about-biography__copy">
            <p>
              <span>If a software system breaks in production, good intentions don&apos;t matter.</span>
            </p>
            <p>
              <span>
                Throughout my career, I&apos;ve been drawn to products where reliability directly affects daily business operations—payment ecosystems, POS terminals, agent networks, attendance systems, and internal enterprise tools. My job is turning complex multi-platform architectures into rock-solid software that users and businesses depend on daily.
              </span>
            </p>
            <p>
              <span>
                Rather than writing code in isolation, I focus on end-to-end operational workflows: handling poor network conditions, hardware interfaces like Bluetooth thermal printers and NFC cards, data synchronization, and rigorous error recovery.
              </span>
            </p>
            <p>
              <span>
                At PT Teknologi Kartu Indonesia, I engineer and maintain financial and payment applications across 15+ production deployments, connecting client apps to secure payment switches, QRIS APIs, and banking infrastructure across both Google Play Store and Apple App Store.
              </span>
            </p>
            <p>
              <span>
                I bridge mobile development, backend microservices, and database design—delivering stable products from ambiguous requirement briefs to final production delivery.
              </span>
            </p>
          </div>
        </section>

        {/* 3. Core Competencies Card */}
        <section className="about-card about-competencies">
          <h2>Core Competencies</h2>
          <div className="about-competencies__group">
            <h3>Skills</h3>
            <div className="about-chips">
              {skillChips.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="about-competencies__group">
            <h3>Tools</h3>
            <div className="about-chips">
              {toolsWithEmojis.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </div>

          <div className="about-competencies__group">
            <h3>Language</h3>
            <div className="about-languages">
              <div>
                <span>English</span>
                <span className="text-[var(--text-secondary)] font-light">(Professional)</span>
              </div>
              <div>
                <span>Indonesia</span>
                <span className="text-[var(--text-secondary)] font-light">(Native)</span>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Worked with teams across (Infinite Marquee Ticker) */}
        <section className="about-partners" aria-labelledby="about-partners-heading">
          <h2 id="about-partners-heading">Worked with teams across</h2>
          <div className="about-partners__viewport">
            <div className="about-partners__track">
              <div className="about-partners__sequence">
                {PARTNERS.map((partner) => (
                  <span key={partner.name} className="about-partners__item">
                    {partner.name}
                  </span>
                ))}
              </div>
              <div className="about-partners__sequence" aria-hidden="true">
                {PARTNERS.map((partner) => (
                  <span key={`dup-${partner.name}`} className="about-partners__item">
                    {partner.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 5. Experience Section Intro Card */}
        <section className="about-card about-experience-intro">
          <h2>Experience</h2>
          <p>
            Across agency, in-house, and freelance engineering roles, I&apos;ve partnered with product managers, engineers, QA, and business stakeholders often as the resolution point between operational requirements and high-performance technical execution.
          </p>
        </section>

        {/* 5b. Discrete Experience Rows */}
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

        {/* 6. Download My CV Full-Width Button */}
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
