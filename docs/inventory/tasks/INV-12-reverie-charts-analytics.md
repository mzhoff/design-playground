# INV-12: REVERIE — графики и аналитические компоненты

## Статус

Готово к ревью.

## Источник

- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

## Цель

Найти chart components и аналитические паттерны REVERIE для будущего слоя `charts/data display`: графики, KPI-карточки, progress-паттерны, legends, tooltips, dashboard-композиции и связанные визуальные токены.

## Короткое решение

Основной источник реальных chart components — `apps/prototype-web`, а не `apps/product-web`.

В `product-web` сейчас найдены в основном иконки/ссылки на аналитику и продуктовая логика ассистента, но не готовые chart-компоненты. В `site-web` есть хороший визуальный analytics mockup для сайта, но он сделан статичными изображениями и полезен скорее для Figma-слепка, чем для сырого переноса chart-кода.

Лучший стартовый набор для переноса:

- `apps/prototype-web/src/app/components/ui/chart.tsx` — shadcn-like wrapper над Recharts: `ChartContainer`, `ChartTooltipContent`, `ChartLegendContent`, `ChartConfig`.
- `apps/prototype-web/src/pages/analytics/ui/EngagementChart.tsx` — area chart для тренда вовлеченности/кликов.
- `apps/prototype-web/src/pages/analytics/ui/KPICard.tsx` — KPI/stat card.
- `apps/prototype-web/src/pages/analytics/ui/TopContentList.tsx` — ranked list аналитики.
- `apps/prototype-web/src/features/strategy/ui/MixStep.tsx` — donut/pie chart для content mix + legend + sliders.
- `apps/prototype-web/src/features/strategy/ui/PlanStep.tsx` — SEO trend line chart + keyword metrics panel.
- `apps/prototype-web/src/features/onboarding/ui/FunnelBar.tsx` — segmented funnel progress bar.
- `apps/prototype-web/src/features/onboarding/ui/StepShell.tsx` и `ParsingStep.tsx` — progress-first onboarding patterns.
- `apps/prototype-web/src/features/onboarding/ui/AnalysisChannelCard.tsx` и `ChannelAnalysisStep.tsx` — channel analytics cards.

## Библиотеки графиков и зависимостей

| Библиотека | Где найдена | Версия / роль |
| --- | --- | --- |
| `recharts` | `apps/prototype-web/package.json` | `2.15.2`, основной chart runtime |
| `@radix-ui/react-progress` | `apps/prototype-web/package.json` | `1.1.2`, progress primitive |
| `motion` | `apps/prototype-web/package.json` | `12.23.24`, анимация progress/cards/steps |
| `lucide-react` | `apps/prototype-web/package.json` | `0.487.0`, иконки в KPI/cards |
| `react-i18next` | `apps/prototype-web/package.json` | тексты и labels, в дизайн-систему напрямую не тащить |

## Найденные chart/data display компоненты

