import type { ChatAssistantBlock, ChatAssistantMessage } from "./types"

function blockToneClass(tone?: "info" | "success" | "warning" | "danger") {
  if (tone === "success") return "border-emerald-200 bg-emerald-50 text-emerald-900"
  if (tone === "warning") return "border-amber-200 bg-amber-50 text-amber-900"
  if (tone === "danger") return "border-rose-200 bg-rose-50 text-rose-900"
  return "border-sky-200 bg-sky-50 text-sky-900"
}

function statusClass(status: "pending" | "running" | "done" | "error") {
  if (status === "done") return "bg-emerald-500"
  if (status === "running") return "bg-blue-500"
  if (status === "error") return "bg-rose-500"
  return "bg-slate-300"
}

function ChatBlockRenderer({ block }: { block: ChatAssistantBlock }) {
  if (block.type === "text" || block.type === "markdown") {
    return <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{block.content}</p>
  }

  if (block.type === "banner") {
    return (
      <div className={`rounded-2xl border px-4 py-3 text-sm ${blockToneClass(block.tone)}`}>
        <div className="font-semibold">{block.title}</div>
        {block.description ? (
          <div className="mt-1 text-sm opacity-75">{block.description}</div>
        ) : null}
      </div>
    )
  }

  if (block.type === "tool-status") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <span className={`size-2 rounded-full ${statusClass(block.status)}`} />
          {block.title}
        </div>
        {block.description ? <div className="mt-1 text-slate-500">{block.description}</div> : null}
      </div>
    )
  }

  if (block.type === "card") {
    return (
      <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-sm font-semibold text-slate-950">{block.title}</div>
        {block.description ? (
          <div className="mt-2 text-sm leading-6 text-slate-500">{block.description}</div>
        ) : null}
        {block.actions?.length ? (
          <div className="mt-3 flex flex-wrap gap-2">
            {block.actions.map((action) => (
              <button
                className="rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-600"
                key={action}
                type="button"
              >
                {action}
              </button>
            ))}
          </div>
        ) : null}
      </div>
    )
  }

  if (block.type === "table") {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-sm">
        <table className="w-full border-collapse">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-[0.12em] text-slate-400">
            <tr>
              {block.columns.map((column) => (
                <th className="px-3 py-2" key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, index) => (
              <tr className="border-t border-slate-100" key={`${block.id}-${index}`}>
                {row.map((cell) => (
                  <td className="px-3 py-2 text-slate-600" key={cell}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (block.type === "image") {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 text-sm text-slate-500">
        <div className="font-semibold text-slate-700">{block.title}</div>
        {block.description ? <div className="mt-1">{block.description}</div> : null}
      </div>
    )
  }

  return null
}

export function ChatMessageItem({ message }: { message: ChatAssistantMessage }) {
  const isUser = message.role === "user"

  return (
    <article className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`flex size-9 shrink-0 items-center justify-center rounded-2xl text-xs font-bold ${isUser ? "bg-slate-950 text-white" : "bg-white text-slate-700 shadow-sm"}`}
      >
        {isUser ? "U" : "AI"}
      </div>
      <div className={`max-w-[760px] min-w-0 ${isUser ? "items-end" : "items-start"}`}>
        <div
          className={`mb-1 flex items-center gap-2 text-xs text-slate-400 ${isUser ? "justify-end" : "justify-start"}`}
        >
          <span>{message.author}</span>
          <span>{message.createdAt}</span>
          {message.status === "streaming" ? (
            <span className="rounded-full bg-blue-50 px-2 py-0.5 font-semibold text-blue-600">
              streaming
            </span>
          ) : null}
        </div>
        <div
          className={`space-y-3 rounded-[24px] p-4 ${isUser ? "bg-slate-950 text-white" : "bg-slate-50"}`}
        >
          {message.attachments?.length ? (
            <div className="flex flex-wrap gap-2">
              {message.attachments.map((attachment) => (
                <span
                  className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold"
                  key={attachment.id}
                >
                  {attachment.name}
                  {attachment.sizeLabel ? ` · ${attachment.sizeLabel}` : ""}
                </span>
              ))}
            </div>
          ) : null}
          {message.blocks.map((block) => (
            <ChatBlockRenderer block={block} key={block.id} />
          ))}
          {message.suggestedActions?.length ? (
            <div className="flex flex-wrap gap-2 pt-1">
              {message.suggestedActions.map((action) => (
                <button
                  className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600"
                  key={action}
                  type="button"
                >
                  {action}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  )
}
