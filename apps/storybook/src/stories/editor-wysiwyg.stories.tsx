import { EditorWysiwygPreview, editorWysiwygMock } from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/react-vite"

const meta = {
  title: "Editors/WYSIWYG/Raw Import",
  component: EditorWysiwygPreview,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    fixture: editorWysiwygMock,
    defaultPanel: "ai",
  },
} satisfies Meta<typeof EditorWysiwygPreview>

export default meta

type Story = StoryObj<typeof meta>

export const ArticleEditor: Story = {}

export const ImageGenerationPanel: Story = {
  args: {
    defaultPanel: "images",
  },
}

export const AnnotationsPanel: Story = {
  args: {
    defaultPanel: "annotations",
  },
}
