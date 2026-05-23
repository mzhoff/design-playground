"use client"

import * as React from "react"
import {
  analyticsMetricsFixture,
  contentMixFixture,
  keywordGrowthFixture,
  keywordGrowthSeriesFixture,
  onboardingMilestonesFixture,
  parsingStagesFixture,
  topContentFixture,
  weeklyEngagementFixture,
  weeklyEngagementSeriesFixture,
} from "./fixtures"
import type {
  AnalyticsTone,
  ChartSeriesConfig,
  DistributionSegment,
  MetricCardData,
  MilestoneProgressData,
  RankedMetricItem,
  StagedProgressItem,
  TimeSeriesPoint,
} from "./types"

const toneClasses: Record<AnalyticsTone, string> = {
  neutral: "bg-zinc-100 text-zinc-700 border-zinc-200",
  blue: "bg-blue-50 text-blue-700 border-blue-100",
  sky: "bg-sky-50 text-sky-700 border-sky-100",
  amber: "bg-amber-50 text-amber-700 border-amber-100",
  emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
  violet: "bg-violet-50 text-violet-700 border-violet-100",
  rose: "bg-rose-50 text-rose-700 border-rose-100",
}

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ")

const clampPercent = (value: number) => Math.max(0, Math.min(100, value))

const getNumericValue = (point: TimeSeriesPoint, key: string) => {
  const value = point[key]
  return typeof value === "number" ? value : 0
}

const buildPolylinePoints = ({
  data,
  seriesKey,
  width,
  height,
  paddingX,
  paddingY,
  maxValue,
}: {
  data: TimeSeriesPoint[]
  seriesKey: string
  width: number
  height: number
  paddingX: number
  paddingY: number
  maxValue: number
}) =>
  data.map((point, itemIndex) => {
    const x = paddingX + (itemIndex / Math.max(data.length - 1, 1)) * (width - paddingX * 2)
    const y =
      height -
      paddingY -
      (getNumericValue(point, seriesKey) / Math.max(maxValue, 1)) * (height - paddingY * 2)

    return { x, y, label: point.label, value: getNumericValue(point, seriesKey) }
  })

export function MetricCard({ metric }: { metric: MetricCardData }) {
  const trend = metric.trend
  const trendLabel = trend
    ? `${trend.direction === "down" ? "-" : trend.direction === "up" ? "+" : ""}${trend.value}%`
    : null

  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-zinc-500">{metric.label}</p>
          <strong className="mt-3 block text-3xl font-semibold tracking-tight text-zinc-950">
            {metric.value}
          </strong>
        </div>
        <span
          className={cx(
            "rounded-xl border px-2.5 py-1 text-xs font-semibold",
            toneClasses[metric.tone ?? "neutral"],
          )}
        >
          {metric.tone ?? "metric"}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between gap-3 text-xs">
        <span className="text-zinc-500">{metric.caption}</span>
        {trend && trendLabel ? (
          <span
            className={cx(
              "rounded-full px-2 py-1 font-semibold",
              trend.direction === "down"
                ? "bg-rose-50 text-rose-700"
                : trend.direction === "up"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-zinc-100 text-zinc-600",
            )}
            title={trend.label}
          >
            {trendLabel}
          </span>
        ) : null}
      </div>
    </article>
  )
}

