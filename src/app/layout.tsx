import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { getBaseUrl } from '@/lib/url';
import type { ReactNode } from 'react';

import './globals.css';
import { PHProviderWrapper } from '@/components/PHProviderWrapper';
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

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  title: {
    default: 'Reduzer School | Tech Bootcamp Kenya',
    template: '%s | Reduzer School',
  },
  description:
    'Reduzer School is a leading coding school in Nyamarambe Town, Kisii County, Kenya. Launch your career in software development in 12 months. Build real projects and get hired by top tech companies.',

  metadataBase: new URL(baseUrl),

  keywords: [
    'Reduzer School',
    'tech bootcamp Kenya',
    'coding school Kisii',
    'best coding school Kenya',
    'software development Kenya',
    'full-stack developer course Kenya',
    'learn to code Kenya',
    'web development bootcamp Kenya',
    'coding school Kenya',
    'software engineering Kenya',
    'tech training Kisii',
    'software training institute',
    'coding bootcamp for beginners',
    'career change into tech Kenya',
    'get hired as a developer Kenya',
  ],

  authors: [{ name: 'Reduzer School', url: baseUrl }],
  creator: 'Reduzer School',
  publisher: 'Reduzer School',
  category: 'Education',

  openGraph: {
    type: 'website',
    url: baseUrl,
    siteName: 'Reduzer School',
    title: 'Reduzer School | Tech Bootcamp Kenya',
    description:
      'Reduzer School is a leading coding school in Nyamarambe Town, Kisii County, Kenya. Launch your career in software development in 12 months. Build real projects and get hired by top tech companies.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Reduzer School - Tech Bootcamp Kenya',
      },
    ],
    locale: 'en_US',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Reduzer School | Tech Bootcamp Kenya',
    description:
      'Reduzer School is a leading coding school in Nyamarambe Town, Kisii County, Kenya. Launch your career in software development in 12 months. Build real projects and get hired by top tech companies.',
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
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            data-cookieconsent="ignore"
            async
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">
        <CookiebotScript />
        <PHProviderWrapper>{children}</PHProviderWrapper>
      </body>
    </html>
  );
}
