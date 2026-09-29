'use client';

import { useState } from 'react';
import { FeaturedRepository } from '@/types/cms';
import { Eye, EyeOff, Save, CheckCircle2 } from 'lucide-react';

export function RepositoriesManager({
  initialRepos,
}: {
  initialRepos: FeaturedRepository[];
}) {
  const [repos, setRepos] = useState<FeaturedRepository[]>(initialRepos);
  const [message, setMessage] = useState<string | null>(null);

  const toggleVisibility = (id: string) => {
    setRepos(
      repos.map((r) => {
        if (r.id === id) {
          return { ...r, visible: !r.visible };
        }
        return r;
      })
    );
    setMessage('Visibility updated. Click Save to persist.');
  };

  const handleFieldChange = (id: string, field: 'title_override' | 'description_override', val: string) => {
    setRepos(
      repos.map((r) => {
        if (r.id === id) {
          return { ...r, [field]: val };
        }
        return r;
      })
    );
  };

  const handleSaveAll = () => {
    setMessage('All repository display overrides saved.');
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="p-3.5 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#4ADE80] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="space-y-4">
        {repos.map((repo, idx) => (
          <div
            key={repo.id}
            className={`p-5 rounded-xl border transition-all ${
              repo.visible
                ? 'bg-[#18181B] border-[#27272A]'
                : 'bg-[#18181B]/40 border-[#27272A]/50 opacity-70'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#27272A]">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#A1A1AA]">0{idx + 1}</span>
                  <span className="font-bold text-white text-sm font-mono">{repo.repo_full_name}</span>
                </div>
                <p className="text-xs text-[#71717A] font-mono">
                  Target: {repo.url || `https://github.com/${repo.repo_full_name}`}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => toggleVisibility(repo.id)}
                  className={`tap-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                    repo.visible
                      ? 'bg-[#16A34A]/20 text-[#4ADE80] border border-[#16A34A]/40'
                      : 'bg-[#27272A] text-[#A1A1AA]'
                  }`}
                >
                  {repo.visible ? (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Visible</span>
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Hidden</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase">
                  Display Title Override
                </label>
                <input
                  type="text"
                  value={repo.title_override || ''}
                  onChange={(e) => handleFieldChange(repo.id, 'title_override', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-xs font-mono focus:outline-none focus:border-[#3B82F6]"
                  placeholder="e.g. Frontend-Lembar"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono text-[#A1A1AA] uppercase">
                  Description Override
                </label>
                <input
                  type="text"
                  value={repo.description_override || ''}
                  onChange={(e) => handleFieldChange(repo.id, 'description_override', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-xs focus:outline-none focus:border-[#3B82F6]"
                  placeholder="Concise technical summary"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleSaveAll}
          className="tap-target inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Repositories</span>
        </button>
      </div>
    </div>
  );
}
