export * from "./admin-crud"
export * from "./editor-wysiwyg"
export * from "./settings-provider"

export const plannedPatternGroups = [
  "admin-crud",
  "editor-wysiwyg",
  "settings-provider",
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
