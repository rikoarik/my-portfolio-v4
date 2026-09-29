'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, FileText, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function GithubIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-[18px] h-[18px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

interface HomeSocialCardsProps {
  email?: string;
  resumeUrl?: string;
}

export function HomeSocialCards({ resumeUrl }: HomeSocialCardsProps) {
  const { lang } = useLanguage();

  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/rikoarik',
      isExternal: true,
      icon: <GithubIcon />,
    },
    {
      label: 'LinkedIn',
      href: 'https://linkedin.com/in/arikriko',
      isExternal: true,
      icon: <LinkedinIcon />,
    },
    {
      label: lang === 'id' ? 'Unduh CV' : 'Download My CV',
      href: resumeUrl || '/resume/Arik_Riko_Prasetya_Software_Engineer.pdf',
      isExternal: true,
      icon: <FileText className="w-[18px] h-[18px]" />,
    },
    {
      label: lang === 'id' ? 'Hubungi Saya' : 'Contact Me',
      href: '/contact',
      isExternal: false,
      isContact: true,
      icon: <Send className="w-[18px] h-[18px]" />,
    },
  ];

  return (
    <div className="social-stack">
      {socials.map((item) => {
        const isContact = item.isContact;
        const className = `social-card ${isContact ? 'social-card--contact' : ''}`;

        if (item.isExternal) {
          return (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
            >
              <span>{item.label}</span>
              <span className="social-card__icons">
                <span className="social-card__icon flex items-center justify-center">
                  {item.icon}
                </span>
                <span className="social-card__icon social-card__icon--arrow flex items-center justify-center">
                  <ArrowUpRight className="w-[18px] h-[18px]" />
                </span>
              </span>
            </a>
          );
        }

        return (
          <Link key={item.label} href={item.href} className={className}>
            <span>{item.label}</span>
            <span className="social-card__icons">
              <span className="social-card__icon flex items-center justify-center">
                {item.icon}
              </span>
              <span className="social-card__icon social-card__icon--arrow flex items-center justify-center">
                <ArrowUpRight className="w-[18px] h-[18px]" />
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
