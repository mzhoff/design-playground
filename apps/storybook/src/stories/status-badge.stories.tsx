import { UiStatusBadge } from "@design-playground/ui-react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Primitives/Status Badge",
  component: UiStatusBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "готовится",
    tone: "ready",
  },
} satisfies Meta<typeof UiStatusBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Ready: Story = {}

export const Neutral: Story = {
  args: {
    children: "запланировано",
    tone: "neutral",
  },
}
