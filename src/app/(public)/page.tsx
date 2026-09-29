import {
  getProfile,
  getProjects,
  getExperiences,
  getSkillGroups,
  getSeoPage,
} from '@/lib/data/portfolio';
import { SelectedWorkHero } from '@/components/home/SelectedWorkHero';
import { ProfileCard } from '@/components/home/ProfileCard';
import { HomeSocialCards } from '@/components/home/HomeSocialCards';
import { LatestWorkGrid } from '@/components/home/LatestWorkGrid';
import { HomeExperienceRows } from '@/components/home/HomeExperienceRows';
import { HomeCapabilitiesCard } from '@/components/home/HomeCapabilitiesCard';
import { HomeEndingCard } from '@/components/home/HomeEndingCard';
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoPage('home');
  return {
    title: seo?.title || 'Arik Riko Prasetya · Software Engineer',
    description:
      seo?.description ||
      'Software Engineer building mobile apps, backend systems, and web products from idea to production.',
    alternates: {
      canonical: seo?.canonical_url || 'https://arikriko.com',
    },
  };
}

export default async function HomePage() {
  const [profile, projects, experiences, skillGroups] = await Promise.all([
    getProfile(),
    getProjects({ includeAll: false }),
    getExperiences(false),
    getSkillGroups(false),
  ]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--layout-gap)] items-start">
      {/* LEFT COLUMN: Sticky 100svh Selected Work Showcase */}
      <SelectedWorkHero projects={projects} />

      {/* RIGHT COLUMN: Modular Content Stack */}
      <div className="space-y-[var(--layout-gap)] min-w-0">
        <ProfileCard profile={profile} />
        <HomeSocialCards
          email={profile.email}
          resumeUrl={profile.resume_url || undefined}
        />
        <LatestWorkGrid projects={projects} />
        <HomeExperienceRows experiences={experiences} />
        <HomeCapabilitiesCard groups={skillGroups} />
        <HomeEndingCard />
      </div>
    </div>
  );
}
