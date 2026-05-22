import path from "node:path"
import { fileURLToPath } from "node:url"

const appDir = path.dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  turbopack: {
    root: path.join(appDir, "../.."),
  },
  transpilePackages: [
    "@design-playground/assets",
    "@design-playground/icons",
    "@design-playground/patterns",
    "@design-playground/theme-compiler",
    "@design-playground/tokens",
    "@design-playground/ui-react",
  ],
}

export default nextConfig
