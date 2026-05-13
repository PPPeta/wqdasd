/* ==========================================================
   InsurePro — общие скрипты для всех приложений-страниц
   (после mock.js: использует window.MOCK_USER и хэлперы)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  loadRoleFromStorage();
  initSidebar();
  injectUser();
  mountUserMenu();
  wireLogout();
  wireModals();
  mountRoleSwitcher();
});

/* ------------------ Role switcher (dev-режим) ------------------ */
// Читаем сохранённую роль из localStorage (если была выбрана) — ДО injectUser()
function loadRoleFromStorage() {
  try {
    const saved = localStorage.getItem('ip_demo_role');
    if (saved && window.MOCK_USER && window.MOCK_USER.role !== saved) {
      // Подменяем роль + ФИО+компанию для наглядности
      const presets = {
        admin: { first_name: 'Алексей', last_name: 'Администратор', email: 'admin@insurepro.ru', company: 'InsurePro' },
        company_manager: { first_name: 'Иван', last_name: 'Петров', email: 'ivan@company.ru', company: 'ООО «Прогресс»' },
        employee: { first_name: 'Анна', last_name: 'Смирнова', email: 'anna.smirnova@company.ru', company: 'ООО «Прогресс»' },
      };
      Object.assign(window.MOCK_USER, presets[saved] || {}, { role: saved });
    }
  } catch (e) { /* ignore */ }
}

function mountRoleSwitcher() {
  // Только на app-страницах (где есть .app-layout)
  if (!document.querySelector('.app-layout')) return;
  if (document.querySelector('.role-switcher')) return;

  const roles = [
    { key: 'admin', label: 'Админ' },
    { key: 'company_manager', label: 'Руководитель' },
    { key: 'employee', label: 'Сотрудник' },
  ];

  const el = document.createElement('div');
  el.className = 'role-switcher';
  el.setAttribute('aria-label', 'Переключатель ролей (демо)');
  el.innerHTML = `
    <span class="role-switcher-label">Роль</span>
    ${roles.map(r => `<button type="button" data-role="${r.key}" class="${(window.MOCK_USER?.role === r.key) ? 'active' : ''}">${r.label}</button>`).join('')}
  `;
  document.body.appendChild(el);

  el.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      const role = btn.dataset.role;
      try { localStorage.setItem('ip_demo_role', role); } catch (e) {}
      location.reload();
    });
  });
}


/* ------------------ Sidebar ------------------ */
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  const backdrop = document.querySelector('.sidebar-backdrop');

  if (!sidebar) return;

  // Прячем пункты, недоступные текущей роли (если у ссылок есть data-roles)
  const role = window.MOCK_USER?.role;
  if (role) {
    sidebar.querySelectorAll('a[data-roles]').forEach((a) => {
      const allowed = a.dataset.roles.split(',').map((s) => s.trim());
      if (!allowed.includes(role)) a.style.display = 'none';
    });
  }

  if (toggle) {
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });
  }
  if (backdrop) {
    backdrop.addEventListener('click', () => sidebar.classList.remove('open'));
  }

  // Закрывать сайдбар при выборе пункта на мобильных
  sidebar.querySelectorAll('a').forEach((a) =>
    a.addEventListener('click', () => {
      if (window.innerWidth < 769) sidebar.classList.remove('open');
    })
  );
}

/* ------------------ Внедрение инфо о пользователе ------------------ */
function injectUser() {
  const user = window.MOCK_USER;
  if (!user) return;

  const nameEl = document.querySelector('.navbar-user-name');
  const roleEl = document.querySelector('.navbar-user-role');
  const avatarEl = document.querySelector('.navbar-avatar');

  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();
  if (nameEl) nameEl.textContent = fullName || user.email || 'Пользователь';
  if (roleEl) {
    const roleLabel = (window.ROLE_LABELS && window.ROLE_LABELS[user.role]) || '—';
    roleEl.textContent = roleLabel;
  }
  if (avatarEl) {
    avatarEl.textContent = window.getInitials
      ? window.getInitials(user.first_name, user.last_name)
      : (fullName.charAt(0) || 'U').toUpperCase();
  }
}

