import { useId } from "react"
import type { DashboardPreviewEdge, DashboardPreviewNode } from "./types"

const DEFAULT_NODE_WIDTH = 64
const DEFAULT_NODE_HEIGHT = 42
const PADDING = 12

function getBounds(nodes: DashboardPreviewNode[]) {
  if (nodes.length === 0) return { minX: 0, minY: 0, maxX: 1, maxY: 1 }

  return nodes.reduce(
    (bounds, node) => ({
      minX: Math.min(bounds.minX, node.x),
      minY: Math.min(bounds.minY, node.y),
      maxX: Math.max(bounds.maxX, node.x + (node.width ?? DEFAULT_NODE_WIDTH)),
      maxY: Math.max(bounds.maxY, node.y + (node.height ?? DEFAULT_NODE_HEIGHT)),
    }),
    {
      minX: Number.POSITIVE_INFINITY,
      minY: Number.POSITIVE_INFINITY,
      maxX: Number.NEGATIVE_INFINITY,
      maxY: Number.NEGATIVE_INFINITY,
    },
  )
}

export function DashboardSchemaPreview({
  nodes = [],
  edges = [],
  width = 280,
  height = 150,
}: {
  nodes?: DashboardPreviewNode[]
  edges?: DashboardPreviewEdge[]
  width?: number
  height?: number
}) {
  const patternId = useId()

  if (nodes.length === 0) {
    return (
      <div className="flex h-full min-h-[150px] items-center justify-center rounded-xl bg-slate-100 text-xs font-medium text-slate-400">
        Empty preview
      </div>
    )
  }

  const bounds = getBounds(nodes)
  const contentWidth = bounds.maxX - bounds.minX || 1
  const contentHeight = bounds.maxY - bounds.minY || 1
  const scale = Math.min(
    (width - PADDING * 2) / contentWidth,
    (height - PADDING * 2) / contentHeight,
    1.5,
  )
  const offsetX = PADDING + (width - PADDING * 2 - contentWidth * scale) / 2
  const offsetY = PADDING + (height - PADDING * 2 - contentHeight * scale) / 2
  const nodeById = new Map(nodes.map((node) => [node.id, node]))
  const tx = (x: number) => offsetX + (x - bounds.minX) * scale
  const ty = (y: number) => offsetY + (y - bounds.minY) * scale

  return (
    <svg
      aria-label="Dashboard card preview"
      className="block rounded-xl bg-slate-50"
      height={height}
      role="img"
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
    >
      <defs>
        <pattern height="8" id={patternId} patternUnits="userSpaceOnUse" width="8">
          <circle cx="4" cy="4" fill="#cbd5e1" r="0.55" />
        </pattern>
      </defs>
      <rect fill={`url(#${patternId})`} height={height} rx="12" width={width} />
      {edges.map((edge) => {
        const source = nodeById.get(edge.sourceNodeId)
        const target = nodeById.get(edge.targetNodeId)
        if (!source || !target) return null

        const x1 = tx(source.x + (source.width ?? DEFAULT_NODE_WIDTH) / 2)
        const y1 = ty(source.y + (source.height ?? DEFAULT_NODE_HEIGHT) / 2)
        const x2 = tx(target.x + (target.width ?? DEFAULT_NODE_WIDTH) / 2)
        const y2 = ty(target.y + (target.height ?? DEFAULT_NODE_HEIGHT) / 2)
        const bend = Math.abs(x2 - x1) * 0.4

        return (
          <path
            d={`M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`}
            fill="none"
            key={edge.id}
            opacity="0.65"
            stroke="#94a3b8"
            strokeWidth="1.3"
          />
        )
      })}
      {nodes.map((node) => {
        const x = tx(node.x)
        const y = ty(node.y)
        const w = (node.width ?? DEFAULT_NODE_WIDTH) * scale
        const rowCount = node.rows ?? 3
        const h = (node.height ?? DEFAULT_NODE_HEIGHT) * scale
        return (
          <g key={node.id}>
            <rect
              fill="white"
              height={h}
              rx="5"
              stroke="#e2e8f0"
              strokeWidth="0.8"
              width={w}
              x={x}
              y={y}
            />
            <rect
              fill={node.color ?? "#334155"}
              height={Math.max(7, h * 0.26)}
              rx="5"
              width={w}
              x={x}
              y={y}
            />
            {Array.from({ length: rowCount }).map((_, index) => (
              <rect
                fill={index === 0 ? "#cbd5e1" : "#e2e8f0"}
                height="3"
                key={`${node.id}-${index}`}
                rx="1.5"
                width={w * (0.42 + index * 0.1)}
                x={x + 8 * scale}
                y={y + Math.max(12, h * 0.36) + index * 7 * scale}
              />
            ))}
          </g>
        )
      })}
    </svg>
  )
}
