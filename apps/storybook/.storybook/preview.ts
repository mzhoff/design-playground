import type { Preview } from "@storybook/nextjs-vite"
import "../src/styles/storybook.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ["Введение", "Primitives", "Features", "Widgets", "Vertical Kits"],
      },
    },
  },
}

export default preview
