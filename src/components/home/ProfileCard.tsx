'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { SiteProfile } from '@/types/cms';

import { useLanguage } from '@/context/LanguageContext';

interface ProfileCardProps {
  profile: SiteProfile;
}

export function ProfileCard({ profile }: ProfileCardProps) {
  const { lang, t } = useLanguage();

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className="glass-card p-[var(--content-padding)] rounded-[var(--card-radius)] relative flex flex-col justify-between gap-8 group transition-colors shadow-sm"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            {profile.avatar_url ? (
              <div className="relative w-14 h-14 rounded-full overflow-hidden shadow-sm">
                <Image
                  src={profile.avatar_url}
                  alt={profile.full_name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover object-top"
                  priority
                />
              </div>
            ) : (
              <div className="w-14 h-14 rounded-full bg-[var(--surface-hover)] flex items-center justify-center font-bold text-lg text-[var(--text-primary)] shrink-0">
                A
              </div>
            )}
          </div>
          <div>
            <h1 className="text-lg font-medium text-[var(--text-primary)] leading-snug">
              {profile.full_name}
            </h1>
            <p className="text-sm text-[var(--text-secondary)] font-mono text-xs pt-0.5">
              {profile.title} · {profile.descriptor}
            </p>
          </div>
        </div>

        {/* Hover arrow indicator in top right */}
        <Link
          href="/about"
          className="text-[var(--text-secondary)] group-hover:text-[var(--accent-teal)] transition-colors p-1"
          aria-label="Read full biography and about"
        >
          <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </Link>
      </div>

      <div className="space-y-4">
        <p className="text-sm md:text-[15px] leading-relaxed text-[var(--text-secondary)] font-normal">
          {lang === 'id' ? t('profile.tagline') : profile.tagline_primary}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 text-xs font-mono text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <Cpu className="w-3.5 h-3.5 text-[var(--accent-teal)]" />
            <span>PT Teknologi Kartu Indonesia</span>
          </div>
          <span>Indonesia</span>
        </div>
      </div>
    </motion.article>
  );
}
