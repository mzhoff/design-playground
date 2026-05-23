# INV-05: Gigonom 2026 — левая боковая навигация

## Статус

Запланировано.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

## Цель

Найти левую боковую панель, описать текущую структуру и подготовить будущий reorder UX.

## Что ищем

- sidebar component;
- группы навигации;
- дочерние элементы;
- active state;
- collapsed/expanded states;
- responsive behavior;
- структуру данных меню.

## Будущее требование

Панель должна поддерживать:

- reorder групп целиком;
- reorder дочерних элементов внутри группы;
- возможное перемещение элементов между группами после отдельного согласования.

## Целевое место

Пакеты:

- `packages/patterns`;
- `packages/ui-react`.

Storybook:

- `Navigation / Sidebar`.

Playground:

- `admin-navigation-preview`.

Figma:

- нужен слепок: `да`.

## Критерии готовности

- найден компонент sidebar;
- описана структура данных меню;
- отмечены состояния;
- указано, где нужен drag-and-drop;
- описаны props для универсализации.

