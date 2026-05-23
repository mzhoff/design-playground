export type UiDatePickerMode = "single" | "datetime" | "range"

export type UiDateValue = {
  date: string | null
  time?: string
}

export type UiDateRangeValue = {
  from: string | null
  to: string | null
}

export type UiDatePickerFixture = {
  title: string
  description: string
  mode: UiDatePickerMode
  locale: "ru-RU" | "en-US"
  viewMonth: string
  today: string
  selected: UiDateValue
  range: UiDateRangeValue
  disabledDates: string[]
  timeLabels: string[]
  accessibilityChecklist: string[]
}

export type UiDatePickerPreviewProps = {
  fixture?: UiDatePickerFixture
}
