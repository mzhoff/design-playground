import type { DragEvent } from "react"
import { useEffect, useMemo, useRef, useState } from "react"

const hiddenDragImageSrc = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
let sharedHiddenDragImage: HTMLImageElement | null = null

function getHiddenDragImage(): HTMLImageElement | null {
  if (typeof Image === "undefined") {
    return null
  }

  if (sharedHiddenDragImage) {
    return sharedHiddenDragImage
  }

  const image = new Image()
  image.src = hiddenDragImageSrc
  sharedHiddenDragImage = image
  return image
}

export function applyHiddenDragImage(event: DragEvent) {
  const image = getHiddenDragImage()

  if (image) {
    event.dataTransfer.setDragImage(image, 0, 0)
  }
}

export type UseReorderableDragListOptions = {
  itemIds: string[]
  onCommit: (fromIndex: number, toIndex: number) => void
  enabled?: boolean
}

export type ReorderableDragStartArgs = {
  index: number
  itemId: string
  event: DragEvent
}

export type ReorderableDragOverArgs = {
  index: number
  itemId: string
  event: DragEvent
}

export type ReorderableDropArgs = {
  event: DragEvent
}

export function useReorderableDragList({
  enabled = true,
  itemIds,
  onCommit,
}: UseReorderableDragListOptions) {
  const sourceIndexRef = useRef<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [previewOrderIds, setPreviewOrderIds] = useState<string[] | null>(null)
  const [draggingItemId, setDraggingItemId] = useState<string | null>(null)
  const hiddenDragImageRef = useRef<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!hiddenDragImageRef.current) {
      hiddenDragImageRef.current = getHiddenDragImage()
    }
  }, [])

  function cleanup() {
    sourceIndexRef.current = null
    setDragOverIndex(null)
    setDraggingItemId(null)
    setPreviewOrderIds(null)
  }

  function handleDragStart({ event, index, itemId }: ReorderableDragStartArgs) {
    if (!enabled) {
      return
    }

    sourceIndexRef.current = index
    setDraggingItemId(itemId)
    setPreviewOrderIds(itemIds)
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("text/plain", String(index))
    applyHiddenDragImage(event)
  }

  function handleDragOver({ event, index, itemId }: ReorderableDragOverArgs) {
    if (!enabled) {
      return
    }

    event.preventDefault()
    setDragOverIndex(index)

    const sourceIndex = sourceIndexRef.current

    if (sourceIndex === null) {
      return
    }

    const sourceItemId = draggingItemId ?? itemIds[sourceIndex]

    if (!sourceItemId || sourceItemId === itemId) {
      return
    }

    const baseOrder = previewOrderIds ?? itemIds
    const withoutSource = baseOrder.filter((id) => id !== sourceItemId)
    const targetPosition = withoutSource.indexOf(itemId)

    if (targetPosition < 0) {
      return
    }

    const sourcePositionInBase = baseOrder.indexOf(sourceItemId)
    const targetPositionInBase = baseOrder.indexOf(itemId)
    const movingDown = sourcePositionInBase < targetPositionInBase
    const insertPosition = movingDown ? targetPosition + 1 : targetPosition
    const nextOrder = [...withoutSource]
    nextOrder.splice(insertPosition, 0, sourceItemId)

    if (!areOrdersEqual(nextOrder, baseOrder)) {
      setPreviewOrderIds(nextOrder)
    }
  }

  function handleDragLeave() {
    if (enabled) {
      setDragOverIndex(null)
    }
  }

  function handleDrop({ event }: ReorderableDropArgs) {
    if (!enabled) {
      return
    }

    event.preventDefault()

    const sourceIndex = sourceIndexRef.current
    const sourceItemId = draggingItemId ?? (sourceIndex !== null ? itemIds[sourceIndex] : null)

    if (!sourceItemId || sourceIndex === null) {
      cleanup()
      return
    }

    const finalOrder = previewOrderIds ?? itemIds
    const fromIndex = itemIds.indexOf(sourceItemId)
    const toIndex = finalOrder.indexOf(sourceItemId)

    if (fromIndex >= 0 && toIndex >= 0 && fromIndex !== toIndex) {
      onCommit(fromIndex, toIndex)
    }

    cleanup()
  }

  function handleDragEnd() {
    cleanup()
  }

  const renderedIds = useMemo(
    () => (enabled && previewOrderIds ? previewOrderIds : itemIds),
    [enabled, itemIds, previewOrderIds],
  )

  return {
    dragOverIndex,
    draggingItemId,
    handleDragEnd,
    handleDragLeave,
    handleDragOver,
    handleDragStart,
    handleDrop,
    isDragging: draggingItemId !== null,
    renderedIds,
  }
}

export function moveArrayItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
  if (fromIndex === toIndex) {
    return items
  }

  if (fromIndex < 0 || toIndex < 0 || fromIndex >= items.length || toIndex >= items.length) {
    return items
  }

  const nextItems = items.slice()
  const [item] = nextItems.splice(fromIndex, 1)

  if (!item) {
    return items
  }

  nextItems.splice(toIndex, 0, item)
  return nextItems
}

function areOrdersEqual(left: string[], right: string[]) {
  return left.length === right.length && left.every((item, index) => item === right[index])
}
