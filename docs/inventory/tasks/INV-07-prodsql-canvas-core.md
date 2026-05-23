# INV-07: prodSQL — canvas как переиспользуемый компонент

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

## Цель

Найти canvas и связанную с ним навигационную логику для будущего reusable canvas workspace.

На этапе инвентаризации код не переносим. Фиксируем entry points, reusable primitives, связи с панелями, SQL-specific слой и минимальный Storybook-сценарий.

## Найденные entry points

Основной SQL/ERD canvas:

`src/pages/editor/ui/Canvas.tsx`

Компонент карточки/ноды на canvas:

`src/pages/editor/ui/TableNode.tsx`

Toolbar старого editor canvas:

`src/pages/editor/ui/CanvasToolbar.tsx`

Workspace-обертка ERD canvas:

`src/pages/workspace-layout/ui/WorkspaceProjectCanvas.tsx`

State/model hook для workspace ERD:

`src/pages/workspace-layout/model/useWorkspaceErdCanvas.ts`

Новые workspace canvas-варианты:

- `src/pages/workspace-layout/ui/WorkspaceClassDiagramCanvas.tsx`
- `src/pages/workspace-layout/ui/WorkspaceIdef0Canvas.tsx`
- `src/pages/workspace-layout/ui/WorkspaceStateMachineCanvas.tsx`
- `src/pages/workspace-layout/ui/WorkspaceDiagramCanvases.tsx`
- `src/pages/workspace-layout/ui/WorkspaceFloatingCanvasToolbar.tsx`

Переиспользуемые canvas primitives:

- `src/shared/ui/useCanvasNavigation.ts`
- `src/shared/ui/useCanvasBoxSelection.ts`
- `src/shared/ui/canvas-navigation-ui.tsx`
- `src/pages/workspace-layout/model/useWorkspaceCanvasHistory.ts`
- `src/pages/workspace-layout/model/workspace-erd-canvas-utils.ts`

## Основной reusable слой

Самый ценный слой для переноса — не весь `Canvas.tsx`, а маленькие primitives:

- `useCanvasNavigation` — pan/zoom/viewport engine.
- `useCanvasBoxSelection` — rubber-band selection в world coordinates.
- `CanvasGridBackground` — dot-grid background, завязанный на pan/zoom.
- `CanvasZoomIndicator` — индикатор zoom.
- `useWorkspaceCanvasHistory` — универсальный undo/redo snapshot history.
- `workspace-erd-canvas-utils` — размеры ERD-ноды и helpers для bounds/height/clone.

Эти части уже почти отделены от SQL-домена и могут стать фундаментом `canvas-core`.

## Pan / zoom / viewport

`useCanvasNavigation` дает:

- `containerRef`.
- `pan`.
- `zoom`.
- `isPanning`.
- `panRef`.
- `zoomRef`.
- `setPan`.
- `setZoom`.
- `screenToWorld`.
- `centerOnBounds`.
- `zoomToBounds`.

Возможности:

- min zoom: `0.2`.
- max zoom: `3`.
- max fit zoom: `1.5`.
- zoom sensitivity: `0.001`.
- scroll pan speed: `1.5`.
- wheel pan по вертикали.
- shift-wheel или horizontal wheel pan по X.
- ctrl/cmd + wheel zoom в точку курсора.
- middle mouse / wheel button panning через pointer capture.
- resize preservation через `ResizeObserver`.
- варианты resize anchor: `center`, `document`, `none`.
- restore viewport через `restoreKey`.
- callback `onViewportChange`.

Это почти готовый `canvas-core/navigation` hook.

## Selection

`useCanvasBoxSelection` дает:

- `isSelecting`.
- `rectStyle`.
- `startSelection`.
- `cancelSelection`.

Модель:

- drag начинается с screen coordinates.
- mousemove обновляет screen rect.
- mouseup конвертирует screen rect в world rect через `screenToWorld`.
- наружу отдается `{ x, y, w, h }` в координатах canvas.

В `Canvas.tsx` selection используется для выбора таблиц:

