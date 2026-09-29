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
  const foldsGroupRef = useRef<SVGGElement>(null);

  // Sync theme with DOM and localStorage
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
    // Flat initially (arch=0), arches up in center when pulled with natural drape on flanks
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

    // Helper: Dynamic tension wrinkles forming along the pull apex
    const updateFolds = (y: number, arch: number, opacity: number) => {
      if (!foldsGroupRef.current) return;
      foldsGroupRef.current.style.opacity = `${opacity}`;

      const centerY = y - arch;
      const shadows = foldsGroupRef.current.querySelectorAll('.crease-shadow');
      const highlights = foldsGroupRef.current.querySelectorAll('.crease-highlight');

      if (shadows.length >= 5) {
        shadows[0].setAttribute('d', `M 500 ${centerY} Q 500 ${centerY * 0.45} 500 0`);
        shadows[1].setAttribute('d', `M 495 ${centerY} Q 425 ${centerY * 0.52} 350 0`);
        shadows[2].setAttribute('d', `M 505 ${centerY} Q 575 ${centerY * 0.52} 650 0`);
        shadows[3].setAttribute('d', `M 490 ${centerY} Q 330 ${centerY * 0.62} 180 0`);
        shadows[4].setAttribute('d', `M 510 ${centerY} Q 670 ${centerY * 0.62} 820 0`);
      }

      if (highlights.length >= 5) {
        highlights[0].setAttribute('d', `M 497 ${centerY} Q 497 ${centerY * 0.45} 497 0`);
        highlights[1].setAttribute('d', `M 492 ${centerY} Q 422 ${centerY * 0.52} 347 0`);
        highlights[2].setAttribute('d', `M 508 ${centerY} Q 578 ${centerY * 0.52} 653 0`);
        highlights[3].setAttribute('d', `M 487 ${centerY} Q 327 ${centerY * 0.62} 177 0`);
        highlights[4].setAttribute('d', `M 513 ${centerY} Q 673 ${centerY * 0.62} 823 0`);
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
      duration: 0.85,
      ease: 'power2.out',
      onUpdate: () => {
        setProgress(Math.round(clothState.counter));
      },
    });

    // 2. Center counter fades out cleanly before cloth pull
    tl.to(
      contentRef.current,
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.24,
        ease: 'power2.in',
      },
      '+=0.06'
    );

    // 3. THE CLOTH PULL: Hoist cloth upward from bottom to top
    tl.to(
      clothState,
      {
        y: -140,
        duration: 1.0,
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
      '-=0.06'
    );

    // Dynamic tension arch
    tl.to(
      clothState,
      {
        arch: 220,
        duration: 0.45,
        ease: 'power2.out',
      },
      '-=1.0'
    ).to(
      clothState,
      {
        arch: 0,
        duration: 0.55,
        ease: 'power2.in',
      },
      '-=0.55'
    );

    // Tension wrinkles appear during pull, then disappear as cloth bunches at top
    tl.to(
      clothState,
      {
        foldsOpacity: 0.75,
        duration: 0.35,
        ease: 'power2.out',
      },
      '-=1.0'
    ).to(
      clothState,
      {
        foldsOpacity: 0,
        duration: 0.45,
        ease: 'power2.in',
      },
      '-=0.5'
    );

    // 4. Lagging Shadow Layer
    tl.to(
      clothState,
      {
        shadowY: -140,
        shadowArch: 250,
        duration: 1.08,
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
      '-=0.96'
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

  return (
    <aside
      ref={containerRef}
      aria-label="Loading"
      className="fixed inset-0 z-[9999] pointer-events-auto overflow-hidden select-none"
    >
      {/* SVG Canvas for Cloth Sheet and Physics Pull */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Main Cloth Body Fill: #090b0e (Dark) vs #ffffff (Light) */}
          <linearGradient id="themeClothFill" x1="0%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#090b0e" />
                <stop offset="50%" stopColor="#0d1015" />
                <stop offset="100%" stopColor="#12161d" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#f1f5f9" />
              </>
            )}
          </linearGradient>

          {/* Under-cloth Shadow Gradient */}
          <linearGradient id="themeClothShadowFill" x1="0%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#000000" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.98" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.25" />
              </>
            )}
          </linearGradient>

          {/* Dynamic Crease Shadow */}
          <linearGradient id="themeCreaseShadow" x1="0%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#000000" stopOpacity="0.05" />
                <stop offset="70%" stopColor="#000000" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#0f172a" stopOpacity="0.02" />
                <stop offset="70%" stopColor="#0f172a" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0.25" />
              </>
            )}
          </linearGradient>

          {/* Dynamic Crease Highlight */}
          <linearGradient id="themeCreaseHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            {isDark ? (
              <>
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.12" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.95" />
              </>
            )}
          </linearGradient>

          {/* Cloth Drop Shadow Filter */}
          <filter id="themeClothDropShadow" x="-10%" y="-10%" width="120%" height="150%">
            <feDropShadow
              dx="0"
              dy={isDark ? 32 : 24}
              stdDeviation={isDark ? 28 : 20}
              floodColor={isDark ? '#000000' : '#0f172a'}
              floodOpacity={isDark ? 0.85 : 0.18}
            />
          </filter>
        </defs>

        {/* 1. Lagging Under-cloth Shadow Layer */}
        <path
          ref={shadowPathRef}
          d="M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z"
          fill="url(#themeClothShadowFill)"
          opacity={isDark ? 0.85 : 0.7}
        />

        {/* 2. Main Smooth Cloth Body */}
        <path
          ref={clothPathRef}
          d="M 0 0 L 1000 0 L 1000 1000 L 0 1000 Z"
          fill="url(#themeClothFill)"
          filter="url(#themeClothDropShadow)"
        />

        {/* 3. Dynamic Tension Wrinkles */}
        <g ref={foldsGroupRef} style={{ opacity: 0 }}>
          <path className="crease-shadow" d="M 500 1000 Q 500 450 500 0" stroke="url(#themeCreaseShadow)" strokeWidth="16" fill="none" />
          <path className="crease-shadow" d="M 495 1000 Q 425 500 350 0" stroke="url(#themeCreaseShadow)" strokeWidth="12" fill="none" />
          <path className="crease-shadow" d="M 505 1000 Q 575 500 650 0" stroke="url(#themeCreaseShadow)" strokeWidth="12" fill="none" />
          <path className="crease-shadow" d="M 490 1000 Q 330 600 180 0" stroke="url(#themeCreaseShadow)" strokeWidth="9" fill="none" />
          <path className="crease-shadow" d="M 510 1000 Q 670 600 820 0" stroke="url(#themeCreaseShadow)" strokeWidth="9" fill="none" />

          <path className="crease-highlight" d="M 497 1000 Q 497 450 497 0" stroke="url(#themeCreaseHighlight)" strokeWidth="4" fill="none" />
          <path className="crease-highlight" d="M 492 1000 Q 422 500 347 0" stroke="url(#themeCreaseHighlight)" strokeWidth="3" fill="none" />
          <path className="crease-highlight" d="M 508 1000 Q 578 500 653 0" stroke="url(#themeCreaseHighlight)" strokeWidth="3" fill="none" />
          <path className="crease-highlight" d="M 487 1000 Q 327 600 177 0" stroke="url(#themeCreaseHighlight)" strokeWidth="2.5" fill="none" />
          <path className="crease-highlight" d="M 513 1000 Q 673 600 823 0" stroke="url(#themeCreaseHighlight)" strokeWidth="2.5" fill="none" />
        </g>

        {/* 4. Fine Hemline Edge */}
        <path
          ref={hemLineRef}
          d="M 1000 1000 L 0 1000"
          fill="none"
          stroke={isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.15)'}
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Minimalist Centerpiece: Clean Digital Counter Only */}
      <div
        ref={contentRef}
        className={`relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none transition-colors duration-300 ${
          isDark ? 'text-white' : 'text-[#090b0e]'
        }`}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-baseline font-mono text-7xl sm:text-9xl font-light tracking-tighter tabular-nums">
            <span>{progress.toString().padStart(2, '0')}</span>
            <span
              className={`text-2xl sm:text-4xl font-extralight ml-1 ${
                isDark ? 'text-white/40' : 'text-black/40'
              }`}
            >
              %
            </span>
          </div>

          {/* Minimalist Progress Meter Bar */}
          <div
            className={`w-36 sm:w-48 h-[2px] rounded-full overflow-hidden ${
              isDark ? 'bg-white/10' : 'bg-black/10'
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-100 ease-out ${
                isDark ? 'bg-white' : 'bg-[#090b0e]'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
