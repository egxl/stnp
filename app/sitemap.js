import { getPosts } from '@/lib/api';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://stnp.co.id';
const LANGS = ['en', 'id', 'zh'];

const STATIC_ROUTES = [
  '',              // home
  '/about',
  '/legal-services',
  '/team',
  '/insights',
  '/contact',
  '/pro-bono',
];

export default async function sitemap() {
  const entries = [];

  // Static pages
  for (const route of STATIC_ROUTES) {
    for (const lang of LANGS) {
      entries.push({
        url: `${BASE_URL}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'monthly' : 'yearly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }

  // Dynamic blog posts from WordPress
  try {
    const result = await getPosts({ perPage: 100 });
    const posts = result?.data || [];

    for (const post of posts) {
      for (const lang of LANGS) {
        entries.push({
          url: `${BASE_URL}/${lang}/insights/${post.slug}`,
          lastModified: new Date(post.modified || post.date),
          changeFrequency: 'monthly',
          priority: 0.6,
        });
      }
    }
  } catch (err) {
    console.error('sitemap: failed to fetch WP posts', err);
  }

  return entries;
}
