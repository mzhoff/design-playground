export const plannedPatternGroups = [
  "chat-assistant",
  "canvas",
  "charts",
  "admin-navigation",
  "forms",
  "text-editing",
  "website-blocks",
  "motion"
] as const;

export type PlannedPatternGroup = (typeof plannedPatternGroups)[number];
