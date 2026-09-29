import { ResumeManager } from './ResumeManager';

export default function AdminResumePage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Resume Manager
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Manage and replace the official PDF resume served at the stable public URL.
        </p>
      </div>

      <ResumeManager />
    </div>
  );
}