| Компонент | Путь | Тип | Что переносить |
| --- | --- | --- | --- |
| `ChartContainer` / `ChartTooltipContent` / `ChartLegendContent` | `apps/prototype-web/src/app/components/ui/chart.tsx` | chart primitive wrapper | Базовый wrapper для `packages/ui-react/charts` |
| `EngagementChart` | `apps/prototype-web/src/pages/analytics/ui/EngagementChart.tsx` | area chart | Reusable `AreaTrendChart` pattern |
| `KPICard` | `apps/prototype-web/src/pages/analytics/ui/KPICard.tsx` | metric card | Reusable `MetricCard` / `KpiCard` |
| `TopContentList` | `apps/prototype-web/src/pages/analytics/ui/TopContentList.tsx` | ranked list | Reusable `RankedMetricList` |
| `AnalyticsPage` | `apps/prototype-web/src/pages/analytics/ui/AnalyticsPage.tsx` | dashboard composition | Reusable `AnalyticsDashboardLayout` pattern |
| `MixStep` pie chart | `apps/prototype-web/src/features/strategy/ui/MixStep.tsx` | donut/pie + legend | `DonutDistributionChart`, `FunnelMixEditor` pattern |
| `PlanStep` trend chart | `apps/prototype-web/src/features/strategy/ui/PlanStep.tsx` | multi-line chart + SEO panel | `MultiLineTrendChart`, `KeywordMetricsPanel` |
| `FunnelBar` | `apps/prototype-web/src/features/onboarding/ui/FunnelBar.tsx` | segmented bar | `SegmentedDistributionBar` |
| `StepShell` progress | `apps/prototype-web/src/features/onboarding/ui/StepShell.tsx` | milestone progress | `MilestoneProgress` pattern |
| `ParsingStep` progress | `apps/prototype-web/src/features/onboarding/ui/ParsingStep.tsx` | staged loading progress | `StagedProgressPanel` pattern |
| `AnalysisChannelCard` | `apps/prototype-web/src/features/onboarding/ui/AnalysisChannelCard.tsx` | analytics card | `ChannelAnalyticsCard` pattern |
| `ChannelAnalysisStep` | `apps/prototype-web/src/features/onboarding/ui/ChannelAnalysisStep.tsx` | aggregate analytics view | `AggregateAnalyticsSummary` pattern |

## Dashboard-паттерн аналитики

### Entry point

- `apps/prototype-web/src/pages/analytics/ui/AnalyticsPage.tsx`
- `apps/prototype-web/src/pages/analytics/model/useAnalyticsData.ts`
- `apps/prototype-web/src/pages/analytics/data/weeklyTrend.ts`

### Состав экрана

- Заголовок + subtitle.
- Range select: last 7 days / last 30 days / quarter.
- KPI grid: 4 карточки.
- Основная зона: `EngagementChart` на 2 колонки + `TopContentList` на 1 колонку.

### KPI cards

- Props: `title`, `value`, `sub`, `icon`, `trend`.
- Trend pill: положительный `green`, отрицательный `red`.
- Иконка в muted rounded square.
- Карточка: `bg-card`, `border-border`, `rounded-xl`, `shadow-sm`.

### Top content list

- Props: `topContent`, `topics`.
- Data dependency: `ContentUnit.analytics.clicks`, `ContentUnit.topicId`, `ContentUnit.channelId`.
- Ranked rows с номером `01`, title, channel marker, clicks.
- Empty state: нет данных, нужно опубликовать контент.
- Есть action button `fullReport`.

## Area chart: `EngagementChart`

### Компонент

- `apps/prototype-web/src/pages/analytics/ui/EngagementChart.tsx`

### Библиотека

- `recharts`: `AreaChart`, `Area`, `XAxis`, `YAxis`, `CartesianGrid`, `Tooltip`, `ResponsiveContainer`.

### Формат данных

```ts
type WeeklyTrendPoint = {
  name: string;
  clicks: number;
  published: number;
};
```

Текущий mock dataset:

```ts
[
  { name: 'Пн', clicks: 120, published: 2 },
  { name: 'Вт', clicks: 132, published: 1 },
  { name: 'Ср', clicks: 101, published: 3 },
  { name: 'Чт', clicks: 154, published: 2 },
  { name: 'Пт', clicks: 190, published: 4 },
  { name: 'Сб', clicks: 230, published: 1 },
  { name: 'Вс', clicks: 210, published: 0 },
]
```

### Визуальные настройки

- Stroke: `#2563eb`.
- Gradient: `#2563eb` с opacity `0.3 -> 0`.
- Grid stroke: `#f4f4f5`, dash `3 3`, vertical off.
- Axis tick fill: `#71717a`, font size `12`.
- Tooltip: radius `8px`, no border, shadow `0 4px 6px -1px rgb(0 0 0 / 0.1)`.
- Chart animation disabled: `isAnimationActive={false}`.
- Dot disabled.

