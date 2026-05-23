import { ChatAssistantCompactPanel, ChatAssistantShell } from "./chat-assistant-shell"

export function ChatAssistantPreview() {
  return (
    <div className="min-h-[960px] bg-slate-950 p-8">
      <ChatAssistantShell />
      <div className="mt-8 flex justify-end">
        <ChatAssistantCompactPanel />
      </div>
    </div>
  )
}
