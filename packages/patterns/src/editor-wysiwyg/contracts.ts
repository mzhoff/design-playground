export type EditorWysiwygMode = "article" | "field" | "content-production"

export type EditorPlatform = "blog" | "telegram" | "vk" | "instagram" | "email"

export type EditorPanelId = "meta" | "ai" | "images" | "annotations" | "versions"

export type EditorToolbarAction = {
  id: string
  label: string
  group: "format" | "insert" | "ai" | "structure"
  shortcut?: string
  disabled?: boolean
}

export type EditorContentBlock = {
  id: string
  kind: "heading" | "paragraph" | "quote" | "list" | "image" | "divider"
  label: string
  content: string
  selected?: boolean
  meta?: string
}

export type EditorImageAsset = {
  id: string
  title: string
  ratio: string
  source: "upload" | "generated" | "library"
  status: "ready" | "generating" | "error"
  prompt?: string
}

export type EditorAnnotation = {
  id: string
  title: string
  anchor: string
  body: string
  status: "draft" | "published" | "needs-review"
}

export type EditorVersion = {
  id: string
  title: string
  createdAt: string
  author: string
  status: "current" | "saved" | "generated"
}

export type EditorWysiwygFixture = {
  title: string
  subtitle: string
  mode: EditorWysiwygMode
  platform: EditorPlatform
  status: string
  counters: {
    characters: number
    words: number
    limit?: number
  }
  toolbar: EditorToolbarAction[]
  blocks: EditorContentBlock[]
  images: EditorImageAsset[]
  annotations: EditorAnnotation[]
  versions: EditorVersion[]
  activePanels: EditorPanelId[]
}

export type EditorWysiwygPreviewProps = {
  fixture?: EditorWysiwygFixture
  defaultPanel?: EditorPanelId
}
