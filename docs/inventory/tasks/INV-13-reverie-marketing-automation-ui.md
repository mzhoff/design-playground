# INV-13: REVERIE — продуктовые интерфейсы автоматизации контент-маркетинга

## Статус

Готово к ревью.

## Источник

Основной источник:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

Рабочий вывод:

- `apps/product-web` — главный кодовый источник для сырого переноса, потому что это Next-приложение и ближе к целевой архитектуре потребления дизайн-системы.
- `apps/prototype-web` — UX-референс и источник более богатых продуктовых сценариев: topic planner, content editor, AI-панель, мультиплатформенные preview, календарь с drag-and-drop.
- Переносить нужно не доменную реализацию REVERIE, а повторяемые интерфейсные задачи: workspace, board, cards, editor shell, calendar, media library, platform guidance, assistant panel.

## Цель задачи

Найти сложные продуктовые интерфейсы автоматизации контент-маркетинга и разложить их на будущие переиспользуемые vertical kits для дизайн-системы.

Эта задача не предполагает перенос кода. Результат — карта экранов, паттернов, рисков и порядка дальнейшей нарезки.

## Ключевые экраны и entry points

| Экран / сценарий | Путь | Роль в дизайн-системе |
|---|---|---|
| Brand Context Workspace | `apps/product-web/src/page-slices/brand-context/ui/brand-context-page.tsx` | Редактор бренд-контекста: документ, секции, entity cards, навигация по блокам, empty state для запуска onboarding. |
| Brand Context Model | `apps/product-web/src/page-slices/brand-context/model/types.ts` | Локальная модель документа: heading, brand section, entity grid, audience/product/competitor. Использовать как референс формы данных, но не как жесткий контракт пакета. |
| Content Production Workspace | `apps/product-web/src/page-slices/content/ui/content-page.tsx` | Главный рабочий экран производства контента: sprints, board, фильтры, поиск, drag-and-drop между статусами и спринтами. |
| Legacy/mock content model | `apps/product-web/src/page-slices/content/model/types.ts` | Старый локальный словарь статусов: draft, generating, review, approval, scheduled, published. Нужен для сравнения с текущим contract-based board. |
| Mock content production | `apps/product-web/src/page-slices/content/model/mock-content-production.ts` | Примеры контентных единиц, версий и состояний генерации. Использовать только как mock-данные для Storybook. |
| Telegram Post Editor Page | `apps/product-web/src/page-slices/post-editor/ui/post-editor-page.tsx` | Сильный вертикальный сценарий: AI-assisted editor, параметры генерации, rich text editor, versions, preview, publish flow. |
| Post Editor Rail | `apps/product-web/src/page-slices/post-editor/ui/post-editor-rail.tsx` | Правая панель редактора: strategic frame, channel guidance, publish action, version history, token usage. |
| Telegram Post Preview | `apps/product-web/src/page-slices/post-editor/ui/telegram-post-preview.tsx` | Preview публикации в формате Telegram. Брать как частный provider-preview, не как универсальный preview. |
| Publish Confirm Modal | `apps/product-web/src/page-slices/post-editor/ui/publish-confirm-modal.tsx` | Подтверждение публикации, состояние publishing, предупреждение о немедленной отправке. |
| Post Editor Types | `apps/product-web/src/page-slices/post-editor/model/types.ts` | Seed-модель редактора: channels, messages, quick replies, generation params, versions, media files. |
| Content Calendar | `apps/product-web/src/page-slices/calendar/ui/calendar-page.tsx` | Реальный Next-календарь публикаций: month grid, фильтры, статусы schedule, создание/перенос публикаций. |
| Media Library | `apps/product-web/src/page-slices/media-library/ui/media-library-page.tsx` | Библиотека сгенерированных ассетов: grid, usage chips, фильтр/поиск, loading/error/empty states. |
| Channel System | `apps/product-web/src/page-slices/channel-system/ui/channel-system-page.tsx` | Карточки знаний о каналах: форматы, аудитории, ограничения, частота постинга, лучшее время. |
| Topic Planner Page | `apps/prototype-web/src/pages/topic-planner/ui/TopicPlannerPage.tsx` | UX-референс планировщика тем по funnel stages, board/list modes, генерация плана. |
| Topic Planner Board | `apps/prototype-web/src/pages/topic-planner/ui/BoardView.tsx` | Горизонтальный funnel board с группами и stage columns. |
| Topic Card | `apps/prototype-web/src/pages/topic-planner/ui/TopicCard.tsx` | Мини-карточка темы для board view. |
| Topic Toolbar | `apps/prototype-web/src/pages/topic-planner/ui/Toolbar.tsx` | Toolbar с генерацией плана, переключением board/list и фильтрами. |
| Prototype Content Editor | `apps/prototype-web/src/pages/content-editor/ui/ContentEditorPage.tsx` | UX-референс production board: DnD provider, board/list, filters, editor overlay, drag schedule/publish modals. |
| Prototype Content Card | `apps/prototype-web/src/pages/content-editor/ui/ContentCard.tsx` | Карточка контента с platform icon, format badge, version count, generation progress и hover action. |
| Prototype AI Assistant Panel | `apps/prototype-web/src/pages/content-editor/ui/AIAssistantPanel.tsx` | Панель AI-действий: rewrite, transform, generate, custom prompt, result preview, apply/copy. |
| Prototype Platform Preview | `apps/prototype-web/src/pages/content-editor/ui/PlatformPreview.tsx` | Мультиплатформенный preview: Telegram, VK, Instagram и другие платформы. Брать как UX-референс для provider-preview kit. |
| Prototype Calendar | `apps/prototype-web/src/pages/calendar/ui/CalendarInner.tsx` | Календарь с пулом несcheduled content, drag-and-drop, channel-aware time slider и предупреждениями по качеству времени. |
| Prototype Calendar Cards | `apps/prototype-web/src/pages/calendar/ui/DraggableContentCard.tsx` | Drag-карточки для календаря: compact pool и scheduled list варианты. |
| Prototype Calendar Drop Cell | `apps/prototype-web/src/pages/calendar/ui/DroppableDayCell.tsx` | Droppable day cell с selected/today/drop active состояниями. |
| Prototype Library | `apps/prototype-web/src/pages/library/ui/LibraryPage.tsx` | UX-референс общей библиотеки text/image/video с фильтрами, счетчиками и create actions. |

