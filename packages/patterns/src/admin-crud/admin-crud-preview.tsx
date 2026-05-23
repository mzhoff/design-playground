"use client"

import type { CSSProperties, ReactNode } from "react"
import { useMemo, useState } from "react"
import type {
  AdminCrudColumn,
  AdminCrudItem,
  AdminCrudPreviewProps,
  AdminCrudStatus,
  AdminCrudStatusMeta,
  AdminCrudViewMode,
} from "./contracts"
import { adminCrudMockItems, adminCrudMockResource } from "./mock-data"

const statusOrder: AdminCrudStatus[] = ["draft", "in_review", "scheduled", "published", "archived"]

const statusMeta: Record<AdminCrudStatus, AdminCrudStatusMeta> = {
  draft: { label: "Черновик", tone: "neutral" },
  in_review: { label: "На ревью", tone: "info" },
  scheduled: { label: "Запланировано", tone: "warning" },
  published: { label: "Опубликовано", tone: "success" },
  archived: { label: "Архив", tone: "muted" },
}

const viewLabels: Record<AdminCrudViewMode, string> = {
  list: "Список",
  cards: "Карточки",
  kanban: "Kanban",
  calendar: "Календарь",
  timeline: "Timeline",
}

const styles = {
  shell: {
    minHeight: 640,
    border: "1px solid rgba(31, 29, 25, 0.12)",
    borderRadius: 28,
    background: "linear-gradient(135deg, #fffaf2 0%, #f1ede4 48%, #e8f1ea 100%)",
    color: "#171411",
    padding: 24,
    fontFamily: '"Iowan Old Style", "Palatino Linotype", Palatino, serif',
    boxShadow: "0 24px 80px rgba(31, 29, 25, 0.14)",
  },
  header: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 20,
    marginBottom: 20,
  },
  title: { margin: 0, fontSize: 34, lineHeight: 1, letterSpacing: -1.2 },
  subtitle: { margin: "8px 0 0", color: "rgba(23, 20, 17, 0.62)", fontSize: 14 },
  toolbar: { display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: 10 },
  input: {
    height: 38,
    width: 230,
    border: "1px solid rgba(31, 29, 25, 0.13)",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.72)",
    padding: "0 14px",
    outline: "none",
  },
  button: {
    height: 38,
    border: "1px solid rgba(31, 29, 25, 0.12)",
    borderRadius: 999,
    background: "rgba(255, 255, 255, 0.76)",
    color: "#171411",
    padding: "0 14px",
    cursor: "pointer",
    fontWeight: 700,
  },
  activeButton: { background: "#171411", color: "#fffaf2" },
  panel: {
    border: "1px solid rgba(31, 29, 25, 0.10)",
    borderRadius: 22,
    background: "rgba(255, 255, 255, 0.66)",
    overflow: "hidden",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 14 },
  th: { background: "rgba(23, 20, 17, 0.055)", padding: "14px 16px", textAlign: "left" as const },
  td: {
    borderTop: "1px solid rgba(31, 29, 25, 0.08)",
    padding: "14px 16px",
    verticalAlign: "top" as const,
  },
  cards: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 },
  card: {
    border: "1px solid rgba(31, 29, 25, 0.11)",
    borderRadius: 22,
    background: "rgba(255, 255, 255, 0.72)",
    padding: 18,
    minHeight: 210,
    boxShadow: "0 10px 30px rgba(31, 29, 25, 0.06)",
  },
  kanban: {
    display: "grid",
    gridTemplateColumns: "repeat(5, minmax(180px, 1fr))",
    gap: 12,
    overflowX: "auto" as const,
  },
  column: {
    minHeight: 360,
    border: "1px solid rgba(31, 29, 25, 0.10)",
    borderRadius: 20,
    background: "rgba(255, 255, 255, 0.52)",
    padding: 12,
  },
  calendar: { display: "grid", gridTemplateColumns: "repeat(7, minmax(96px, 1fr))", gap: 8 },
  day: {
    minHeight: 112,
    border: "1px solid rgba(31, 29, 25, 0.10)",
    borderRadius: 16,
    background: "rgba(255, 255, 255, 0.56)",
    padding: 10,
  },
} satisfies Record<string, CSSProperties>

