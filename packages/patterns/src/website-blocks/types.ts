export interface WebsiteFeatureItem {
  id: string
  title: string
  description: string
  label?: string
}

export interface WebsiteBenefitItem {
  id: string
  title: string
  description: string
  tone: "blue" | "green" | "amber" | "rose" | "cyan" | "violet"
}

export interface WebsiteCaseItem {
  id: string
  tab: string
  quote: string
  author: string
  role: string
}
