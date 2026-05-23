"use client"

import { useMemo, useState } from "react"
import type {
  EditorAnnotation,
  EditorContentBlock,
  EditorImageAsset,
  EditorPanelId,
  EditorToolbarAction,
  EditorVersion,
  EditorWysiwygPreviewProps,
} from "./contracts"
import { editorWysiwygMock } from "./mock-data"

const panelLabels: Record<EditorPanelId, string> = {
  meta: "Мета",
  ai: "AI",
  images: "Изображения",
  annotations: "Аннотации",
  versions: "Версии",
}

export function EditorWysiwygPreview({
  fixture = editorWysiwygMock,
  defaultPanel = "ai",
}: EditorWysiwygPreviewProps) {
  const [activePanel, setActivePanel] = useState<EditorPanelId>(defaultPanel)
  const [selectedAction, setSelectedAction] = useState<string>("annotate")
  const [selectedBlockId, setSelectedBlockId] = useState<string>(
    fixture.blocks.find((block) => block.selected)?.id ?? fixture.blocks[0]?.id ?? "",
  )
  const selectedBlock = useMemo(
    () => fixture.blocks.find((block) => block.id === selectedBlockId),
    [fixture.blocks, selectedBlockId],
  )

  return (
    <section className="min-h-[760px] rounded-[28px] border border-zinc-200 bg-[#f3f1ec] p-4 text-zinc-950 shadow-sm">
      <div className="flex min-h-[728px] flex-col overflow-hidden rounded-[22px] border border-zinc-200 bg-zinc-50 shadow-xl shadow-zinc-950/5">
        <EditorHeader status={fixture.status} subtitle={fixture.subtitle} title={fixture.title} />
        <div className="flex flex-1 flex-col bg-[#efede7] lg:flex-row">
          <main className="flex min-w-0 flex-1 flex-col gap-4 p-4 lg:p-6">
            <EditorModeBar
              characters={fixture.counters.characters}
              limit={fixture.counters.limit}
              mode={fixture.mode}
              platform={fixture.platform}
              words={fixture.counters.words}
            />
            <article className="relative flex-1 overflow-hidden rounded-[24px] border border-zinc-200 bg-white shadow-sm">
              <FloatingToolbar
                actions={fixture.toolbar}
                selectedAction={selectedAction}
                onSelectAction={setSelectedAction}
              />
              <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,1fr)_260px]">
                <div className="min-h-[520px] px-6 py-24 sm:px-10 lg:px-14">
                  <input
                    aria-label="Заголовок материала"
                    className="w-full border-none bg-transparent text-3xl font-semibold tracking-[-0.05em] outline-none sm:text-5xl"
                    defaultValue={fixture.title}
                  />
                  <div className="mt-8 flex flex-col gap-4">
                    {fixture.blocks.map((block) => (
                      <EditorBlockCard
                        block={block}
                        isSelected={block.id === selectedBlockId}
                        key={block.id}
                        onSelect={setSelectedBlockId}
                      />
                    ))}
                  </div>
                </div>
                <SlashMenuPreview />
              </div>
            </article>
          </main>
          <aside className="border-t border-zinc-200 bg-zinc-50 p-4 lg:w-[380px] lg:border-t-0 lg:border-l">
            <PanelTabs
              activePanel={activePanel}
              panels={fixture.activePanels}
              onChange={setActivePanel}
            />
            <div className="mt-4">
              {activePanel === "meta" ? <MetaPanel selectedBlock={selectedBlock} /> : null}
              {activePanel === "ai" ? <AiPanel selectedAction={selectedAction} /> : null}
              {activePanel === "images" ? <ImagesPanel images={fixture.images} /> : null}
              {activePanel === "annotations" ? (
                <AnnotationsPanel annotations={fixture.annotations} />
              ) : null}
              {activePanel === "versions" ? <VersionsPanel versions={fixture.versions} /> : null}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

function EditorHeader({
  status,
  subtitle,
  title,
}: {
  status: string
  subtitle: string
  title: string
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-zinc-200 bg-white/90 px-5 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-zinc-950 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            {status}
          </span>
          <span className="text-xs font-medium text-zinc-500">INV-02 raw import</span>
        </div>
        <h2 className="mt-2 truncate text-lg font-semibold tracking-[-0.03em]">{title}</h2>
        <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm"
          type="button"
        >
          Сохранить черновик
        </button>
        <button
          className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white shadow-sm"
          type="button"
        >
          Подготовить публикацию
        </button>
      </div>
    </header>
  )
}

