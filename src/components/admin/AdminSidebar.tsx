'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  User,
  Home,
  Briefcase,
  FolderGit2,
  Cpu,
  GitBranch,
  Image as ImageIcon,
  FileText,
  Search,
  Settings,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import { logoutAction } from '@/actions/cms';

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Profile', href: '/admin/profile', icon: User },
    { label: 'Homepage', href: '/admin/homepage', icon: Home },
    { label: 'Experience', href: '/admin/experience', icon: Briefcase },
    { label: 'Projects', href: '/admin/projects', icon: FolderGit2 },
    { label: 'Capabilities', href: '/admin/capabilities', icon: Cpu },
    { label: 'GitHub Repos', href: '/admin/repositories', icon: GitBranch },
    { label: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { label: 'Resume', href: '/admin/resume', icon: FileText },
    { label: 'SEO Manager', href: '/admin/seo', icon: Search },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#18181B] text-[#E4E4E7] flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-[#27272A]">
      {/* Brand & Identity */}
      <div>
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#27272A]">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#10B981] flex items-center justify-center font-bold text-xs text-white">
              A
            </div>
            <div>
              <span className="font-bold text-sm text-white tracking-tight">ARK CMS</span>
              <span className="block text-[10px] text-[#A1A1AA] font-mono leading-none">Management</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === '/admin'
                ? pathname === '/admin'
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#27272A] text-white font-semibold'
                    : 'text-[#A1A1AA] hover:text-white hover:bg-[#27272A]/50'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer Actions */}
      <div className="p-3 border-t border-[#27272A] space-y-1">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-[#A1A1AA] hover:text-white hover:bg-[#27272A]/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Site</span>
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
        </Link>

        <form action={logoutAction}>
          <button
            type="submit"
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#EF4444] hover:bg-[#27272A]/50 transition-colors text-left"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>
    </aside>
  );
}
