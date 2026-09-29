'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
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
    { label: t('nav.contact'), href: '/contact' },
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
          <span className="font-medium text-[15px] tracking-tight text-[var(--text-primary)]">Ark</span>
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
                  isActive ? 'text-[var(--text-primary)] font-medium' : ''
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Controls: Minimal Language Switcher Pill (No text) & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleLang}
            className="lang-switch"
            data-lang={lang}
            aria-label={`Switch to ${lang === 'en' ? 'Indonesian' : 'English'}`}
            title={`Switch to ${lang === 'en' ? 'Indonesian' : 'English'}`}
          />

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

      {/* Mobile Menu Overlay. The header stays above it, so its own
          Menu/Close control is the only one — no duplicate brand row. */}
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

          <div className="pt-4 mt-4 border-t border-[var(--switch-track)] flex items-center text-xs text-[var(--text-secondary)]">
            <button
              type="button"
              onClick={toggleLang}
              className="lang-switch"
              data-lang={lang}
              aria-label={`Switch to ${lang === 'en' ? 'Indonesian' : 'English'}`}
            />
          </div>
        </div>
      )}
    </>
  );
}
