'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, FolderGit2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function HomeEndingCard() {
  const { lang } = useLanguage();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--layout-gap)]">
      <Link
        href="/work"
        className="p-6 rounded-[var(--card-radius)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all flex items-center justify-between group shadow-xs"
      >
        <div className="flex items-center gap-3">
          <FolderGit2 className="w-4 h-4 text-[var(--accent-teal)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {lang === 'id' ? 'Semua Studi Kasus' : 'All Case Studies'}
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-teal)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </Link>

      <Link
        href="/exploration"
        className="p-6 rounded-[var(--card-radius)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] transition-all flex items-center justify-between group shadow-xs"
      >
        <div className="flex items-center gap-3">
          <Compass className="w-4 h-4 text-[var(--accent-teal)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            {lang === 'id' ? 'Eksplorasi Rekayasa' : 'Engineering Exploration'}
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--accent-teal)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </Link>
    </div>
  );
}
