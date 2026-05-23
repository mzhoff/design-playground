import type { WebsiteBenefitItem, WebsiteCaseItem, WebsiteFeatureItem } from "./types"

export const websiteFeaturesFixture: WebsiteFeatureItem[] = [
  {
    id: "context",
    label: "01",
    title: "Context system",
    description:
      "Sticky rail keeps the narrative stable while screen frames reveal product depth during scroll.",
  },
  {
    id: "strategy",
    label: "02",
    title: "Strategy layer",
    description:
      "Accordion item expands the active feature and gives the screen on the right a focused story.",
  },
  {
    id: "production",
    label: "03",
    title: "Production flow",
    description:
      "The same pattern can explain editor, analytics, automations, onboarding or AI workflows.",
  },
]

export const websiteBenefitsFixture: WebsiteBenefitItem[] = [
  {
    id: "speed",
    title: "Fast production",
    description: "Reusable motion cards for marketing pages and SaaS dashboards.",
    tone: "blue",
  },
  {
    id: "quality",
    title: "High trust",
    description: "Consistent visual grammar without losing product character.",
    tone: "green",
  },
  {
    id: "focus",
    title: "Better focus",
    description: "Scroll-driven sections reduce cognitive load by showing one idea at a time.",
    tone: "amber",
  },
  {
    id: "motion",
    title: "Motion system",
    description: "Motion presets can be calm, expressive or disabled per project.",
    tone: "violet",
  },
]

export const websiteCasesFixture: WebsiteCaseItem[] = [
  {
    id: "library",
    tab: "Library",
    quote: "The content system became visible to the whole team in one product surface.",
    author: "Anna",
    role: "Head of Marketing",
  },
  {
    id: "planner",
    tab: "Planner",
    quote: "Sticky story blocks helped us explain a complex workflow without a heavy video.",
    author: "Mikhail",
    role: "Product Lead",
  },
  {
    id: "assistant",
    tab: "Assistant",
    quote: "Assistant UX now feels like a product module, not a floating afterthought.",
    author: "Elena",
    role: "Content Director",
  },
]
