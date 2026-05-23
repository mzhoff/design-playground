# INV-06: prodSQL — drag-and-drop hook

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

## Цель

Найти отточенный drag-and-drop hook и понять, как использовать его для reorder-поведения в дизайн-системе.

На этапе инвентаризации код не переносим. Фиксируем ядро hook, связанные адаптеры, границы переносимого logic-layer и prodSQL-specific state, а также smoke-сценарии для будущего тестирования.

## Найденные entry points

Основной переносимый hook:

`src/shared/ui/useReorderableDragList.ts`

Re-export для editor UI:

`src/pages/editor/ui/hooks/useReorderableDragList.ts`

Sidebar-адаптеры поверх hook:

- `src/pages/editor/ui/sidebar/useTableReorderDnD.ts`
- `src/pages/editor/ui/sidebar/useDomainDnD.ts`
- `src/pages/editor/ui/sidebar/useSidebarDnDController.ts`

Sidebar UI, где видны drop zones и visual states:

- `src/pages/editor/ui/sidebar/GroupHeaderRow.tsx`
- `src/pages/editor/ui/sidebar/TableRow.tsx`
- `src/pages/editor/ui/sidebar/ConfirmTableMoveDialog.tsx`

Canvas/table-node usage:

- `src/pages/editor/ui/TableNode.tsx`

Store/actions, куда коммитится reorder:

- `src/pages/editor/model/useSchemaStore.ts`
- `src/pages/editor/ui/EditorPage.tsx`

Чистые reorder helpers в workspace-зоне:

- `src/pages/workspace-layout/model/workspace-canvas-utils.ts`
- `src/pages/workspace-layout/model/workspace-canvas-utils.test.ts`

Критический тест sidebar DnD:

- `src/pages/editor/ui/sidebar/sidebar-dnd-critical.test.tsx`

## Основной hook: useReorderableDragList

`useReorderableDragList` — это небольшой универсальный hook поверх native HTML Drag and Drop.

Входы:

- `itemIds: string[]` — текущий порядок элементов.
- `onCommit: (fromIndex: number, toIndex: number) => void` — callback финального reorder.
- `enabled?: boolean` — флаг включения DnD.

Возвращаемые значения:

- `dragOverIndex: number | null` — индекс текущей цели hover/drop.
- `draggingItemId: string | null` — id перетаскиваемого элемента.
- `isDragging: boolean` — есть активный drag.
- `renderedIds: string[]` — порядок для рендера с учетом preview.
- `handleDragStart`.
- `handleDragOver`.
- `handleDragLeave`.
- `handleDrop`.
- `handleDragEnd`.

Внутреннее состояние:

- `sourceIndexRef` — исходный индекс drag-source.
- `dragOverIndex` — текущий hover index.
- `previewOrderIds` — временный порядок для live preview.
- `draggingItemId` — id источника.
- `hiddenDragImageRef` — скрытая drag-картинка.

Поведение:

- на `dragStart` сохраняет source index и item id.
- ставит `event.dataTransfer.effectAllowed = "move"`.
- кладет source index в `dataTransfer` как `text/plain`.
- подменяет native drag preview на прозрачный 1x1 gif.
- на `dragOver` делает `preventDefault`, чтобы drop был разрешен.
- перестраивает `previewOrderIds` без мутации исходного массива.
- учитывает направление движения: при движении вниз вставляет после target, при движении вверх — перед target.
- на `drop` вычисляет `fromIndex` и `toIndex` относительно исходного `itemIds`.
- вызывает `onCommit`, только если индексы валидны и реально изменились.
- на `dragEnd` и `drop` чистит временное состояние.

## Drag preview

В hook есть helper:

`applyHiddenDragImage(event: React.DragEvent)`

Он использует прозрачный gif:

`data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==`

Смысл: выключить стандартный браузерный drag ghost и дать UI самому показывать состояние через `renderedIds`, opacity, ring и placeholder/drop-target стили.

Это полезно переносить почти копипастом, потому что решение уже маленькое, изолированное и не зависит от prodSQL.

## Reorder logic

