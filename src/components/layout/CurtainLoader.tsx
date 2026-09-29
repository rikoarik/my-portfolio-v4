'use client';

import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

export function CurtainLoader() {
  const [isComplete, setIsComplete] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const mainPathRef = useRef<SVGPathElement>(null);
  const shadowPathRef = useRef<SVGPathElement>(null);
  const trimPathRef = useRef<SVGPathElement>(null);
  const pleatsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsComplete(true);
      return;
    }

    // Lock page scroll during intro animation
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Animation state variables for GSAP interpolation
    const curtainState = {
      y: 1000,
      sag: 0,
      shadowY: 1000,
      shadowSag: 0,
      counter: 0,
    };

    // Helper to generate 5-segment draped scallop path
    const buildDrapePath = (y: number, sag: number) => {
      return `M 0 0 
        L 1000 0 
        L 1000 ${y} 
        Q 900 ${y + sag} 800 ${y} 
        Q 700 ${y + sag} 600 ${y} 
        Q 500 ${y + sag} 400 ${y} 
        Q 300 ${y + sag} 200 ${y} 
        Q 100 ${y + sag} 0 ${y} 
        Z`;
    };

    // Helper to generate only the bottom hem stroke line
    const buildHemTrimPath = (y: number, sag: number) => {
      return `M 1000 ${y} 
        Q 900 ${y + sag} 800 ${y} 
        Q 700 ${y + sag} 600 ${y} 
        Q 500 ${y + sag} 400 ${y} 
        Q 300 ${y + sag} 200 ${y} 
        Q 100 ${y + sag} 0 ${y}`;
    };

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = originalOverflow;
        setIsComplete(true);
      },
    });

    // 1. Smooth counter 0 -> 100%
    tl.to(curtainState, {
      counter: 100,
      duration: 0.95,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.round(curtainState.counter));
      },
    });

    // 2. Gentle fade & lift for center typography
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        y: -30,
        duration: 0.35,
        ease: 'power2.in',
      },
      '+=0.08'
    );

    // 3. Pleats wave & compression as tension builds
    if (pleatsContainerRef.current) {
      const pleats = pleatsContainerRef.current.children;
      tl.to(
        pleats,
        {
          scaleY: 0.96,
          opacity: 0.85,
          duration: 0.3,
          stagger: {
            each: 0.02,
            from: 'center',
          },
          ease: 'power1.out',
        },
        '-=0.3'
      );
    }

    // 4. MAIN CURTAIN PULL-UP: Lift from bottom to top with fabric drape scallops
    tl.to(
      curtainState,
      {
        y: -120,
        duration: 1.15,
        ease: 'power4.inOut',
        onUpdate: () => {
          if (mainPathRef.current) {
            mainPathRef.current.setAttribute(
              'd',
              buildDrapePath(curtainState.y, curtainState.sag)
            );
          }
          if (trimPathRef.current) {
            trimPathRef.current.setAttribute(
              'd',
              buildHemTrimPath(curtainState.y, curtainState.sag)
            );
          }
          if (pleatsContainerRef.current) {
            // Synchronize pleats height with the rising curtain
            const progressRatio = Math.max(0, curtainState.y / 1000);
            pleatsContainerRef.current.style.transform = `scaleY(${progressRatio})`;
          }
        },
      },
      '-=0.15'
    );

    // Dynamic Sag physics: fabric arches down during lift, then flattens at top
    tl.to(
      curtainState,
      {
        sag: 85,
        duration: 0.45,
        ease: 'power2.out',
      },
      '-=1.15'
    ).to(
      curtainState,
      {
        sag: 0,
        duration: 0.7,
        ease: 'power3.in',
      },
      '-=0.7'
    );

    // 5. Lagging Shadow Layer (under-curtain drape for physical depth)
    tl.to(
      curtainState,
      {
        shadowY: -120,
        shadowSag: 105,
        duration: 1.25,
        ease: 'power4.inOut',
        onUpdate: () => {
          if (shadowPathRef.current) {
            shadowPathRef.current.setAttribute(
              'd',
              buildDrapePath(curtainState.shadowY, curtainState.shadowSag)
            );
          }
        },
      },
      '-=1.12'
    );

    return () => {
      tl.kill();
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  if (isComplete) {
    return null;
  }

  // 10 vertical pleat ribs across the curtain for 3D fabric folds
  const pleatIndices = Array.from({ length: 10 }, (_, i) => i);

  return (
    <aside
      ref={containerRef}
      aria-label="Loading site presentation"
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden select-none"
    >
      {/* Dynamic SVG Curtain Layers with Scalloped Drapery Folds */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Main Curtain Gradient with woven textile depth */}
          <linearGradient id="curtainFabricGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0e1215" />
            <stop offset="50%" stopColor="#121619" />
            <stop offset="90%" stopColor="#161c21" />
            <stop offset="100%" stopColor="#1a2228" />
          </linearGradient>

          {/* Under-layer Shadow Gradient */}
          <linearGradient id="curtainShadowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#050708" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#080b0d" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
          </linearGradient>

          {/* Coral & Gold Hem Accent Gradient */}
          <linearGradient id="hemTrimGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF7F50" />
            <stop offset="35%" stopColor="#C49A45" />
            <stop offset="70%" stopColor="#FF7F50" />
            <stop offset="100%" stopColor="#C49A45" />
          </linearGradient>

          {/* Heavy Drapery Drop Shadow */}
          <filter id="curtainDropShadow" x="-10%" y="-10%" width="120%" height="140%">
            <feDropShadow
              dx="0"
              dy="30"
              stdDeviation="25"
              floodColor="#000000"
              floodOpacity="0.8"
            />
          </filter>
        </defs>

        {/* 1. Lagging Under-curtain Shadow Layer */}
        <path
          ref={shadowPathRef}
          d="M 0 0 L 1000 0 L 1000 1000 Q 900 1000 800 1000 Q 700 1000 600 1000 Q 500 1000 400 1000 Q 300 1000 200 1000 Q 100 1000 0 1000 Z"
          fill="url(#curtainShadowGradient)"
          opacity="0.8"
        />

        {/* 2. Primary Pleated Curtain Body with Deep Drop Shadow */}
        <path
          ref={mainPathRef}
          d="M 0 0 L 1000 0 L 1000 1000 Q 900 1000 800 1000 Q 700 1000 600 1000 Q 500 1000 400 1000 Q 300 1000 200 1000 Q 100 1000 0 1000 Z"
          fill="url(#curtainFabricGradient)"
          filter="url(#curtainDropShadow)"
        />

        {/* 3. Stitched Accent Trim along Scalloped Bottom Folds */}
        <path
          ref={trimPathRef}
          d="M 1000 1000 Q 900 1000 800 1000 Q 700 1000 600 1000 Q 500 1000 400 1000 Q 300 1000 200 1000 Q 100 1000 0 1000"
          fill="none"
          stroke="url(#hemTrimGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          opacity="0.9"
        />
      </svg>

      {/* 3D Vertical Pleat Ribs (Simulating cloth folds & drape lighting) */}
      <div
        ref={pleatsContainerRef}
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none grid grid-cols-10 origin-top h-full w-full"
      >
        {pleatIndices.map((idx) => (
          <div
            key={idx}
            className="h-full w-full border-r border-white/[0.02]"
            style={{
              background:
                idx % 2 === 0
                  ? 'linear-gradient(90deg, rgba(255,255,255,0.025) 0%, rgba(0,0,0,0.25) 100%)'
                  : 'linear-gradient(90deg, rgba(0,0,0,0.3) 0%, rgba(255,255,255,0.015) 100%)',
            }}
          />
        ))}
      </div>

      {/* Centerpiece Content & Progress Counter */}
      <div
        ref={contentRef}
        className="relative z-10 w-full h-full flex flex-col justify-between p-8 sm:p-14 text-[#f8fafc]"
      >
        {/* Top Header Tag */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[var(--page-background)] animate-pulse" />
            <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-white/90">
              Arik Riko Prasetya
            </span>
          </div>
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-white/50">
            Portfolio © 2026
          </span>
        </div>

        {/* Center Title & Counter */}
        <div className="flex flex-col items-center justify-center text-center my-auto space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono tracking-widest uppercase text-[var(--page-background)]">
              Software Engineer · Crafting Experiences
            </span>
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-tight text-white/95">
              Pulling The Curtain
            </h1>
          </div>

          {/* Smooth Digital Counter */}
          <div className="flex items-baseline gap-1 font-mono text-5xl sm:text-7xl md:text-8xl font-normal tracking-tighter text-white">
            <span>{progress.toString().padStart(2, '0')}</span>
            <span className="text-2xl sm:text-3xl text-[var(--page-background)] font-light">%</span>
          </div>

          {/* Minimalist Progress Meter Bar */}
          <div className="w-48 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--page-background)] transition-all duration-100 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Bottom Tagline & Stacks */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-white/10 pt-4 text-[11px] sm:text-xs font-mono text-white/60">
          <span>Android · Kotlin · Flutter · Next.js · Laravel</span>
          <span className="text-[var(--contrast-background)] uppercase tracking-wider">
            Unveiling Workspace
          </span>
        </div>
      </div>
    </aside>
  );
}
