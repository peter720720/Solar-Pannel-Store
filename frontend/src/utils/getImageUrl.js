import { API_BASE_URL } from '../config/api';

export default function getImageUrl(src) {
  if (!src) return '/placeholder-solar.jpg';

  // If already absolute HTTPS, return as-is
  if (src.startsWith('https://')) return src;

  // If absolute HTTP on localhost, rewrite to production backend
  if (src.startsWith('http://') && src.includes('localhost')) {
    try {
      const url = new URL(src);
      return `${API_BASE_URL}${url.pathname}`;
    } catch (e) {
      return `${API_BASE_URL}${src.replace(/^http:\/\//, '')}`;
    }
  }

  // If a protocol-relative or root-relative path, prefix with API_BASE_URL
  if (src.startsWith('/') || src.startsWith('./') || src.startsWith('../')) {
    // ensure no double slashes
    return `${API_BASE_URL.replace(/\/$/, '')}/${src.replace(/^\//, '')}`;
  }

  // Fallback: return as-is
  return src;
}
