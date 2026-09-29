'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

interface HeaderProps {
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
}

export function Header({}: HeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, t } = useLanguage();

  const navLinks = [
    { label: t('nav.work'), href: '/work' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.exploration'), href: '/exploration' },
    { label: t('nav.contact'), href: '/#contact' },
  ];

  return (
    <>
      <header className="site-header">
        {/* Brand with Ark's actual photo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-[var(--text-primary)] hover:opacity-85 transition-opacity"
          aria-label="Ark Homepage"
        >
          <div className="relative w-5 h-5 rounded-full overflow-hidden border border-[var(--surface-border)] shrink-0 shadow-xs">
            <Image
              src="/images/profile/ark.jpg"
              alt="Ark"
              width={20}
              height={20}
              className="w-full h-full object-cover object-top"
              priority
            />
          </div>
          <span className="font-semibold text-[15px] tracking-tight text-[var(--text-primary)]">Ark</span>
        </Link>

        {/* Primary Desktop Navigation */}
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
                  isActive ? 'text-[var(--text-primary)] font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Controls: Language Switcher (EN / ID) & Mobile Toggle */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={toggleLang}
            className="inline-flex items-center gap-1 h-6 px-2.5 rounded-full text-[11px] font-mono font-medium border border-[var(--surface-border)] bg-[var(--surface)] hover:border-[var(--accent-teal)] transition-all cursor-pointer shadow-xs"
            aria-label="Toggle language between English and Indonesian"
          >
            <span className={lang === 'en' ? 'text-[var(--accent-teal)] font-bold' : 'text-[var(--text-secondary)] opacity-60'}>
              EN
            </span>
            <span className="text-[var(--text-secondary)] opacity-35">/</span>
            <span className={lang === 'id' ? 'text-[var(--accent-teal)] font-bold' : 'text-[var(--text-secondary)] opacity-60'}>
              ID
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors px-1 py-0.5"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? t('nav.close') : t('nav.menu')}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[var(--page-background)]/98 backdrop-blur-lg p-6 flex flex-col justify-between md:hidden"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center justify-between pt-3 border-b border-[var(--surface-border)] pb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-[var(--accent-teal)] shrink-0 shadow-md">
                <Image
                  src="/images/profile/ark.jpg"
                  alt="Arik Riko Prasetya"
                  width={44}
                  height={44}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">
                  Arik Riko Prasetya
                </p>
                <p className="text-xs text-[var(--text-secondary)] font-mono">
                  Software Engineer
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="text-xs font-mono uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] p-2"
            >
              {t('nav.close')} ✕
            </button>
          </div>

          <nav className="flex flex-col gap-4 py-8">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="text-2xl font-light text-[var(--text-primary)] hover:text-[var(--accent-teal)] transition-colors flex items-center justify-between"
            >
              <span>Home</span>
              <span className="text-sm font-mono text-[var(--text-secondary)]">→</span>
            </Link>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-2xl font-light text-[var(--text-primary)] hover:text-[var(--accent-teal)] transition-colors flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-sm font-mono text-[var(--text-secondary)]">→</span>
              </Link>
            ))}
          </nav>

          <div className="pt-4 border-t border-[var(--surface-border)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--surface-border)] bg-[var(--surface)] font-mono"
            >
              <span className={lang === 'en' ? 'text-[var(--accent-teal)] font-bold' : 'opacity-60'}>EN</span>
              <span>/</span>
              <span className={lang === 'id' ? 'text-[var(--accent-teal)] font-bold' : 'opacity-60'}>ID</span>
            </button>
            <span className="font-mono text-[11px]">arkriko.com</span>
          </div>
        </div>
      )}
    </>
  );
}
