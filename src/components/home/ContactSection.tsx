import { ArrowUpRight, Mail } from 'lucide-react';

interface ContactSectionProps {
  heading?: string;
  body?: string;
  email?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  resumeUrl?: string;
}

export function ContactSection({
  heading = 'Let’s build something useful.',
  body = 'Open to software engineering opportunities across mobile, backend, and full-stack development.',
  email = 'arikrikoprasetya@gmail.com',
  githubUrl = 'https://github.com/arikriko',
  linkedinUrl = 'https://linkedin.com/in/arikriko',
  resumeUrl = '/resume/Arik_Riko_Prasetya_Software_Engineer.pdf',
}: ContactSectionProps) {
  return (
    <section id="contact" className="py-20 md:py-32 max-w-6xl mx-auto px-6 border-t border-[#E8E6E1]">
      <div className="max-w-3xl space-y-8">
        <div className="inline-flex items-center gap-2">
          <span className="font-mono text-xs uppercase tracking-widest text-[#787672]">
            Contact &amp; Collaboration
          </span>
        </div>

        <h2 className="editorial-title text-3xl sm:text-5xl md:text-6xl text-[#121214]">
          {heading}
        </h2>

        <p className="text-lg sm:text-xl text-[#575653] leading-relaxed max-w-2xl">
          {body}
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${email}`}
            className="tap-target inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#121214] text-[#FAF9F6] text-sm font-medium hover:bg-[#27272A] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#121214]"
          >
            <Mail className="w-4 h-4" />
            <span>Send an Email</span>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full border border-[#D5D2CA] text-[#121214] text-sm font-medium hover:bg-[#F3F2EE] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#121214]"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full border border-[#D5D2CA] text-[#121214] text-sm font-medium hover:bg-[#F3F2EE] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#121214]"
          >
            <span>GitHub</span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>

          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tap-target inline-flex items-center gap-1.5 px-6 py-3.5 rounded-full border border-[#D5D2CA] text-[#121214] text-sm font-medium hover:bg-[#F3F2EE] transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#121214]"
          >
            <span>Resume PDF</span>
            <ArrowUpRight className="w-4 h-4 opacity-50" />
          </a>
        </div>
      </div>
    </section>
  );
}
