'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SkillGroup, Skill } from '@/types/cms';

import { useLanguage } from '@/context/LanguageContext';

interface HomeCapabilitiesCardProps {
  groups: SkillGroup[];
}

const getLanguageDotColor = (name: string): string => {
  const lower = name.toLowerCase();
  if (lower.includes('kotlin')) return '#7F52FF';
  if (lower.includes('dart') || lower.includes('flutter')) return '#02569B';
  if (lower.includes('typescript') || lower.includes('react')) return '#3178C6';
  if (lower.includes('go') || lower.includes('golang')) return '#00ACD7';
  if (lower.includes('postgresql') || lower.includes('sql')) return '#336791';
  if (lower.includes('node') || lower.includes('fastify')) return '#5FA04E';
  if (lower.includes('php') || lower.includes('laravel')) return '#FF2D20';
  return '#249D8F';
};

export function HomeCapabilitiesCard({ groups }: HomeCapabilitiesCardProps) {
  const { lang } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-[var(--content-padding)] rounded-[var(--card-radius)] bg-[var(--surface)] space-y-6 shadow-xs"
    >
      <div className="flex items-center justify-between pb-2">
        <h2 className="text-sm font-medium text-[var(--text-primary)]">
          {lang === 'id' ? 'Kompetensi Teknikal' : 'Technical Competencies'}
        </h2>
        <span className="text-xs font-mono text-[var(--text-secondary)]">
          {lang === 'id' ? 'Matriks Rekayasa' : 'Engineering Matrix'}
        </span>
      </div>

      <div className="space-y-5">
        {groups.slice(0, 4).map((group) => (
          <div key={group.id} className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
              {group.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(group.skills || []).map((skill: Skill) => (
                <span
                  key={skill.id}
                  className="inline-flex items-center text-xs px-3 py-1.5 rounded-md bg-[var(--switch-track)] text-[var(--text-primary)] transition-all font-normal"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