В hook есть live preview через `previewOrderIds`, но нет универсального `moveArrayItem`.

Reorder сейчас реализуется в нескольких местах:

- `useTableReorderDnD` копирует `dndRowIds`, делает `splice(fromIndex, 1)`, затем `splice(toIndex, 0, moved)`.
- `useSchemaStore.reorderField` переставляет поля конкретной таблицы.
- `useSchemaStore.reorderEnumValues` переставляет enum values, comments и metadata синхронно.
- `useSchemaStore.reorderDomains` принимает `orderedIds` и перестраивает `domains`.
- `useSchemaStore.reorderSidebarEntities` пишет `sidebarOrder` в tables/enums/jsonSchemas.
- `workspace-canvas-utils.moveArrayItem` — чистый helper без мутации исходного массива.

Для дизайн-системы лучше забрать `moveArrayItem` как отдельный core helper и использовать его в stories/tests. Сам hook должен коммитить только `fromIndex/toIndex` или, опционально, финальный `orderedIds`.

## Sidebar adapters

`useTableReorderDnD` отвечает за reorder строк таблиц в sidebar.

Входы:

- `flatTableIds`.
- `groupMode`.
- `searchQuery`.
- `sortMode`.
- `setSortMode`.
- `onReorderTables`.

Важная логика:

- reorder включен, когда `groupMode === "none"` и нет поиска.
- отдельный domain-drag режим включен, когда `groupMode === "domain"`.
- если пользователь вручную меняет порядок, `sortMode` сбрасывается в `none`.
- строятся `dndIndexById` и `rowRankById` для правильного рендера.

`useDomainDnD` отвечает за две вещи:

- reorder групп-доменов.
- перемещение таблицы в другой домен или в `No Domain`.

Важная логика:

- `draggingDomainId` — перетаскиваемая группа.
- `domainDropTargetId` — активная drop zone группы.
- `previewDomainOrder` — preview-порядок доменов.
- `draggingTableId` — таблица, которую переносят между группами.
- `draggingTableSourceGroupId` — исходная группа таблицы.
- `pendingMove` — подтверждение перемещения таблицы между доменами.
- при переносе таблицы между доменами группы временно auto-collapse, затем collapsed-state восстанавливается.
- drop между доменами не коммитится сразу, а создает `pendingMove` и открывает confirm dialog.

`useSidebarDnDController` соединяет table reorder и domain DnD:

- вызывает `dnd.handleDragStart` для reorder.
- вызывает `handleTableDomainDragStart` для перемещения между доменами.
- на drop сначала проверяет domain-drop сценарий, затем обычный reorder.
- возвращает `getGroupTablesForRender`, который учитывает preview/rank/collapsed state.

## Drop zones и визуальные состояния

`GroupHeaderRow`:

- group header становится `draggable`, если `groupMode === "domain"` и у группы есть domain.
- `onDragOver` и `onDrop` принимают domain reorder и table-to-domain move.
- active drop target подсвечивается ring.
- для `No Domain` есть отдельный target через `NO_DOMAIN_GROUP_ID`.
- при переносе таблицы в другую группу показывается текст `Move table to this domain`.

`TableRow`:

- строка становится `draggable`, если разрешен reorder или domain drag.
- drag handle — `GripVertical`.
- source row получает blue ring.
- target row получает blue ring.
- остальные строки dimmed через opacity.
- если строка в режиме rename, drag/drop отключается.
- есть защита типов: в некоторых grouping modes drop разрешен только между совместимыми kind.

`TableNode`:

- использует тот же hook для reorder полей и enum values внутри карточки таблицы на canvas.
- drag запускается с отдельного handle `data-field-reorder-handle`.
- hover/drop состояние подсвечивает field row ring.
- drag конфликтует с relation handle, field editing и drag самой карточки, поэтому там есть blocking selectors.

## DOM и browser dependencies

Hook и adapters завязаны на:

- `React.DragEvent`.
- native HTML Drag and Drop.
- `event.dataTransfer`.
- `dataTransfer.setData`.
- `dataTransfer.getData`.
- `dataTransfer.setDragImage`.
- `event.preventDefault`.
- `event.stopPropagation` в domain drop.
- DOM image object через `new Image()`.

