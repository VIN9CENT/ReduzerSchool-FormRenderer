import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://reduzer.tech';
  if (!domain) throw new Error('NEXT_PUBLIC_SITE_URL is not set');

  const cleanDomain = domain.replace(/^https?:\/\/|\/$/g, '');
  const baseUrl = `https://${cleanDomain}`;

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
