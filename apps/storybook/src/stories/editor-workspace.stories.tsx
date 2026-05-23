import { EditorWorkspacePreview } from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Layouts/Panels/Raw Import",
  component: EditorWorkspacePreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof EditorWorkspacePreview>

export default meta

type Story = StoryObj<typeof meta>

export const Workspace: Story = {}
