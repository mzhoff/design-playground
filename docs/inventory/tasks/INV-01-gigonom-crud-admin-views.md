# INV-01: Gigonom 2026 — CRUD views админки

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

## Цель

Найти и описать CRUD views админки, чтобы позже перенести их как вертикальный admin kit.

На этом шаге код не переносим. Фиксируем карту исходников, границы будущих пакетов, риски и порядок сырого импорта.

## Что ищем

- Kanban view;
- list view;
- card view;
- calendar view;
- место под будущий timeline;
- фильтры;
- тулбары;
- статусы;
- empty states;
- общие компоненты внутри CRUD views.

## Целевое место

Пакеты:

- `packages/patterns`;
- `packages/ui-react`.

Storybook:

- `Admin / CRUD`.

Playground:

- `admin-crud-preview`.

Figma:

- нужен слепок: `да`.

## Критерии готовности

- перечислены все найденные CRUD views;
- указан путь к каждому view;
- описаны общие компоненты;
- выделены кандидаты в primitives;
- описаны mock-данные;
- предложен порядок сырого импорта.

## Краткий вывод

В Gigonom 2026 найден один основной универсальный CRUD-контур для CMS-ресурсов и один отдельный CRUD-контур для пользователей.

Основной CMS CRUD уже собран близко к Feature-Sliced Design:

- `apps/admin/src/app/(dashboard)/*` — тонкие Next.js route pages;
- `apps/admin/src/page-slices/admin-resource` — list/card/kanban/calendar views;
- `apps/admin/src/features/admin-resource-form` — create/edit формы;
- `apps/admin/src/entities/admin-resource` — конфиги ресурсов;
- `apps/admin/src/shared` — API, UI-примитивы, relation select, date/time controls.

Это хороший кандидат на перенос в дизайн-систему как вертикальный `Admin / CRUD` pattern: сначала переносим крупные view и контракты, затем вынимаем primitives.

## Найденные CRUD views

### Универсальный CMS Resource CRUD

Базовые view:

- List view: `apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`, компонент `ResourceTable`;
- Cards view: `apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`, компонент `ResourceCardList`;
- Kanban view: `apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`, компонент `BlogPostKanbanBoard`;
- Calendar view: `apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`, компонент `BlogPostCalendarBoard`;
- Create/edit form view: `apps/admin/src/features/admin-resource-form/ui/admin-resource-form.component.tsx`;
- Form body: `apps/admin/src/features/admin-resource-form/ui/admin-resource-form-body.component.tsx`;
- Field renderer: `apps/admin/src/features/admin-resource-form/ui/field-control.component.tsx`.

Точка входа list view:

- `apps/admin/src/page-slices/admin-resource/ui/admin-resource-list-page.component.tsx`.

Точка входа form view:

- `apps/admin/src/features/admin-resource-form/ui/admin-resource-form-page.component.tsx`.

Конфиги ресурсов:

- `apps/admin/src/entities/admin-resource/model/resources.ts`;
- `packages/blog-admin-adapter/src/index.ts`.

Контракт ресурса:

- `apps/admin/src/shared/api/admin-resource.types.ts`.

### Users CRUD

Отдельный CRUD-контур пользователей не использует `AdminResourceListPage`.

Source paths:

- `apps/admin/src/app/(dashboard)/users/page.tsx`;
- `apps/admin/src/app/(dashboard)/users/create/page.tsx`;
- `apps/admin/src/app/(dashboard)/users/[id]/edit/page.tsx`;
- `apps/admin/src/page-slices/users/ui/users-page.component.tsx`.

Найденные views:

- Users list: `UsersPage`;
- User create form: `UserCreatePage` + `UserForm`;
- User edit form: `UserEditPage` + `UserForm`;
- Role selector: `RoleMultiSelect`.

Особенность: этот CRUD жестко завязан на `authClient.admin` из Better Auth. В дизайн-систему нельзя переносить прямой вызов auth-клиента, нужен контракт `UserAdminDataSource`.

## Найденные маршруты CMS CRUD

