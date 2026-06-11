import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // URL dasar untuk website PMM Voyage
  const baseUrl = 'https://peacefulgoldenisland.com';

  // Rute statis yang sering diakses oleh pengunjung
  const staticRoutes = [
    '',
    '/expedition',
    '/boat-details',
    '/gallery',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Mengembalikan array sitemap untuk dibaca oleh mesin pencari Google
  return [...staticRoutes];
}