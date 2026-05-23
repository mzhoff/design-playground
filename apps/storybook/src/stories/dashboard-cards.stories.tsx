import { DashboardCardsPreview } from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Data Display/Dashboard Cards/Raw Import",
  component: DashboardCardsPreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof DashboardCardsPreview>

export default meta

type Story = StoryObj<typeof meta>

export const Cards: Story = {}
