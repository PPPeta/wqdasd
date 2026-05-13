/**
 * InsurePro — API helper & auth utilities
 */
(function () {
  'use strict';

  const metaBase = document.querySelector('meta[name="api-base"]');
  const BASE_URL = metaBase ? metaBase.content.replace(/\/+$/, '') : 'http://localhost:8000';

  /* ─── ApiError ─────────────────────────────────────────────── */
  class ApiError extends Error {
    constructor(message, status, data) {
      super(message);
      this.name = 'ApiError';
      this.status = status;
      this.data = data;
    }
  }

  /* ─── Fetch wrapper ────────────────────────────────────────── */
  async function apiFetch(endpoint, options = {}) {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    const token = localStorage.getItem('insurepro_token');

    const headers = Object.assign(
      { 'Content-Type': 'application/json', Accept: 'application/json' },
      token ? { Authorization: `Bearer ${token}` } : {},
      options.headers || {}
    );

    if (options.body instanceof FormData) {
      delete headers['Content-Type'];
    }

    const config = Object.assign({}, options, { headers });
    if (options.body && !(options.body instanceof FormData)) {
      config.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
    }

    const response = await fetch(url, config);

    if (response.status === 401) {
      auth.logout();
      return;
    }

    let data = null;
    const ct = response.headers.get('content-type') || '';
    if (ct.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const msg = (data && data.detail) || (data && data.message) || response.statusText;
      throw new ApiError(msg, response.status, data);
    }

    return data;
  }

  /* ─── Auth object ──────────────────────────────────────────── */
  const auth = {
    async login(email, password, remember) {
      const data = await apiFetch('/auth/login/', {
        method: 'POST',
        body: { email, password }
      });
      if (data && data.access) {
        localStorage.setItem('insurepro_token', data.access);
        if (data.refresh) localStorage.setItem('insurepro_refresh', data.refresh);
        if (data.user) localStorage.setItem('insurepro_user', JSON.stringify(data.user));
        if (remember) localStorage.setItem('insurepro_remember', '1');
      }
      return data;
    },

    logout() {
      localStorage.removeItem('insurepro_token');
      localStorage.removeItem('insurepro_refresh');
      localStorage.removeItem('insurepro_user');
      localStorage.removeItem('insurepro_remember');
      window.location.href = '/login.html';
    },

    user() {
      try {
        return JSON.parse(localStorage.getItem('insurepro_user'));
      } catch {
        return null;
      }
    },

    hasRole(role) {
      const u = this.user();
      if (!u) return false;
      if (Array.isArray(role)) return role.includes(u.role);
      return u.role === role;
    },

    isAuthenticated() {
      return !!localStorage.getItem('insurepro_token');
    },

    requireAuth() {
      if (!this.isAuthenticated()) {
        window.location.href = '/login.html';
        return false;
      }
      return true;
    }
  };

  /* ─── Toast ────────────────────────────────────────────────── */
  function toast(message, type = 'info') {
    const colors = {
      success: { background: '#16a34a' },
      error: { background: '#dc2626' },
      info: { background: '#2563eb' },
      warning: { background: '#d97706' }
    };
    if (typeof Toastify !== 'undefined') {
      Toastify({
        text: message,
        duration: 4000,
        close: true,
        gravity: 'top',
        position: 'right',
        style: colors[type] || colors.info
      }).showToast();
    } else {
      console.log(`[${type.toUpperCase()}] ${message}`);
    }
  }

  /* ─── Currency formatter ───────────────────────────────────── */
  const formatCurrency = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format;

  /* ─── Expose on window ─────────────────────────────────────── */
  window.InsurePro = window.InsurePro || {};
  Object.assign(window.InsurePro, {
    apiFetch,
    auth,
    toast,
    ApiError,
    formatCurrency,
    BASE_URL
  });
})();
