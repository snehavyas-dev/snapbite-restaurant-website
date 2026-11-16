const API_BASE_URL = process.env.API_BASE_URL.replace(/\/$/, '');

export function apiUrl(path) {
  return `${API_BASE_URL}${path}`;
}
