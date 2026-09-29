import { MediaLibrary } from './MediaLibrary';

export default function AdminMediaPage() {
  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Media Library
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Upload and manage project screenshots, diagrams, and responsive editorial assets.
        </p>
      </div>

      <MediaLibrary />
    </div>
  );
}
