"use client"

import { useState } from "react"
import { ChatComposer } from "./chat-composer"
import { ChatMessageItem } from "./chat-message-item"
import {
  chatAssistantMessagesFixture,
  chatAssistantModelsFixture,
  chatAssistantTasksFixture,
} from "./fixtures"
import type { ChatAssistantMode } from "./types"

const modes: ChatAssistantMode[] = [
  "general-chat",
  "knowledge-base",
  "product-copilot",
  "mcp-agent",
  "image-generation",
  "document-assistant",
  "debug",
]

export function ChatAssistantShell() {
  const [mode, setMode] = useState<ChatAssistantMode>("product-copilot")

  return (
    <div className="grid h-[820px] grid-cols-[280px_minmax(0,1fr)_300px] overflow-hidden rounded-[32px] border border-slate-200 bg-slate-100 shadow-2xl shadow-slate-950/10">
      <aside className="border-r border-slate-200 bg-white p-4">
        <div className="mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
            ChatModule source
          </p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Assistant shell</h2>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Appearance, modes, models and semantic blocks are UI contracts. Backend orchestration
            stays outside.
          </p>
        </div>
        <div className="space-y-2">
          {modes.map((item) => (
            <button
              className={`w-full rounded-2xl px-3 py-2.5 text-left text-sm font-semibold transition-colors ${item === mode ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-slate-100"}`}
              key={item}
              onClick={() => setMode(item)}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </aside>
      <main className="flex min-h-0 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/70 px-6 backdrop-blur">
          <div>
            <div className="text-sm font-semibold text-slate-950">Product copilot conversation</div>
            <div className="mt-1 text-xs text-slate-400">
              fullscreen/page-level assistant preview
            </div>
          </div>
          <div className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            stream ready
          </div>
        </header>
        <div className="min-h-0 flex-1 space-y-6 overflow-auto p-6">
          {chatAssistantMessagesFixture.map((message) => (
            <ChatMessageItem key={message.id} message={message} />
          ))}
        </div>
        <div className="shrink-0 p-5">
          <ChatComposer
            attachments={chatAssistantMessagesFixture[0]?.attachments}
            mode={mode}
            models={chatAssistantModelsFixture}
          />
        </div>
      </main>
      <aside className="border-l border-slate-200 bg-white p-4">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">Task panel</p>
        <div className="mt-4 space-y-3">
          {chatAssistantTasksFixture.map((task) => (
            <div className="rounded-2xl border border-slate-200 p-3" key={task.id}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-800">{task.title}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                  {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 rounded-[24px] bg-slate-950 p-4 text-white">
          <div className="text-sm font-semibold">Compact panel reference</div>
          <p className="mt-2 text-sm leading-6 text-white/60">
            REVERIE prototype gives launcher UX. Resizable mode will use panel layout from INV-08.
          </p>
        </div>
      </aside>
    </div>
  )
}

export function ChatAssistantCompactPanel() {
  return (
    <div className="w-[380px] overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-2xl shadow-slate-950/15">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div>
          <div className="text-sm font-semibold text-slate-950">Assistant</div>
          <div className="text-xs text-slate-400">compact floating panel</div>
        </div>
        <button
          className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500"
          type="button"
        >
          Close
        </button>
      </div>
      <div className="space-y-4 bg-slate-50 p-4">
        {chatAssistantMessagesFixture.slice(0, 2).map((message) => (
          <ChatMessageItem key={message.id} message={message} />
        ))}
      </div>
      <div className="p-3">
        <ChatComposer mode="general-chat" models={chatAssistantModelsFixture} />
      </div>
    </div>
  )
}
