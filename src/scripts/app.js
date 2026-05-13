/* InsurePro — App shell logic (sidebar toggle, page init) */

document.addEventListener('DOMContentLoaded', () => {
  // Sidebar toggle
  const sidebar = document.querySelector('.sidebar');
  const backdrop = document.querySelector('.sidebar-backdrop');
  const toggleBtn = document.querySelector('.sidebar-toggle');

  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      document.body.style.overflow = sidebar.classList.contains('open') ? 'hidden' : '';
    });
  }
  if (backdrop && sidebar) {
    backdrop.addEventListener('click', () => {
      sidebar.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close modals on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
    }
  });

  // User info in navbar
  const nameEl = document.querySelector('.navbar-user-name');
  const roleEl = document.querySelector('.navbar-user-role');
  const avatarEl = document.querySelector('.navbar-avatar');
  if (nameEl) nameEl.textContent = MOCK_USER.first_name + ' ' + MOCK_USER.last_name;
  if (roleEl) roleEl.textContent = ROLE_LABELS[MOCK_USER.role] || '';
  if (avatarEl) avatarEl.textContent = (MOCK_USER.first_name[0] + MOCK_USER.last_name[0]).toUpperCase();

  // Logout button
  const logoutBtn = document.querySelector('.btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      // TODO(API): POST /auth/logout/
      window.location.href = '../pages/log.html';
    });
  }
});

/* Modal helpers */
function openModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.add('active');
}
function closeModal(id) {
  const m = document.getElementById(id);
  if (m) m.classList.remove('active');
}
