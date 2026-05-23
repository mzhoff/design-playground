export type WorkflowStatus =
  | "idea"
  | "draft"
  | "generating"
  | "in_progress"
  | "review"
  | "approval"
  | "ready"
  | "scheduled"
  | "publishing"
  | "published"
  | "archived"
  | "failed"

export type WorkflowChannel =
  | "telegram"
  | "vk"
  | "instagram"
  | "email"
  | "blog"
  | "youtube"
  | "dzen"
  | "vc"

export type ContentFormat = "post" | "article" | "thread" | "email" | "video" | "carousel" | "story"

export interface ContentWorkflowItem {
  id: string
  title: string
  summary: string
  status: WorkflowStatus
  channel: WorkflowChannel
  format: ContentFormat
  audience: string
  topic: string
  sprint?: string
  scheduledAt?: string
  publishedAt?: string
  versionCount: number
  generationProgress?: number
}

export interface WorkflowColumn {
  id: string
  title: string
  statuses: WorkflowStatus[]
  description?: string
}

export type FunnelStage =
  | "awareness"
  | "consideration"
  | "intent"
  | "evaluation"
  | "engagement"
  | "purchase"
  | "retention"

export interface TopicPlanningStage {
  id: FunnelStage
  title: string
  group: "discovery" | "trust" | "conversion" | "lifecycle"
  color: string
}

export interface TopicPlanningItem {
  id: string
  title: string
  stage: FunnelStage
  goal: string
  source: string
  score: number
}

export interface EditorVersionSnapshot {
  id: string
  label: string
  model: string
  createdAt: string
  inputTokens: number
  outputTokens: number
  isActive?: boolean
}

export interface ChannelProfile {
  id: string
  name: string
  platform: WorkflowChannel
  handle: string
  bestTime: string
  postingFrequency: string
  strategicGoal: string
  constraints: string[]
}

export type GenerationState = "idle" | "processing" | "success" | "failed" | "streaming"

export interface GenerationAction {
  id: string
  title: string
  description: string
  category: "rewrite" | "transform" | "generate"
  state?: GenerationState
}

export interface ProviderPreviewData {
  provider: WorkflowChannel
  channelName: string
  title: string
  text: string
  imageTone?: string
}

export interface CalendarEventItem {
  id: string
  day: string
  time: string
  title: string
  channel: WorkflowChannel
  status: WorkflowStatus
}

export interface MediaAssetItem {
  id: string
  filename: string
  type: "image" | "video" | "document"
  usageCount: number
  usages: string[]
  tone: string
}

export interface BrandContextSection {
  id: string
  title: string
  body: string
  type: "positioning" | "audience" | "product" | "competitor"
}
