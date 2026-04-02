// Shared security utilities for API routes

const ALLOWED_ORIGINS = ['https://sophisticatesai.com', 'http://localhost:3000'];

export function isValidOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true; // same-origin or server-to-server
  return ALLOWED_ORIGINS.includes(origin);
}
