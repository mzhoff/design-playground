# INV-04: Gigonom 2026 — новый date picker

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

## Цель

Найти новый date picker и подготовить его к будущему переносу в `packages/ui-react`.

На этапе инвентаризации код не переносим. Фиксируем найденный single date-time сценарий, текущий range-сценарий, зависимости, accessibility-вопросы и архитектуру семейства date picker компонентов.

## Внешний ориентир: shadcn и React DayPicker

shadcn не делает date picker как один монолитный root-компонент. В их документации date picker собирается композицией `Popover` + `Calendar`, а `Calendar` построен поверх `React DayPicker`.

Официальные ориентиры:

- `https://v3.shadcn.com/docs/components/date-picker` - date picker как композиция popover и calendar, включая range/presets.
- `https://ui.shadcn.com/docs/components/radix/calendar` - calendar-компонент для single/range.
- `https://daypicker.dev/selections/selection-modes` - selection modes `single`, `multiple`, `range`.
- `https://daypicker.dev/guides/accessibility` - keyboard navigation, focus management, ARIA labels, live region.

Вывод для нашей архитектуры: не складывать single picker, datetime picker и range picker в один тяжелый компонент. Лучше сделать семейство компонентов вокруг общего calendar core.

## Найденные entry points

Основной найденный компонент:

`apps/admin/src/features/admin-resource-form/ui/date-time-picker-field.component.tsx`

Где используется:

`apps/admin/src/features/admin-resource-form/ui/field-control.component.tsx`

`FieldControl` рендерит `DateTimePickerField`, когда `field.type === "datetime"`.

Связанные datetime-поля в ресурсах:

`apps/admin/src/entities/admin-resource/model/resources.ts`

Найдены сценарии:

- `crmSyncedAt` - дата синхронизации с CRM.
- `signTime` - время подписи документа.
- `signCertDateFrom` - сертификат действует с.
- `signCertDateTo` - сертификат действует до.
- `publishAt` - дата публикации для контентных сущностей.

Связанный range-сценарий в списке/календаре:

`apps/admin/src/page-slices/admin-resource/ui/admin-resource-list.component.tsx`

Там есть фильтр `Диапазон плановой публикации` с двумя нативными `input type="date"`:

- `dateFrom`.
- `dateTo`.

Там же есть календарное представление `BlogPostCalendarBoard`, которое группирует записи по `scheduledFor` и показывает месяц с карточками публикаций.

Смежная зависимость для времени:

- `apps/admin/src/shared/components/time-slider/ui/time-slider.component.tsx`.
- `apps/admin/src/shared/hooks/use-time-slider.ts`.

## Что найдено в текущем date-time picker

`DateTimePickerField` - кастомный client component без внешней date-picker библиотеки.

Текущее поведение:

- хранит `open` для показа popup-панели.
- хранит `viewDate` для текущего месяца календаря.
- парсит входящее значение через `new Date(String(value))`.
- форматирует значение в локальный `YYYY-MM-DDTHH:mm`.
- показывает trigger-кнопку с иконкой календаря.
- при открытии показывает absolute-positioned popup.
- календарь строится вручную через `buildCalendarWeeks`.
- неделя начинается с понедельника.
- заголовки дней недели захардкожены на русском: `Пн`, `Вт`, `Ср`, `Чт`, `Пт`, `Сб`, `Вс`.
- месяц форматируется через `Intl.DateTimeFormat("ru-RU")`.
- выбранная дата подсвечивается primary-цветом.
- текущий день подсвечивается emerald-акцентом.
- навигация по месяцам работает через кнопки назад/вперед.
- выбор дня сохраняет текущие часы/минуты или ставит `09:00`.
- время выбирается через вертикальный `TimeSlider`.
- если дата не выбрана, `TimeSlider` disabled.
- есть действие `Очистить`.
- есть действие `Готово`, которое закрывает popup.

Текущие состояния:

- empty value - trigger показывает `Выберите дату и время`.
- selected value - trigger показывает дату и время в `ru-RU`.
- disabled - trigger не открывает popup.
- open panel - календарь и time slider видны.
- selected day - активная дата подсвечена.
- today - сегодняшний день подсвечен отдельно.
- month navigation - предыдущий/следующий месяц.
- clear - значение сбрасывается в `null`.
- done - popup закрывается без дополнительного submit.

## Что найдено по range picker

Отдельный готовый double date picker в текущем доступном дереве не найден.

Найден range-сценарий в фильтрах публикаций:

