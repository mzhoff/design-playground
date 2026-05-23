# INV-08: prodSQL — layout нижних и боковых панелей

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

## Цель

Найти систему нижних и боковых панелей как основу editor workspace layout.

На этапе инвентаризации код не переносим. Фиксируем layout, dock-зоны, панельные primitives, состояния resize/collapse и границу между reusable editor workspace и SQL-доменом.

## Найденные entry points

Основной layout страницы:

`src/pages/workspace-layout/ui/WorkspaceLayoutPage.tsx`

Верхняя панель и resize handle:

`src/pages/workspace-layout/ui/WorkspaceChrome.tsx`

State/layout orchestration:

`src/pages/workspace-layout/model/useWorkspaceLayout.ts`

Панельная state-машина:

`src/pages/workspace-layout/model/useWorkspacePanels.ts`

Resize нижней панели через header:

`src/pages/workspace-layout/model/workspace-panel-resize.ts`

Типы layout:

`src/pages/workspace-layout/model/types.ts`

Дефолтные layout preferences и нормализация сохраненного layout:

`src/pages/workspace-layout/model/workspace-layout-preferences.ts`

Универсальный shell одной панели:

`src/pages/workspace-layout/ui/WorkspacePane.tsx`

Content router для табов внутри панелей:

`src/pages/workspace-layout/ui/WorkspaceTabContent.tsx`

Tab header, search bar и draggable tabs:

`src/pages/workspace-layout/ui/WorkspacePaneHeaders.tsx`

Drag tabs между окнами:

`src/pages/workspace-layout/model/useWorkspaceTabDrag.ts`

Tab/window state:

`src/pages/workspace-layout/model/useWorkspaceTabs.ts`

Старый editor sidebar:

`src/pages/editor/ui/Sidebar.tsx`

Старый code panel:

`src/pages/editor/ui/CodeEditorPanel.tsx`

Старые property panels:

- `src/pages/editor/ui/TableDetailsPanel.tsx`
- `src/pages/editor/ui/JsonSchemaDetailsPanel.tsx`
- `src/pages/editor/ui/JsonSchemaExamplesPanel.tsx`
- `src/pages/editor/ui/properties/PostgresStructurePanel.tsx`
- `src/pages/editor/ui/properties/PropertiesSection.tsx`

## Схема layout

В `WorkspaceLayoutPage` используется `react-resizable-panels`.

Базовая структура:

- root `PanelGroup` с направлением `horizontal`.
- левая колонка: `left-column`.
- центральная колонка: `center-column`.
- правая колонка: `inspector`.

Левая колонка вложена во второй `PanelGroup` с направлением `vertical`:

- `project-pane`.
- `library-pane`.

Центральная колонка вложена в `PanelGroup` с направлением `vertical`:

- `canvas-pane`.
- нижняя зона `behavior` / bottom panel.

Правая колонка:

- inspector/properties panel.

Фактически это не произвольный docking, а fixed docking layout с пятью окнами:

- `project`.
- `library`.
- `canvas`.
- `behavior`.
- `inspector`.

Для дизайн-системы это хорошая основа `EditorWorkspaceShell`: фиксированные рабочие зоны, внутри которых можно менять вкладки и содержимое.

## Дефолтные размеры

Из `DEFAULT_PANEL_LAYOUTS`:

- root: `[18.7, 55.5, 25.8]`.
- left: `[47, 53]`.
- center: `[69.8, 30.2]`.

Из `DEFAULT_LAYOUT_VISIBILITY`:

- left: `true`.
- right: `true`.
- bottom: `true`.
- canvasMaximized: `false`.

Это можно использовать как стартовый preset для Storybook и Playground.

## Resize / collapse / open / close states

`useWorkspacePanels` управляет:

- видимостью `left`, `right`, `bottom`.
- состоянием `canvasMaximized`.
- сохраненными layout ratios.
- refs на root/left/center panel groups.
- refs на left/right/bottom panels.
- drag state resize.
- animation state `layoutAnimating`.

Сценарии:

- toggle left column.
- toggle right column.
- toggle bottom panel.
- maximize canvas: скрывает left, right, bottom.
- restore canvas: возвращает все три панели.
- collapse/expand через imperative handle `react-resizable-panels`.
- sync visibility после ручного resize.
- restore expected visibility соседних панелей после resize.

Размеры раскрытия:

- left: `13`.
- right: `18`.
- bottom: `19`.

Анимация:

- `PANEL_ANIMATION_MS = 260`.

Отдельная механика нижней панели:

`startWorkspaceBottomHeaderResize`

Поведение:

