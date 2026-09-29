import { getSeoSettings, getSeoPage } from '@/lib/data/portfolio';
import { SeoManager } from './SeoManager';

export default async function AdminSeoPage() {
  const [globalSeo, homeSeo] = await Promise.all([
    getSeoSettings(),
    getSeoPage('home'),
  ]);

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="pb-6 border-b border-[#27272A]">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          SEO &amp; Metadata Manager
        </h1>
        <p className="text-xs text-[#A1A1AA] pt-1">
          Configure search engine titles, meta descriptions, canonical URLs, and OpenGraph social previews.
        </p>
      </div>

      <SeoManager initialGlobal={globalSeo} initialHome={homeSeo} />
    </div>
  );
}
