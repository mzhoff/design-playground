import {
  brandContextSectionsFixture,
  calendarEventsFixture,
  channelProfilesFixture,
  editorVersionsFixture,
  generationActionsFixture,
  mediaAssetsFixture,
  providerPreviewFixture,
  topicItemsFixture,
  topicStagesFixture,
  workflowColumnsFixture,
  workflowItemsFixture,
} from "./fixtures"
import type {
  BrandContextSection,
  CalendarEventItem,
  ChannelProfile,
  ContentWorkflowItem,
  GenerationAction,
  MediaAssetItem,
  ProviderPreviewData,
  TopicPlanningItem,
  TopicPlanningStage,
  WorkflowChannel,
  WorkflowStatus,
} from "./types"

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ")

const statusMeta: Record<WorkflowStatus, { label: string; tone: string }> = {
  idea: { label: "Идея", tone: "bg-zinc-100 text-zinc-700 border-zinc-200" },
  draft: { label: "Черновик", tone: "bg-zinc-100 text-zinc-700 border-zinc-200" },
  generating: { label: "Генерация", tone: "bg-blue-50 text-blue-700 border-blue-100" },
  in_progress: { label: "В работе", tone: "bg-sky-50 text-sky-700 border-sky-100" },
  review: { label: "Ревью", tone: "bg-indigo-50 text-indigo-700 border-indigo-100" },
  approval: { label: "Согласование", tone: "bg-violet-50 text-violet-700 border-violet-100" },
  ready: { label: "Готово", tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  scheduled: { label: "В расписании", tone: "bg-amber-50 text-amber-700 border-amber-100" },
  publishing: { label: "Публикуется", tone: "bg-orange-50 text-orange-700 border-orange-100" },
  published: { label: "Опубликовано", tone: "bg-emerald-50 text-emerald-700 border-emerald-100" },
  archived: { label: "Архив", tone: "bg-zinc-100 text-zinc-600 border-zinc-200" },
  failed: { label: "Ошибка", tone: "bg-rose-50 text-rose-700 border-rose-100" },
}

const channelMeta: Record<WorkflowChannel, { label: string; tone: string }> = {
  telegram: { label: "Telegram", tone: "bg-sky-50 text-sky-700 border-sky-100" },
  vk: { label: "VK", tone: "bg-blue-50 text-blue-700 border-blue-100" },
  instagram: { label: "Instagram", tone: "bg-rose-50 text-rose-700 border-rose-100" },
  email: { label: "Email", tone: "bg-amber-50 text-amber-700 border-amber-100" },
  blog: { label: "Blog", tone: "bg-zinc-100 text-zinc-700 border-zinc-200" },
  youtube: { label: "YouTube", tone: "bg-red-50 text-red-700 border-red-100" },
  dzen: { label: "Dzen", tone: "bg-violet-50 text-violet-700 border-violet-100" },
  vc: { label: "VC", tone: "bg-slate-100 text-slate-700 border-slate-200" },
}

const generationStateTone = {
  idle: "bg-zinc-100 text-zinc-600",
  processing: "bg-blue-50 text-blue-700",
  success: "bg-emerald-50 text-emerald-700",
  failed: "bg-rose-50 text-rose-700",
  streaming: "bg-violet-50 text-violet-700",
}

export function WorkflowStatusBadge({ status }: { status: WorkflowStatus }) {
  const meta = statusMeta[status]

  return (
    <span className={cx("rounded-full border px-2 py-0.5 text-[11px] font-semibold", meta.tone)}>
      {meta.label}
    </span>
  )
}

export function ChannelChip({ channel }: { channel: WorkflowChannel }) {
  const meta = channelMeta[channel]

  return (
    <span className={cx("rounded-full border px-2 py-0.5 text-[11px] font-semibold", meta.tone)}>
      {meta.label}
    </span>
  )
}

export function ContentWorkflowCard({ item }: { item: ContentWorkflowItem }) {
  return (
    <article className="group rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      {item.status === "generating" ? (
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-blue-100">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${item.generationProgress ?? 40}%` }}
          />
        </div>
      ) : null}
      <div className="mb-3 flex items-start justify-between gap-2">
        <ChannelChip channel={item.channel} />
        <WorkflowStatusBadge status={item.status} />
      </div>
      <h3 className="line-clamp-2 text-sm font-semibold leading-5 text-zinc-950">{item.title}</h3>
      <p className="mt-2 line-clamp-2 text-xs leading-5 text-zinc-500">{item.summary}</p>
      <div className="mt-4 grid gap-2 border-t border-zinc-100 pt-3 text-[11px] text-zinc-500">
        <div className="flex items-center justify-between gap-2">
          <span>{item.format}</span>
          <span>{item.versionCount} versions</span>
        </div>
        <div className="flex items-center justify-between gap-2">
          <span className="truncate">{item.audience}</span>
          <span>{item.scheduledAt ?? item.publishedAt ?? item.sprint ?? "No date"}</span>
        </div>
      </div>
    </article>
  )
}

