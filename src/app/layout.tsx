import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import CookiebotScript from '@/components/CookiebotScript';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const siteUrl = 'https://school.reduzer.tech/';
export const metadata: Metadata = {
  title: {
    default: 'Reduzer School',
    template: '%s | Reduzer School',
  },
  description:
    'Launch your career as a full-stack developer in 12 months. Learn in-demand coding skills, build real projects, and get hired by top tech companies.',
  metadataBase: new URL(siteUrl || 'https://school.reduzer.tech'),
  openGraph: {
    type: 'website',
    url: siteUrl,
    siteName: 'Reduzer School',
    title: 'Reduzer School',
    description:
      'Launch your career as a full-stack developer in 12 months. Learn in-demand coding skills, build real projects, and get hired by top tech companies.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reduzer School',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Reduzer School',
    description:
      'Launch your career as a full-stack developer in 12 months. Learn in-demand coding skills, build real projects, and get hired by top tech companies.',
    images: ['/og-image.png'],
    site: '@reduzer_tech',
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      
      <body className="min-h-full flex flex-col">
        <CookiebotScript/>
        {children}
      </body>
    </html>
  );
}
