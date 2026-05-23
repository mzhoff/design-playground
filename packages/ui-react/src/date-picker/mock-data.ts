import type { UiDatePickerFixture } from "./contracts"

export const uiDatePickerMock: UiDatePickerFixture = {
  title: "Date picker family",
  description:
    "Сырой перенос Gigonom DateTimePickerField: calendar core, date-time variant, range variant и вертикальный time slider.",
  mode: "datetime",
  locale: "ru-RU",
  viewMonth: "2026-05-01",
  today: "2026-05-23",
  selected: {
    date: "2026-05-25",
    time: "09:45",
  },
  range: {
    from: "2026-05-20",
    to: "2026-05-30",
  },
  disabledDates: ["2026-05-05", "2026-05-12", "2026-05-27"],
  timeLabels: ["06:00", "09:00", "12:00", "15:00", "18:00", "21:00"],
  accessibilityChecklist: [
    "Связать trigger и popup через aria-controls.",
    "Добавить role dialog или согласованную calendar grid семантику.",
    "Вернуть фокус на trigger после закрытия.",
    "Поддержать Escape, outside click и keyboard navigation по дням.",
    "Анонсировать смену месяца и выбранную дату через live region.",
  ],
}

export const uiDateRangePickerMock: UiDatePickerFixture = {
  ...uiDatePickerMock,
  mode: "range",
  title: "Date range picker",
  selected: {
    date: null,
  },
}

export const uiDatePickerEmptyMock: UiDatePickerFixture = {
  ...uiDatePickerMock,
  mode: "single",
  title: "Single date empty",
  selected: {
    date: null,
  },
  range: {
    from: null,
    to: null,
  },
}
