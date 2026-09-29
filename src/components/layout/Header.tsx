'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AppearanceSwitch } from '@/components/theme/ThemeProvider';

interface HeaderProps {
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
}

export function Header({}: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: 'Work', href: '/work' },
    { label: 'About', href: '/about' },
    { label: 'Exploration', href: '/exploration' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header className="site-header">
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--text-primary)] hover:opacity-80 transition-opacity"
          aria-label="Ark Homepage"
        >
          <div className="w-[18px] h-[18px] rounded-full bg-[var(--surface-hover)] border border-[var(--surface-border)] flex items-center justify-center text-[10px] font-bold text-[var(--text-primary)] overflow-hidden">
            A
          </div>
          <span className="font-medium text-[15px] tracking-tight">Ark</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5 text-sm text-[var(--text-secondary)]">
          {navLinks.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href) && link.href !== '/#contact';
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors hover:text-[var(--text-primary)] ${
                  isActive ? 'text-[var(--text-primary)] font-medium' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <AppearanceSwitch />
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-1 py-0.5"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[var(--page-background)]/95 backdrop-blur-md p-6 flex flex-col justify-between md:hidden"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between pt-3 border-b border-[var(--surface-border)] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--surface)] flex items-center justify-center text-sm font-bold text-[var(--text-primary)]">
                A
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  Arik Riko Prasetya
                </p>
                <p className="text-xs text-[var(--text-secondary)]">
                  Software Engineer
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="text-xs font-mono uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              Close ✕
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between py-3 text-2xl font-light text-[var(--text-primary)] border-b border-[var(--surface-border)]"
              >
                <span>{link.label}</span>
                <span className="text-sm opacity-50">→</span>
              </Link>
            ))}
          </nav>

          <div className="text-xs text-[var(--text-secondary)] font-mono pb-4">
            Available for Engineering Roles & Systems
          </div>
        </div>
      )}
    </>
  );
}
