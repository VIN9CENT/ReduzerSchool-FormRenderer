import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { getBaseUrl } from '@/lib/url';
import type { ReactNode } from 'react';

import './globals.css';
import { PHProvider } from '@/components/PHProvider';
import { Suspense } from 'react';
import CookiebotScript from '@/components/CookiebotScript';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: {
    default: 'Reduzer School | One-Year Software Engineering Programme',
    template: '%s | Reduzer School',
  },
  description:
    'Reduzer School is a one-year, in-person software engineering programme in Kisii. Students learn product thinking, full-stack development, security, deployment, and delivery habits.',

  metadataBase: new URL(baseUrl),

  keywords: [
    'Reduzer School',
    'software engineering programme Kenya',
    'coding school Kisii',
    'best coding school Kenya',
    'software development Kenya',
    'full-stack developer course Kenya',
    'learn to code Kenya',
    'web development course Kenya',
    'coding school Kenya',
    'software engineering Kenya',
    'tech training Kisii',
    'software training institute',
    'coding programme for beginners',
    'career change into tech Kenya',
    'software engineering training Kenya',
  ],

  authors: [{ name: 'Reduzer School', url: baseUrl }],
  creator: 'Reduzer School',
  publisher: 'Reduzer School',
  category: 'Education',

  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: 'Reduzer School',
    title: 'Reduzer School | One-Year Software Engineering Programme',
    description:
      'Reduzer School is a one-year, in-person software engineering programme in Kisii. Students learn product thinking, full-stack development, security, deployment, and delivery habits.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reduzer School one-year software engineering programme',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Reduzer School | One-Year Software Engineering Programme',
    description:
      'Reduzer School is a one-year, in-person software engineering programme in Kisii. Students learn product thinking, full-stack development, security, deployment, and delivery habits.',
    images: ['/og-image.png'],
    site: '@reduzer_tech',
    creator: '@reduzer_tech',
  },

  alternates: {
    canonical: '/',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <CookiebotScript />
        <Suspense fallback={null}>
          <PHProvider>{children}</PHProvider>
        </Suspense>
      </body>
    </html>
  );
}
