import type { TokenDictionary } from "@design-playground/tokens"

export function compileCssVariables(tokens: TokenDictionary): string {
  const declarations = Object.entries(tokens)
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n")

  return `:root {\n${declarations}\n}`
}
