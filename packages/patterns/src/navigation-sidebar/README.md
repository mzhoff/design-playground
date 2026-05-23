# Navigation Sidebar raw kit

## Происхождение

Срез собран для `INV-05` из Gigonom 2026:

- `apps/admin/src/widgets/admin-shell/ui/admin-navigation.component.tsx`;
- `apps/admin/src/widgets/admin-shell/ui/admin-shell.component.tsx`;
- `apps/admin/src/widgets/admin-shell/ui/admin-user-menu.component.tsx`.

## Что перенесено на этапе 3

- Data-driven структура групп и пунктов меню.
- Expanded/collapsed shell preview.
- Active item, badges, footer user block.
- Reorder mode как визуальный режим с drag handles и locked items.
- Storybook stories для expanded, collapsed и reorder mode.

## Что не переносилось намеренно

- `next/link`, `usePathname`, `useRouter`, `withAdminBasePath`.
- Auth/session, sign out и реальные user actions.
- Конкретный список Gigonom routes как часть production API.
- Drag-and-drop hook из prodSQL, потому что это отдельная задача `INV-06`.

## Текущие ограничения

- Reorder mode пока визуальный, без pointer/keyboard reorder логики.
- Cross-group move не реализован и требует отдельного согласования.
- Icon-only collapsed режим показан как preview, не как финальная системная sidebar API.
- После Figma-слепка нужно решить, что уходит в `ui-react/sidebar`, а что остается в `patterns/navigation`.
