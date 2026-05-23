"use client"

import { useMemo, useState } from "react"
import type { UiDatePickerFixture, UiDatePickerPreviewProps } from "./contracts"
import { uiDatePickerMock } from "./mock-data"

const weekDaysRu = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const weekDaysEn = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export function UiDatePickerPreview({ fixture = uiDatePickerMock }: UiDatePickerPreviewProps) {
  const [mode, setMode] = useState(fixture.mode)
  const [selectedDate, setSelectedDate] = useState(fixture.selected.date)
  const [selectedTime, setSelectedTime] = useState(fixture.selected.time ?? "09:00")
  const [range, setRange] = useState(fixture.range)
  const [viewMonth, setViewMonth] = useState(() => parseIsoDate(fixture.viewMonth))
  const calendarWeeks = useMemo(() => buildCalendarWeeks(viewMonth), [viewMonth])
  const locale = fixture.locale

  function selectDay(isoDate: string) {
    if (fixture.disabledDates.includes(isoDate)) {
      return
    }

    if (mode === "range") {
      setRange((current) => nextRangeValue(current, isoDate))
      return
    }

    setSelectedDate(isoDate)
  }

  return (
    <section className="min-h-[720px] rounded-[28px] border border-zinc-200 bg-[#f5f1e8] p-5 text-zinc-950 shadow-sm">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <main className="rounded-[26px] border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/5">
          <header className="flex flex-col gap-4 border-b border-zinc-200 pb-5 md:flex-row md:items-start md:justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
                Forms / Date Picker
              </span>
              <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">{fixture.title}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                {fixture.description}
              </p>
            </div>
            <ModeSwitch mode={mode} onChange={setMode} />
          </header>

          <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_160px]">
            <div className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
              <TriggerPreview
                mode={mode}
                range={range}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
              />
              <div
                className="mt-4 rounded-[22px] border border-zinc-200 bg-white p-4 shadow-sm"
                role="dialog"
                aria-label="Календарная панель"
              >
                <CalendarHeader
                  locale={locale}
                  viewMonth={viewMonth}
                  onNext={() => setViewMonth(addMonths(viewMonth, 1))}
                  onPrev={() => setViewMonth(addMonths(viewMonth, -1))}
                />
                <CalendarGrid
                  disabledDates={fixture.disabledDates}
                  locale={locale}
                  mode={mode}
                  range={range}
                  selectedDate={selectedDate}
                  today={fixture.today}
                  weeks={calendarWeeks}
                  onSelectDay={selectDay}
                />
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-4">
                  <button
                    className="rounded-full px-4 py-2 text-sm font-semibold text-zinc-500 hover:bg-zinc-100"
                    type="button"
                    onClick={() => clearSelection(mode, setSelectedDate, setRange)}
                  >
                    Очистить
                  </button>
                  <button
                    className="rounded-full bg-zinc-950 px-5 py-2 text-sm font-semibold text-white"
                    type="button"
                  >
                    Готово
                  </button>
                </div>
              </div>
            </div>
            <TimeSliderPreview
              disabled={mode === "single" || mode === "range" || !selectedDate}
              labels={fixture.timeLabels}
              value={selectedTime}
              onChange={setSelectedTime}
            />
          </div>
        </main>

        <aside className="flex flex-col gap-4 rounded-[26px] border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/5">
          <h3 className="text-lg font-semibold tracking-[-0.03em]">Architecture notes</h3>
          <InfoCard
            label="Family"
            value="CalendarCore + DatePicker + DateTimePicker + DateRangePicker"
          />
          <InfoCard label="Source" value="Gigonom DateTimePickerField + TimeSlider" />
          <InfoCard label="Range source" value="CRUD filters dateFrom/dateTo" />
          <div className="rounded-2xl bg-zinc-100 p-4">
            <div className="text-sm font-semibold text-zinc-800">Accessibility backlog</div>
            <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-zinc-600">
              {fixture.accessibilityChecklist.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}

function ModeSwitch({
  mode,
  onChange,
}: {
  mode: UiDatePickerFixture["mode"]
  onChange: (mode: UiDatePickerFixture["mode"]) => void
}) {
  const modes: UiDatePickerFixture["mode"][] = ["single", "datetime", "range"]

  return (
    <div className="flex rounded-full bg-zinc-100 p-1">
      {modes.map((item) => (
        <button
          aria-pressed={mode === item}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${mode === item ? "bg-zinc-950 text-white" : "text-zinc-500 hover:text-zinc-950"}`}
          key={item}
          type="button"
          onClick={() => onChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function TriggerPreview({
  mode,
  range,
  selectedDate,
  selectedTime,
}: {
  mode: UiDatePickerFixture["mode"]
  range: UiDatePickerFixture["range"]
  selectedDate: string | null
  selectedTime: string
}) {
  const label =
    mode === "range"
      ? formatRangeLabel(range)
      : selectedDate
        ? `${formatIsoDate(selectedDate)}${mode === "datetime" ? `, ${selectedTime}` : ""}`
        : "Выберите дату"

  return (
    <button
      aria-expanded="true"
      className="flex h-11 w-full items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 text-left text-sm font-semibold shadow-sm"
      type="button"
    >
      <span>{label}</span>
      <span aria-hidden="true">▾</span>
    </button>
  )
}

function CalendarHeader({
  locale,
  onNext,
  onPrev,
  viewMonth,
}: {
  locale: UiDatePickerFixture["locale"]
  onNext: () => void
  onPrev: () => void
  viewMonth: Date
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <button
        aria-label="Предыдущий месяц"
        className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-500"
        type="button"
        onClick={onPrev}
      >
        ←
      </button>
      <div aria-live="polite" className="text-sm font-semibold capitalize text-zinc-800">
        {new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(viewMonth)}
      </div>
      <button
        aria-label="Следующий месяц"
        className="grid h-9 w-9 place-items-center rounded-full border border-zinc-200 text-zinc-500"
        type="button"
        onClick={onNext}
      >
        →
      </button>
    </div>
  )
}

function CalendarGrid({
  disabledDates,
  locale,
  mode,
  onSelectDay,
  range,
  selectedDate,
  today,
  weeks,
}: {
  disabledDates: string[]
  locale: UiDatePickerFixture["locale"]
  mode: UiDatePickerFixture["mode"]
  onSelectDay: (date: string) => void
  range: UiDatePickerFixture["range"]
  selectedDate: string | null
  today: string
  weeks: CalendarCell[][]
}) {
  const weekDays = locale === "ru-RU" ? weekDaysRu : weekDaysEn

  return (
    <div className="mt-4">
      <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-zinc-400">
        {weekDays.map((day) => (
          <div className="py-1" key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {weeks.flat().map((cell, index) => {
          if (!cell) {
            return <span className="h-10" key={`empty-${index}`} />
          }

          const disabled = disabledDates.includes(cell.iso)
          const selected =
            mode === "range" ? isDateInRange(cell.iso, range) : selectedDate === cell.iso
          const rangeEdge = mode === "range" && (range.from === cell.iso || range.to === cell.iso)
          const className = dayClassName({
            disabled,
            rangeEdge,
            selected,
            today: today === cell.iso,
          })

          return (
            <button
              aria-pressed={selected}
              className={className}
              disabled={disabled}
              key={cell.iso}
              type="button"
              onClick={() => onSelectDay(cell.iso)}
            >
              {cell.day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TimeSliderPreview({
  disabled,
  labels,
  onChange,
  value,
}: {
  disabled: boolean
  labels: string[]
  onChange: (value: string) => void
  value: string
}) {
  const selectedIndex = Math.max(0, labels.indexOf(value))
  const percent = labels.length > 1 ? selectedIndex / (labels.length - 1) : 0

  return (
    <div
      className={`flex flex-col items-center rounded-[24px] border border-zinc-200 bg-white p-4 ${disabled ? "opacity-45" : ""}`}
    >
      <div
        aria-disabled={disabled}
        aria-label="Время публикации"
        aria-orientation="vertical"
        aria-valuemax={labels.length - 1}
        aria-valuemin={0}
        aria-valuenow={selectedIndex}
        aria-valuetext={value}
        className="relative h-64 w-28 touch-none select-none"
        role="slider"
        tabIndex={disabled ? -1 : 0}
      >
        <div className="absolute left-3 h-full w-14 rounded-[1.25rem] bg-[#fff0bf] shadow-inner">
          {labels.map((label, index) => (
            <button
              className="absolute left-full flex -translate-y-1/2 items-center gap-2 pl-2 text-xs font-semibold text-zinc-500"
              disabled={disabled}
              key={label}
              style={{ top: `${(index / (labels.length - 1)) * 100}%` }}
              type="button"
              onClick={() => onChange(label)}
            >
              <span className="h-px w-2 bg-zinc-200" />
              {label}
            </button>
          ))}
          <div
            className="absolute left-1/2 grid h-12 w-[4.5rem] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border-2 border-[#f0b400] bg-white text-base font-semibold tabular-nums shadow-sm"
            style={{ top: `${9.375 + percent * 81.25}%` }}
          >
            {value}
          </div>
        </div>
      </div>
      <div className="mt-3 text-center text-xs font-semibold text-zinc-500">Время публикации</div>
      <div className="text-center text-xl font-semibold tabular-nums">{value}</div>
    </div>
  )
}

type CalendarCell = {
  day: number
  iso: string
} | null

function buildCalendarWeeks(date: Date): CalendarCell[][] {
  const year = date.getFullYear()
  const month = date.getMonth()
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const offset = (firstDay.getDay() + 6) % 7
  const cells: CalendarCell[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1
      return { day, iso: toIsoDate(new Date(year, month, day)) }
    }),
  ]

  while (cells.length % 7 !== 0) {
    cells.push(null)
  }

  return Array.from({ length: cells.length / 7 }, (_, index) =>
    cells.slice(index * 7, index * 7 + 7),
  )
}

function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1)
}

function parseIsoDate(value: string) {
  const parsed = new Date(`${value}T00:00:00`)
  return Number.isNaN(parsed.getTime()) ? new Date() : parsed
}

function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

function formatIsoDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parseIsoDate(value))
}

function formatRangeLabel(range: UiDatePickerFixture["range"]) {
  if (range.from && range.to) {
    return `${formatIsoDate(range.from)} — ${formatIsoDate(range.to)}`
  }

  if (range.from) {
    return `С ${formatIsoDate(range.from)}`
  }

  return "Выберите диапазон"
}

function nextRangeValue(range: UiDatePickerFixture["range"], date: string) {
  if (!range.from || range.to) {
    return { from: date, to: null }
  }

  if (date < range.from) {
    return { from: date, to: range.from }
  }

  return { ...range, to: date }
}

function isDateInRange(date: string, range: UiDatePickerFixture["range"]) {
  if (range.from && range.to) {
    return date >= range.from && date <= range.to
  }

  return range.from === date
}

function clearSelection(
  mode: UiDatePickerFixture["mode"],
  setSelectedDate: (date: string | null) => void,
  setRange: (range: UiDatePickerFixture["range"]) => void,
) {
  if (mode === "range") {
    setRange({ from: null, to: null })
    return
  }

  setSelectedDate(null)
}

function dayClassName({
  disabled,
  rangeEdge,
  selected,
  today,
}: {
  disabled: boolean
  rangeEdge: boolean
  selected: boolean
  today: boolean
}) {
  const base =
    "grid h-10 place-items-center rounded-full text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-25"

  if (rangeEdge) {
    return `${base} bg-zinc-950 text-white hover:bg-zinc-800`
  }

  if (selected) {
    return `${base} bg-[#eee6d8] text-zinc-950 hover:bg-[#e5d8c5]`
  }

  if (today) {
    return `${base} border border-emerald-400 bg-emerald-50 text-emerald-800 hover:bg-emerald-100`
  }

  if (disabled) {
    return `${base} bg-zinc-50 text-zinc-400`
  }

  return `${base} text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950`
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-zinc-100 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">{label}</div>
      <div className="mt-2 text-sm font-semibold leading-6 text-zinc-800">{value}</div>
    </div>
  )
}