export function AreaTrendChart({
  title,
  caption,
  data,
  series,
  height = 300,
}: {
  title: string
  caption?: string
  data: TimeSeriesPoint[]
  series: ChartSeriesConfig[]
  height?: number
}) {
  const chart = React.useMemo(() => {
    const width = 760
    const paddingX = 40
    const paddingY = 34
    const values = data.flatMap((point) => series.map((item) => getNumericValue(point, item.key)))
    const maxValue = Math.max(...values, 1)
    const firstSeries = series[0]
    const firstPoints = firstSeries
      ? buildPolylinePoints({
          data,
          seriesKey: firstSeries.key,
          width,
          height,
          paddingX,
          paddingY,
          maxValue,
        })
      : []
    const areaPath = firstPoints.length
      ? `${firstPoints
          .map((point, pointIndex) => `${pointIndex === 0 ? "M" : "L"}${point.x},${point.y}`)
          .join(" ")} L${width - paddingX},${height - paddingY} L${paddingX},${height - paddingY} Z`
      : ""

    return { areaPath, firstPoints, maxValue, paddingX, paddingY, width }
  }, [data, height, series])

  const gradientId = React.useId().replace(/:/g, "")
  const primarySeries = series[0]

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
          {caption ? <p className="mt-1 text-sm text-zinc-500">{caption}</p> : null}
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          {series.map((item) => (
            <span key={item.key} className="flex items-center gap-2 text-xs text-zinc-500">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              {item.label}
            </span>
          ))}
        </div>
      </div>
      <svg
        aria-label={title}
        className="h-auto w-full overflow-visible"
        role="img"
        viewBox={`0 0 ${chart.width} ${height}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
            <stop
              offset="5%"
              stopColor={primarySeries?.gradientFrom ?? "rgba(37, 99, 235, 0.22)"}
            />
            <stop offset="95%" stopColor={primarySeries?.gradientTo ?? "rgba(37, 99, 235, 0)"} />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => {
          const y = chart.paddingY + (line / 3) * (height - chart.paddingY * 2)
          return (
            <line
              key={`grid-${line}`}
              stroke="#f4f4f5"
              strokeDasharray="4 5"
              strokeWidth="1"
              x1={chart.paddingX}
              x2={chart.width - chart.paddingX}
              y1={y}
              y2={y}
            />
          )
        })}
        {primarySeries && chart.areaPath ? (
          <path d={chart.areaPath} fill={`url(#${gradientId})`} />
        ) : null}
        {series.map((item) => {
          const points = buildPolylinePoints({
            data,
            seriesKey: item.key,
            width: chart.width,
            height,
            paddingX: chart.paddingX,
            paddingY: chart.paddingY,
            maxValue: chart.maxValue,
          })
          const linePath = points
            .map((point, pointIndex) => `${pointIndex === 0 ? "M" : "L"}${point.x},${point.y}`)
            .join(" ")

          return (
            <g key={item.key}>
              <path
                d={linePath}
                fill="none"
                stroke={item.color}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
              />
              {points.map((point) => (
                <circle
                  key={`${item.key}-${point.label}`}
                  cx={point.x}
                  cy={point.y}
                  fill="#fff"
                  r="4"
                  stroke={item.color}
                  strokeWidth="2"
                />
              ))}
            </g>
          )
        })}
        {chart.firstPoints.map((point) => (
          <text
            key={point.label}
            fill="#71717a"
            fontSize="12"
            textAnchor="middle"
            x={point.x}
            y={height - 8}
          >
            {point.label}
          </text>
        ))}
      </svg>
    </section>
  )
}

