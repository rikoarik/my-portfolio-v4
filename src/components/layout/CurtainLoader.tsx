'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { useTheme } from '@/components/theme/ThemeProvider';

export function CurtainLoader() {
  const { theme: contextTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const clothPathRef = useRef<SVGPathElement>(null);
  const shadowPathRef = useRef<SVGPathElement>(null);
  const hemLineRef = useRef<SVGPathElement>(null);
  const stitchLineRef = useRef<SVGPathElement>(null);
  const foldsGroupRef = useRef<SVGGElement>(null);

  // Sync theme with DOM and localStorage accurately
  useEffect(() => {
    const readTheme = () => {
      const domTheme =
        (document.documentElement.getAttribute('data-theme') as 'dark' | 'light') ||
        (localStorage.getItem('ark_theme') as 'dark' | 'light') ||
        contextTheme ||
        'dark';
      setCurrentTheme(domTheme);
    };

    readTheme();
    window.addEventListener('ark-theme-change', readTheme);
    window.addEventListener('storage', readTheme);
    return () => {
      window.removeEventListener('ark-theme-change', readTheme);
      window.removeEventListener('storage', readTheme);
    };
  }, [contextTheme]);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsComplete(true);
      return;
    }

    // Lock page scroll during loader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Physics state for dynamic cloth pull simulation
    const clothState = {
      y: 1000,
      arch: 0,
      shadowY: 1000,
      shadowArch: 0,
      foldsOpacity: 0,
      counter: 0,
    };

    // Helper: Dynamic cloth contour curve
    // Flat initially (arch=0), arches up in center when pulled with natural catenary sagging on flanks
    const buildClothPath = (y: number, arch: number) => {
      const centerY = y - arch;
      const sagY = y + arch * 0.08;
      const innerSagY = centerY + arch * 0.16;
      return `M 0 0 
        L 1000 0 
        L 1000 ${y} 
        C 840 ${sagY} 660 ${innerSagY} 500 ${centerY} 
        C 340 ${innerSagY} 160 ${sagY} 0 ${y} 
        Z`;
    };

    // Helper: Bottom hemline path
    const buildHemPath = (y: number, arch: number) => {
      const centerY = y - arch;
      const sagY = y + arch * 0.08;
      const innerSagY = centerY + arch * 0.16;
      return `M 1000 ${y} 
        C 840 ${sagY} 660 ${innerSagY} 500 ${centerY} 
        C 340 ${innerSagY} 160 ${sagY} 0 ${y}`;
    };

    // Helper: Fine double-stitch hem line slightly offset upwards
    const buildStitchPath = (y: number, arch: number) => {
      const offset = 7;
      const centerY = y - arch - offset;
      const sagY = y + arch * 0.08 - offset;
      const innerSagY = centerY + arch * 0.16 - offset;
      return `M 1000 ${y - offset} 
        C 840 ${sagY} 660 ${innerSagY} 500 ${centerY} 
        C 340 ${innerSagY} 160 ${sagY} 0 ${y - offset}`;
    };

    // Helper: Dynamic tension wrinkles forming along the pull apex
    const updateFolds = (y: number, arch: number, opacity: number) => {
      if (!foldsGroupRef.current) return;
      foldsGroupRef.current.style.opacity = `${opacity}`;

      const centerY = y - arch;
      const shadows = foldsGroupRef.current.querySelectorAll('.crease-shadow');
      const highlights = foldsGroupRef.current.querySelectorAll('.crease-highlight');

      if (shadows.length >= 7) {
        // 0: Center tension spine
        shadows[0].setAttribute('d', `M 500 ${centerY} Q 500 ${centerY * 0.42} 500 0`);
        // 1 & 2: Inner folds
        shadows[1].setAttribute('d', `M 495 ${centerY} Q 425 ${centerY * 0.50} 350 0`);
        shadows[2].setAttribute('d', `M 505 ${centerY} Q 575 ${centerY * 0.50} 650 0`);
        // 3 & 4: Mid folds
        shadows[3].setAttribute('d', `M 490 ${centerY} Q 330 ${centerY * 0.60} 180 0`);
        shadows[4].setAttribute('d', `M 510 ${centerY} Q 670 ${centerY * 0.60} 820 0`);
        // 5 & 6: Outer draping folds
        shadows[5].setAttribute('d', `M 485 ${centerY} Q 210 ${centerY * 0.70} 60 0`);
        shadows[6].setAttribute('d', `M 515 ${centerY} Q 790 ${centerY * 0.70} 940 0`);
      }

      if (highlights.length >= 7) {
        highlights[0].setAttribute('d', `M 497 ${centerY} Q 497 ${centerY * 0.42} 497 0`);
        highlights[1].setAttribute('d', `M 492 ${centerY} Q 422 ${centerY * 0.50} 347 0`);
        highlights[2].setAttribute('d', `M 508 ${centerY} Q 578 ${centerY * 0.50} 653 0`);
        highlights[3].setAttribute('d', `M 487 ${centerY} Q 327 ${centerY * 0.60} 177 0`);
        highlights[4].setAttribute('d', `M 513 ${centerY} Q 673 ${centerY * 0.60} 823 0`);
        highlights[5].setAttribute('d', `M 482 ${centerY} Q 207 ${centerY * 0.70} 57 0`);
        highlights[6].setAttribute('d', `M 518 ${centerY} Q 793 ${centerY * 0.70} 943 0`);
      }
    };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = originalOverflow;
        setIsComplete(true);
      },
    });

    // 1. Digital progress counter (0 -> 100% on flat, smooth cloth)
    tl.to(clothState, {
      counter: 100,
      duration: 0.95,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.round(clothState.counter));
      },
    });

    // 2. Editorial typography floats up & fades out before cloth pull
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -30,
        duration: 0.3,
        ease: 'power2.in',
      },
      '+=0.08'
    );

    // 3. THE CLOTH PULL: Hoist cloth upward from bottom to top
    // The center apex is pulled up with tension arch, creating organic folds
    tl.to(
      clothState,
      {
        y: -160,
        duration: 1.1,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (clothPathRef.current) {
            clothPathRef.current.setAttribute(
              'd',
              buildClothPath(clothState.y, clothState.arch)
            );
          }
          if (hemLineRef.current) {
            hemLineRef.current.setAttribute(
              'd',
              buildHemPath(clothState.y, clothState.arch)
            );
          }
          if (stitchLineRef.current) {
            stitchLineRef.current.setAttribute(
              'd',
              buildStitchPath(clothState.y, clothState.arch)
            );
          }
          updateFolds(clothState.y, clothState.arch, clothState.foldsOpacity);
        },
      },
      '-=0.08'
    );

    // Dynamic tension arch: rises as cloth is hoisted, flattens as it gathers at top
    tl.to(
      clothState,
      {
        arch: 240,
        duration: 0.48,
        ease: 'power2.out',
      },
      '-=1.1'
    ).to(
      clothState,
      {
        arch: 0,
        duration: 0.62,
        ease: 'power2.in',
      },
      '-=0.62'
    );

    // Realistic tension wrinkles: emerge with lift acceleration, then disperse
    tl.to(
      clothState,
      {
        foldsOpacity: 0.85,
        duration: 0.38,
        ease: 'power2.out',
      },
      '-=1.1'
    ).to(
      clothState,
      {
        foldsOpacity: 0,
        duration: 0.52,
        ease: 'power2.in',
      },
      '-=0.55'
    );

    // 4. Lagging Shadow Layer (underneath cloth creating profound physical depth)
    tl.to(
      clothState,
      {
        shadowY: -160,
        shadowArch: 270,
        duration: 1.18,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (shadowPathRef.current) {
            shadowPathRef.current.setAttribute(
              'd',
              buildClothPath(clothState.shadowY, clothState.shadowArch)
            );
          }
        },
      },
      '-=1.06'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isComplete) {
    return null;
  }

  const isDark = currentTheme === 'dark';

  // Dynamic status text reflecting load milestones
  const getStatusText = (val: number) => {
    if (val < 30) return 'INITIALIZING CORE ENGINE';
    if (val < 65) return 'CALIBRATING DESIGN SYSTEM';
    if (val < 90) return 'COMPILING SELECTED WORKS';
    return 'RELEASING CANVAS';
  };

  return (
    <aside
      ref={containerRef}
      aria-label="Loading portfolio presentation"
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden select-none"
    >
      {/* SVG Canvas for Dynamic Cloth Pull & Physics Simulation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Main Cloth Body Fill - Dark Obsidian Satin vs Light Bone/Alabaster Silk */}
          <linearGradient id="themeClothFill" x1="0%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#080a0d" />
                <stop offset="45%" stopColor="#0c0f14" />
                <stop offset="100%" stopColor="#12161e" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="45%" stopColor="#f7f9fb" />
                <stop offset="100%" stopColor="#edf1f6" />
              </>
            )}
          </linearGradient>

          {/* Under-cloth Shadow Gradient */}
          <linearGradient id="themeClothShadowFill" x1="0%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#000000" stopOpacity="0.95" />
                <stop offset="80%" stopColor="#040507" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.98" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.25" />
                <stop offset="80%" stopColor="#0f172a" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.32" />
              </>
            )}
          </linearGradient>

          {/* Dynamic Crease Shadow (Valleys) */}
          <linearGradient id="themeCreaseShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#000000" stopOpacity="0.04" />
                <stop offset="65%" stopColor="#000000" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.02" />
                <stop offset="65%" stopColor="#0f172a" stopOpacity="0.20" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.35" />
              </>
            )}
          </linearGradient>

          {/* Dynamic Crease Highlight (Ridges) */}
          <linearGradient id="themeCreaseHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.28" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#ffffff" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
              </>
            )}
          </linearGradient>

          {/* Real-world Cloth Drop Shadow Filter */}
          <filter id="themeClothDropShadow" x="-10%" y="-10%" width="120%" height="150%">
            <feDropShadow
              dx="0"
              dy={isDark ? 36 : 28}
              stdDeviation={isDark ? 32 : 24}
              floodColor={isDark ? '#000000' : '#0f172a'}
              floodOpacity={isDark ? 0.9 : 0.22}
            />
          </filter>
        </defs>

        {/* 1. Lagging Under-cloth Shadow Layer */}
        <path
          ref={shadowPathRef}
          d="M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z"
          fill="url(#themeClothShadowFill)"
          opacity={isDark ? 0.9 : 0.8}
        />

        {/* 2. Main Smooth Cloth Body */}
        <path
          ref={clothPathRef}
          d="M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z"
          fill="url(#themeClothFill)"
          filter="url(#themeClothDropShadow)"
        />

        {/* 3. Dynamic Tension Wrinkles (7 paired ridge-valley lines) */}
        <g ref={foldsGroupRef} style={{ opacity: 0 }}>
          {/* Valley crease shadows */}
          <path className="crease-shadow" d="M 500 1000 Q 500 450 500 0" stroke="url(#themeCreaseShadow)" strokeWidth="18" fill="none" />
          <path className="crease-shadow" d="M 495 1000 Q 425 500 350 0" stroke="url(#themeCreaseShadow)" strokeWidth="15" fill="none" />
          <path className="crease-shadow" d="M 505 1000 Q 575 500 650 0" stroke="url(#themeCreaseShadow)" strokeWidth="15" fill="none" />
          <path className="crease-shadow" d="M 490 1000 Q 330 600 180 0" stroke="url(#themeCreaseShadow)" strokeWidth="12" fill="none" />
          <path className="crease-shadow" d="M 510 1000 Q 670 600 820 0" stroke="url(#themeCreaseShadow)" strokeWidth="12" fill="none" />
          <path className="crease-shadow" d="M 485 1000 Q 210 700 60 0" stroke="url(#themeCreaseShadow)" strokeWidth="9" fill="none" />
          <path className="crease-shadow" d="M 515 1000 Q 790 700 940 0" stroke="url(#themeCreaseShadow)" strokeWidth="9" fill="none" />

          {/* Ridge highlights */}
          <path className="crease-highlight" d="M 497 1000 Q 497 450 497 0" stroke="url(#themeCreaseHighlight)" strokeWidth="4.5" fill="none" />
          <path className="crease-highlight" d="M 492 1000 Q 422 500 347 0" stroke="url(#themeCreaseHighlight)" strokeWidth="3.5" fill="none" />
          <path className="crease-highlight" d="M 508 1000 Q 578 500 653 0" stroke="url(#themeCreaseHighlight)" strokeWidth="3.5" fill="none" />
          <path className="crease-highlight" d="M 487 1000 Q 327 600 177 0" stroke="url(#themeCreaseHighlight)" strokeWidth="3" fill="none" />
          <path className="crease-highlight" d="M 513 1000 Q 673 600 823 0" stroke="url(#themeCreaseHighlight)" strokeWidth="3" fill="none" />
          <path className="crease-highlight" d="M 482 1000 Q 207 700 57 0" stroke="url(#themeCreaseHighlight)" strokeWidth="2.5" fill="none" />
          <path className="crease-highlight" d="M 518 1000 Q 793 700 943 0" stroke="url(#themeCreaseHighlight)" strokeWidth="2.5" fill="none" />
        </g>

        {/* 4. Fine Hemline: Real Tailored Stitched Edge */}
        <path
          ref={stitchLineRef}
          d="M 1000 993 L 0 993"
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(15, 23, 42, 0.12)'}
          strokeWidth="1.5"
          strokeDasharray="4 6"
        />
        <path
          ref={hemLineRef}
          d="M 1000 1000 L 0 1000"
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.28)' : 'rgba(15, 23, 42, 0.22)'}
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Editorial Content Layer: Synchronized to Active Theme */}
      <div
        ref={contentRef}
        className={`relative z-10 w-full h-full flex flex-col justify-between p-6 sm:p-12 md:p-16 transition-colors duration-300 ${
          isDark ? 'text-[#f8fafc]' : 'text-[#090b0e]'
        }`}
      >
        {/* Top Header Row */}
        <div
          className={`flex items-center justify-between pb-5 border-b ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          {/* Identity & Monogram */}
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-[11px] font-bold tracking-wider shadow-sm transition-transform hover:scale-105 ${
                isDark
                  ? 'bg-white/10 border border-white/20 text-white'
                  : 'bg-black/5 border border-black/15 text-[#090b0e]'
              }`}
            >
              AR
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-semibold tracking-wide font-mono uppercase">
                Arik Riko Prasetya
              </span>
              <span
                className={`text-[10px] font-mono tracking-wider ${
                  isDark ? 'text-white/50' : 'text-black/50'
                }`}
              >
                Full-Stack & Mobile Engineer
              </span>
            </div>
          </div>

          {/* Status Capsule */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-[11px] font-mono tracking-wider uppercase backdrop-blur-sm ${
              isDark
                ? 'bg-white/5 border-white/10 text-white/80'
                : 'bg-black/5 border-black/10 text-black/80'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full animate-ping ${
                isDark ? 'bg-teal-400' : 'bg-teal-600'
              }`}
            />
            <span className="relative flex h-2 w-2">
              <span
                className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isDark ? 'bg-teal-400' : 'bg-teal-600'
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 ${
                  isDark ? 'bg-teal-400' : 'bg-teal-600'
                }`}
              />
            </span>
            <span className="hidden sm:inline">V4.0 // 2026 EDITION</span>
            <span className="sm:hidden">V4.0</span>
          </div>
        </div>

        {/* Centerpiece: Dynamic Typography, Counter, & Progress Meter */}
        <div className="flex flex-col items-center justify-center text-center my-auto space-y-7 max-w-2xl mx-auto w-full">
          {/* Subtle Tagline */}
          <div className="space-y-2">
            <span
              className={`text-[11px] sm:text-xs font-mono tracking-[0.25em] uppercase font-medium ${
                isDark ? 'text-teal-400/90' : 'text-teal-600'
              }`}
            >
              ARCHITECTING PRODUCTION PLATFORMS
            </span>
            <h1
              className={`text-3xl sm:text-5xl md:text-6xl font-light tracking-tight ${
                isDark ? 'text-white' : 'text-[#090b0e]'
              }`}
            >
              Crafting Experiences
            </h1>
          </div>

          {/* High-Impact Numerical Counter */}
          <div className="relative flex items-baseline justify-center">
            <span
              className={`font-mono text-6xl sm:text-8xl md:text-9xl font-semibold tracking-tighter tabular-nums ${
                isDark ? 'text-white' : 'text-[#090b0e]'
              }`}
            >
              {progress.toString().padStart(2, '0')}
            </span>
            <span
              className={`font-mono text-2xl sm:text-4xl ml-1 font-light ${
                isDark ? 'text-teal-400' : 'text-teal-600'
              }`}
            >
              %
            </span>
          </div>

          {/* Milestone Step Tracker & Precision Meter */}
          <div className="w-full max-w-xs sm:max-w-sm space-y-3">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono tracking-wider uppercase">
              <span className={isDark ? 'text-white/60' : 'text-black/60'}>
                {getStatusText(progress)}
              </span>
              <span
                className={`font-bold ${
                  isDark ? 'text-teal-400' : 'text-teal-600'
                }`}
              >
                {progress === 100 ? 'READY' : 'STANDBY'}
              </span>
            </div>

            {/* Precision Loading Meter with Trailing Glow Head */}
            <div
              className={`relative w-full h-[3px] rounded-full overflow-hidden ${
                isDark ? 'bg-white/10' : 'bg-black/10'
              }`}
            >
              <div
                className={`h-full transition-all duration-100 ease-out rounded-full relative ${
                  isDark
                    ? 'bg-gradient-to-r from-teal-400 to-white shadow-[0_0_14px_rgba(45,212,191,0.6)]'
                    : 'bg-gradient-to-r from-teal-600 to-black shadow-[0_0_12px_rgba(13,148,136,0.4)]'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Tagline & Stacks Footer */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-5 border-t text-[11px] sm:text-xs font-mono ${
            isDark
              ? 'border-white/10 text-white/60'
              : 'border-black/10 text-black/60'
          }`}
        >
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="font-medium">STACKS:</span>
            <span>Android · Kotlin · Flutter · Next.js · Laravel</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] sm:text-[11px]">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isDark ? 'bg-teal-400' : 'bg-teal-600'
              }`}
            />
            <span className="uppercase tracking-wider">
              {currentTheme === 'dark' ? 'DARK CANVAS' : 'LIGHT CANVAS'}
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
