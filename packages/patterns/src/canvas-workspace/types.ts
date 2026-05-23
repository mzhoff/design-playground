export interface CanvasPoint {
  x: number
  y: number
}

export interface CanvasViewport {
  pan: CanvasPoint
  zoom: number
}

export interface CanvasBounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
  width?: number
  height?: number
}

export interface CanvasWorldRect {
  x: number
  y: number
  w: number
  h: number
}

export interface CanvasWorkspaceNode {
  id: string
  title: string
  subtitle?: string
  status?: string
  position: CanvasPoint
  size: {
    width: number
    height: number
  }
  fields?: Array<{
    id: string
    label: string
    meta?: string
    tone?: "default" | "primary" | "success" | "warning"
  }>
}

export interface CanvasWorkspaceEdge {
  id: string
  sourceNodeId: string
  targetNodeId: string
  label?: string
}
