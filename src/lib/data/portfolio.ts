import portfolioData from '@/data/portfolio.json';
import {
  SiteProfile,
  SiteSection,
  Experience,
  Project,
  SkillGroup,
  FeaturedRepository,
  SeoSettings,
  SeoPage,
} from '@/types/cms';

export async function getProfile(): Promise<SiteProfile> {
  return portfolioData.profile as SiteProfile;
}

export async function getSections(): Promise<Record<string, SiteSection>> {
  const map: Record<string, SiteSection> = {};
  (portfolioData.sections as SiteSection[]).forEach((s) => {
    map[s.section_key] = s;
  });
  return map;
}

export async function getExperiences(includeAll = false): Promise<Experience[]> {
  const list = portfolioData.experiences as Experience[];
  if (includeAll) return list;
  return list.filter((e) => e.status === 'published');
}

export async function getProjects(options?: {
  includeAll?: boolean;
  featuredOnly?: boolean;
}): Promise<Project[]> {
  const { includeAll = false, featuredOnly = false } = options || {};
  let list = portfolioData.projects as Project[];

  if (!includeAll) {
    list = list.filter((p) => p.status === 'published');
  }
  if (featuredOnly) {
    list = list.filter((p) => p.featured);
  }
  return list;
}

export async function getProjectBySlug(
  slug: string,
  allowDraft = false
): Promise<Project | null> {
  const list = portfolioData.projects as Project[];
  const found = list.find(
    (p) => p.slug === slug && (allowDraft || p.status === 'published')
  );
  return found || null;
}

export async function getSkillGroups(includeAll = false): Promise<SkillGroup[]> {
  const list = portfolioData.skillGroups as SkillGroup[];
  if (includeAll) return list;
  return list.filter((g) => g.status === 'published');
}

export async function getFeaturedRepositories(
  includeAll = false
): Promise<FeaturedRepository[]> {
  const list = portfolioData.repositories as FeaturedRepository[];
  if (includeAll) return list;
  return list.filter((r) => r.visible && r.status === 'published');
}

export async function getSeoSettings(): Promise<SeoSettings> {
  return portfolioData.seo as SeoSettings;
}

export async function getSeoPage(pageKey: string): Promise<SeoPage | null> {
  const list = portfolioData.seoPages as SeoPage[];
  const found = list.find((p) => p.page_key === pageKey);
  return found || null;
}
