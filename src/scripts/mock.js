/* ==========================================================
   InsurePro — Mock data (временные данные до интеграции API)
   ========================================================== */

// TODO(API): заменить на ответ GET /api/me
const MOCK_USER = {
  first_name: 'Иван',
  last_name: 'Петров',
  email: 'ivan@company.ru',
  role: 'company_manager', // admin | company_manager | employee
  company: 'ООО «Прогресс»',
};

const STATUS_LABELS = {
  pending: 'В ожидании',
  approved: 'Одобрено',
  rejected: 'Отклонено',
  active: 'Активен',
  draft: 'Черновик',
  suspended: 'Приостановлен',
  cancelled: 'Отменён',
  expired: 'Истёк',
};

const TYPE_LABELS = {
  medical: 'Медуслуга',
  hospitalization: 'Госпитализация',
  medication: 'Медикаменты',
  dental: 'Стоматология',
};

const ROLE_LABELS = {
  admin: 'Администратор',
  company_manager: 'Менеджер компании',
  employee: 'Сотрудник',
};

const REPORT_TYPE_LABELS = {
  organizations: 'По организациям',
  employees: 'По сотрудникам',
  policies: 'По полисам',
  claims: 'По обращениям',
  financial: 'Финансовый',
};

// TODO(API): /api/plans
const MOCK_PLANS = [
  {
    id: 1,
    name: 'Базовый',
    description: 'Необходимый минимум для защиты сотрудников',
    price: 1500,
    coverages: [
      'Амбулаторная помощь',
      'Экстренная стоматология',
      'Вызов врача на дом',
      'Приём у терапевта',
      'Базовые диагностические анализы',
    ],
  },
  {
    id: 2,
    name: 'Стандарт',
    description: 'Оптимальный выбор для большинства команд',
    price: 3200,
    featured: true,
    coverages: [
      'Всё из тарифа «Базовый»',
      'Расширенная стоматология',
      'Госпитализация (эконом палата)',
      'Приём узких специалистов',
      'МРТ, КТ по показаниям',
      'Компенсация медикаментов',
    ],
  },
  {
    id: 3,
    name: 'Премиум',
    description: 'Максимальная защита и сервис бизнес-класса',
    price: 5800,
    coverages: [
      'Всё из тарифа «Стандарт»',
      'Премиум-клиники и VIP-палаты',
      'Плановые операции',
      'Стоматологическая имплантация',
      'Персональный координатор 24/7',
      'Телемедицина без ограничений',
      'Check-up раз в год',
    ],
  },
];

// TODO(API): /api/employees
const MOCK_EMPLOYEES = [
  { id: 1, first_name: 'Анна', last_name: 'Смирнова', email: 'anna.smirnova@company.ru', is_active: true, policies_count: 2, position: 'Маркетолог' },
  { id: 2, first_name: 'Дмитрий', last_name: 'Иванов', email: 'd.ivanov@company.ru', is_active: true, policies_count: 1, position: 'Разработчик' },
  { id: 3, first_name: 'Мария', last_name: 'Попова', email: 'm.popova@company.ru', is_active: true, policies_count: 2, position: 'HR-менеджер' },
  { id: 4, first_name: 'Алексей', last_name: 'Кузнецов', email: 'a.kuznetsov@company.ru', is_active: true, policies_count: 1, position: 'Руководитель отдела' },
  { id: 5, first_name: 'Екатерина', last_name: 'Волкова', email: 'e.volkova@company.ru', is_active: false, policies_count: 0, position: 'Дизайнер' },
  { id: 6, first_name: 'Сергей', last_name: 'Соколов', email: 's.sokolov@company.ru', is_active: true, policies_count: 2, position: 'Продажи' },
  { id: 7, first_name: 'Ольга', last_name: 'Михайлова', email: 'o.mikhailova@company.ru', is_active: true, policies_count: 1, position: 'Бухгалтер' },
  { id: 8, first_name: 'Павел', last_name: 'Фёдоров', email: 'p.fedorov@company.ru', is_active: false, policies_count: 0, position: 'Стажёр' },
];

