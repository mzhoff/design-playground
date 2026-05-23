import type { DashboardCardData } from "./types"

const schemaNodes = [
  { id: "users", title: "users", x: 20, y: 20, color: "#0f172a", rows: 4 },
  { id: "posts", title: "posts", x: 210, y: 48, color: "#475569", rows: 5 },
  { id: "campaigns", title: "campaigns", x: 118, y: 145, color: "#64748b", rows: 3 },
]

const schemaEdges = [
  { id: "users-posts", sourceNodeId: "users", targetNodeId: "posts" },
  { id: "campaigns-posts", sourceNodeId: "campaigns", targetNodeId: "posts" },
]

export const dashboardCardsFixture: DashboardCardData[] = [
  {
    id: "reverie-workspace",
    title: "REVERIE content system",
    description: "Marketing automation workspace",
    eyebrow: "Project",
    badge: "schema",
    previewNodes: schemaNodes,
    previewEdges: schemaEdges,
    meta: [
      { label: "Tables", value: "18" },
      { label: "Updated", value: "2h ago" },
    ],
    actions: [
      { id: "rename", label: "Rename" },
      { id: "duplicate", label: "Duplicate" },
      { id: "delete", label: "Delete", tone: "danger" },
    ],
    selected: true,
    variant: "project",
  },
  {
    id: "class-map",
    title: "Class diagram",
    description: "Domain model draft",
    eyebrow: "Document",
    badge: "UML",
    previewNodes: [
      { id: "account", title: "Account", x: 20, y: 22, color: "#334155", rows: 2 },
      { id: "asset", title: "Asset", x: 170, y: 80, color: "#475569", rows: 3 },
      { id: "workflow", title: "Workflow", x: 80, y: 145, color: "#64748b", rows: 2 },
    ],
    previewEdges: [
      { id: "account-asset", sourceNodeId: "account", targetNodeId: "asset" },
      { id: "workflow-asset", sourceNodeId: "workflow", targetNodeId: "asset" },
    ],
    meta: [
      { label: "Type", value: "Class diagram" },
      { label: "Updated", value: "May 22" },
    ],
    actions: [
      { id: "rename", label: "Rename" },
      { id: "delete", label: "Delete", tone: "danger" },
    ],
    variant: "document",
  },
  {
    id: "metric-health",
    title: "Project health",
    eyebrow: "Summary",
    badge: "live",
    metrics: [
      { label: "Documents", value: "24", delta: "+4", tone: "success" },
      { label: "Issues", value: "3", delta: "needs review", tone: "warning" },
    ],
    meta: [{ label: "Owner", value: "Product team" }],
    variant: "metric",
  },
]
