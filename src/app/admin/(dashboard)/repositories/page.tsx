import { getFeaturedRepositories } from '@/lib/data/portfolio';
import { RepositoriesManager } from './RepositoriesManager';

export default async function AdminRepositoriesPage() {
  const repos = await getFeaturedRepositories(true);

  return (
    <div className="space-y-8 max-w-5xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          GitHub Repositories Manager
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Select and customize public open source repositories featured on the homepage.
        </p>
      </div>

      <RepositoriesManager initialRepos={repos} />
    </div>
  );
}