// TODO(API): /api/policies
const MOCK_POLICIES = [
  { id: 1, number: 'POL-2024-001', company: 'ООО «Прогресс»', plan: 'Стандарт', status: 'active', start: '2024-03-01', end: '2025-03-01', employees: 32, monthly: 102400 },
  { id: 2, number: 'POL-2024-002', company: 'ООО «Прогресс»', plan: 'Премиум', status: 'active', start: '2024-04-15', end: '2025-04-15', employees: 8, monthly: 46400 },
  { id: 3, number: 'POL-2024-003', company: 'ООО «Прогресс»', plan: 'Базовый', status: 'active', start: '2024-06-01', end: '2025-06-01', employees: 5, monthly: 7500 },
  { id: 4, number: 'POL-2024-004', company: 'ООО «Прогресс»', plan: 'Стандарт', status: 'draft', start: null, end: null, employees: 0, monthly: 0 },
  { id: 5, number: 'POL-2023-088', company: 'ООО «Прогресс»', plan: 'Базовый', status: 'expired', start: '2023-01-10', end: '2024-01-10', employees: 12, monthly: 18000 },
  { id: 6, number: 'POL-2024-005', company: 'ООО «Прогресс»', plan: 'Стандарт', status: 'suspended', start: '2024-02-20', end: '2025-02-20', employees: 4, monthly: 12800 },
  { id: 7, number: 'POL-2023-076', company: 'ООО «Прогресс»', plan: 'Премиум', status: 'cancelled', start: '2023-06-01', end: '2024-06-01', employees: 2, monthly: 11600 },
];

// TODO(API): /api/claims
const MOCK_CLAIMS = [
  { id: 1, number: 'CLM-2025-015', type: 'medical', employee: 'Анна Смирнова', status: 'pending', amount: 8400, date: '2025-01-14', place: 'Клиника «Медси»' },
  { id: 2, number: 'CLM-2025-014', type: 'dental', employee: 'Дмитрий Иванов', status: 'approved', amount: 22500, date: '2025-01-12', place: 'Dental Pro' },
  { id: 3, number: 'CLM-2025-013', type: 'medication', employee: 'Мария Попова', status: 'pending', amount: 3120, date: '2025-01-10', place: 'Аптека 36.6' },
  { id: 4, number: 'CLM-2025-012', type: 'hospitalization', employee: 'Алексей Кузнецов', status: 'approved', amount: 145000, date: '2025-01-04', place: 'ГКБ №1' },
  { id: 5, number: 'CLM-2024-098', type: 'medical', employee: 'Сергей Соколов', status: 'rejected', amount: 5200, date: '2024-12-28', place: 'Клиника «СМ»' },
];

// TODO(API): /api/policies/:id
const MOCK_POLICY_DETAIL = {
  id: 1,
  number: 'POL-2024-001',
  company: 'ООО «Прогресс»',
  inn: '7712345678',
  plan: 'Стандарт',
  status: 'active',
  start: '2024-03-01',
  end: '2025-03-01',
  employees: 32,
  monthly: 102400,
  total: 1228800,
  coverages: [
    'Амбулаторная помощь',
    'Экстренная стоматология',
    'Госпитализация (эконом)',
    'Приём узких специалистов',
    'МРТ и КТ',
    'Лабораторные анализы',
    'Вызов врача на дом',
    'Телемедицина',
  ],
  history: [
    { date: '2024-03-01', event: 'Полис оформлен', user: 'Иван Петров' },
    { date: '2024-05-10', event: 'Добавлено 4 сотрудника', user: 'Иван Петров' },
    { date: '2024-08-22', event: 'Обновлён список покрытий', user: 'Администратор' },
    { date: '2024-11-15', event: 'Перерасчёт по составу команды', user: 'Система' },
  ],
};

// TODO(API): /api/claims/:id
const MOCK_CLAIM_DETAIL = {
  id: 1,
  number: 'CLM-2025-015',
  type: 'medical',
  employee: 'Анна Смирнова',
  employee_position: 'Маркетолог',
  status: 'pending',
  amount: 8400,
  date: '2025-01-14',
  place: 'Клиника «Медси» на Белорусской',
  doctor: 'Козлова О. В.',
  description:
    'Приём терапевта с комплексом анализов. Возмещение стоимости услуг по программе ДМС в рамках полиса POL-2024-001. Приложены чек, выписка и акт оказанных услуг.',
  documents: [
    { id: 1, name: 'Чек клиники.pdf', size: '184 КБ' },
    { id: 2, name: 'Выписка врача.pdf', size: '326 КБ' },
    { id: 3, name: 'Акт услуг.pdf', size: '212 КБ' },
  ],
  timeline: [
    { date: '2025-01-14 09:12', title: 'Обращение создано', state: 'done', body: 'Анна Смирнова загрузила документы' },
    { date: '2025-01-14 11:30', title: 'Проверка документов', state: 'done', body: 'Документы соответствуют условиям полиса' },
    { date: '—', title: 'Решение по выплате', state: 'active', body: 'Ожидает утверждения менеджером' },
    { date: '—', title: 'Выплата', state: '', body: 'Зачисление на счёт в течение 3 рабочих дней' },
  ],
};

// TODO(API): /api/dashboard
const MOCK_DASHBOARD = {
  admin: { companies: 48, policies: 312, claims: 127, revenue: 14800000 },
  company_manager: { employees: 45, active_policies: 3, pending_claims: 5, expiring: 2 },
  employee: { my_policies: 1, my_claims: 2 },
};

