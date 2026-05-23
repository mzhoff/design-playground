import { CanvasWorkspacePreview } from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Canvas/Core/Raw Import",
  component: CanvasWorkspacePreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof CanvasWorkspacePreview>

export default meta

type Story = StoryObj<typeof meta>

export const Workspace: Story = {}
