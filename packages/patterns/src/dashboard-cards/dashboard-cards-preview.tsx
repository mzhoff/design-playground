import { CreateDashboardCard, DashboardCard, DashboardEmptyState } from "./dashboard-card"
import { dashboardCardsFixture } from "./fixtures"

export function DashboardCardsPreview() {
  return (
    <div className="min-h-[760px] bg-slate-100 p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
              Data Display
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Dashboard cards raw kit
            </h2>
          </div>
          <div className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500 shadow-sm">
            prodSQL source
          </div>
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <CreateDashboardCard />
          {dashboardCardsFixture.map((card) => (
            <DashboardCard card={card} key={card.id} />
          ))}
        </div>
        <div className="mt-6">
          <DashboardEmptyState
            actions={
              <>
                <button
                  className="rounded-xl bg-slate-950 px-4 py-2 text-sm font-semibold text-white"
                  type="button"
                >
                  Create first card
                </button>
                <button
                  className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600"
                  type="button"
                >
                  Import file
                </button>
              </>
            }
            description="Empty and search-empty states are part of the same dashboard card family. Actions remain consumer-owned."
            title="No search results"
          />
        </div>
      </div>
    </div>
  )
}
