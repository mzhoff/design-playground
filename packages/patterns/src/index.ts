export * from "./admin-crud"
export * from "./drag-and-drop"
export * from "./editor-wysiwyg"
export * from "./navigation-sidebar"
export * from "./settings-provider"

export const plannedPatternGroups = [
  "admin-crud",
  "editor-wysiwyg",
  "settings-provider",
  "drag-and-drop",
  "navigation-sidebar",
  "chat-assistant",
  "canvas",
  "charts",
  "admin-navigation",
  "forms",
  "text-editing",
  "website-blocks",
  "motion",
] as const

export type PlannedPatternGroup = (typeof plannedPatternGroups)[number]
export * from "./canvas-workspace"
export * from "./chat-assistant"
export * from "./dashboard-cards"
export * from "./editor-workspace"
export * from "./website-blocks"
