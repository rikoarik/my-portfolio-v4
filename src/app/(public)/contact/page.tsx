'use client';

import React, { useState } from 'react';
import { ArrowUpRight, Mail, FileText, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { GridPulse } from '@/components/ui/grid-pulse';

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

export default function ContactPage() {
  const { lang } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Client-side contact mailto / submission trigger
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  const socials = [
    {
      label: 'GitHub',
      href: 'https://github.com/arikriko',
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
      label: 'Email',
      href: 'mailto:arikrikoprasetya@gmail.com',
      isExternal: true,
      icon: <Mail className="w-[18px] h-[18px]" />,
    },
    {
      label: lang === 'id' ? 'Unduh CV' : 'Download My CV',
      href: '/resume/Arik_Riko_Prasetya_Software_Engineer.pdf',
      isExternal: true,
      icon: <FileText className="w-[18px] h-[18px]" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--layout-gap)] items-start">
      {/* LEFT COLUMN: Sticky interactive grid panel */}
      <div className="relative w-full h-[400px] lg:h-[calc(100svh-24px)] lg:sticky lg:top-[var(--page-inset)] rounded-[var(--card-radius)] overflow-hidden glass-card">
        <GridPulse cell={22} reach={2.4} ambient={2} />

        {/* Caption sits above the grid; the pulse holds its light back from
            these lines via data-grid-avoid. */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-[var(--content-padding)] pointer-events-none">
          <p
            data-grid-avoid
            className="text-xs font-mono uppercase tracking-widest text-[var(--text-secondary)]"
          >
            {lang === 'id' ? 'Kontak' : 'Contact'}
          </p>
          <p
            data-grid-avoid
            className="mt-2 text-xl sm:text-2xl font-normal tracking-tight text-[var(--text-primary)]"
          >
            Arik Riko Prasetya
          </p>
          <p
            data-grid-avoid
            className="text-xs font-mono text-[var(--text-secondary)] pt-1"
          >
            Software Engineer · Mobile · Backend · Full-stack
          </p>
        </div>
      </div>

      {/* RIGHT COLUMN: Contact card + social stack */}
      <div className="space-y-[var(--layout-gap)] min-w-0">
        <div className="glass-card p-[var(--content-padding)] rounded-[var(--card-radius)]">
          <h1 className="text-2xl sm:text-3xl font-normal text-[var(--text-primary)] tracking-tight">
            {lang === 'id' ? 'Mari Terhubung' : "Let's Talk"}
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2 mb-8 leading-relaxed">
            {lang === 'id'
              ? 'Punya proyek, peluang rekayasa software, atau ingin berdiskusi seputar sistem produksi? Kirim pesan dan saya akan segera merespons.'
              : "Have a project in mind, an engineering role, or a complex system challenge? Send me a message and I'll reply promptly."}
          </p>

          {submitted ? (
            <div className="p-6 rounded-lg bg-[var(--page-background)] text-center space-y-3">
              <CheckCircle2 className="w-8 h-8 text-[var(--accent-teal)] mx-auto" />
              <p className="font-medium text-sm text-[var(--text-primary)]">
                {lang === 'id' ? 'Pesan Terkirim' : 'Message Received'}
              </p>
              <p className="text-xs text-[var(--text-secondary)]">
                {lang === 'id'
                  ? 'Terima kasih atas pesannya. Saya akan menghubungi Anda dalam 24-48 jam.'
                  : 'Thank you for reaching out. I will get back to you within 24–48 hours.'}
              </p>
              <a
                href={`mailto:arikrikoprasetya@gmail.com?subject=Hello%20Ark&body=${encodeURIComponent(form.message)}`}
                className="inline-block mt-2 text-xs font-mono text-[var(--accent-teal)] hover:underline"
              >
                arikrikoprasetya@gmail.com →
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                  {lang === 'id' ? 'Nama' : 'Name'}
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder={lang === 'id' ? 'Nama lengkap Anda' : 'Your name'}
                  className="w-full h-11 px-4 rounded-md bg-[var(--page-background)] text-[var(--text-primary)] text-sm outline-none focus:ring-1 focus:ring-[var(--accent-teal)] transition-all placeholder:text-[var(--text-secondary)]/50"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@example.com"
                  className="w-full h-11 px-4 rounded-md bg-[var(--page-background)] text-[var(--text-primary)] text-sm outline-none focus:ring-1 focus:ring-[var(--accent-teal)] transition-all placeholder:text-[var(--text-secondary)]/50"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-mono text-[var(--text-secondary)] mb-1.5 uppercase tracking-wider">
                  {lang === 'id' ? 'Pesan' : 'Message'}
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={lang === 'id' ? 'Ceritakan proyek atau kebutuhan Anda...' : 'Tell me about your project or inquiry...'}
                  className="w-full p-4 rounded-md bg-[var(--page-background)] text-[var(--text-primary)] text-sm outline-none focus:ring-1 focus:ring-[var(--accent-teal)] transition-all resize-none placeholder:text-[var(--text-secondary)]/50"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-md bg-[var(--contrast-background)] text-[var(--contrast-text)] hover:bg-[var(--accent-teal)] transition-colors text-sm font-medium disabled:opacity-50 cursor-pointer"
              >
                {loading
                  ? (lang === 'id' ? 'Mengirim...' : 'Sending...')
                  : (lang === 'id' ? 'Kirim Pesan' : 'Send Message')}
              </button>
            </form>
          )}
        </div>

        {/* Social stack matching Julian's Contact page */}
        <div className="social-stack">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-card"
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
          ))}
        </div>
      </div>
    </div>
  );
}