## Donut/pie chart: `MixStep`

### Компонент

- `apps/prototype-web/src/features/strategy/ui/MixStep.tsx`

### Формат данных

```ts
type ContentMix = {
  tofu: number;
  mofu: number;
  bofu: number;
  retention: number;
};

type MixSegment = {
  name: string;
  value: number;
  fill: string;
};
```

### Визуальные токены текущей реализации

| Segment | Цвет | Tailwind class |
| --- | --- | --- |
| `tofu` | `#38bdf8` | `bg-sky-400` |
| `mofu` | `#fbbf24` | `bg-amber-400` |
| `bofu` | `#10b981` | `bg-emerald-500` |
| `retention` | `#a78bfa` | `bg-violet-400` |

### Поведение

- Donut chart: `innerRadius=60`, `outerRadius=90`, `paddingAngle=3`, `strokeWidth=0`.
- Tooltip форматирует значение как `%`.
- Легенда в 2 колонки.
- Слайдеры меняют доли и поддерживают сумму `100%`.
- Есть recommended marker на slider.
- Есть deviation warning при отклонении больше `15%`.
- Есть sum indicator: `100%` зеленым, ошибка красным.
- Есть live preview, который переводит проценты в количество постов в месяц.

### Что выносить

- В `ui-react`: `DonutChart`, `ChartLegend`, `SegmentedSlider` после отдельного проектирования.
- В `patterns`: `ContentMixDistributionEditor` как продуктовый pattern.
- В `tokens`: funnel segment colors.

## Line chart и SEO analytics panel: `PlanStep`

### Компонент

- `apps/prototype-web/src/features/strategy/ui/PlanStep.tsx`

### Формат входных данных

Текущая структура приходит из SEO orchestration:

```ts
type SeoTrendData = {
  keywords: string[];
  data: Array<{
    date: string;
    values: number[];
  }>;
};
```

Компонент нормализует данные в Recharts shape:

```ts
type TrendChartPoint = {
  date: string;
  [keyword: string]: number | string;
};
```

### Визуальные токены

- Trend colors: `#3b82f6`, `#10b981`, `#f59e0b`, `#8b5cf6`, `#ef4444`.
- Axis tick: `#a1a1aa`, font size `10`.
- Tooltip border: `#e4e4e7`, radius `8px`, font size `11px`.
- Stroke width: `2`.
- Dots disabled.

### Что важно отделить

- `seoEnrichPlan`, `DataForSEO`, cache/warnings/errors — это app/orchestration logic.
- Chart UI должен принимать готовый normalized dataset.
- Keyword list должен стать отдельным `KeywordMetricList`.
- SEO summary panel должен стать pattern, где данные приходят props, а не через API.

## Progress и funnel-паттерны

### `Progress`

- Пути: `apps/prototype-web/src/app/components/ui/progress.tsx` и `apps/prototype-web/src/shared/ui/progress.tsx`.
- Дублирующийся Radix progress primitive.
- Основа: `@radix-ui/react-progress`.
- Root: `bg-primary/20`, `h-2`, `rounded-full`.
- Indicator: `bg-primary`, `transition-all`, `translateX(-${100 - value}%)`.

### `StepShell`

- Путь: `apps/prototype-web/src/features/onboarding/ui/StepShell.tsx`.
- Progress-first onboarding: показывает не номер шага, а процент готовности стратегии.
- Step progress values: `5`, `15`, `25`, `40`, `60`, `80`, `90`, `100`.
- Milestone thresholds: `0`, `25`, `50`, `65`, `80`, `100`.
- Progress fill: blue gradient до 100%, green gradient на 100%.
- Milestone dots меняют состояние по threshold.

### `ParsingStep`

- Путь: `apps/prototype-web/src/features/onboarding/ui/ParsingStep.tsx`.
- Stage-by-stage loading вместо обычного spinner.
- Progress считается как `doneStages / totalStages`.
- UI intentionally optimistic: progress text capped до `95%`, bar capped до `92%`.
- Stages появляются и завершаются по delay/completionDelay.
- Есть rotating tips раз в 4 секунды.