// TODO(API): /organization/get/
const MOCK_ORGANIZATIONS = [
  { id: 1, company_name: 'ООО «Прогресс»', company_inn: '7712345678', size: '51-250', employees: 45, policies: 3, manager: 'Иван Петров', status: 'active', created_at: '2024-02-14' },
  { id: 2, company_name: 'АО «Меркурий»', company_inn: '7799001122', size: '251+', employees: 78, policies: 5, manager: 'Ольга Смирнова', status: 'active', created_at: '2024-03-20' },
  { id: 3, company_name: 'ООО «Старт»', company_inn: '7811222333', size: '1-50', employees: 22, policies: 2, manager: 'Павел Иванов', status: 'active', created_at: '2024-04-05' },
  { id: 4, company_name: 'ПАО «Вектор»', company_inn: '7700112233', size: '251+', employees: 110, policies: 4, manager: 'Елена Козлова', status: 'active', created_at: '2024-05-10' },
  { id: 5, company_name: 'ООО «Интеграл»', company_inn: '7822445566', size: '51-250', employees: 67, policies: 3, manager: 'Дмитрий Орлов', status: 'active', created_at: '2024-06-18' },
  { id: 6, company_name: 'ООО «Флагман»', company_inn: '7733556677', size: '51-250', employees: 54, policies: 2, manager: 'Михаил Соколов', status: 'suspended', created_at: '2024-07-22' },
  { id: 7, company_name: 'ООО «Сфера»', company_inn: '7744667788', size: '1-50', employees: 18, policies: 1, manager: 'Татьяна Морозова', status: 'active', created_at: '2024-09-01' },
  { id: 8, company_name: 'АО «Ориент»', company_inn: '7755778899', size: '251+', employees: 140, policies: 6, manager: 'Сергей Белов', status: 'active', created_at: '2024-10-14' },
];

// TODO(API): /users/ (все пользователи системы)
const MOCK_USERS = [
  { id: 1, email: 'admin@insurepro.ru',    first_name: 'Алексей', last_name: 'Администратор', role: 'admin',           company: 'InsurePro',          is_active: true,  email_verified: true,  created_at: '2024-01-15' },
  { id: 2, email: 'ivan@company.ru',       first_name: 'Иван',    last_name: 'Петров',         role: 'company_manager', company: 'ООО «Прогресс»',    is_active: true,  email_verified: true,  created_at: '2024-02-14' },
  { id: 3, email: 'olga@mercury.ru',       first_name: 'Ольга',   last_name: 'Смирнова',       role: 'company_manager', company: 'АО «Меркурий»',     is_active: true,  email_verified: true,  created_at: '2024-03-20' },
  { id: 4, email: 'pavel@start.ru',        first_name: 'Павел',   last_name: 'Иванов',         role: 'company_manager', company: 'ООО «Старт»',       is_active: true,  email_verified: true,  created_at: '2024-04-05' },
  { id: 5, email: 'elena@vector.ru',       first_name: 'Елена',   last_name: 'Козлова',        role: 'company_manager', company: 'ПАО «Вектор»',      is_active: true,  email_verified: false, created_at: '2024-05-10' },
  { id: 6, email: 'anna.smirnova@company.ru', first_name: 'Анна', last_name: 'Смирнова',       role: 'employee',        company: 'ООО «Прогресс»',    is_active: true,  email_verified: true,  created_at: '2024-06-12' },
  { id: 7, email: 'd.ivanov@company.ru',   first_name: 'Дмитрий', last_name: 'Иванов',         role: 'employee',        company: 'ООО «Прогресс»',    is_active: true,  email_verified: true,  created_at: '2024-07-02' },
  { id: 8, email: 'm.popova@company.ru',   first_name: 'Мария',   last_name: 'Попова',         role: 'employee',        company: 'ООО «Прогресс»',    is_active: true,  email_verified: true,  created_at: '2024-07-15' },
  { id: 9, email: 'a.kuznetsov@company.ru',first_name: 'Алексей', last_name: 'Кузнецов',       role: 'employee',        company: 'ООО «Прогресс»',    is_active: true,  email_verified: true,  created_at: '2024-08-01' },
  { id: 10, email: 'e.volkova@company.ru', first_name: 'Екатерина', last_name: 'Волкова',      role: 'employee',        company: 'ООО «Прогресс»',    is_active: false, email_verified: true,  created_at: '2024-08-20' },
  { id: 11, email: 's.sokolov@company.ru', first_name: 'Сергей',  last_name: 'Соколов',        role: 'employee',        company: 'ООО «Прогресс»',    is_active: true,  email_verified: true,  created_at: '2024-09-05' },
  { id: 12, email: 'o.mikhailova@company.ru', first_name: 'Ольга', last_name: 'Михайлова',     role: 'employee',        company: 'ООО «Прогресс»',    is_active: true,  email_verified: true,  created_at: '2024-09-22' },
];

