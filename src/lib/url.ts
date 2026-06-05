export function getBaseUrl(): string {
  const domain = process.env.NEXT_PUBLIC_SITE_URL || 'https://reduzer.tech';
  const cleanDomain = domain.replace(/^https?:\/\/|\/$/g, '');
  return `https://${cleanDomain}`;
}
