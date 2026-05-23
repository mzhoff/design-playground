# INV-09: prodSQL — dashboard cards

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

## Цель

Найти минималистичные dashboard cards и подготовить их как data display patterns.

На этапе инвентаризации код не переносим. Фиксируем карточные паттерны, данные, состояния, reusable primitives и границу между универсальной data-display карточкой и SQL/project-доменом.

## Важное наблюдение

В `prodSQL` нет отдельной страницы `DashboardPage` с классическими метриками вроде revenue, conversion, active users. Карточная система находится в двух dashboard-like поверхностях:

- список проектов;
- страница проекта со списком документов.

Поэтому текущий материал нужно воспринимать как основу для `Data Display / Dashboard Cards`: preview card, document card, create tile, empty state, schema mini-preview, action menu, metadata row.

Метрики есть только в простом виде:

- количество tables в проекте;
- дата обновления;
- тип документа;
- document badge;
- количество/размер импортируемых файлов.

Для полноценной дизайн-системы нужно заложить metric slots, но не считать, что они уже реализованы.

## Найденные entry points

Страница списка проектов:

`src/pages/projects/ui/ProjectsPage.tsx`

Карточка проекта:

`src/pages/projects/ui/ProjectsPage.tsx` — `ProjectCard`

Create tile для нового проекта:

`src/pages/projects/ui/ProjectsPage.tsx` — inline button `New Project`

Empty state списка проектов:

`src/pages/projects/ui/ProjectsPage.tsx` — branch `projects.length === 0`

Search empty state:

`src/pages/projects/ui/ProjectsPage.tsx` — branch `filteredProjects.length === 0 && searchQuery`

Страница проекта со списком документов:

`src/pages/project/ui/ProjectHomePage.tsx`

Карточка документа:

`src/pages/project/ui/ProjectHomePage.tsx` — `DocumentCard`

Preview документа:

`src/pages/project/ui/ProjectHomePage.tsx` — `DocumentPreview`

Preview class diagram:

`src/pages/project/ui/ProjectHomePage.tsx` — `ClassDiagramPreview`

Import dropzone/card:

`src/pages/project/ui/ProjectHomePage.tsx` — `ImportDialog`

Empty state проекта без документов:

`src/pages/project/ui/ProjectHomePage.tsx` — branch `project.documents.length === 0`

Mini schema preview:

`src/pages/projects/ui/SchemaPreview.tsx`

Связанная card-like data display карточка для canvas:

`src/pages/workspace-layout/ui/WorkspaceClassEntityCard.tsx` — `ClassEntityCard`

Это не dashboard card, но полезный референс для data entity card.

## Перечень dashboard cards

### `ProjectCard`

Путь:

`src/pages/projects/ui/ProjectsPage.tsx`

Назначение:

Карточка проекта в общем dashboard проектов.

Данные:

- `project.name`.
- `project.description`.
- `project.snapshot`.
- `project.schema.tables`.
- `project.schema.relations`.
- `project.updatedAt`.

Derived metrics:

- `tableCount = project.schema.tables.length`.
- formatted updated date.

Props:

- `project`.
- `isEditing`.
- `editName`.
- `onOpen`.
- `onStartRename`.
- `onEditNameChange`.
- `onConfirmRename`.
- `onCancelRename`.
- `onDuplicate`.
- `onExport`.
- `onDelete`.

Состав:

- preview area.
- snapshot image или `SchemaPreview`.
- title.
- optional description.
- metadata row: tables count + date.
- action menu.
- inline rename mode.

Состояния:

- default.
- hover.
- editing.
- with snapshot.
- without snapshot.
- with description.
- without description.

Hover behavior:

- `hover:border-gray-300`.
- `hover:shadow-lg`.
- action menu появляется через `group-hover:opacity-100`.

Риски:

- карточка жестко знает `ProjectData`.
- table count завязан на SQL schema.
- action set завязан на project CRUD.

### `New Project` create tile

Путь:

`src/pages/projects/ui/ProjectsPage.tsx`

Назначение:

Action card для создания нового проекта.

Данные:

- статичный label `New Project`.

Props:

- фактически только `onClick` через inline handler.

Состав:

- dashed border.
- centered icon container.
- label.

Состояния:

- default.
- hover.

