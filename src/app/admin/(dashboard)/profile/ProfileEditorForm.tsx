'use client';

import { useState } from 'react';
import Image from 'next/image';
import { SiteProfile } from '@/types/cms';
import { updateProfileAction } from '@/actions/cms';
import { Save, User } from 'lucide-react';

export function ProfileEditorForm({
  initialProfile,
}: {
  initialProfile: SiteProfile;
}) {
  const [formData, setFormData] = useState<SiteProfile>(initialProfile);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage(null);

    try {
      await updateProfileAction({
        full_name: formData.full_name,
        title: formData.title,
        descriptor: formData.descriptor,
        tagline_primary: formData.tagline_primary,
        tagline_secondary: formData.tagline_secondary,
        location: formData.location,
        email: formData.email,
        phone: formData.phone || null,
        github_url: formData.github_url || null,
        linkedin_url: formData.linkedin_url || null,
        website_url: formData.website_url || null,
        resume_url: formData.resume_url || null,
        avatar_url: formData.avatar_url || null,
      });
      setMessage({ type: 'success', text: 'Profile updated successfully and cache revalidated.' });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update profile.';
      setMessage({ type: 'error', text: msg });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      {/* Avatar Showcase */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6">
        <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[#10B981] shrink-0 shadow-lg">
          <Image
            src={formData.avatar_url || '/images/profile/ark.jpg'}
            alt={formData.full_name}
            width={80}
            height={80}
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="flex-1 space-y-1.5 w-full">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Profile Photo URL
          </label>
          <input
            type="text"
            value={formData.avatar_url || ''}
            onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
            placeholder="/images/profile/ark.jpg"
          />
          <p className="text-[11px] text-[#71717A]">
            Active photo path. Displayed across homepage profile card and about page.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-[#18181B] border border-[#27272A] rounded-xl p-6">
        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Full Name
          </label>
          <input
            type="text"
            required
            value={formData.full_name}
            onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Primary Title
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
          <p className="text-[11px] text-[#71717A]">
            Must remain: Software Engineer
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Descriptor Subtitle
          </label>
          <input
            type="text"
            required
            value={formData.descriptor}
            onChange={(e) => setFormData({ ...formData, descriptor: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
          <p className="text-[11px] text-[#71717A]">
            Standard: Mobile · Backend · Full-stack
          </p>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Primary Tagline
          </label>
          <textarea
            rows={2}
            required
            value={formData.tagline_primary}
            onChange={(e) => setFormData({ ...formData, tagline_primary: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Secondary Tagline
          </label>
          <textarea
            rows={2}
            required
            value={formData.tagline_secondary}
            onChange={(e) => setFormData({ ...formData, tagline_secondary: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Location
          </label>
          <input
            type="text"
            required
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            GitHub URL
          </label>
          <input
            type="url"
            value={formData.github_url || ''}
            onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            LinkedIn URL
          </label>
          <input
            type="url"
            value={formData.linkedin_url || ''}
            onChange={(e) => setFormData({ ...formData, linkedin_url: e.target.value })}
            className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#10B981]"
          />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <button
          type="submit"
          disabled={isSaving}
          className="tap-target inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold transition-colors disabled:opacity-50"
        >
          {isSaving ? (
            <span>Saving Changes...</span>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save Profile</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
