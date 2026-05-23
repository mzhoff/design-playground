import {
  securitySphereAdminRowsFixture,
  securitySphereCatalogFiltersFixture,
  securitySphereFormTabsFixture,
  securitySphereUploadStatesFixture,
  securitySphereWebsiteCardsFixture,
} from "./fixtures"
import type {
  SecuritySphereAdminRow,
  SecuritySphereAdminStatus,
  SecuritySphereFormTab,
  SecuritySphereUploadState,
  SecuritySphereWebsiteCard,
} from "./types"

const cx = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ")

const adminStatusTone: Record<SecuritySphereAdminStatus, string> = {
  draft: "bg-zinc-100 text-zinc-700 border-zinc-200",
  active: "bg-emerald-50 text-emerald-700 border-emerald-100",
  review: "bg-blue-50 text-blue-700 border-blue-100",
  archived: "bg-zinc-100 text-zinc-500 border-zinc-200",
  error: "bg-rose-50 text-rose-700 border-rose-100",
}

const formTabTone = {
  clean: "bg-white text-zinc-600 border-zinc-200",
  invalid: "bg-rose-50 text-rose-700 border-rose-100",
  saved: "bg-emerald-50 text-emerald-700 border-emerald-100",
}

const uploadStateTone = {
  empty: "border-dashed border-zinc-300 bg-zinc-50 text-zinc-500",
  uploading: "border-blue-200 bg-blue-50 text-blue-700",
  uploaded: "border-emerald-200 bg-emerald-50 text-emerald-700",
  error: "border-rose-200 bg-rose-50 text-rose-700",
}

export function SecuritySphereHeaderReference() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Website header
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            Sticky hide-on-scroll shell
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-zinc-100 px-3 py-1.5 text-zinc-600">near top</span>
          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-blue-700">scrolled</span>
          <span className="rounded-full bg-zinc-950 px-3 py-1.5 text-white">
            visible on scroll up
          </span>
        </div>
      </div>
      <div className="rounded-[2rem] border border-zinc-200 bg-zinc-950 p-3 text-white shadow-xl">
        <div className="flex items-center justify-between gap-4 rounded-[1.4rem] bg-white px-4 py-3 text-zinc-950">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              SS
            </div>
            <div>
              <p className="text-sm font-semibold">Security Sphere</p>
              <p className="text-[11px] text-zinc-500">Next.js website navigation</p>
            </div>
          </div>
          <nav className="hidden gap-5 text-sm font-medium text-zinc-600 md:flex">
            <span>Курсы</span>
            <span>Новости</span>
            <span>Документы</span>
            <span>Контакты</span>
          </nav>
          <button
            className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
            type="button"
          >
            Поддержка
          </button>
        </div>
      </div>
    </section>
  )
}

export function SecuritySphereWebsiteCardPreview({ card }: { card: SecuritySphereWebsiteCard }) {
  return (
    <article className="group overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className={cx("h-44 bg-gradient-to-br", card.tone)} />
      <div className="p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
          <span>{card.eyebrow}</span>
          <span>{card.meta}</span>
        </div>
        <h3 className="min-h-16 text-xl font-semibold leading-7 tracking-tight text-zinc-950">
          {card.title}
        </h3>
        <div className="mt-6 flex items-center gap-3">
          <span className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            {card.cta}
          </span>
          <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 opacity-0 transition group-hover:opacity-100">
            Открыть
          </span>
        </div>
      </div>
    </article>
  )
}

