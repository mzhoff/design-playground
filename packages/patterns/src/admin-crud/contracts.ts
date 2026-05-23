import type { ReactNode } from "react"

export type AdminCrudViewMode = "list" | "cards" | "kanban" | "calendar" | "timeline"

export type AdminCrudStatus = "draft" | "in_review" | "scheduled" | "published" | "archived"

export type AdminCrudColumn = {
  key: string
  label: string
}

export type AdminCrudResource = {
  title: string
  singularTitle: string
  slug: string
  columns: AdminCrudColumn[]
  supportedViews: AdminCrudViewMode[]
  defaultView?: AdminCrudViewMode
  readOnly?: boolean
}

export type AdminCrudItem = {
  id: number
  title: string
  slug?: string
  status?: AdminCrudStatus
  caption?: string
  description?: string
  scheduledFor?: string
  previewUrl?: string
  rubrics?: string[]
  author?: string
  readingTime?: number
  createdAt?: string
  updatedAt?: string
  [key: string]: unknown
}

export type AdminCrudStatusMeta = {
  label: string
  tone: "neutral" | "info" | "warning" | "success" | "muted"
}

export type AdminCrudPreviewProps = {
  resource?: AdminCrudResource
  items?: AdminCrudItem[]
  initialView?: AdminCrudViewMode
  today?: Date
  renderCellValue?: (item: AdminCrudItem, column: AdminCrudColumn) => ReactNode
  onCreate?: () => void
  onOpen?: (item: AdminCrudItem) => void
  onDelete?: (item: AdminCrudItem) => void
  onStatusChange?: (item: AdminCrudItem, status: AdminCrudStatus) => void
}