export function ContentProductionBoard({
  items = workflowItemsFixture,
}: {
  items?: ContentWorkflowItem[]
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Content production
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            Workflow board
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs text-zinc-500">
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5">Search</span>
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5">
            Status filters
          </span>
          <span className="rounded-full border border-zinc-200 bg-white px-3 py-1.5">
            Dynamic fields
          </span>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-5">
        {workflowColumnsFixture.map((column) => {
          const columnItems = items.filter((item) => column.statuses.includes(item.status))
          return (
            <div key={column.id} className="rounded-2xl border border-zinc-200 bg-white/70 p-3">
              <div className="mb-3">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-zinc-950">{column.title}</h3>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] font-semibold text-zinc-500">
                    {columnItems.length}
                  </span>
                </div>
                {column.description ? (
                  <p className="mt-1 text-[11px] leading-4 text-zinc-500">{column.description}</p>
                ) : null}
              </div>
              <div className="space-y-3">
                {columnItems.map((item) => (
                  <ContentWorkflowCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function TopicFunnelBoard({
  stages = topicStagesFixture,
  topics = topicItemsFixture,
}: {
  stages?: TopicPlanningStage[]
  topics?: TopicPlanningItem[]
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Topic planner
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">Funnel board</h2>
        </div>
        <button
          className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
          type="button"
        >
          Сгенерировать план
        </button>
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-7">
        {stages.map((stage) => {
          const stageTopics = topics.filter((topic) => topic.stage === stage.id)
          return (
            <div key={stage.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-3">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: stage.color }} />
                <h3 className="text-sm font-semibold text-zinc-900">{stage.title}</h3>
              </div>
              <div className="space-y-3">
                {stageTopics.length > 0 ? (
                  stageTopics.map((topic) => (
                    <article
                      key={topic.id}
                      className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm"
                    >
                      <p className="line-clamp-2 text-sm font-semibold leading-5 text-zinc-950">
                        {topic.title}
                      </p>
                      <p className="mt-2 line-clamp-2 text-xs text-zinc-500">{topic.goal}</p>
                      <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
                        <span>{topic.source}</span>
                        <strong className="text-zinc-700">{topic.score}</strong>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="rounded-xl border border-dashed border-zinc-200 bg-white p-3 text-xs text-zinc-400">
                    Нет тем
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function GenerationActionsPanel({
  actions = generationActionsFixture,
}: {
  actions?: GenerationAction[]
}) {
  const categories = ["rewrite", "transform", "generate"] as const

  return (
    <aside className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="border-b border-zinc-100 bg-gradient-to-r from-violet-50 to-blue-50 p-4">
        <p className="text-sm font-semibold text-zinc-950">AI-помощник</p>
        <p className="mt-1 text-xs text-zinc-500">
          Действия редактирования, трансформации и генерации
        </p>
      </div>
      <div className="grid gap-4 p-4">
        {categories.map((category) => (
          <section key={category}>
            <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
              {category}
            </h3>
            <div className="grid gap-2">
              {actions
                .filter((action) => action.category === category)
                .map((action) => (
                  <button
                    className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-left transition hover:bg-white hover:shadow-sm"
                    key={action.id}
                    type="button"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-zinc-950">{action.title}</span>
                      {action.state ? (
                        <span
                          className={cx(
                            "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                            generationStateTone[action.state],
                          )}
                        >
                          {action.state}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-xs leading-5 text-zinc-500">{action.description}</p>
                  </button>
                ))}
            </div>
          </section>
        ))}
      </div>
    </aside>
  )
}

export function ProviderPreview({ data = providerPreviewFixture }: { data?: ProviderPreviewData }) {
  const provider = channelMeta[data.provider]

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-zinc-100 p-4">
        <div>
          <p className="text-sm font-semibold text-zinc-950">Provider preview</p>
          <p className="text-xs text-zinc-500">{data.channelName}</p>
        </div>
        <span
          className={cx("rounded-full border px-2 py-0.5 text-[11px] font-semibold", provider.tone)}
        >
          {provider.label}
        </span>
      </div>
      <div className="bg-zinc-100 p-4">
        <article className="mx-auto max-w-sm overflow-hidden rounded-2xl bg-white shadow-sm">
          <div
            className={cx("h-32 bg-gradient-to-br", data.imageTone ?? "from-zinc-200 to-zinc-100")}
          />
          <div className="p-4">
            <p className="text-sm font-semibold text-zinc-950">{data.title}</p>
            <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-zinc-600">{data.text}</p>
            <div className="mt-4 flex justify-between border-t border-zinc-100 pt-3 text-xs text-zinc-400">
              <span>14:30</span>
              <span>preview shell</span>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export function PostEditorShell() {
  return (
    <section className="grid gap-4 rounded-3xl border border-zinc-200 bg-zinc-50 p-5 xl:grid-cols-[280px_minmax(0,1fr)_320px]">
      <GenerationActionsPanel />
      <main className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3 border-b border-zinc-100 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Post editor
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
              Telegram-пост про контекст бренда
            </h2>
          </div>
          <button
            className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
            type="button"
          >
            Опубликовать
          </button>
        </div>
        <div className="grid gap-4">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
              Стратегическая рамка
            </p>
            <div className="mt-3 grid gap-2 text-sm leading-6 text-zinc-600">
              <p>Цель: показать, что контент без контекста теряет коммерческий сигнал.</p>
              <p>Канал: Telegram, короткий первый экран, прямой экспертный тон.</p>
              <p>Главный тезис: скорость генерации должна опираться на смысловую систему.</p>
            </div>
          </div>
          <div className="min-h-[300px] rounded-2xl border border-zinc-200 bg-white p-5 text-sm leading-7 text-zinc-700 shadow-inner">
            <p>
              У большинства экспертных бизнесов проблема не в количестве контента, а в отсутствии
              контекста.
            </p>
            <p className="mt-4">
              Когда позиционирование, триггеры аудитории и доказательства оффера живут в
              разрозненных документах, каждый пост начинается с нуля.
            </p>
            <p className="mt-4">
              Reverie собирает эти элементы в workflow: тема, версия, редактор, preview, расписание
              и обратная связь.
            </p>
          </div>
        </div>
      </main>
      <aside className="grid gap-4">
        <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-zinc-950">История версий</p>
          <div className="mt-3 grid gap-2">
            {editorVersionsFixture.map((version) => (
              <div
                className={cx(
                  "rounded-xl border p-3 text-xs",
                  version.isActive ? "border-blue-200 bg-blue-50" : "border-zinc-200 bg-zinc-50",
                )}
                key={version.id}
              >
                <div className="flex items-center justify-between gap-2">
                  <strong className="text-zinc-950">{version.label}</strong>
                  <span>{version.createdAt}</span>
                </div>
                <p className="mt-1 text-zinc-500">{version.model}</p>
                <p className="mt-2 text-zinc-400">
                  {version.inputTokens + version.outputTokens} tokens
                </p>
              </div>
            ))}
          </div>
        </section>
        <ProviderPreview />
      </aside>
    </section>
  )
}

export function ContentCalendarPreview({
  events = calendarEventsFixture,
}: {
  events?: CalendarEventItem[]
}) {
  const days = ["Пн 25", "Вт 26", "Ср 27", "Чт 28", "Пт 29", "Сб 30", "Вс 31"]

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Calendar
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            Scheduling workspace
          </h2>
        </div>
        <div className="flex gap-2 text-xs text-zinc-500">
          <span className="rounded-full bg-zinc-100 px-3 py-1.5">Month</span>
          <span className="rounded-full bg-zinc-100 px-3 py-1.5">Unscheduled pool</span>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-7">
        {days.map((day) => {
          const dayEvents = events.filter((event) => event.day === day)
          return (
            <div
              key={day}
              className="min-h-[150px] rounded-2xl border border-zinc-200 bg-zinc-50 p-3"
            >
              <p className="mb-3 text-sm font-semibold text-zinc-900">{day}</p>
              <div className="space-y-2">
                {dayEvents.map((event) => (
                  <article
                    key={event.id}
                    className="rounded-xl border border-zinc-200 bg-white p-3 shadow-sm"
                  >
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-zinc-500">{event.time}</span>
                      <ChannelChip channel={event.channel} />
                    </div>
                    <p className="text-xs font-semibold leading-5 text-zinc-950">{event.title}</p>
                    <div className="mt-2">
                      <WorkflowStatusBadge status={event.status} />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export function MediaLibraryGrid({ assets = mediaAssetsFixture }: { assets?: MediaAssetItem[] }) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Media library
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            Generated assets
          </h2>
        </div>
        <span className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500">
          Search and usage filters
        </span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {assets.map((asset) => (
          <article
            key={asset.id}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50"
          >
            <div className={cx("h-36 bg-gradient-to-br", asset.tone)} />
            <div className="p-4">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate text-sm font-semibold text-zinc-950">{asset.filename}</p>
                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-zinc-500">
                  {asset.type}
                </span>
              </div>
              <p className="mt-3 text-xs text-zinc-500">Использований: {asset.usageCount}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {asset.usages.length > 0 ? (
                  asset.usages.map((usage) => (
                    <span
                      key={usage}
                      className="rounded-full border border-zinc-200 bg-white px-2 py-1 text-[11px] text-zinc-500"
                    >
                      {usage}
                    </span>
                  ))
                ) : (
                  <span className="text-xs text-zinc-400">Пока не используется</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ChannelSystemGrid({
  channels = channelProfilesFixture,
}: {
  channels?: ChannelProfile[]
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          Channel system
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
          Platform knowledge cards
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {channels.map((channel) => (
          <article key={channel.id} className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-zinc-950">{channel.name}</h3>
                <p className="text-xs text-zinc-500">{channel.handle}</p>
              </div>
              <ChannelChip channel={channel.platform} />
            </div>
            <div className="grid gap-3 text-sm text-zinc-600">
              <p>
                <span className="font-semibold text-zinc-950">Лучшее время:</span>{" "}
                {channel.bestTime}
              </p>
              <p>
                <span className="font-semibold text-zinc-950">Частота:</span>{" "}
                {channel.postingFrequency}
              </p>
              <p>
                <span className="font-semibold text-zinc-950">Цель:</span> {channel.strategicGoal}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {channel.constraints.map((constraint) => (
                <span
                  key={constraint}
                  className="rounded-full border border-zinc-200 bg-white px-2 py-1 text-[11px] text-zinc-500"
                >
                  {constraint}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function BrandContextWorkspace({
  sections = brandContextSectionsFixture,
}: {
  sections?: BrandContextSection[]
}) {
  return (
    <section className="grid gap-5 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm xl:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
          Brand context
        </p>
        <div className="mt-4 grid gap-2">
          {sections.map((section) => (
            <a
              className="rounded-xl px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-white"
              href={`#${section.id}`}
              key={section.id}
            >
              {section.title}
            </a>
          ))}
        </div>
      </aside>
      <main className="grid gap-4">
        {sections.map((section) => (
          <article
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
            id={section.id}
            key={section.id}
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-xl font-semibold tracking-tight text-zinc-950">
                {section.title}
              </h2>
              <span className="rounded-full bg-white px-2 py-1 text-[11px] text-zinc-500">
                {section.type}
              </span>
            </div>
            <p className="text-sm leading-7 text-zinc-600">{section.body}</p>
          </article>
        ))}
      </main>
    </section>
  )
}

export function MarketingAutomationPreview() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6 text-zinc-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] bg-zinc-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-300">
            REVERIE raw import
          </p>
          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Marketing automation product workflow kit
            </h1>
            <p className="text-sm leading-6 text-zinc-300">
              Сырой набор для сложных интерфейсов контент-маркетинга: planning, production, AI
              editor, preview, scheduling, media library and channel knowledge.
            </p>
          </div>
        </header>
        <ContentProductionBoard />
        <PostEditorShell />
        <TopicFunnelBoard />
        <ContentCalendarPreview />
        <div className="grid gap-6 xl:grid-cols-2">
          <MediaLibraryGrid />
          <ChannelSystemGrid />
        </div>
        <BrandContextWorkspace />
      </div>
    </div>
  )
}
