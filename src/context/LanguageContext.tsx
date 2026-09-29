'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'id';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.work': 'Work',
    'nav.about': 'About',
    'nav.exploration': 'Exploration',
    'nav.contact': 'Contact',
    'nav.menu': 'Menu',
    'nav.close': 'Close',

    // Hero / Selected Work
    'hero.system_status': 'SYS: PRODUCTION',
    'hero.selected_work': 'Selected Work',
    'hero.view_project': 'View Project',

    // Home Sections
    'home.latest_work': 'Latest Work',
    'home.view_all': 'View All',
    'home.experience': 'Experience',
    'home.capabilities': 'Capabilities & Stack',
    'home.all_projects': 'All Projects',
    'home.download_cv': 'Download My CV',
    'home.present': 'Present',
    'home.get_in_touch': 'Get In Touch',

    // Profile
    'profile.engineer_badge': 'SOFTWARE ENGINEER',
    'profile.title': 'Software Engineer',
    'profile.descriptor': 'Mobile · Backend · Full-stack',
    'profile.tagline': 'I build mobile apps, backend systems, and web products from idea to production.',
    'profile.location': 'Indonesia',

    // About
    'about.eyebrow': 'Engineering Biography',
    'about.title': 'About Ark',

    // Work
    'work.title': 'Work',
    'work.subtitle': 'Selected production projects across mobile engineering, backend architectures, payment systems, and full-stack web platforms.',
    'work.contact': 'Contact Me',
  },
  id: {
    // Navigation
    'nav.work': 'Karya',
    'nav.about': 'Tentang',
    'nav.exploration': 'Eksplorasi',
    'nav.contact': 'Kontak',
    'nav.menu': 'Menu',
    'nav.close': 'Tutup',

    // Hero / Selected Work
    'hero.system_status': 'STATUS: AKTIF',
    'hero.selected_work': 'Karya Terpilih',
    'hero.view_project': 'Lihat Proyek',

    // Home Sections
    'home.latest_work': 'Proyek Terbaru',
    'home.view_all': 'Lihat Semua',
    'home.experience': 'Pengalaman Kerja',
    'home.capabilities': 'Keahlian & Teknologi',
    'home.all_projects': 'Semua Proyek',
    'home.download_cv': 'Unduh CV',
    'home.present': 'Sekarang',
    'home.get_in_touch': 'Hubungi Saya',

    // Profile
    'profile.engineer_badge': 'SOFTWARE ENGINEER',
    'profile.title': 'Software Engineer',
    'profile.descriptor': 'Mobile · Backend · Full-stack',
    'profile.tagline': 'Membangun aplikasi mobile, sistem backend, dan produk web dari ide hingga produksi.',
    'profile.location': 'Indonesia',

    // About
    'about.eyebrow': 'Biografi Teknikal',
    'about.title': 'Tentang Ark',

    // Work
    'work.title': 'Karya',
    'work.subtitle': 'Kumpulan studi kasus proyek produksi di mobile engineering, arsitektur backend, sistem pembayaran, dan platform web full-stack.',
    'work.contact': 'Hubungi Saya',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    const saved = localStorage.getItem('ark_lang') as Language;
    if (saved === 'en' || saved === 'id') {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem('ark_lang', newLang);
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'id' : 'en';
    setLang(next);
  };

  const t = (key: string) => {
    return translations[lang]?.[key] || translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
