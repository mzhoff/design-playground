# Settings Provider Connection raw kit

## Происхождение

Срез собран для `INV-03` из Gigonom 2026:

- `apps/admin/src/page-slices/settings/ui/settings-page.component.tsx`;
- routes `apps/admin/src/app/(dashboard)/settings/*`;
- связанный admin shell/sidebar зафиксирован как отдельный будущий источник для `INV-05`.

## Что перенесено на этапе 3

- Layout страницы настроек с локальной навигацией.
- Provider connection card с состояниями connected/disconnected/error/pending.
- Форма ввода credentials без хранения реального секрета.
- Форма деталей provider settings.
- Aside метрик, лимитов и баланса.
- Storybook mock-сценарии connected, disconnected и validation error.

## Что не переносилось намеренно

- `/api/cms/v1/openrouter-*` routes.
- `requestJson`, backend proxy и env.
- Реальные secrets, key storage и проверка ключа.
- Auth/session и sign-out логика админки.
- Бизнес-семантика OpenRouter credits как обязательный контракт.

## Текущие ограничения

- Это presentation-only срез для визуального осмотра.
- OpenRouter используется только как demo fixture, сам компонент должен работать с любым provider.
- Admin shell/sidebar не включен, чтобы не смешивать задачу provider connection с задачей навигации.
- Финальные primitives (`Field`, `MetricRow`, `StatusPill`) пока не вынесены в `ui-react` до Figma-сравнения.
