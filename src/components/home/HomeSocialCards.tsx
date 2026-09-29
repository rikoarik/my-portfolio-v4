'use client';

import React from 'react';
import { ArrowUpRight, FileDown, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HomeSocialCardsProps {
  email: string;
  resumeUrl?: string;
}

export function HomeSocialCards({ email, resumeUrl }: HomeSocialCardsProps) {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--layout-gap)]">
      {/* Contact Card */}
      <a
        href={`mailto:${email}`}
        className="p-6 rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)] transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-[var(--accent-teal)]" />
          <div>
            <p className="text-xs uppercase font-mono text-[var(--text-secondary)]">
              Direct Contact
            </p>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {t('home.get_in_touch')}
            </p>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-teal)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </a>

      {/* Resume Download Card */}
      <a
        href={resumeUrl || '/resume/Arik_Riko_Prasetya_Software_Engineer.pdf'}
        target="_blank"
        rel="noopener noreferrer"
        className="p-6 rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)] transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <FileDown className="w-4 h-4 text-[var(--accent-teal)]" />
          <div>
            <p className="text-xs uppercase font-mono text-[var(--text-secondary)]">
              Curriculum Vitae
            </p>
            <p className="text-sm font-medium text-[var(--text-primary)]">
              {t('home.download_cv')}
            </p>
          </div>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-teal)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </a>
    </div>
  );
}
