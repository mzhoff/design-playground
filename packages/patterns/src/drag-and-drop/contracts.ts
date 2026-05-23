export type DragAndDropItem = {
  id: string
  label: string
  description: string
  locked?: boolean
  badge?: string
}

export type DragAndDropGroup = {
  id: string
  label: string
  description: string
  locked?: boolean
  items: DragAndDropItem[]
}

export type DragAndDropFixture = {
  title: string
  description: string
  enabled: boolean
  activeScenario: "list-reorder" | "group-reorder" | "cross-group-pending"
  items: DragAndDropItem[]
  groups: DragAndDropGroup[]
  smokeScenarios: string[]
  accessibilityDebt: string[]
}

export type DragAndDropPreviewProps = {
  fixture?: DragAndDropFixture
}
