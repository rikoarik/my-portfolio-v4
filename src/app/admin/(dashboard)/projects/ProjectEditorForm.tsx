'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project, ContentStatus, ProjectSection } from '@/types/cms';
import { saveProjectAction } from '@/actions/cms';
import { Save, Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export function ProjectEditorForm({
  initialProject,
}: {
  initialProject?: Project;
}) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'overview' | 'casestudy' | 'tech' | 'links' | 'publishing'>('overview');

  // Overview Fields
  const [title, setTitle] = useState(initialProject?.title || '');
  const [slug, setSlug] = useState(initialProject?.slug || '');
  const [subtitle, setSubtitle] = useState(initialProject?.subtitle || '');
  const [summary, setSummary] = useState(initialProject?.summary || '');
  const [periodLabel, setPeriodLabel] = useState(initialProject?.period_label || '');
  const [role, setRole] = useState(initialProject?.role || '');
  const [projectType, setProjectType] = useState(initialProject?.project_type || '');
  const [platform, setPlatform] = useState(initialProject?.platform || '');
  const [featured, setFeatured] = useState(initialProject?.featured || false);
  const [coverImageUrl, setCoverImageUrl] = useState(initialProject?.cover_image_url || '');
  const [coverAltText, setCoverAltText] = useState(initialProject?.cover_alt_text || '');
  const [sortOrder, setSortOrder] = useState(initialProject?.sort_order || 1);
  const [status, setStatus] = useState<ContentStatus>(initialProject?.status || 'draft');

  // Case Study Sections
  const [sections, setSections] = useState<ProjectSection[]>(
    initialProject?.sections || [
      { id: '1', project_id: '', section_type: 'context', title: 'Context', body_md: '', sort_order: 1, status: 'published' },
      { id: '2', project_id: '', section_type: 'role', title: 'My Role', body_md: '', sort_order: 2, status: 'published' },
      { id: '3', project_id: '', section_type: 'built', title: 'What I Built', body_md: '', sort_order: 3, status: 'published' },
      { id: '4', project_id: '', section_type: 'decisions', title: 'Engineering Decisions', body_md: '', sort_order: 4, status: 'published' },
      { id: '5', project_id: '', section_type: 'integrations', title: 'Integrations', body_md: '', sort_order: 5, status: 'published' },
      { id: '6', project_id: '', section_type: 'challenges', title: 'Challenges', body_md: '', sort_order: 6, status: 'published' },
      { id: '7', project_id: '', section_type: 'result', title: 'Result', body_md: '', sort_order: 7, status: 'published' },
      { id: '8', project_id: '', section_type: 'stack', title: 'Technology Stack', body_md: '', sort_order: 8, status: 'published' },
    ]
  );

  // Technologies
  const [technologies, setTechnologies] = useState<string[]>(
    initialProject?.technologies?.map((t) => (typeof t === 'string' ? t : t.technology)) || []
  );
  const [techInput, setTechInput] = useState('');

  // Links
  const [repoUrl, setRepoUrl] = useState(initialProject?.repo_url || '');
  const [demoUrl, setDemoUrl] = useState(initialProject?.demo_url || '');
  const [storeUrl, setStoreUrl] = useState(initialProject?.store_url || '');

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleAddTech = () => {
    if (techInput.trim() && !technologies.includes(techInput.trim())) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput('');
    }
  };

  const handleRemoveTech = (t: string) => {
    setTechnologies(technologies.filter((tech) => tech !== t));
  };

  const handleSectionChange = (index: number, field: 'title' | 'body_md' | 'section_type', val: string) => {
    const updated = [...sections];
    updated[index] = { ...updated[index], [field]: val };
    setSections(updated);
  };

  const handleAddSection = () => {
    setSections([
      ...sections,
      {
        id: crypto.randomUUID(),
        project_id: '',
        section_type: 'custom',
        title: 'New Section',
        body_md: '',
        sort_order: sections.length + 1,
        status: 'published',
      },
    ]);
  };

  const handleRemoveSection = (index: number) => {
    setSections(sections.filter((_, idx) => idx !== index));
  };

  const handleSave = async (targetStatus?: ContentStatus) => {
    setIsSaving(true);
    setError(null);
    setSuccess(null);

    const newStatus = targetStatus || status;

    // Validate period: No project may use Present
    if (periodLabel.toLowerCase().includes('present')) {
      setError('Validation Error: No project may be marked as Present.');
      setIsSaving(false);
      return;
    }

    if (newStatus === 'published') {
      if (!title || !slug || !summary || !role || !coverImageUrl || !coverAltText) {
        setError('Cannot publish: Title, slug, summary, role, cover image, and cover alt text are required.');
        setIsSaving(false);
        return;
      }
      if (sections.length === 0 || !sections.some((s) => s.body_md && s.body_md.trim().length > 0)) {
        setError('Cannot publish: At least one case study section with content is required.');
        setIsSaving(false);
        return;
      }
    }

    try {
      await saveProjectAction({
        id: initialProject?.id,
        title,
        slug,
        subtitle: subtitle || null,
        summary,
        period_label: periodLabel,
        role,
        project_type: projectType || null,
        platform: platform || null,
        featured,
        cover_image_url: coverImageUrl,
        cover_alt_text: coverAltText,
        sort_order: Number(sortOrder),
        status: newStatus,
        technologies,
        repo_url: repoUrl || null,
        demo_url: demoUrl || null,
        store_url: storeUrl || null,
        sections: sections.map((s, idx) => ({
          id: s.id,
          section_type: s.section_type,
          title: s.title || null,
          body_md: s.body_md || null,
          sort_order: idx + 1,
        })),
      });

      setStatus(newStatus);
      setSuccess(`Project saved successfully with status "${newStatus}".`);
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save project.';
      setError(msg);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Notifications */}
      {error && (
        <div className="p-4 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#F87171] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="p-4 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#4ADE80] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[#27272A] pb-3">
        {(
          [
            { key: 'overview', label: '1. Overview' },
            { key: 'casestudy', label: '2. Case Study Content' },
            { key: 'tech', label: '3. Technologies' },
            { key: 'links', label: '4. Links & URLs' },
            { key: 'publishing', label: '5. Publishing' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`tap-target px-4 py-2 rounded-lg text-xs font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-[#10B981] text-white font-semibold'
                : 'bg-[#18181B] text-[#A1A1AA] hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Project Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                URL Slug
              </label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm font-mono focus:outline-none focus:border-[#3B82F6]"
                placeholder="e.g. puas-hub"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Subtitle
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="PPOB & Digital Product Mobile Application"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Summary (Elevator Pitch)
              </label>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Role
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="Mobile Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Period Label (NO &quot;Present&quot;)
              </label>
              <input
                type="text"
                required
                value={periodLabel}
                onChange={(e) => setPeriodLabel(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="Feb 2026 – Aug 2026"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Platform
              </label>
              <input
                type="text"
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="Android & iOS (Flutter)"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Project Type
              </label>
              <input
                type="text"
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="Client Product Delivery"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Cover Image URL
              </label>
              <input
                type="text"
                required
                value={coverImageUrl}
                onChange={(e) => setCoverImageUrl(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="/images/projects/puas-hub/cover.svg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Cover Alt Text (Accessible Description)
              </label>
              <input
                type="text"
                required
                value={coverAltText}
                onChange={(e) => setCoverAltText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="PUAS Hub transaction history and digital product screens"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
                Sort Order
              </label>
              <input
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              />
            </div>

            <div className="space-y-2 sm:col-span-2 flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded bg-[#09090B] border-[#27272A] text-[#10B981]"
              />
              <label htmlFor="featured" className="text-xs text-white font-medium cursor-pointer">
                Feature on Homepage Selected Work section
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CASE STUDY */}
      {activeTab === 'casestudy' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-xs text-[#A1A1AA]">
              Structured editorial sections for the deep-dive project case study.
            </p>
            <button
              type="button"
              onClick={handleAddSection}
              className="tap-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-[#10B981] text-xs font-mono"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Custom Section</span>
            </button>
          </div>

          <div className="space-y-4">
            {sections.map((section, idx) => (
              <div
                key={section.id || idx}
                className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-[#27272A]">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#27272A] flex items-center justify-center font-mono text-[10px] text-[#A1A1AA]">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={section.title || ''}
                      onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                      className="font-bold text-white text-sm bg-transparent border-b border-transparent focus:border-[#3B82F6] focus:outline-none"
                      placeholder="Section Title"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-[#71717A] uppercase">
                      {section.section_type}
                    </span>
                    {sections.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveSection(idx)}
                        className="p-1.5 text-[#71717A] hover:text-[#EF4444] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono text-[#A1A1AA]">
                    Markdown Content
                  </label>
                  <textarea
                    rows={5}
                    value={section.body_md || ''}
                    onChange={(e) => handleSectionChange(idx, 'body_md', e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white font-mono text-xs focus:outline-none focus:border-[#3B82F6]"
                    placeholder="Write detailed factual narrative..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TECHNOLOGIES */}
      {activeTab === 'tech' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Add Technology Tag
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                className="flex-1 px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
                placeholder="e.g. Flutter, Fastify, PostgreSQL"
              />
              <button
                type="button"
                onClick={handleAddTech}
                className="tap-target px-4 py-2.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-semibold"
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-xs font-mono text-[#A1A1AA]">Current Stack Tags:</p>
            <div className="flex flex-wrap gap-2">
              {technologies.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-xs font-mono"
                >
                  <span>{t}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTech(t)}
                    className="text-[#71717A] hover:text-[#EF4444]"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: LINKS */}
      {activeTab === 'links' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-5">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              GitHub Repository URL
            </label>
            <input
              type="url"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              placeholder="https://github.com/rikoarik/..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Live Demo URL
            </label>
            <input
              type="url"
              value={demoUrl}
              onChange={(e) => setDemoUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              App Store / Play Store URL
            </label>
            <input
              type="url"
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              placeholder="https://play.google.com/store/apps/..."
            />
          </div>
        </div>
      )}

      {/* TAB 5: PUBLISHING */}
      {activeTab === 'publishing' && (
        <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-white">Publishing Workflow</h3>
            <p className="text-xs text-[#A1A1AA]">
              Public visitors only see projects marked as <span className="text-[#4ADE80] font-mono">published</span>. Drafts are strictly hidden from public pages.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#09090B] border border-[#27272A] space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-[#A1A1AA]">Current Status:</span>
              <span className="text-white font-bold uppercase">{status}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A1A1AA]">Sections Authored:</span>
              <span className="text-white">{sections.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#A1A1AA]">Slug Target:</span>
              <span className="text-[#10B981]">/work/{slug || '...'}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              type="button"
              onClick={() => handleSave('published')}
              disabled={isSaving}
              className="tap-target px-6 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#15803D] text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              Publish Project to Live Site
            </button>

            <button
              type="button"
              onClick={() => handleSave('draft')}
              disabled={isSaving}
              className="tap-target px-6 py-2.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-semibold transition-colors disabled:opacity-50"
            >
              Save as Draft (Private)
            </button>
          </div>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="pt-4 flex items-center justify-between border-t border-[#27272A]">
        <button
          type="button"
          onClick={() => router.push('/admin/projects')}
          className="text-xs font-mono text-[#A1A1AA] hover:text-white"
        >
          Cancel &amp; Return
        </button>

        <button
          type="button"
          onClick={() => handleSave()}
          disabled={isSaving}
          className="tap-target inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold transition-colors disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>
    </div>
  );
}
