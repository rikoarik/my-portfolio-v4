'use client';

import React from 'react';
import { motion } from 'motion/react';
import { SkillGroup, Skill } from '@/types/cms';

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
  return '#10b981';
};

export function HomeCapabilitiesCard({ groups }: HomeCapabilitiesCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="p-[var(--content-padding)] rounded-[var(--card-radius)] bg-[var(--surface)] border border-[var(--surface-border)] space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[var(--surface-border)] pb-4">
        <h2 className="text-sm font-medium text-[var(--text-primary)]">
          Technical Competencies
        </h2>
        <span className="text-xs font-mono text-[var(--accent-cyan)]">
          Engineering Matrix
        </span>
      </div>

      <div className="space-y-5">
        {groups.slice(0, 4).map((group) => (
          <div key={group.id} className="space-y-2.5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--text-secondary)]">
              {group.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(group.skills || []).map((skill: Skill) => {
                const isPrimary = skill.level === 'primary';
                const dotColor = getLanguageDotColor(skill.name);

                return (
                  <span
                    key={skill.id}
                    className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md border transition-all ${
                      isPrimary
                        ? 'bg-[var(--page-background)] text-[var(--text-primary)] border-[var(--surface-border)] font-medium hover:border-[var(--accent-cyan)]/40 shadow-sm'
                        : 'bg-[var(--surface-hover)] text-[var(--text-secondary)] border-transparent hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {isPrimary && (
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: dotColor }}
                      />
                    )}
                    <span>{skill.name}</span>
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