## Повторяемые UI-паттерны

- Workspace shell: рабочая область с header, toolbar, основной зоной и боковыми панелями.
- Workflow board: колонки статусов, sprint lanes, funnel stages, горизонтальный scroll.
- Workflow card: карточка контентной единицы с каналом, форматом, статусом, датой, версией и коротким summary.
- Dynamic filters: поиск, статусные фильтры, фильтры по платформам, форматам, категориям, авторам и динамическим полям.
- Status badge system: единая система статусов для draft, generating, review, ready, scheduled, published, archived, failed.
- Drag-and-drop workflow: перенос между статусами, спринтами, календарными днями и пулом несcheduled content.
- AI assistant panel: список быстрых AI-действий, custom prompt, состояние processing, result preview, apply/copy.
- Generation params panel: tone, point of view, rhythm, variability и будущие параметры генерации.
- Rich text editor shell: editor canvas, toolbar, preview mode, plain text extraction, word/char counters.
- Version history: версии текста, active version, model, createdAt, input/output tokens.
- Strategic frame panel: тезисы стратегии, аудитория, key message, channel guidance.
- Platform preview: provider-specific preview для Telegram, VK, Instagram, email и других каналов.
- Publish flow: confirm modal, publishing state, success/error, media count, provider warning.
- Calendar scheduling: month grid, selected day sidebar, unscheduled pool, time slider, channel quality warning.
- Media library: asset grid, usage traceability, type filters, empty/loading/error states.
- Channel knowledge cards: ограничения платформы, форматы, аудитории, частота, лучшее время, strategic goal.
- Empty/loading/error states: нужны как обязательная часть каждого vertical kit, а не как app-level остаток.

## Болевые места текущего UX и кода

