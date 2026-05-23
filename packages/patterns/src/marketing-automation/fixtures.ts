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
  WorkflowColumn,
} from "./types"

export const workflowColumnsFixture: WorkflowColumn[] = [
  {
    id: "ideas",
    title: "Идеи",
    statuses: ["idea", "draft"],
    description: "Темы и черновики до запуска генерации",
  },
  {
    id: "generation",
    title: "Генерация",
    statuses: ["generating", "in_progress"],
    description: "AI-подготовка и редакторская сборка",
  },
  {
    id: "review",
    title: "Ревью",
    statuses: ["review", "approval", "ready"],
    description: "Проверка, правки и согласование",
  },
  {
    id: "scheduled",
    title: "Расписание",
    statuses: ["scheduled", "publishing"],
    description: "Публикации в календаре и очереди",
  },
  {
    id: "published",
    title: "Опубликовано",
    statuses: ["published", "archived"],
    description: "Архив, факт публикации и аналитика",
  },
]

export const workflowItemsFixture: ContentWorkflowItem[] = [
  {
    id: "workflow-1",
    title: "Почему контент ломается без контекста",
    summary: "Открывающий Telegram-пост для осознания проблемы и перехода к системному подходу.",
    status: "draft",
    channel: "telegram",
    format: "post",
    audience: "Экспертный бизнес",
    topic: "Brand context",
    sprint: "Sprint 12",
    versionCount: 1,
  },
  {
    id: "workflow-2",
    title: "Статья о темах по пути клиента",
    summary: "Лонгрид связывает CJM, триггеры и форматы площадок.",
    status: "generating",
    channel: "dzen",
    format: "article",
    audience: "Контент-оператор",
    topic: "CJM planning",
    sprint: "Sprint 12",
    versionCount: 1,
    generationProgress: 62,
  },
  {
    id: "workflow-3",
    title: "Тред про версии и редакторский контроль",
    summary: "Показывает историю версий как инструмент обучения AI-системы.",
    status: "review",
    channel: "vc",
    format: "thread",
    audience: "Команда маркетинга",
    topic: "Version history",
    sprint: "Sprint 12",
    versionCount: 2,
  },
  {
    id: "workflow-4",
    title: "Telegram-пост после ревью",
    summary: "Готовый пост в очереди автопубликации с подтвержденной стратегической рамкой.",
    status: "scheduled",
    channel: "telegram",
    format: "post",
    audience: "Экспертный бизнес",
    topic: "Publishing flow",
    scheduledAt: "26 мая, 14:30",
    sprint: "Sprint 13",
    versionCount: 3,
  },
  {
    id: "workflow-5",
    title: "VC-статья про ограничения каналов",
    summary: "Публикация о том, почему тема живет выше уровня платформы.",
    status: "published",
    channel: "vc",
    format: "article",
    audience: "Founder-led marketing",
    topic: "Channel strategy",
    publishedAt: "19 марта, 17:10",
    sprint: "Sprint 11",
    versionCount: 2,
  },
]

export const topicStagesFixture: TopicPlanningStage[] = [
  { id: "awareness", title: "Осознание", group: "discovery", color: "#38bdf8" },
  { id: "consideration", title: "Изучение", group: "discovery", color: "#60a5fa" },
  { id: "intent", title: "Намерение", group: "trust", color: "#818cf8" },
  { id: "evaluation", title: "Оценка", group: "trust", color: "#a78bfa" },
  { id: "engagement", title: "Вовлечение", group: "conversion", color: "#fbbf24" },
  { id: "purchase", title: "Покупка", group: "conversion", color: "#f59e0b" },
  { id: "retention", title: "Удержание", group: "lifecycle", color: "#10b981" },
]

export const topicItemsFixture: TopicPlanningItem[] = [
  {
    id: "topic-1",
    title: "Как понять, что контент работает без системы",
    stage: "awareness",
    goal: "Объяснить проблему хаотичного производства",
    source: "Интервью с клиентами",
    score: 84,
  },
  {
    id: "topic-2",
    title: "Почему темы должны следовать CJM",
    stage: "consideration",
    goal: "Показать структуру планирования",
    source: "Brand context",
    score: 78,
  },
  {
    id: "topic-3",
    title: "Сравнение ручной редакции и AI-workflow",
    stage: "evaluation",
    goal: "Снять возражения по качеству",
    source: "Product proof",
    score: 73,
  },
  {
    id: "topic-4",
    title: "Как запустить первый контент-спринт",
    stage: "purchase",
    goal: "Перевести интерес в действие",
    source: "Onboarding script",
    score: 91,
  },
]

