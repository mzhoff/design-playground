# Canvas Workspace Raw Kit

## Происхождение

Сырой набор собран по итогам `INV-07` из prodSQL:

- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/shared/ui/useCanvasNavigation.ts`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/shared/ui/useCanvasBoxSelection.ts`;
- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos/src/shared/ui/canvas-navigation-ui.tsx`;
- workspace canvas shell из `src/pages/workspace-layout/ui/WorkspaceProjectCanvas.tsx` и `WorkspaceFloatingCanvasToolbar.tsx`.

## Что перенесено

- Базовая pan/zoom-навигация canvas.
- Ctrl/Cmd + wheel zoom в точку курсора.
- Wheel/shift-wheel panning.
- Middle mouse panning.
- Box selection в world coordinates.
- Grid background и zoom indicator.
- Generic nodes/edges preview без SQL-домена.

## Текущие ограничения

- Это не финальный `canvas-core`, а сырой вертикальный срез для Storybook-осмотра.
- SQL-типы, FK/PK, semantic persistence, schema validation и code mode сознательно не перенесены.
- Touch/mobile UX, keyboard navigation и полноценная accessibility-модель еще не спроектированы.
- Edge layer пока демонстрационный: без ports, handles, relation cardinality и drag-to-connect.
- Node drag есть только в preview-компоненте, без history и snap/grid rules.

## Следующий шаг

После Figma-слепка разделить набор на:

- `canvas-core`: navigation, selection, transform layer, history, culling;
- `patterns/canvas-workspace`: shell, toolbar, minimap, contextual menu;
- domain adapters: ERD, class diagram, video editor, marketing workflow.
