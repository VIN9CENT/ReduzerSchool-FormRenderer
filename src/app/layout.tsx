import type { Metadata, Viewport } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import './globals.css';
import Script from 'next/script';

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

  metadataBase: new URL(siteUrl),

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
      <head>
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="1d803704-ef37-4292-92d7-3280f6bffa19"
          data-blockingmode="auto"
          data-cfasync="false"
        />
        {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY && (
          <script
            src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
            async
          />
        )}
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
