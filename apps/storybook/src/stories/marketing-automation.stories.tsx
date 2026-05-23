import {
  BrandContextWorkspace,
  ChannelSystemGrid,
  ContentCalendarPreview,
  ContentProductionBoard,
  GenerationActionsPanel,
  MarketingAutomationPreview,
  MediaLibraryGrid,
  PostEditorShell,
  ProviderPreview,
  TopicFunnelBoard,
} from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Marketing Automation/Raw Import",
  component: MarketingAutomationPreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof MarketingAutomationPreview>

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => <MarketingAutomationPreview />,
}

export const ContentProduction: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <ContentProductionBoard />,
}

export const PostEditor: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <PostEditorShell />,
}

export const TopicPlanning: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <TopicFunnelBoard />,
}

export const AssistantActions: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <GenerationActionsPanel />,
}

export const PlatformPreview: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <ProviderPreview />,
}

export const CalendarScheduling: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <ContentCalendarPreview />,
}

export const MediaAndChannels: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="grid gap-6 xl:grid-cols-2">
      <MediaLibraryGrid />
      <ChannelSystemGrid />
    </div>
  ),
}

export const BrandContext: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <BrandContextWorkspace />,
}
