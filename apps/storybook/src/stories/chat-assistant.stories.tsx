import { ChatAssistantPreview } from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Chat Assistant/Raw Import",
  component: ChatAssistantPreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChatAssistantPreview>

export default meta

type Story = StoryObj<typeof meta>

export const Assistant: Story = {}
