export type AnalyticsTone = "neutral" | "blue" | "sky" | "amber" | "emerald" | "violet" | "rose"

export type TrendDirection = "up" | "down" | "flat"

export interface MetricTrend {
  direction: TrendDirection
  value: number
  label?: string
}

export interface MetricCardData {
  id: string
  label: string
  value: string
  caption: string
  tone?: AnalyticsTone
  trend?: MetricTrend
}

export interface TimeSeriesPoint {
  label: string
  [metricKey: string]: string | number
}

export interface ChartSeriesConfig {
  key: string
  label: string
  color: string
  gradientFrom?: string
  gradientTo?: string
}

export interface DistributionSegment {
  id: string
  label: string
  value: number
  color: string
  description?: string
}

export interface RankedMetricItem {
  id: string
  title: string
  eyebrow?: string
  channel?: string
  value: string | number
  caption: string
  tone?: AnalyticsTone
}

export interface MilestonePoint {
  id: string
  label: string
  threshold: number
}

export interface MilestoneProgressData {
  percent: number
  label: string
  milestones: MilestonePoint[]
}

export type StageStatus = "pending" | "active" | "done"

export interface StagedProgressItem {
  id: string
  label: string
  status: StageStatus
  caption?: string
}
