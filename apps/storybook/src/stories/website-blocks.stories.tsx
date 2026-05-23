import { WebsiteBlocksPreview } from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Website Blocks/Motion/Raw Import",
  component: WebsiteBlocksPreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof WebsiteBlocksPreview>

export default meta

type Story = StoryObj<typeof meta>

export const LandingMotion: Story = {}
