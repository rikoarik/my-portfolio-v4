import { Header } from '@/components/layout/Header';
import { ViewportFrame } from '@/components/layout/ViewportFrame';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import { getProfile } from '@/lib/data/portfolio';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.full_name,
    jobTitle: profile.title,
    url: profile.website_url || 'https://arikriko.com',
    sameAs: [
      profile.github_url || 'https://github.com/arikriko',
      profile.linkedin_url || 'https://linkedin.com/in/arikriko',
    ].filter(Boolean),
    knowsAbout: [
      'Mobile Development',
      'Backend Engineering',
      'Full-stack Engineering',
      'Android',
      'Kotlin',
      'Flutter',
      'React Native',
      'Laravel',
      'Fastify',
      'Next.js',
      'PostgreSQL',
      'QRIS',
    ],
  };

  return (
    <ThemeProvider>
      <SmoothScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewportFrame />
      <div className="page-shell flex flex-col">
        <Header
          githubUrl={profile.github_url || undefined}
          linkedinUrl={profile.linkedin_url || undefined}
          resumeUrl={profile.resume_url || undefined}
        />
        <main className="flex-1 mt-[var(--layout-gap)]">{children}</main>
      </div>
    </ThemeProvider>
  );
}
