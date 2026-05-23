"use client"

import type { ReactNode, PointerEvent as ReactPointerEvent } from "react"
import { useMemo, useState } from "react"
import {
  editorWorkspaceCatalogFixture,
  editorWorkspaceInspectorFixture,
  editorWorkspacePanesFixture,
} from "./fixtures"
import type {
  EditorWorkspaceCatalogGroup,
  EditorWorkspaceInspectorSection,
  EditorWorkspacePane,
} from "./types"

function DockButton({
  active,
  children,
  onClick,
}: {
  active?: boolean
  children: ReactNode
  onClick?: () => void
}) {
  return (
    <button
      className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
        active ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-white hover:text-slate-950"
      }`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  )
}

function DockTabs({ pane }: { pane: EditorWorkspacePane }) {
  return (
    <div className="flex min-w-0 items-center gap-1 overflow-x-auto">
      {pane.tabs.map((tab) => (
        <button
          className={`flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
            tab.id === pane.activeTabId
              ? "bg-white text-slate-950 shadow-sm"
              : "text-slate-500 hover:bg-white/70 hover:text-slate-900"
          }`}
          data-tab-id={tab.id}
          key={tab.id}
          type="button"
        >
          {tab.title}
          {tab.badge ? (
            <span className="rounded-full bg-slate-200 px-1.5 text-[10px] text-slate-500">
              {tab.badge}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  )
}

function DockPane({
  pane,
  children,
  headerAction,
}: {
  pane: EditorWorkspacePane
  children: ReactNode
  headerAction?: ReactNode
}) {
  return (
    <section
      className="flex min-h-0 flex-col overflow-hidden rounded-[14px] border border-white bg-[#f8f8f9] shadow-sm"
      data-window-id={pane.id}
    >
      <div className="flex h-12 shrink-0 items-center justify-between gap-2 border-b border-[#e6e7e9] px-2">
        <DockTabs pane={pane} />
        {headerAction ?? (
          <button
            aria-label={`${pane.title} menu`}
            className="rounded-lg px-2 py-1 text-slate-400 hover:bg-white hover:text-slate-800"
            type="button"
          >
            •••
          </button>
        )}
      </div>
      <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
    </section>
  )
}

function ProjectPane({ pane }: { pane: EditorWorkspacePane }) {
  return (
    <DockPane pane={pane}>
      <div className="flex h-full flex-col">
        <div className="border-b border-[#e6e7e9] px-4 py-4">
          <h2 className="truncate text-sm font-semibold text-slate-950">{pane.subtitle}</h2>
          <p className="mt-1 text-xs text-slate-400">Saved · local preview</p>
        </div>
        <div className="space-y-2 overflow-auto p-3">
          {["Campaign brief", "Scenes", "Assets", "Automation", "Exports"].map((item, index) => (
            <button
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                index === 1 ? "bg-slate-950 text-white" : "text-slate-600 hover:bg-white"
              }`}
              key={item}
              type="button"
            >
              <span>{item}</span>
              <span className="text-xs opacity-50">{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </DockPane>
  )
}

