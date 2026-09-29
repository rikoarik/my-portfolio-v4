'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, ChevronLeft, ChevronRight, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { Project } from '@/types/cms';

import { useLanguage } from '@/context/LanguageContext';

interface SelectedWorkHeroProps {
  projects: Project[];
}

const SLIDE_DURATION = 6; // 6 seconds per auto-slide

export function SelectedWorkHero({ projects }: SelectedWorkHeroProps) {
  const { t } = useLanguage();
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
      // 1. Animate Slide Image with cinematic reveal (scale, blur + fade)
      if (slideImageRef.current) {
        gsap.fromTo(
          slideImageRef.current,
          {
            opacity: 0,
            scale: 1.12,
            x: direction * 40,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            scale: 1,
            x: 0,
            filter: 'blur(0px)',
            duration: 1.2,
            ease: 'expo.out',
          }
        );

        // Slow ambient drift while viewing
        gsap.to(slideImageRef.current, {
          scale: 1.04,
          duration: SLIDE_DURATION + 1,
          ease: 'sine.inOut',
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
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden bg-[#1a2421] shadow-xl select-none"
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
            <div className="w-full h-full flex items-center justify-center text-sm font-mono text-[#fdf0d5]/70">
              {currentProject.title}
            </div>
          )}
        </div>
      </div>

      {/* Deep cinematic gradient overlay with reinforced bottom contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a2421]/90 via-[#1a2421]/30 to-transparent pointer-events-none z-[1]" />

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
            className="pointer-events-auto tap-target w-10 h-10 rounded-full bg-[#1a2421]/80 hover:bg-[#1a2421] backdrop-blur-md text-[#fdf0d5]/90 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
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
            className="pointer-events-auto tap-target w-10 h-10 rounded-full bg-[#1a2421]/80 hover:bg-[#1a2421] backdrop-blur-md text-[#fdf0d5]/90 hover:text-white flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Bottom Left: High-Contrast Frosted Box with Role & Title (No border) */}
      <div className="absolute bottom-8 left-6 sm:bottom-10 sm:left-8 z-20 flex flex-col gap-2 max-w-[calc(100%-160px)]">
        {currentProject.role && (
          <div
            ref={roleBadgeRef}
            className="inline-flex items-center w-fit px-2.5 py-1 rounded-md bg-[#1a2421]/90 backdrop-blur-md shadow-sm"
          >
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#249d8f] font-medium">
              {currentProject.role}
            </span>
          </div>
        )}

        <Link
          ref={actionButtonRef}
          href={`/work/${currentProject.slug}`}
          className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#1a2421]/90 hover:bg-[#1a2421] backdrop-blur-md text-[#fdf0d5] text-sm font-medium transition-all group shadow-xl w-fit max-w-full"
        >
          <span className="truncate">{currentProject.title}</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-[#249d8f] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
        </Link>
      </div>

      {/* Bottom Center: Pagination with GSAP Progress Bar */}
      {total > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1a2421]/85 backdrop-blur-md shadow-md">
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
                    className="absolute inset-y-0 left-0 bg-[#249d8f] rounded-full"
                    style={{ width: '0%' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Bottom Right: Inverted Cutout Badge (Clean, no dot) */}
      <div className="card-badge-bottom-right">
        <span className="font-normal text-sm tracking-tight text-[var(--text-primary)]">
          {t('hero.selected_work')}
        </span>
      </div>
    </div>
  );
}
