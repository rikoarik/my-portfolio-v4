'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { SiteProfile } from '@/types/cms';

interface ProfileCardProps {
  profile: SiteProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-[var(--content-padding)] rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] relative flex flex-col justify-between gap-8 group hover:border-[var(--accent-cyan)]/30 transition-colors shadow-lg"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-[var(--surface-hover)] border border-[var(--surface-border)] flex items-center justify-center font-bold text-lg text-[var(--text-primary)] shrink-0 shadow-inner">
              A
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[var(--page-background)]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-medium text-[var(--text-primary)] leading-snug">
                {profile.full_name}
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/25">
                ENGINEER
              </span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] font-mono text-xs pt-0.5">
              {profile.title} · {profile.descriptor}
            </p>
          </div>
        </div>

        {/* Hover arrow indicator in top right */}
        <Link
          href="/about"
          className="text-[var(--text-secondary)] group-hover:text-[var(--accent-cyan)] transition-colors p-1"
          aria-label="Read full biography and about"
        >
          <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>
      </div>

      <div className="space-y-4">
        <p className="text-sm md:text-[15px] leading-relaxed text-[var(--text-secondary)] font-light">
          {profile.tagline_primary}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--surface-border)] text-xs font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
            <span>PT Teknologi Kartu Indonesia</span>
          </div>
          <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Active · Present
          </span>
        </div>
      </div>
    </motion.article>
  );
}
