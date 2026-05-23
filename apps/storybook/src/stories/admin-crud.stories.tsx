import {
  AdminCrudPreview,
  adminCrudMockItems,
  adminCrudMockResource,
} from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Admin/CRUD/Raw Import",
  component: AdminCrudPreview,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    resource: adminCrudMockResource,
    items: adminCrudMockItems,
    today: new Date("2026-05-23T12:00:00+03:00"),
  },
} satisfies Meta<typeof AdminCrudPreview>

export default meta

type Story = StoryObj<typeof meta>

export const List: Story = {
  args: {
    initialView: "list",
  },
}

export const Cards: Story = {
  args: {
    initialView: "cards",
  },
}

export const Kanban: Story = {
  args: {
    initialView: "kanban",
  },
}

export const Calendar: Story = {
  args: {
    initialView: "calendar",
  },
}