Hook не использует:

- `react-dnd`, хотя пакет есть в зависимостях проекта.
- `react-dnd-html5-backend`, хотя пакет есть в зависимостях проекта.
- `@dnd-kit`.
- pointer events.
- global store.
- canvas viewport.

## Зависимости от prodSQL state

Сам `useReorderableDragList` почти не зависит от prodSQL.

ProdSQL-specific слой начинается в adapters:

- `Table`.
- `Domain`.
- `SidebarTableGroup`.
- `SidebarPendingMove`.
- `GroupMode`.
- `SortMode`.
- `NO_DOMAIN_GROUP_ID`.
- `collapsedGroupIds`.
- `setCollapsedGroupIds`.
- `searchQuery`.
- `sortMode`.
- `onReorderTables`.
- `onReorderDomains`.
- `reorderSidebarEntities`.
- `assignDomainToTables`.
- `withHistory` в store.
- id-префиксы `enum::` и `jsonschema::`.

Эти зависимости нельзя тащить в core hook. Их нужно оставить как пример pattern adapter для sidebar/catalog navigation.

## Pointer, keyboard и edge cases

Что уже закрыто:

- disabled state через `enabled`.
- no-op при drag over самого себя.
- no-op при drop без source.
- no-op при from/to одинаковых.
- cleanup на `drop`.
- cleanup на `dragEnd`.
- скрытие native drag ghost.
- live reorder preview.
- search/sort конфликт: при поиске reorder отключается.
- rename conflict: при rename строки drag отключается.
- table-to-domain move требует confirmation.
- collapsed groups временно раскрываются/пересчитываются и затем восстанавливаются.

Что не закрыто или требует отдельного решения:

- keyboard reorder отсутствует.
- pointer/touch DnD отсутствует.
- mobile DnD не описан.
- auto-scroll контейнера при drag over краях не найден.
- virtualized list не учитывается.
- nested cross-group move в generic hook отсутствует.
- ARIA для reorder/listbox/tree отсутствует.
- live region для анонса изменения порядка отсутствует.
- `dataTransfer` может вести себя по-разному в браузерах, особенно Safari.
- `new Image()` требует browser environment; SSR-safe экспорт нужно проверить.

## Что переносить копипастом

Переносить почти без изменений:

- `useReorderableDragList`.
- `applyHiddenDragImage`.
- `getHiddenDragImage` и transparent gif constant.
- идею `renderedIds` как live preview order.
- базовый контракт `itemIds + onCommit + enabled`.
- `moveArrayItem` как чистый helper.

Переносить как reference, но перепроектировать имена/контракты:

- `useTableReorderDnD` — как `useReorderableSidebarItems`.
- `useDomainDnD` — как `useReorderableSidebarGroups` плюс optional cross-group move.
- `useSidebarDnDController` — как pattern-level controller, а не core hook.
- `GroupHeaderRow` и `TableRow` visual states — как Storybook state reference, не как готовый UI.
- `ConfirmTableMoveDialog` — как optional confirmation pattern для cross-group move.

Не переносить в generic core:

- prodSQL `Table` / `Domain` types.
- `GroupMode` / `SortMode`.
- `NO_DOMAIN_GROUP_ID` в текущем виде.
- id-префиксы `enum::` и `jsonschema::`.
- Zustand store actions.
- `withHistory`.
- canvas-specific relation/field drag logic.
- конкретные тексты `Move table to this domain`, `No Domain`.

## Целевое место

Пакеты:

- будущий `packages/interaction-core` или `packages/dnd-core` для hook/helper.
- `packages/patterns/navigation/sidebar` для sidebar reorder controller.
- `packages/patterns/interaction/drag-and-drop` для Storybook/demo patterns.

Storybook:

- `Interaction / Drag and Drop`.

Playground:

- `interaction-preview`.

UI-обвязка:

- `packages/ui-react` только для drag handle, drop indicator, sortable row, sortable group visuals.

Figma:

- слепок не обязателен, но нужны схемы состояний.