- В продукте есть расхождение словарей статусов: текущий board использует `idea`, `in_progress`, `review`, `ready`, `scheduled`, `published`, `archived`, а локальная mock-модель использует `draft`, `generating`, `review`, `approval`, `scheduled`, `published`.
- Page-level компоненты смешивают UI, API-загрузку, нормализацию данных, optimistic updates, routing и доменную логику.
- Много hardcoded русских текстов, платформенных названий и конкретных сценариев REVERIE внутри UI.
- Preview в `product-web` пока Telegram-specific, а `prototype-web` показывает потребность в универсальном provider-preview слое.
- Состояния генерации разбросаны по разным экранам: `generating`, `isTyping`, `isSaving`, `isPublishing`, `processing`, `failed`.
- Drag-and-drop реализован по-разному в разных местах: content board, calendar, future sidebar reorder. Нужен единый interaction contract.
- Accessibility для drag-and-drop, calendar cells, editor panels и keyboard flows не зафиксирована.
- `dangerouslySetInnerHTML` в preview требует отдельной безопасной границы: sanitized renderer или controlled markdown/html renderer.
- Используются разные стилистические подходы: Tailwind utility, CSS modules, локальные CSS variables, hardcoded цвета платформ.
- Нет единой модели `ContentWorkflowItem`, которая могла бы жить между topic planner, production board, editor, calendar и library.

## Кандидаты на vertical kits

| Vertical kit | Назначение | Первичный источник |
|---|---|---|
| `BrandContextKit` | Редактор бренд-контекста, секции, entity cards, навигация по документу. | `apps/product-web/src/page-slices/brand-context` |
| `StrategyPlanningKit` | Онбординг стратегии, goal/mix/plan, strategic map, прогресс анализа. | `apps/prototype-web/src/features/strategy` |
| `TopicPlanningKit` | Планирование тем по funnel stages, board/list, генерация плана. | `apps/prototype-web/src/pages/topic-planner` |
| `ContentProductionBoardKit` | Производственный board/sprints/list для контента. | `apps/product-web/src/page-slices/content` + `apps/prototype-web/src/pages/content-editor` |
| `PostEditorKit` | AI-assisted редактор публикации, параметры генерации, версии, preview, publish flow. | `apps/product-web/src/page-slices/post-editor` |
| `ContentCalendarKit` | Календарь публикаций, unscheduled pool, drag schedule, time quality. | `apps/product-web/src/page-slices/calendar` + `apps/prototype-web/src/pages/calendar` |
| `MediaLibraryKit` | Библиотека generated assets, usage chips, фильтры, create actions. | `apps/product-web/src/page-slices/media-library` + `apps/prototype-web/src/pages/library` |
| `ChannelSystemKit` | Карточки знаний о каналах и ограничениях платформ. | `apps/product-web/src/page-slices/channel-system` |
| `AssistantAutomationKit` | Чат/ассистент для сценариев генерации и редактирования. | Связать с результатами `INV-10` |
| `MarketingAutomationDashboardKit` | Обзор процесса, метрики, bottlenecks, статусы pipeline. | Заложить место, детализировать после ERP/dashboard этапа |

## Что переносим в дизайн-систему

- Визуальные shell-компоненты и layout-композиции.
- Карточки, панели, toolbar, status badges, фильтры, empty/loading/error states.
- Контракты props для workflow item, topic item, media item, channel profile, editor version.
- Storybook mock-данные для демонстрации состояний.
- Provider-preview интерфейс как адаптер: Telegram/VK/Instagram/email должны быть вариантами, а не отдельной бизнес-логикой.
- Универсальные паттерны генерации: processing, result preview, apply, copy, retry, failure.

## Что точно не переносим

- API-клиенты и BFF-запросы: `fetchContentPosts`, `updateContentPostSprint`, `updateContentPostStatus`, `fetchContentCalendar`, `scheduleContentItem`, `moveCalendarSchedule`, `requestAiChatCompletion`, Telegram publish API.
- Доменные DTO как жесткую зависимость UI-пакетов. DTO можно использовать только через adapter layer.
- Конкретные роуты Next/React Router: `router.push`, `navigate`, search params, workspace routes.
- Секреты, env-значения, provider tokens и интеграционные настройки.
- Конкретные тексты, контент REVERIE, mock-данные клиентов и реальные публикации.
- Telegram-only publish flow как универсальный сценарий. Его нужно обобщить до provider publish flow.
- Небезопасный HTML-render без отдельного sanitized boundary.
- Оркестрацию генерации, backend workflow и бизнес-логику автоматизации.

