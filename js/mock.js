/* ==========================================================================
 * InsurePro — мок-данные для шаблона
 *
 * Это ВРЕМЕННЫЕ данные для разработки фронта без бэкенда.
 * TODO(API): заменить на реальные запросы в js/api.js (см. комментарии TODO)
 * ========================================================================== */

window.InsurePro = window.InsurePro || {};
window.InsurePro.MOCK = {
  plans: [
    {
      id: 1, name: 'Базовый', description: 'Необходимый минимум',
      price_per_employee: 1500, featured: false,
      coverages: ['Амбулаторная помощь', 'Вызов врача на дом', 'Экстренная стоматология'],
    },
    {
      id: 2, name: 'Стандарт', description: 'Оптимальный выбор',
      price_per_employee: 3200, featured: true,
      coverages: ['Всё из Базового', 'Госпитализация', 'Плановая стоматология', 'Медикаменты'],
    },
    {
      id: 3, name: 'Премиум', description: 'Максимальная защита',
      price_per_employee: 5800, featured: false,
      coverages: ['Всё из Стандарт', 'Частные клиники', 'Чек-апы', 'Санаторное лечение', 'ДМС членам семьи'],
    },
  ],

  employees: [
    { id: 1, first_name: 'Анна', last_name: 'Смирнова', email: 'anna@company.ru', is_active: true, policies_count: 1 },
    { id: 2, first_name: 'Сергей', last_name: 'Иванов', email: 'sergey@company.ru', is_active: true, policies_count: 2 },
    { id: 3, first_name: 'Мария', last_name: 'Петрова', email: 'maria@company.ru', is_active: true, policies_count: 1 },
    { id: 4, first_name: 'Дмитрий', last_name: 'Кузнецов', email: 'dmitry@company.ru', is_active: false, policies_count: 0 },
    { id: 5, first_name: 'Елена', last_name: 'Соколова', email: 'elena@company.ru', is_active: true, policies_count: 1 },
    { id: 6, first_name: 'Алексей', last_name: 'Новиков', email: 'alexey@company.ru', is_active: true, policies_count: 1 },
    { id: 7, first_name: 'Ольга', last_name: 'Морозова', email: 'olga@company.ru', is_active: true, policies_count: 2 },
    { id: 8, first_name: 'Павел', last_name: 'Волков', email: 'pavel@company.ru', is_active: false, policies_count: 0 },
  ],

  policies: [
    { id: 10, number: 'POL-2024-001', company_name: 'ООО «Ромашка»', plan_name: 'Стандарт', status: 'active', start_date: '2024-01-15', end_date: '2025-01-14', employees_count: 45, monthly_cost: 144000 },
    { id: 11, number: 'POL-2024-002', company_name: 'АО «Вектор»', plan_name: 'Премиум', status: 'active', start_date: '2024-03-01', end_date: '2025-02-28', employees_count: 120, monthly_cost: 696000 },
    { id: 12, number: 'POL-2024-003', company_name: 'ООО «Альфа»', plan_name: 'Базовый', status: 'draft', start_date: '2024-11-01', end_date: '2025-10-31', employees_count: 12, monthly_cost: 18000 },
    { id: 13, number: 'POL-2023-042', company_name: 'ООО «Бета»', plan_name: 'Стандарт', status: 'suspended', start_date: '2023-06-01', end_date: '2024-05-31', employees_count: 30, monthly_cost: 96000 },
    { id: 14, number: 'POL-2023-015', company_name: 'ЗАО «Гамма»', plan_name: 'Премиум', status: 'expired', start_date: '2023-01-01', end_date: '2023-12-31', employees_count: 80, monthly_cost: 464000 },
    { id: 15, number: 'POL-2024-007', company_name: 'ООО «Дельта»', plan_name: 'Базовый', status: 'cancelled', start_date: '2024-02-15', end_date: '2024-08-15', employees_count: 5, monthly_cost: 7500 },
  ],

  claims: [
    { id: 42, number: 'CL-2024-042', type: 'medical', employee_name: 'Анна Смирнова', status: 'pending', amount: 12500, incident_date: '2024-10-15', created_at: '2024-10-16T09:23:00', description: 'Приём терапевта, анализы крови, консультация кардиолога в клинике «МедСервис».', place: 'Клиника «МедСервис», Москва' },
    { id: 43, number: 'CL-2024-043', type: 'dental', employee_name: 'Сергей Иванов', status: 'approved', amount: 34000, incident_date: '2024-09-28', created_at: '2024-09-29T14:10:00', description: 'Лечение двух зубов, рентген, профессиональная чистка.', place: 'Стоматология «Дента-Лайн»' },
    { id: 44, number: 'CL-2024-044', type: 'hospitalization', employee_name: 'Мария Петрова', status: 'approved', amount: 185000, incident_date: '2024-08-10', created_at: '2024-08-20T10:00:00', description: 'Плановая госпитализация, операция на коленном суставе.', place: 'Клинический госпиталь «Лапино»' },
    { id: 45, number: 'CL-2024-045', type: 'medication', employee_name: 'Елена Соколова', status: 'rejected', amount: 8700, incident_date: '2024-10-01', created_at: '2024-10-02T16:45:00', description: 'Препараты не из списка покрытия полиса.', place: 'Аптека «36.6»' },
    { id: 46, number: 'CL-2024-046', type: 'medical', employee_name: 'Алексей Новиков', status: 'pending', amount: 4500, incident_date: '2024-10-22', created_at: '2024-10-23T11:15:00', description: 'Приём офтальмолога, подбор очков.', place: 'Медицинский центр «Здоровье»' },
  ],

  expiringPolicies: [
    { id: 11, number: 'POL-2024-002', company: 'АО «Вектор»', expiresIn: '18 дн.' },
    { id: 20, number: 'POL-2024-009', company: 'ООО «Эпсилон»', expiresIn: '22 дн.' },
    { id: 21, number: 'POL-2023-099', company: 'ООО «Дзета»', expiresIn: '27 дн.' },
  ],

  // Для детальной страницы полиса
  policyDetail: {
    id: 10, number: 'POL-2024-001', company_name: 'ООО «Ромашка»', plan_name: 'Стандарт',
    status: 'active', start_date: '2024-01-15', end_date: '2025-01-14',
    employees_count: 45, monthly_cost: 144000,
    coverages: [
      { name: 'Амбулаторная помощь', limit: 'Без лимита' },
      { name: 'Госпитализация', limit: 'до 500 000 ₽' },
      { name: 'Стоматология', limit: 'до 50 000 ₽' },
      { name: 'Медикаменты', limit: 'до 30 000 ₽' },
      { name: 'Вызов врача', limit: '10 раз/год' },
      { name: 'Диагностика', limit: 'Без лимита' },
    ],
    history: [
      { id: 1, created_at: '2024-01-15T10:00:00', action: 'Полис создан', actor: 'Иван Петров' },
      { id: 2, created_at: '2024-01-15T10:30:00', action: 'Статус изменён: draft → active', actor: 'Иван Петров' },
      { id: 3, created_at: '2024-06-10T14:20:00', action: 'Добавлено 3 сотрудника', actor: 'Анна HR' },
    ],
  },

  // Для детальной страницы обращения
  claimDetail: {
    id: 42, number: 'CL-2024-042', type: 'medical',
    employee_name: 'Анна Смирнова', policy_number: 'POL-2024-001',
    status: 'pending', amount: 12500,
    incident_date: '2024-10-15', created_at: '2024-10-16T09:23:00',
    in_review_at: '2024-10-16T15:00:00', decided_at: null,
    place: 'Клиника «МедСервис», Москва',
    description: 'Приём терапевта 15.10.2024, анализы крови (ОАК, биохимия), консультация кардиолога. Предоставлены чеки и заключения специалистов.',
    documents: [
      { id: 1, name: 'Чек от 15.10.2024.pdf', size_label: '247 КБ', url: '#' },
      { id: 2, name: 'Заключение терапевта.pdf', size_label: '512 КБ', url: '#' },
      { id: 3, name: 'Результаты анализов.pdf', size_label: '890 КБ', url: '#' },
    ],
  },

  // Дашборд-виджеты (мок, будут приходить с /dashboard/)
  dashboard: {
    admin: {
      widgets: { companies: 48, policies: 312, claims: 127, revenue: 14800000 },
      statuses: { active: 245, draft: 18, suspended: 12, cancelled: 37 },
      revenue: [
        { month: 'Май', value: 10.2 }, { month: 'Июн', value: 11.5 }, { month: 'Июл', value: 12.1 },
        { month: 'Авг', value: 12.8 }, { month: 'Сен', value: 13.4 }, { month: 'Окт', value: 14.8 },
      ],
    },
    company_manager: {
      widgets: { employees: 45, active_policies: 3, pending_claims: 5, expiring: 2 },
    },
    employee: {
      widgets: { my_policies: 1, my_claims: 2 },
      my_policy: {
        plan: 'Стандарт', period: '15.01.2024 — 14.01.2025',
        coverages: [
          { name: 'Амбулаторно', limit: 'Без лимита' },
          { name: 'Стоматология', limit: 'до 50 000 ₽' },
          { name: 'Госпитализация', limit: 'до 500 000 ₽' },
        ],
      },
    },
  },
};
