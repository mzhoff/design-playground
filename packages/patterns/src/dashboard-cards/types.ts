export type DashboardCardVariant =
  | "project"
  | "document"
  | "metric"
  | "summary"
  | "create"
  | "empty"

export interface DashboardPreviewNode {
  id: string
  title: string
  x: number
  y: number
  width?: number
  height?: number
  color?: string
  rows?: number
}

export interface DashboardPreviewEdge {
  id: string
  sourceNodeId: string
  targetNodeId: string
}

export interface DashboardCardMetric {
  label: string
  value: string
  delta?: string
  tone?: "neutral" | "success" | "warning" | "danger"
}

export interface DashboardCardMetaItem {
  label: string
  value: string
}

export interface DashboardCardAction {
  id: string
  label: string
  tone?: "default" | "danger"
}

export interface DashboardCardData {
  id: string
  title: string
  description?: string
  eyebrow?: string
  badge?: string
  imageSrc?: string
  previewNodes?: DashboardPreviewNode[]
  previewEdges?: DashboardPreviewEdge[]
  meta?: DashboardCardMetaItem[]
  metrics?: DashboardCardMetric[]
  actions?: DashboardCardAction[]
  selected?: boolean
  variant?: DashboardCardVariant
}