export const generationActionsFixture: GenerationAction[] = [
  {
    id: "rewrite",
    title: "Переписать",
    description: "Сохранить смысл, но собрать текст плотнее и чище.",
    category: "rewrite",
  },
  {
    id: "shorten",
    title: "Сократить",
    description: "Убрать лишние вводные и оставить только сильные тезисы.",
    category: "rewrite",
  },
  {
    id: "tone",
    title: "Сменить тон",
    description: "Адаптировать под экспертный, прямой или дружелюбный голос.",
    category: "transform",
    state: "processing",
  },
  {
    id: "hook",
    title: "Сгенерировать hook",
    description: "Предложить несколько первых абзацев для выбранной платформы.",
    category: "generate",
  },
]

export const editorVersionsFixture = [
  {
    id: "version-1",
    label: "Версия 1",
    model: "openrouter/gpt-4.1",
    createdAt: "Сегодня, 10:12",
    inputTokens: 512,
    outputTokens: 863,
  },
  {
    id: "version-2",
    label: "Версия 2",
    model: "openrouter/gpt-4.1",
    createdAt: "Сегодня, 10:24",
    inputTokens: 438,
    outputTokens: 712,
    isActive: true,
  },
]

export const channelProfilesFixture: ChannelProfile[] = [
  {
    id: "channel-telegram",
    name: "Telegram",
    platform: "telegram",
    handle: "@reverie_brand",
    bestTime: "14:00-17:00",
    postingFrequency: "4-7 публикаций в неделю",
    strategicGoal: "Быстрое доверие и регулярный контакт",
    constraints: ["Короткий первый экран", "Сильный тезис в начале", "Ограничить длинные списки"],
  },
  {
    id: "channel-vc",
    name: "VC",
    platform: "vc",
    handle: "reverie",
    bestTime: "10:00-13:00",
    postingFrequency: "1-2 материала в неделю",
    strategicGoal: "Доказательства, кейсы и экспертность",
    constraints: ["Нужна аргументация", "Важны цифры", "Заголовок должен обещать пользу"],
  },
]

export const providerPreviewFixture: ProviderPreviewData = {
  provider: "telegram",
  channelName: "Reverie Brand",
  title: "Пост про контент-систему",
  text: "Скорость генерации без контекста не дает предсказуемого результата. Сначала фиксируем смысл, аудиторию и ограничения канала. Потом собираем публикацию, версию, preview и расписание.",
  imageTone: "from-blue-200 via-sky-100 to-zinc-100",
}

export const calendarEventsFixture: CalendarEventItem[] = [
  {
    id: "calendar-1",
    day: "Пн 25",
    time: "10:30",
    title: "Пост про brand context",
    channel: "telegram",
    status: "scheduled",
  },
  {
    id: "calendar-2",
    day: "Ср 27",
    time: "14:00",
    title: "VC-статья про workflow",
    channel: "vc",
    status: "review",
  },
  {
    id: "calendar-3",
    day: "Пт 29",
    time: "16:45",
    title: "Email дайджест релиза",
    channel: "email",
    status: "draft",
  },
]

export const mediaAssetsFixture: MediaAssetItem[] = [
  {
    id: "media-1",
    filename: "workflow-cover.jpg",
    type: "image",
    usageCount: 2,
    usages: ["Telegram-пост", "VC-статья"],
    tone: "from-slate-200 to-blue-100",
  },
  {
    id: "media-2",
    filename: "editor-preview.mp4",
    type: "video",
    usageCount: 1,
    usages: ["Landing section"],
    tone: "from-violet-200 to-fuchsia-100",
  },
  {
    id: "media-3",
    filename: "strategy-map.pdf",
    type: "document",
    usageCount: 0,
    usages: [],
    tone: "from-amber-100 to-orange-100",
  },
]

export const brandContextSectionsFixture: BrandContextSection[] = [
  {
    id: "context-1",
    title: "Позиционирование",
    body: "Reverie превращает хаотичное производство контента в управляемую систему с контекстом, версиями и контролем качества.",
    type: "positioning",
  },
  {
    id: "context-2",
    title: "Аудитории",
    body: "Экспертные бизнесы, founder-led команды и контент-операторы, которым нужна регулярность без потери смысла.",
    type: "audience",
  },
  {
    id: "context-3",
    title: "Продуктовые доказательства",
    body: "Workflow, версии, preview, календарь публикаций и единый контекст бренда уменьшают ручную операционку.",
    type: "product",
  },
]
