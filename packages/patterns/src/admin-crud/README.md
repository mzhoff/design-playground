# Admin CRUD raw kit

Источник: `INV-01`, Gigonom 2026 admin resource CRUD.

Что перенесено в сыром виде:

- list view;
- cards view;
- kanban view с drag-and-drop между статусами;
- calendar month view;
- search;
- archive toggle;
- mock resource и mock items.

Что сознательно не перенесено:

- Next.js routing;
- REST data fetching;
- create/edit forms;
- users CRUD;
- lead CRM drawer;
- media normalization;
- localStorage view mode persistence.

Ограничения:

- стили временно зашиты inline, чтобы быстро показать вертикальный набор в Storybook;
- timeline пока остается placeholder в контракте, но не рендерится;
- API финальных компонентов не фиксируется до Figma-сравнения;
- текущий компонент нужен для визуального осмотра, а не для production-потребления.