- на mouse down по пустому canvas запускается box selection.
- если `shiftKey` не зажат, текущее выделение очищается.
- `Escape` отменяет selection и очищает contextual states.

В `WorkspaceClassDiagramCanvas` и `WorkspaceIdef0Canvas` тот же hook используется для выбора class/IDEF0 nodes. Это подтверждает, что hook уже универсален.

## Ноды / карточки / таблицы

Основная нода старого ERD canvas:

`src/pages/editor/ui/TableNode.tsx`

Что есть в карточке:

- header.
- fields rows.
- collapsed state.
- drag surface для перемещения карточки.
- field reorder через `useReorderableDragList`.
- relation handle.
- context actions.
- LOD-поведение через `lodLevel`.
- визуальные состояния: selected, multi-selected, focused/unfocused, drop target, drag source.

В `Canvas.tsx` таблицы рендерятся в transformed layer:

- общий layer двигается через `translate(pan.x, pan.y) scale(zoom)`.
- связи рисуются в SVG.
- карточки рендерятся поверх в HTML layer.
- каждая таблица получает `zoom`, handlers и визуальные flags.

Важно: `TableNode` пока очень сильно ERD-specific. Его нужно использовать как сырой визуальный референс, а не как готовый универсальный `CanvasNode`.

## Relations / edges

`Canvas.tsx` рисует связи через SVG:

- связи считаются по anchors полей/headers.
- есть curved/orthogonal/straight line modes через `lineType`.
- selected relation подсвечивается.
- relation highlight меняет opacity, если есть выделение.
- drag-to-connect рисует временную линию.
- endpoint markers показывают cardinality.
- `visibleRelations` фильтруются по viewport bounds.

Доменная часть:

- relation semantics завязана на `Relation`, `RelationType`, `Field`, `getTypeCompatibility`.
- создание связи может добавлять foreign key field.
- enum/json schema projection relations имеют id-префиксы `enumrel::` и `jsonrel::`.

Для дизайн-системы edge layer нужно отделить от SQL:

- core должен знать только nodes, ports, anchors, edges, selected state.
- ERD adapter должен знать про FK, PK, cardinality, SQL field compatibility.

## Culling / performance / LOD

В `Canvas.tsx` уже есть производительные механики:

- `CULLING_MARGIN = 400`.
- `CULLING_MIN_TABLES = 50`.
- `visibleTables`.
- `visibleRelations`.
- `dynamicWorldExtent`.
- `viewportRenderBounds`.
- `lodLevel`: `full`, `compact`, `minimal`.
- zoom indicator показывает процент и счетчик visible/total, если включился culling.

Это важный материал для будущего `canvas-core`, потому что большие SaaS/ERP/canvas-сценарии быстро упираются в производительность.

## Связи с панелями и shell

Старый editor canvas связан с панелями через props и refs:

- `viewportRef`.
- `centerOnTableRef`.
- `zoomToFitRef`.
- `onToggleMaximize`.
- `onOpenInCodeEditor`.
- `onAssignDomain`.
- `onPushHistory`.
- `onTableDragStop`.
- `onTablesDragStop`.

Toolbar:

- undo/redo.
- auto-layout.
- zoom to fit.
- toggle relation highlight.
- validation.
- schema diff.
- maximize/hide panels.
- copy schema.
- code mode.

Workspace-слой использует `WorkspaceFloatingCanvasToolbar`, который переиспользует `CanvasToolbar`, но скрывает code-mode button. Это хороший сигнал: toolbar стоит выносить отдельно как canvas workspace pattern, не зашивать внутрь canvas core.

## Workspace architecture

В `workspace-layout` уже есть более взрослая архитектура:

- `ProjectErDiagramCanvas` адаптирует generic `Canvas` под `ProjectData`.
- `useWorkspaceErdCanvas` держит состояние ERD canvas.
- `useWorkspaceCanvasHistory` дает generic undo/redo.
- `useWorkspaceErdPersistence` синхронизирует позиции и metadata с semantic view.
- `WorkspaceClassDiagramCanvas` и `WorkspaceIdef0Canvas` используют те же primitives `CanvasGridBackground`, `CanvasZoomIndicator`, `useCanvasBoxSelection`, `useCanvasNavigation`.