/* ------------------ User menu (dropdown на навбаре) ------------------ */
function mountUserMenu() {
  const userBlock = document.querySelector('.navbar-user');
  if (!userBlock) return;
  if (document.querySelector('.user-menu-dropdown')) return;

  // Делаем блок интерактивным
  userBlock.style.cursor = 'pointer';
  userBlock.setAttribute('role', 'button');
  userBlock.setAttribute('tabindex', '0');
  userBlock.setAttribute('aria-haspopup', 'menu');
  userBlock.setAttribute('aria-expanded', 'false');

  // Проверяем, мы в папке pages или в корне (для относительного пути)
  const dropdown = document.createElement('div');
  dropdown.className = 'user-menu-dropdown';
  dropdown.setAttribute('role', 'menu');
  dropdown.innerHTML = `
    <a href="profile.html" role="menuitem">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      Мой профиль
    </a>
    <a href="profile.html#password" role="menuitem">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
      Сменить пароль
    </a>
    <div class="user-menu-divider"></div>
    <button type="button" class="user-menu-logout" role="menuitem">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
      Выйти
    </button>
  `;
  userBlock.appendChild(dropdown);

  const open = () => {
    userBlock.classList.add('open');
    userBlock.setAttribute('aria-expanded', 'true');
  };
  const close = () => {
    userBlock.classList.remove('open');
    userBlock.setAttribute('aria-expanded', 'false');
  };

  userBlock.addEventListener('click', (e) => {
    // Клик по самому dropdown не должен триггерить toggle
    if (e.target.closest('.user-menu-dropdown')) return;
    userBlock.classList.contains('open') ? close() : open();
    e.stopPropagation();
  });

  document.addEventListener('click', (e) => {
    if (!userBlock.contains(e.target)) close();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  // Выход через menu
  dropdown.querySelector('.user-menu-logout').addEventListener('click', () => {
    // TODO(API): POST /auth/logout/ { access_token, refresh_token }
    window.location.href = 'log.html';
  });
}

/* ------------------ Logout (старая кнопка в навбаре) ------------------ */
function wireLogout() {
  const logoutBtn = document.querySelector('.btn-logout');
  if (!logoutBtn) return;
  logoutBtn.addEventListener('click', () => {
    // TODO(API): POST /auth/logout/
    window.location.href = 'log.html';
  });
}

/* ------------------ Модалки ------------------ */
function wireModals() {
  // Закрытие по overlay и по кнопке .modal-close
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });
  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const overlay = btn.closest('.modal-overlay');
      if (overlay) closeModal(overlay.id);
    });
  });

  // Escape — закрыть активную модалку
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const active = document.querySelector('.modal-overlay.active');
    if (active) closeModal(active.id);
  });

  // Любая кнопка с data-modal-open откроет соответствующую
  document.querySelectorAll('[data-modal-open]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.modalOpen));
  });
}

function openModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('active');
  document.body.style.overflow = '';
}

window.openModal = openModal;
window.closeModal = closeModal;

/* ------------------ Плавающие лейблы у <select> ------------------ */
// Для select трюк с :placeholder-shown не работает — помечаем класс вручную.
function markSelectsWithValue(root) {
  (root || document).querySelectorAll('.input-group select').forEach((s) => {
    const update = () => {
      if (s.value) s.classList.add('has-value');
      else s.classList.remove('has-value');
    };
    update();
    s.addEventListener('change', update);
  });
}
document.addEventListener('DOMContentLoaded', () => markSelectsWithValue(document));
window.markSelectsWithValue = markSelectsWithValue;

/* ------------------ Шаблон: empty row для таблиц ------------------ */
function tableEmptyRow(colspan, text) {
  return `<tr><td colspan="${colspan}"><div class="empty-state"><h3>Ничего не найдено</h3><p>${text || 'По выбранным фильтрам нет данных'}</p></div></td></tr>`;
}
window.tableEmptyRow = tableEmptyRow;

/* ------------------ Утилита: html-escape ------------------ */
function esc(s) {
  if (s == null) return '';
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
window.esc = esc;
