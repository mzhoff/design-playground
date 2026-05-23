import type { SidebarNavigationFixture } from "./contracts"

export const sidebarNavigationMock: SidebarNavigationFixture = {
  productName: "Гигоном",
  productDescription: "Админ-панель",
  activePath: "/blog-posts",
  collapsed: false,
  reorderMode: false,
  user: {
    name: "Администратор",
    email: "admin@gigonom.local",
    role: "owner",
  },
  groups: [
    {
      id: "dashboard",
      label: "Панель управления",
      icon: "dashboard",
      items: [
        {
          id: "dashboard-home",
          label: "Панель управления",
          href: "/dashboard",
          icon: "dashboard",
          draggable: false,
          reorderLocked: true,
        },
      ],
      reorderLocked: true,
    },
    {
      id: "users",
      label: "Пользователи",
      icon: "users",
      draggable: true,
      items: [
        { id: "users-list", label: "Пользователи", href: "/users", draggable: true },
        { id: "leads", label: "Лиды", href: "/leads", badge: 18, draggable: true },
        {
          id: "newsletter",
          label: "Подписки на рассылку",
          href: "/newsletter-subscriptions",
          draggable: true,
        },
      ],
    },
    {
      id: "blog",
      label: "Блог",
      icon: "blog",
      draggable: true,
      items: [
        { id: "blog-tags", label: "Теги", href: "/blog-tags", draggable: true },
        {
          id: "blog-posts",
          label: "Статьи",
          href: "/blog-posts",
          active: true,
          badge: 7,
          draggable: true,
        },
        {
          id: "annotations",
          label: "Аннотации",
          href: "/blog-post-annotations",
          draggable: true,
        },
      ],
    },
    {
      id: "portfolio",
      label: "Портфолио",
      icon: "portfolio",
      draggable: true,
      items: [
        { id: "cases", label: "Кейсы", href: "/portfolio-cases", draggable: true },
        { id: "portfolio-tags", label: "Теги", href: "/portfolio-tags", draggable: true },
        { id: "spheres", label: "Сферы", href: "/portfolio-spheres", draggable: true },
        { id: "technologies", label: "Технологии", href: "/technologies", draggable: true },
      ],
    },
    {
      id: "content",
      label: "Контент",
      icon: "pages",
      draggable: true,
      items: [
        { id: "pages", label: "Страницы", href: "/pages", icon: "pages", draggable: true },
        {
          id: "documents",
          label: "Документы",
          href: "/documents",
          icon: "documents",
          draggable: true,
        },
        {
          id: "media",
          label: "Медиабиблиотека",
          href: "/media-library",
          icon: "media",
          draggable: true,
        },
      ],
    },
    {
      id: "settings",
      label: "Настройки",
      icon: "settings",
      draggable: true,
      items: [
        { id: "settings-user", label: "Пользователь", href: "/settings/user", draggable: true },
        {
          id: "settings-admin",
          label: "Администрирование",
          href: "/settings/administration",
          draggable: true,
        },
        {
          id: "settings-integrations",
          label: "Интеграции",
          href: "/settings/integrations",
          draggable: true,
        },
      ],
    },
  ],
}

export const sidebarNavigationCollapsedMock: SidebarNavigationFixture = {
  ...sidebarNavigationMock,
  collapsed: true,
}

export const sidebarNavigationReorderMock: SidebarNavigationFixture = {
  ...sidebarNavigationMock,
  reorderMode: true,
}
