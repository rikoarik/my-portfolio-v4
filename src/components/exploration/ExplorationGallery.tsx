'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, GitBranch } from 'lucide-react';
import { motion } from 'motion/react';

export interface ExplorationItem {
  id: string;
  title: string;
  category: string;
  description?: string | null;
  image_url?: string;
  link: string;
  isExternal: boolean;
  tag: string;
}

interface ExplorationGalleryProps {
  items: ExplorationItem[];
}

export function ExplorationGallery({ items }: ExplorationGalleryProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--layout-gap)]">
      {items.map((item, index) => {
        const CardWrapper = item.isExternal ? 'a' : Link;
        const extraProps = item.isExternal
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {};

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{
              duration: 0.5,
              delay: (index % 4) * 0.08,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            <CardWrapper
              href={item.link}
              {...extraProps}
              className="interactive-card relative aspect-[3/4] rounded-[var(--card-radius)] overflow-hidden bg-[var(--surface-solid)] block group focus-visible:outline-none shadow-md"
            >
              {/* Top-Left Inverted Cutout Badge with Expanding Arrow */}
              <div className="card-badge-top-left">
                <span className="font-normal text-sm text-[var(--text-primary)]">
                  {item.title}
                </span>
                <span className="card-arrow inline-flex items-center">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                </span>
              </div>

              {/* Media Image */}
              {item.image_url ? (
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="card-image object-cover object-top"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-6 text-center text-xs font-mono text-[var(--text-secondary)]">
                  {item.title}
                </div>
              )}

              {/* Bottom Card Overlay with Description & Tag */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0e]/95 via-[#090a0e]/30 to-transparent flex flex-col justify-end p-5 text-white z-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono text-[var(--accent-cyan)] mb-1">
                  <GitBranch className="w-3 h-3" />
                  <span>{item.tag}</span>
                </div>
                <p className="text-xs text-white/80 line-clamp-2 font-light">
                  {item.description}
                </p>
              </div>
            </CardWrapper>
          </motion.div>
        );
      })}
    </div>
  );
}
