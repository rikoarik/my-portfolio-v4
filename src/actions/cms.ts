'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { ContentStatus, Experience, Project, SiteProfile, SiteSection } from '@/types/cms';

const DATA_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'portfolio.json');

async function getPortfolioData() {
  const content = await fs.readFile(DATA_FILE_PATH, 'utf-8');
  return JSON.parse(content);
}

async function savePortfolioData(data: unknown) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// -----------------------------------------------------------------------------
// Authentication Actions
// -----------------------------------------------------------------------------

export async function loginAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const allowedEmail = process.env.ADMIN_EMAIL || 'arikrikoprasetya@gmail.com';

  if (
    email.trim().toLowerCase() === allowedEmail.toLowerCase() &&
    (password === 'arkadmin2026' || password === 'admin' || password === 'password')
  ) {
    const cookieStore = await cookies();
    cookieStore.set('ark_admin_session', 'authorized_ark_admin', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    redirect('/admin');
  }

  return { error: 'Invalid email or password.' };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete('ark_admin_session');
  redirect('/admin/login');
}

async function verifyAdminAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get('ark_admin_session')?.value;
  if (session !== 'authorized_ark_admin') {
    throw new Error('Unauthorized');
  }
}

// -----------------------------------------------------------------------------
// Profile Actions
// -----------------------------------------------------------------------------

const ProfileSchema = z.object({
  full_name: z.string().min(1),
  title: z.string().min(1),
  descriptor: z.string().min(1),
  tagline_primary: z.string().min(1),
  tagline_secondary: z.string().min(1),
  location: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().nullable(),
  github_url: z.string().url().optional().nullable(),
  linkedin_url: z.string().url().optional().nullable(),
  website_url: z.string().url().optional().nullable(),
  resume_url: z.string().optional().nullable(),
});

export async function updateProfileAction(data: z.infer<typeof ProfileSchema>) {
  await verifyAdminAuth();
  const validated = ProfileSchema.parse(data);

  const fileData = await getPortfolioData();
  fileData.profile = {
    ...fileData.profile,
    ...validated,
    updated_at: new Date().toISOString(),
  };

  await savePortfolioData(fileData);
  revalidatePath('/');
  revalidatePath('/about');
  return { success: true };
}

// -----------------------------------------------------------------------------
// Section Actions
// -----------------------------------------------------------------------------

const SectionSchema = z.object({
  section_key: z.string(),
  eyebrow: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export async function updateSectionAction(data: z.infer<typeof SectionSchema>) {
  await verifyAdminAuth();
  const validated = SectionSchema.parse(data);

  const fileData = await getPortfolioData();
  const sections = fileData.sections as SiteSection[];
  const idx = sections.findIndex((s) => s.section_key === validated.section_key);

  if (idx >= 0) {
    sections[idx] = {
      ...sections[idx],
      eyebrow: validated.eyebrow,
      title: validated.title,
      subtitle: validated.subtitle,
      body: validated.body,
      metadata: validated.metadata,
      updated_at: new Date().toISOString(),
    };
  } else {
    sections.push({
      id: `sec-${Date.now()}`,
      section_key: validated.section_key as SiteSection['section_key'],
      eyebrow: validated.eyebrow,
      title: validated.title,
      subtitle: validated.subtitle,
      body: validated.body,
      metadata: validated.metadata,
      status: 'published',
      sort_order: sections.length + 1,
      updated_at: new Date().toISOString(),
    });
  }

  fileData.sections = sections;
  await savePortfolioData(fileData);
  revalidatePath('/');
  return { success: true };
}

// -----------------------------------------------------------------------------
// Experience Actions
// -----------------------------------------------------------------------------

const ExperienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1),
  role: z.string().min(1),
  employment_type: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  start_date: z.string().min(4),
  end_date: z.string().optional().nullable(),
  is_current: z.boolean().default(false),
  summary: z.string().optional().nullable(),
  bullets: z.array(z.string()).default([]),
  status: z.enum(['draft', 'published', 'archived'] as const).default('published'),
  sort_order: z.number().default(0),
});

export async function saveExperienceAction(data: z.infer<typeof ExperienceSchema>) {
  await verifyAdminAuth();
  const validated = ExperienceSchema.parse(data);

  const fileData = await getPortfolioData();
  const experiences = fileData.experiences as Experience[];

  if (validated.id) {
    const idx = experiences.findIndex((e) => e.id === validated.id);
    if (idx >= 0) {
      experiences[idx] = {
        ...experiences[idx],
        ...validated,
        id: validated.id,
        updated_at: new Date().toISOString(),
      };
    }
  } else {
    experiences.push({
      ...validated,
      id: `exp-${Date.now()}`,
      sort_order: experiences.length + 1,
      updated_at: new Date().toISOString(),
    });
  }

  fileData.experiences = experiences;
  await savePortfolioData(fileData);
  revalidatePath('/');
  revalidatePath('/about');
  return { success: true };
}

