"use client"

import type { MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from "react"
import { useCallback, useMemo, useState } from "react"
import { CanvasGridBackground, CanvasZoomIndicator } from "./canvas-navigation-ui"
import { canvasWorkspaceEdgesFixture, canvasWorkspaceNodesFixture } from "./fixtures"
import type {
  CanvasBounds,
  CanvasPoint,
  CanvasWorkspaceEdge,
  CanvasWorkspaceNode,
  CanvasWorldRect,
} from "./types"
import { useCanvasBoxSelection } from "./use-canvas-box-selection"
import { useCanvasNavigation } from "./use-canvas-navigation"

function rectsIntersect(node: CanvasWorkspaceNode, rect: CanvasWorldRect) {
  const nodeLeft = node.position.x
  const nodeTop = node.position.y
  const nodeRight = node.position.x + node.size.width
  const nodeBottom = node.position.y + node.size.height
  const rectLeft = rect.x
  const rectTop = rect.y
  const rectRight = rect.x + rect.w
  const rectBottom = rect.y + rect.h

  return (
    nodeLeft <= rectRight && nodeRight >= rectLeft && nodeTop <= rectBottom && nodeBottom >= rectTop
  )
}

function getNodesBounds(nodes: CanvasWorkspaceNode[]): CanvasBounds {
  if (nodes.length === 0) return { minX: 0, minY: 0, maxX: 1, maxY: 1 }

  const minX = Math.min(...nodes.map((node) => node.position.x))
  const minY = Math.min(...nodes.map((node) => node.position.y))
  const maxX = Math.max(...nodes.map((node) => node.position.x + node.size.width))
  const maxY = Math.max(...nodes.map((node) => node.position.y + node.size.height))
  return { minX, minY, maxX, maxY }
}

function getNodeCenter(node: CanvasWorkspaceNode, side: "left" | "right") {
  return {
    x: side === "left" ? node.position.x : node.position.x + node.size.width,
    y: node.position.y + node.size.height / 2,
  }
}

function getEdgePath(source: CanvasPoint, target: CanvasPoint) {
  const distance = Math.max(80, Math.abs(target.x - source.x) * 0.45)
  return `M ${source.x} ${source.y} C ${source.x + distance} ${source.y}, ${target.x - distance} ${target.y}, ${target.x} ${target.y}`
}

export function CanvasWorkspacePreview({
  initialNodes = canvasWorkspaceNodesFixture,
  edges = canvasWorkspaceEdgesFixture,
}: {
  initialNodes?: CanvasWorkspaceNode[]
  edges?: CanvasWorkspaceEdge[]
}) {
  const [nodes, setNodes] = useState(initialNodes)
  const [selectedNodeIds, setSelectedNodeIds] = useState<Set<string>>(
    () => new Set([initialNodes[0]?.id ?? ""]),
  )
  const [dragState, setDragState] = useState<{
    nodeId: string
    pointerId: number
    startClient: CanvasPoint
    startPosition: CanvasPoint
  } | null>(null)
  const canvas = useCanvasNavigation({ initialPan: { x: 120, y: 70 }, initialZoom: 0.92 })
  const bounds = useMemo(() => getNodesBounds(nodes), [nodes])

  const selectNodesInRect = useCallback(
    (rect: CanvasWorldRect) => {
      const ids = nodes.filter((node) => rectsIntersect(node, rect)).map((node) => node.id)
      setSelectedNodeIds(new Set(ids))
    },
    [nodes],
  )

  const boxSelection = useCanvasBoxSelection({
    screenToWorld: canvas.screenToWorld,
    onSelect: selectNodesInRect,
  })

  const handleCanvasMouseDown = (event: ReactMouseEvent) => {
    if (event.button !== 0) return
    const target = event.target as HTMLElement
    if (target.closest("[data-canvas-node='true']")) return
    if (!event.shiftKey) setSelectedNodeIds(new Set())
    boxSelection.startSelection(event)
  }

  const handleNodePointerDown = (
    node: CanvasWorkspaceNode,
    event: ReactPointerEvent<HTMLDivElement>,
  ) => {
    if (event.button !== 0) return
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    setSelectedNodeIds((current) => {
      const next = new Set(current)
      if (event.shiftKey) {
        if (next.has(node.id)) next.delete(node.id)
        else next.add(node.id)
        return next
      }
      return new Set([node.id])
    })
    setDragState({
      nodeId: node.id,
      pointerId: event.pointerId,
      startClient: { x: event.clientX, y: event.clientY },
      startPosition: node.position,
    })
  }

  const handleNodePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return
    event.stopPropagation()
    const dx = (event.clientX - dragState.startClient.x) / canvas.zoom
    const dy = (event.clientY - dragState.startClient.y) / canvas.zoom
    setNodes((current) =>
      current.map((node) =>
        node.id === dragState.nodeId
          ? {
              ...node,
              position: { x: dragState.startPosition.x + dx, y: dragState.startPosition.y + dy },
            }
          : node,
      ),
    )
  }

  const handleNodePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragState || dragState.pointerId !== event.pointerId) return
    event.stopPropagation()
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId)
    setDragState(null)
  }

  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-950 p-3 shadow-2xl shadow-slate-950/20">
      <div
        ref={canvas.containerRef}
        className="relative h-[680px] overflow-hidden rounded-[22px] border border-slate-800 bg-slate-100"
        onMouseDown={handleCanvasMouseDown}
        role="application"
        style={{
          cursor: canvas.isPanning
            ? "grabbing"
            : boxSelection.isSelecting
              ? "crosshair"
              : "default",
        }}
      >
        <CanvasGridBackground pan={canvas.pan} zoom={canvas.zoom} />
        <div className="absolute left-4 top-4 z-30 flex gap-2 rounded-2xl border border-slate-200 bg-white/90 p-2 shadow-sm backdrop-blur">
          <button
            className="rounded-xl bg-slate-950 px-3 py-2 text-xs font-semibold text-white"
            type="button"
            onClick={() => canvas.zoomToBounds(bounds)}
          >
            Zoom to fit
          </button>
          <button
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
            type="button"
            onClick={() => canvas.setZoom((value) => value + 0.1)}
          >
            +
          </button>
          <button
            className="rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600"
            type="button"
            onClick={() => canvas.setZoom((value) => value - 0.1)}
          >
            -
          </button>
          <span className="flex items-center px-2 text-xs text-slate-500">
            middle mouse pan / ctrl wheel zoom / drag select
          </span>
        </div>
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{
            transform: `translate(${canvas.pan.x}px, ${canvas.pan.y}px) scale(${canvas.zoom})`,
          }}
        >
          <svg
            aria-label="Canvas connections"
            className="pointer-events-none absolute overflow-visible"
            height={1}
            role="img"
            width={1}
          >
            <defs>
              <marker
                id="canvas-workspace-arrow"
                markerHeight="8"
                markerWidth="8"
                orient="auto"
                refX="7"
                refY="4"
              >
                <path d="M 0 0 L 8 4 L 0 8 z" fill="#334155" />
              </marker>
            </defs>
            {edges.map((edge) => {
              const source = nodes.find((node) => node.id === edge.sourceNodeId)
              const target = nodes.find((node) => node.id === edge.targetNodeId)
              if (!source || !target) return null
              const sourcePoint = getNodeCenter(source, "right")
              const targetPoint = getNodeCenter(target, "left")
              return (
                <g key={edge.id}>
                  <path
                    d={getEdgePath(sourcePoint, targetPoint)}
                    fill="none"
                    markerEnd="url(#canvas-workspace-arrow)"
                    stroke="#334155"
                    strokeOpacity="0.58"
                    strokeWidth="2"
                  />
                  {edge.label ? (
                    <text
                      fill="#64748b"
                      fontSize="12"
                      x={(sourcePoint.x + targetPoint.x) / 2}
                      y={(sourcePoint.y + targetPoint.y) / 2 - 10}
                    >
                      {edge.label}
                    </text>
                  ) : null}
                </g>
              )
            })}
          </svg>
          {nodes.map((node) => {
            const selected = selectedNodeIds.has(node.id)
            return (
              <div
                className={`absolute select-none rounded-3xl border bg-white shadow-xl shadow-slate-900/10 transition-shadow ${selected ? "border-slate-950 ring-4 ring-slate-900/10" : "border-slate-200"}`}
                data-canvas-node="true"
                key={node.id}
                onPointerDown={(event) => handleNodePointerDown(node, event)}
                onPointerMove={handleNodePointerMove}
                onPointerUp={handleNodePointerUp}
                style={{
                  height: node.size.height,
                  left: node.position.x,
                  top: node.position.y,
                  width: node.size.width,
                }}
              >
                <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-950">{node.title}</div>
                    <div className="mt-1 text-xs text-slate-500">{node.subtitle}</div>
                  </div>
                  {node.status ? (
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                      {node.status}
                    </span>
                  ) : null}
                </div>
                <div className="space-y-2 px-4 py-3">
                  {node.fields?.map((field) => (
                    <div
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2 text-xs"
                      key={field.id}
                    >
                      <span className="font-medium text-slate-700">{field.label}</span>
                      {field.meta ? <span className="text-slate-400">{field.meta}</span> : null}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
        {boxSelection.rectStyle ? (
          <div
            className="pointer-events-none fixed z-40 border-2 border-sky-400 bg-sky-400/10"
            style={boxSelection.rectStyle}
          />
        ) : null}
        <CanvasZoomIndicator>
          {Math.round(canvas.zoom * 100)}% · {selectedNodeIds.size} selected
        </CanvasZoomIndicator>
      </div>
    </div>
  )
}
