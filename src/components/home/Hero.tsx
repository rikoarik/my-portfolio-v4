import { ArrowDown, ArrowUpRight } from 'lucide-react';

interface HeroProps {
  eyebrow?: string;
  title?: string;
  descriptor?: string;
  primaryCopy?: string;
  secondaryCopy?: string;
  resumeUrl?: string;
}

export function Hero({
  eyebrow = 'Software Engineer',
  title = 'Arik Riko Prasetya',
  descriptor = 'Mobile · Backend · Full-stack',
  primaryCopy = 'I build mobile apps, backend systems, and web products from idea to production.',
  secondaryCopy = 'Working across product development, APIs, integrations, databases, mobile platforms, and production delivery.',
  resumeUrl = '/resume/Arik_Riko_Prasetya_Software_Engineer.pdf',
}: HeroProps) {
  return (
    <section className="pt-20 pb-20 md:pt-32 md:pb-32 max-w-6xl mx-auto px-6">
      <div className="max-w-3xl space-y-8">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#121214]" aria-hidden="true" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#787672]">
            {eyebrow}
          </span>
        </div>

        {/* Main Heading & Descriptor */}
        <div className="space-y-3">
          <h1 className="editorial-title text-4xl sm:text-6xl md:text-7xl text-[#121214]">
            {title}
          </h1>
          <p className="font-mono text-base sm:text-lg text-[#575653]">
            {descriptor}
          </p>
        </div>

        {/* Supporting Copy */}
        <div className="space-y-4 pt-2 max-w-2xl text-lg sm:text-xl text-[#575653] leading-relaxed">
          <p className="text-[#121214] font-medium">
            {primaryCopy}
          </p>
          <p className="text-base sm:text-lg text-[#787672]">
            {secondaryCopy}
          </p>
        </div>

        {/* CTAs */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href="#work"
            className="tap-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#121214] text-[#FAF9F6] text-sm font-medium hover:bg-[#27272A] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#121214]"
          >
            <span>View Selected Work</span>
            <ArrowDown className="w-4 h-4" />
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center gap-2 px-6 py-3 rounded-full bg-transparent border border-[#D5D2CA] text-[#121214] text-sm font-medium hover:bg-[#F3F2EE] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#121214]"
          >
            <span>Download Resume</span>
            <ArrowUpRight className="w-4 h-4 opacity-60" />
          </a>
        </div>
      </div>
    </section>
  );
}
