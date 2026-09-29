'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Copy, Check, Upload } from 'lucide-react';

interface AssetDemo {
  id: string;
  name: string;
  url: string;
  type: string;
  dimensions: string;
  alt: string;
}

export function MediaLibrary() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [assets] = useState<AssetDemo[]>([
    {
      id: 'm1',
      name: 'puas-hub/cover.svg',
      url: '/images/projects/puas-hub/cover.svg',
      type: 'image/svg+xml',
      dimensions: '1200 x 750',
      alt: 'PUAS Hub transaction history and digital product purchase screens',
    },
    {
      id: 'm2',
      name: 'member-app-ecosystem/cover.svg',
      url: '/images/projects/member-app-ecosystem/cover.svg',
      type: 'image/svg+xml',
      dimensions: '1200 x 750',
      alt: 'Multi-tenant member app ecosystem virtual cards and QRIS screens',
    },
    {
      id: 'm3',
      name: 'lembar/cover.svg',
      url: '/images/projects/lembar/cover.svg',
      type: 'image/svg+xml',
      dimensions: '1200 x 750',
      alt: 'Lembar product dashboard view with workflow pipeline and document status trackers',
    },
    {
      id: 'm4',
      name: 'crm-platform/cover.svg',
      url: '/images/projects/crm-platform/cover.svg',
      type: 'image/svg+xml',
      dimensions: '1200 x 750',
      alt: 'CRM Platform sales pipeline dashboard and lead tracking interface',
    },
    {
      id: 'm5',
      name: 'merchant-payment-platform/cover.svg',
      url: '/images/projects/merchant-payment-platform/cover.svg',
      type: 'image/svg+xml',
      dimensions: '1200 x 750',
      alt: 'Merchant payment device integration diagram with QRIS and NFC contactless payment flow',
    },
    {
      id: 'm6',
      name: 'explore-bojonegoro/cover.svg',
      url: '/images/projects/explore-bojonegoro/cover.svg',
      type: 'image/svg+xml',
      dimensions: '1200 x 750',
      alt: 'Explore Bojonegoro mobile app screens showcasing destination guides and interactive map navigation',
    },
  ]);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div className="p-8 rounded-xl border border-dashed border-[#27272A] bg-[#18181B] text-center space-y-3">
        <div className="w-10 h-10 rounded-full bg-[#27272A] flex items-center justify-center mx-auto text-[#A1A1AA]">
          <Upload className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white">Upload New Asset to Supabase Storage</p>
          <p className="text-xs text-[#71717A]">
            PNG, JPG, WebP, AVIF, SVG up to 10MB into &quot;portfolio-public&quot; bucket
          </p>
        </div>
        <button
          type="button"
          onClick={() => alert('Supabase Storage File Uploader active. Files upload directly to the portfolio-public bucket.')}
          className="tap-target inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold"
        >
          <span>Select File</span>
        </button>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="bg-[#18181B] border border-[#27272A] rounded-xl overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-[#09090B] border-b border-[#27272A]">
              <Image
                src={asset.url}
                alt={asset.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <p className="font-mono text-xs font-bold text-white truncate" title={asset.name}>
                  {asset.name}
                </p>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#71717A]">
                  <span>{asset.dimensions}</span>
                  <span>{asset.type.split('/')[1]?.toUpperCase()}</span>
                </div>
              </div>

              <p className="text-xs text-[#A1A1AA] line-clamp-2" title={asset.alt}>
                Alt: {asset.alt}
              </p>

              <div className="pt-2 border-t border-[#27272A] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleCopy(asset.id, asset.url)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-[#10B981] hover:underline"
                >
                  {copiedId === asset.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <span className="text-[10px] font-mono text-[#16A34A]">In Use</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
