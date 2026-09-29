import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Compass, FolderGit2 } from 'lucide-react';

export function HomeEndingCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--layout-gap)]">
      <Link
        href="/work"
        className="p-6 rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)] transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <FolderGit2 className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            All Case Studies
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </Link>

      <Link
        href="/exploration"
        className="p-6 rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] hover:bg-[var(--surface-hover)] transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-3">
          <Compass className="w-4 h-4 text-[var(--text-secondary)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">
            Engineering Exploration
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </Link>
    </div>
  );
}
