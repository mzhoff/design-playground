import type { DragAndDropFixture } from "./contracts"

export const dragAndDropMock: DragAndDropFixture = {
  title: "Reorderable drag list",
  description:
    "Сырой перенос prodSQL useReorderableDragList: native HTML Drag and Drop, live preview order, hidden browser ghost и commit через fromIndex/toIndex.",
  enabled: true,
  activeScenario: "list-reorder",
  items: [
    {
      id: "strategy",
      label: "Strategy",
      description: "Первый блок нельзя терять при live preview.",
      badge: "A",
    },
    {
      id: "brief",
      label: "Brief",
      description: "Обычная строка reorder внутри списка.",
      badge: "B",
    },
    {
      id: "draft",
      label: "Draft",
      description: "Источник drag подсвечивается, остальные строки dimmed.",
      badge: "C",
    },
    {
      id: "approval",
      label: "Approval",
      description: "Locked item не должен начинать drag.",
      locked: true,
      badge: "lock",
    },
  ],
  groups: [
    {
      id: "domain-growth",
      label: "Growth",
      description: "Группа может перемещаться целиком.",
      items: [
        { id: "landing", label: "Landing pages", description: "Move inside group" },
        { id: "seo", label: "SEO briefs", description: "Move inside group" },
      ],
    },
    {
      id: "domain-content",
      label: "Content",
      description: "Drop table to another domain требует confirm.",
      items: [
        { id: "calendar", label: "Content calendar", description: "Cross-group pending move" },
        { id: "assets", label: "Asset library", description: "Cross-group pending move" },
      ],
    },
    {
      id: "domain-system",
      label: "System",
      description: "Locked group не двигается.",
      locked: true,
      items: [{ id: "audit", label: "Audit log", description: "Locked group child" }],
    },
  ],
  smokeScenarios: [
    "drag A ниже C дает B, C, A",
    "drag C выше A дает C, A, B",
    "drop без source не вызывает commit",
    "enabled=false блокирует drag start/over/drop",
    "dragEnd чистит preview state",
    "locked item нельзя начать drag",
    "cross-group move создает pending confirmation",
  ],
  accessibilityDebt: [
    "Добавить keyboard reorder Space/Arrow/Enter/Escape.",
    "Добавить live region picked/moved/dropped/cancelled.",
    "Добавить touch/pointer слой для mobile.",
    "Описать ARIA для sortable list/tree.",
  ],
}