## Smoke-сценарии для будущего теста

Для core hook:

- drag item `A` ниже `C` дает порядок `B, C, A`.
- drag item `C` выше `A` дает порядок `C, A, B`.
- drag over самого себя не меняет preview.
- drop без source не вызывает `onCommit`.
- drop с тем же индексом не вызывает `onCommit`.
- `enabled=false` блокирует start/over/drop.
- `dragEnd` чистит `draggingItemId`, `dragOverIndex`, `previewOrderIds`.
- `applyHiddenDragImage` вызывает `dataTransfer.setDragImage`.

Для sidebar pattern:

- reorder групп целиком.
- reorder item внутри группы.
- reorder выключен при активном search.
- ручной reorder сбрасывает sort в manual/none.
- locked item нельзя начать drag.
- locked group нельзя начать drag.
- drop target подсвечивается только для валидной цели.
- перемещение item между группами создает pending move, но не коммитит без confirm.
- cancel pending move не меняет данные.
- confirm pending move вызывает adapter callback.
- collapsed groups восстанавливаются после завершения drag.
- drag source подсвечивается, остальные элементы dimmed.

Для accessibility:

- keyboard reorder через Space/Arrow/Enter/Escape должен быть добавлен до финального компонента.
- live region должен анонсировать picked/moved/dropped/cancelled.
- focus должен оставаться на перемещаемом элементе или возвращаться на drag handle после drop/cancel.

## Риски

- Native HTML Drag and Drop плохо работает на touch/mobile без дополнительного pointer/touch слоя.
- Текущий hook не закрывает keyboard accessibility.
- Sidebar adapters глубоко знают prodSQL domain/table model.
- Cross-group move сейчас завязан на `pendingMove` и confirm dialog, для дизайн-системы нужен generic event contract.
- В проекте есть зависимости `react-dnd`, но текущий hook их не использует; при переносе не надо случайно тащить лишнюю зависимость.
- Preview order считается строковым сравнением `join("|")`; для generic ids с символом `|` лучше заменить на безопасное сравнение массивов.
- `new Image()` нужно держать внутри browser-only path, чтобы не поймать SSR-ошибки в Next.
- Нельзя сломать проверенную логику prodSQL: сначала копируем сырьем в отдельный пакет/Storybook, потом постепенно обобщаем.

## Критерии готовности

- найден hook и связанные helpers: выполнено.
- описаны входы и выходы: выполнено.
- отмечены зависимости: выполнено.
- предложено, что копировать сырьем: выполнено.
- описаны smoke-сценарии будущего теста: выполнено.

## Этап 3: сырой импорт вертикального набора

Статус: перенесено в PR этапа 3.

Что добавлено:

- `packages/patterns/src/drag-and-drop` — сырой interaction drag-and-drop kit;
- `useReorderableDragList` — переносимый native HTML DnD hook;
- `applyHiddenDragImage` — transparent drag image helper;
- `moveArrayItem` — чистый immutable reorder helper;
- `DragAndDropPreview` — Storybook-ready preview с live reorder и sidebar/domain adapter reference;
- `apps/storybook/src/stories/interaction-drag-and-drop.stories.tsx` — истории `Interaction / Drag and Drop / Raw Import`.

Принятое техническое решение:

- hook перенесен без prodSQL `Table`, `Domain`, Zustand store, `GroupMode`, `SortMode` и canvas state;
- `new Image()` защищен проверкой browser environment, чтобы не ломать SSR import;
- cross-group move оставлен как pending-confirmation pattern, не как generic core logic;
- `react-dnd` не добавляется в зависимости, потому что проверенная логика prodSQL построена на native HTML DnD.

Известный технический долг:

- добавить keyboard reorder contract и реализацию;
- добавить live region для picked/moved/dropped/cancelled;
- добавить touch/pointer слой или выбрать отдельную стратегию для mobile;
- заменить story-only sidebar/domain reference на полноценный adapter после задач `INV-05` и `INV-08`;
- написать smoke tests для `moveArrayItem` и `useReorderableDragList` после стабилизации package boundary.