function CatalogPane({
  pane,
  groups,
}: {
  pane: EditorWorkspacePane
  groups: EditorWorkspaceCatalogGroup[]
}) {
  return (
    <DockPane pane={pane}>
      <div className="flex h-full flex-col">
        <div className="border-b border-[#e6e7e9] p-3">
          <label className="sr-only" htmlFor="workspace-library-search">
            Search library
          </label>
          <input
            className="h-9 w-full rounded-lg border border-transparent bg-[#eeeff0] px-3 text-sm outline-none placeholder:text-slate-400 focus:border-slate-300"
            id="workspace-library-search"
            placeholder="Find asset..."
            readOnly
            value=""
          />
        </div>
        <div className="space-y-4 overflow-auto p-3">
          {groups.map((group) => (
            <div key={group.id}>
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  {group.title}
                </span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold text-slate-500">
                  {group.count}
                </span>
              </div>
              <div className="space-y-1.5">
                {group.rows.map((row) => (
                  <button
                    className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
                      row.selected
                        ? "border-slate-950 bg-white text-slate-950 shadow-sm"
                        : "border-transparent text-slate-600 hover:bg-white"
                    }`}
                    key={row.id}
                    type="button"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-medium">{row.title}</span>
                      {row.meta ? (
                        <span className="block text-xs text-slate-400">{row.meta}</span>
                      ) : null}
                    </span>
                    {row.badge ? (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                        {row.badge}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DockPane>
  )
}

function CanvasPane({
  pane,
  maximized,
  onToggleMaximized,
}: {
  pane: EditorWorkspacePane
  maximized: boolean
  onToggleMaximized: () => void
}) {
  return (
    <DockPane
      pane={pane}
      headerAction={
        <DockButton active={maximized} onClick={onToggleMaximized}>
          {maximized ? "Restore" : "Max"}
        </DockButton>
      }
    >
      <div className="relative h-full overflow-hidden bg-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(71,85,105,0.18)_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="absolute left-[12%] top-[18%] w-64 rounded-[28px] border border-white bg-white p-5 shadow-xl shadow-slate-900/10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Scene</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-950">Opening hook</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            Reusable canvas slot. Domain adapter will decide whether this is SQL table, clip, scene
            or workflow card.
          </p>
        </div>
        <div className="absolute left-[48%] top-[38%] w-72 rounded-[28px] border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">Automation</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-950">Generate assets</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This pane intentionally stays generic before Figma pass.
          </p>
        </div>
      </div>
    </DockPane>
  )
}

function BehaviorPane({
  pane,
  bottomSize,
  onResizeStart,
}: {
  pane: EditorWorkspacePane
  bottomSize: number
  onResizeStart: (event: ReactPointerEvent<HTMLButtonElement>) => void
}) {
  return (
    <DockPane
      pane={pane}
      headerAction={
        <button
          aria-label="Resize bottom panel"
          className="h-7 w-16 cursor-row-resize rounded-lg bg-slate-200 text-[10px] font-semibold text-slate-500 hover:bg-slate-300"
          onPointerDown={onResizeStart}
          type="button"
        >
          {bottomSize}%
        </button>
      }
    >
      <div className="grid h-full grid-cols-[160px_1fr] gap-3 p-3">
        <div className="rounded-2xl bg-white p-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">Tracks</p>
          <div className="mt-3 space-y-2">
            {["Voice", "B-roll", "Captions"].map((track) => (
              <div
                className="rounded-xl bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-600"
                key={track}
              >
                {track}
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-white p-3">
          <div className="grid h-full grid-cols-4 gap-2">
            {["Hook", "Problem", "Solution", "CTA"].map((clip, index) => (
              <div
                className="rounded-xl bg-slate-950 px-3 py-3 text-xs font-semibold text-white"
                key={clip}
                style={{ opacity: 1 - index * 0.12 }}
              >
                {clip}
              </div>
            ))}
          </div>
        </div>
      </div>
    </DockPane>
  )
}

function InspectorPane({
  pane,
  sections,
}: {
  pane: EditorWorkspacePane
  sections: EditorWorkspaceInspectorSection[]
}) {
  return (
    <DockPane pane={pane}>
      <div className="space-y-3 overflow-auto p-3">
        {sections.map((section) => (
          <section className="rounded-2xl border border-slate-100 bg-white p-3" key={section.id}>
            <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
              {section.title}
            </h3>
            <div className="mt-3 space-y-2">
              {section.fields.map((field) => (
                <label className="block" htmlFor={`editor-workspace-${field.id}`} key={field.id}>
                  <span className="mb-1 block text-xs font-semibold text-slate-500">
                    {field.label}
                  </span>
                  {field.kind === "textarea" ? (
                    <textarea
                      className="h-20 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-700 outline-none"
                      id={`editor-workspace-${field.id}`}
                      readOnly
                      value={field.value}
                    />
                  ) : (
                    <input
                      className="h-9 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-700 outline-none"
                      id={`editor-workspace-${field.id}`}
                      readOnly
                      value={field.value}
                    />
                  )}
                </label>
              ))}
            </div>
          </section>
        ))}
      </div>
    </DockPane>
  )
}

export function EditorWorkspacePreview() {
  const [leftVisible, setLeftVisible] = useState(true)
  const [rightVisible, setRightVisible] = useState(true)
  const [bottomVisible, setBottomVisible] = useState(true)
  const [canvasMaximized, setCanvasMaximized] = useState(false)
  const [bottomSize, setBottomSize] = useState(30)
  const panes = editorWorkspacePanesFixture

  const effectiveLeftVisible = leftVisible && !canvasMaximized
  const effectiveRightVisible = rightVisible && !canvasMaximized
  const effectiveBottomVisible = bottomVisible && !canvasMaximized
  const centerRows = useMemo(() => `${100 - bottomSize}% ${bottomSize}%`, [bottomSize])

  const handleBottomResizeStart = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || !effectiveBottomVisible) return
    event.preventDefault()
    const startY = event.clientY
    const startSize = bottomSize

    const handlePointerMove = (moveEvent: PointerEvent) => {
      const delta = ((startY - moveEvent.clientY) / 520) * 100
      setBottomSize(Math.max(19, Math.min(68, Math.round(startSize + delta))))
    }

    const handlePointerUp = () => {
      document.removeEventListener("pointermove", handlePointerMove)
      document.removeEventListener("pointerup", handlePointerUp)
    }

    document.addEventListener("pointermove", handlePointerMove)
    document.addEventListener("pointerup", handlePointerUp)
  }

  return (
    <div className="flex h-[820px] min-h-[720px] flex-col overflow-hidden rounded-[28px] bg-[#eeeff0] p-2 text-[#111827] shadow-2xl shadow-slate-950/10">
      <header className="flex h-11 shrink-0 items-center justify-between px-3 text-sm">
        <div className="flex items-center gap-7">
          <div className="flex h-8 w-12 items-center justify-center text-[24px] font-semibold leading-none text-[#2f3338]">{`{A}`}</div>
          <nav className="flex items-center gap-5">
            {["File", "Edit", "View", "Object", "Window"].map((item) => (
              <button
                className="text-xs font-medium text-[#8a919c] underline-offset-2 hover:text-black hover:underline"
                key={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <DockButton
            active={!effectiveLeftVisible}
            onClick={() => setLeftVisible((value) => !value)}
          >
            Left
          </DockButton>
          <DockButton
            active={!effectiveBottomVisible}
            onClick={() => setBottomVisible((value) => !value)}
          >
            Bottom
          </DockButton>
          <DockButton
            active={!effectiveRightVisible}
            onClick={() => setRightVisible((value) => !value)}
          >
            Right
          </DockButton>
          <DockButton
            active={canvasMaximized}
            onClick={() => setCanvasMaximized((value) => !value)}
          >
            Focus
          </DockButton>
          <div className="ml-1 flex size-8 items-center justify-center overflow-hidden rounded-full border border-white bg-gradient-to-br from-slate-200 via-slate-100 to-slate-400 text-[10px] font-bold text-slate-600">
            MP
          </div>
        </div>
      </header>
      <main
        className="grid min-h-0 flex-1 gap-2"
        style={{
          gridTemplateColumns: `${effectiveLeftVisible ? "minmax(260px, 18.7%)" : "0"} minmax(360px, 1fr) ${effectiveRightVisible ? "minmax(280px, 25.8%)" : "0"}`,
        }}
      >
        <div
          className={`grid min-h-0 gap-2 overflow-hidden transition-[width,opacity] ${effectiveLeftVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
          style={{ gridTemplateRows: "47% 53%" }}
        >
          <ProjectPane pane={panes.project} />
          <CatalogPane groups={editorWorkspaceCatalogFixture} pane={panes.library} />
        </div>
        <div
          className="grid min-h-0 gap-2"
          style={{ gridTemplateRows: effectiveBottomVisible ? centerRows : "1fr 0" }}
        >
          <CanvasPane
            maximized={canvasMaximized}
            onToggleMaximized={() => setCanvasMaximized((value) => !value)}
            pane={panes.canvas}
          />
          <div
            className={`min-h-0 overflow-hidden transition-opacity ${effectiveBottomVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
          >
            <BehaviorPane
              bottomSize={bottomSize}
              onResizeStart={handleBottomResizeStart}
              pane={panes.behavior}
            />
          </div>
        </div>
        <div
          className={`min-h-0 overflow-hidden transition-opacity ${effectiveRightVisible ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <InspectorPane pane={panes.inspector} sections={editorWorkspaceInspectorFixture} />
        </div>
      </main>
    </div>
  )
}
