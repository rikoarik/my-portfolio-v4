import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  eyebrow?: string;
  heading?: string;
  body?: string;
}

export function AboutSection({
  eyebrow = 'Engineering Philosophy',
  heading = 'Building software from interface to backend and production.',
  body,
}: AboutSectionProps) {
  const defaultBody = `I’m a software engineer whose professional work started primarily in mobile development and expanded into backend and full-stack product development. I’ve worked on production payment apps, operational systems, backend APIs, web applications, databases, device integrations, deployment, and release workflows.

I prefer owning real product problems end-to-end: understanding the flow, building the feature, integrating services, handling edge cases, shipping it, and fixing what happens in production.`;

  const paragraphs = (body || defaultBody).split('\n\n').filter(Boolean);

  return (
    <section id="about" className="py-20 md:py-28 max-w-6xl mx-auto px-6 border-t border-[#E8E6E1]">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
        {/* Left Column / Label */}
        <div className="md:col-span-5 space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-[#787672]">
              {eyebrow}
            </span>
          </div>
          <h2 className="editorial-title text-2xl sm:text-4xl text-[#121214] leading-snug">
            {heading}
          </h2>
        </div>

        {/* Right Column / Narrative Body */}
        <div className="md:col-span-7 space-y-6 text-base sm:text-lg text-[#575653] leading-relaxed">
          {paragraphs.map((para, i) => (
            <p key={i} className={i === 0 ? 'text-[#121214] font-medium' : ''}>
              {para}
            </p>
          ))}

          <div className="pt-4">
            <Link
              href="/about"
              className="tap-target inline-flex items-center gap-2 text-sm font-semibold text-[#121214] hover:text-[#2563EB] transition-colors focus-visible:ring-2 focus-visible:ring-[#121214] rounded-sm"
            >
              <span>Read Full Background &amp; Approach</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
