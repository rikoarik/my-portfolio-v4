'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export function CurtainLoader() {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const clothPathRef = useRef<SVGPathElement>(null);
  const shadowPathRef = useRef<SVGPathElement>(null);
  const hemLineRef = useRef<SVGPathElement>(null);
  const foldsGroupRef = useRef<SVGGElement>(null);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsComplete(true);
      return;
    }

    // Lock page scroll during loader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Physics state for dynamic cloth pull
    const clothState = {
      y: 1000,
      arch: 0,
      shadowY: 1000,
      shadowArch: 0,
      foldsOpacity: 0,
      counter: 0,
    };

    // Helper: Dynamic cloth contour curve
    // Flat initially (arch=0), arches up in center when pulled
    const buildClothPath = (y: number, arch: number) => {
      const centerY = y - arch;
      const sagY = y + arch * 0.12;
      return `M 0 0 
        L 1000 0 
        L 1000 ${y} 
        C 780 ${sagY} 640 ${centerY} 500 ${centerY} 
        C 360 ${centerY} 220 ${sagY} 0 ${y} 
        Z`;
    };

    // Helper: Bottom hemline path
    const buildHemPath = (y: number, arch: number) => {
      const centerY = y - arch;
      const sagY = y + arch * 0.12;
      return `M 1000 ${y} 
        C 780 ${sagY} 640 ${centerY} 500 ${centerY} 
        C 360 ${centerY} 220 ${sagY} 0 ${y}`;
    };

    // Helper: Dynamic tension wrinkles forming along the pull
    const updateFolds = (y: number, arch: number, opacity: number) => {
      if (!foldsGroupRef.current) return;
      foldsGroupRef.current.style.opacity = `${opacity}`;

      const centerY = y - arch;
      const paths = foldsGroupRef.current.querySelectorAll('path');
      if (paths.length >= 5) {
        // Fold 1: Center tension ridge
        paths[0].setAttribute('d', `M 500 ${centerY} Q 500 ${(centerY) * 0.45} 500 0`);
        // Fold 2: Left-center fold
        paths[1].setAttribute('d', `M 500 ${centerY} Q 420 ${(centerY) * 0.55} 340 0`);
        // Fold 3: Right-center fold
        paths[2].setAttribute('d', `M 500 ${centerY} Q 580 ${(centerY) * 0.55} 660 0`);
        // Fold 4: Outer-left tension line
        paths[3].setAttribute('d', `M 500 ${centerY} Q 320 ${(centerY) * 0.65} 160 0`);
        // Fold 5: Outer-right tension line
        paths[4].setAttribute('d', `M 500 ${centerY} Q 680 ${(centerY) * 0.65} 840 0`);
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
      duration: 0.9,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.round(clothState.counter));
      },
    });

    // 2. Center typography floats up & fades out before cloth pull
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -24,
        duration: 0.28,
        ease: 'power2.in',
      },
      '+=0.06'
    );

    // 3. THE CLOTH PULL: Hoist cloth upward from bottom to top
    // The center is pulled up with tension arch, creating organic folds
    tl.to(
      clothState,
      {
        y: -140,
        duration: 1.05,
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
          updateFolds(clothState.y, clothState.arch, clothState.foldsOpacity);
        },
      },
      '-=0.08'
    );

    // Dynamic tension arch: grows as the cloth is pulled upward, flattens as it clears
    tl.to(
      clothState,
      {
        arch: 220,
        duration: 0.45,
        ease: 'power2.out',
      },
      '-=1.05'
    ).to(
      clothState,
      {
        arch: 0,
        duration: 0.6,
        ease: 'power2.in',
      },
      '-=0.6'
    );

    // Wrinkles/folds appear during pull tension, then fade away as cloth bunches at top
    tl.to(
      clothState,
      {
        foldsOpacity: 0.7,
        duration: 0.35,
        ease: 'power2.out',
      },
      '-=1.05'
    ).to(
      clothState,
      {
        foldsOpacity: 0,
        duration: 0.5,
        ease: 'power2.in',
      },
      '-=0.55'
    );

    // 4. Lagging Shadow Layer (under-layer following cloth pull for physical depth)
    tl.to(
      clothState,
      {
        shadowY: -140,
        shadowArch: 250,
        duration: 1.15,
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
      '-=1.02'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isComplete) {
    return null;
  }

  return (
    <aside
      ref={containerRef}
      aria-label="Loading portfolio presentation"
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden select-none"
    >
      {/* SVG Canvas for Flat Cloth Canvas & Dynamic Pull Simulation */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Flat Satin Cloth Gradient (Smooth, unpleated sheet) */}
          <linearGradient id="flatClothFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#080a0d" />
            <stop offset="50%" stopColor="#0c0f13" />
            <stop offset="100%" stopColor="#10141a" />
          </linearGradient>

          {/* Under-cloth Shadow Gradient */}
          <linearGradient id="clothShadowFill" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
            <stop offset="80%" stopColor="#040507" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
          </linearGradient>

          {/* Crease Shadow Gradient */}
          <linearGradient id="creaseShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.1" />
            <stop offset="70%" stopColor="#000000" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
          </linearGradient>

          {/* Crease Highlight Gradient */}
          <linearGradient id="creaseHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.22" />
          </linearGradient>

          {/* Heavy Real-world Cloth Drop Shadow */}
          <filter id="clothDropShadow" x="-10%" y="-10%" width="120%" height="150%">
            <feDropShadow
              dx="0"
              dy="35"
              stdDeviation="30"
              floodColor="#000000"
              floodOpacity="0.85"
            />
          </filter>
        </defs>

        {/* 1. Lagging Under-cloth Shadow Layer */}
        <path
          ref={shadowPathRef}
          d="M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z"
          fill="url(#clothShadowFill)"
          opacity="0.85"
        />

        {/* 2. Main Smooth Cloth Body (Starts 100% Flat & Solid) */}
        <path
          ref={clothPathRef}
          d="M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z"
          fill="url(#flatClothFill)"
          filter="url(#clothDropShadow)"
        />

        {/* 3. Dynamic Tension Wrinkles (Only appear when pulled upward) */}
        <g ref={foldsGroupRef} style={{ opacity: 0 }}>
          {/* Crease shadow lines */}
          <path d="M 500 1000 Q 500 450 500 0" stroke="url(#creaseShadow)" strokeWidth="18" fill="none" />
          <path d="M 500 1000 Q 420 550 340 0" stroke="url(#creaseShadow)" strokeWidth="14" fill="none" />
          <path d="M 500 1000 Q 580 550 660 0" stroke="url(#creaseShadow)" strokeWidth="14" fill="none" />
          <path d="M 500 1000 Q 320 650 160 0" stroke="url(#creaseShadow)" strokeWidth="10" fill="none" />
          <path d="M 500 1000 Q 680 650 840 0" stroke="url(#creaseShadow)" strokeWidth="10" fill="none" />

          {/* Adjacent highlight ridges for 3D fabric folds */}
          <path d="M 496 1000 Q 496 450 496 0" stroke="url(#creaseHighlight)" strokeWidth="4" fill="none" />
          <path d="M 494 1000 Q 416 550 336 0" stroke="url(#creaseHighlight)" strokeWidth="3" fill="none" />
          <path d="M 504 1000 Q 584 550 664 0" stroke="url(#creaseHighlight)" strokeWidth="3" fill="none" />
        </g>

        {/* 4. Fine Hemline Stitch Highlight */}
        <path
          ref={hemLineRef}
          d="M 1000 1000 L 0 1000"
          fill="none"
          stroke="rgba(255, 255, 255, 0.16)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Clean Flat Content: Counter & Minimalist Editorial Branding */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between p-8 sm:p-14 text-[#f8fafc]"
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-white/70 animate-pulse" />
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/90">
              Arik Riko Prasetya
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50">
            Portfolio © 2026
          </span>
        </div>

        {/* Center: Title & Dynamic Digital Counter */}
        <div className="flex flex-col items-center justify-center text-center my-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-white/60">
              Software Engineer · Portfolio
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white/95">
              Crafting Experiences
            </h1>
          </div>

          {/* Smooth Digital Counter */}
          <div className="flex items-baseline gap-1 font-mono text-5xl sm:text-7xl md:text-8xl font-normal tracking-tighter text-white">
            <span>{progress.toString().padStart(2, '0')}</span>
            <span className="text-2xl sm:text-3xl text-white/50 font-light">%</span>
          </div>

          {/* Minimalist Progress Meter Bar */}
          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-white/80 transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Tagline & Stacks */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-4 text-[11px] sm:text-xs font-mono text-white/60">
          <span>Android · Kotlin · Flutter · Next.js · Laravel</span>
          <span className="text-white/40 uppercase tracking-wider">
            Loading Workspace
          </span>
        </div>
      </div>
    </aside>
  );
}