- `BlogListFilters.dateFrom`.
- `BlogListFilters.dateTo`.
- два нативных поля `input type="date"`.
- подписи `С` и `По`.
- фильтр применяется к полю `scheduledFor`.
- посты без даты не попадают в выбранный диапазон.
- сравнение идет по локальному началу дня через `startOfLocalDay`.

Это важный функциональный референс, но не финальный UI-компонент. Для дизайн-системы нужен отдельный `DateRangePicker`, который должен лежать рядом с базовым date picker как вариант одного семейства.

## Предлагаемая архитектура семейства Date Picker

Целевая структура в `packages/ui-react`:

- `date-picker/calendar-core` - общий календарный grid, month navigation, date utilities, локализация, modifiers.
- `date-picker/date-picker` - single date picker без времени.
- `date-picker/date-time-picker` - single date + time picker, текущий `DateTimePickerField` как сырой референс.
- `date-picker/date-range-picker` - double/range picker для выбора `from` и `to`.
- `date-picker/date-range-filter` - упрощенный wrapper для фильтров таблиц и CRUD views.
- `date-picker/time-slider` - отдельный time input/slider, потому что он полезен не только внутри date-time picker.

Компоненты лучше держать в одной папке семейства `date-picker`, а не как полностью независимые пакеты. Причина простая: single/range/datetime используют одни и те же calendar primitives, локализацию, форматирование, disabled rules, focus model и визуальные токены. При этом публичные компоненты должны быть отдельными, чтобы не превращать API в один перегруженный монолит.

## Зависимости

Текущие локальные зависимости:

- React `useState`.
- `Button` из shared components.
- `TimeSlider` из shared components.
- `cn` из shared lib.
- `CalendarDays`, `ChevronLeft`, `ChevronRight` из `lucide-react`.
- `Intl.DateTimeFormat("ru-RU")`.
- ручные helpers `buildCalendarWeeks`, `addMonths`, `isSameDate`, `toLocalDateTimeValue`.

Текущие package-зависимости:

- `lucide-react`.
- `radix-ui` уже есть в проекте, но текущий `DateTimePickerField` не использует `Popover`.
- `react-day-picker` в текущих зависимостях `@gigonom/admin` не найден.
- `date-fns` в текущих зависимостях `@gigonom/admin` не найден.

Рекомендация: перед финальной реализацией решить, оставляем полностью свой calendar core или берем `React DayPicker` как accessibility/selection engine. Самый дешевый и надежный путь для дизайн-системы - использовать подход shadcn: `Popover` + `Calendar` на базе `React DayPicker`, а уникальность добирать стилями, токенами, `TimeSlider`, preset-панелями и wrappers.

## Accessibility-вопросы

Что уже есть:

