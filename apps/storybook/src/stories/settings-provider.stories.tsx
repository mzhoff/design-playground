import {
  SettingsProviderPreview,
  settingsProviderConnectedMock,
  settingsProviderDisconnectedMock,
  settingsProviderErrorMock,
} from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Settings/Provider Connection/Raw Import",
  component: SettingsProviderPreview,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    fixture: settingsProviderConnectedMock,
  },
} satisfies Meta<typeof SettingsProviderPreview>

export default meta

type Story = StoryObj<typeof meta>

export const ConnectedExpanded: Story = {}

export const DisconnectedExpanded: Story = {
  args: {
    fixture: settingsProviderDisconnectedMock,
  },
}

export const ValidationError: Story = {
  args: {
    fixture: settingsProviderErrorMock,
  },
}