- работает только если bottom visible.
- запускается по pointer down на header, но игнорирует табы и buttons.
- меняет `centerGroup` layout по Y.
- min bottom size: `19`.
- max bottom size: `68`.

Вывод: resize/collapse слой почти готов для переноса как `ResizableWorkspaceLayout`, но его нужно отвязать от конкретных window ids и от project state.

## Docking и tabs

`WorkspacePane` задает общий shell окна:

- rounded panel container.
- optional project title header.
- tab header.
- search header mode.
- add-tab button.
- per-window action buttons.
- content slot.
- empty state.

`DraggableTab` поддерживает:

- active state.
- held state.
- dragging state.
- close button с delayed hover.
- context menu: duplicate, close.
- pointer drag.
- drop target через `data-tab-id` и `data-window-id`.

`useWorkspaceTabDrag` поддерживает:

- drag threshold `6px`.
- preview windows.
- relocation tab между окнами.
- drop на конкретный tab или в конец окна.
- suppression click после drag.

Ограничение:

- нет произвольного floating docking.
- нет создания новых колонок/рядов пользователем.
- docking slots фиксированы.

Для будущего видео-редактора этого достаточно на первый этап: панели стабильные, tabs можно таскать между предопределенными зонами.

## Варианты панелей

Основные workspace panes:

- `ProjectTreePane` — дерево проекта.
- `WorkspaceTablesPane` — каталог таблиц.
- `WorkspaceDomainsPane` — домены.
- `WorkspaceEntitiesPane` — entities/classes.
- `PropertiesPane` — inspector по текущему selection.
- `AiAssistantPane` — assistant panel.
- `CodeModePane` — code view.
- `EventsPane` — события.
- `SemanticList` — списки schemas/domains/entities.
- `GenericPane` — generic rows для неготовых вкладок.

Canvas tabs внутри `canvas`:

- ERD.
- class diagram.
- IDEF0.
- state machine.
- dependency graph / lifecycle / impact / process как будущие placeholder-типы.

Bottom/behavior zone:

- functions.
- events.
- scenario.
- trace.
- history.
- validation.
- permissions.
- aiAssistant.
- codeMode.
- apiContract.
- dataSamples.
- dslImport.

Right/inspector zone:

- properties.
- selected table/field/relation.
- enum.
- JSON schema.
- class entity.
- class relation.
- IDEF0 function/concept/arrow.
- state machine selection.
- generic object summary.

## Общие компоненты внутри панелей

Уже есть reusable primitives:

- `PanelHeader`.
- `PanelTabButton`.
- `PanelIconButton`.
- `PanelPillButton`.
- `ResizeHandle`.
- `TopApplicationBar`.
- `ProjectTitleHeader`.
- `PanelSearchBar`.
- `ProjectTreeFiltersPanel`.
- `DraggableTab`.
- `WorkspaceCatalogPaneHeader`.
- `WorkspaceCatalogGroupHeader`.
- `WorkspaceCatalogRow`.
- `WorkspaceCatalogEmptyState`.
- `PropertyField`.
- `PropertyTextArea`.
- `SelectField`.
- `TabButton`.
- `IconDangerButton`.
- `ObjectSummaryPane`.
- `PropertiesSection`.

Часть компонентов уже достаточно универсальна:

- header панели.
- tab button.
- icon button.
- catalog row.
- group header.
- empty state.
- property field.
- property textarea.
- select field.
- inspector summary.

Часть компонентов пока domain-specific:

- `WorkspaceTableCatalogRow`.
- `WorkspaceEntityCatalogRow`.
- `WorkspaceTablesPane`.
- `WorkspaceEntitiesPane`.
- `WorkspaceDomainsPane`.
- `TableDetailsPanel`.
- `JsonSchemaDetailsPanel`.
- `PostgresStructurePanel`.

## Карточки, поля и таблицы внутри панелей

Catalog/list patterns:

- строка каталога с icon, label, badge, left color border, drag handle, delete action, unlink action.
- group header с collapse и count.
- search внутри header.
- add action.
- sort mode.
- collapse all groups.
- empty state.
- selected row state.
- dragging row state.
- drop target state.

Inspector/property patterns:

- label + input.
- label + textarea.
- label + select.
- tabbed property shell.
- section collapse.
- danger action.
- object summary rows.
- editable title/description.
- карточка поля/attribute/method.
- карточка constraint/index.
- checklist внутри property card.
- nested JSON schema rows.
- usage/example cards.

Табличные/структурные элементы:

- tables catalog.
- entities catalog.
- domains catalog.
- project tree sections.
- fields editor.
- constraints editor.
- indexes editor.
- JSON schema fields tree.
- code editor status bar.

## Старый editor sidebar как сырье

`src/pages/editor/ui/Sidebar.tsx` важен как более насыщенный sidebar pattern.

Что есть:

- collapsed rail шириной `w-10`.
- tabs `tables/domains`.
- search.
- filters.
- group mode.
- sort mode.
- visible kinds.
- collapsed groups.
- multi-select через shift/meta.
- double click center-on-table.
- reorder tables/domains.
- domain assignment.
- add table / enum / JSON schema.
- footer с counts.
- confirm move dialog.

Этот sidebar нельзя переносить как финальный layout, но в нем много хорошего поведения для будущих catalog panels.

## Старый code panel как сырье

`src/pages/editor/ui/CodeEditorPanel.tsx` важен как code/editor panel.

Что есть:

- CodeMirror.
- tabs DSL, DBML, DDL, Mermaid ER.
- dark editor chrome.
- parser/linter/autocomplete per tab.
- status bar.
- error count.
- sync action.
- collapse panel action.

Для дизайн-системы это кандидат в `CodeWorkspacePanel` или `EditorCodePanel`, но DSL/DBML/DDL/Mermaid нужно вынести в adapters.

## Старые property panels как сырье

`TableDetailsPanel`:

- collapsed inspector rail.
- properties/checks tabs.
- multi-selection view.
- table name/description/domain.
- field list.
- field add/edit/delete.
- relation actions.
- enum table mode.
- revision/history mode.
- popover positioning.
- constraints/indexes через `PostgresStructurePanel`.

`JsonSchemaDetailsPanel`:

- schema metadata.
- fields tree.
- nested drag/drop.
- collapsed nodes.
- validation rules.
- refs.
- examples.

`PostgresStructurePanel`:

- constraints cards.
- indexes cards.
- field checklist.
- foreign key settings.
- expression textarea.

Вывод: для будущего `InspectorPanel` нужно взять shell и field/card patterns, но SQL-specific controls оставить в adapter.

## Внешние зависимости

Runtime/UI:

- `react`.
- `react-dom` через portal.
- `react-resizable-panels`.
- `lucide-react`.
- `@tanstack/react-query`.
- `sonner`.
- CodeMirror packages.

Internal shared UI:

- `IconButton`.
- `ContextMenu`.
- `ConfirmDialog`.
- `Button`.
- `Input`.
- `Select`.
- `Label`.
- `ProTooltip`.
- `GhostActionButton`.
- `cn`.

Browser/DOM:

- pointer events.
- drag events.
- `document.elementFromPoint`.
- `getBoundingClientRect`.
- `window.requestAnimationFrame`.
- `setTimeout`.
- `document.addEventListener`.
- `createPortal`.

Domain dependencies:

- `ProjectData`.
- schema tables/domains/relations/enums/json schemas.
- class diagram types.
- IDEF0 types.
- semantic object commands.
- semantic relation commands.
- project persistence.
- state machine API.
- SQL type compatibility.

## Что переносить в `packages/patterns`

Переносить почти напрямую:

- `WorkspaceChrome.ResizeHandle`.
- `PanelHeader`.
- `PanelTabButton`.
- `PanelIconButton`.
- `PanelPillButton`.
- `WorkspacePane` как shell, после переименования в `DockWindow`.
- `DraggableTab`, после отвязки от конкретных `WorkspaceWindowId`.
- `WorkspaceCatalogPaneHeader`.
- `WorkspaceCatalogGroupHeader`.
- `WorkspaceCatalogRow`.
- `WorkspaceCatalogEmptyState`.
- `PropertyField`.
- `PropertyTextArea`.
- `SelectField`.
- `ObjectSummaryPane`.
- `PropertiesSection`.

Переносить после обобщения:

- `useWorkspacePanels` как `useResizableDockLayout`.
- `useWorkspaceLayout` как composition hook.
- `useWorkspaceTabs`.
- `useWorkspaceTabDrag`.
- `startWorkspaceBottomHeaderResize`.
- `WorkspacePaneHeaders`.
- `WorkspaceTabContent` только как пример routing, не как core.

Переносить только как examples/adapters:

- `WorkspaceTablesPane`.
- `WorkspaceEntitiesPane`.
- `WorkspaceDomainsPane`.
- `PropertiesPane`.
- `TableDetailsPanel`.
- `JsonSchemaDetailsPanel`.
- `CodeEditorPanel`.
- `PostgresStructurePanel`.

## Что нельзя переносить напрямую