- trigger-кнопка имеет `aria-expanded`.
- `TimeSlider` имеет `role="slider"`.
- `TimeSlider` имеет `aria-label`, `aria-disabled`, `aria-orientation`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`, `aria-valuetext`.
- `TimeSlider` поддерживает клавиатуру: arrows, Home, End.
- status-like buttons в соседних фильтрах используют `aria-pressed`.

Что нужно проверить и доработать:

- у popup нет `role="dialog"` или `role="application"`.
- нет `aria-controls` между trigger и popup.
- нет `aria-label` или `aria-labelledby` для календарной панели.
- нет focus trap или управляемого возврата фокуса на trigger после закрытия.
- нет закрытия по `Escape`.
- нет закрытия по outside click.
- нет keyboard navigation по дням календаря.
- day-кнопки не имеют `aria-selected`.
- weekday labels не связаны семантически с календарной сеткой.
- month change не анонсируется через live region.
- selected date не анонсируется через live region.
- disabled dates/min/max правила пока не описаны.
- нужно проверить screen reader поведение в сочетании popup + slider.
- нужно проверить мобильный viewport, потому что popup сейчас absolute и шириной `min(31rem, calc(100vw - 2rem))`.

## Mock-данные и состояния для Storybook

Минимальный набор stories:

- `Empty` - дата не выбрана.
- `Selected` - выбрана дата и время.
- `OpenEmpty` - popup открыт без выбранной даты.
- `OpenSelected` - popup открыт с выбранной датой.
- `TodayVisible` - виден сегодняшний день.
- `DifferentMonth` - открыт не текущий месяц.
- `Disabled` - компонент выключен.
- `Clearable` - проверка действия очистки.
- `InvalidIncomingValue` - входящее значение не парсится.
- `DateOnlySingle` - будущий single date picker без времени.
- `DateTimeWithSlider` - текущий сценарий date + time.
- `DateRangeEmpty` - будущий range picker без выбранного диапазона.
- `DateRangeStartOnly` - выбран только `from`.
- `DateRangeComplete` - выбран полный диапазон.
- `DateRangeInvalidOrder` - проверка поведения, если `to` раньше `from`.
- `DateRangeWithDisabledDates` - диапазон с disabled days.
- `DateRangeFilterCompact` - компактный wrapper для фильтров CRUD.
- `LocaleRu` - русская локализация.
- `LocaleEn` - английская локализация как проверка универсальности.
- `MobileViewport` - поведение popup на узком экране.
- `KeyboardNavigationChecklist` - story для ручной accessibility-проверки.

## План доведения до дизайн-системного компонента

1. Сначала вынести текущий `DateTimePickerField` и `TimeSlider` в story-only прототип без связи с admin resource form.
2. Затем выделить общий `CalendarCore`: генерация месяца, selected/today/range modifiers, навигация, локализация.
3. После этого принять техническое решение: оставить свой calendar core или заменить core на `React DayPicker`.
4. Затем собрать публичные компоненты `DatePicker`, `DateTimePicker`, `DateRangePicker`.
5. Затем сделать `DateRangeFilter` для CRUD-фильтров, чтобы заменить пару нативных `input type="date"`.
6. Затем добавить accessibility contract: roles, labels, keyboard map, focus return, Escape/outside click, live region.
7. Затем сделать Storybook `Forms / Date Picker` со всеми состояниями.
8. Затем сделать Playground `forms-preview`.
9. Затем сделать Figma-слепок и финальную pixel-perfect реализацию.
10. Затем вернуть компонент в Gigonom 2026 и заменить локальный `DateTimePickerField` и range-фильтр.

## Целевое место

Пакеты:

- `packages/ui-react/date-picker`.
- `packages/ui-react/time-slider`.

Storybook:

- `Forms / Date Picker`.

Playground:

- `forms-preview`.

Figma:

- нужен слепок: `да`.

## Риски

- Date picker имеет много edge cases: timezone, invalid dates, min/max, disabled dates, leap years, month/year boundaries.
- Range picker сложнее single picker: open range, reverse selection, min/max nights, disabled dates внутри диапазона.
- Текущий custom calendar не закрывает accessibility полностью.
- Текущая локализация жестко завязана на `ru-RU` и русские labels.
- Текущий value format завязан на `YYYY-MM-DDTHH:mm`, что хорошо для `datetime-local`, но не всегда подходит API.
- Popup реализован вручную через absolute positioning, без Radix Popover.
- Нужно не потерять уникальный UX `TimeSlider`, но отделить его от календарного core.
- Нельзя смешивать form field adapter и базовый UI-компонент.

## Критерии готовности

- найден основной компонент: выполнено.
- описаны режимы и состояния: выполнено.
- отмечены зависимости: выполнено.
- перечислены accessibility-вопросы: выполнено.
- предложен план доведения до дизайн-системного компонента: выполнено.

## Этап 3: сырой импорт вертикального набора

Статус: перенесено в PR этапа 3.

Что добавлено:

- `packages/ui-react/src/date-picker` — сырой date picker family kit;
- `UiDatePickerPreview` — Storybook-ready preview для `single`, `datetime` и `range` режимов;
- `uiDatePickerMock`, `uiDateRangePickerMock`, `uiDatePickerEmptyMock` — mock-состояния;
- `apps/storybook/src/stories/forms-date-picker.stories.tsx` — истории `Forms / Date Picker / Raw Import`.

Принятое техническое решение:

- single/date-time/range лежат рядом как семейство одного date-picker core, а не как один перегруженный production API;
- `TimeSlider` включен в сырой preview, потому что это уникальная часть Gigonom UX;
- внешний `React DayPicker` пока не добавлен как dependency, чтобы не менять runtime до отдельного решения; shadcn-подход зафиксирован как архитектурный ориентир.

Известный технический долг:

- добавить production keyboard navigation по дням;
- добавить Escape/outside click, focus return и live region;
- решить, какой core использовать: свой или `React DayPicker`;
- описать min/max, disabled dates, reverse range selection, timezone и invalid value behavior;
- после Figma-слепка выделить публичные `DatePicker`, `DateTimePicker`, `DateRangePicker`, `DateRangeFilter`, `TimeSlider`.
