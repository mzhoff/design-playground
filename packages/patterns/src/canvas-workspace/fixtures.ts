import type { CanvasWorkspaceEdge, CanvasWorkspaceNode } from "./types"

export const canvasWorkspaceNodesFixture: CanvasWorkspaceNode[] = [
  {
    id: "content-plan",
    title: "Content Plan",
    subtitle: "workflow node",
    status: "active",
    position: { x: 40, y: 70 },
    size: { width: 260, height: 180 },
    fields: [
      { id: "brief", label: "brief", meta: "required", tone: "primary" },
      { id: "channels", label: "channels", meta: "multi" },
      { id: "deadline", label: "deadline", meta: "date", tone: "warning" },
    ],
  },
  {
    id: "asset-generator",
    title: "Asset Generator",
    subtitle: "automation block",
    status: "queued",
    position: { x: 420, y: 30 },
    size: { width: 280, height: 210 },
    fields: [
      { id: "prompt", label: "prompt", meta: "text", tone: "primary" },
      { id: "style", label: "style preset", meta: "token" },
      { id: "variants", label: "variants", meta: "number" },
      { id: "result", label: "generated media", meta: "asset", tone: "success" },
    ],
  },
  {
    id: "publication",
    title: "Publication",
    subtitle: "delivery state",
    status: "draft",
    position: { x: 230, y: 340 },
    size: { width: 260, height: 170 },
    fields: [
      { id: "copy", label: "copy", meta: "rich text" },
      { id: "schedule", label: "schedule", meta: "datetime", tone: "warning" },
      { id: "approval", label: "approval", meta: "status" },
    ],
  },
]

export const canvasWorkspaceEdgesFixture: CanvasWorkspaceEdge[] = [
  {
    id: "plan-generator",
    sourceNodeId: "content-plan",
    targetNodeId: "asset-generator",
    label: "assets",
  },
  {
    id: "generator-publication",
    sourceNodeId: "asset-generator",
    targetNodeId: "publication",
    label: "media",
  },
  {
    id: "plan-publication",
    sourceNodeId: "content-plan",
    targetNodeId: "publication",
    label: "brief",
  },
]