Вывод: будущий reusable canvas workspace должен идти не от старого монолитного `Canvas.tsx`, а от workspace-подхода:

- core primitives.
- generic canvas shell.
- domain adapters: ERD, class diagram, IDEF0, state machine.

## Внешние зависимости

React:

- `useState`.
- `useRef`.
- `useEffect`.
- `useCallback`.
- `useMemo`.

Browser/DOM:

- `ResizeObserver`.
- `getBoundingClientRect`.
- `wheel`.
- pointer events.
- mouse events.
- `setPointerCapture`.
- `releasePointerCapture`.
- `document.elementsFromPoint`.
- `window.addEventListener`.
- `navigator.clipboard`.
- CSS transform.
- SVG path rendering.

UI dependencies:

- `lucide-react`.
- `sonner`.
- shared `ConfirmDialog`.
- shared `ContextMenu`.
- shared `Button`.
- shared action-menu styles.
- `CanvasToolbar`.

Workspace/domain dependencies:

- `ProjectData`.
- `Table`.
- `Field`.
- `Relation`.
- `Domain`.
- `FieldType`.
- `LineType`.
- semantic object/relation commands.
- SQL type compatibility.
- enum/json schema projections.

## Что переносить в canvas-core

Переносить почти напрямую:

- `useCanvasNavigation`.
- `CanvasViewport`, `CanvasPoint`, `CanvasBounds`, `CanvasResizeAnchor`.
- `useCanvasBoxSelection`.
- `CanvasGridBackground`.
- `CanvasZoomIndicator`.
- `useWorkspaceCanvasHistory`, но переименовать в `useCanvasHistory`.

Переносить после обобщения:

- culling helpers из `Canvas.tsx`.
- LOD rules.
- `centerOnBounds` / `zoomToBounds` UI controls.
- generic relation/edge layer.
- generic context menu integration.
- generic clipboard selection shape.
- generic node drag/move lifecycle.

Переносить только как ERD adapter:

- `ProjectErDiagramCanvas`.
- `useWorkspaceErdCanvas`.
- `workspace-erd-canvas-utils`.
- `TableNode`.
- ERD relation rendering details.

## Что нельзя переносить в core напрямую

Нельзя тащить в `canvas-core`:

- `Table`, `Field`, `Relation`, `Domain` как обязательные core-типы.
- SQL `FieldType`.
- `getTypeCompatibility`.
- foreign key auto-creation.
- enum/json schema projection logic.
- semantic object API commands.
- `ProjectData`.
- `toast`.
- `sonner`.
- code mode.
- schema diff.
- schema validation.
- DDL/SQL terminology.
- конкретные тексты контекстного меню.
- `withSchema`, `withClassDiagram`, `withIdef0Diagram`.

Все это должно быть adapter/pattern layer.

## Предлагаемая архитектура

Будущий `canvas-core`:

- `useCanvasNavigation`.
- `useCanvasBoxSelection`.
- `useCanvasHistory`.
- `CanvasSurface`.
- `CanvasTransformLayer`.
- `CanvasGridBackground`.
- `CanvasZoomIndicator`.
- `CanvasSelectionRect`.
- `CanvasEdgeLayer`.
- `CanvasNodeLayer`.
- `CanvasViewportProvider`.
- `CanvasToolbarSlot`.

Будущий `packages/patterns/canvas-workspace`:

- `CanvasWorkspaceShell`.
- `CanvasFloatingToolbar`.
- `CanvasContextMenu`.
- `SelectableNodePattern`.
- `DraggableNodePattern`.
- `ConnectorDragPattern`.
- `CanvasMiniMap` позже, если понадобится.

Будущий ERD adapter:

- `ErdCanvas`.
- `ErdTableNode`.
- `ErdRelationEdge`.
- `ErdFieldPort`.
- `ErdCanvasAdapter`.

