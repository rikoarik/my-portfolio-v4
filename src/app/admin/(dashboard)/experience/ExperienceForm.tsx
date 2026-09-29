'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Experience, ContentStatus } from '@/types/cms';
import { saveExperienceAction, deleteExperienceAction } from '@/actions/cms';
import { Save, Trash2, Plus, X } from 'lucide-react';

export function ExperienceForm({
  initialData,
}: {
  initialData?: Experience;
}) {
  const router = useRouter();
  const [company, setCompany] = useState(initialData?.company || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [employmentType, setEmploymentType] = useState(initialData?.employment_type || 'Full Time');
  const [location, setLocation] = useState(initialData?.location || 'Indonesia');
  const [startDate, setStartDate] = useState(initialData?.start_date || '');
  const [endDate, setEndDate] = useState(initialData?.end_date || '');
  const [isCurrent, setIsCurrent] = useState(initialData?.is_current || false);
  const [summary, setSummary] = useState(initialData?.summary || '');
  const [bullets, setBullets] = useState<string[]>(initialData?.bullets || ['']);
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order || 1);
  const [status, setStatus] = useState<ContentStatus>(initialData?.status || 'published');

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddBullet = () => {
    setBullets([...bullets, '']);
  };

  const handleRemoveBullet = (index: number) => {
    setBullets(bullets.filter((_, idx) => idx !== index));
  };

  const handleBulletChange = (index: number, val: string) => {
    const updated = [...bullets];
    updated[index] = val;
    setBullets(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    // Frontend validation
    if (isCurrent && endDate) {
      setError('A role marked as Current cannot have an end date.');
      setIsSaving(false);
      return;
    }

    try {
      await saveExperienceAction({
        id: initialData?.id,
        company,
        role,
        employment_type: employmentType || null,
        location: location || null,
        start_date: startDate,
        end_date: isCurrent ? null : endDate || null,
        is_current: isCurrent,
        summary: summary || null,
        bullets: bullets.filter((b) => b.trim().length > 0),
        sort_order: Number(sortOrder),
        status,
      });

      router.push('/admin/experience');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving experience.';
      setError(msg);
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (!confirm('Are you sure you want to archive this experience entry?')) return;

    try {
      await deleteExperienceAction(initialData.id);
      router.push('/admin/experience');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error archiving experience.';
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
      {error && (
        <div className="p-3.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#F87171] text-xs">
          {error}
        </div>
      )}

      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Company Name
            </label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Job Title / Role
            </label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Employment Type
            </label>
            <input
              type="text"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
              placeholder="Full Time, Freelance, etc."
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Start Date
            </label>
            <input
              type="date"
              required
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              End Date
            </label>
            <input
              type="date"
              disabled={isCurrent}
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6] disabled:opacity-30"
            />
            {isCurrent && (
              <p className="text-[11px] text-[#A1A1AA] font-mono">
                Current role: end date disabled.
              </p>
            )}
          </div>

          <div className="space-y-2 sm:col-span-2 flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="is_current"
              checked={isCurrent}
              onChange={(e) => {
                setIsCurrent(e.target.checked);
                if (e.target.checked) setEndDate('');
              }}
              className="w-4 h-4 rounded bg-[#09090B] border-[#27272A] text-[#2563EB] focus:ring-0"
            />
            <label htmlFor="is_current" className="text-xs text-white font-medium cursor-pointer">
              This is my current ongoing role (Present)
            </label>
          </div>

          <div className="space-y-2 sm:col-span-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Role Summary (1-2 sentences)
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>
        </div>

        {/* Bullets */}
        <div className="space-y-3 pt-4 border-t border-[#27272A]">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Key Contributions &amp; Scope
            </label>
            <button
              type="button"
              onClick={handleAddBullet}
              className="text-xs text-[#10B981] hover:underline flex items-center gap-1 font-mono"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Bullet</span>
            </button>
          </div>

          <div className="space-y-2">
            {bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={bullet}
                  onChange={(e) => handleBulletChange(idx, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-xs focus:outline-none focus:border-[#10B981]"
                  placeholder="Detail contribution..."
                />
                {bullets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveBullet(idx)}
                    className="p-2 text-[#71717A] hover:text-[#EF4444] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Publishing & Order */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-[#27272A]">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Sort Order
            </label>
            <input
              type="number"
              value={sortOrder}
              onChange={(e) => setSortOrder(Number(e.target.value))}
              className="w-full px-3.5 py-2 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as ContentStatus)}
              className="w-full px-3.5 py-2 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-sm focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        {initialData?.id ? (
          <button
            type="button"
            onClick={handleDelete}
            className="tap-target inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#EF4444]/10 hover:bg-[#EF4444]/20 text-[#EF4444] text-xs font-medium transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Archive Experience</span>
          </button>
        ) : <div />}

        <button
          type="submit"
          disabled={isSaving}
          className="tap-target inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold transition-colors disabled:opacity-50"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isSaving ? 'Saving...' : 'Save Experience'}</span>
        </button>
      </div>
    </form>
  );
}
