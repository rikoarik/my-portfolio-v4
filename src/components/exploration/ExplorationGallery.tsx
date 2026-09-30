'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';

export interface ExplorationItem {
  id: string;
  title: string;
  category?: string;
  description?: string | null;
  image_url: string;
  link: string;
}

interface ExplorationGalleryProps {
  items: ExplorationItem[];
}

export function ExplorationGallery({ items }: ExplorationGalleryProps) {
  return (
    <div className="exploration-gallery">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{
            duration: 0.45,
            delay: (index % 4) * 0.06,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="h-full"
        >
          <a
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="exploration-card group"
          >
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="exploration-card__image"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            />
            <h2 className="exploration-card__title">
              <span>{item.title}</span>
              <svg
                className="exploration-card__arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </h2>
          </a>
        </motion.div>
      ))}
    </div>
  );
}
