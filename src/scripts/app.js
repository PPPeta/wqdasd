/* ==========================================================
   InsurePro — общие скрипты для всех приложений-страниц
   (после mock.js: использует window.MOCK_USER и хэлперы)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();
  injectUser();
  wireLogout();
  wireModals();
});

/* ------------------ Sidebar ------------------ */
function initSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const toggle = document.querySelector('.sidebar-toggle');
  const backdrop = document.querySelector('.sidebar-backdrop');

  if (!sidebar) return;

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

/* ------------------ Logout ------------------ */
function wireLogout() {
  const logoutBtn = document.querySelector('.btn-logout');
  if (!logoutBtn) return;
  logoutBtn.addEventListener('click', () => {
    // TODO(API): POST /api/auth/logout
    window.location.href = '../pages/log.html';
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
