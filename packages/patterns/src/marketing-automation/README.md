# Сырой импорт: REVERIE marketing automation

## Происхождение

Источник: `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`.

Основные референсы:

- `apps/product-web/src/page-slices/content` — content production workspace, board, filters, statuses.
- `apps/product-web/src/page-slices/post-editor` — AI-assisted editor shell, versions, right rail, preview, publish flow.
- `apps/product-web/src/page-slices/calendar` — scheduling workspace.
- `apps/product-web/src/page-slices/media-library` — generated media library.
- `apps/product-web/src/page-slices/channel-system` — platform knowledge cards.
- `apps/product-web/src/page-slices/brand-context` — brand context workspace.
- `apps/prototype-web/src/pages/topic-planner` — funnel topic planning board.
- `apps/prototype-web/src/pages/content-editor` — richer UX reference for content workflow, AI actions and provider previews.

## Что перенесено

- Общие UI-контракты для content workflow item, topic item, editor version, channel profile, provider preview, calendar event, media asset и brand context section.
- Content production board.
- Topic funnel board.
- AI generation actions panel.
- Post editor shell с версионностью и preview.
- Scheduling calendar preview.
- Media library grid.
- Channel knowledge cards.
- Brand context workspace.

## Что сознательно не переносим

- API-клиенты и BFF-запросы REVERIE.
- DTO `@reverie/contracts` как жесткую зависимость пакета.
- Next routing, search params и navigation side effects.
- Telegram publish API и provider secrets.
- Rich text engine, orchestration AI SDK и backend workflow.
- Небезопасный HTML-render из platform preview.

## Ограничения

- Это не финальный production API дизайн-системы.
- Drag-and-drop показан только как будущая зона, без переносимой interaction-логики.
- Статусный словарь временно объединяет старые и новые статусы REVERIE.
- Provider preview пока схематичный, без полной симуляции Telegram/VK/Instagram/email.
- После Figma-слепка этот набор нужно разрезать на отдельные vertical kits.

## Технический долг

- Согласовать единый `ContentWorkflowItem` между topic planner, production board, editor, calendar и media library.
- Разделить `ContentProductionBoardKit`, `PostEditorKit`, `ContentCalendarKit`, `TopicPlanningKit`, `MediaLibraryKit`, `ChannelSystemKit`, `BrandContextKit`.
- Привязать drag-and-drop к общему interaction contract из INV-06.
- Добавить accessibility правила для board, calendar, editor rails и provider previews.
- Перевести цвета и размеры в semantic tokens.
