# Dashboard Cards Raw Kit

## Происхождение

Сырой набор собран по итогам `INV-09` из prodSQL:

- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/projects/ui/ProjectsPage.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/project/ui/ProjectHomePage.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/projects/ui/SchemaPreview.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/workspace-layout/ui/WorkspaceClassEntityCard.tsx` как дополнительный data-display референс.

## Что перенесено

- Project/document card shell.
- Preview slot с generated schema/class-like SVG.
- Create tile.
- Empty/search-empty state.
- Metric/summary slots.
- Meta row и actions row без router/project CRUD.

## Текущие ограничения

- Карточки пока лежат в `packages/patterns`, а не разделены на `ui-react` primitives и adapters.
- Inline rename, dropdown menu и CRUD actions не перенесены.
- SQL `Table`, `Relation`, `ProjectData`, `ProjectDocument` заменены generic preview/data контрактом.
- Loading skeleton, density variants и selected/pinned states требуют отдельного прохода.
- Interactive card пока не навязывает navigation API: consumer должен выбрать `button`, `a` или router adapter.

## Следующий шаг

После Figma-слепка вынести primitives в `packages/ui-react`:

- `Card`;
- `CardPreview`;
- `CardMeta`;
- `CardActions`;
- `EmptyState`;
- `MetricValue`.

А в `packages/patterns` оставить project/document/dashboard adapters.
