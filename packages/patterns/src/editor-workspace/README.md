# Editor Workspace Raw Kit

## Происхождение

Сырой набор собран по итогам `INV-08` из prodSQL:

- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/workspace-layout/ui/WorkspaceLayoutPage.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/workspace-layout/ui/WorkspaceChrome.tsx`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/workspace-layout/model/useWorkspacePanels.ts`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/workspace-layout/model/workspace-panel-resize.ts`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/pages/workspace-layout/ui/WorkspacePane.tsx`.

## Что перенесено

- Fixed docking layout: project/library/canvas/behavior/inspector.
- Toggle states для left/right/bottom/canvas focus.
- Bottom panel resize через header handle.
- Dock pane shell, tabs, catalog rows, inspector sections и timeline-like bottom area.

## Текущие ограничения

- `react-resizable-panels` не добавлен в зависимости сырого набора; preview использует CSS grid и локальный state.
- Drag tabs между зонами пока не перенесен.
- Произвольного docking/floating windows нет, как и в исходной fixed layout-модели.
- SQL/project state, semantic persistence, React Query и CodeMirror не перенесены.
- Keyboard resize и accessibility для tab drag требуют отдельного проектирования.

## Следующий шаг

После Figma-слепка разделить набор на:

- `dock-layout`;
- `editor-workspace`;
- `catalog-panel`;
- `inspector`;
- adapters для SQL, видео-редактора и marketing workflow.
