// Single source of truth for the backend base URL. Override per-environment
// via NEXT_PUBLIC_API_URL (e.g. a staging backend) instead of editing code.
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'https://praitunova-backend.onrender.com/api';
