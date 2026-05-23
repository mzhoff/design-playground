"use client"

import type { SetStateAction } from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { CanvasBounds, CanvasPoint, CanvasViewport } from "./types"

interface UseCanvasNavigationOptions {
  minZoom?: number
  maxZoom?: number
  zoomSensitivity?: number
  scrollPanSpeed?: number
  maxFitZoom?: number
  initialPan?: CanvasPoint
  initialZoom?: number
  onViewportChange?: (viewport: CanvasViewport) => void
}

const DEFAULT_MIN_ZOOM = 0.2
const DEFAULT_MAX_ZOOM = 3
const DEFAULT_ZOOM_SENSITIVITY = 0.001
const DEFAULT_SCROLL_PAN_SPEED = 1.5
const DEFAULT_MAX_FIT_ZOOM = 1.5

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function resolveStateAction<T>(action: SetStateAction<T>, current: T): T {
  return typeof action === "function" ? (action as (value: T) => T)(current) : action
}

export function useCanvasNavigation({
  minZoom = DEFAULT_MIN_ZOOM,
  maxZoom = DEFAULT_MAX_ZOOM,
  zoomSensitivity = DEFAULT_ZOOM_SENSITIVITY,
  scrollPanSpeed = DEFAULT_SCROLL_PAN_SPEED,
  maxFitZoom = DEFAULT_MAX_FIT_ZOOM,
  initialPan = { x: 0, y: 0 },
  initialZoom = 1,
  onViewportChange,
}: UseCanvasNavigationOptions = {}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [pan, setPanState] = useState<CanvasPoint>(initialPan)
  const [zoom, setZoomState] = useState(() => clamp(initialZoom, minZoom, maxZoom))
  const [isPanning, setIsPanning] = useState(false)
  const panRef = useRef(pan)
  const zoomRef = useRef(zoom)
  const onViewportChangeRef = useRef(onViewportChange)
  const middlePanRef = useRef({
    active: false,
    pointerId: null as number | null,
    startClientX: 0,
    startClientY: 0,
    startPan: initialPan,
  })

  useEffect(() => {
    onViewportChangeRef.current = onViewportChange
  }, [onViewportChange])

  const notifyViewportChange = useCallback((nextPan: CanvasPoint, nextZoom: number) => {
    onViewportChangeRef.current?.({ pan: nextPan, zoom: nextZoom })
  }, [])

  const setPan = useCallback(
    (action: SetStateAction<CanvasPoint>) => {
      const nextPan = resolveStateAction(action, panRef.current)
      panRef.current = nextPan
      setPanState(nextPan)
      notifyViewportChange(nextPan, zoomRef.current)
    },
    [notifyViewportChange],
  )

  const setZoom = useCallback(
    (action: SetStateAction<number>) => {
      const nextZoom = clamp(resolveStateAction(action, zoomRef.current), minZoom, maxZoom)
      zoomRef.current = nextZoom
      setZoomState(nextZoom)
      notifyViewportChange(panRef.current, nextZoom)
    },
    [maxZoom, minZoom, notifyViewportChange],
  )

  useEffect(() => {
    panRef.current = pan
  }, [pan])

  useEffect(() => {
    zoomRef.current = zoom
  }, [zoom])

  const screenToWorld = useCallback(
    (point: Pick<MouseEvent | PointerEvent, "clientX" | "clientY">) => {
      const container = containerRef.current
      if (!container) return null

      const rect = container.getBoundingClientRect()
      return {
        x: (point.clientX - rect.left - panRef.current.x) / zoomRef.current,
        y: (point.clientY - rect.top - panRef.current.y) / zoomRef.current,
      }
    },
    [],
  )

  const centerOnBounds = useCallback(
    (bounds: CanvasBounds, targetZoom = zoomRef.current) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const contentWidth = Math.max(1, bounds.width ?? bounds.maxX - bounds.minX)
      const contentHeight = Math.max(1, bounds.height ?? bounds.maxY - bounds.minY)
      const nextZoom = clamp(targetZoom, minZoom, maxZoom)

      setZoom(nextZoom)
      setPan({
        x: (rect.width - contentWidth * nextZoom) / 2 - bounds.minX * nextZoom,
        y: (rect.height - contentHeight * nextZoom) / 2 - bounds.minY * nextZoom,
      })
    },
    [maxZoom, minZoom, setPan, setZoom],
  )

  const zoomToBounds = useCallback(
    (bounds: CanvasBounds, padding = 80, fitZoom = maxFitZoom) => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const contentWidth = Math.max(1, bounds.width ?? bounds.maxX - bounds.minX)
      const contentHeight = Math.max(1, bounds.height ?? bounds.maxY - bounds.minY)
      const nextZoom = clamp(
        Math.min(
          (rect.width - padding * 2) / contentWidth,
          (rect.height - padding * 2) / contentHeight,
          fitZoom,
        ),
        minZoom,
        maxZoom,
      )

      centerOnBounds(bounds, nextZoom)
    },
    [centerOnBounds, maxFitZoom, maxZoom, minZoom],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return undefined

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()

      if (event.ctrlKey || event.metaKey) {
        const rect = container.getBoundingClientRect()
        const pointerX = event.clientX - rect.left
        const pointerY = event.clientY - rect.top
        const currentZoom = zoomRef.current
        const nextZoom = clamp(currentZoom * (1 - event.deltaY * zoomSensitivity), minZoom, maxZoom)
        const scale = nextZoom / currentZoom

        setZoom(nextZoom)
        setPan((current) => ({
          x: pointerX - (pointerX - current.x) * scale,
          y: pointerY - (pointerY - current.y) * scale,
        }))
        return
      }

      setPan((current) => ({
        x: current.x - (event.shiftKey ? event.deltaY : event.deltaX) * scrollPanSpeed,
        y: current.y - (event.shiftKey ? 0 : event.deltaY) * scrollPanSpeed,
      }))
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (event.button !== 1) return
      event.preventDefault()
      event.stopPropagation()

      middlePanRef.current = {
        active: true,
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        startPan: panRef.current,
      }
      container.setPointerCapture(event.pointerId)
      setIsPanning(true)
    }

    const handlePointerMove = (event: PointerEvent) => {
      const state = middlePanRef.current
      if (!state.active || state.pointerId !== event.pointerId) return
      event.preventDefault()
      setPan({
        x: state.startPan.x + event.clientX - state.startClientX,
        y: state.startPan.y + event.clientY - state.startClientY,
      })
    }

    const stopPanning = (event: PointerEvent) => {
      const state = middlePanRef.current
      if (!state.active || state.pointerId !== event.pointerId) return
      event.preventDefault()
      if (container.hasPointerCapture(event.pointerId))
        container.releasePointerCapture(event.pointerId)
      middlePanRef.current.active = false
      middlePanRef.current.pointerId = null
      setIsPanning(false)
    }

    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("pointerdown", handlePointerDown)
    container.addEventListener("pointermove", handlePointerMove)
    container.addEventListener("pointerup", stopPanning)
    container.addEventListener("pointercancel", stopPanning)

    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("pointerdown", handlePointerDown)
      container.removeEventListener("pointermove", handlePointerMove)
      container.removeEventListener("pointerup", stopPanning)
      container.removeEventListener("pointercancel", stopPanning)
    }
  }, [maxZoom, minZoom, scrollPanSpeed, setPan, setZoom, zoomSensitivity])

  return {
    containerRef,
    pan,
    zoom,
    isPanning,
    panRef,
    zoomRef,
    setPan,
    setZoom,
    screenToWorld,
    centerOnBounds,
    zoomToBounds,
  }
}
