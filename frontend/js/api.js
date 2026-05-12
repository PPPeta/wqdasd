/* ==========================================================================
 * InsurePro — API helper
 *
 * Exposes:
 *   api(method, url, body?)   → fetch wrapper with auth + 401 redirect
 *   auth.login(email, pw)     → stores access/refresh in localStorage
 *   auth.logout()             → revokes tokens, clears storage, redirects
 *   auth.user()               → { email, role, firstName, lastName } | null
 *   auth.hasRole('admin')     → boolean
 *
 * All pages must include this script. Base URL is configurable via
 * <meta name="api-base" content="https://api.example.com">.
 * Falls back to http://localhost:8000.
 * ========================================================================== */

(function () {
  'use strict';

  const meta = document.querySelector('meta[name="api-base"]');
  const API_BASE = (meta && meta.content) || 'http://localhost:8000';

  const STORAGE = {
    access: 'access_token',
    refresh: 'refresh_token',
    user: 'user_profile',
  };

  /** Low-level fetch wrapper. Throws on non-2xx with a normalised error. */
  async function api(method, url, body) {
    const token = localStorage.getItem(STORAGE.access);
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = 'Bearer ' + token;

    let res;
    try {
      res = await fetch(API_BASE + url, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      });
    } catch (networkErr) {
      throw new ApiError('Сеть недоступна. Проверьте подключение.', 0, networkErr);
    }

    if (res.status === 401 && !url.startsWith('/auth/')) {
      localStorage.clear();
      if (location.pathname !== '/login.html') location.href = '/login.html';
      throw new ApiError('Сессия истекла. Войдите заново.', 401);
    }

    let payload = null;
    const text = await res.text();
    if (text) {
      try { payload = JSON.parse(text); } catch (_) { payload = text; }
    }

    if (!res.ok) {
      const msg = (payload && (payload.detail || payload.message)) || `Ошибка ${res.status}`;
      throw new ApiError(msg, res.status, payload);
    }
    return payload;
  }

  class ApiError extends Error {
    constructor(message, status, payload) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.payload = payload;
    }
  }

  const auth = {
    async login(email, password) {
      const data = await api('POST', '/auth/', { email, password });
      if (!data || !data.access) throw new ApiError('Некорректный ответ сервера', 500);
      localStorage.setItem(STORAGE.access, data.access);
      if (data.refresh) localStorage.setItem(STORAGE.refresh, data.refresh);
      if (data.user) localStorage.setItem(STORAGE.user, JSON.stringify(data.user));
      return data;
    },

    async logout() {
      try {
        await api('POST', '/auth/logout/', {
          access_token: localStorage.getItem(STORAGE.access),
          refresh_token: localStorage.getItem(STORAGE.refresh),
        });
      } catch (_) { /* logout should never fail hard */ }
      localStorage.clear();
      location.href = '/login.html';
    },

    user() {
      const raw = localStorage.getItem(STORAGE.user);
      if (!raw) return null;
      try { return JSON.parse(raw); } catch (_) { return null; }
    },

    hasRole(...roles) {
      const u = auth.user();
      return Boolean(u && roles.includes(u.role));
    },

    isAuthenticated() {
      return Boolean(localStorage.getItem(STORAGE.access));
    },

    /** Redirects to /login.html if not authenticated. Call on page load. */
    requireAuth() {
      if (!auth.isAuthenticated()) {
        location.href = '/login.html';
        return false;
      }
      return true;
    },
  };

  /** Lightweight toast via Toastify-JS if loaded; falls back to console. */
  function toast(message, type = 'info') {
    if (window.Toastify) {
      const colors = {
        info: 'linear-gradient(to right, #3b82f6, #2563eb)',
        success: 'linear-gradient(to right, #10b981, #059669)',
        error: 'linear-gradient(to right, #ef4444, #dc2626)',
        warning: 'linear-gradient(to right, #f59e0b, #d97706)',
      };
      window.Toastify({
        text: message,
        duration: 4000,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
        style: { background: colors[type] || colors.info, borderRadius: '10px' },
      }).showToast();
    } else {
      console.log(`[${type}]`, message);
    }
  }

  window.InsurePro = window.InsurePro || {};
  window.InsurePro.api = api;
  window.InsurePro.auth = auth;
  window.InsurePro.toast = toast;
  window.InsurePro.ApiError = ApiError;
  window.InsurePro.API_BASE = API_BASE;
})();
