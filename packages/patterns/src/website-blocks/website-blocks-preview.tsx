"use client"

import { useEffect, useState } from "react"
import { websiteBenefitsFixture, websiteCasesFixture, websiteFeaturesFixture } from "./fixtures"
import type { WebsiteBenefitItem, WebsiteFeatureItem } from "./types"

function toneClass(tone: WebsiteBenefitItem["tone"]) {
  if (tone === "green") return "from-emerald-50 to-teal-50 text-emerald-600"
  if (tone === "amber") return "from-amber-50 to-orange-50 text-amber-600"
  if (tone === "rose") return "from-rose-50 to-pink-50 text-rose-600"
  if (tone === "cyan") return "from-cyan-50 to-sky-50 text-cyan-600"
  if (tone === "violet") return "from-violet-50 to-purple-50 text-violet-600"
  return "from-blue-50 to-indigo-50 text-blue-600"
}

function BrowserMockup() {
  return (
    <div className="mt-14 overflow-hidden rounded-t-[28px] border border-white/70 bg-white/55 shadow-[0_34px_80px_rgba(15,23,42,0.28)] backdrop-blur">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-white/80 px-5 py-4">
        <span className="size-3.5 rounded-full bg-rose-200" />
        <span className="size-3.5 rounded-full bg-amber-200" />
        <span className="size-3.5 rounded-full bg-emerald-200" />
        <span className="ml-3 h-8 w-72 rounded-xl border border-slate-200 bg-white" />
      </div>
      <div className="grid min-h-[360px] grid-cols-[220px_1fr] bg-slate-50 p-5">
        <div className="rounded-3xl bg-slate-950 p-4 text-white">
          <div className="mb-6 h-8 w-24 rounded-full bg-white/10" />
          {Array.from({ length: 6 }).map((_, index) => (
            <div className="mb-3 h-9 rounded-2xl bg-white/10" key={index} />
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 p-5">
          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="h-4 w-24 rounded-full bg-slate-200" />
            <div className="mt-8 h-32 rounded-3xl bg-gradient-to-br from-blue-100 to-cyan-100" />
          </div>
          <div className="rounded-[28px] bg-white p-5 shadow-sm">
            <div className="h-4 w-28 rounded-full bg-slate-200" />
            <div className="mt-8 space-y-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <div className="h-8 rounded-2xl bg-slate-100" key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HeroWebsiteBlock() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#fff_0%,rgba(112,148,255,0.28)_38%,rgba(63,226,232,0.25)_72%,#fff_100%)] px-6 pb-20 pt-28 text-center">
      <div className="mx-auto max-w-6xl">
        <div className="inline-flex items-center gap-2.5 rounded-full bg-white py-1 pl-1 pr-4 text-sm font-semibold text-slate-700 shadow-sm">
          <span className="rounded-full bg-slate-950 px-2.5 py-0.5 text-white">New</span>
          Website motion raw kit
        </div>
        <h1 className="mx-auto mt-8 max-w-5xl text-[clamp(42px,7vw,88px)] font-bold leading-[1.02] tracking-[-0.06em] text-slate-950">
          Explain complex products with scroll-driven website blocks
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-600">
          Hero, card grids, sticky feature showcase, carousel cases and gradient CTA extracted from
          REVERIE landing patterns.
        </p>
        <button
          className="mt-10 rounded-full bg-gradient-to-b from-blue-600 to-indigo-600 px-7 py-4 text-base font-semibold text-white shadow-[0_12px_30px_rgba(37,99,235,0.45)]"
          type="button"
        >
          Preview pattern
        </button>
        <BrowserMockup />
      </div>
    </section>
  )
}

function BenefitsGrid() {
  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-[-0.04em] text-slate-950">
            Reusable feature cards
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-500">
            Image area, icon layer, hover lift and stagger-friendly structure are preserved as a
            reusable pattern.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {websiteBenefitsFixture.map((item) => (
            <article
              className="group rounded-[28px] bg-white p-1.5 shadow-[0_8px_34px_rgba(45,30,133,0.08)] transition-shadow hover:shadow-[0_16px_46px_rgba(45,30,133,0.14)]"
              key={item.id}
            >
              <div
                className={`flex h-44 items-center justify-center rounded-[24px] bg-gradient-to-br ${toneClass(item.tone)}`}
              >
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white/80 text-2xl font-bold shadow-sm transition-transform group-hover:scale-110">
                  {item.title.slice(0, 1)}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold tracking-[-0.02em] text-slate-950">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureScreen({ feature }: { feature: WebsiteFeatureItem }) {
  return (
    <div className="h-[520px] overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-950/10">
      <div className="flex h-full flex-col rounded-[24px] bg-slate-950 p-5 text-white">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em]">
            {feature.label}
          </span>
          <span className="h-2 w-24 rounded-full bg-white/20" />
        </div>
        <div className="mt-auto grid grid-cols-2 gap-4">
          <div className="rounded-3xl bg-white/10 p-4">
            <div className="h-4 w-28 rounded-full bg-white/30" />
            <div className="mt-6 h-40 rounded-3xl bg-gradient-to-br from-blue-500/60 to-cyan-400/40" />
          </div>
          <div className="space-y-3 rounded-3xl bg-white p-4 text-slate-800">
            {Array.from({ length: 5 }).map((_, index) => (
              <div className="h-10 rounded-2xl bg-slate-100" key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function ScrollDrivenFeatureShowcase() {
  const [active, setActive] = useState(0)
  const fallbackFeature: WebsiteFeatureItem = {
    id: "fallback",
    label: "00",
    title: "Feature",
    description: "No feature data",
  }
  const activeFeature =
    websiteFeaturesFixture[active] ?? websiteFeaturesFixture[0] ?? fallbackFeature

  return (
    <section className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl text-[clamp(36px,5vw,62px)] font-bold leading-[1.05] tracking-[-0.06em] text-slate-950">
          Sticky rail and screen frames for product storytelling
        </h2>
        <div className="mt-14 grid gap-14 lg:grid-cols-[340px_minmax(0,1fr)]">
          <div className="self-start lg:sticky lg:top-16">
            {websiteFeaturesFixture.map((feature, index) => {
              const isActive = active === index
              return (
                <button
                  className="relative w-full border-t border-slate-200 py-6 text-left"
                  key={feature.id}
                  onClick={() => setActive(index)}
                  type="button"
                >
                  <h3
                    className={`text-xl font-semibold tracking-[-0.03em] transition-colors ${isActive ? "text-slate-950" : "text-slate-500"}`}
                  >
                    {feature.title}
                  </h3>
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ${isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                  >
                    <div className="overflow-hidden">
                      <p className="mt-2 text-base leading-7 text-slate-500">
                        {feature.description}
                      </p>
                      <span className="mt-5 inline-flex text-sm font-semibold text-slate-950">
                        Learn more
                      </span>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
          <div className="space-y-12">
            <FeatureScreen feature={activeFeature} />
            <div className="grid grid-cols-3 gap-3">
              {websiteFeaturesFixture.map((feature, index) => (
                <button
                  className={`h-2 rounded-full ${index === active ? "bg-slate-950" : "bg-slate-200"}`}
                  key={feature.id}
                  onClick={() => setActive(index)}
                  type="button"
                  aria-label={`Show ${feature.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ToolCaseCarousel() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((current) => (current >= websiteCasesFixture.length - 1 ? 0 : current + 1))
    }, 5000)
    return () => window.clearInterval(timer)
  }, [])

  const fallbackCase = websiteCasesFixture[0] ?? {
    id: "fallback",
    tab: "Case",
    quote: "No case data",
    author: "Team",
    role: "Product",
  }
  const activeCase = websiteCasesFixture[active] ?? fallbackCase

  return (
    <section className="bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-wrap gap-2">
          {websiteCasesFixture.map((item, index) => (
            <button
              className={`rounded-full px-4 py-2 text-sm font-semibold ${index === active ? "bg-white text-slate-950" : "bg-white/10 text-white/70"}`}
              key={item.id}
              onClick={() => setActive(index)}
              type="button"
            >
              {item.tab}
            </button>
          ))}
        </div>
        <div className="grid overflow-hidden rounded-[32px] border border-white/10 bg-black lg:grid-cols-2">
          <div className="flex min-h-[420px] flex-col justify-between p-10">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white text-xl font-bold text-slate-950">
              {activeCase.tab.slice(0, 1)}
            </div>
            <blockquote className="text-[clamp(28px,4vw,44px)] font-medium leading-[1.1] tracking-[-0.05em]">
              {activeCase.quote}
            </blockquote>
            <div>
              <div className="font-semibold">{activeCase.author}</div>
              <div className="text-sm text-white/50">{activeCase.role}</div>
            </div>
          </div>
          <div className="min-h-[420px] bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.45),transparent_34%),radial-gradient(circle_at_80%_70%,rgba(45,212,191,0.36),transparent_30%)] p-10">
            <BrowserMockup />
          </div>
        </div>
      </div>
    </section>
  )
}

function GradientCtaBlock() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-600 via-indigo-500 to-cyan-400 px-8 py-16 text-center text-white shadow-2xl shadow-blue-700/20">
        <h2 className="text-[clamp(30px,5vw,54px)] font-bold leading-[1.05] tracking-[-0.05em]">
          Build the same story faster next time
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-white/75">
          This block keeps the REVERIE CTA structure but replaces router, i18n and assets with
          neutral content slots.
        </p>
        <button
          className="mt-9 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950"
          type="button"
        >
          Create Figma snapshot
        </button>
      </div>
    </section>
  )
}

export function WebsiteBlocksPreview() {
  return (
    <div className="min-h-screen bg-white text-slate-950">
      <HeroWebsiteBlock />
      <BenefitsGrid />
      <ScrollDrivenFeatureShowcase />
      <ToolCaseCarousel />
      <GradientCtaBlock />
    </div>
  )
}
