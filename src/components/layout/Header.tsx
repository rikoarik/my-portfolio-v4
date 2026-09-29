'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { AppearanceSwitch } from '@/components/theme/ThemeProvider';

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
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <>
      <div className="site-header-row">
        {/* Left Carved Topbar: Brand, Navigation, Dark/Light Mode Switch */}
        <header className="site-header">
          {/* Brand with Ark's actual photo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-[var(--text-primary)] hover:opacity-80 transition-opacity"
            aria-label="Ark Homepage"
          >
            <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 shadow-xs">
              <Image
                src="/images/profile/ark.jpg"
                alt="Ark"
                width={16}
                height={16}
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
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-colors hover:text-[var(--text-primary)] ${
                    isActive ? 'text-[var(--text-primary)] font-bold' : ''
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls: Mode Switch, Language Switcher & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <AppearanceSwitch />

            {/* Language Switcher (ID / EN) integrated seamlessly inside header */}
            <button
              type="button"
              onClick={toggleLang}
              className="inline-flex items-center gap-1 font-mono text-[11px] tracking-wider cursor-pointer text-[var(--text-primary)] px-2 py-1 rounded-full border border-[var(--surface-border)] bg-[var(--page-background)] hover:bg-[var(--surface-hover)] transition-colors"
              aria-label={`Switch language. Currently ${lang.toUpperCase()}`}
              title={`Switch language. Currently ${lang.toUpperCase()}`}
            >
              <span
                className={
                  lang === 'id'
                    ? 'font-bold text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] opacity-60'
                }
              >
                ID
              </span>
              <span className="text-[var(--text-secondary)] opacity-30">/</span>
              <span
                className={
                  lang === 'en'
                    ? 'font-bold text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] opacity-60'
                }
              >
                EN
              </span>
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-xs uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors px-1 py-0.5"
              aria-label="Toggle mobile menu"
            >
              {mobileOpen ? t('nav.close') : t('nav.menu')}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-[var(--page-background)]/95 backdrop-blur-xl px-6 pb-6 pt-16 flex flex-col md:hidden"
          role="dialog"
          aria-label="Mobile Navigation"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 shadow-md">
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

          <div className="flex-1" />

          <nav className="social-stack">
            {[{ label: 'Home', href: '/' }, ...navLinks].map((link) => {
              const isContact = link.href === '/contact';
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`social-card ${isContact ? 'social-card--contact' : ''}`}
                >
                  <span>{link.label}</span>
                  <span className="social-card__icons flex items-center justify-center">
                    <ArrowRight className="w-[18px] h-[18px] menu-card__arrow" />
                  </span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </>
  );
}
