import { ArrowUpRight, GitBranch } from 'lucide-react';
import { FeaturedRepository } from '@/types/cms';

interface GithubSectionProps {
  heading?: string;
  lead?: string;
  repositories: FeaturedRepository[];
}

export function GithubSection({
  heading = 'Code outside work',
  lead = 'Public experiments and product builds across mobile, backend, web, automation, and AI integrations.',
  repositories,
}: GithubSectionProps) {
  return (
    <section className="py-20 md:py-28 max-w-6xl mx-auto px-6 border-t border-[#E8E6E1]">
      <div className="max-w-2xl space-y-4 mb-14 md:mb-16">
        <div className="inline-flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#787672]">
            Open Code
          </span>
        </div>
        <h2 className="editorial-title text-3xl sm:text-5xl text-[#121214]">
          {heading}
        </h2>
        <p className="text-base sm:text-lg text-[#575653] leading-relaxed">
          {lead}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {repositories.map((repo) => (
          <a
            key={repo.id || repo.repo_full_name}
            href={repo.url || `https://github.com/${repo.repo_full_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-5 bg-[#FFFFFF] border border-[#E8E6E1] hover:border-[#D5D2CA] rounded-xl flex flex-col justify-between transition-all hover:shadow-sm focus-visible:ring-2 focus-visible:ring-[#121214]"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <GitBranch className="w-4 h-4 text-[#787672] group-hover:text-[#121214] transition-colors" />
                <ArrowUpRight className="w-3.5 h-3.5 text-[#787672] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-sm font-bold text-[#121214] group-hover:text-[#2563EB] transition-colors font-mono">
                {repo.title_override || repo.repo_full_name.split('/')[1] || repo.repo_full_name}
              </h3>
              <p className="text-xs text-[#575653] leading-relaxed line-clamp-3">
                {repo.description_override || 'Public engineering repository.'}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-[#F3F2EE] flex items-center justify-between text-xs font-mono text-[#787672]">
              {repo.language && (
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#121214]/60" />
                  {repo.language}
                </span>
              )}
              <span className="text-[11px] group-hover:text-[#121214] transition-colors">
                View GitHub
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