export function AdminCrudPreview({
  resource = adminCrudMockResource,
  items = adminCrudMockItems,
  initialView,
  today = new Date("2026-05-23T12:00:00+03:00"),
  renderCellValue,
  onCreate,
  onOpen,
  onDelete,
  onStatusChange,
}: AdminCrudPreviewProps) {
  const [view, setView] = useState<AdminCrudViewMode>(initialView ?? resource.defaultView ?? "list")
  const [search, setSearch] = useState("")
  const [includeArchived, setIncludeArchived] = useState(false)
  const [localStatuses, setLocalStatuses] = useState<Record<number, AdminCrudStatus>>({})

  const hydratedItems = useMemo(
    () => items.map((item) => ({ ...item, status: localStatuses[item.id] ?? item.status })),
    [items, localStatuses],
  )

  const visibleItems = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("ru-RU")
    return hydratedItems.filter((item) => {
      if (!includeArchived && item.status === "archived") return false
      if (!normalizedSearch) return true
      return [item.title, item.caption, item.slug, item.author, ...(item.rubrics ?? [])]
        .filter((value): value is string => typeof value === "string")
        .join(" ")
        .toLocaleLowerCase("ru-RU")
        .includes(normalizedSearch)
    })
  }, [hydratedItems, includeArchived, search])

  function changeStatus(item: AdminCrudItem, status: AdminCrudStatus) {
    setLocalStatuses((current) => ({ ...current, [item.id]: status }))
    onStatusChange?.(item, status)
  }

  const supportedViews = resource.supportedViews.filter((item) => item !== "timeline")
  const safeView = view === "timeline" ? "list" : view

  return (
    <section style={styles.shell}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>{resource.title}</h1>
          <p style={styles.subtitle}>
            Найдено: {visibleItems.length} из {items.length}. Сырой импорт из Gigonom 2026 / INV-01.
          </p>
        </div>
        <div style={styles.toolbar}>
          <input
            aria-label="Поиск"
            style={styles.input}
            value={search}
            placeholder="Поиск"
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            type="button"
            style={{ ...styles.button, ...(includeArchived ? styles.activeButton : {}) }}
            onClick={() => setIncludeArchived((current) => !current)}
          >
            Архив
          </button>
          <button type="button" style={styles.button} onClick={onCreate}>
            Добавить
          </button>
        </div>
      </div>

      <div style={{ ...styles.toolbar, justifyContent: "flex-start", marginBottom: 16 }}>
        {supportedViews.map((mode) => (
          <button
            key={mode}
            type="button"
            style={{ ...styles.button, ...(safeView === mode ? styles.activeButton : {}) }}
            onClick={() => setView(mode)}
          >
            {viewLabels[mode]}
          </button>
        ))}
      </div>

      {safeView === "list" ? (
        <ResourceListView
          columns={resource.columns}
          items={visibleItems}
          renderCellValue={renderCellValue}
          onOpen={onOpen}
          onDelete={onDelete}
        />
      ) : safeView === "cards" ? (
        <ResourceCardsView items={visibleItems} onOpen={onOpen} onDelete={onDelete} />
      ) : safeView === "kanban" ? (
        <ResourceKanbanView items={visibleItems} onOpen={onOpen} onDropStatus={changeStatus} />
      ) : (
        <ResourceCalendarView items={visibleItems} today={today} onOpen={onOpen} />
      )}
    </section>
  )
}

