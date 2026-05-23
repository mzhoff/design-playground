# Сырой импорт: Security Sphere UI reference

## Происхождение

Источник: `/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`.

Референсы:

- `apps/web/src/widgets/header/ui/Header.tsx` — sticky hide-on-scroll header.
- `apps/web/src/entities/course/ui/course-card/CourseCard.tsx` — course card, но в источнике есть data fetching.
- `apps/web/src/entities/article/ui/article-card/ArticleCard.tsx` — article/content card.
- `apps/admin/src/shared/components/list-view/ui/list-view.component.tsx` — CRUD ListView shell.
- `apps/admin/src/shared/components/data-table/ui/data-table.component.tsx` — table loading/error/empty states.
- `apps/admin/src/shared/components/create-view/ui/create-view.component.tsx` — create/edit shell.
- `apps/admin/src/shared/components/page-tabs/ui/page-tabs.component.tsx` — sticky tabs.
- `apps/admin/src/shared/form/ui/file-upload-field.tsx` — file upload pattern по карте INV-15.

## Что перенесено

- Website header behavior reference.
- Website catalog/content card reference.
- Admin ListView/DataTable baseline.
- Admin form shell with header actions and tabs.
- File upload states.
- Storybook-сценарии для визуального сравнения.

## Что не переносим

- Next `Link`, `Image`, TanStack Query, API-запросы и analytics attributes.
- Hardcoded routes Security Sphere.
- Реальный sidebar/menu, потому что Gigonom 2026 ближе к целевому UX.
- Домен курсов, документов и образовательных программ.
- Lexical editor целиком: это отдельная editor-инвентаризация.

## Ограничения

Security Sphere считается ранним baseline. Для финальной дизайн-системы эти компоненты нужно сравнить с Gigonom 2026 и Figma-слепками, а затем либо удалить как reference-only, либо разнести по `website-blocks`, `admin-crud` и `forms`.
