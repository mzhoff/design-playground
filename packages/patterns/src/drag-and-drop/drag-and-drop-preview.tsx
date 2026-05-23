"use client"

import { useMemo, useState } from "react"
import type { DragAndDropFixture, DragAndDropPreviewProps } from "./contracts"
import { dragAndDropMock } from "./mock-data"
import { moveArrayItem, useReorderableDragList } from "./use-reorderable-drag-list"

export function DragAndDropPreview({ fixture = dragAndDropMock }: DragAndDropPreviewProps) {
  const [itemOrder, setItemOrder] = useState(() => fixture.items.map((item) => item.id))
  const [lastCommit, setLastCommit] = useState("Ожидаем drag/drop")
  const itemById = useMemo(
    () => new Map(fixture.items.map((item) => [item.id, item])),
    [fixture.items],
  )
  const orderedItems = itemOrder.map((id) => itemById.get(id)).filter(Boolean)
  const dnd = useReorderableDragList({
    enabled: fixture.enabled,
    itemIds: itemOrder,
    onCommit(fromIndex, toIndex) {
      setItemOrder((current) => moveArrayItem(current, fromIndex, toIndex))
      setLastCommit(`commit from ${fromIndex} to ${toIndex}`)
    },
  })
  const renderedItems = dnd.renderedIds.map((id) => itemById.get(id)).filter(Boolean)

  return (
    <section className="min-h-[720px] rounded-[28px] border border-zinc-200 bg-[#f4f1ea] p-5 text-zinc-950 shadow-sm">
      <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
        <main className="rounded-[28px] border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/5">
          <header className="border-b border-zinc-200 pb-5">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Interaction / Drag and Drop
            </span>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.05em]">{fixture.title}</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-500">{fixture.description}</p>
          </header>

          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-zinc-800">Live reorder preview</div>
                  <div className="text-xs text-zinc-500">{lastCommit}</div>
                </div>
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-500">
                  {dnd.isDragging ? "dragging" : "idle"}
                </span>
              </div>
              <ul className="flex flex-col gap-2" aria-label="Sortable items">
                {renderedItems.map((item, index) => {
                  if (!item) {
                    return null
                  }

                  const source = dnd.draggingItemId === item.id
                  const target = dnd.dragOverIndex === index
                  const canDrag = fixture.enabled && !item.locked

                  return (
                    <li key={item.id}>
                      <button
                        aria-disabled={!canDrag}
                        className={itemClassName({
                          source,
                          target,
                          dimmed: dnd.isDragging && !source,
                        })}
                        draggable={canDrag}
                        type="button"
                        onDragEnd={dnd.handleDragEnd}
                        onDragLeave={dnd.handleDragLeave}
                        onDragOver={(event) =>
                          dnd.handleDragOver({ event, index, itemId: item.id })
                        }
                        onDragStart={(event) =>
                          dnd.handleDragStart({ event, index, itemId: item.id })
                        }
                        onDrop={(event) => dnd.handleDrop({ event })}
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-zinc-100 text-xs font-semibold text-zinc-500">
                          {item.badge ?? index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{item.label}</span>
                          <span className="block truncate text-xs text-zinc-500">
                            {item.description}
                          </span>
                        </span>
                        <span
                          className={`text-xs font-semibold ${canDrag ? "text-zinc-500" : "text-zinc-300"}`}
                        >
                          {canDrag ? "grip" : "locked"}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 rounded-2xl bg-zinc-100 p-3 text-xs leading-5 text-zinc-500">
                Исходный порядок: {orderedItems.map((item) => item?.label).join(" → ")}
              </div>
            </div>

            <GroupMovePreview fixture={fixture} />
          </div>
        </main>

        <aside className="flex flex-col gap-4 rounded-[28px] border border-zinc-200 bg-white p-5 shadow-xl shadow-zinc-950/5">
          <InfoPanel title="Smoke scenarios" items={fixture.smokeScenarios} />
          <InfoPanel title="Accessibility debt" items={fixture.accessibilityDebt} />
        </aside>
      </div>
    </section>
  )
}

function GroupMovePreview({ fixture }: { fixture: DragAndDropFixture }) {
  return (
    <section className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-4">
      <div className="text-sm font-semibold text-zinc-800">Sidebar/domain adapter reference</div>
      <p className="mt-1 text-xs leading-5 text-zinc-500">
        В prodSQL этот слой отвечает за группы, table-to-domain move, pending confirmation и
        восстановление collapsed state.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        {fixture.groups.map((group) => (
          <div
            className={`rounded-2xl border bg-white p-3 ${group.locked ? "border-zinc-200 opacity-60" : "border-zinc-200"}`}
            key={group.id}
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-zinc-900">{group.label}</div>
                <div className="text-xs text-zinc-500">{group.description}</div>
              </div>
              <span className="text-xs font-semibold text-zinc-400">
                {group.locked ? "locked" : "group grip"}
              </span>
            </div>
            <div className="mt-3 flex flex-col gap-1 border-l border-zinc-200 pl-3">
              {group.items.map((item) => (
                <div className="rounded-xl px-3 py-2 text-sm text-zinc-600" key={item.id}>
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 rounded-2xl border border-dashed border-blue-300 bg-blue-50 p-3 text-xs font-semibold text-blue-700">
        Pending move: drop to another group should open confirm dialog, not commit immediately.
      </div>
    </section>
  )
}

function InfoPanel({ items, title }: { items: string[]; title: string }) {
  return (
    <section className="rounded-2xl bg-zinc-100 p-4">
      <h3 className="text-sm font-semibold text-zinc-800">{title}</h3>
      <ul className="mt-3 flex flex-col gap-2 text-sm leading-6 text-zinc-600">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  )
}

function itemClassName({
  dimmed,
  source,
  target,
}: {
  dimmed: boolean
  source: boolean
  target: boolean
}) {
  const base = "flex w-full items-center gap-3 rounded-2xl border bg-white p-3 text-left transition"

  if (source) {
    return `${base} border-blue-300 bg-blue-50 text-zinc-950 ring-1 ring-blue-300`
  }

  if (target) {
    return `${base} border-blue-300 ring-2 ring-blue-300`
  }

  if (dimmed) {
    return `${base} border-zinc-200 opacity-55`
  }

  return `${base} border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50`
}
