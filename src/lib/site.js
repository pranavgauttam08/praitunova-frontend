// Single source of truth for the public site URL — used for canonical/OG
// tags, robots.txt and sitemap.xml. Override via NEXT_PUBLIC_SITE_URL if
// this ever needs to point elsewhere (staging, a different domain).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://praitunovainfotech.com';
