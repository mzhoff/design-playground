import { DragAndDropPreview, dragAndDropMock } from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Interaction/Drag and Drop/Raw Import",
  component: DragAndDropPreview,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    fixture: dragAndDropMock,
  },
} satisfies Meta<typeof DragAndDropPreview>

export default meta

type Story = StoryObj<typeof meta>

export const ReorderableList: Story = {}

export const Disabled: Story = {
  args: {
    fixture: {
      ...dragAndDropMock,
      enabled: false,
    },
  },
}
