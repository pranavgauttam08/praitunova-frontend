// Single source of truth for the public site URL — used for canonical/OG
// tags, robots.txt and sitemap.xml. Override via NEXT_PUBLIC_SITE_URL once
// a custom domain is attached; defaults to the current Vercel deployment.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://frontend-seven-lemon-46.vercel.app';
