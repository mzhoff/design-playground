# Editor WYSIWYG raw kit

## Происхождение

Срез собран для `INV-02` на основе двух источников:

- Gigonom 2026: `packages/editor-core`, `apps/admin/src/features/admin-resource-form`;
- REVERIE: `apps/prototype-web/src/pages/content-editor/ui/EditorView.tsx` и связанные редакторские панели.

## Что перенесено на этапе 3

- Оболочка редактора статьи с заголовком, блоками контента и floating toolbar.
- Slash insert menu как визуальный паттерн.
- Правая панель с режимами `meta`, `ai`, `images`, `annotations`, `versions`.
- Моки для AI-действий, генерации изображений, аннотаций и истории версий.
- Контракты данных, которые не завязаны на CMS routes, OpenRouter endpoints или роутинг приложения.

## Что не переносилось намеренно

- Реальный `LexicalEditorField` и плагины Lexical.
- `requestJson`, `uploadMedia`, OpenRouter endpoints и CMS REST routes.
- Логика `blogPostId`, audit log, сохранения формы и публикации.
- Prototype-store и business actions из REVERIE.

## Текущие ограничения

- Компонент предназначен для визуального осмотра в Storybook, а не для production editing.
- Image generation и AI-панели работают как UI-mock без backend adapter.
- Accessibility для реального rich text editing нужно проверять отдельно после переноса Lexical-core.
- Финальная декомпозиция на primitives не зафиксирована до Figma-слепка и визуального сравнения.

## Следующий шаг

После согласования визуального среза нужно отдельно решить, переносим ли `editor-core` как отдельный package или оставляем ядро в consumer app и выносим только shell/panels/contracts.
