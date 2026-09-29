'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '@/types/cms';

interface SelectedWorkHeroProps {
  projects: Project[];
}

export function SelectedWorkHero({ projects }: SelectedWorkHeroProps) {
  const featured = projects.filter((p) => p.featured).length > 0
    ? projects.filter((p) => p.featured)
    : projects.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (featured.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 6500);
    return () => clearInterval(interval);
  }, [featured.length]);

  if (featured.length === 0) return null;

  const currentProject = featured[currentIndex] || featured[0];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  return (
    <div className="relative w-full h-[460px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface)] border border-[var(--surface-border)] shadow-2xl">
      {/* Animated Slides with Motion */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProject.id || currentProject.slug}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute inset-0 z-1"
        >
          {currentProject.cover_image_url ? (
            <Image
              src={currentProject.cover_image_url}
              alt={currentProject.cover_alt_text || currentProject.title}
              fill
              priority
              className="object-cover object-top"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-sm font-mono text-[var(--text-secondary)]">
              {currentProject.title}
            </div>
          )}

          {/* Deep cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e]/95 via-[#090a0e]/30 to-[#090a0e]/40 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Top Left Engineering Indicator */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-[11px] font-mono">
        <Terminal className="w-3 h-3 text-[var(--accent-cyan)]" />
        <span>SYS: PRODUCTION</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
      </div>

      {/* Slide Navigation Arrows with Framer Motion hover springs */}
      {featured.length > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handlePrev}
            aria-label="Previous featured project"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={handleNext}
            aria-label="Next featured project"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 hover:text-white flex items-center justify-center transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </>
      )}

      {/* Bottom Left: Glass Action Link */}
      <div className="absolute bottom-8 left-6 sm:left-8 z-10 flex flex-col gap-2 max-w-[calc(100%-160px)]">
        <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent-cyan)] drop-shadow-sm">
          {currentProject.role}
        </span>
        <Link
          href={`/work/${currentProject.slug}`}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#090a0e]/80 backdrop-blur-md text-white text-sm font-medium hover:bg-[#090a0e] transition-all border border-white/15 hover:border-[var(--accent-cyan)]/50 group shadow-lg"
        >
          <span className="truncate">{currentProject.title}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-cyan)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </Link>
      </div>

      {/* Bottom Center: Pagination Dots */}
      {featured.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
          {featured.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Jump to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? 'bg-[var(--accent-cyan)] w-5'
                  : 'bg-white/30 hover:bg-white/60 w-1.5'
              }`}
            />
          ))}
        </div>
      )}

      {/* Bottom Right: Inverted Cutout Badge */}
      <div className="card-badge-bottom-right">
        <span className="font-medium text-xs tracking-tight flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
          <span>Selected Work</span>
        </span>
      </div>
    </div>
  );
}
