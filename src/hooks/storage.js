// Storage layer using localStorage (simpler for React)
const PREFIX = 'hn_';

export const storage = {
  get(key) {
    try { return localStorage.getItem(PREFIX + key); } catch { return null; }
  },
  set(key, value) {
    try { localStorage.setItem(PREFIX + key, String(value)); } catch {}
  },
  getJSON(key, fallback = null) {
    try {
      const v = localStorage.getItem(PREFIX + key);
      return v ? JSON.parse(v) : fallback;
    } catch { return fallback; }
  },
  setJSON(key, value) {
    try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch {}
  },
  remove(key) {
    try { localStorage.removeItem(PREFIX + key); } catch {}
  },
  clear() {
    try {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k && k.startsWith(PREFIX)) keys.push(k);
      }
      keys.forEach(k => localStorage.removeItem(k));
    } catch {}
  }
};
