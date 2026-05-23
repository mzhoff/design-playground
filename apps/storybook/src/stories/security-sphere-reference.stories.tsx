import {
  SecuritySphereAdminListReference,
  SecuritySphereFileUploadReference,
  SecuritySphereFormShellReference,
  SecuritySphereHeaderReference,
  SecuritySphereReferencePreview,
  SecuritySphereWebsiteReference,
} from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Security Sphere/Raw UI Reference",
  component: SecuritySphereReferencePreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof SecuritySphereReferencePreview>

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => <SecuritySphereReferencePreview />,
}

export const WebsiteHeader: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <SecuritySphereHeaderReference />,
}

export const WebsiteCards: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <SecuritySphereWebsiteReference />,
}

export const AdminListView: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <SecuritySphereAdminListReference />,
}

export const AdminFormShell: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <SecuritySphereFormShellReference />,
}

export const FileUploadStates: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <SecuritySphereFileUploadReference />,
}
