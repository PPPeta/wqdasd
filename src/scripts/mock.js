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

// Экспорт в глобальный объект, общий для всех страниц
window.MOCK = {
  plans: MOCK_PLANS,
  employees: MOCK_EMPLOYEES,
  policies: MOCK_POLICIES,
  claims: MOCK_CLAIMS,
  policyDetail: MOCK_POLICY_DETAIL,
  claimDetail: MOCK_CLAIM_DETAIL,
  dashboard: MOCK_DASHBOARD,
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
