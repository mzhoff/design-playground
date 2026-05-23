export type EditorWorkspacePaneId = "project" | "library" | "canvas" | "behavior" | "inspector"

export interface EditorWorkspaceTab {
  id: string
  title: string
  badge?: string
}

export interface EditorWorkspacePane {
  id: EditorWorkspacePaneId
  title: string
  subtitle?: string
  tabs: EditorWorkspaceTab[]
  activeTabId: string
}

export interface EditorWorkspaceCatalogGroup {
  id: string
  title: string
  count: number
  rows: Array<{
    id: string
    title: string
    meta?: string
    badge?: string
    selected?: boolean
  }>
}

export interface EditorWorkspaceInspectorSection {
  id: string
  title: string
  fields: Array<{
    id: string
    label: string
    value: string
    kind?: "input" | "textarea" | "select"
  }>
}
