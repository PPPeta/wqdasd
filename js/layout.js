/**
 * InsurePro — Shared layout (navbar + sidebar)
 */
(function () {
  'use strict';

  const NAV_ITEMS = [
    { id: 'dashboard', label: 'Панель управления', href: '/dashboard.html', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', roles: null },
    { id: 'employees', label: 'Сотрудники', href: '/employees.html', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', roles: ['admin', 'manager'] },
    { id: 'plans', label: 'Планы страхования', href: '/plans.html', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', roles: null },
    { id: 'policies', label: 'Полисы', href: '/policies.html', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', roles: null },
    { id: 'claims', label: 'Заявки', href: '/claims.html', icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', roles: null },
    { id: 'reports', label: 'Отчёты', href: '/reports.html', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', roles: ['admin', 'manager'] }
  ];

  function getInitials(name) {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    return parts.map(p => p[0]).slice(0, 2).join('').toUpperCase();
  }

  function heroIcon(path) {
    return `<svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="${path}"/></svg>`;
  }

  function mountChrome(activeId) {
    const { auth } = window.InsurePro;
    if (!auth.requireAuth()) return;

    const user = auth.user() || { name: 'Пользователь', role: 'employee', email: '' };
    const userRole = user.role || 'employee';
    const userName = user.name || user.email || 'Пользователь';

    const roleLabels = { admin: 'Администратор', manager: 'Менеджер', employee: 'Сотрудник' };

    const filteredNav = NAV_ITEMS.filter(item => {
      if (!item.roles) return true;
      return item.roles.includes(userRole);
    });

    /* ─── Skip link ──────────────────────────────────────── */
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.className = 'skip-link';
    skipLink.textContent = 'Перейти к содержимому';
    document.body.prepend(skipLink);

    /* ─── Navbar ─────────────────────────────────────────── */
    const navbar = document.createElement('header');
    navbar.setAttribute('role', 'banner');
    navbar.className = 'sticky top-0 z-50 bg-white border-b border-slate-200 h-16 flex items-center px-4 lg:px-6';
    navbar.innerHTML = `
      <button data-action="toggle-sidebar" class="lg:hidden mr-3 p-2 rounded-lg hover:bg-slate-100 transition" aria-label="Открыть меню">
        <svg class="w-6 h-6 text-slate-600" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/></svg>
      </button>
      <a href="/dashboard.html" class="flex items-center gap-2 font-bold text-blue-600 text-lg" aria-label="InsurePro — Главная">
        <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
        <span class="hidden sm:inline">InsurePro</span>
      </a>
      <div class="ml-auto flex items-center gap-3">
        <div class="text-right hidden sm:block">
          <div class="text-sm font-medium text-slate-800">${userName}</div>
          <div class="text-xs text-slate-500">${roleLabels[userRole] || userRole}</div>
        </div>
        <div class="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold" aria-hidden="true">${getInitials(userName)}</div>
        <button data-action="logout" class="p-2 rounded-lg hover:bg-slate-100 transition" aria-label="Выйти" title="Выйти">
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/></svg>
        </button>
      </div>
    `;
    document.body.prepend(navbar);

    /* ─── Sidebar ────────────────────────────────────────── */
    const aside = document.createElement('aside');
    aside.setAttribute('data-chrome-sidebar', '');
    aside.setAttribute('role', 'navigation');
    aside.setAttribute('aria-label', 'Основная навигация');
    aside.innerHTML = `
      <div class="p-4 border-b border-slate-100 flex items-center justify-between lg:hidden">
        <span class="font-bold text-blue-600">InsurePro</span>
        <button data-action="close-sidebar" class="p-1.5 rounded-lg hover:bg-slate-100" aria-label="Закрыть меню">
          <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <nav class="p-3 flex flex-col gap-1" aria-label="Меню">
        ${filteredNav.map(item => {
          const active = item.id === activeId;
          return `<a href="${item.href}" class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}" ${active ? 'aria-current="page"' : ''}>
            ${heroIcon(item.icon)}
            <span>${item.label}</span>
          </a>`;
        }).join('')}
      </nav>
    `;

    const backdrop = document.createElement('div');
    backdrop.setAttribute('data-chrome-backdrop', '');
    backdrop.setAttribute('data-action', 'close-sidebar');

    /* ─── Layout wrapper ─────────────────────────────────── */
    const main = document.querySelector('main') || document.createElement('main');
    main.id = 'main-content';
    main.setAttribute('role', 'main');

    const layoutWrap = document.createElement('div');
    layoutWrap.className = 'flex min-h-[calc(100vh-4rem)]';
    layoutWrap.appendChild(aside);
    layoutWrap.appendChild(backdrop);

    const contentWrap = document.createElement('div');
    contentWrap.className = 'flex-1 bg-gray-50 p-4 lg:p-6 overflow-x-hidden';

    // Move main's children into contentWrap
    while (main.firstChild) {
      contentWrap.appendChild(main.firstChild);
    }
    layoutWrap.appendChild(contentWrap);
    main.appendChild(layoutWrap);

    if (!main.parentNode) {
      document.body.appendChild(main);
    }

    /* ─── Event delegation ───────────────────────────────── */
    document.addEventListener('click', function (e) {
      const action = e.target.closest('[data-action]');
      if (!action) return;

      const act = action.getAttribute('data-action');
      if (act === 'toggle-sidebar') {
        aside.classList.add('is-open');
      } else if (act === 'close-sidebar') {
        aside.classList.remove('is-open');
      } else if (act === 'logout') {
        e.preventDefault();
        auth.logout();
      }
    });

    /* ─── Close sidebar on Escape ────────────────────────── */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && aside.classList.contains('is-open')) {
        aside.classList.remove('is-open');
      }
    });
  }

  /* ─── Alpine store ─────────────────────────────────────── */
  document.addEventListener('alpine:init', function () {
    if (window.Alpine && window.Alpine.store) {
      const user = window.InsurePro.auth.user() || {};
      window.Alpine.store('auth', {
        user: user,
        role: user.role || 'employee',
        isAuthenticated: window.InsurePro.auth.isAuthenticated(),
        hasRole(role) {
          return window.InsurePro.auth.hasRole(role);
        }
      });
    }
  });

  /* ─── Expose ───────────────────────────────────────────── */
  window.InsurePro = window.InsurePro || {};
  window.InsurePro.mountChrome = mountChrome;
})();
