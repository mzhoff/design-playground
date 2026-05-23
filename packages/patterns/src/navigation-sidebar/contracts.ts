export type SidebarIconName =
  | "dashboard"
  | "users"
  | "blog"
  | "portfolio"
  | "services"
  | "pages"
  | "documents"
  | "media"
  | "team"
  | "faq"
  | "settings"

export type SidebarItem = {
  id: string
  label: string
  href?: string
  icon?: SidebarIconName
  badge?: string | number
  active?: boolean
  disabled?: boolean
  draggable?: boolean
  reorderLocked?: boolean
}

export type SidebarGroup = {
  id: string
  label: string
  icon?: SidebarIconName
  description?: string
  collapsedByDefault?: boolean
  draggable?: boolean
  reorderLocked?: boolean
  items: SidebarItem[]
}

export type SidebarUser = {
  name: string
  email: string
  role: string
}

export type SidebarNavigationFixture = {
  productName: string
  productDescription: string
  activePath: string
  collapsed: boolean
  reorderMode: boolean
  groups: SidebarGroup[]
  user: SidebarUser
}

export type SidebarNavigationPreviewProps = {
  fixture?: SidebarNavigationFixture
}
