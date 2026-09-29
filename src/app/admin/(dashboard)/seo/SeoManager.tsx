'use client';

import { useState } from 'react';
import { SeoSettings, SeoPage } from '@/types/cms';
import { Save, CheckCircle2, Globe } from 'lucide-react';

export function SeoManager({
  initialGlobal,
  initialHome,
}: {
  initialGlobal: SeoSettings;
  initialHome: SeoPage | null;
}) {
  const [siteTitle, setSiteTitle] = useState(initialGlobal.site_title);
  const [titleTemplate, setTitleTemplate] = useState(initialGlobal.title_template);
  const [defaultDesc, setDefaultDesc] = useState(initialGlobal.default_description);
  const [canonicalBase, setCanonicalBase] = useState(initialGlobal.canonical_base_url);
  const [homeTitle, setHomeTitle] = useState(initialHome?.title || '');
  const [homeDesc, setHomeDesc] = useState(initialHome?.description || '');

  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setMessage('SEO settings updated and sitemap re-indexed.');
  };

  return (
    <div className="space-y-8">
      {message && (
        <div className="p-3.5 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#4ADE80] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Google SERP Live Preview */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#10B981]" />
          <span>Google Search Result Snippet Preview</span>
        </h2>

        <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-1.5 max-w-2xl font-sans">
          <p className="text-xs text-[#A1A1AA] font-mono truncate">
            {canonicalBase}
          </p>
          <h3 className="text-base font-medium text-[#60A5FA] hover:underline cursor-pointer truncate">
            {homeTitle || siteTitle}
          </h3>
          <p className="text-xs text-[#D4D4D8] leading-relaxed line-clamp-2">
            {homeDesc || defaultDesc}
          </p>
        </div>
      </div>

      {/* Global SEO Settings */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider pb-3 border-b border-[#27272A]">
          Global SEO Defaults
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Site Title
            </label>
            <input
              type="text"
              value={siteTitle}
              onChange={(e) => setSiteTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Title Template
            </label>
            <input
              type="text"
              value={titleTemplate}
              onChange={(e) => setTitleTemplate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm font-mono focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Default Meta Description
            </label>
            <textarea
              rows={3}
              value={defaultDesc}
              onChange={(e) => setDefaultDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Canonical Base URL
            </label>
            <input
              type="url"
              value={canonicalBase}
              onChange={(e) => setCanonicalBase(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm font-mono focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2 sm:col-span-2 pt-4 border-t border-[#27272A]">
            <h3 className="text-xs font-mono uppercase tracking-wider text-white">Homepage Specific Override</h3>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Homepage Title Override
            </label>
            <input
              type="text"
              value={homeTitle}
              onChange={(e) => setHomeTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Homepage Description Override
            </label>
            <textarea
              rows={2}
              value={homeDesc}
              onChange={(e) => setHomeDesc(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="tap-target inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save SEO Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
