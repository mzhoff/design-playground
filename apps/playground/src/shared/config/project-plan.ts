import { foundationTokenLayers } from "@design-playground/tokens";
import { plannedPatternGroups } from "@design-playground/patterns";

export const stageOneChecklist = [
  "Next.js Playground shell",
  "Next.js documentation shell",
  "Storybook technical shell",
  "workspace package imports",
  "shared TypeScript config"
] as const;

export const runtimeSurfaceSummary = {
  tokenLayers: foundationTokenLayers,
  patternGroups: plannedPatternGroups
};
