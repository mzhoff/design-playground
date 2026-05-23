export type ProviderConnectionState =
  | "loading"
  | "disconnected"
  | "connecting"
  | "connected"
  | "saving"
  | "error"

export type SettingsSectionId = "user" | "administration" | "integrations"

export type SettingsSectionItem = {
  id: SettingsSectionId
  title: string
  description: string
}

export type ProviderMetric = {
  id: string
  label: string
  value: string
  tone?: "neutral" | "success" | "warning" | "danger"
  hint?: string
}

export type ProviderModelOption = {
  id: string
  label: string
  description?: string
}

export type ProviderSettingsField = {
  id: string
  label: string
  kind: "select" | "textarea"
  value: string
  options?: ProviderModelOption[]
  rows?: number
}

export type ProviderConnectionFixture = {
  providerName: string
  providerDescription: string
  state: ProviderConnectionState
  connected: boolean
  expanded: boolean
  maskedCredential?: string
  message?: string
  error?: string
  checkedAt?: string
  sections: SettingsSectionItem[]
  activeSection: SettingsSectionId
  credentialPlaceholder: string
  fields: ProviderSettingsField[]
  metrics: ProviderMetric[]
}

export type SettingsProviderPreviewProps = {
  fixture?: ProviderConnectionFixture
}
