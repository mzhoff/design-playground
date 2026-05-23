# INV-07: prodSQL — canvas как переиспользуемый компонент

## Статус

Запланировано.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

## Цель

Найти canvas и связанную с ним навигационную логику для будущего reusable canvas workspace.

## Что ищем

- canvas entry point;
- pan/zoom;
- selection;
- карточки или ноды;
- таблицы на canvas;
- связи с панелями;
- доменную SQL-логику, которую нельзя переносить напрямую.

## Целевое место

Пакеты:

- `packages/patterns`;
- возможный будущий `canvas-core`.

Storybook:

- `Canvas / Core`.

Playground:

- `canvas-preview`.

Figma:

- нужен слепок: `да`.

## Критерии готовности

- найден entry point canvas;
- перечислены связанные компоненты;
- описаны внешние зависимости;
- отделена визуальная часть от SQL-домена;
- предложен минимальный Storybook-сценарий.

