export const foundationTokenLayers = [
  "colors",
  "typography",
  "spacing",
  "radii",
  "borders",
  "shadows",
  "motion",
  "icons",
] as const

export type FoundationTokenLayer = (typeof foundationTokenLayers)[number]

export type TokenDictionary = Record<`--ds-${string}`, string>
