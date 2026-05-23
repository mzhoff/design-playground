# INV-05: Gigonom 2026 — левая боковая навигация

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

## Цель

Найти левую боковую панель, описать текущую структуру и подготовить будущий reorder UX.

На этапе инвентаризации код не переносим. Фиксируем текущую рабочую навигацию админки, доступную системную sidebar-заготовку, границы между visual component и routing/app menu, а также будущие точки для drag-and-drop reorder.

## Найденные entry points

Подключение sidebar к dashboard:

`apps/admin/src/app/(dashboard)/layout.tsx`

Этот layout оборачивает все dashboard-страницы в `AdminShell`.

Публичный экспорт shell:

`apps/admin/src/widgets/admin-shell/index.ts`

Фактическая рабочая оболочка админки:

`apps/admin/src/widgets/admin-shell/ui/admin-shell.component.tsx`

Фактическая рабочая навигация:

`apps/admin/src/widgets/admin-shell/ui/admin-navigation.component.tsx`

Нижний пользовательский блок sidebar:

`apps/admin/src/widgets/admin-shell/ui/admin-user-menu.component.tsx`

Связанный header state:

`apps/admin/src/shared/lib/admin-shell-header.tsx`

Route/base path helper:

`apps/admin/src/shared/lib/admin-base-path.ts`

Системная sidebar-заготовка:

`apps/admin/src/shared/components/ui/sidebar.tsx`

Responsive hook для системной sidebar-заготовки:

`apps/admin/src/shared/hooks/use-mobile.ts`

## Что найдено в текущем AdminShell

`AdminShell` — фактический рабочий layout админки.

Текущее поведение:

- оборачивает dashboard через `AdminShellHeaderProvider`.
- держит локальное состояние открытия левого sidebar.
- строит layout как две колонки: sidebar и main content.
- в открытом состоянии sidebar занимает примерно `280px`.
- в закрытом состоянии колонка sidebar схлопывается до `0`.
- внутри sidebar рендерятся `Logo`, `AdminNavigation`, `AdminUserMenu`.
- в main area есть sticky header с кнопкой раскрытия/схлопывания.
- content area ограничена максимальной шириной около `1360px`.

Это рабочий продуктовый референс. Его нельзя переносить в дизайн-систему целиком как есть, потому что shell знает про конкретную админку, роутинг и user menu.

## Что найдено в текущем AdminNavigation

`AdminNavigation` — фактический компонент меню.

Текущее назначение:

- показывает группы навигации.
- показывает дочерние элементы внутри групп.
- умеет подсвечивать активный пункт.
- содержит группу настроек с маршрутами `/settings/user`, `/settings/administration`, `/settings/integrations`.
- использует routing/base-path helpers из приложения.

Текущая структура должна быть вынесена не как JSX-дерево, а как данные меню. Для дизайн-системы это критично: визуальный компонент sidebar не должен знать, что такое конкретный ресурс Gigonom, Next route или admin base path.

## Что найдено в системной sidebar-заготовке

В `apps/admin/src/shared/components/ui/sidebar.tsx` лежит более универсальная shadcn-like sidebar-система.

Что в ней уже есть:

- `SidebarProvider`.
- `useSidebar`.
- `Sidebar`.
- `SidebarTrigger`.
- `SidebarRail`.
- `SidebarInset`.
- `SidebarInput`.
- `SidebarHeader`.
- `SidebarFooter`.
- `SidebarSeparator`.
- состояние `expanded` / `collapsed`.
- desktop variants: `sidebar`, `floating`, `inset`.
- desktop collapsible modes: `offcanvas`, `icon`, `none`.
- mobile behavior через `Sheet`.
- cookie `sidebar_state` для сохранения состояния.
- keyboard shortcut `Cmd/Ctrl + B`.
- CSS variables для ширины sidebar и icon-sidebar.

Responsive-логика вынесена в `useIsMobile`:

- mobile breakpoint: `768px`.
- на mobile используется `window.matchMedia`.

Эта заготовка ближе к будущему `packages/ui-react`, чем текущий `AdminShell`, но ее нужно проверить на фактическую применимость к нашему визуальному стилю и требованиям reorder.

