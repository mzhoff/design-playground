import type { ReactNode } from "react"
import { DashboardSchemaPreview } from "./schema-preview"
import type { DashboardCardAction, DashboardCardData, DashboardCardMetric } from "./types"

function toneClass(tone: DashboardCardMetric["tone"]) {
  if (tone === "success") return "text-emerald-600 bg-emerald-50"
  if (tone === "warning") return "text-amber-700 bg-amber-50"
  if (tone === "danger") return "text-rose-600 bg-rose-50"
  return "text-slate-500 bg-slate-100"
}

function CardActionButton({ action }: { action: DashboardCardAction }) {
  return (
    <button
      className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
        action.tone === "danger"
          ? "text-rose-600 hover:bg-rose-50"
          : "text-slate-500 hover:bg-slate-100 hover:text-slate-950"
      }`}
      type="button"
    >
      {action.label}
    </button>
  )
}

export function DashboardCard({ card }: { card: DashboardCardData }) {
  const hasPreview = Boolean(card.imageSrc || card.previewNodes?.length)
  const isMetric = card.variant === "metric" || Boolean(card.metrics?.length)

  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border bg-white transition-all hover:border-slate-300 hover:shadow-xl hover:shadow-slate-950/8 ${card.selected ? "border-slate-950 ring-4 ring-slate-950/5" : "border-slate-200"}`}
    >
      {hasPreview ? (
        <div className="border-b border-slate-100 p-3">
          {card.imageSrc ? (
            <img
              alt={`${card.title} preview`}
              className="h-[158px] w-full rounded-xl object-cover"
              src={card.imageSrc}
            />
          ) : (
            <DashboardSchemaPreview edges={card.previewEdges} nodes={card.previewNodes} />
          )}
        </div>
      ) : null}
      <div className="p-4">
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            {card.eyebrow ? (
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-slate-400">
                {card.eyebrow}
              </p>
            ) : null}
            <h3 className="mt-1 truncate text-sm font-semibold text-slate-950">{card.title}</h3>
            {card.description ? (
              <p className="mt-1 truncate text-xs text-slate-500">{card.description}</p>
            ) : null}
          </div>
          {card.badge ? (
            <span className="rounded-full bg-slate-950 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white">
              {card.badge}
            </span>
          ) : null}
        </div>
        {isMetric ? (
          <div className="grid grid-cols-2 gap-2">
            {card.metrics?.map((metric) => (
              <div className="rounded-2xl bg-slate-50 p-3" key={metric.label}>
                <div className="text-2xl font-semibold text-slate-950">{metric.value}</div>
                <div className="mt-1 text-xs font-medium text-slate-500">{metric.label}</div>
                {metric.delta ? (
                  <div
                    className={`mt-2 inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${toneClass(metric.tone)}`}
                  >
                    {metric.delta}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        ) : null}
        {card.meta?.length ? (
          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
            {card.meta.map((item) => (
              <span className="rounded-full bg-slate-100 px-2.5 py-1" key={item.label}>
                {item.label}: <strong className="font-semibold text-slate-700">{item.value}</strong>
              </span>
            ))}
          </div>
        ) : null}
        {card.actions?.length ? (
          <div className="mt-4 flex flex-wrap gap-1 opacity-70 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            {card.actions.map((action) => (
              <CardActionButton action={action} key={action.id} />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  )
}

export function CreateDashboardCard({
  title = "New project",
  description = "Create reusable workspace",
}: {
  title?: string
  description?: string
}) {
  return (
    <button
      className="group flex min-h-[258px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white text-center transition-colors hover:border-slate-950 hover:bg-slate-50"
      type="button"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-light text-slate-400 transition-colors group-hover:bg-slate-950 group-hover:text-white">
        +
      </span>
      <span className="mt-4 text-sm font-semibold text-slate-950">{title}</span>
      <span className="mt-1 text-xs text-slate-500">{description}</span>
    </button>
  )
}

export function DashboardEmptyState({
  title = "No cards yet",
  description = "Create or import a document to fill this dashboard.",
  actions,
}: {
  title?: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-white px-8 py-12 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-light text-slate-400">
        +
      </div>
      <h3 className="mt-5 text-base font-semibold text-slate-950">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">{description}</p>
      {actions ? <div className="mt-6 flex justify-center gap-2">{actions}</div> : null}
    </div>
  )
}