function ResourceListView({
  columns,
  items,
  renderCellValue,
  onOpen,
  onDelete,
}: {
  columns: AdminCrudColumn[]
  items: AdminCrudItem[]
  renderCellValue?: (item: AdminCrudItem, column: AdminCrudColumn) => ReactNode
  onOpen?: (item: AdminCrudItem) => void
  onDelete?: (item: AdminCrudItem) => void
}) {
  return (
    <div style={styles.panel}>
      <table style={styles.table}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} style={styles.th}>
                {column.label}
              </th>
            ))}
            <th style={{ ...styles.th, textAlign: "right" }}>Действия</th>
          </tr>
        </thead>
        <tbody>
          {items.length ? (
            items.map((item) => (
              <tr key={item.id}>
                {columns.map((column) => (
                  <td key={column.key} style={styles.td}>
                    {renderCellValue?.(item, column) ?? formatCellValue(item, column)}
                  </td>
                ))}
                <td style={{ ...styles.td, textAlign: "right" }}>
                  <button type="button" style={styles.button} onClick={() => onOpen?.(item)}>
                    Открыть
                  </button>{" "}
                  <button type="button" style={styles.button} onClick={() => onDelete?.(item)}>
                    Удалить
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                style={{ ...styles.td, textAlign: "center", padding: 36 }}
              >
                Ничего не найдено.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

function ResourceCardsView({
  items,
  onOpen,
  onDelete,
}: {
  items: AdminCrudItem[]
  onOpen?: (item: AdminCrudItem) => void
  onDelete?: (item: AdminCrudItem) => void
}) {
  if (!items.length) return <StateMessage>Ничего не найдено.</StateMessage>
  return (
    <div style={styles.cards}>
      {items.map((item) => (
        <article key={item.id} style={styles.card}>
          <StatusBadge status={item.status} />
          <h2 style={{ margin: "14px 0 8px", fontSize: 22, lineHeight: 1.05 }}>{item.title}</h2>
          <p style={{ color: "rgba(23, 20, 17, 0.62)", minHeight: 46 }}>
            {item.caption ?? item.description ?? "Описание не задано."}
          </p>
          <Rubrics item={item} />
          <div style={{ display: "flex", justifyContent: "space-between", gap: 8, marginTop: 18 }}>
            <button type="button" style={styles.button} onClick={() => onOpen?.(item)}>
              Открыть
            </button>
            <button type="button" style={styles.button} onClick={() => onDelete?.(item)}>
              Удалить
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}

function ResourceKanbanView({
  items,
  onOpen,
  onDropStatus,
}: {
  items: AdminCrudItem[]
  onOpen?: (item: AdminCrudItem) => void
  onDropStatus: (item: AdminCrudItem, status: AdminCrudStatus) => void
}) {
  return (
    <div style={styles.kanban}>
      {statusOrder.map((status) => {
        const columnItems = items.filter((item) => item.status === status)
        return (
          <fieldset
            key={status}
            aria-label={`Колонка ${statusMeta[status].label}`}
            style={styles.column}
            onDragOver={(event) => event.preventDefault()}
            onDrop={(event) => {
              const id = Number(event.dataTransfer.getData("text/plain"))
              const item = items.find((candidate) => candidate.id === id)
              if (item) onDropStatus(item, status)
            }}
          >
            <strong>{statusMeta[status].label}</strong>
            <span style={{ float: "right", color: "rgba(23, 20, 17, 0.48)" }}>
              {columnItems.length}
            </span>
            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              {columnItems.length ? (
                columnItems.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    draggable
                    style={{
                      ...styles.card,
                      minHeight: 130,
                      width: "100%",
                      cursor: "grab",
                      padding: 14,
                      textAlign: "left",
                    }}
                    onDragStart={(event) =>
                      event.dataTransfer.setData("text/plain", String(item.id))
                    }
                    onClick={() => onOpen?.(item)}
                  >
                    <StatusBadge status={item.status} />
                    <h3 style={{ margin: "12px 0 6px", fontSize: 16, lineHeight: 1.12 }}>
                      {item.title}
                    </h3>
                    <small style={{ color: "rgba(23, 20, 17, 0.58)" }}>
                      {formatDate(item.scheduledFor) ?? "Без даты"}
                    </small>
                  </button>
                ))
              ) : (
                <StateMessage compact>Пусто</StateMessage>
              )}
            </div>
          </fieldset>
        )
      })}
    </div>
  )
}

function ResourceCalendarView({
  items,
  today,
  onOpen,
}: {
  items: AdminCrudItem[]
  today: Date
  onOpen?: (item: AdminCrudItem) => void
}) {
  const monthDays = getMonthDays(today)
  return (
    <div style={styles.calendar}>
      {monthDays.map((date) => {
        const dayItems = items.filter((item) => isSameLocalDay(item.scheduledFor, date))
        const isToday = isSameLocalDay(today.toISOString(), date)
        return (
          <div
            key={date.toISOString()}
            style={{ ...styles.day, outline: isToday ? "2px solid #171411" : undefined }}
          >
            <strong>{date.getDate()}</strong>
            <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
              {dayItems.slice(0, 2).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  style={{
                    ...styles.button,
                    height: "auto",
                    borderRadius: 12,
                    padding: 8,
                    textAlign: "left",
                  }}
                  onClick={() => onOpen?.(item)}
                >
                  {item.title}
                </button>
              ))}
              {dayItems.length > 2 ? <small>+{dayItems.length - 2}</small> : null}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function StatusBadge({ status }: { status?: AdminCrudStatus }) {
  const meta = status ? statusMeta[status] : { label: "—", tone: "muted" as const }
  const palette: Record<AdminCrudStatusMeta["tone"], CSSProperties> = {
    neutral: { background: "#f3eadc", color: "#5d4932" },
    info: { background: "#e4eefb", color: "#244b7a" },
    warning: { background: "#fff1c8", color: "#7a5200" },
    success: { background: "#dcf4e7", color: "#176a3a" },
    muted: { background: "#e6e2da", color: "#6d6860" },
  }
  return (
    <span
      style={{
        ...palette[meta.tone],
        display: "inline-flex",
        borderRadius: 999,
        padding: "5px 10px",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {meta.label}
    </span>
  )
}

function Rubrics({ item }: { item: AdminCrudItem }) {
  if (!item.rubrics?.length) return null
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
      {item.rubrics.slice(0, 3).map((rubric) => (
        <span
          key={rubric}
          style={{
            border: "1px solid rgba(31, 29, 25, 0.12)",
            borderRadius: 999,
            padding: "4px 8px",
            fontSize: 12,
          }}
        >
          {rubric}
        </span>
      ))}
    </div>
  )
}

function StateMessage({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <div
      style={{
        ...styles.panel,
        padding: compact ? 12 : 32,
        textAlign: "center",
        color: "rgba(23, 20, 17, 0.58)",
      }}
    >
      {children}
    </div>
  )
}

function formatCellValue(item: AdminCrudItem, column: AdminCrudColumn): ReactNode {
  const value = item[column.key]
  if (column.key === "status") return <StatusBadge status={item.status} />
  if (column.key === "rubrics") return <Rubrics item={item} />
  if (column.key === "scheduledFor")
    return formatDate(value) ?? <span style={{ color: "rgba(23, 20, 17, 0.45)" }}>—</span>
  if (value === null || value === undefined || value === "")
    return <span style={{ color: "rgba(23, 20, 17, 0.45)" }}>—</span>
  if (Array.isArray(value)) return value.join(", ")
  return String(value)
}

function formatDate(value: unknown) {
  if (typeof value !== "string") return null
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return null
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

function getMonthDays(today: Date) {
  const start = new Date(today.getFullYear(), today.getMonth(), 1)
  const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
  const days: Date[] = []
  for (let day = 1; day <= end.getDate(); day += 1)
    days.push(new Date(start.getFullYear(), start.getMonth(), day))
  return days
}

function isSameLocalDay(value: string | Date | undefined, date: Date) {
  if (!value) return false
  const source = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(source.getTime())) return false
  return (
    source.getFullYear() === date.getFullYear() &&
    source.getMonth() === date.getMonth() &&
    source.getDate() === date.getDate()
  )
}
