# Date Picker raw family

## Происхождение

Срез собран для `INV-04` из Gigonom 2026:

- `apps/admin/src/features/admin-resource-form/ui/date-time-picker-field.component.tsx`;
- `apps/admin/src/shared/components/time-slider/ui/time-slider.component.tsx`;
- `apps/admin/src/shared/hooks/use-time-slider.ts`;
- range-сценарий из CRUD-фильтров `dateFrom/dateTo` зафиксирован как функциональный референс.

## Что перенесено на этапе 3

- Calendar grid с неделей от понедельника.
- Month navigation.
- Single date variant.
- Date-time variant с вертикальным time slider.
- Date range variant рядом с single/date-time, как одно семейство компонентов.
- Список accessibility-долгов прямо в preview.

## Что не переносилось намеренно

- Полный production `DateTimePickerField` как form adapter.
- Зависимость на admin `Button`, `cn`, routing или resource models.
- Внешние библиотеки `React DayPicker`, Radix Popover и date-fns до отдельного технического решения.

## Текущие ограничения

- Это Storybook-ready raw preview, а не финальный accessible date picker.
- Keyboard navigation по grid, Escape/outside click, focus trap и live region еще не реализованы.
- Range picker показывает целевую модель, но не закрывает edge cases min/max, disabled range crossing и timezone.
- Перед финальной реализацией нужно решить: собственный calendar core или `React DayPicker` по shadcn-подходу.