// TODO(API): /users/{id}/activity  и  /dashboard/widgets/recent-activity
const MOCK_AUDIT_LOG = [
  { id: 1, at: '2025-01-14 14:32', user: 'Иван Петров',       action: 'policy.activate',  entity: 'POL-2024-001',  ip: '192.168.1.24',  details: 'Активирован полис' },
  { id: 2, at: '2025-01-14 13:18', user: 'Мария Попова',      action: 'claim.submit',     entity: 'CLM-2025-013',  ip: '192.168.1.37',  details: 'Подача обращения на медуслуги' },
  { id: 3, at: '2025-01-14 12:05', user: 'Администратор',     action: 'plan.create',      entity: 'ДМС Премиум+',  ip: '10.0.0.1',      details: 'Создан тарифный план' },
  { id: 4, at: '2025-01-14 11:44', user: 'Ольга Смирнова',    action: 'policy.create',    entity: 'POL-2025-088',  ip: '192.168.1.50',  details: 'Оформлен полис' },
  { id: 5, at: '2025-01-14 10:12', user: 'Дмитрий Иванов',    action: 'user.update',      entity: 'Профиль',       ip: '192.168.1.38',  details: 'Обновлён профиль' },
  { id: 6, at: '2025-01-14 09:46', user: 'Иван Петров',       action: 'claim.approve',    entity: 'CLM-2025-014',  ip: '192.168.1.24',  details: 'Одобрено обращение, выплата 22 500 ₽' },
  { id: 7, at: '2025-01-14 09:12', user: 'Анна Смирнова',     action: 'claim.submit',     entity: 'CLM-2025-015',  ip: '192.168.1.41',  details: 'Подача обращения на медуслуги' },
  { id: 8, at: '2025-01-13 18:22', user: 'Иван Петров',       action: 'LOGIN',            entity: '—',             ip: '192.168.1.24',  details: 'Вход в систему' },
  { id: 9, at: '2025-01-13 17:05', user: 'Администратор',     action: 'user.deactivate',  entity: 'Павел Фёдоров', ip: '10.0.0.1',      details: 'Деактивирован пользователь' },
  { id: 10, at: '2025-01-13 15:30', user: 'Елена Козлова',    action: 'policy.renew',     entity: 'POL-2024-076',  ip: '192.168.3.12',  details: 'Полис продлён на год' },
];

// TODO(API): /dashboard/widgets/alerts
const MOCK_ALERTS = [
  { type: 'policy_expiring', title: 'Полис истекает', body: 'POL-2024-001 истекает через 12 дней', severity: 'warning', link: 'policy-detail.html?id=1' },
  { type: 'claim_pending',   title: 'Ожидают решения', body: '3 обращения ждут одобрения больше 2 дней', severity: 'danger', link: 'claims.html' },
  { type: 'user_new',        title: 'Новая регистрация', body: 'ООО «Ориент» подключилось к сервису', severity: 'info', link: 'organizations.html' },
  { type: 'payment_success', title: 'Поступление', body: 'ПАО «Вектор» — оплата 352 000 ₽', severity: 'success', link: 'reports.html' },
];

// Экспорт в глобальный объект, общий для всех страниц
window.MOCK = {
  plans: MOCK_PLANS,
  employees: MOCK_EMPLOYEES,
  policies: MOCK_POLICIES,
  claims: MOCK_CLAIMS,
  policyDetail: MOCK_POLICY_DETAIL,
  claimDetail: MOCK_CLAIM_DETAIL,
  dashboard: MOCK_DASHBOARD,
  organizations: MOCK_ORGANIZATIONS,
  users: MOCK_USERS,
  auditLog: MOCK_AUDIT_LOG,
  alerts: MOCK_ALERTS,
};

window.MOCK_USER = MOCK_USER;
window.STATUS_LABELS = STATUS_LABELS;
window.TYPE_LABELS = TYPE_LABELS;
window.ROLE_LABELS = ROLE_LABELS;
window.REPORT_TYPE_LABELS = REPORT_TYPE_LABELS;

/* ==================== Форматтеры ==================== */

function formatRub(value) {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatDate(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleDateString('ru-RU');
}

function formatDateTime(d) {
  if (!d) return '—';
  const date = new Date(d);
  if (isNaN(date.getTime())) return '—';
  return date.toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' });
}

function getInitials(firstName, lastName) {
  const a = (firstName || '').trim().charAt(0).toUpperCase();
  const b = (lastName || '').trim().charAt(0).toUpperCase();
  return (a + b) || '?';
}

function daysUntil(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
}

window.formatRub = formatRub;
window.formatDate = formatDate;
window.formatDateTime = formatDateTime;
window.getInitials = getInitials;
window.daysUntil = daysUntil;