Hover behavior:

- `hover:border-indigo-400`.
- `hover:bg-indigo-50/50`.
- icon background меняется через `group-hover:bg-indigo-100`.
- icon/text color меняются через `group-hover:text-indigo-500` и `group-hover:text-indigo-600`.

Риски:

- inline implementation, нужно вынести как `CreateCard`.
- цвета зашиты.

### `Projects empty state`

Путь:

`src/pages/projects/ui/ProjectsPage.tsx`

Назначение:

Пустое состояние dashboard, когда нет проектов.

Данные:

- статичный title `No projects yet`.
- description.
- действия `Import File`, `Create First Project`.

Состав:

- large icon badge.
- title.
- body text.
- action buttons.

Состояния:

- empty.

Риски:

- это не card component, а inline layout.
- стоит сделать reusable `DashboardEmptyState`.

### `Search empty state`

Путь:

`src/pages/projects/ui/ProjectsPage.tsx`

Назначение:

Пустое состояние поиска.

Данные:

- `searchQuery`.
- count не показывается в самом empty state, но рядом в header есть filtered count.

Состав:

- search icon.
- message.
- clear search action.

Состояния:

- no results.

Риски:

- inline implementation.

### `DocumentCard`

Путь:

`src/pages/project/ui/ProjectHomePage.tsx`

Назначение:

Карточка документа внутри project dashboard.

Данные:

- `document.name`.
- `document.type`.
- `document.updatedAt`.
- `document.snapshot`.
- `document.erd.tables`.
- `document.erd.relations`.
- `document.classDiagram.classes`.

Derived data:

- `getDocumentTypeLabel(document.type)`.
- `getDocumentBadge(document.type)`.
- formatted updated date.

Props:

- `document`.
- `isEditing`.
- `editName`.
- `onOpen`.
- `onStartRename`.
- `onEditNameChange`.
- `onConfirmRename`.
- `onCancelRename`.
- `onDelete`.

Состав:

- fixed-height preview zone.
- preview frame.
- type badge.
- title.
- metadata row: document type + updated date.
- dropdown actions.
- inline rename mode.

Состояния:

- default.
- hover.
- editing.
- with snapshot.
- ERD preview.
- class diagram preview.
- generic file type preview.

Hover behavior:

- `hover:border-gray-300`.
- `hover:shadow-md`.
- dropdown trigger появляется через `group-hover:opacity-100`.

Риски:

- карточка жестко знает `ProjectDocument`.
- document type logic находится рядом с UI.
- удаление/rename зашиты в card-level actions.

### `DocumentPreview`

Путь:

`src/pages/project/ui/ProjectHomePage.tsx`

Назначение:

Preview slot для document card.

Данные:

- snapshot image.
- ERD tables/relations.
- class diagram classes.
- document type.

Логика:

- если есть `document.snapshot`, показывает image.
- для `erd` использует `SchemaPreview`.
- для `class-diagram` использует `ClassDiagramPreview`.
- для остальных типов показывает centered icon.

Риски:

- это хороший adapter candidate, но core card не должен знать ERD/class diagram.

### `ClassDiagramPreview`

Путь:

`src/pages/project/ui/ProjectHomePage.tsx`

Назначение:

SVG preview class diagram внутри document card.

Данные:

- `document.classDiagram.classes.slice(0, 4)`.
- `entity.color`.
- `entity.id`.

Состав:

- пустой state с icon, если classes нет.
- SVG 220x130.
- до 4 мини-карточек классов.
- простая relation line, если classes больше одной.

Риски:

- preview жестко class-diagram specific.
- нужен generic `PreviewRenderer` interface.

### `SchemaPreview`

Путь:

`src/pages/projects/ui/SchemaPreview.tsx`

Назначение:

Миниатюрный canvas preview для schema/project/document cards.

Props:

- `tables`.
- `relations`.
- `width`.
- `height`.

Данные:

- `table.position`.
- `table.fields.length`.
- `table.color`.
- `relation.fromTableId`.
- `relation.toTableId`.

Состав:

- empty schema state.
- SVG with dot grid.
- relation curves.
- mini table cards.

Состояния:

- empty schema.
- with tables.
- with relations.

Риски:

