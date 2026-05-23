export type ChatAssistantRole = "user" | "assistant" | "system" | "tool"
export type ChatAssistantMode =
  | "general-chat"
  | "knowledge-base"
  | "product-copilot"
  | "mcp-agent"
  | "image-generation"
  | "document-assistant"
  | "debug"

export interface ChatAssistantAttachment {
  id: string
  kind: "image" | "document" | "file"
  name: string
  sizeLabel?: string
  url?: string
}

export type ChatAssistantBlock =
  | { id: string; type: "text" | "markdown"; content: string }
  | {
      id: string
      type: "banner"
      title: string
      description?: string
      tone?: "info" | "success" | "warning" | "danger"
    }
  | { id: string; type: "card"; title: string; description?: string; actions?: string[] }
  | {
      id: string
      type: "tool-status"
      title: string
      status: "pending" | "running" | "done" | "error"
      description?: string
    }
  | { id: string; type: "table"; columns: string[]; rows: string[][] }
  | { id: string; type: "image"; title: string; description?: string }

export interface ChatAssistantMessage {
  id: string
  role: ChatAssistantRole
  author: string
  createdAt: string
  blocks: ChatAssistantBlock[]
  attachments?: ChatAssistantAttachment[]
  status?: "sent" | "streaming" | "error"
  suggestedActions?: string[]
}

export interface ChatAssistantModelOption {
  id: string
  label: string
  description?: string
}

export interface ChatAssistantTask {
  id: string
  title: string
  status: "pending" | "running" | "done"
}