function EditorModeBar({
  characters,
  limit,
  mode,
  platform,
  words,
}: {
  characters: number
  limit?: number
  mode: string
  platform: string
  words: number
}) {
  const progress = limit ? Math.min(100, Math.round((characters / limit) * 100)) : 0

  return (
    <div className="flex flex-col gap-3 rounded-[20px] border border-zinc-200 bg-white p-3 text-sm shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-[#e8e1d5] px-3 py-1 font-medium text-zinc-800">
          {mode}
        </span>
        <span className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-600">
          {platform}
        </span>
        <span className="text-zinc-500">{words} слов</span>
      </div>
      <div className="flex min-w-0 items-center gap-3 md:min-w-[260px]">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-200">
          <div className="h-full rounded-full bg-zinc-950" style={{ width: `${progress}%` }} />
        </div>
        <span className="whitespace-nowrap text-xs tabular-nums text-zinc-500">
          {characters}/{limit ?? "∞"}
        </span>
      </div>
    </div>
  )
}

function FloatingToolbar({
  actions,
  selectedAction,
  onSelectAction,
}: {
  actions: EditorToolbarAction[]
  selectedAction: string
  onSelectAction: (action: string) => void
}) {
  return (
    <div className="absolute top-5 left-1/2 z-10 flex max-w-[calc(100%-2rem)] -translate-x-1/2 flex-wrap justify-center gap-1 rounded-full border border-zinc-200 bg-white/95 p-1 shadow-xl shadow-zinc-950/10 backdrop-blur">
      {actions.map((action) => (
        <button
          aria-pressed={selectedAction === action.id}
          className={actionButtonClassName(action, selectedAction)}
          disabled={action.disabled}
          key={action.id}
          title={action.shortcut}
          type="button"
          onClick={() => onSelectAction(action.id)}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}

function actionButtonClassName(action: EditorToolbarAction, selectedAction: string) {
  const base =
    "rounded-full px-3 py-1.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-35"

  if (selectedAction === action.id) {
    return `${base} bg-zinc-950 text-white`
  }

  if (action.group === "ai") {
    return `${base} bg-[#efe5cf] text-zinc-800 hover:bg-[#e5d5b8]`
  }

  return `${base} text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950`
}

function EditorBlockCard({
  block,
  isSelected,
  onSelect,
}: {
  block: EditorContentBlock
  isSelected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <button
      aria-pressed={isSelected}
      className={`group grid w-full grid-cols-[28px_minmax(0,1fr)] gap-3 rounded-[18px] border p-4 text-left transition ${
        isSelected
          ? "border-zinc-950 bg-zinc-50 shadow-lg shadow-zinc-950/5"
          : "border-transparent bg-transparent hover:border-zinc-200 hover:bg-zinc-50"
      }`}
      type="button"
      onClick={() => onSelect(block.id)}
    >
      <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-500 group-hover:bg-zinc-200">
        {block.kind === "image" ? "IMG" : "::"}
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          {block.label}
        </span>
        <span className={blockTextClassName(block.kind)}>{block.content}</span>
        {block.meta ? <span className="mt-2 block text-xs text-zinc-500">{block.meta}</span> : null}
      </span>
    </button>
  )
}

function blockTextClassName(kind: EditorContentBlock["kind"]) {
  if (kind === "heading") {
    return "mt-2 block text-2xl font-semibold tracking-[-0.04em] text-zinc-950"
  }

  if (kind === "quote") {
    return "mt-2 block border-l-4 border-zinc-950 pl-4 text-lg italic leading-8 text-zinc-700"
  }

  if (kind === "image") {
    return "mt-3 block rounded-[18px] bg-[linear-gradient(135deg,#d8d2c5,#f8f5ef_55%,#c8bbb0)] p-8 text-sm font-medium text-zinc-800"
  }

  return "mt-2 block text-base leading-8 text-zinc-700"
}

function SlashMenuPreview() {
  const items = ["Divider", "Image", "Table", "Columns", "Youtube"]

  return (
    <div className="border-t border-zinc-200 bg-[#faf9f6] p-5 lg:border-t-0 lg:border-l">
      <div className="rounded-[18px] border border-zinc-200 bg-white p-3 shadow-sm">
        <div className="px-2 pb-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Slash insert
        </div>
        <div className="flex flex-col gap-1">
          {items.map((item, index) => (
            <button
              className="rounded-xl px-3 py-2 text-left text-sm font-medium text-zinc-700 hover:bg-zinc-100"
              key={item}
              type="button"
            >
              / {item}
              {index > 1 ? <span className="ml-2 text-xs text-zinc-400">planned</span> : null}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function PanelTabs({
  activePanel,
  panels,
  onChange,
}: {
  activePanel: EditorPanelId
  panels: EditorPanelId[]
  onChange: (panel: EditorPanelId) => void
}) {
  return (
    <div className="flex flex-wrap gap-1 rounded-[18px] bg-zinc-200/70 p-1">
      {panels.map((panel) => (
        <button
          aria-pressed={activePanel === panel}
          className={`flex-1 rounded-[14px] px-3 py-2 text-xs font-semibold transition ${
            activePanel === panel
              ? "bg-white text-zinc-950 shadow-sm"
              : "text-zinc-500 hover:text-zinc-950"
          }`}
          key={panel}
          type="button"
          onClick={() => onChange(panel)}
        >
          {panelLabels[panel]}
        </button>
      ))}
    </div>
  )
}

function MetaPanel({ selectedBlock }: { selectedBlock?: EditorContentBlock }) {
  return (
    <PanelShell title="Контекст выделения">
      <div className="rounded-2xl bg-zinc-100 p-4">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">
          Active block
        </div>
        <div className="mt-2 text-sm font-semibold text-zinc-950">
          {selectedBlock?.label ?? "Ничего не выбрано"}
        </div>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          Здесь фиксируем настройки блока, SEO, площадку публикации и будущие adapter props.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <InfoPill label="Renderer" value="Lexical" />
        <InfoPill label="Variant" value="article" />
        <InfoPill label="Data" value="mock" />
        <InfoPill label="Backend" value="adapter" />
      </div>
    </PanelShell>
  )
}

function AiPanel({ selectedAction }: { selectedAction: string }) {
  return (
    <PanelShell title="AI assistant">
      <div className="rounded-2xl border border-[#e5d5b8] bg-[#fbf5e7] p-4">
        <div className="text-sm font-semibold text-zinc-950">
          Выбранное действие: {selectedAction}
        </div>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          В исходнике Gigonom это `EditorAssistantAction`; в REVERIE рядом живут rewrite, transform
          и generate сценарии.
        </p>
      </div>
      <label className="flex flex-col gap-2 text-sm font-medium text-zinc-700">
        Custom prompt
        <textarea
          className="min-h-28 rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm leading-6 outline-none focus:border-zinc-950"
          defaultValue="Сделай абзац короче, сохрани деловой тон и фактуру."
        />
      </label>
      <button
        className="rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-semibold text-white"
        type="button"
      >
        Сгенерировать вариант
      </button>
    </PanelShell>
  )
}

function ImagesPanel({ images }: { images: EditorImageAsset[] }) {
  return (
    <PanelShell title="Image generation">
      {images.map((image) => (
        <div className="rounded-2xl border border-zinc-200 bg-white p-3" key={image.id}>
          <div className="h-28 rounded-xl bg-[linear-gradient(135deg,#bfb6a6,#f6f0e7_55%,#968879)]" />
          <div className="mt-3 flex items-start justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-zinc-950">{image.title}</div>
              <div className="mt-1 text-xs text-zinc-500">
                {image.source} · {image.ratio} · {image.status}
              </div>
            </div>
            <button
              className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-semibold"
              type="button"
            >
              Use
            </button>
          </div>
          {image.prompt ? (
            <p className="mt-2 text-xs leading-5 text-zinc-500">{image.prompt}</p>
          ) : null}
        </div>
      ))}
    </PanelShell>
  )
}

function AnnotationsPanel({ annotations }: { annotations: EditorAnnotation[] }) {
  return (
    <PanelShell title="Annotations overlay">
      {annotations.map((annotation) => (
        <div className="rounded-2xl border border-zinc-200 bg-white p-4" key={annotation.id}>
          <div className="flex items-start justify-between gap-3">
            <div className="text-sm font-semibold text-zinc-950">{annotation.title}</div>
            <span className="rounded-full bg-zinc-100 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {annotation.status}
            </span>
          </div>
          <div className="mt-2 text-xs font-medium text-zinc-500">{annotation.anchor}</div>
          <p className="mt-2 text-sm leading-6 text-zinc-600">{annotation.body}</p>
        </div>
      ))}
    </PanelShell>
  )
}

function VersionsPanel({ versions }: { versions: EditorVersion[] }) {
  return (
    <PanelShell title="Version history">
      {versions.map((version) => (
        <button
          className="w-full rounded-2xl border border-zinc-200 bg-white p-4 text-left hover:border-zinc-950"
          key={version.id}
          type="button"
        >
          <div className="text-sm font-semibold text-zinc-950">{version.title}</div>
          <div className="mt-1 text-xs text-zinc-500">
            {version.createdAt} · {version.author} · {version.status}
          </div>
        </button>
      ))}
    </PanelShell>
  )
}

function PanelShell({ children, title }: { children: React.ReactNode; title: string }) {
  return (
    <section className="flex flex-col gap-3 rounded-[22px] border border-zinc-200 bg-white p-4 shadow-sm">
      <h3 className="text-base font-semibold tracking-[-0.03em] text-zinc-950">{title}</h3>
      {children}
    </section>
  )
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-zinc-100 p-3">
      <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-400">
        {label}
      </div>
      <div className="mt-1 text-sm font-semibold text-zinc-800">{value}</div>
    </div>
  )
}
