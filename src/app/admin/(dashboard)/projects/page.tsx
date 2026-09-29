import { getProjects } from '@/lib/data/portfolio';
import Link from 'next/link';
import { Plus, Edit3, ExternalLink } from 'lucide-react';

export default async function AdminProjectListPage() {
  const projects = await getProjects({ includeAll: true });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272A]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Project Manager
          </h1>
          <p className="text-xs text-[#A1A1AA] pt-1">
            Manage case studies, stack tags, editorial sections, and publishing states.
          </p>
        </div>

        <Link
          href="/admin/projects/new"
          className="tap-target inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </Link>
      </div>

      <div className="bg-[#18181B] border border-[#27272A] rounded-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#27272A]/50 text-[#A1A1AA] uppercase tracking-wider font-mono">
            <tr>
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Project Title</th>
              <th className="px-5 py-3">Role</th>
              <th className="px-5 py-3">Period</th>
              <th className="px-5 py-3">Platform</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#27272A] text-[#FAFAFA]">
            {projects.map((proj) => (
              <tr key={proj.id} className="hover:bg-[#27272A]/30 transition-colors">
                <td className="px-5 py-4 font-mono text-[#A1A1AA]">{proj.sort_order}</td>
                <td className="px-5 py-4 font-bold text-white">
                  <div className="flex items-center gap-2">
                    <span>{proj.title}</span>
                    {proj.featured && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/30">
                        Featured
                      </span>
                    )}
                  </div>
                  <span className="block text-[11px] font-mono text-[#A1A1AA] font-normal">
                    /{proj.slug}
                  </span>
                </td>
                <td className="px-5 py-4 text-[#A1A1AA]">{proj.role}</td>
                <td className="px-5 py-4 font-mono text-[#A1A1AA]">{proj.period_label}</td>
                <td className="px-5 py-4 text-[#A1A1AA]">{proj.platform || 'Cross-platform'}</td>
                <td className="px-5 py-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      proj.status === 'published'
                        ? 'bg-[#16A34A]/10 text-[#4ADE80] border border-[#16A34A]/30'
                        : 'bg-[#F59E0B]/10 text-[#FBBF24] border border-[#F59E0B]/30'
                    }`}
                  >
                    {proj.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="inline-flex items-center gap-2">
                    {proj.status === 'published' && (
                      <Link
                        href={`/work/${proj.slug}`}
                        target="_blank"
                        className="p-1.5 text-[#A1A1AA] hover:text-white transition-colors"
                        title="View Public Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    )}
                    <Link
                      href={`/admin/projects/${proj.id}`}
                      className="tap-target inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#27272A] hover:bg-[#3F3F46] text-[#10B981] text-xs font-mono transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
