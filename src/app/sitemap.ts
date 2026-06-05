import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://reduzer.tech';
  if (!domain) throw new Error('NEXT_PUBLIC_SITE_URL is not set');

  const cleanDomain = domain.replace(/^https?:\/\/|\/$/g, '');
  const baseUrl = `https://${cleanDomain}`;

  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/apply`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];
}
