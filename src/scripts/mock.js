/* InsurePro — Мок-данные. TODO(API): заменить на реальные fetch-запросы */

const MOCK_USER = {
  first_name: 'Иван',
  last_name: 'Петров',
  email: 'ivan@company.ru',
  role: 'company_manager', // admin | company_manager | employee
};

const MOCK = {
  plans: [
    { id: 1, name: 'Базовый', description: 'Необходимый минимум', price: 1500, coverages: ['Амбулаторная помощь', 'Вызов врача на дом', 'Экстренная стоматология'] },
    { id: 2, name: 'Стандарт', description: 'Оптимальный выбор', price: 3200, featured: true, coverages: ['Всё из Базового', 'Госпитализация', 'Плановая стоматология', 'Медикаменты'] },
    { id: 3, name: 'Премиум', description: 'Максимальная защита', price: 5800, coverages: ['Всё из Стандарт', 'Частные клиники', 'Чек-апы', 'Санаторное лечение', 'ДМС семье'] },
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
    { id: 10, number: 'POL-2024-001', company: 'ООО «Ромашка»', plan: 'Стандарт', status: 'active', start: '2024-01-15', end: '2025-01-14', employees: 45, cost: 144000 },
    { id: 11, number: 'POL-2024-002', company: 'АО «Вектор»', plan: 'Премиум', status: 'active', start: '2024-03-01', end: '2025-02-28', employees: 120, cost: 696000 },
    { id: 12, number: 'POL-2024-003', company: 'ООО «Альфа»', plan: 'Базовый', status: 'draft', start: '2024-11-01', end: '2025-10-31', employees: 12, cost: 18000 },
    { id: 13, number: 'POL-2023-042', company: 'ООО «Бета»', plan: 'Стандарт', status: 'suspended', start: '2023-06-01', end: '2024-05-31', employees: 30, cost: 96000 },
    { id: 14, number: 'POL-2023-015', company: 'ЗАО «Гамма»', plan: 'Премиум', status: 'expired', start: '2023-01-01', end: '2023-12-31', employees: 80, cost: 464000 },
    { id: 15, number: 'POL-2024-007', company: 'ООО «Дельта»', plan: 'Базовый', status: 'cancelled', start: '2024-02-15', end: '2024-08-15', employees: 5, cost: 7500 },
  ],

  claims: [
    { id: 42, number: 'CL-2024-042', type: 'medical', employee: 'Анна Смирнова', status: 'pending', amount: 12500, date: '2024-10-15', description: 'Приём терапевта, анализы крови, консультация кардиолога.' },
    { id: 43, number: 'CL-2024-043', type: 'dental', employee: 'Сергей Иванов', status: 'approved', amount: 34000, date: '2024-09-28', description: 'Лечение двух зубов, рентген, профессиональная чистка.' },
    { id: 44, number: 'CL-2024-044', type: 'hospitalization', employee: 'Мария Петрова', status: 'approved', amount: 185000, date: '2024-08-10', description: 'Госпитализация, операция на коленном суставе.' },
    { id: 45, number: 'CL-2024-045', type: 'medication', employee: 'Елена Соколова', status: 'rejected', amount: 8700, date: '2024-10-01', description: 'Препараты не из списка покрытия полиса.' },
    { id: 46, number: 'CL-2024-046', type: 'medical', employee: 'Алексей Новиков', status: 'pending', amount: 4500, date: '2024-10-22', description: 'Приём офтальмолога, подбор очков.' },
  ],

  dashboard: {
    admin: { companies: 48, policies: 312, claims: 127, revenue: 14800000 },
    company_manager: { employees: 45, active_policies: 3, pending_claims: 5, expiring: 2 },
    employee: { my_policies: 1, my_claims: 2 },
  },
};

const TYPE_LABELS = { medical: 'Медуслуга', hospitalization: 'Госпитализация', medication: 'Медикаменты', dental: 'Стоматология' };
const STATUS_LABELS = { pending: 'В ожидании', approved: 'Одобрено', rejected: 'Отклонено', active: 'Активен', draft: 'Черновик', suspended: 'Приостановлен', cancelled: 'Отменён', expired: 'Истёк' };
const ROLE_LABELS = { admin: 'Администратор', company_manager: 'Менеджер компании', employee: 'Сотрудник' };

function formatRub(v) {
  return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(v || 0);
}

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('ru-RU');
}
