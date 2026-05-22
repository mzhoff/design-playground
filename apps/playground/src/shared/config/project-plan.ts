import { plannedPatternGroups } from "@design-playground/patterns"
import { foundationTokenLayers } from "@design-playground/tokens"

export const stageOneChecklist = [
  "Next.js Playground shell",
  "Next.js documentation shell",
  "Storybook technical shell",
  "workspace package imports",
  "shared TypeScript config",
] as const

export const runtimeSurfaceSummary = {
  tokenLayers: foundationTokenLayers,
  patternGroups: plannedPatternGroups,
}