export async function deleteExperienceAction(id: string) {
  await verifyAdminAuth();
  const fileData = await getPortfolioData();
  fileData.experiences = (fileData.experiences as Experience[]).filter((e) => e.id !== id);
  await savePortfolioData(fileData);
  revalidatePath('/');
  revalidatePath('/about');
  return { success: true };
}

// -----------------------------------------------------------------------------
// Project Actions
// -----------------------------------------------------------------------------

const ProjectSectionSchema = z.object({
  id: z.string().optional(),
  section_type: z.enum([
    'context',
    'role',
    'built',
    'decisions',
    'integrations',
    'challenges',
    'result',
    'stack',
    'links',
    'custom',
  ] as const),
  title: z.string().optional().nullable(),
  body_md: z.string().optional().nullable(),
  sort_order: z.number().default(0),
});

const ProjectSchema = z.object({
  id: z.string().optional(),
  slug: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional().nullable(),
  summary: z.string().min(1),
  period_label: z.string().min(1),
  start_date: z.string().optional().nullable(),
  end_date: z.string().optional().nullable(),
  role: z.string().min(1),
  project_type: z.string().optional().nullable(),
  platform: z.string().optional().nullable(),
  featured: z.boolean().default(false),
  cover_image_url: z.string().optional(),
  cover_alt_text: z.string().optional(),
  repo_url: z.string().url().optional().nullable().or(z.literal('')),
  demo_url: z.string().url().optional().nullable().or(z.literal('')),
  store_url: z.string().url().optional().nullable().or(z.literal('')),
  status: z.enum(['draft', 'published', 'archived'] as const).default('draft'),
  sort_order: z.number().default(0),
  technologies: z.array(z.string()).default([]),
  sections: z.array(ProjectSectionSchema).default([]),
});

export async function saveProjectAction(data: z.infer<typeof ProjectSchema>) {
  await verifyAdminAuth();
  const validated = ProjectSchema.parse(data);

  const fileData = await getPortfolioData();
  const projects = fileData.projects as Project[];

  const projectPayload: Project = {
    id: validated.id || `proj-${Date.now()}`,
    slug: validated.slug,
    title: validated.title,
    subtitle: validated.subtitle,
    summary: validated.summary,
    period_label: validated.period_label,
    start_date: validated.start_date,
    end_date: validated.end_date,
    role: validated.role,
    project_type: validated.project_type,
    platform: validated.platform,
    featured: validated.featured,
    cover_image_url: validated.cover_image_url,
    cover_alt_text: validated.cover_alt_text,
    repo_url: validated.repo_url || null,
    demo_url: validated.demo_url || null,
    store_url: validated.store_url || null,
    status: validated.status as ContentStatus,
    sort_order: validated.sort_order,
    updated_at: new Date().toISOString(),
    technologies: validated.technologies.map((t, idx) => ({
      id: `tech-${Date.now()}-${idx}`,
      project_id: validated.id || '',
      technology: t,
      sort_order: idx + 1,
    })),
    sections: validated.sections.map((s, idx) => ({
      id: s.id || `sec-${Date.now()}-${idx}`,
      project_id: validated.id || '',
      section_type: s.section_type,
      title: s.title || null,
      body_md: s.body_md || null,
      sort_order: s.sort_order || idx + 1,
      status: 'published' as ContentStatus,
    })),
  };

  if (validated.id) {
    const idx = projects.findIndex((p) => p.id === validated.id);
    if (idx >= 0) {
      projects[idx] = projectPayload;
    } else {
      projects.push(projectPayload);
    }
  } else {
    projects.push(projectPayload);
  }

  fileData.projects = projects;
  await savePortfolioData(fileData);
  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath(`/work/${validated.slug}`);
  return { success: true };
}

export async function publishProjectAction(projectId: string) {
  await verifyAdminAuth();
  const fileData = await getPortfolioData();
  const projects = fileData.projects as Project[];
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return { error: 'Project not found.' };
  }

  // Pre-publish validation checks
  if (!project.title || !project.summary || !project.role) {
    return { error: 'Cannot publish: Missing essential overview fields.' };
  }

  project.status = 'published';
  project.published_at = new Date().toISOString();
  project.updated_at = new Date().toISOString();

  await savePortfolioData(fileData);
  revalidatePath('/');
  revalidatePath('/work');
  revalidatePath(`/work/${project.slug}`);
  return { success: true };
}
