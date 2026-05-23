"use client"

import { useState } from "react"
import type { ChatAssistantAttachment, ChatAssistantMode, ChatAssistantModelOption } from "./types"

export function ChatComposer({
  models,
  mode,
  attachments = [],
}: {
  models: ChatAssistantModelOption[]
  mode: ChatAssistantMode
  attachments?: ChatAssistantAttachment[]
}) {
  const [value, setValue] = useState("Собери для клиента быстрый preview этого интерфейса")
  const activeModel = models[1] ?? models[0]

  return (
    <form
      className="rounded-[28px] border border-slate-200 bg-white p-3 shadow-2xl shadow-slate-950/10"
      onSubmit={(event) => event.preventDefault()}
    >
      {attachments.length ? (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((attachment) => (
            <span
              className="rounded-2xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
              key={attachment.id}
            >
              {attachment.name}{" "}
              {attachment.sizeLabel ? (
                <span className="text-slate-400">{attachment.sizeLabel}</span>
              ) : null}
            </span>
          ))}
        </div>
      ) : null}
      <label className="sr-only" htmlFor="chat-assistant-composer">
        Message
      </label>
      <textarea
        className="min-h-24 w-full resize-none rounded-2xl bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-800 outline-none placeholder:text-slate-400"
        id="chat-assistant-composer"
        onChange={(event) => setValue(event.target.value)}
        placeholder="Ask assistant..."
        value={value}
      />
      <div className="mt-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <button
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500"
            type="button"
          >
            Attach
          </button>
          <button
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-500"
            type="button"
          >
            / commands
          </button>
          <span className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-500">
            {mode}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
            type="button"
          >
            {activeModel?.label ?? "Model"}
          </button>
          <button
            className="rounded-xl bg-slate-950 px-4 py-2 text-xs font-semibold text-white"
            type="submit"
          >
            Send
          </button>
        </div>
      </div>
    </form>
  )
}
