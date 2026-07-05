import type { MetadataRoute } from 'next';
const base = 'https://floren.at';
export default function sitemap(): MetadataRoute.Sitemap { return ['','/contact','/privacy','/imprint'].map((path) => ({ url: `${base}${path}`, lastModified: new Date('2026-07-05'), changeFrequency: 'monthly', priority: path ? 0.7 : 1 })); }
