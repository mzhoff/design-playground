# Сырой импорт: REVERIE charts and analytics

## Происхождение

Источник: `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`.

Основные референсы из `apps/prototype-web`:

- `src/app/components/ui/chart.tsx` — shadcn-подобная обвязка над Recharts.
- `src/pages/analytics/ui/AnalyticsPage.tsx` — сборка аналитической страницы.
- `src/pages/analytics/ui/EngagementChart.tsx` — area chart вовлечения.
- `src/pages/analytics/ui/KPICard.tsx` — KPI-карточки.
- `src/pages/analytics/ui/TopContentList.tsx` — ранжированный список контента.
- `src/features/strategy/ui/MixStep.tsx` — donut/pie, легенда и распределение контент-микса.
- `src/features/onboarding/ui/FunnelBar.tsx` — segmented funnel bar.
- `src/features/onboarding/ui/StepShell.tsx` и `ParsingStep.tsx` — progress/milestone и staged loading patterns.

## Что перенесено

- Контракты данных для метрик, time-series, серий графиков, сегментов, milestone-progress и стадий генерации.
- SVG/CSS-превью вместо прямого переноса Recharts.
- KPI cards, area chart, multi-line chart mode, donut distribution, segmented funnel bar, ranked metric list, milestone progress и staged progress panel.
- Storybook-сценарии для визуального осмотра.

## Почему не тащим Recharts сразу

В REVERIE уже используется Recharts, но на этапе сырого импорта нам важнее стабилизировать дизайн-системный API и визуальные токены. Если сейчас жестко зашить Recharts в пакет, мы преждевременно навяжем зависимость всем потребителям. После Figma-сравнения можно будет выбрать: оставить Recharts, сделать adapter layer или вынести chart-core отдельно.

## Ограничения

- Это не финальная chart-библиотека.
- Tooltip, legend и accessibility-сценарии пока упрощены.
- Нет интерактивных hover/crosshair-состояний как в Recharts.
- Цвета зафиксированы как сырьевые значения из REVERIE и должны быть переведены в токены.
- Форматы данных нужно согласовать отдельно для ERP, маркетинговой аналитики и клиентских dashboard.

## Технический долг

- Выбрать стратегию chart engine: Recharts напрямую, adapter API или отдельный `charts-core`.
- Описать semantic chart tokens: series, grid, axis, tooltip, positive/negative/warning, funnel stages.
- Добавить keyboard/focus и screen-reader правила для интерактивных графиков.
- Добавить visual regression сценарии после Figma-слепка.
