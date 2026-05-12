# InsurePro — фронтенд

B2B платформа ДМС. Чистый HTML + Tailwind CSS (CDN) + Alpine.js + Chart.js. Без сборщиков и npm.

## Как запустить локально

Нужен любой статический сервер, потому что `fetch` и CDN не работают через `file://`.

**Вариант 1 — Python** (есть на большинстве машин):
```bash
cd frontend
python -m http.server 3000
```
Откройте http://localhost:3000

**Вариант 2 — Node.js**:
```bash
cd frontend
npx --yes serve -p 3000 .
```

**Вариант 3 — VS Code Live Server** (расширение «Live Server») — правый клик на `index.html` → «Open with Live Server».

## Настройка API

По умолчанию фронт стучится на `http://localhost:8000`. Чтобы поменять — добавьте в `<head>` любой страницы:
```html
<meta name="api-base" content="https://api.example.com">
```

## Структура

```
frontend/
├── index.html          редирект login/dashboard
├── login.html
├── register.html
├── verify-email.html
├── dashboard.html       виджеты + графики (Chart.js)
├── employees.html       таблица + модал CRUD
├── plans.html           карточки планов + калькулятор
├── policies.html        таблица + фильтры по статусу
├── policy.html          детальная страница полиса
├── claims.html          таблица + модал подачи
├── claim.html           детальная страница обращения
├── reports.html         отчёты + экспорт
├── css/app.css          общие стили (badges, btn, field)
└── js/
    ├── api.js           api(), auth, toast
    └── layout.js        navbar + sidebar (общие для всех страниц)
```

## Роли и доступ

- **admin** — видит всё, графики на дашборде, управление пользователями
- **company_manager** — сотрудники, полисы, обращения, отчёты
- **employee** — свои полисы и обращения, подача заявок

Роль приходит из `/auth/` в `user.role` и сохраняется в `localStorage` под ключом `user_profile`. Навигация/кнопки скрываются через `x-show="$store.auth.hasRole('admin')"`.

## Что стоит допилить перед проднакатом

- CSRF защита для форм (если бэк её требует)
- Refresh-token rotation в `api.js` (сейчас на 401 просто редирект на login)
- Валидация форм через единый механизм (например Pristine.js или вынести в `validators.js`)
- i18n если будет второй язык (сейчас hardcoded ru)
- CSP headers со стороны сервера (CDN whitelist)