## Предлагаемая структура данных меню

Базовый контракт группы:

```ts
type SidebarGroup = {
  id: string;
  label: string;
  description?: string;
  icon?: SidebarIcon;
  items: SidebarItem[];
  collapsedByDefault?: boolean;
  draggable?: boolean;
  reorderLocked?: boolean;
};
```

Базовый контракт пункта:

```ts
type SidebarItem = {
  id: string;
  label: string;
  href?: string;
  icon?: SidebarIcon;
  badge?: string | number;
  description?: string;
  disabled?: boolean;
  hidden?: boolean;
  active?: boolean;
  activeMatch?: "exact" | "startsWith" | RegExp;
  children?: SidebarItem[];
  draggable?: boolean;
  reorderLocked?: boolean;
  meta?: Record<string, unknown>;
};
```

Важно: `href`, `activeMatch` и `renderLink` должны быть adapter-слоем. Сам UI-компонент не должен напрямую импортировать `next/link`, `usePathname`, `withAdminBasePath` или конкретные ресурсы приложения.

## Состояния для Storybook

Минимальный набор stories:

- `Expanded` — sidebar открыт.
- `CollapsedOffcanvas` — sidebar схлопнут до `0`.
- `CollapsedIcon` — будущий icon-only режим.
- `Floating` — floating-вариант из системной sidebar-заготовки.
- `Inset` — inset-вариант с отступом main content.
- `MobileSheetClosed` — mobile sidebar закрыт.
- `MobileSheetOpen` — mobile sidebar открыт через sheet.
- `ActiveItemExact` — активный пункт по точному совпадению.
- `ActiveItemStartsWith` — активный раздел по вложенному route.
- `GroupWithChildren` — группа с дочерними элементами.
- `GroupCollapsed` — группа свернута.
- `Badges` — пункты с badge/count.
- `DisabledItems` — недоступные пункты.
- `FooterUserMenu` — нижний пользовательский блок.
- `WithHeaderActions` — shell header рядом с sidebar.
- `ReorderModeGroups` — режим reorder групп.
- `ReorderModeItems` — режим reorder дочерних пунктов.
- `ReorderLockedItem` — пункт, который нельзя перемещать.
- `EmptyGroup` — пустая группа.

## Где нужен drag-and-drop reorder

Источник будущего drag-and-drop hook:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

На INV-05 код из prodSQL не трогаем. Этот hook будет изучаться отдельной задачей.

Точки интеграции reorder:

- reorder групп целиком.
- reorder дочерних элементов внутри одной группы.
- drag handle у группы.
- drag handle у пункта меню.
- visual placeholder между группами.
- visual placeholder между пунктами.
- locked groups, которые нельзя двигать.
- locked items, которые нельзя двигать.
- режим `reorderMode`, чтобы обычная навигация и настройка меню не конфликтовали.

Опционально после отдельного согласования:

- перемещение пунктов между группами.
- drag пунктов во вложенные children.
- сохранение пользовательского порядка на backend.
- undo/reset пользовательской сортировки.

## Props для универсализации

Для `SidebarNavigation`:

```ts
type SidebarNavigationProps = {
  groups: SidebarGroup[];
  activePath?: string;
  collapsed?: boolean;
  defaultCollapsed?: boolean;
  reorderMode?: boolean;
  allowCrossGroupMove?: boolean;
  renderLink?: (item: SidebarItem, children: React.ReactNode) => React.ReactNode;
  renderIcon?: (icon: SidebarIcon, item: SidebarItem) => React.ReactNode;
  renderBadge?: (item: SidebarItem) => React.ReactNode;
  renderFooter?: () => React.ReactNode;
  onCollapsedChange?: (collapsed: boolean) => void;
  onItemSelect?: (item: SidebarItem) => void;
  onGroupsReorder?: (groups: SidebarGroup[]) => void;
  onGroupItemsReorder?: (groupId: string, items: SidebarItem[]) => void;
  onCrossGroupMove?: (event: SidebarCrossGroupMoveEvent) => void;
};
```

Для `SidebarShell`:

