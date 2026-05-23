# INV-16: будущая ERP-зона Gigonom — отчеты, таблицы и графики

## Статус

Готово к ревью.

## Источник

Основной будущий потребитель:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

На этом шаге конкретный код не инвентаризируем. Задача намеренно фиксирует будущую ERP-зону как backlog placeholder, чтобы дизайн-система заранее имела место для отчетов, таблиц, графиков, календаря, timeline и dashboard.

## Цель задачи

Заложить архитектурное и продуктово-интерфейсное место под будущую ERP-зону Gigonom.

Важно: сейчас не принимаем преждевременных API-решений, не выбираем chart-библиотеку окончательно, не проектируем доменную модель ERP и не переносим код.

## Короткий вывод

ERP-зона должна стать отдельным вертикальным направлением дизайн-системы: `ERP / Analytics`.

Она будет собирать интерфейсы для внутренних операционных систем, админок, отчетности, планирования, финансовых/проектных/контентных dashboard и управленческих экранов.

Минимальная будущая структура:

- таблицы и data grids;
- отчеты и report builder patterns;
- графики и analytics cards;
- dashboard layouts;
- календарь и планирование;
- timeline;
- KPI/status states;
- аналитические empty/loading/error/partial-data states;
- export/print/share actions.

## Почему это отдельная зона

CRUD и ERP похожи, но решают разные задачи.

CRUD отвечает за управление сущностями: создать, найти, отредактировать, удалить.

ERP/Analytics отвечает за операционную картину: что происходит, где отклонения, что требует действия, как меняются показатели во времени.

Поэтому ERP нельзя растворять только в `Admin / CRUD`. Для нее нужна отдельная группа patterns, иначе мы потеряем фокус на отчетности, сравнении, динамике, агрегациях и управленческих сценариях.

## Будущие UI-задачи ERP

| Зона | Что понадобится | Первичный смысл |
|---|---|---|
| Tables | Data table, dense table, grouped table, editable table, tree table, pinned columns, bulk actions. | Рабочие списки, операционные таблицы, управленческие реестры. |
| Reports | Report page shell, report filters, report summary, saved views, export actions. | Регулярная отчетность и управленческие срезы. |
| Charts | Line, area, bar, stacked bar, donut, funnel, progress, sparkline. | Динамика, сравнение, распределение, воронки. |
| Dashboard | KPI cards, metric cards, section grids, responsive dashboard layout. | Быстро понять состояние системы. |
| Calendar | Month/week/day views, events, scheduled jobs, drag scheduling. | Планирование задач, публикаций, встреч, дедлайнов. |
| Timeline | Vertical timeline, horizontal timeline, activity feed, audit log, roadmap. | История событий, прогресс, план-факт. |
| Analytical states | Empty, loading, stale, partial data, no access, calculation error, sync error. | Честно показывать качество данных и расчетов. |
| Filters | Date range, segment filters, entity filters, saved presets, quick filters. | Управление срезами данных. |
| Drill-down | Click-through from KPI/chart/table row to detail view. | Переход от агрегата к причине. |
| Export | CSV/XLSX/PDF/print/share. | Работа с отчетами вне приложения. |

## Потенциальные источники для будущей инвентаризации

| Источник | Что может дать | Когда возвращаться |
|---|---|---|
| Gigonom 2026 | Будущая ERP-зона, отчеты, таблицы, dashboard, календарь, timeline. | Когда в проекте появятся первые реальные ERP-экраны. |
| INV-01 Gigonom 2026 CRUD | List/card/kanban/calendar views, filters, toolbars, empty states. | При проектировании ERP table/list/calendar базиса. |
| INV-04 Gigonom 2026 date picker | Date picker и range date picker. | При проектировании report filters/date range. |
| INV-09 prodSQL dashboard cards | Минималистичные dashboard cards. | При сборке KPI/summary cards. |
| INV-12 REVERIE charts analytics | Chart components, Recharts wrapper, KPI cards, progress/funnel patterns. | При выборе первых chart patterns. |
| INV-14 Security Sphere compatibility | Next/pnpm/turbo/Tailwind/FSD compatibility requirements. | При интеграционных проверках ERP packages. |
| INV-15 Security Sphere UI reference | DataTable/ListView baseline, forms, file upload, admin shell. | При сравнении table/list baseline. |
| prodSQL canvas/editor | Панели, tables on canvas, dashboard cards. | Если ERP получит workspace/editor сценарии. |
| Внешние дизайн-системы | Data grid/report/dashboard best practices. | Перед финальным проектированием больших таблиц и отчетов. |

## Что не решаем сейчас

- Не выбираем окончательно chart library.
- Не выбираем окончательно data grid library.
- Не проектируем API отчетов.
- Не проектируем backend aggregation layer.
- Не фиксируем доменные сущности ERP.
- Не переносим код из Gigonom 2026, потому что нужная ERP-зона еще не готова.
- Не делаем Figma-слепки, потому что нет согласованных экранов.
- Не смешиваем ERP с маркетинговой аналитикой REVERIE без отдельного сравнения.
- Не делаем универсальный report builder заранее, пока нет реальных сценариев.

## Предварительные package zones

