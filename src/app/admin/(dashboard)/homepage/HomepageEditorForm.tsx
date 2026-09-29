'use client';

import { useState } from 'react';
import { SiteSection, SectionKey } from '@/types/cms';
import { updateSectionAction } from '@/actions/cms';
import { Save } from 'lucide-react';

export function HomepageEditorForm({
  initialSections,
}: {
  initialSections: Record<string, SiteSection>;
}) {
  const [sections, setSections] = useState<Record<string, SiteSection>>(initialSections);
  const [activeTab, setActiveTab] = useState<SectionKey>('hero');
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const currentSection = sections[activeTab] || {
    id: '',
    section_key: activeTab,
    eyebrow: '',
    title: '',
    subtitle: '',
    body: '',
    status: 'published',
    sort_order: 1,
  };

  const handleFieldChange = (field: string, value: string) => {
    setSections({
      ...sections,
      [activeTab]: {
        ...currentSection,
        [field]: value,
      },
    });
  };

  const handleSaveCurrent = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      await updateSectionAction({
        section_key: activeTab,
        eyebrow: currentSection.eyebrow || null,
        title: currentSection.title || null,
        subtitle: currentSection.subtitle || null,
        body: currentSection.body || null,
        metadata: currentSection.metadata || {},
      });
      setMessage({ type: 'success', text: `Section "${activeTab}" saved and cache updated.` });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save section.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  const tabs: { key: SectionKey; label: string }[] = [
    { key: 'hero', label: 'Hero' },
    { key: 'selected_work', label: 'Selected Work' },
    { key: 'about', label: 'About' },
    { key: 'capabilities', label: 'Capabilities' },
    { key: 'github', label: 'GitHub' },
    { key: 'contact', label: 'Contact' },
  ];

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`p-3.5 rounded-lg text-xs ${
            message.type === 'success'
              ? 'bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#4ADE80]'
              : 'bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#F87171]'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#27272A] pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => {
              setActiveTab(tab.key);
              setMessage(null);
            }}
            className={`tap-target px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-[#2563EB] text-white font-semibold'
                : 'bg-[#18181B] text-[#A1A1AA] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Section Form */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
          <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider">
            Edit Section: {activeTab}
          </h2>
          <span className="text-[11px] text-[#A1A1AA] font-mono">
            Key: {currentSection.section_key}
          </span>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Eyebrow Label
            </label>
            <input
              type="text"
              value={currentSection.eyebrow || ''}
              onChange={(e) => handleFieldChange('eyebrow', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              placeholder="Section badge label"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Main Title / Heading
            </label>
            <input
              type="text"
              value={currentSection.title || ''}
              onChange={(e) => handleFieldChange('title', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              placeholder="Headline"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Subtitle / Lead Description
            </label>
            <textarea
              rows={2}
              value={currentSection.subtitle || ''}
              onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              placeholder="Lead copy"
            />
          </div>

          {(activeTab === 'about' || activeTab === 'hero' || activeTab === 'contact') && (
            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Body Narrative Content
              </label>
              <textarea
                rows={5}
                value={currentSection.body || ''}
                onChange={(e) => handleFieldChange('body', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="Detailed narrative copy..."
              />
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSaveCurrent}
            disabled={isSaving}
            className="tap-target inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isSaving ? 'Saving...' : `Save ${tabs.find((t) => t.key === activeTab)?.label} Section`}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
