import { getProjects, getExperiences, getProfile } from '@/lib/data/portfolio';
import Link from 'next/link';
import {
  Briefcase,
  FileText,
  User,
  Plus,
  ArrowRight,
  CheckCircle2,
  Clock,
} from 'lucide-react';

export default async function AdminDashboardPage() {
  const [profile, allProjects, experiences] = await Promise.all([
    getProfile(),
    getProjects({ includeAll: true }),
    getExperiences(true),
  ]);

  const publishedProjects = allProjects.filter((p) => p.status === 'published');
  const draftProjects = allProjects.filter((p) => p.status === 'draft');
  const featuredProjects = allProjects.filter((p) => p.featured);

  return (
    <div className="space-y-10">
      {/* Top Welcome Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#27272A]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Dashboard Overview
          </h1>
          <p className="text-xs text-[#A1A1AA] pt-1">
            Logged in as <span className="text-white font-mono">{profile.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="tap-target inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-semibold transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </Link>
          <Link
            href="/admin/profile"
            className="tap-target inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-medium transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>Edit Profile</span>
          </Link>
        </div>
      </div>

      {/* Content Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="flex items-center justify-between text-[#A1A1AA]">
            <span className="text-xs font-mono uppercase tracking-wider">Published Work</span>
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">
            {publishedProjects.length}
          </p>
          <p className="text-[11px] text-[#A1A1AA]">
            {featuredProjects.length} featured on homepage
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="flex items-center justify-between text-[#A1A1AA]">
            <span className="text-xs font-mono uppercase tracking-wider">Draft Work</span>
            <Clock className="w-4 h-4 text-[#F59E0B]" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">
            {draftProjects.length}
          </p>
          <p className="text-[11px] text-[#A1A1AA]">
            Hidden from public site
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="flex items-center justify-between text-[#A1A1AA]">
            <span className="text-xs font-mono uppercase tracking-wider">Experiences</span>
            <Briefcase className="w-4 h-4 text-[#10B981]" />
          </div>
          <p className="text-3xl font-bold text-white font-mono">
            {experiences.length}
          </p>
          <p className="text-[11px] text-[#A1A1AA]">
            1 active current role (PT TKI)
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#18181B] border border-[#27272A] space-y-2">
          <div className="flex items-center justify-between text-[#A1A1AA]">
            <span className="text-xs font-mono uppercase tracking-wider">Resume PDF</span>
            <FileText className="w-4 h-4 text-[#A855F7]" />
          </div>
          <p className="text-sm font-bold text-white truncate pt-2">
            Arik_Riko_Prasetya
          </p>
          <p className="text-[11px] text-[#A1A1AA]">
            Stable download active
          </p>
        </div>
      </div>

      {/* Quick Actions & Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Projects Table */}
        <div className="lg:col-span-8 bg-[#18181B] border border-[#27272A] rounded-xl overflow-hidden">
          <div className="p-5 border-b border-[#27272A] flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-white">Project Case Studies</h2>
              <p className="text-xs text-[#A1A1AA]">
                Manage portfolio projects, case studies, and publishing status.
              </p>
            </div>
            <Link
              href="/admin/projects"
              className="text-xs font-mono text-[#10B981] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#27272A]/50 text-[#A1A1AA] uppercase tracking-wider font-mono">
                <tr>
                  <th className="px-5 py-3">Project</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Timeline</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#27272A] text-[#FAFAFA]">
                {allProjects.slice(0, 6).map((proj) => (
                  <tr key={proj.id} className="hover:bg-[#27272A]/30 transition-colors">
                    <td className="px-5 py-3.5 font-medium">
                      <div className="flex items-center gap-2">
                        <span>{proj.title}</span>
                        {proj.featured && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30">
                            Featured
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 text-[#A1A1AA]">{proj.role}</td>
                    <td className="px-5 py-3.5 font-mono text-[#A1A1AA]">{proj.period_label}</td>
                    <td className="px-5 py-3.5">
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
                    <td className="px-5 py-3.5 text-right font-mono">
                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="text-[#10B981] hover:underline"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Links & System Information */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-4">
            <h2 className="text-sm font-bold text-white">Quick Tasks</h2>
            <div className="space-y-2">
              <Link
                href="/admin/homepage"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#27272A]/40 hover:bg-[#27272A] transition-colors text-xs text-[#FAFAFA]"
              >
                <span>Edit Homepage Copy &amp; CTAs</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
              </Link>
              <Link
                href="/admin/experience"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#27272A]/40 hover:bg-[#27272A] transition-colors text-xs text-[#FAFAFA]"
              >
                <span>Manage Experience Timeline</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
              </Link>
              <Link
                href="/admin/capabilities"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#27272A]/40 hover:bg-[#27272A] transition-colors text-xs text-[#FAFAFA]"
              >
                <span>Update Capabilities &amp; Stack</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
              </Link>
              <Link
                href="/admin/resume"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[#27272A]/40 hover:bg-[#27272A] transition-colors text-xs text-[#FAFAFA]"
              >
                <span>Upload New Resume PDF</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#A1A1AA]" />
              </Link>
            </div>
          </div>

          <div className="bg-[#18181B] border border-[#27272A] rounded-xl p-5 space-y-3">
            <h2 className="text-sm font-bold text-white">CMS Guardrails</h2>
            <ul className="text-xs text-[#A1A1AA] space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">✓</span>
                <span>Only PT Teknologi Kartu Indonesia may have Present.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">✓</span>
                <span>No project may be marked as Present.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">✓</span>
                <span>Odoo must remain Odoo (Basic).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#16A34A] font-bold">✓</span>
                <span>Public site exposes published content only.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
