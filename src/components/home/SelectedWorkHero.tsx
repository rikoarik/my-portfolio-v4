'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { Project } from '@/types/cms';

interface SelectedWorkHeroProps {
  projects: Project[];
}

const SLIDE_DURATION = 6; // 6 seconds per auto-slide

export function SelectedWorkHero({ projects }: SelectedWorkHeroProps) {
  const featured = projects.filter((p) => p.featured).length > 0
    ? projects.filter((p) => p.featured)
    : projects.slice(0, 4);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isHovered, setIsHovered] = useState(false);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const slideImageRef = useRef<HTMLDivElement>(null);
  const roleBadgeRef = useRef<HTMLDivElement>(null);
  const actionButtonRef = useRef<HTMLAnchorElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);

  const total = featured.length;

  const goToSlide = useCallback((nextIndex: number, dir: 1 | -1 = 1) => {
    setDirection(dir);
    setCurrentIndex(nextIndex);
  }, []);

  const handleNext = useCallback(() => {
    if (total <= 1) return;
    goToSlide((currentIndex + 1) % total, 1);
  }, [currentIndex, total, goToSlide]);

  const handlePrev = useCallback(() => {
    if (total <= 1) return;
    goToSlide((currentIndex - 1 + total) % total, -1);
  }, [currentIndex, total, goToSlide]);

  // GSAP Smooth Slide & Content Transition
  useEffect(() => {
    if (!heroContainerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Animate Slide Image with directional zoom & blur reveal
      if (slideImageRef.current) {
        gsap.fromTo(
          slideImageRef.current,
          {
            opacity: 0.25,
            scale: 1.07,
            x: direction * 35,
            filter: 'blur(6px)',
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 0.9,
            ease: 'power3.out',
          }
        );

        // Continuous subtle ambient drift while reading
        gsap.to(slideImageRef.current, {
          scale: 1.03,
          duration: SLIDE_DURATION,
          ease: 'sine.out',
        });
      }

      // 2. Animate Text Elements with Stagger
      if (roleBadgeRef.current && actionButtonRef.current) {
        gsap.fromTo(
          [roleBadgeRef.current, actionButtonRef.current],
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power2.out',
            delay: 0.12,
          }
        );
      }

      // 3. Animate the Progress Bar
      if (progressLineRef.current && total > 1) {
        if (progressTweenRef.current) {
          progressTweenRef.current.kill();
        }

        gsap.set(progressLineRef.current, { width: '0%' });

        progressTweenRef.current = gsap.to(progressLineRef.current, {
          width: '100%',
          duration: SLIDE_DURATION,
          ease: 'none',
          onComplete: () => {
            handleNext();
          },
        });

        if (isHovered) {
          progressTweenRef.current.pause();
        }
      }
    }, heroContainerRef);

    return () => {
      ctx.revert();
    };
  }, [currentIndex, direction, total, handleNext, isHovered]);

  // Pause / Resume progress on hover
  useEffect(() => {
    if (progressTweenRef.current) {
      if (isHovered) {
        progressTweenRef.current.pause();
      } else {
        progressTweenRef.current.resume();
      }
    }
  }, [isHovered]);

  if (total === 0) return null;

  const currentProject = featured[currentIndex] || featured[0];

  return (
    <div
      ref={heroContainerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full h-[460px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden bg-[#131612] border border-[var(--surface-border)] shadow-2xl select-none"
    >
      {/* Slide Image Layer */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          ref={slideImageRef}
          key={`slide-${currentProject.id || currentProject.slug}`}
          className="relative w-full h-full"
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
        </div>
      </div>

      {/* Deep cinematic gradient overlay with reinforced bottom contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/20 pointer-events-none z-2" />

      {/* Top Left Engineering Indicator */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white/90 text-[11px] font-mono shadow-md">
        <Terminal className="w-3 h-3 text-[var(--accent-cyan)]" />
        <span>SYS: PRODUCTION</span>
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
      </div>

      {/* Slide Navigation Arrows */}
      {total > 1 && (
        <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 pointer-events-none z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handlePrev();
            }}
            aria-label="Previous project preview"
            className="pointer-events-auto tap-target w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleNext();
            }}
            aria-label="Next project preview"
            className="pointer-events-auto tap-target w-10 h-10 rounded-full bg-black/60 hover:bg-black/85 backdrop-blur-md border border-white/15 text-white/80 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Bottom Left: Glass Action Link & Role with High-Contrast Frosted Box */}
      <div className="absolute bottom-8 left-6 sm:left-8 z-10 flex flex-col gap-2.5 max-w-[calc(100%-160px)]">
        <div
          ref={roleBadgeRef}
          className="inline-flex items-center w-fit px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-md border border-white/15 shadow-sm"
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-[var(--accent-cyan)] font-medium">
            {currentProject.role}
          </span>
        </div>

        <Link
          ref={actionButtonRef}
          href={`/work/${currentProject.slug}`}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-black/75 hover:bg-black/90 backdrop-blur-md text-white text-sm font-medium transition-all border border-white/20 hover:border-[var(--accent-cyan)]/60 group shadow-xl w-fit max-w-full"
        >
          <span className="truncate">{currentProject.title}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-cyan)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </Link>
      </div>

      {/* Bottom Center: Pagination with GSAP Progress Bar */}
      {total > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-md">
          {featured.map((p, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={p.id || idx}
                type="button"
                onClick={() => goToSlide(idx, idx > currentIndex ? 1 : -1)}
                aria-label={`Jump to project ${idx + 1}`}
                className={`relative h-2 rounded-full overflow-hidden transition-all duration-300 ${
                  isActive ? 'w-8 bg-white/25' : 'w-2 bg-white/30 hover:bg-white/60'
                }`}
              >
                {isActive && (
                  <div
                    ref={progressLineRef}
                    className="absolute inset-y-0 left-0 bg-[var(--accent-cyan)] rounded-full"
                    style={{ width: '0%' }}
                  />
                )}
              </button>
            );
          })}
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
