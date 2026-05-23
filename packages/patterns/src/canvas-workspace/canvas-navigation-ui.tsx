import type { CSSProperties, ReactNode } from "react"
import type { CanvasPoint } from "./types"

function joinClasses(...classes: Array<string | undefined | false>) {
  return classes.filter(Boolean).join(" ")
}

function getCanvasGridBaseStep() {
  if (typeof window === "undefined") return 20

  const rawValue = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue("--canvas-grid-base-step")
    .trim()
  const value = Number.parseFloat(rawValue)
  return Number.isFinite(value) && value > 0 ? value : 20
}

export function CanvasGridBackground({
  pan,
  zoom,
  darkMode = false,
  className,
}: {
  pan: CanvasPoint
  zoom: number
  darkMode?: boolean
  className?: string
}) {
  const baseStep = getCanvasGridBaseStep()
  const worldStep = zoom < 0.25 ? baseStep * 4 : zoom < 0.5 ? baseStep * 2 : baseStep
  const screenStep = Math.max(4, worldStep * zoom)
  const dotRadius = zoom < 0.35 ? 0.5 : 1
  const dotColor = darkMode ? "rgba(148, 163, 184, 0.34)" : "rgba(71, 85, 105, 0.22)"

  return (
    <div
      className={joinClasses("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotRadius}px, transparent ${dotRadius}px)`,
        backgroundPosition: `${pan.x}px ${pan.y}px`,
        backgroundSize: `${screenStep}px ${screenStep}px`,
      }}
    />
  )
}

export function CanvasZoomIndicator({
  children,
  className,
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div
      className={joinClasses(
        "absolute bottom-3 right-3 z-30 select-none rounded-lg border border-slate-200 bg-white/90 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-sm",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