export function SecuritySphereWebsiteReference() {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Website blocks
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            Catalog and content cards
          </h2>
        </div>
        <div className="flex flex-wrap gap-2">
          {securitySphereCatalogFiltersFixture.map((filter) => (
            <span
              className={cx(
                "rounded-full border px-3 py-1.5 text-xs font-semibold",
                filter.active
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-zinc-200 bg-white text-zinc-500",
              )}
              key={filter.id}
            >
              {filter.label}
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {securitySphereWebsiteCardsFixture.map((card) => (
          <SecuritySphereWebsiteCardPreview card={card} key={card.id} />
        ))}
      </div>
    </section>
  )
}

export function SecuritySphereAdminListReference({
  rows = securitySphereAdminRowsFixture,
}: {
  rows?: SecuritySphereAdminRow[]
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Admin CRUD
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            ListView and DataTable baseline
          </h2>
        </div>
        <div className="flex gap-2">
          <span className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs text-zinc-500">
            Filters
          </span>
          <button
            className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
            type="button"
          >
            Создать
          </button>
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-zinc-200">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-[0.12em] text-zinc-400">
            <tr>
              <th className="px-4 py-3">Название</th>
              <th className="px-4 py-3">Статус</th>
              <th className="px-4 py-3">Мета</th>
              <th className="px-4 py-3 text-right">Действия</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr className="border-t border-zinc-100" key={row.id}>
                <td className="px-4 py-4">
                  <p className="font-semibold text-zinc-950">{row.title}</p>
                  <p className="mt-1 text-xs text-zinc-500">{row.updatedAt}</p>
                </td>
                <td className="px-4 py-4">
                  <span
                    className={cx(
                      "rounded-full border px-2 py-0.5 text-[11px] font-semibold",
                      adminStatusTone[row.status],
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-4 text-zinc-500">{row.meta}</td>
                <td className="px-4 py-4 text-right text-xs font-semibold text-blue-700">Edit</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">
          Loading state: spinner row inside table body.
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">
          Error state: full-width row with message.
        </div>
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-sm text-zinc-500">
          Empty state: full-width row with no results.
        </div>
      </div>
    </section>
  )
}

export function SecuritySphereFormShellReference({
  tabs = securitySphereFormTabsFixture,
}: {
  tabs?: SecuritySphereFormTab[]
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
            Admin forms
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
            CreateView, sticky tabs and header actions
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
            Security Sphere дает полезный baseline для длинных форм: действия в header, контент
            отдельно, sticky tabs и состояния ошибок по вкладкам.
          </p>
        </div>
        <button
          className="rounded-xl bg-zinc-950 px-4 py-2 text-sm font-semibold text-white"
          type="button"
        >
          Сохранить
        </button>
      </div>
      <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-zinc-200 bg-zinc-50 p-2">
        {tabs.map((tab) => (
          <span
            className={cx(
              "rounded-xl border px-3 py-2 text-sm font-semibold",
              formTabTone[tab.state ?? "clean"],
            )}
            key={tab.id}
          >
            {tab.label}
          </span>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-zinc-700">
          Название
          <input
            className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none"
            defaultValue="Курс по информационной безопасности"
          />
        </label>
        <div className="grid gap-2 text-sm font-medium text-zinc-700">
          <span>Статус</span>
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-zinc-500">
            Combobox: active / draft / archived
          </div>
        </div>
        <label className="grid gap-2 text-sm font-medium text-zinc-700 md:col-span-2">
          Описание
          <textarea
            className="min-h-28 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 outline-none"
            defaultValue="Форма показывает shell, а не доменную модель Security Sphere."
          />
        </label>
      </div>
    </section>
  )
}

export function SecuritySphereFileUploadReference({
  states = securitySphereUploadStatesFixture,
}: {
  states?: SecuritySphereUploadState[]
}) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">Forms</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950">
          FileUploadField states
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {states.map((state) => (
          <article
            className={cx("rounded-2xl border p-4", uploadStateTone[state.state])}
            key={state.id}
          >
            <div className="mb-4 flex h-28 items-center justify-center rounded-xl bg-white/70 text-sm font-semibold">
              {state.filename || "Drop zone"}
            </div>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold">{state.type}</span>
              <span className="rounded-full bg-white/80 px-2 py-0.5 text-[11px] font-semibold">
                {state.state}
              </span>
            </div>
            <p className="mt-2 text-xs leading-5">{state.caption}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export function SecuritySphereReferencePreview() {
  return (
    <div className="min-h-screen bg-zinc-100 p-6 text-zinc-950">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="rounded-[2rem] bg-zinc-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
            Security Sphere raw UI reference
          </p>
          <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-end">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
              Website and admin baseline components
            </h1>
            <p className="text-sm leading-6 text-zinc-300">
              Очищенный ранний UI-референс: header behavior, website cards, CRUD list baseline, form
              shell, file upload states. Финальные решения сравниваем с Gigonom 2026.
            </p>
          </div>
        </header>
        <SecuritySphereHeaderReference />
        <SecuritySphereWebsiteReference />
        <SecuritySphereAdminListReference />
        <SecuritySphereFormShellReference />
        <SecuritySphereFileUploadReference />
      </div>
    </div>
  )
}
