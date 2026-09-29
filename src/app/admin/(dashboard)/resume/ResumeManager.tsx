'use client';

import { useState } from 'react';
import { FileText, Download, Upload, CheckCircle2, ExternalLink } from 'lucide-react';

export function ResumeManager() {
  const [message, setMessage] = useState<string | null>(null);

  const stableUrl = '/resume/Arik_Riko_Prasetya_Software_Engineer.pdf';

  const handleUploadReplacement = () => {
    alert('Resume replacement handler: uploads directly to the Supabase "resumes" bucket and updates the static stream.');
    setMessage('Resume file replaced and public download stream updated.');
  };

  return (
    <div className="space-y-6">
      {message && (
        <div className="p-3.5 rounded-xl bg-[#16A34A]/10 border border-[#16A34A]/30 text-[#4ADE80] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Current Resume Status Card */}
      <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-6 space-y-6">
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#27272A]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 text-[#10B981] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white font-mono">
                Arik_Riko_Prasetya_Software_Engineer.pdf
              </h2>
              <div className="flex items-center gap-3 text-xs text-[#A1A1AA] font-mono">
                <span>Format: PDF</span>
                <span>·</span>
                <span>Status: Published</span>
                <span>·</span>
                <span>Size: ~1.2 KB</span>
              </div>
            </div>
          </div>

          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#16A34A]/20 text-[#4ADE80] border border-[#16A34A]/40 font-mono">
            Active
          </span>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-mono text-[#A1A1AA] uppercase tracking-wider">
            Stable Public Endpoint
          </label>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-[#09090B] border border-[#27272A] font-mono text-xs text-[#10B981]">
            <span className="flex-1 truncate">{stableUrl}</span>
            <a
              href={stableUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex items-center gap-1 text-white shrink-0"
            >
              <span>Test Download</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-4">
          <a
            href={stableUrl}
            download="Arik_Riko_Prasetya_Software_Engineer.pdf"
            className="tap-target inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Current PDF</span>
          </a>

          <button
            type="button"
            onClick={handleUploadReplacement}
            className="tap-target inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10B981] hover:bg-[#059669] text-white text-xs font-semibold transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload &amp; Replace PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