### `FunnelBar`

- Путь: `apps/prototype-web/src/features/onboarding/ui/FunnelBar.tsx`.
- Segmented bar для ToFu/MoFu/BoFu.
- Props: `tofu`, `mofu`, `bofu`, `compact`.
- Цвета: sky, amber, emerald.
- Есть текстовая легенда с процентами.

## Форматы данных для будущего слоя

### `MetricCardData`

```ts
type MetricCardData = {
  id: string;
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ComponentType;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'neutral';
    label?: string;
  };
};
```

### `TimeSeriesData`

```ts
type TimeSeriesPoint = {
  label: string;
  [metricKey: string]: string | number;
};
```

### `ChartSeriesConfig`

```ts
type ChartSeriesConfig = {
  key: string;
  label: string;
  color: string;
  icon?: React.ComponentType;
};
```

### `DistributionData`

```ts
type DistributionSegment = {
  id: string;
  label: string;
  value: number;
  color?: string;
  tone?: 'sky' | 'amber' | 'emerald' | 'violet' | 'red' | 'blue' | 'zinc';
};
```

### `RankedMetricItem`

```ts
type RankedMetricItem = {
  id: string;
  rank: number;
  title: string;
  subtitle?: string;
  markerTone?: string;
  value: string | number;
  valueLabel?: string;
};
```

### `MilestoneProgressData`

```ts
type MilestoneProgressData = {
  percent: number;
  label?: string;
  milestones: Array<{
    label: string;
    threshold: number;
  }>;
};
```

## Цвета и визуальные токены

### Chart semantic tokens

- `--chart-blue`: `#2563eb` / `#3b82f6`.
- `--chart-sky`: `#38bdf8`.
- `--chart-amber`: `#fbbf24` / `#f59e0b`.
- `--chart-emerald`: `#10b981`.
- `--chart-violet`: `#a78bfa` / `#8b5cf6`.
- `--chart-red`: `#ef4444`.
- `--chart-grid`: `#f4f4f5`.
- `--chart-axis`: `#71717a` / `#a1a1aa`.
- `--chart-tooltip-border`: `#e4e4e7`.

### Data state tokens

- positive: green/emerald.
- negative: red.
- warning: amber.
- neutral/muted: zinc.
- primary metric: blue.

### Component tokens

- chart card radius: `rounded-xl`.
- metric card background: `bg-card`.
- metric card border: `border-border`.
- metric card shadow: `shadow-sm`.
- tooltip radius: `8px`.
- progress radius: full.

## Целевая раскладка

### `packages/ui-react/charts`

- `ChartContainer`
- `ChartTooltip`
- `ChartTooltipContent`
- `ChartLegend`
- `ChartLegendContent`
- `AreaChartPrimitive`
- `LineChartPrimitive`
- `DonutChartPrimitive`
- `SegmentedBar`
- `Progress`
- `MilestoneProgress`

### `packages/ui-react/data-display`

- `MetricCard`
- `TrendBadge`
- `RankedList`
- `KeywordMetricList`
- `StatisticBlock`

### `packages/patterns/analytics`

- `AnalyticsDashboardLayout`
- `EngagementTrendPanel`
- `SeoTrendPanel`
- `ContentMixDistributionEditor`
- `ChannelAnalyticsSummary`
- `StagedProgressPanel`
- `FunnelDistributionPanel`

### `packages/tokens`

- chart palette;
- funnel palette;
- data state colors;
- grid/axis/tooltip tokens;
- progress tokens.

## Storybook

Раздел: `Charts / Analytics`.

Сценарии:

