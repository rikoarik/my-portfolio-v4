import React from 'react';
import Image from 'next/image';
import { ExplorationGallery, type ExplorationItem } from '@/components/exploration/ExplorationGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Exploration · Arik Riko Prasetya : Engineering Lab',
  description:
    'A curated collection of micro-experiments, protocol implementations, and technical prototypes exploring mobile architectures, hardware communication, and full-stack systems.',
  alternates: {
    canonical: 'https://arklabs.my.id/exploration',
  },
};

const EXPLORATION_ITEMS: ExplorationItem[] = [
  {
    id: 'exp-thermal-pos',
    title: 'Thermal Bluetooth Protocol',
    category: 'Hardware & Mobile',
    description: 'Custom ESC/POS binary command stream encoder and Bluetooth LE serial driver for mobile receipt printers.',
    image_url: '/images/exploration/thermal-pos.webp',
    link: 'https://github.com/rikoarik/Puas-app',
  },
  {
    id: 'exp-nfc-reader',
    title: 'NFC ISO 14443 Reader',
    category: 'Hardware & IoT',
    description: 'Contactless smartcard APDU command processor and Mifare card sector reader for high-throughput mobile verification.',
    image_url: '/images/exploration/nfc-reader.webp',
    link: 'https://github.com/rikoarik',
  },
  {
    id: 'exp-offline-sync',
    title: 'Offline-First Sync Engine',
    category: 'Distributed Systems',
    description: 'Two-way delta reconciliation engine with local SQLite storage, mutation queues, and automatic vector clock merge.',
    image_url: '/images/exploration/offline-sync.webp',
    link: 'https://github.com/rikoarik/crm-frontend',
  },
  {
    id: 'exp-realtime-pos',
    title: 'Realtime POS State Stream',
    category: 'Real-time & Telemetry',
    description: 'Sub-second multi-terminal transaction sync pipeline powered by WebSocket state distribution and conflict-free replicas.',
    image_url: '/images/exploration/realtime-pos.webp',
    link: 'https://github.com/rikoarik/crm-backend',
  },
  {
    id: 'exp-qris-parser',
    title: 'QRIS EMVCo Payload Parser',
    category: 'Fintech & Security',
    description: 'High-speed Tag-Length-Value (TLV) QRIS specification decoder validating EMVCo CRC-16 checksums directly on client devices.',
    image_url: '/images/exploration/qris-parser.webp',
    link: 'https://github.com/rikoarik/Frontend-Lembar',
  },
  {
    id: 'exp-clean-flutter',
    title: 'Clean Architecture Core',
    category: 'Mobile Architecture',
    description: 'Production-ready Flutter foundation featuring reactive BLoC state isolation, declarative routing, and strict layer decoupling.',
    image_url: '/images/exploration/clean-flutter.webp',
    link: 'https://github.com/rikoarik/ExploreBojonegoro',
  },
];

export default function ExplorationPage() {
  return (
    <div className="exploration-page">
      {/* LEFT COLUMN: Sticky Exploration Hero Banner */}
      <figure className="exploration-hero">
        <Image
          src="/images/exploration/hero.webp"
          alt="Engineering Exploration Showcase"
          fill
          priority
          className="exploration-hero__image"
          sizes="(min-width: 1024px) 50vw, 100vw"
        />
        <figcaption className="exploration-hero__caption">
          Engineering Lab
        </figcaption>
      </figure>

      {/* RIGHT COLUMN: Intro Card & Exploration Gallery */}
      <div className="exploration-content">
        {/* Intro Card */}
        <section className="exploration-intro">
          <h1>Exploration</h1>
          <p>
            A curated collection of micro-experiments, protocol implementations, and technical prototypes exploring mobile architectures, hardware communication, and full-stack systems.
          </p>
        </section>

        {/* Exploration Gallery Grid with Clean Motion */}
        <ExplorationGallery items={EXPLORATION_ITEMS} />
      </div>
    </div>
  );
}
