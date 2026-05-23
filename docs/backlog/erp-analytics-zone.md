# Backlog: ERP / Analytics zone

## Назначение

ERP / Analytics — будущая вертикальная зона дизайн-системы для отчетности, таблиц, dashboard, календарей, timeline и управленческой аналитики.

На этапе 3 код не переносится. Этот документ фиксирует место в backlog, чтобы не смешивать ERP-задачи с CRUD, marketing automation и website blocks.

## Почему пока без реализации

- В Gigonom 2026 еще нет согласованных ERP-экранов, которые можно переносить как сырье.
- Нет выбранного chart engine и data grid engine.
- Нет реальной доменной модели отчетов.
- Ранний API сейчас создаст лишние ограничения и почти наверняка будет переписан.

## Будущие группы задач

### ERP-01: Data table baseline

Базовые таблицы для ERP: sorting, filtering, pagination, loading/error/empty, row actions, bulk actions, responsive behavior.

Источники для сравнения:

- Security Sphere `ListView/DataTable`.
- Gigonom 2026 CRUD list.
- Будущие ERP-экраны Gigonom 2026.

### ERP-02: KPI и dashboard cards

Карточки показателей: value, delta, trend, status, description, sparkline, click-through.

Источники для сравнения:

- prodSQL dashboard cards.
- REVERIE analytics KPI cards.
- Будущие dashboard Gigonom 2026.

### ERP-03: Chart card system

Обертки графиков: title, subtitle, legend, tooltip, empty/loading/error, color tokens, responsive sizing.

Источники для сравнения:

- REVERIE charts analytics.
- Будущая ERP-аналитика Gigonom 2026.

### ERP-04: Report page shell

Страница отчета: header, filter bar, saved views, date range, summary cards, charts, table, export actions.

### ERP-05: Calendar planning view

ERP-календарь для задач, публикаций, событий и дедлайнов: month/week/day, event card, selected day panel, drag scheduling.

Источники для сравнения:

- Gigonom 2026 calendar CRUD view.
- REVERIE content calendar.
- Date picker/range picker из INV-04.

### ERP-06: Timeline и activity feed

История событий: vertical timeline, grouped activity feed, status changes, audit log, actor/action/entity props.

### ERP-07: Analytics states

Состояния аналитики: no data, not enough data, stale data, partial data, calculation failed, no access, sync in progress, action required.

## Условия старта реализации

Реализацию ERP-зоны можно начинать, когда выполнены условия:

1. В Gigonom 2026 появился хотя бы один реальный ERP/dashboard/report экран.
2. Есть реальные или правдоподобные mock-данные.
3. Понятны роли пользователей и контекст принятия решений.
4. Выбран первый конкретный сценарий: dashboard, отчет, таблица, календарь или timeline.
5. Сделан Figma-слепок выбранного сценария.

## Чего не делаем заранее

- Не создаем `packages/charts` без реальной потребности.
- Не создаем `packages/data-grid` без сложного grid-сценария.
- Не выбираем окончательно chart/data-grid библиотеки.
- Не проектируем backend aggregation layer.
- Не смешиваем ERP с REVERIE marketing analytics без отдельного сравнения.
