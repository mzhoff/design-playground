import type {
  EditorWorkspaceCatalogGroup,
  EditorWorkspaceInspectorSection,
  EditorWorkspacePane,
} from "./types"

export const editorWorkspacePanesFixture: Record<string, EditorWorkspacePane> = {
  project: {
    id: "project",
    title: "Project",
    subtitle: "Video automation workspace",
    activeTabId: "files",
    tabs: [
      { id: "files", title: "Files" },
      { id: "brief", title: "Brief" },
    ],
  },
  library: {
    id: "library",
    title: "Library",
    activeTabId: "assets",
    tabs: [
      { id: "assets", title: "Assets" },
      { id: "components", title: "Components" },
      { id: "prompts", title: "Prompts" },
    ],
  },
  canvas: {
    id: "canvas",
    title: "Canvas",
    activeTabId: "workflow",
    tabs: [
      { id: "workflow", title: "Workflow" },
      { id: "preview", title: "Preview" },
      { id: "map", title: "Map" },
    ],
  },
  behavior: {
    id: "behavior",
    title: "Behavior",
    activeTabId: "timeline",
    tabs: [
      { id: "timeline", title: "Timeline" },
      { id: "events", title: "Events", badge: "12" },
      { id: "assistant", title: "Assistant" },
      { id: "code", title: "Code" },
    ],
  },
  inspector: {
    id: "inspector",
    title: "Inspector",
    activeTabId: "properties",
    tabs: [
      { id: "properties", title: "Properties" },
      { id: "history", title: "History" },
    ],
  },
}

export const editorWorkspaceCatalogFixture: EditorWorkspaceCatalogGroup[] = [
  {
    id: "scenes",
    title: "Scenes",
    count: 4,
    rows: [
      { id: "hook", title: "Opening hook", meta: "00:00-00:08", badge: "draft", selected: true },
      { id: "problem", title: "Problem framing", meta: "00:08-00:22" },
      { id: "solution", title: "Solution block", meta: "00:22-00:46" },
      { id: "cta", title: "CTA", meta: "00:46-00:58" },
    ],
  },
  {
    id: "assets",
    title: "Assets",
    count: 3,
    rows: [
      { id: "voice", title: "Voiceover RU", meta: "audio" },
      { id: "cover", title: "Cover image", meta: "image" },
      { id: "broll", title: "B-roll pack", meta: "video" },
    ],
  },
]

export const editorWorkspaceInspectorFixture: EditorWorkspaceInspectorSection[] = [
  {
    id: "identity",
    title: "Identity",
    fields: [
      { id: "title", label: "Title", value: "Opening hook" },
      { id: "status", label: "Status", value: "Draft", kind: "select" },
      { id: "owner", label: "Owner", value: "Content team" },
    ],
  },
  {
    id: "timing",
    title: "Timing",
    fields: [
      { id: "start", label: "Start", value: "00:00" },
      { id: "duration", label: "Duration", value: "8 sec" },
      {
        id: "notes",
        label: "Notes",
        value: "Keep the first sentence short and direct.",
        kind: "textarea",
      },
    ],
  },
]
