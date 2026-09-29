'use client';

import { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [locale, setLocale] = useState('en');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [navWork, setNavWork] = useState(true);
  const [navAbout, setNavAbout] = useState(true);
  const [navExperience, setNavExperience] = useState(true);
  const [navCapabilities, setNavCapabilities] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const handleSave = () => {
    setMessage('System settings updated.');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Site Settings
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Configure global site behaviors, navigation visibility, and system flags.
        </p>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#4ADE80] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-6">
        <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider pb-3 border-b border-[#27272A]">
          Navigation Items Visibility
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="flex items-center gap-3 p-3 rounded-lg bg-[#09090B] border border-[#27272A] cursor-pointer">
            <input
              type="checkbox"
              checked={navWork}
              onChange={(e) => setNavWork(e.target.checked)}
              className="w-4 h-4 rounded bg-[#18181B] border-[#27272A] text-[#2563EB]"
            />
            <span className="text-xs font-mono text-white">Show &quot;Work&quot; in Navigation</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg bg-[#09090B] border border-[#27272A] cursor-pointer">
            <input
              type="checkbox"
              checked={navAbout}
              onChange={(e) => setNavAbout(e.target.checked)}
              className="w-4 h-4 rounded bg-[#18181B] border-[#27272A] text-[#2563EB]"
            />
            <span className="text-xs font-mono text-white">Show &quot;About&quot; in Navigation</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg bg-[#09090B] border border-[#27272A] cursor-pointer">
            <input
              type="checkbox"
              checked={navExperience}
              onChange={(e) => setNavExperience(e.target.checked)}
              className="w-4 h-4 rounded bg-[#18181B] border-[#27272A] text-[#2563EB]"
            />
            <span className="text-xs font-mono text-white">Show &quot;Experience&quot; in Navigation</span>
          </label>

          <label className="flex items-center gap-3 p-3 rounded-lg bg-[#09090B] border border-[#27272A] cursor-pointer">
            <input
              type="checkbox"
              checked={navCapabilities}
              onChange={(e) => setNavCapabilities(e.target.checked)}
              className="w-4 h-4 rounded bg-[#18181B] border-[#27272A] text-[#2563EB]"
            />
            <span className="text-xs font-mono text-white">Show &quot;Capabilities&quot; in Navigation</span>
          </label>
        </div>

        <h2 className="text-sm font-bold text-white uppercase font-mono tracking-wider pt-6 pb-3 border-b border-[#27272A]">
          Locale &amp; Environment
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
              Site Locale
            </label>
            <select
              value={locale}
              onChange={(e) => setLocale(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg bg-[#09090B] border border-[#27272A] text-white text-xs focus:outline-none focus:border-[#3B82F6]"
            >
              <option value="en">English (Primary)</option>
              <option value="id">Indonesian</option>
            </select>
          </div>

          <div className="space-y-2 flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="maintenance"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              className="w-4 h-4 rounded bg-[#09090B] border-[#27272A] text-[#2563EB]"
            />
            <label htmlFor="maintenance" className="text-xs text-white font-medium cursor-pointer">
              Enable Maintenance Mode Banner
            </label>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            className="tap-target inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