- завязан на SQL `Table` и `Relation`.
- сам визуальный принцип ценен, но типы нужно обобщить до `PreviewNode` и `PreviewEdge`.

### `Project files empty state`

Путь:

`src/pages/project/ui/ProjectHomePage.tsx`

Назначение:

Пустое состояние проекта без документов.

Данные:

- статичный текст.
- actions: Import, Class diagram, ERD.

Состав:

- center-aligned text.
- secondary hint.
- action group.

Риски:

- inline implementation.
- действия project/document-specific.

### `ImportDialog` dropzone card

Путь:

`src/pages/project/ui/ProjectHomePage.tsx`

Назначение:

Action surface для импорта файлов.

Props:

- `open`.
- `onOpenChange`.

Данные:

- local `files`.
- `file.name`.
- `file.size`.

Состав:

- dashed dropzone-like card.
- upload icon.
- title.
- description.
- CTA.
- file list rows.
- footer actions.

Hover behavior:

- `hover:bg-gray-50`.

Риски:

- не полноценный drag-and-drop dropzone, только click-to-upload.
- file accept types зашиты под SQL/project formats.

### `ClassEntityCard`

Путь:

`src/pages/workspace-layout/ui/WorkspaceClassEntityCard.tsx`

Назначение:

Не dashboard card, но важная data-display карточка для canvas и будущих structured cards.

Данные:

- `entity.name`.
- `entity.kind`.
- `entity.position`.
- `entity.attributes`.
- `entity.methods`.
- `entity.mappedTableId`.
- `accent`.
- selected/member selection.
- linked state machine data.

Состав:

- colored header.
- kind badge.
- sections attributes/methods.
- editable rows.
- type selector.
- reorder handle.
- selected row state.
- drag/drop reorder state.

Состояния:

- selected.
- unselected.
- selected member.
- editing row name.
- dragging row.
- drag target row.
- linked state machine.
- empty section.

Риски:

- это не dashboard surface.
- сильно связано с class diagram.
- но модель `EntityCard` полезна для Data Display и Canvas patterns.

## Layout карточек

Projects dashboard:

- `max-w-6xl`.
- grid: `grid-cols-1`, `sm:grid-cols-2`, `lg:grid-cols-3`.
- gap: `5`.
- create tile занимает обычную grid cell.

Project documents dashboard:

- full width main area.
- padding `px-9 py-6`.
- grid: `grid-cols-1`, `sm:grid-cols-2`, `xl:grid-cols-3`, `2xl:grid-cols-4`.
- gap: `6`.
- document card min height: `246px`.
- preview area height: `162px`.

Schema preview:

- project card: `width=280`, `height=140`.
- document card ERD preview: `width=260`, `height=150`.

## Общие элементы

Общие card primitives:

- card shell: rounded, border, white background, hover border, hover shadow.
- preview slot.
- image or generated SVG preview.
- title.
- subtitle/description.
- metadata row.
- badge.
- action menu.
- inline edit mode.
- create/action card.
- empty state.
- icon badge.

Общие data-display patterns:

- `title + meta`.
- `preview + badge`.
- `count + date`.
- `empty icon + text + actions`.
- `hover reveal actions`.
- `inline rename`.
- `generated preview when image is absent`.

## Hover / focus / accessibility

Что есть:

- hover shadow/border на cards.
- hover reveal action menu.
- keyboard handling в edit input: `Enter`, `Escape`.
- dropdown menu actions.
- clear search action.

Что слабое:

- `ProjectCard` и `DocumentCard` сделаны `div` с `onClick`, а не button/link.
- нет явного `tabIndex`.
- нет keyboard open behavior на самой карточке.
- create tile сделан button и доступнее.
- hover-only action menu может быть неудобен без pointer.

Для дизайн-системы:

- interactive card должен быть `button`, `a` или иметь корректный role + keyboard handlers.
- action menu должен быть доступен по focus-visible, не только по hover.
- card-level click и action menu должны иметь явное event separation.

## Базовая дизайн-системная модель карточки

Предлагаемый `DashboardCard`:

- `id`.
- `title`.
- `description?`.
- `eyebrow?`.
- `preview?`.
- `imageSrc?`.
- `badge?`.
- `meta?: Array<{ icon?, label, value? }>` .
- `metrics?: Array<{ label, value, delta?, tone? }>` .
- `actions?: Array<CardAction>`.
- `selected?`.
- `loading?`.
- `disabled?`.
- `empty?`.
- `href?`.
- `onClick?`.

