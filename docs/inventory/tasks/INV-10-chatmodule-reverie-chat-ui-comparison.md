# INV-10: ChatModule и REVERIE — сравнение чатового UI

## Статус

Готово к ревью.

## Источники

- ChatModule: `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/ChatModule/repos/ChatModule`
- REVERIE: `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

## Цель

Сравнить UI чат-ассистента в ChatModule и REVERIE, выбрать лучший кодовый референс для сырого переноса и зафиксировать, какие части нужно переносить в дизайн-систему, а какие оставить как продуктовую orchestration-логику.

## Короткое решение

Основной кодовый референс для сырого переноса — ChatModule.

REVERIE нужно использовать как продуктовый UX-референс для page-level assistant, onboarding, task panel, feedback и suggested actions. Старый prototype-web в REVERIE можно использовать только как UX-референс compact floating panel, но не как основной кодовый источник.

Причина: ChatModule уже ближе к переиспользуемому пакету. Там есть `packages/chat-ui`, `packages/chat-domain`, конфигурируемая оболочка, semantic blocks, вложения, режимы ассистента, политика моделей и playground. REVERIE сильнее как продуктовый сценарий, но сильнее связан с роутингом, BFF, pending-состоянием, brand context и конкретной логикой Reverie.

## Найденный UI в ChatModule

### Основные entry point

- `packages/chat-ui/src/components/chat-module-shell.tsx`
- `packages/chat-ui/src/components/chat-composer.tsx`
- `packages/chat-ui/src/components/chat-message-item.tsx`
- `packages/chat-ui/src/components/chat-command-palette.tsx`
- `packages/chat-ui/src/components/chat-model-selector.tsx`
- `packages/chat-ui/src/components/chat-rich-text.tsx`
- `packages/chat-ui/src/components/semantic-block-renderer.tsx`
- `apps/web/src/page-slices/chat-playground/ui/ChatPlaygroundPage.tsx`
- `apps/web/src/features/chat-session/model/useChatSession.ts`
- `apps/web/src/features/chat-session/model/useChatAttachments.ts`
- `packages/chat-domain/src/types.ts`
- `apps/web/src/shared/config/assistantModes.ts`

### Что есть в ChatModule

- Полноэкранная shell-оболочка `ChatModuleShell`.
- Конфигурируемый внешний вид: style, theme, radius, font, icon library, user avatar, assistant avatar, assistant bubble.
- Настройки ассистента: режим ассистента, список моделей, разрешенные модели по режимам.
- Composer с авторазмером, hotkeys, `Enter` submit, `Shift+Enter` newline, `Cmd/Ctrl+A`, `Ctrl+M` для voice mode.
- File/image attachments, paste файлов, image preview, remove attachment.
- Ограничения вложений и подготовка изображений в `useChatAttachments`.
- Model selector, image format selector для image-generation режима.
- Slash/grid action и command palette.
- Voice states: idle/listening/processing, waveform, cancel/stop во время ответа.
- Message item с avatar/bubble variants, attachment rendering, meta time, assistant animation.
- Semantic blocks: text, markdown, banner, card, action, image, gallery, document, table, chart placeholder, source, tool-status, form placeholder, error.
- Rich text на `react-markdown` и `remark-gfm`, включая typewriter animation.
- Streaming/session hook через `requestChatTurnStream` и abort controller.
- Playground, который уже соединяет UI, session, appearance, command palette, model policy, voice и image format.

### Режимы ассистента в ChatModule

- `general-chat`
- `knowledge-base`
- `product-copilot`
- `mcp-agent`
- `image-generation`
- `document-assistant`
- `debug`

## Найденный UI в REVERIE

### Product web

- `apps/product-web/src/shared/ui/chat/chat-composer.tsx`
- `apps/product-web/src/shared/ui/chat/chat-message-bubble.tsx`
- `apps/product-web/src/shared/ui/chat/chat-markdown.tsx`
- `apps/product-web/src/shared/ui/chat/chat-typing-indicator.tsx`
- `apps/product-web/src/shared/ui/chat/chat-command-palette.tsx`
- `apps/product-web/src/shared/ui/chat/chat-model-selector.tsx`
- `apps/product-web/src/shared/ui/chat/chat-quick-replies.tsx`
- `apps/product-web/src/shared/ui/chat/chat-task-panel.tsx`
- `apps/product-web/src/shared/ui/chat/chat-feedback-card.tsx`
- `apps/product-web/src/shared/ui/chat/types.ts`
- `apps/product-web/src/page-slices/assistant/ui/assistant-page.tsx`
- `apps/product-web/src/page-slices/assistant/ui/assistant-composer-overlay.tsx`
- `apps/product-web/src/page-slices/assistant/ui/assistant-empty-state.tsx`
- `apps/product-web/src/widgets/assistant-thread/ui/assistant-thread.tsx`
- `apps/product-web/src/page-slices/assistant/model/use-command-center-workspace.ts`
- `apps/product-web/src/page-slices/assistant/model/use-assistant-request.ts`
- `apps/product-web/src/page-slices/assistant/model/use-assistant-messages.ts`
- `apps/product-web/src/page-slices/assistant/model/constants.ts`
- `apps/product-web/src/page-slices/assistant/model/helpers.ts`
- `apps/product-web/src/page-slices/assistant/model/assistant-context.ts`

### Что есть в REVERIE product-web

- Page-level assistant через `AssistantThread` и `CommandCenterWorkspace`.
- Assistant layout с thread, composer dock, empty state, scroll-to-bottom, quick replies и task panel.
- Empty state с onboarding, shortcut grid, подсказкой `Ctrl+/`, ссылками и Figma video link.
- ChatComposer с вариантами `default` и `assistant`, voice states, hotkeys, model selector, command overlay.
- Message bubble с markdown, typewriter animation, copy, feedback like/unlike, suggested actions.
- Quick replies, task panel, feedback card.
- Product orchestration: BFF request, conversation/session API, route persistence, pending state, brand context, flowId, backend modes, suggested actions, tool call/action confirmation.

### Prototype web в REVERIE

- `apps/prototype-web/src/widgets/assistant-panel/ui/AssistantPanel.tsx`
- `apps/prototype-web/src/widgets/assistant-panel/ui/ChatInput.tsx`
- `apps/prototype-web/src/widgets/assistant-panel/ui/MessageBubble.tsx`
- `apps/prototype-web/src/widgets/assistant-panel/ui/PanelHeader.tsx`
- `apps/prototype-web/src/widgets/assistant-panel/ui/TypingIndicator.tsx`

Prototype содержит compact floating panel: фиксированная панель в правом нижнем углу, open/closed launcher, header actions, input, message bubbles и typing indicator. Это полезный UX-референс для компактного режима, но код устаревший и слишком простой для сырого переноса.

## Сравнительная таблица

| Критерий | ChatModule | REVERIE product-web | REVERIE prototype-web |
| --- | --- | --- | --- |
| Готовность к сырому переносу | Высокая: уже есть пакет `packages/chat-ui` | Средняя: UI отделен частично, но много связей с продуктом | Низкая: старый компактный виджет |
| Окно чата | Есть shell | Есть page-level thread | Есть compact floating panel |
| Compact panel | Частично через shell/composer, не как отдельный floating pattern | Нет полноценного floating panel | Есть |
| Resizable window | Не найдено | Не найдено | Не найдено |
| Fullscreen/page-level chat | Есть shell | Есть сильный page-level assistant | Нет |
| Input composer | Сильный, с вложениями и image mode | Хороший, но проще по вложениям | Простой |
| Message list | Есть semantic message item | Есть AssistantThread и bubble | Простой |
| Attachments | Сильнее: image/file/document, preview, paste | Слабее: в основном id/name chips | Почти нет |
| Streaming/loading states | Есть `isTyping`, activity label, abort/cancel | Есть phases, typing labels, pending state | Есть простой typing |
| Onboarding states | Базово через welcome message | Сильные empty/onboarding states | Нет |
| Tool/task states | Есть semantic `tool-status` block | Есть task panel, backend modes, actions | Нет |
| Theme/configuration | Сильная appearance-панель | Слабее, завязано на продуктовый стиль | Нет |
| Backend coupling | Умеренное: chat SDK/SSE и domain types | Высокое: BFF, router, query, brand context | Среднее: прямой API call |
| Лучшее применение | Основной кодовый референс | UX-паттерны и продуктовые сценарии | Компактный launcher/panel UX |

## Выбранный кодовый референс

Базовый сырой перенос нужно делать из ChatModule.

Что переносить первым:

- `packages/chat-ui` как основу `ui-react/chat` и `patterns/chat-assistant`.
- `packages/chat-domain` как источник контрактов сообщений, semantic blocks, attachments и assistant modes.
- `ChatPlaygroundPage` как референс wiring для будущего `chat-preview`.
- `useChatSession` и `useChatAttachments` не как финальный API дизайн-системы, а как рабочий референс orchestration/adapters.

Что добавлять из REVERIE после первичного переноса:

- `AssistantThread` как page-level assistant pattern.
- `AssistantEmptyState` как onboarding/first-run pattern.
- `ChatTaskPanel` как task/tool execution pattern.
- `ChatFeedbackCard` как feedback pattern.
- Suggested actions и primary/secondary actions в message bubble.
- Prototype floating launcher как UX-референс для compact/floating panel.

## Нужные режимы чатового интерфейса

- `playground shell`: полноэкранная конфигурируемая оболочка из ChatModule.
- `page-level chat`: страница ассистента как в REVERIE product-web.
- `compact floating panel`: компактное окно с launcher, UX-референс из REVERIE prototype-web.
- `resizable window`: готовой реализации не найдено; проектировать позже на базе panel layout из INV-08.
- `docked side panel`: будущий режим для редакторов, канваса и админок.
- `composer-only embedded`: composer как самостоятельный компонент для редакторов и панелей.
- `thread-only`: message list, typing, quick replies без shell.
- `onboarding empty state`: REVERIE-style onboarding перед первым сообщением.
- `task/tool execution`: task panel, tool status, action confirmation/result.
- `artifact/semantic blocks`: ChatModule semantic blocks внутри ответа.
- `image-generation/multimodal`: ChatModule image mode, image format selector, вложения.

## Backend и orchestration зависимости

### ChatModule

- `requestChatTurnStream` и streaming/SSE orchestration.
- `packages/chat-domain` типы сообщений, blocks, attachments, modes.
- Chat SDK/API service.
- OpenRouter/MCP/model policy logic.
- Conversation/session persistence.
- Voice input state.
- Appearance/configuration state.

### REVERIE

- BFF `requestAssistantTurn`.
- Conversation/session API и chat-query.
- Next router и route persistence `/app/chat/:id`.
- TanStack Query.
- Pending state между созданием conversation и переходом на route.
- `AssistantContext`, brand context, flowId.
- Backend modes: action clarification, action confirmation, action result, error, chat.
- Suggested actions и explicit tool call.
- Feedback API/hook.
- Voice input state.

Вывод: в дизайн-систему переносим UI-контракты, визуальные состояния и адаптерные интерфейсы. Прямые BFF/API/router/query зависимости не переносим в `ui-react` и `patterns`; они должны остаться в consumer-приложениях или будущих adapter packages.

## Целевая раскладка

### `packages/ui-react/chat`

- `ChatComposer`
- `ChatMessage`
- `ChatMarkdown`
- `ChatTypingIndicator`
- `ChatModelSelector`
- `ChatCommandPalette`
- `ChatAttachmentPreview`
- `ChatQuickReplies`
- `ChatFeedbackActions`

### `packages/patterns/chat-assistant`

- `ChatAssistantShell`
- `ChatAssistantThread`
- `ChatAssistantPanel`
- `ChatAssistantWindow`
- `ChatAssistantFullscreen`
- `ChatAssistantEmptyState`
- `ChatTaskPanel`
- `ChatFeedbackPanel`
- `ChatSettingsPanel`

### Возможный будущий `packages/chat-core`

- `ChatMessage`
- `ChatBlock`
- `ChatAttachment`
- `AssistantMode`
- `ChatAction`
- adapter contracts for streaming, persistence, voice, feedback.

## Storybook-сценарии

- `Chat Assistant / Playground Shell`
- `Chat Assistant / Fullscreen Thread`
- `Chat Assistant / Compact Floating Panel`
- `Chat Assistant / Resizable Window Placeholder`
- `Chat Assistant / Composer`
- `Chat Assistant / Composer With Attachments`
- `Chat Assistant / Voice Input`
- `Chat Assistant / Command Palette`
- `Chat Assistant / Model Selector`
- `Chat Assistant / Message Blocks`
- `Chat Assistant / Semantic Artifacts`
- `Chat Assistant / Typing And Streaming`
- `Chat Assistant / Onboarding Empty State`
- `Chat Assistant / Task Panel`
- `Chat Assistant / Feedback Card`
- `Chat Assistant / Suggested Actions`

## Mock-данные для Storybook и Playground

- Empty conversation.
- User/assistant message history.
- Streaming assistant response.
- Error response.
- Tool status block.
- Action confirmation/result block.
- Markdown answer with table/list/code.
- Image attachment.
- Document attachment.
- Gallery block.
- Suggested actions.
- Quick replies.
- Task panel with `done`, `running`, `pending`.
- Feedback states: none, liked, disliked, detailed score.
- Assistant modes and model options.
- Appearance variants.

## Figma

Нужен обязательный слепок выбранного референса после сырого переноса.

Первый слепок:

- ChatModule `ChatModuleShell` как базовая поверхность.
- REVERIE `AssistantThread` как page-level assistant reference.
- REVERIE prototype floating panel как компактный UX-референс.

После слепка дизайнер уточняет визуальные решения, затем реализация приводится к pixel-perfect состоянию уже по Figma.

## Предложенный порядок сырого импорта

1. Перенести ChatModule domain types и минимальные mock-data contracts.
2. Перенести ChatModule primitives: composer, model selector, command palette, rich text, typing, message item.
3. Перенести semantic block renderer как отдельный слой отображения assistant artifacts.
4. Перенести ChatModule shell в `patterns/chat-assistant`.
5. Добавить Storybook stories на shell, composer, messages, semantic blocks и attachments.
6. Добавить Playground `chat-preview` на mock/adapters без реального backend.
7. Отдельной задачей добавить REVERIE page-level `AssistantThread`, empty state, task panel, feedback card и suggested actions.
8. Отдельной задачей спроектировать resizable/docked chat на базе panel layout из INV-08.

## Критерии готовности INV-10

- Найден чатовый UI в ChatModule.
- Найден чатовый UI в REVERIE product-web.
- Отдельно отмечен prototype-web как compact panel reference.
- Составлена сравнительная таблица.
- Выбран лучший кодовый референс: ChatModule.
- Зафиксированы нужные режимы чата.
- Отмечены backend/orchestration зависимости.
- Предложены целевые зоны `packages/ui-react`, `packages/patterns` и возможный `chat-core`.
- Описаны Storybook-сценарии и mock-данные.

## Этап 3: сырой импорт вертикального набора

Статус: сырой vertical slice перенесен в монорепозиторий.

Добавлено:

- `packages/patterns/src/chat-assistant` — chat assistant raw kit;
- generic contracts для role, mode, message, attachment, semantic block, model option, task;
- `ChatAssistantShell` — fullscreen/page-level assistant shell;
- `ChatComposer` — composer с attachments, command/model placeholders;
- `ChatMessageItem` — message renderer с text, banner, card, table, tool-status и image placeholder blocks;
- `ChatAssistantCompactPanel` — compact floating panel preview по UX-референсу REVERIE prototype;
- `apps/storybook/src/stories/chat-assistant.stories.tsx` — Storybook-сценарий `Chat Assistant/Raw Import`.

Решение по переносу:

- ChatModule остается основным кодовым референсом;
- REVERIE используется как UX-референс для page-level assistant, onboarding, task panel, feedback и compact panel;
- streaming, SSE, persistence, voice input, feedback API, model policy, router и BFF orchestration не переносим в дизайн-системный UI.

Известный технический долг:

- markdown пока отображается как plain text;
- command palette, model selector, quick replies и feedback card представлены только как placeholders;
- resizable/docked mode не реализован, должен опираться на panel layout из `INV-08`;
- после Figma-слепка нужно разделить `ui-react/chat`, `patterns/chat-assistant` и возможный `chat-core`.
