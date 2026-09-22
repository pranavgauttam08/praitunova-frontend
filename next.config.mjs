const API_ORIGIN = (() => {
  try {
    return new URL(process.env.NEXT_PUBLIC_API_URL || 'https://praitunova-backend.onrender.com/api').origin;
  } catch {
    return 'https://praitunova-backend.onrender.com';
  }
})();

// CSP only in production builds: in dev the API origin is often a local
// Django server on a different port, and blocking that would just make
// local testing confusing without adding any real protection.
//
// script-src keeps 'unsafe-inline': a per-request nonce via middleware
// was tried (the textbook Next.js pattern) and broke hydration completely
// in a real browser test — Next didn't auto-apply the nonce to its own
// chunks the way its docs describe on this setup, so every script load
// was blocked and the site was dead. Reverted rather than ship something
// that failed its own test. ZAP flags 'unsafe-inline' as a WARN, not a
// FAIL — a known, common trade-off, not a break.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self' ${API_ORIGIN}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join('; ');

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Cross-origin isolation (ZAP flagged COEP as missing). Safe here because
  // every asset is self-hosted (fonts, logo, next/image output) and the
  // only cross-origin traffic is JSON fetch() to the API, which COEP
  // doesn't govern.
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
  ...(process.env.NODE_ENV === 'production' ? [{ key: 'Content-Security-Policy', value: csp }] : []),
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
