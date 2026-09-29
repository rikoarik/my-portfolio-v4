import { getProfile } from '@/lib/data/portfolio';
import { ProfileEditorForm } from './ProfileEditorForm';

export default async function AdminProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Profile Settings
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Manage core identity, titles, contact information, and public URLs.
        </p>
      </div>

      <ProfileEditorForm initialProfile={profile} />
    </div>
  );
}