| Пакет | Что может жить внутри |
|---|---|
| `packages/ui-react` | Table primitives, chart shell primitives, metric card, badge/status, date range controls, empty states. |
| `packages/patterns` | Dashboard layouts, report page shell, analytics card group, calendar workspace, timeline, report filter bar. |
| `packages/tokens` | Chart color tokens, status scales, semantic palette for analytics. |
| Будущий `packages/charts` | Возможен только если chart-layer станет достаточно большим и независимым. Пока не создавать. |
| Будущий `packages/data-grid` | Возможен только если появится сложный grid abstraction. Пока не создавать. |

## Предварительная Storybook-структура

- `ERP / Analytics / Dashboard Shell`
- `ERP / Analytics / KPI Card`
- `ERP / Analytics / Metric Grid`
- `ERP / Analytics / Report Page`
- `ERP / Analytics / Report Filter Bar`
- `ERP / Analytics / Data Table`
- `ERP / Analytics / Grouped Table`
- `ERP / Analytics / Editable Table`
- `ERP / Analytics / Chart Card`
- `ERP / Analytics / Line Chart`
- `ERP / Analytics / Bar Chart`
- `ERP / Analytics / Donut Chart`
- `ERP / Analytics / Funnel Chart`
- `ERP / Analytics / Calendar View`
- `ERP / Analytics / Timeline`
- `ERP / Analytics / Activity Feed`
- `ERP / Analytics / Empty Loading Error States`
- `ERP / Analytics / Export Actions`

## Playground preview

Целевая зона: `erp-preview`.

Будущие controls:

- layout: compact, regular, executive;
- density: comfortable, compact, dense;
- date range: day, week, month, quarter, custom;
- chart type: line, area, bar, donut, funnel;
- data state: loading, empty, partial, stale, error, no access;
- table mode: read-only, selectable, editable, grouped;
- comparison: previous period, plan/fact, segment A/B;
- theme preset: neutral, high-contrast, brand-accent;
- export visibility: hidden, enabled, disabled.

## Figma

Пока Figma-слепок не нужен.

Условие появления Figma-задачи:

- в Gigonom 2026 появляется первый реальный ERP/dashboard/report экран;
- выбран минимум один сценарий: dashboard, отчет, таблица, календарь или timeline;
- есть реальные или mock-данные для визуальной проверки;
- понятны роли пользователей и контекст принятия решений.

## Backlog placeholder

### ERP-01: Data table baseline

Цель: спроектировать базовый table/list слой для ERP.

Будущие критерии:

- sorting;
- filtering;
- pagination;
- loading/error/empty;
- row actions;
- bulk actions;
- responsive behavior;
- сравнение с Security Sphere `ListView/DataTable` и Gigonom 2026 CRUD list.

### ERP-02: KPI и dashboard cards

Цель: собрать набор cards для управленческих показателей.

Будущие критерии:

- value;
- delta;
- trend;
- status;
- description;
- sparkline или mini chart;
- click-through.

### ERP-03: Chart card system

Цель: определить обертку для графиков и набор минимальных chart patterns.

Будущие критерии:

- title/subtitle;
- legend;
- tooltip;
- empty/loading/error;
- color tokens;
- responsive sizing;
- Storybook mock datasets.

### ERP-04: Report page shell

Цель: собрать оболочку отчета.

Будущие критерии:

- header;
- filter bar;
- saved views;
- date range;
- summary cards;
- charts;
- table;
- export actions.

### ERP-05: Calendar planning view

Цель: выделить ERP-календарь для задач, публикаций, событий и дедлайнов.

Будущие критерии:

- month/week/day;
- event card;
- drag scheduling;
- selected day panel;
- empty states;
- связь с date picker/range picker.

### ERP-06: Timeline и activity feed

Цель: описать историю событий и прогресс во времени.

Будущие критерии:

- vertical timeline;
- grouped activity feed;
- status changes;
- audit log;
- actor/action/entity model through props.

### ERP-07: Analytics states

Цель: стандартизировать состояния аналитики.

Будущие критерии:

- no data;
- not enough data;
- stale data;
- partial data;
- calculation failed;
- no access;
- sync in progress;
- action required.

## Критерии готовности INV-16

- Описаны будущие UI-задачи ERP.
- Зафиксировано, какие источники можно использовать позже.
- Не принято преждевременных API-решений.
- Создан backlog placeholder для будущего этапа.
- Указаны целевые Storybook и Playground зоны.

## Этап 3: backlog placeholder

Статус: выполнено в ветке `stage-3-raw-vertical-imports`.

### Что добавлено

- `docs/backlog/erp-analytics-zone.md` — отдельный backlog-документ для будущей ERP / Analytics зоны.

### Решение по этапу 3

Компонентный импорт не выполняется. Для INV-16 это намеренное решение: реальной ERP-зоны в Gigonom 2026 пока нет, поэтому преждевременный пакет, API или Storybook-компонент создаст ложную архитектуру. Вместо этого зафиксировано место в backlog, условия старта реализации и список будущих задач.

### Критерий готовности

- ERP / Analytics выделена как отдельная будущая зона.
- Backlog placeholder создан.
- Условия старта реализации описаны.
- Преждевременных API, chart-library и data-grid решений не принято.