- `Charts / Area Trend Chart`
- `Charts / Multi Line Trend Chart`
- `Charts / Donut Distribution Chart`
- `Charts / Segmented Funnel Bar`
- `Charts / Tooltip Content`
- `Charts / Legend Content`
- `Data Display / KPI Card`
- `Data Display / KPI Card With Positive Trend`
- `Data Display / KPI Card With Negative Trend`
- `Data Display / Ranked Metric List`
- `Progress / Radix Progress`
- `Progress / Milestone Progress`
- `Progress / Staged Loading Panel`
- `Analytics / Dashboard Layout`
- `Analytics / SEO Trend Panel`
- `Analytics / Channel Analytics Summary`

## Playground

Раздел: `dashboard-preview`.

Минимальные controls:

- chart type: area / line / donut / segmented bar;
- theme: light / dark;
- palette: default / funnel / monochrome / client accent;
- grid visible on/off;
- tooltip mode: compact / full;
- legend position: top / bottom / side / hidden;
- data density: 7 / 30 / 90 points;
- animation: disabled / subtle / expressive;
- progress state: idle / running / success / warning / error;
- KPI trend mode: positive / negative / neutral.

## Mock-данные

Нужны нейтральные fixtures:

- weekly engagement trend;
- monthly multi-line keyword trend;
- KPI list: clicks, impressions, conversions, engagement;
- ranked content list;
- distribution mix: ToFu/MoFu/BoFu/Retention;
- funnel bar: ToFu/MoFu/BoFu;
- channel analytics cards;
- progress milestones;
- staged loading process.

## Figma

Нужен обязательный слепок.

Первый слепок:

- `AnalyticsPage` dashboard.
- `EngagementChart` area chart.
- `KPICard` states.
- `TopContentList` normal и empty state.
- `MixStep` donut chart + legend + sliders.
- `PlanStep` SEO panel + line chart.
- `FunnelBar` compact/regular.
- `StepShell` milestone progress.
- `ParsingStep` staged progress.
- `ChannelAnalysisStep` aggregate cards.

## Риски

- Основные графики лежат в prototype, не в финальном product-web.
- `ChartContainer` выглядит как shadcn-style wrapper, но текущий `EngagementChart` его не использует напрямую.
- Цвета, tooltip styles и grid/tick colors зашиты hex-значениями.
- Chart components зависят от client runtime, Recharts и DOM; в Next их нужно держать за client boundary.
- i18n keys смешаны с UI, в дизайн-систему должны уйти props/slots.
- SEO chart в `PlanStep` сильно связан с DataForSEO orchestration.
- Progress-паттерны используют optimistic progress; нужно явно документировать, что это UX-паттерн, а не факт выполнения backend job.
- Нужно проверить accessibility для SVG charts, legends, tooltip и progress states на этапе реализации.

## Предложенный порядок сырого импорта

1. Перенести `ChartContainer`, `ChartTooltipContent`, `ChartLegendContent` как основу `packages/ui-react/charts`.
2. Перенести `Progress` и объединить дубли из `app/components/ui` и `shared/ui`.
3. Перенести `MetricCard`, `TrendBadge`, `RankedMetricList`.
4. Перенести `AreaTrendChart` на базе `EngagementChart` с neutral mock data.
5. Перенести `DonutDistributionChart` и `SegmentedDistributionBar` на базе `MixStep` и `FunnelBar`.
6. Перенести `MultiLineTrendChart` на базе `PlanStep`, без `seoEnrichPlan`.
7. Собрать `AnalyticsDashboardLayout` как pattern без app-specific hooks.
8. Собрать Storybook stories и `dashboard-preview` на mock fixtures.
9. Сделать Figma snapshot и после него приводить tokens/visuals к дизайн-системному контракту.

## Критерии готовности INV-12

- Найден список chart components.
- Указаны библиотеки графиков.
- Описаны форматы данных.
- Перечислены цвета и визуальные токены.
- Предложен минимальный набор reusable chart patterns.
- Зафиксированы Storybook-сценарии.
- Зафиксирован Playground preview.
- Зафиксирована необходимость Figma-слепка.