Slots:

- `CardPreview`.
- `CardBadge`.
- `CardTitle`.
- `CardDescription`.
- `CardMeta`.
- `CardMetrics`.
- `CardActions`.
- `CardInlineEditor`.
- `CardFooter`.

Variants:

- `project`.
- `document`.
- `metric`.
- `summary`.
- `create`.
- `empty`.
- `entity`.
- `compact`.
- `wide`.

## Предлагаемая архитектура переноса

`packages/ui-react`:

- `Card`.
- `CardPreview`.
- `CardHeader`.
- `CardTitle`.
- `CardDescription`.
- `CardMeta`.
- `CardBadge`.
- `CardActions`.
- `EmptyState`.
- `CreateCard`.
- `MetricValue`.

`packages/patterns/dashboard-cards`:

- `DashboardCard`.
- `ProjectCardPattern`.
- `DocumentCardPattern`.
- `SummaryMetricCard`.
- `PreviewCardGrid`.
- `DashboardEmptyState`.
- `GeneratedPreviewFrame`.

Adapters:

- `SchemaPreviewAdapter` для ERD/schema.
- `ClassDiagramPreviewAdapter`.
- `ProjectCardAdapter`.
- `DocumentCardAdapter`.

Core не должен знать:

- `ProjectData`.
- `ProjectDocument`.
- SQL `Table`.
- SQL `Relation`.
- class diagram document.
- router navigation.
- import/export/delete project commands.

## Минимальный Storybook-сценарий

Storybook: `Data Display / Dashboard Cards`.

Stories:

- `ProjectCardWithSchemaPreview`.
- `ProjectCardWithSnapshot`.
- `ProjectCardEditing`.
- `ProjectCardWithActions`.
- `DocumentCardErd`.
- `DocumentCardClassDiagram`.
- `DocumentCardGenericFile`.
- `CreateCard`.
- `EmptyDashboardState`.
- `SearchEmptyState`.
- `SchemaPreviewEmpty`.
- `SchemaPreviewWithRelations`.
- `MetricCard`.
- `SummaryCard`.
- `CardGrid`.
- `HoverActions`.
- `KeyboardFocusableCard`.

Минимальные mock-data:

- 3 projects.
- 4 documents.
- 5 schema tables.
- 4 relations.
- 1 project with snapshot.
- 1 empty project.
- 1 class diagram with 4 classes.
- metrics: tables count, documents count, updated date, issues count.

## Что переносить в первую очередь

Переносить почти напрямую:

- визуальную структуру `ProjectCard`.
- визуальную структуру `DocumentCard`.
- create tile.
- empty states.
- `SchemaPreview` после обобщения типов.

Переносить после обобщения:

- action menu.
- inline rename.
- generated previews.
- metadata row.
- document type badge.

Оставить в consumer:

- navigation.
- project CRUD.
- document CRUD.
- import/export.
- SQL-specific schema calculation.
- React Query invalidation.
- toast side effects.

## Риски

- Текущие cards минималистичные и приятные, но пока не являются дизайн-системными компонентами.
- В них смешаны card UI, domain data, navigation и mutations.
- Нет полноценной metric-card реализации.
- Интерактивные cards на `div onClick` нужно исправить для accessibility.
- Preview generation завязан на SQL/class diagram types.
- Цветовая система захардкожена через Tailwind utility colors.
- Нет loading skeleton card.
- Нет selected/pinned visual state на самой project card.
- Нет density variants.
- Нет responsive compact variant для узких контейнеров внутри dashboard/widget layouts.

## Целевое место

Пакеты:

- `packages/ui-react`;
- `packages/patterns`.

Storybook:

- `Data Display / Dashboard Cards`.

Playground:

- `dashboard-preview`.

Figma:

- нужен слепок: `да`.

## Критерии готовности

- перечислены все dashboard cards: выполнено.
- указан путь к каждой карточке: выполнено.
- описаны props и данные: выполнено.
- выделены общие элементы: выполнено.
- предложена базовая дизайн-системная модель карточки: выполнено.
