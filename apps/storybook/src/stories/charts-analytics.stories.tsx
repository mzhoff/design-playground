import {
  AreaTrendChart,
  analyticsMetricsFixture,
  ChartsAnalyticsPreview,
  contentMixFixture,
  DonutDistributionChart,
  keywordGrowthFixture,
  keywordGrowthSeriesFixture,
  MetricCard,
  MilestoneProgress,
  onboardingMilestonesFixture,
  parsingStagesFixture,
  RankedMetricList,
  SegmentedFunnelBar,
  StagedProgressPanel,
  topContentFixture,
  weeklyEngagementFixture,
  weeklyEngagementSeriesFixture,
} from "@design-playground/patterns"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"

const meta = {
  title: "Charts/Analytics/Raw Import",
  component: ChartsAnalyticsPreview,
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof ChartsAnalyticsPreview>

export default meta

type Story = StoryObj<typeof meta>

export const Overview: Story = {
  render: () => <ChartsAnalyticsPreview />,
}

export const MetricCards: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="grid max-w-5xl gap-4 md:grid-cols-2 xl:grid-cols-4">
      {analyticsMetricsFixture.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  ),
}

export const EngagementTrend: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <AreaTrendChart
      caption="Area chart contract extracted from REVERIE analytics page."
      data={weeklyEngagementFixture}
      series={weeklyEngagementSeriesFixture}
      title="Engagement trend"
    />
  ),
}

export const MultiSeriesTrend: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <AreaTrendChart
      caption="Reusable multi-series mode for future SEO and ERP analytics."
      data={keywordGrowthFixture}
      height={260}
      series={keywordGrowthSeriesFixture}
      title="Keyword growth"
    />
  ),
}

export const FunnelMix: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="grid max-w-5xl gap-6 xl:grid-cols-2">
      <DonutDistributionChart
        caption="Content mix from REVERIE strategy onboarding."
        segments={contentMixFixture}
        title="Content funnel mix"
      />
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-zinc-950">Segmented funnel bar</h3>
        <div className="mt-6">
          <SegmentedFunnelBar segments={contentMixFixture.slice(0, 3)} />
        </div>
      </section>
    </div>
  ),
}

export const RankedContent: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => <RankedMetricList items={topContentFixture} title="Top content" />,
}

export const ProgressStates: Story = {
  parameters: {
    layout: "padded",
  },
  render: () => (
    <div className="grid max-w-5xl gap-6 xl:grid-cols-2">
      <MilestoneProgress progress={onboardingMilestonesFixture} />
      <StagedProgressPanel stages={parsingStagesFixture} />
    </div>
  ),
}
