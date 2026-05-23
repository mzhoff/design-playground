import type {
  ChartSeriesConfig,
  DistributionSegment,
  MetricCardData,
  MilestoneProgressData,
  RankedMetricItem,
  StagedProgressItem,
  TimeSeriesPoint,
} from "./types"

export const analyticsMetricsFixture: MetricCardData[] = [
  {
    id: "clicks",
    label: "Total clicks",
    value: "12 480",
    caption: "UTM links and tracked posts",
    tone: "blue",
    trend: { direction: "up", value: 12, label: "vs previous period" },
  },
  {
    id: "published",
    label: "Published",
    value: 86,
    caption: "Content units shipped",
    tone: "emerald",
    trend: { direction: "up", value: 5, label: "week over week" },
  },
  {
    id: "scheduled",
    label: "Scheduled",
    value: 34,
    caption: "Upcoming content units",
    tone: "amber",
  },
  {
    id: "engagement",
    label: "Avg. engagement",
    value: "4.2%",
    caption: "Estimated audience response",
    tone: "violet",
    trend: { direction: "down", value: 2, label: "needs attention" },
  },
]

export const weeklyEngagementFixture: TimeSeriesPoint[] = [
  { label: "Mon", clicks: 120, published: 2 },
  { label: "Tue", clicks: 190, published: 3 },
  { label: "Wed", clicks: 170, published: 4 },
  { label: "Thu", clicks: 260, published: 5 },
  { label: "Fri", clicks: 310, published: 3 },
  { label: "Sat", clicks: 240, published: 2 },
  { label: "Sun", clicks: 380, published: 4 },
]

export const weeklyEngagementSeriesFixture: ChartSeriesConfig[] = [
  {
    key: "clicks",
    label: "Clicks",
    color: "#2563eb",
    gradientFrom: "rgba(37, 99, 235, 0.28)",
    gradientTo: "rgba(37, 99, 235, 0)",
  },
]

export const keywordGrowthFixture: TimeSeriesPoint[] = [
  { label: "W1", organic: 42, branded: 18, paid: 14 },
  { label: "W2", organic: 56, branded: 23, paid: 18 },
  { label: "W3", organic: 61, branded: 30, paid: 20 },
  { label: "W4", organic: 78, branded: 36, paid: 24 },
  { label: "W5", organic: 91, branded: 42, paid: 22 },
  { label: "W6", organic: 118, branded: 49, paid: 28 },
]

export const keywordGrowthSeriesFixture: ChartSeriesConfig[] = [
  { key: "organic", label: "Organic", color: "#2563eb" },
  { key: "branded", label: "Branded", color: "#10b981" },
  { key: "paid", label: "Paid", color: "#f59e0b" },
]

export const contentMixFixture: DistributionSegment[] = [
  {
    id: "tofu",
    label: "ToFu",
    value: 35,
    color: "#38bdf8",
    description: "Awareness and top-of-funnel reach",
  },
  {
    id: "mofu",
    label: "MoFu",
    value: 30,
    color: "#fbbf24",
    description: "Education and consideration",
  },
  {
    id: "bofu",
    label: "BoFu",
    value: 25,
    color: "#10b981",
    description: "Conversion and sales enablement",
  },
  {
    id: "retention",
    label: "Retention",
    value: 10,
    color: "#a78bfa",
    description: "Loyalty, upsell and lifecycle content",
  },
]

export const topContentFixture: RankedMetricItem[] = [
  {
    id: "content-1",
    title: "Founder narrative launch thread",
    eyebrow: "Brand strategy",
    channel: "Telegram",
    value: "3 420",
    caption: "clicks",
    tone: "sky",
  },
  {
    id: "content-2",
    title: "Product teardown carousel",
    eyebrow: "Education",
    channel: "Instagram",
    value: "2 180",
    caption: "clicks",
    tone: "rose",
  },
  {
    id: "content-3",
    title: "Customer proof landing update",
    eyebrow: "Conversion",
    channel: "Website",
    value: "1 740",
    caption: "clicks",
    tone: "emerald",
  },
]

export const onboardingMilestonesFixture: MilestoneProgressData = {
  percent: 80,
  label: "Channels analyzed",
  milestones: [
    { id: "sources", label: "Sources", threshold: 0 },
    { id: "analysis", label: "Analysis", threshold: 25 },
    { id: "positioning", label: "Positioning", threshold: 50 },
    { id: "audience", label: "Audience", threshold: 65 },
    { id: "channels", label: "Channels", threshold: 80 },
    { id: "strategy", label: "Strategy", threshold: 100 },
  ],
}

export const parsingStagesFixture: StagedProgressItem[] = [
  {
    id: "site-extract",
    label: "Extracting site data",
    status: "done",
    caption: "Core pages and positioning signals are parsed",
  },
  {
    id: "channels-fetch",
    label: "Loading channel content",
    status: "done",
    caption: "Recent posts and audience reactions are collected",
  },
  {
    id: "channels-analyze",
    label: "Analyzing topics",
    status: "active",
    caption: "The system clusters repeated narrative patterns",
  },
  {
    id: "generate",
    label: "Generating strategy hypothesis",
    status: "pending",
  },
]
