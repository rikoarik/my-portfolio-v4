export type ContentStatus = 'draft' | 'published' | 'archived';

export interface MediaAsset {
  id: string;
  bucket: string;
  path: string;
  public_url: string;
  mime_type: string;
  size_bytes?: number | null;
  width?: number | null;
  height?: number | null;
  alt_text?: string | null;
  caption?: string | null;
  created_at: string;
  updated_at?: string;
}

export interface SiteProfile {
  id: string;
  full_name: string;
  title: string;
  descriptor: string;
  tagline_primary: string;
  tagline_secondary: string;
  location: string;
  email: string;
  phone?: string | null;
  github_url?: string | null;
  linkedin_url?: string | null;
  website_url?: string | null;
  resume_url?: string | null;
  avatar_url?: string | null;
  avatar_media_id?: string | null;
  status: ContentStatus;
  updated_at?: string;
}

export type SectionKey =
  | 'hero'
  | 'about'
  | 'selected_work'
  | 'capabilities'
  | 'github'
  | 'contact';

export interface SiteSection {
  id: string;
  section_key: SectionKey;
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  body?: string | null;
  metadata?: Record<string, unknown>;
  status: ContentStatus;
  sort_order: number;
  published_at?: string | null;
  updated_at?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  employment_type?: string | null;
  location?: string | null;
  start_date: string;
  end_date?: string | null;
  is_current: boolean;
  summary?: string | null;
  bullets: string[];
  sort_order: number;
  status: ContentStatus;
  published_at?: string | null;
  updated_at?: string;
}

export interface ProjectTechnology {
  id: string;
  project_id: string;
  technology: string;
  category?: string | null;
  sort_order: number;
}

export type CaseStudySectionType =
  | 'context'
  | 'role'
  | 'built'
  | 'decisions'
  | 'integrations'
  | 'challenges'
  | 'result'
  | 'stack'
  | 'links'
  | 'custom';

export interface ProjectSection {
  id: string;
  project_id: string;
  section_type: CaseStudySectionType;
  title?: string | null;
  body_md?: string | null;
  metadata?: Record<string, unknown>;
  sort_order: number;
  status: ContentStatus;
  updated_at?: string;
}

export type MediaPlacement = 'cover' | 'hero' | 'gallery' | 'feature' | 'diagram';

export interface ProjectMedia {
  id: string;
  project_id: string;
  media_id: string;
  placement: MediaPlacement;
  caption?: string | null;
  alt_text: string;
  sort_order: number;
  media?: MediaAsset;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  summary: string;
  period_label: string;
  start_date?: string | null;
  end_date?: string | null;
  role: string;
  project_type?: string | null;
  platform?: string | null;
  featured: boolean;
  cover_media_id?: string | null;
  cover_image_url?: string;
  cover_alt_text?: string;
  repo_url?: string | null;
  demo_url?: string | null;
  store_url?: string | null;
  sort_order: number;
  status: ContentStatus;
  published_at?: string | null;
  updated_at?: string;
  technologies?: ProjectTechnology[];
  sections?: ProjectSection[];
  media?: ProjectMedia[];
}

export interface SkillGroup {
  id: string;
  name: string;
  description?: string | null;
  sort_order: number;
  status: ContentStatus;
  skills?: Skill[];
}

export type SkillLevel = 'primary' | 'secondary' | 'basic';

export interface Skill {
  id: string;
  group_id: string;
  name: string;
  level?: SkillLevel | null;
  featured: boolean;
  sort_order: number;
  status: ContentStatus;
}

export interface FeaturedRepository {
  id: string;
  repo_full_name: string;
  title_override?: string | null;
  description_override?: string | null;
  sort_order: number;
  visible: boolean;
  status: ContentStatus;
  language?: string;
  stars?: number;
  url?: string;
}

export interface SeoSettings {
  id: string;
  site_title: string;
  title_template: string;
  default_description: string;
  default_og_media_id?: string | null;
  canonical_base_url: string;
  robots?: string | null;
  metadata?: Record<string, unknown>;
  status: ContentStatus;
}

export interface SeoPage {
  id: string;
  page_key: string;
  title?: string | null;
  description?: string | null;
  canonical_url?: string | null;
  og_media_id?: string | null;
  robots?: string | null;
  metadata?: Record<string, unknown>;
  status: ContentStatus;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: Record<string, unknown>;
  updated_at: string;
}
