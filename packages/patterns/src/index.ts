export * from "./admin-crud"
export * from "./editor-wysiwyg"

export const plannedPatternGroups = [
  "admin-crud",
  "editor-wysiwyg",
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
