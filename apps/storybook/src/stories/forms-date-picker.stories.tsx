import {
  UiDatePickerPreview,
  uiDatePickerEmptyMock,
  uiDatePickerMock,
  uiDateRangePickerMock,
} from "@design-playground/ui-react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Forms/Date Picker/Raw Import",
  component: UiDatePickerPreview,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    fixture: uiDatePickerMock,
  },
} satisfies Meta<typeof UiDatePickerPreview>

export default meta

type Story = StoryObj<typeof meta>

export const DateTimeWithSlider: Story = {}

export const DateRange: Story = {
  args: {
    fixture: uiDateRangePickerMock,
  },
}

export const EmptySingleDate: Story = {
  args: {
    fixture: uiDatePickerEmptyMock,
  },
}
