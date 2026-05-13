# InsurePro — фронтенд

Шаблон фронтенда для B2B-платформы ДМС. Чистые HTML + Tailwind CSS (CDN) + Alpine.js. **Без сборки, без Node.js, без локального сервера.**

## Как запустить

1. Скачать / склонировать репозиторий.
2. Двойной клик по `index.html` (или любой другой `.html`).

Всё. Браузер откроет страницу, CDN подгрузит Tailwind и Alpine, данные возьмутся из `js/mock.js`.

## Переключение роли (для разработки)

Чтобы посмотреть дашборд от имени разных ролей — открой `js/layout.js` и поменяй в `MOCK_USER.role`:

- `admin` — видит всё + графики + пункт «Пользователи»
- `company_manager` — сотрудники, полисы, обращения, отчёты (по умолчанию)
- `employee` — свой полис + «Подать обращение»

## Структура

```
index.html            редирект на login
login.html
register.html
verify-email.html
dashboard.html        роль-зависимые виджеты + Chart.js
employees.html        таблица + поиск + модал
plans.html            карточки планов + калькулятор
policies.html         таблица + фильтры
policy.html           детальная (?id=10)
claims.html           таблица + подача в модале
claim.html            детальная (?id=42)
reports.html          отчёты + экспорт

css/app.css           общие стили (badges, btn, field, card)
js/layout.js          navbar + sidebar на всех страницах
js/mock.js            моковые данные для разработки
```

## Как подключать API

Во всех файлах расставлены маркеры `TODO(API):`. Точки подключения:

| Страница | Куда смотреть | Что подключить |
|----------|--------------|----------------|
| `login.html` | `@submit.prevent` формы | `POST /auth/` → сохранить токен в localStorage |
| `register.html` | метод `submit()` | `POST /auth/reg/company/` |
| `verify-email.html` | методы `submit()` и `resend()` | `POST /auth/verify-email/`, `POST /auth/send-verify-email/` |
| `dashboard.html` | метод `init()` | `GET /dashboard/?role=...` |
| `employees.html` | `init()`, `save()`, `toggleActive()` | `GET/POST/PATCH /employees/` |
| `plans.html` | `init()`, `calculate()` | `GET /plans/`, `POST /plans/calculate` |
| `policies.html` | `init()` | `GET /policies/?status=...` |
| `policy.html` | `init()` | `GET /policies/{id}/` |
| `claims.html` | `init()`, `save()` | `GET /claims/`, `POST /claims/` |
| `claim.html` | `init()`, `decide()` | `GET /claims/{id}/`, `PATCH /claims/{id}/` |
| `reports.html` | `generate()`, `exportFile()` | `GET /reports/`, `GET /reports/export/` |
| `js/layout.js` | `MOCK_USER`, `data-chrome-logout` | брать юзера из localStorage, `POST /auth/logout/` |

Мок-данные живут в `js/mock.js` — когда перепишешь страницу на API, просто удали ссылку на мок из соответствующего HTML.

## Роли и доступ

Управление видимостью через Alpine Store `$store.auth`:

```html
<button x-show="$store.auth.hasRole('admin')">Только админ</button>
<button x-show="$store.auth.hasRole('admin', 'company_manager')">Админ или менеджер</button>
```

Значения ролей: `admin`, `company_manager`, `employee`.

## Что ещё не сделано (специально — под твои правки)

- Страница пользователей `/users.html` (в меню есть, но пункта пока нет)
- Форма «Забыли пароль»
- Формы редактирования полисов (только просмотр и статус)
- Реальная загрузка файлов в обращениях
- Refresh-token логика

Всё это удобно добавлять поверх текущих страниц — структура и стили уже на месте.
