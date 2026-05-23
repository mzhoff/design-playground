"use client"

import { useState } from "react"
import type {
  SidebarGroup,
  SidebarIconName,
  SidebarItem,
  SidebarNavigationPreviewProps,
} from "./contracts"
import { sidebarNavigationMock } from "./mock-data"

const iconLabels: Record<SidebarIconName, string> = {
  dashboard: "□",
  users: "◌",
  blog: "N",
  portfolio: "B",
  services: "W",
  pages: "P",
  documents: "D",
  media: "I",
  team: "T",
  faq: "?",
  settings: "S",
}

export function SidebarNavigationPreview({
  fixture = sidebarNavigationMock,
}: SidebarNavigationPreviewProps) {
  const [collapsed, setCollapsed] = useState(fixture.collapsed)
  const [reorderMode, setReorderMode] = useState(fixture.reorderMode)
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({})

  function toggleGroup(groupId: string) {
    setCollapsedGroups((current) => ({ ...current, [groupId]: !current[groupId] }))
  }

  return (
    <section className="min-h-[760px] rounded-[28px] border border-zinc-200 bg-[#f4f1ea] p-5 text-zinc-950 shadow-sm">
      <div
        className={`mx-auto grid max-w-6xl overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-xl shadow-zinc-950/5 transition-[grid-template-columns] ${
          collapsed ? "grid-cols-[76px_minmax(0,1fr)]" : "grid-cols-[280px_minmax(0,1fr)]"
        }`}
      >
        <aside className="flex h-[720px] flex-col border-r border-zinc-200 bg-[#fcfbf8]">
          <SidebarBrand
            collapsed={collapsed}
            description={fixture.productDescription}
            title={fixture.productName}
          />
          <nav
            className="min-h-0 flex-1 overflow-y-auto px-3 py-3"
            aria-label="Админская навигация"
          >
            <div className="flex flex-col gap-1">
              {fixture.groups.map((group) => (
                <SidebarGroupBlock
                  collapsed={collapsed}
                  group={group}
                  groupCollapsed={Boolean(collapsedGroups[group.id])}
                  key={group.id}
                  reorderMode={reorderMode}
                  onToggleGroup={toggleGroup}
                />
              ))}
            </div>
          </nav>
          <SidebarUser
            collapsed={collapsed}
            email={fixture.user.email}
            name={fixture.user.name}
            role={fixture.user.role}
          />
        </aside>

        <main className="flex min-w-0 flex-col bg-zinc-50">
          <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-5">
            <div className="flex items-center gap-3">
              <button
                aria-pressed={collapsed}
                className="grid h-10 w-10 place-items-center rounded-full border border-zinc-200 text-zinc-600"
                type="button"
                onClick={() => setCollapsed((current) => !current)}
              >
                {collapsed ? "→" : "←"}
              </button>
              <div>
                <h2 className="text-lg font-semibold tracking-[-0.03em]">Navigation / Sidebar</h2>
                <p className="text-xs text-zinc-500">raw import from Gigonom AdminShell</p>
              </div>
            </div>
            <button
              aria-pressed={reorderMode}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                reorderMode
                  ? "bg-zinc-950 text-white"
                  : "border border-zinc-200 bg-white text-zinc-600"
              }`}
              type="button"
              onClick={() => setReorderMode((current) => !current)}
            >
              {reorderMode ? "Reorder mode on" : "Reorder mode"}
            </button>
          </header>
          <div className="grid flex-1 gap-5 p-6 lg:grid-cols-[minmax(0,1fr)_300px]">
            <section className="rounded-[24px] border border-zinc-200 bg-white p-6 shadow-sm">
              <h3 className="text-3xl font-semibold tracking-[-0.05em]">Админская навигация</h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                UI не знает про `next/link`, `usePathname`, base path или конкретные ресурсы. Все
                приходит как menu data, а routing остается adapter-слоем.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <InfoTile label="Groups" value={fixture.groups.length} />
                <InfoTile
                  label="Items"
                  value={fixture.groups.reduce((total, group) => total + group.items.length, 0)}
                />
                <InfoTile label="Reorder" value={reorderMode ? "enabled" : "planned"} />
              </div>
            </section>
            <section className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm">
              <h3 className="text-base font-semibold tracking-[-0.03em]">Reorder contract</h3>
              <ul className="mt-4 flex flex-col gap-3 text-sm leading-6 text-zinc-600">
                <li>Reorder групп целиком.</li>
                <li>Reorder дочерних пунктов внутри группы.</li>
                <li>Locked items не двигаются.</li>
                <li>Cross-group move включается только после согласования.</li>
                <li>Drag hook подключается из prodSQL на INV-06.</li>
              </ul>
            </section>
          </div>
        </main>
      </div>
    </section>
  )
}

function SidebarBrand({
  collapsed,
  description,
  title,
}: {
  collapsed: boolean
  description: string
  title: string
}) {
  return (
    <div className={`flex h-16 items-center gap-3 px-4 ${collapsed ? "justify-center" : ""}`}>
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
        G
      </span>
      {collapsed ? null : (
        <span className="min-w-0">
          <span className="block truncate text-base font-semibold">{title}</span>
          <span className="block truncate text-sm text-zinc-500">{description}</span>
        </span>
      )}
    </div>
  )
}

function SidebarGroupBlock({
  collapsed,
  group,
  groupCollapsed,
  onToggleGroup,
  reorderMode,
}: {
  collapsed: boolean
  group: SidebarGroup
  groupCollapsed: boolean
  onToggleGroup: (groupId: string) => void
  reorderMode: boolean
}) {
  const isSingleItemGroup = group.items.length === 1 && group.items[0]?.icon

  if (isSingleItemGroup) {
    const item = group.items[0]

    return item ? (
      <SidebarItemButton collapsed={collapsed} item={item} reorderMode={reorderMode} topLevel />
    ) : null
  }

  return (
    <div className="flex flex-col py-0.5">
      <button
        aria-expanded={!groupCollapsed}
        className="flex min-h-9 w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
        type="button"
        onClick={() => onToggleGroup(group.id)}
      >
        <SidebarIcon icon={group.icon} />
        {collapsed ? null : <span className="min-w-0 flex-1 truncate">{group.label}</span>}
        {reorderMode ? <DragHandle locked={group.reorderLocked} /> : null}
        {collapsed ? null : <span className="text-zinc-400">{groupCollapsed ? "›" : "⌄"}</span>}
      </button>
      {!collapsed && !groupCollapsed ? (
        <div className="mt-1 ml-5 flex flex-col gap-0.5 border-l border-zinc-200 py-1 pl-3">
          {group.items.map((item) => (
            <SidebarItemButton
              collapsed={collapsed}
              item={item}
              key={item.id}
              reorderMode={reorderMode}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

function SidebarItemButton({
  collapsed,
  item,
  reorderMode,
  topLevel,
}: {
  collapsed: boolean
  item: SidebarItem
  reorderMode: boolean
  topLevel?: boolean
}) {
  return (
    <button
      aria-current={item.active ? "page" : undefined}
      className={`flex min-h-8 w-full items-center gap-3 rounded-xl px-3 py-1.5 text-left text-sm transition ${
        item.active
          ? "bg-zinc-950 text-white"
          : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
      } ${item.disabled ? "pointer-events-none opacity-45" : ""}`}
      disabled={item.disabled}
      type="button"
    >
      {topLevel || item.icon ? <SidebarIcon icon={item.icon} /> : null}
      {collapsed ? null : <span className="min-w-0 flex-1 truncate">{item.label}</span>}
      {!collapsed && item.badge ? (
        <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500">
          {item.badge}
        </span>
      ) : null}
      {reorderMode ? <DragHandle locked={item.reorderLocked} /> : null}
    </button>
  )
}

function SidebarIcon({ icon }: { icon?: SidebarIconName }) {
  return (
    <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-zinc-100 text-[10px] font-bold text-zinc-500">
      {icon ? iconLabels[icon] : "·"}
    </span>
  )
}

function DragHandle({ locked }: { locked?: boolean }) {
  return (
    <span
      className={`ml-auto text-xs ${locked ? "text-zinc-300" : "text-zinc-500"}`}
      title={locked ? "Locked" : "Drag handle"}
    >
      {locked ? "lock" : "grip"}
    </span>
  )
}

function SidebarUser({
  collapsed,
  email,
  name,
  role,
}: {
  collapsed: boolean
  email: string
  name: string
  role: string
}) {
  return (
    <div className="border-t border-zinc-200 p-3">
      <button
        className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm transition hover:bg-zinc-100"
        type="button"
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eee6d8] text-xs font-semibold">
          MP
        </span>
        {collapsed ? null : (
          <span className="min-w-0 flex-1">
            <span className="block truncate font-semibold">{name}</span>
            <span className="block truncate text-xs text-zinc-500">{email}</span>
          </span>
        )}
        {collapsed ? null : <span className="text-xs font-semibold text-zinc-400">{role}</span>}
      </button>
    </div>
  )
}

function InfoTile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-2xl bg-zinc-100 p-4">
      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-400">{label}</div>
      <div className="mt-2 text-xl font-semibold tracking-[-0.03em]">{value}</div>
    </div>
  )
}
