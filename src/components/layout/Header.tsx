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

          {/* Controls: Mode Switch & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <AppearanceSwitch />

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

        {/* Right Carved Topbar: Language Switcher (ID / EN) in Pojok Kanan */}
        <aside className="site-header-right" aria-label="Language selection">
          <button
            type="button"
            onClick={toggleLang}
            className="lang-corner-toggle inline-flex items-center gap-1 font-mono text-xs tracking-wider cursor-pointer text-[var(--text-primary)]"
            aria-label={`Switch language. Currently ${lang.toUpperCase()}`}
            title={`Switch language. Currently ${lang.toUpperCase()}`}
          >
            <span
              className={`px-1.5 py-0.5 rounded transition-all ${
                lang === 'id'
                  ? 'font-bold text-[var(--contrast-text)] bg-[var(--contrast-background)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              ID
            </span>
            <span className="text-[var(--text-secondary)] opacity-40">/</span>
            <span
              className={`px-1.5 py-0.5 rounded transition-all ${
                lang === 'en'
                  ? 'font-bold text-[var(--contrast-text)] bg-[var(--contrast-background)] shadow-xs'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              EN
            </span>
          </button>
        </aside>
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

          <div className="pt-4 mt-4 border-t border-[var(--switch-track)] flex items-center justify-between text-xs text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs uppercase text-[var(--text-secondary)]">Mode</span>
              <AppearanceSwitch />
            </div>
            <button
              type="button"
              onClick={toggleLang}
              className="font-mono text-xs uppercase px-2.5 py-1 rounded-md bg-[var(--surface-hover)] text-[var(--text-primary)] font-bold border border-[var(--surface-border)]"
              aria-label={`Switch to ${lang === 'en' ? 'Indonesian' : 'English'}`}
            >
              {lang === 'id' ? 'ID ➔ EN' : 'EN ➔ ID'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
