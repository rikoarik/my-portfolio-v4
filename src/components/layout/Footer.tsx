import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  fullName?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  email?: string;
}

export function Footer({
  fullName = 'Arik Riko Prasetya',
  githubUrl = 'https://github.com/rikoarik',
  linkedinUrl = 'https://linkedin.com/in/arikriko',
  email = 'arikrikoprasetya@gmail.com',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-[var(--layout-gap)] p-6 sm:p-8 rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-secondary)]">
      <div className="flex items-center gap-3">
        <span className="text-[var(--text-primary)] font-medium">
          {fullName}
        </span>
        <span>© {currentYear}</span>
      </div>

      <div className="flex flex-wrap items-center gap-5">
        <Link
          href="/work"
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          Work
        </Link>
        <Link
          href="/about"
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          About
        </Link>
        <Link
          href="/exploration"
          className="hover:text-[var(--text-primary)] transition-colors"
        >
          Exploration
        </Link>
        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-0.5"
        >
          <span>GitHub</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-0.5"
        >
          <span>LinkedIn</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
        <a
          href={`mailto:${email}`}
          className="hover:text-[var(--text-primary)] transition-colors inline-flex items-center gap-0.5"
        >
          <span>Email</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </footer>
  );
}
