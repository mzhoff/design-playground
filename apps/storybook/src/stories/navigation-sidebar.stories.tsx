import {
  SidebarNavigationPreview,
  sidebarNavigationCollapsedMock,
  sidebarNavigationMock,
  sidebarNavigationReorderMock,
} from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Navigation/Sidebar/Raw Import",
  component: SidebarNavigationPreview,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    fixture: sidebarNavigationMock,
  },
} satisfies Meta<typeof SidebarNavigationPreview>

export default meta

type Story = StoryObj<typeof meta>

export const Expanded: Story = {}

export const CollapsedIcon: Story = {
  args: {
    fixture: sidebarNavigationCollapsedMock,
  },
}

export const ReorderMode: Story = {
  args: {
    fixture: sidebarNavigationReorderMock,
  },
}
