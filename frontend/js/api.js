const API_BASE_URL = 'http://localhost:3000/api';

async function request(path, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) };
  const token = localStorage.getItem('gamesvauch_token');
  if (token) headers.Authorization = `Bearer ${token}`;

  const response = await fetch(`${API_BASE_URL}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || 'Request failed');
  }

  return data;
}

export const api = {
  register: (payload) => request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  login: (payload) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload)
  }),
  me: () => request('/auth/me'),
  games: () => request('/games')
};

export function saveSession(data) {
  localStorage.setItem('gamesvauch_token', data.token);
  localStorage.setItem('gamesvauch_user', JSON.stringify(data.user));
}

export function clearSession() {
  localStorage.removeItem('gamesvauch_token');
  localStorage.removeItem('gamesvauch_user');
}

export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem('gamesvauch_user'));
  } catch {
    return null;
  }
}