Нельзя тащить в reusable layout/patterns:

- `ProjectData`.
- `Table`, `Field`, `Relation`, `Domain`, `EnumType`, `JsonSchemaDocument`.
- `ClassEntity`, `Idef0Function`, `Idef0Concept`, `Idef0Arrow`.
- semantic API commands.
- save object metadata.
- React Query calls на state machines.
- SQL type compatibility.
- CodeMirror DSL/DBML/DDL/Mermaid parsers как обязательные зависимости.
- `toast` как часть core.
- конкретные тексты меню и доменные labels.
- project routes/auth/navigation.

Все это должно жить в consumer adapter или domain package.

## Схема универсализации для будущего видео-редактора

Предлагаемый package layer:

- `packages/patterns/editor-workspace`.
- `packages/patterns/dock-layout`.
- `packages/patterns/inspector`.
- `packages/patterns/catalog-panel`.
- `packages/patterns/code-panel`.

Базовые компоненты:

- `EditorWorkspaceShell`.
- `WorkspaceTopBar`.
- `ResizableDockLayout`.
- `DockArea`.
- `DockWindow`.
- `DockTabs`.
- `DockTab`.
- `DockResizeHandle`.
- `CatalogPanel`.
- `CatalogGroup`.
- `CatalogRow`.
- `InspectorPanel`.
- `InspectorSection`.
- `InspectorField`.
- `InspectorCard`.
- `BottomTimelinePanel`.
- `AssistantPanelSlot`.
- `CodePanelSlot`.

Для SQL adapter:

- project tree.
- tables.
- domains.
- entities.
- ERD/class/IDEF0/state machine tabs.
- SQL inspector.
- semantic persistence.

Для видео editor adapter:

- media library вместо tables/entities.
- tracks вместо domains/groups.
- timeline в bottom panel.
- preview/canvas в center.
- inspector для clip/track/effect.
- assistant/automation в behavior panel.
- code/script panel как optional tab.

Главная идея: layout и panel mechanics должны знать только про `windowId`, `tab`, `selection`, `visibility`, `layout ratios` и render slots. Все SQL/video сущности должны приходить через adapter render functions.

## Минимальный Storybook-сценарий

Storybook: `Layouts / Panels`.

Stories:

- `DefaultWorkspace` — left/project+library, center/canvas+bottom, right/inspector.
- `CollapsedLeft`.
- `CollapsedRight`.
- `CollapsedBottom`.
- `CanvasMaximized`.
- `ResizeHandles`.
- `BottomHeaderResize`.
- `TabsInPane`.
- `DragTabBetweenPanes`.
- `CatalogPanel`.
- `InspectorFields`.
- `InspectorCards`.
- `CodePanel`.
- `EmptyStates`.
- `VideoEditorPreset`.

Минимальные mock-data:

- 5 windows: project, library, canvas, behavior, inspector.
- tabs с generic type/title.
- 6 catalog groups.
- 20 catalog rows.
- selected item для inspector.
- 3 inspector sections.
- 5 property fields.
- bottom panel с mock timeline rows.

## Риски

- Текущий workspace layout уже ближе к продуктовой фиче, чем к дизайн-системному primitive.
- `WorkspacePane` принимает слишком много SQL/project props.
- `WorkspaceTabContent` смешивает tab routing и domain rendering.
- `PropertiesPane` сильно связан с project mutation и semantic persistence.
- `react-resizable-panels` стоит принять как runtime dependency или завернуть adapter-слоем.
- Для настоящего docking может понадобиться отдельная библиотека, но сейчас fixed docking дешевле и надежнее.
- Touch/mobile поведение не описано.
- Keyboard resize и accessibility для tab drag требуют отдельного проектирования.
- CodeMirror нельзя делать обязательной зависимостью базового layout package.
- В видео-редакторе bottom panel станет timeline, поэтому bottom zone должна быть generic и не называться behavior внутри core.

## Целевое место

Пакеты:

- `packages/patterns/editor-workspace`.
- `packages/patterns/dock-layout`.
- `packages/patterns/catalog-panel`.
- `packages/patterns/inspector`.
- возможный будущий `packages/interaction-core/layout`.

Storybook:

- `Layouts / Panels`.

Playground:

- `editor-workspace-preview`.

Figma:

- нужен слепок: `да`.

## Критерии готовности

- найден layout панелей: выполнено.
- перечислены варианты панелей: выполнено.
- описаны состояния resize/collapse/open/close: выполнено.
- указаны общие компоненты поля, карточки, таблицы: выполнено.
- предложена схема универсализации для будущего видео-редактора: выполнено.