export function DonutDistributionChart({
  title,
  caption,
  segments,
}: {
  title: string
  caption?: string
  segments: DistributionSegment[]
}) {
  const radius = 72
  const circumference = 2 * Math.PI * radius
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)
  let offset = 0

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
        {caption ? <p className="mt-1 text-sm text-zinc-500">{caption}</p> : null}
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
        <svg aria-label={title} className="mx-auto h-52 w-52" role="img" viewBox="0 0 200 200">
          <circle cx="100" cy="100" fill="none" r={radius} stroke="#f4f4f5" strokeWidth="24" />
          {segments.map((segment) => {
            const arc = total > 0 ? (segment.value / total) * circumference : 0
            const strokeDashoffset = -offset
            offset += arc

            return (
              <circle
                key={segment.id}
                cx="100"
                cy="100"
                fill="none"
                r={radius}
                stroke={segment.color}
                strokeDasharray={`${arc} ${circumference - arc}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                strokeWidth="24"
                transform="rotate(-90 100 100)"
              />
            )
          })}
          <text fill="#18181b" fontSize="24" fontWeight="700" textAnchor="middle" x="100" y="96">
            {total}%
          </text>
          <text fill="#71717a" fontSize="11" textAnchor="middle" x="100" y="116">
            mix total
          </text>
        </svg>
        <div className="grid gap-3 sm:grid-cols-2">
          {segments.map((segment) => (
            <div key={segment.id} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
                  <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: segment.color }} />
                  {segment.label}
                </span>
                <strong className="text-sm text-zinc-950">{segment.value}%</strong>
              </div>
              {segment.description ? (
                <p className="mt-2 text-xs leading-5 text-zinc-500">{segment.description}</p>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SegmentedFunnelBar({
  segments,
  compact = false,
}: {
  segments: DistributionSegment[]
  compact?: boolean
}) {
  const total = segments.reduce((sum, segment) => sum + segment.value, 0)

  return (
    <div className="space-y-3">
      <div className={cx("flex overflow-hidden rounded-full bg-zinc-100", compact ? "h-2" : "h-3")}>
        {segments.map((segment) => (
          <div
            key={segment.id}
            className="transition-all"
            style={{
              backgroundColor: segment.color,
              width: `${total > 0 ? (segment.value / total) * 100 : 0}%`,
            }}
            title={`${segment.label}: ${segment.value}%`}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">
        {segments.map((segment) => (
          <span key={segment.id} className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
            {segment.label} {segment.value}%
          </span>
        ))}
      </div>
    </div>
  )
}

export function RankedMetricList({ title, items }: { title: string; items: RankedMetricItem[] }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-950">{title}</h3>
      <div className="mt-4 space-y-3">
        {items.map((item, itemIndex) => (
          <article
            key={item.id}
            className="flex items-start gap-3 rounded-xl border border-transparent p-3 transition hover:border-zinc-200 hover:bg-zinc-50"
          >
            <span className="w-8 shrink-0 text-sm font-bold text-zinc-300">
              {String(itemIndex + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-zinc-950">{item.title}</p>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                {item.eyebrow ? <span>{item.eyebrow}</span> : null}
                {item.channel ? (
                  <span
                    className={cx(
                      "rounded-full border px-2 py-0.5",
                      toneClasses[item.tone ?? "neutral"],
                    )}
                  >
                    {item.channel}
                  </span>
                ) : null}
              </div>
            </div>
            <div className="text-right">
              <strong className="text-sm text-zinc-950">{item.value}</strong>
              <p className="text-[10px] uppercase tracking-[0.12em] text-zinc-400">
                {item.caption}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function MilestoneProgress({ progress }: { progress: MilestoneProgressData }) {
  const percent = clampPercent(progress.percent)

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-zinc-950">Strategy progress</h3>
          <p className="mt-1 text-sm text-zinc-500">{progress.label}</p>
        </div>
        <strong className="text-2xl font-semibold text-blue-600">{percent}%</strong>
      </div>
      <div className="relative mt-6">
        <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          {progress.milestones.map((milestone) => (
            <span
              key={milestone.id}
              className={cx(
                "absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition",
                percent >= milestone.threshold
                  ? "border-blue-600 bg-blue-600"
                  : "border-zinc-200 bg-white",
              )}
              style={{ left: `${clampPercent(milestone.threshold)}%` }}
              title={milestone.label}
            />
          ))}
        </div>
      </div>
      <div className="mt-4 grid gap-2 text-xs text-zinc-500 sm:grid-cols-3">
        {progress.milestones.map((milestone) => (
          <span key={milestone.id}>{milestone.label}</span>
        ))}
      </div>
    </section>
  )
}

export function StagedProgressPanel({ stages }: { stages: StagedProgressItem[] }) {
  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-zinc-950">Generation stages</h3>
      <div className="mt-4 space-y-2.5">
        {stages.map((stage) => (
          <article
            key={stage.id}
            className={cx(
              "flex items-start gap-3 rounded-xl border p-3 transition",
              stage.status === "done" && "border-emerald-100 bg-emerald-50/60",
              stage.status === "active" && "border-blue-100 bg-blue-50/70",
              stage.status === "pending" && "border-zinc-100 bg-zinc-50",
            )}
          >
            <span
              className={cx(
                "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold",
                stage.status === "done" && "bg-emerald-100 text-emerald-700",
                stage.status === "active" && "bg-blue-100 text-blue-700",
                stage.status === "pending" && "bg-zinc-200 text-zinc-500",
              )}
            >
              {stage.status === "done" ? "✓" : stage.status === "active" ? "…" : ""}
            </span>
            <div>
              <p className="text-sm font-semibold text-zinc-950">{stage.label}</p>
              {stage.caption ? <p className="mt-1 text-xs text-zinc-500">{stage.caption}</p> : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function ChartsAnalyticsPreview() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6 text-zinc-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-col gap-3 rounded-3xl bg-zinc-950 p-8 text-white md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
              REVERIE raw import
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight md:text-5xl">
              Analytics and chart patterns
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-zinc-300">
            KPI cards, engagement trend, ranked content, funnel mix and progress states extracted as
            reusable UI contracts before a final chart library decision.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {analyticsMetricsFixture.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
          <AreaTrendChart
            caption="Raw replacement for REVERIE EngagementChart based on weekly click data."
            data={weeklyEngagementFixture}
            series={weeklyEngagementSeriesFixture}
            title="Engagement trend"
          />
          <RankedMetricList items={topContentFixture} title="Top content" />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <AreaTrendChart
            caption="Future reusable multi-series variant for SEO and acquisition dashboards."
            data={keywordGrowthFixture}
            height={260}
            series={keywordGrowthSeriesFixture}
            title="Keyword growth"
          />
          <DonutDistributionChart
            caption="Raw content mix visualization from strategy onboarding."
            segments={contentMixFixture}
            title="Content funnel mix"
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-zinc-950">Segmented funnel bar</h3>
            <div className="mt-6">
              <SegmentedFunnelBar segments={contentMixFixture.slice(0, 3)} />
            </div>
          </section>
          <MilestoneProgress progress={onboardingMilestonesFixture} />
        </div>

        <StagedProgressPanel stages={parsingStagesFixture} />
      </div>
    </div>
  )
}