```ts
type SidebarShellProps = {
  sidebar: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  width?: string;
  collapsedWidth?: string;
  mobileBreakpoint?: number;
};
```

## Что можно вынести в пакеты

В `packages/ui-react`:

- `SidebarProvider`.
- `Sidebar`.
- `SidebarTrigger`.
- `SidebarRail`.
- `SidebarInset`.
- `SidebarHeader`.
- `SidebarFooter`.
- `SidebarSeparator`.
- `SidebarGroup`.
- `SidebarItem`.
- `SidebarItemButton`.
- `SidebarDragHandle`.
- `SidebarBadge`.

В `packages/patterns`:

- `AdminSidebarNavigation`.
- `ReorderableSidebarNavigation`.
- `AdminShellLayout`.
- `SidebarUserMenuPattern`.
- adapter examples для Next.js routing.

## Что нельзя тащить в UI-пакеты

Нельзя переносить в базовые UI-компоненты:

- `next/link`.
- `usePathname`.
- `useRouter`.
- `withAdminBasePath`.
- `NEXT_PUBLIC_ADMIN_BASE_PATH`.
- конкретные routes Gigonom.
- конкретные resource slugs Gigonom.
- auth/session-логику user menu.
- sign out.
- backend-сохранение пользовательского порядка.
- конкретный список пунктов меню как часть UI-пакета.

Все это должно остаться в app adapter или demo/config слое.

## Будущее требование

Панель должна поддерживать:

- reorder групп целиком;
- reorder дочерних элементов внутри группы;
- возможное перемещение элементов между группами после отдельного согласования.

## Целевое место

Пакеты:

- `packages/patterns/navigation/sidebar`.
- `packages/patterns/navigation/admin-shell`.
- `packages/ui-react/sidebar`.

Storybook:

- `Navigation / Sidebar`.

Playground:

- `admin-navigation-preview`.

Figma:

- нужен слепок: `да`.

## Риски

- Текущая рабочая панель завязана на конкретный shell админки.
- Active state сейчас связан с routing конкретного Next-приложения.
- В проекте параллельно есть фактический `AdminShell` и системная `ui/sidebar` заготовка, поэтому при переносе нельзя смешать два подхода без решения.
- Reorder требует отдельного режима, иначе drag будет конфликтовать с переходами по ссылкам.
- Drag-and-drop hook из prodSQL нужно сначала изучить отдельной задачей и только потом подключать.
- Нужно предусмотреть keyboard reorder, иначе настройка порядка будет недоступна с клавиатуры.
- User menu и auth не должны попасть в универсальный sidebar.
- Нужно решить, нужен ли нам icon-only collapsed режим как обязательный или достаточно текущего offcanvas-collapse.

## Критерии готовности

- найден компонент sidebar: выполнено.
- описана структура данных меню: выполнено.
- отмечены состояния: выполнено.
- указано, где нужен drag-and-drop: выполнено.
- описаны props для универсализации: выполнено.

## Этап 3: сырой импорт вертикального набора

Статус: перенесено в PR этапа 3.

Что добавлено:

- `packages/patterns/src/navigation-sidebar` — сырой navigation/sidebar kit;
- `SidebarNavigationPreview` — data-driven preview левой админской панели;
- `sidebarNavigationMock`, `sidebarNavigationCollapsedMock`, `sidebarNavigationReorderMock` — mock-состояния;
- `apps/storybook/src/stories/navigation-sidebar.stories.tsx` — истории `Navigation / Sidebar / Raw Import`.

Принятое техническое решение:

- текущие Gigonom routes перенесены как demo data, а не как часть API компонента;
- `next/link`, `usePathname`, auth/session и sign out не переносятся в UI/pattern package;
- reorder mode добавлен только визуально: drag handles, locked group/item, будущие точки интеграции;
- реальный drag-and-drop hook будет изучаться и подключаться отдельно в `INV-06`.

Известный технический долг:

- реализовать pointer и keyboard reorder после выбора DnD hook;
- решить, нужен ли icon-only collapsed режим как обязательный;
- разделить будущий `ui-react/sidebar` и `patterns/navigation/admin-shell`;
- добавить adapter example для Next.js routing только после стабилизации API.