| Ресурс | List route | Create route | Edit route | Базовый view |
| --- | --- | --- | --- | --- |
| `leads` | `apps/admin/src/app/(dashboard)/leads/page.tsx` | не найден | `apps/admin/src/app/(dashboard)/leads/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `newsletter-subscriptions` | `apps/admin/src/app/(dashboard)/newsletter-subscriptions/page.tsx` | `apps/admin/src/app/(dashboard)/newsletter-subscriptions/create/page.tsx` | `apps/admin/src/app/(dashboard)/newsletter-subscriptions/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `client-portal-waitlist` | `apps/admin/src/app/(dashboard)/client-portal-waitlist/page.tsx` | `apps/admin/src/app/(dashboard)/client-portal-waitlist/create/page.tsx` | `apps/admin/src/app/(dashboard)/client-portal-waitlist/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `blog-tags` | `apps/admin/src/app/(dashboard)/blog-tags/page.tsx` | `apps/admin/src/app/(dashboard)/blog-tags/create/page.tsx` | `apps/admin/src/app/(dashboard)/blog-tags/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `blog-posts` | `apps/admin/src/app/(dashboard)/blog-posts/page.tsx` | `apps/admin/src/app/(dashboard)/blog-posts/create/page.tsx` | `apps/admin/src/app/(dashboard)/blog-posts/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `blog-post-annotations` | `apps/admin/src/app/(dashboard)/blog-post-annotations/page.tsx` | `apps/admin/src/app/(dashboard)/blog-post-annotations/create/page.tsx` | `apps/admin/src/app/(dashboard)/blog-post-annotations/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `faq-tags` | `apps/admin/src/app/(dashboard)/faq-tags/page.tsx` | `apps/admin/src/app/(dashboard)/faq-tags/create/page.tsx` | `apps/admin/src/app/(dashboard)/faq-tags/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `faq-questions` | `apps/admin/src/app/(dashboard)/faq-questions/page.tsx` | `apps/admin/src/app/(dashboard)/faq-questions/create/page.tsx` | `apps/admin/src/app/(dashboard)/faq-questions/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `pages` | `apps/admin/src/app/(dashboard)/pages/page.tsx` | `apps/admin/src/app/(dashboard)/pages/create/page.tsx` | `apps/admin/src/app/(dashboard)/pages/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `documents` | `apps/admin/src/app/(dashboard)/documents/page.tsx` | `apps/admin/src/app/(dashboard)/documents/create/page.tsx` | `apps/admin/src/app/(dashboard)/documents/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `portfolio-tags` | `apps/admin/src/app/(dashboard)/portfolio-tags/page.tsx` | `apps/admin/src/app/(dashboard)/portfolio-tags/create/page.tsx` | `apps/admin/src/app/(dashboard)/portfolio-tags/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `service-tags` | `apps/admin/src/app/(dashboard)/service-tags/page.tsx` | `apps/admin/src/app/(dashboard)/service-tags/create/page.tsx` | `apps/admin/src/app/(dashboard)/service-tags/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `services` | `apps/admin/src/app/(dashboard)/services/page.tsx` | `apps/admin/src/app/(dashboard)/services/create/page.tsx` | `apps/admin/src/app/(dashboard)/services/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `portfolio-spheres` | `apps/admin/src/app/(dashboard)/portfolio-spheres/page.tsx` | `apps/admin/src/app/(dashboard)/portfolio-spheres/create/page.tsx` | `apps/admin/src/app/(dashboard)/portfolio-spheres/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `technologies` | `apps/admin/src/app/(dashboard)/technologies/page.tsx` | `apps/admin/src/app/(dashboard)/technologies/create/page.tsx` | `apps/admin/src/app/(dashboard)/technologies/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `team-competencies` | `apps/admin/src/app/(dashboard)/team-competencies/page.tsx` | `apps/admin/src/app/(dashboard)/team-competencies/create/page.tsx` | `apps/admin/src/app/(dashboard)/team-competencies/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `team-members` | `apps/admin/src/app/(dashboard)/team-members/page.tsx` | `apps/admin/src/app/(dashboard)/team-members/create/page.tsx` | `apps/admin/src/app/(dashboard)/team-members/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |
| `portfolio-cases` | `apps/admin/src/app/(dashboard)/portfolio-cases/page.tsx` | `apps/admin/src/app/(dashboard)/portfolio-cases/create/page.tsx` | `apps/admin/src/app/(dashboard)/portfolio-cases/[id]/edit/page.tsx` | `AdminResourceListPage`, `AdminResourceFormPage` |

Отдельно найден ресурс `blog-authors` в `packages/blog-admin-adapter/src/index.ts`, но route page и пункт навигации для него в текущей админке не найдены. Его нужно отметить как конфиг-кандидат без подключенного view.

## Какие view modes реально реализованы

### `list`

Источник:

`apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`

Компоненты:

- `ResourceTable`;
- `ListStateMessage`;
- `formatResourceCellValue`;
- `getBlogStatusPresentation`.

Используется для всех CMS-ресурсов по умолчанию.

Состояния:

- loading;
- error;
- empty;
- search empty;
- rows with actions.

### `cards`

Источник:

`apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`

Компоненты:

- `ResourceCardList`;
- `getCardTitle`;
- `getCardCaption`;
- `getCardPrimaryBadge`;
- `getCardMeta`;
- `getCardImageUrl`.

Поддерживается для ресурсов:

- `blog-posts`;
- `portfolio-cases`;
- `services`;
- `pages`;
- `documents`;
- `team-members`.

Риск: сейчас список ресурсов для card view захардкожен в `cardViewResourceSlugs`. В дизайн-системе это должно стать свойством resource config, например `views: ["list", "cards"]`.

### `kanban`

Источник:

`apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`

Компонент:

- `BlogPostKanbanBoard`.

Поддерживается только для `blog-posts`.

Статусы колонок:

- `draft`;
- `in_review`;
- `scheduled`;
- `published`;
- `archived`.

Поведение:

- drag-and-drop карточки между статусами;
- архив скрыт по умолчанию;
- счетчики по колонкам;
- empty state внутри пустой колонки;
- сохранение статуса через `updateAdminResourceItem`.

Риск: Kanban сейчас редакционный и завязан на статьи блога. Для дизайн-системы нужно разделить `KanbanBoard` как универсальный pattern и `BlogPostKanbanPreset` как предметный пресет.

### `calendar`

Источник:

`apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`

Компонент:

- `BlogPostCalendarBoard`.

Поддерживается только для `blog-posts`.

Поведение:

- месячная сетка;
- переключение месяца;
- группировка по `scheduledFor`;
- подсветка текущего дня;
- приглушение прошедших дней;
- превью до двух карточек в ячейке;
- переход в edit view по клику на карточку.

Риск: календарь сейчас завязан на поле `scheduledFor` и блоговые карточки. Для дизайн-системы нужен контракт `dateField`, `titleField`, `previewField`, `onItemOpen`.

### `timeline`

В коде не найден.

Место расширения уже очевидно:

- тип `ListViewMode` в `admin-resource-list.component.tsx`;
- `ListViewSwitcher`;
- проверка `isViewModeSupported`;
- branch rendering рядом с `showCards`, `showKanban`, `showCalendar`.

Рекомендуемое решение для будущего переноса: сразу проектировать `AdminResourceViewMode = "list" | "cards" | "kanban" | "calendar" | "timeline"`, но в Storybook помечать timeline как placeholder/spec, пока нет реализации.

## Фильтры, тулбары, действия

### Фильтры

Сейчас найден только легкий client-side search:

- компонент `ResourceSearch`;
- фильтрация через `filterResourceItems`;
- применяется только если ресурс поддерживает card view.

Advanced filters, saved filters, server-side filters и faceted filters не найдены.

### Toolbar list view

Источник:

`apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`

Состав:

- title;
- total label;
- search;
- view switcher;
- `Добавить`;
- refresh присутствует в импортах как icon `RefreshCw`, но отдельное действие refresh в найденном view не выделено как самостоятельная кнопка.

### Row/card actions

Действия:

- open edit;
- delete;
- preview lead;
- sync lead to CRM.

Особый сценарий:

- `LeadDrawer` открывает детали лида в `Sheet` и умеет запускать CRM sync.

Риск: `LeadDrawer` содержит бизнес-логику лида и CRM. В дизайн-систему переносить как `RecordDetailsDrawer` или `LeadDetailsPattern`, а конкретный sync оставить в adapter/callback.

### Form toolbar

Источник:

`apps/admin/src/features/admin-resource-form/ui/admin-resource-form.component.tsx`

Поведение:

- заголовок формы через `useAdminShellHeader`;
- actions `Отменить` и `Сохранить`;
- disabled save без изменений;
- подтверждение выхода при несохраненных изменениях;
- отдельный текст подтверждения при генерации изображения.

## Общие компоненты, повторяющиеся между view

Кандидаты в `packages/patterns`:

- `AdminResourceList`;
- `ResourceTable`;
- `ResourceCardList`;
- `BlogPostKanbanBoard` после обобщения до `ResourceKanbanBoard`;
- `BlogPostCalendarBoard` после обобщения до `ResourceCalendarBoard`;
- `AdminResourceForm`;
- `AdminResourceFormBody`;
- `FieldControl`;
- `LeadDrawer` после обобщения до details drawer pattern;
- `UsersPage` после обобщения до access/users management pattern.

Кандидаты в `packages/ui-react`:

- `Button`;
- `Input`;
- `textarea` как отдельный `Textarea`;
- `Sheet`;
- `RelationSelect`;
- `StickyTabs`;
- `TimeSlider`;
- `DateTimePickerField`;
- `ResourceSearch` как search control;
- `ListViewSwitcher` как segmented icon switcher;
- `StatusSwitchField`;
- `ListStateMessage` как empty/loading/error state;
- role option card из `RoleMultiSelect`;
- status badge/pill;
- table shell;
- card shell;
- calendar grid primitives;
- kanban column/card primitives.

## Кандидаты в primitives

При переносе вниз, к атомам и примитивам, выделять в таком порядке:

- `Button`, `Input`, `Textarea`, `Sheet`, `Popover`, `DropdownMenu`, `Separator`, `Skeleton`, `Tooltip`;
- `SegmentedControl` на базе `ListViewSwitcher` и `StatusSwitchField`;
- `SearchPill` на базе `ResourceSearch`;
- `StateMessage` на базе `ListStateMessage`;
- `StatusBadge` на базе `getBlogStatusPresentation` и user status pill;
- `DataTable` на базе `ResourceTable`;
- `EntityCard` на базе карточек `ResourceCardList`;
- `KanbanBoard`, `KanbanColumn`, `KanbanCard`;
- `CalendarMonthGrid`, `CalendarDayCell`, `CalendarEventCard`;
- `FormField`, `FormSection`, `FormTabs`;
- `RelationSelect`;
- `DateTimePicker`;
- `TimeSlider`;
- `RoleMultiSelect`.

## Данные, которые нужно замокать для Storybook

Минимальный набор mock data:

- `AdminResource` configs для `blog-posts`, `portfolio-cases`, `services`, `pages`, `documents`, `team-members`, `leads`, `users`;
- generic CMS rows с полями `id`, `title`, `slug`, `status`, `caption`, `previewId`, `createdAt`, `updatedAt`;
- blog post rows с `id`, `title`, `slug`, `status`, `scheduledFor`, `rubrics`, `readingTime`, `preview`;
- kanban status groups `draft`, `in_review`, `scheduled`, `published`, `archived`;
- calendar sample с несколькими публикациями в один день и пустыми днями;
- lead rows с `contactName`, `requestType`, `budgetRange`, `urgency`, `contactPhone`, `contactEmail`, `crmStatus`, `comment`;
- user rows с `id`, `name`, `email`, `role`, `banned`, `createdAt`;
- relation options для рубрик, авторов, команды, FAQ, тегов, технологий;
- media assets для карточек и upload полей;
- состояния loading, error, empty, search empty;
- mock callbacks `onCreate`, `onUpdate`, `onDelete`, `onStatusChange`, `onOpen`, `onSync`.

Для визуальных тестов даты должны быть стабильными, например фиксировать `today` в story args.

## Рекомендуемый порядок сырого импорта

1. Вынести контракты `AdminResource`, `AdminField`, `AdminRelationField`, `AdminResourceFormTab`, `ListViewMode` в будущую зону `packages/patterns` или отдельный contracts-файл внутри admin CRUD pattern.
2. Перенести базовые shared UI controls, которые нужны CRUD view: `Button`, `Input`, `Sheet`, `RelationSelect`, `StickyTabs`, `TimeSlider`.
3. Перенести `AdminResourceListPage` и `AdminResourceList` без подключения реального API, заменив `listAdminResource`, `deleteAdminResourceItem`, `updateAdminResourceItem` на callbacks/data source.
4. Перенести `ResourceTable`, `ResourceCardList`, `ResourceSearch`, `ListViewSwitcher`, `ListStateMessage`.
5. Перенести блоговые workflow views: сначала как сырой `BlogPostKanbanBoard` и `BlogPostCalendarBoard`, затем обобщить до `ResourceKanbanBoard` и `ResourceCalendarBoard`.
6. Перенести form stack: `AdminResourceForm`, `AdminResourceFormBody`, `FieldControl`, `DateTimePickerField`.
7. Отдельно перенести users CRUD как `AdminUsersPattern`, убрав прямую зависимость от `authClient.admin`.
8. Подготовить Storybook stories в разделе `Admin / CRUD`: `List`, `Cards`, `Kanban`, `Calendar`, `Create form`, `Edit form`, `Users`.
9. Подготовить Playground preview `admin-crud-preview` с переключателем resource/view mode.
10. После сырого переноса сделать обязательный Figma-слепок и только потом начинать дизайнерскую стандартизацию.

## Риски и решения

| Риск | Что найдено | Как резать при переносе |
| --- | --- | --- |
| Сильная связка с CMS REST | `listAdminResource`, `createAdminResourceItem`, `updateAdminResourceItem`, `deleteAdminResourceItem` вызываются прямо из UI | Ввести `CrudDataSource` и callbacks, реальные REST-вызовы оставить в consumer app |
| Хардкод доступных view modes | `cardViewResourceSlugs`, `blogWorkflowViewResourceSlug` | Перенести в resource config: `views`, `defaultView`, `workflow` |
| Блоговый Kanban не универсален | статусы и тексты колонок захардкожены | Разделить universal `KanbanBoard` и blog preset |
| Calendar завязан на `scheduledFor` | дата публикации читается напрямую | Ввести `dateField` или mapper `getItemDate` |
| Users CRUD завязан на Better Auth | прямые вызовы `authClient.admin` | Сделать adapter/contract для user management |
| Lead drawer содержит CRM sync | прямой POST в `/api/cms/v1/leads/:id/sync` | Оставить в pattern только drawer и action slot/callback |
| Form fields смешивают UI и app AI/media логику | caption generation, image generation, editor config | Разнести `FieldControl` на чистые controls и app-specific slots/adapters |
| Timeline отсутствует | view mode не реализован | Зафиксировать placeholder в контракте, реализацию делать отдельной задачей |

## Целевая раскладка после переноса

В `packages/patterns`:

- `admin-crud/contracts`;
- `admin-crud/list`;
- `admin-crud/cards`;
- `admin-crud/kanban`;
- `admin-crud/calendar`;
- `admin-crud/form`;
- `admin-crud/users`;
- `admin-crud/mock-data`.

В `packages/ui-react`:

- `button`;
- `input`;
- `textarea`;
- `sheet`;
- `segmented-control`;
- `search-control`;
- `state-message`;
- `status-badge`;
- `data-table`;
- `entity-card`;
- `relation-select`;
- `date-time-picker`;
- `time-slider`;
- `sticky-tabs`.

Storybook:

- `Admin / CRUD / Resource list`;
- `Admin / CRUD / Resource cards`;
- `Admin / CRUD / Blog workflow kanban`;
- `Admin / CRUD / Blog publication calendar`;
- `Admin / CRUD / Resource form`;
- `Admin / CRUD / Users management`;
- `Admin / CRUD / States`.

Playground:

- `admin-crud-preview`;
- выбор ресурса;
- выбор view mode;
- включение loading/error/empty states;
- переключение плотности, радиусов и базовых токенов после появления token layer.

## Этап 3: сырой импорт вертикального набора

Статус: сырой импорт выполнен для первого визуального среза `Admin / CRUD`.

Что добавлено:

- `packages/patterns/src/admin-crud/contracts.ts` — временные контракты ресурса, item, view modes и статусов;
- `packages/patterns/src/admin-crud/mock-data.ts` — стабильные mock-данные для Storybook;
- `packages/patterns/src/admin-crud/admin-crud-preview.tsx` — preview-компонент с list, cards, kanban и calendar modes;
- `packages/patterns/src/admin-crud/README.md` — происхождение, ограничения и явные долги;
- `apps/storybook/src/stories/admin-crud.stories.tsx` — истории `Admin / CRUD / Raw Import`.

Что сохранено близко к исходнику:

- режимы `list`, `cards`, `kanban`, `calendar`;
- поиск по ресурсу;
- archive toggle;
- статусный workflow `draft`, `in_review`, `scheduled`, `published`, `archived`;
- drag-and-drop карточек между колонками Kanban;
- календарное отображение по `scheduledFor`.

Что намеренно изолировано:

- Next.js routing;
- REST data fetching;
- delete/update API;
- localStorage view mode persistence;
- lead CRM drawer;
- create/edit forms;
- users CRUD.

Технический долг:

- inline-стили временные и нужны только для быстрого визуального осмотра;
- API компонента не считается финальным;
- timeline оставлен в контракте как будущий режим, но пока не рендерится;
- `AdminCrudPreview` пока объединяет shell и view implementations в одном файле;
- перед стандартизацией нужен Figma-слепок и сравнение с исходной админкой Gigonom 2026.
