import { getProjects } from '@/lib/data/portfolio';
import { WorkClient } from './WorkClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work · Arik Riko Prasetya',
  description:
    'Detailed case studies across mobile engineering, backend architectures, payment systems, and full-stack web platforms.',
  alternates: {
    canonical: 'https://arikriko.com/work',
  },
};

export default async function WorkPage() {
  const projects = await getProjects({ includeAll: false });

  return <WorkClient projects={projects} />;
}