## Минимальные mock-данные для Storybook

- `ContentWorkflowItem`: id, title, summary, status, channel, format, audience, sprint, scheduledAt, publishedAt, versionCount.
- `TopicItem`: id, title, funnelStage, goal, score, source.
- `EditorVersion`: id, label, contentHtml или markdown, model, createdAt, inputTokens, outputTokens.
- `ChannelProfile`: id, name, platform, handle, avatar, constraints, bestTimes, guidance.
- `MediaAsset`: id, type, url, filename, usageCount, usages, createdAt.
- `GenerationState`: idle, processing, success, failed, streaming.
- `CalendarEvent`: id, date, time, timezone, status, channel, content item.

## Storybook-структура

- `Marketing Automation / Brand Context / Document Workspace`
- `Marketing Automation / Topic Planning / Funnel Board`
- `Marketing Automation / Topic Planning / Topic Card`
- `Marketing Automation / Content Production / Board`
- `Marketing Automation / Content Production / Workflow Card`
- `Marketing Automation / Content Production / Filters Toolbar`
- `Marketing Automation / Post Editor / Editor Shell`
- `Marketing Automation / Post Editor / AI Assistant Panel`
- `Marketing Automation / Post Editor / Version History Rail`
- `Marketing Automation / Post Editor / Platform Preview`
- `Marketing Automation / Publishing / Confirm Modal`
- `Marketing Automation / Calendar / Scheduling Workspace`
- `Marketing Automation / Calendar / Draggable Content Card`
- `Marketing Automation / Media Library / Asset Grid`
- `Marketing Automation / Channel System / Platform Card`
- `Marketing Automation / States / Empty Loading Error`

## Playground preview

Целевая зона: `product-workflow-preview`.

Нужные controls:

- режим workflow: topic planning, production, editor, calendar, media library;
- плотность интерфейса: compact, regular, spacious;
- статусный словарь: simple, full, custom;
- platform set: Telegram, VK, Instagram, email, blog;
- generation state: idle, processing, success, failed;
- preview provider: Telegram, VK, Instagram, email;
- sidebar/rail mode: open, collapsed, hidden;
- theme/tokens preset.

## Figma

Слепок обязателен, но после сырого переноса и первичного Storybook-preview.

Приоритет слепков:

1. Content Production Workspace.
2. Post Editor Shell с правым rail и preview.
3. Content Calendar с unscheduled pool.
4. Topic Planner funnel board.
5. Media Library asset grid.
6. Channel System cards.
7. Brand Context Workspace.

## Рекомендуемый порядок сырого импорта

1. Зафиксировать общую модель `ContentWorkflowItem` и статусный словарь для Storybook mock-данных.
2. Скопировать workflow card и status badge primitives из content/product/prototype слоев.
3. Скопировать `ContentProductionBoardKit` как главный рабочий board без API и routing.
4. Скопировать `PostEditorKit` shell: editor area, left assistant/params rail, right meta/history rail, preview, publish modal.
5. Скопировать `ContentCalendarKit`: month grid, unscheduled pool, draggable card, selected day panel.
6. Скопировать `TopicPlanningKit` как отдельный vertical kit для funnel planning.
7. Скопировать `MediaLibraryKit` и `ChannelSystemKit` как supporting kits.
8. После Storybook-демо сделать Figma-слепки и согласовать, что стандартизируем в primitives.

## Критерии готовности INV-13

- Ключевые экраны перечислены.
- Пути к исходникам указаны.
- Повторяемые UI-паттерны отмечены.
- Болевые места текущего UX зафиксированы.
- Кандидаты на vertical kits предложены.
- Отдельно зафиксировано, что точно не переносим.
- Предложены Storybook-структура, Playground preview и порядок сырого импорта.
