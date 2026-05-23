import type { ChatAssistantMessage, ChatAssistantModelOption, ChatAssistantTask } from "./types"

export const chatAssistantModelsFixture: ChatAssistantModelOption[] = [
  { id: "mock/local-assistant", label: "Mock Assistant", description: "Local preview" },
  { id: "openai/gpt-5.2-chat", label: "ChatGPT 5.2", description: "Primary reasoning model" },
  { id: "openrouter/auto", label: "OpenRouter Auto", description: "Provider router" },
]

export const chatAssistantTasksFixture: ChatAssistantTask[] = [
  { id: "intent", title: "Classify request", status: "done" },
  { id: "sources", title: "Collect relevant sources", status: "running" },
  { id: "draft", title: "Prepare answer blocks", status: "pending" },
]

export const chatAssistantMessagesFixture: ChatAssistantMessage[] = [
  {
    id: "m1",
    role: "user",
    author: "Client",
    createdAt: "10:24",
    attachments: [{ id: "a1", kind: "image", name: "landing-reference.png", sizeLabel: "820 KB" }],
    blocks: [
      {
        id: "b1",
        type: "text",
        content:
          "Нужно быстро показать, как будет выглядеть продуктовый assistant внутри SaaS-админки.",
      },
    ],
  },
  {
    id: "m2",
    role: "assistant",
    author: "Gigonom Assistant",
    createdAt: "10:25",
    status: "streaming",
    blocks: [
      {
        id: "b2",
        type: "markdown",
        content:
          "Соберу интерфейс как набор режимов: page-level thread, docked side panel, compact floating panel и composer-only embedding.",
      },
      {
        id: "b3",
        type: "tool-status",
        title: "Analyze product context",
        status: "running",
        description: "Проверяю, какие блоки можно показать как semantic artifacts.",
      },
      {
        id: "b4",
        type: "card",
        title: "Recommended vertical slice",
        description:
          "Shell + message list + semantic blocks + attachments + model selector + command palette.",
        actions: ["Open Storybook", "Create Figma snapshot"],
      },
      {
        id: "b5",
        type: "table",
        columns: ["Mode", "Status"],
        rows: [
          ["Fullscreen", "ready"],
          ["Compact", "UX reference"],
          ["Resizable", "placeholder"],
        ],
      },
    ],
    suggestedActions: ["Показать компактный режим", "Добавить task panel", "Сравнить с REVERIE"],
  },
]
