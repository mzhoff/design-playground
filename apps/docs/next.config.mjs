import path from "node:path"
import { fileURLToPath } from "node:url"

const appDir = path.dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  turbopack: {
    root: path.join(appDir, "../.."),
  },
}

export default nextConfig
