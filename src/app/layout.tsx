import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import './globals.css';

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://arikriko.com'),
  title: {
    default: 'Arik Riko Prasetya · Software Engineer',
    template: '%s | Arik Riko Prasetya',
  },
  description:
    'Software Engineer building mobile, backend, and web products using Kotlin, Java, Flutter, React Native, Laravel, Node.js, Next.js, and modern production tooling.',
  keywords: [
    'Software Engineer Indonesia',
    'Mobile Developer',
    'Backend Developer',
    'Full-stack Developer',
    'Kotlin',
    'Java',
    'Flutter',
    'React Native',
    'Laravel',
    'Node.js',
    'Next.js',
  ],
  authors: [{ name: 'Arik Riko Prasetya', url: 'https://arikriko.com' }],
  creator: 'Arik Riko Prasetya',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://arikriko.com',
    siteName: 'Arik Riko Prasetya · Software Engineer',
    title: 'Arik Riko Prasetya · Software Engineer',
    description:
      'Software Engineer building mobile apps, backend systems, and web products from idea to production.',
    images: [
      {
        url: '/images/projects/puas-hub/cover.svg',
        width: 1200,
        height: 750,
        alt: 'Arik Riko Prasetya Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arik Riko Prasetya · Software Engineer',
    description:
      'Software Engineer building mobile apps, backend systems, and web products from idea to production.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/icon.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap" />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[var(--page-background)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