## Минимальный Storybook-сценарий

Storybook: `Canvas / Core`.

Stories:

- `EmptyCanvas` — grid, zoom indicator, pan/zoom.
- `TwoNodes` — две generic ноды на world coordinates.
- `PanAndZoom` — демонстрация wheel pan, ctrl/cmd wheel zoom, middle mouse pan.
- `ZoomToFit` — toolbar button вызывает `zoomToBounds`.
- `BoxSelection` — rubber-band selection выбирает несколько нод.
- `SelectedNode` — single selected state.
- `MultiSelectedNodes` — multi-selection state.
- `DraggableNode` — node drag с обновлением position.
- `Edges` — generic edge между двумя нодами.
- `EdgeSelected` — selected edge state.
- `ConnectorDraft` — временная линия drag-to-connect.
- `CullingManyNodes` — 100+ nodes, visible count, LOD.
- `DarkCanvas` — dark theme grid/zoom indicator.

Минимальные mock-data:

- 3 generic nodes: id, title, position, size.
- 2 generic edges: sourceNodeId, targetNodeId, sourcePortId, targetPortId.
- без SQL fields, PK, FK, domains.

## Риски

- `Canvas.tsx` слишком монолитный и содержит UI, SQL domain, context menus, relation semantics и delete/convert flows в одном компоненте.
- `TableNode` не является универсальной нодой, это ERD table card.
- pan/zoom работает хорошо, но часть UX завязана на middle mouse и desktop wheel.
- touch/mobile canvas пока не описан.
- keyboard accessibility для canvas navigation/selection требует отдельного проектирования.
- `navigator.clipboard` недоступен в некоторых контекстах без permissions.
- `ResizeObserver` и window events требуют SSR-safe использования в Next.
- relation/edge layer сильно связан с SQL cardinality.
- semantic persistence не должен попадать в core.
- culling и LOD нужно сохранить, но перепроверить на generic node sizes.

## Целевое место

Пакеты:

- `packages/canvas-core` или `packages/interaction-core/canvas`;
- `packages/patterns/canvas-workspace`;
- `packages/patterns/erd-canvas`;
- `packages/ui-react` только для визуальных primitives: toolbar, node shell, edge controls, zoom badge.

Storybook:

- `Canvas / Core`.

Playground:

- `canvas-preview`.

Figma:

- нужен слепок: `да`.

## Критерии готовности

- найден entry point canvas: выполнено.
- перечислены связанные компоненты: выполнено.
- описаны внешние зависимости: выполнено.
- отделена визуальная часть от SQL-домена: выполнено.
- предложен минимальный Storybook-сценарий: выполнено.

## Этап 3: сырой импорт вертикального набора

Статус: сырой vertical slice перенесен в монорепозиторий.

Добавлено:

- `packages/patterns/src/canvas-workspace` — сырой canvas workspace kit;
- `useCanvasNavigation` — pan/zoom, wheel pan, ctrl/cmd wheel zoom, middle mouse pan;
- `useCanvasBoxSelection` — rubber-band selection в world coordinates;
- `CanvasGridBackground` и `CanvasZoomIndicator`;
- `CanvasWorkspacePreview` — generic nodes/edges preview без SQL-домена;
- `apps/storybook/src/stories/canvas-workspace.stories.tsx` — Storybook-сценарий `Canvas/Core/Raw Import`.

Решение по переносу:

- переносим primitives и поведение canvas близко к prodSQL;
- не переносим SQL domain, semantic persistence, FK/PK, schema diff, validation и code mode;
- ERD/table-node слой остается будущим adapter/pattern, а не core API.

Известный технический долг:

- node drag пока живет только внутри preview и не связан с history;
- edge layer демонстрационный, без ports, handles, relation cardinality и drag-to-connect;
- culling, LOD и minimap не перенесены;
- keyboard/touch accessibility требует отдельного проектирования;
- после Figma-слепка нужно разделить слой на `canvas-core`, `canvas-workspace` и domain adapters.
