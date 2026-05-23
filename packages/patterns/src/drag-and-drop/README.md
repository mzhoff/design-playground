# Drag and Drop raw kit

## Происхождение

Срез собран для `INV-06` из prodSQL:

- `src/shared/ui/useReorderableDragList.ts`;
- `src/pages/editor/ui/sidebar/useTableReorderDnD.ts`;
- `src/pages/workspace-layout/model/workspace-canvas-utils.ts`;
- `src/pages/editor/ui/sidebar/GroupHeaderRow.tsx`;
- `src/pages/editor/ui/sidebar/TableRow.tsx`.

## Что перенесено на этапе 3

- `useReorderableDragList` как generic native HTML DnD hook.
- `applyHiddenDragImage` и transparent 1x1 gif для отключения browser drag ghost.
- `moveArrayItem` как чистый helper.
- Storybook preview с live reorder, drag source/target/dimmed states, locked item и sidebar/domain reference.

## Что не переносилось намеренно

- prodSQL `Table`, `Domain`, `GroupMode`, `SortMode` и store actions.
- `withHistory`, `assignDomainToTables`, `reorderSidebarEntities`.
- Cross-group move как готовая логика; пока только pending-confirmation contract.
- React DnD зависимости, потому что проверенный hook их не использует.

## Текущие ограничения

- Native HTML Drag and Drop плохо покрывает touch/mobile.
- Keyboard reorder пока отсутствует.
- ARIA/live region для sortable list/tree еще не реализованы.
- `new Image()` защищен browser-check, но SSR-поведение нужно повторно проверить при финальном package split.
