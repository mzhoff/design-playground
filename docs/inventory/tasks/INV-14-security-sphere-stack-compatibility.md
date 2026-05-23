# INV-14: Security Sphere — эталонный стек и архитектурная совместимость

## Статус

Готово к ревью.

## Источник

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`

## Цель задачи

Описать Security Sphere как эталонный проект-потребитель дизайн-системы по стеку, структуре монорепозитория, frontend/backend-границам, CI/deploy conventions и требованиям совместимости.

Эта задача не предполагает перенос компонентов. Результат — требования к будущим пакетам дизайн-системы и будущим integration checks.

## Короткий вывод

Security Sphere нужно считать главным compatibility target для первого внутреннего релиза дизайн-системы.

Дизайн-система должна без специальных костылей подключаться в Next.js-приложения такого типа:

- pnpm workspace;
- Turborepo;
- Next.js App Router;
- React 19;
- Tailwind CSS 4;
- TypeScript strict;
- Feature-Sliced Design;
- Biome;
- Steiger;
- Docker standalone output;
- frontend с REST/OpenAPI и GraphQL-клиентами к Nest API.

## Стек и версии

| Зона | Решение | Где зафиксировано |
|---|---|---|
| Package manager | `pnpm@10.24.0` | `package.json` |
| Node.js | `>=24` | `package.json`, Docker `node:24-alpine3.21` |
| Monorepo | `apps/*`, `packages/*` | `pnpm-workspace.yaml` |
| Task runner | Turborepo `^2.6.1` | `package.json`, `turbo.json` |
| Frontend runtime | Next.js `^16.0.7` | `pnpm-workspace.yaml` catalog |
| React | React `^19.1.0` | `pnpm-workspace.yaml` catalog |
| TypeScript | `5.9.3`, strict config | `pnpm-workspace.yaml`, `packages/typescript-config` |
| CSS | Tailwind CSS `^4.1.17`, `@theme inline`, CSS variables | `apps/web/src/app/globals.css`, `apps/admin/src/app/globals.css` |
| UI base | Radix UI, shadcn-style primitives, CVA, tailwind-variants | `apps/web/components.json`, `apps/admin/src/shared/components/ui` |
| Icons | `lucide-react` | `apps/web/package.json`, `apps/admin/package.json` |
| Data client web | REST + TanStack Query | `apps/web/src/shared/api/fetcher.ts` |
| Data client admin | GraphQL + Apollo + codegen | `apps/admin/codegen.yml`, `apps/admin/src/shared/api/client.ts` |
| Lint | Biome | root/app scripts |
| FSD lint | Steiger + `@feature-sliced/steiger-plugin` | `apps/web/steiger.config.mjs`, app scripts |
| Deploy | Docker Buildx + standalone Next + Ansible | `.github/workflows/deploy.yml`, app Dockerfiles |

## Структура монорепозитория

| Путь | Назначение | Важность для дизайн-системы |
|---|---|---|
| `apps/web` | Публичный Next.js-сайт | Эталон потребления сайта, website blocks, marketing pages, CMS pages. |
| `apps/admin` | Next.js-админка | Эталон потребления admin/product компонентов и CRUD-паттернов. |
| `apps/api` | Nest API | Не переносим в UI, но учитываем как backend boundary. |
| `packages/api` | Generated OpenAPI REST client | Показывает формат типизированного REST-клиента для web. |
| `packages/admin-api` | GraphQL schema package | Показывает формат GraphQL schema distribution для admin. |
| `packages/typescript-config` | Общие TS configs | Требование: дизайн-система должна быть совместима с этим уровнем strictness. |
| `packages/jest-config` | Общие test configs | Полезно для будущих package-level тестов, но не основной frontend target. |

## Frontend-структура `apps/web`

`apps/web` — публичный сайт на Next.js App Router.

Ключевые признаки:

- route files лежат в `apps/web/app`;
- основная реализация страниц лежит в `apps/web/src/pages`;
- FSD-слои используются в `src/entities`, `src/features`, `src/widgets`, `src/shared`;
- shadcn config указывает алиасы на `@/shared/ui`, `@/shared/ui/primitives`, `@/shared/lib`, `@/shared/hooks`;
- Tailwind 4 работает через CSS variables и `@theme inline`, без отдельного Tailwind config;
- root layout подключает fonts, providers, header/footer, analytics, cookie consent, newsletter popup;
- используется `LayoutHeroSlot`, чтобы страница могла передать hero-зону в общий layout.

Важные файлы:

| Путь | Что важно |
|---|---|
| `apps/web/package.json` | Next dev через `next dev --turbopack --port 3001`, `lint`, `lint:fsd`, `typecheck`. |
| `apps/web/next.config.js` | `output: standalone`, `turbopack.root` на корень монорепо, remote image patterns, redirects. |
| `apps/web/components.json` | shadcn aliases и ожидание `rsc: true`, `tsx: true`, `cssVariables: true`. |
| `apps/web/app/layout.tsx` | Общий сайт layout, fonts, providers, analytics, hero slot. |
| `apps/web/src/app/globals.css` | Tailwind 4, semantic radius/shadows/fonts. |
| `apps/web/src/app/styles/colors.css` | Богатая цветовая шкала и mapping в `@theme inline`. |
| `apps/web/src/shared/api/fetcher.ts` | REST boundary через `apiFetch`, `API_BASE_URL`, `no-store` по умолчанию. |
| `apps/web/src/shared/ui/primitives/button.tsx` | Сайт-ориентированный Button на CVA. |
| `apps/web/src/widgets/header/ui/Header.tsx` | Sticky header с hide/show on scroll. |
| `apps/web/src/entities/course/ui/course-card/CourseCard.tsx` | Хороший card pattern для сайта: image, metadata, CTA, метрика. |
| `apps/web/src/entities/article/ui/article-card/ArticleCard.tsx` | Хороший article card pattern. |

## Frontend-структура `apps/admin`

`apps/admin` — Next.js-админка на App Router.

Ключевые признаки:

- route files лежат в `apps/admin/app`;
- protected dashboard routes лежат в `apps/admin/app/(dashboard)`;
- основная реализация страниц лежит в `apps/admin/src/pages`;
- формы и бизнес-сценарии лежат в `apps/admin/src/features`;
- admin shell лежит в `apps/admin/src/app/layouts`, `src/widgets/header`, `src/widgets/admin-sidebar`;
- shared UI состоит из shadcn-style primitives в `apps/admin/src/shared/components/ui` и более крупных composition components;
- GraphQL codegen пишет типизированные документы в `apps/admin/generated/gql`;
- `BASE_PATH` поддерживается через `next.config.ts`, целевой deploy admin идет под `/admin`.

Важные файлы:

| Путь | Что важно |
|---|---|
| `apps/admin/package.json` | Dev запускает Next Turbopack на `3002` и GraphQL codegen watch. |
| `apps/admin/next.config.ts` | `basePath`, `output: standalone`, `turbopack.root`, `transpilePackages`. |
| `apps/admin/codegen.yml` | GraphQL schema берется из `@repo/admin-api/schema.gql`. |
| `apps/admin/app/(dashboard)/layout.tsx` | Dashboard boundary: ApolloProvider + sidebar layout. |
| `apps/admin/src/app/providers/index.tsx` | TanStack Query + ThemeProvider. |
| `apps/admin/src/app/globals.css` | shadcn-like semantic tokens, light/dark, sidebar/chart tokens. |
| `apps/admin/src/shared/api/client.ts` | Apollo client boundary к `/api/graphql`. |
| `apps/admin/src/app/layouts/with-sidebar-layout.component.tsx` | Admin layout shell. |
| `apps/admin/src/widgets/admin-sidebar/ui/admin-sidebar-menu.component.tsx` | Hardcoded меню админки. |
| `apps/admin/src/shared/components/list-view/ui/list-view.component.tsx` | CRUD list shell. |
| `apps/admin/src/shared/components/data-table/ui/data-table.component.tsx` | Table state handling: loading, error, empty. |
| `apps/admin/src/shared/components/create-view/ui/create-view.component.tsx` | Create/edit page shell. |
| `apps/admin/src/shared/components/page-tabs/ui/page-tabs.component.tsx` | Sticky tabs для форм. |
| `apps/admin/src/shared/components/ui/sidebar.tsx` | Богатый sidebar primitive с collapsed/mobile/shortcut/cookie state. |
| `apps/admin/src/shared/components/ui/combobox.tsx` | Полезный combobox: single/multiple, nested options, custom renderers. |
| `apps/admin/src/shared/components/ui/calendar.tsx` | DayPicker wrapper с range states и styling hooks. |

## pnpm/turbo conventions

Root scripts:

- `pnpm dev` → `turbo run dev`;
- `pnpm build` → `turbo run build`;
- `pnpm lint` → `turbo run lint lint:root`;
- `pnpm lint:fsd` → `turbo run lint:fsd`;
- `pnpm typecheck` → `turbo run typecheck`;
- `pnpm test` и `pnpm test:e2e` уже заложены на уровне turbo;
- `pnpm lint:deps` → `sherif`.

Turbo conventions:

- `dev` persistent и без cache;
- `build` зависит от `^build` и складывает `.next/**`, `dist/**`;
- `typecheck` зависит от `codegen`;
- app-specific build env описаны в `turbo.json`;
- для admin build нужен `BASE_PATH`, `NEXT_PUBLIC_API_URL`;
- для web build нужен `NEXT_PUBLIC_API_URL` и SEO/analytics env.

Требование к дизайн-системе:

- пакеты должны иметь корректный `build`, чтобы потребитель мог выполнять `turbo run build` с `dependsOn: ["^build"]`;
- пакеты не должны требовать runtime-env на этапе build, кроме явно документированных CSS/token inputs;
- exports должны быть стабильными и пригодными для workspace-потребления;
- дизайн-система должна быть совместима с `sherif` и pnpm workspace catalog-подходом.

## Naming и deploy conventions

Deploy построен вокруг трех сервисов:

- `web`;
- `admin`;
- `api`.

GitHub Actions:

- PR checks: `.github/workflows/checks.yml`;
- deploy на `main` и `develop`: `.github/workflows/deploy.yml`;
- branch `main` → environment `prod`, image tag `prod`;
- остальные deploy branches в workflow → environment `dev`, image tag `dev`;
- Docker image namespace по умолчанию `security-sphere`;
- deploy идет через Ansible playbooks;
- после deploy есть Telegram notification.

Docker conventions:

- используется `node:24-alpine3.21`;
- `corepack enable`;
- `pnpm dlx turbo prune <app> --docker`;
- production image запускает Next standalone server;
- web и admin слушают `PORT=3000`, `HOSTNAME=0.0.0.0` внутри контейнера;
- admin build перед Next build выполняет `turbo codegen --filter=admin`.

Требование к дизайн-системе:

- подключение пакетов не должно ломать `turbo prune <app> --docker`;
- CSS/assets/fonts должны попадать в standalone build предсказуемо;
- если пакет требует transpilation, это должно быть явно совместимо с Next `transpilePackages` или prebuilt ESM/CJS exports;
- не завязываться на абсолютные пути локальной машины;
- не требовать отдельного postinstall/codegen для простого UI-потребления.

## Frontend/backend границы

Security Sphere показывает две разные frontend/backend границы.

### Web: REST/OpenAPI boundary

`apps/web` работает с API через `apiFetch` и TanStack Query.

Важные принципы:

- UI не должен импортировать Nest DTO напрямую;
- entity/api слой отвечает за запросы и query keys;
- UI-компоненты должны получать данные через props;
- `@repo/api` может быть источником типов и SDK, но дизайн-система не должна зависеть от конкретного backend package.

### Admin: GraphQL/Apollo boundary

`apps/admin` работает через Apollo и generated GraphQL documents.

Важные принципы:

- GraphQL schema живет в `@repo/admin-api/schema.gql`;
- codegen выполняется на стороне admin app;
- UI-компоненты дизайн-системы не должны зависеть от `@gql/*`;
- app-level pages/features отвечают за GraphQL operations, mutations, refetch, optimistic update и toast.

### Вывод для дизайн-системы

Пакеты `packages/ui-react` и `packages/patterns` должны быть data-agnostic.

Допустимая структура:

- `ui-react` — primitives и headless visual components;
- `patterns` — композиции с props contracts и mock-data для Storybook;
- `adapters` или app-level wrappers — подключение к REST/GraphQL/Next routing;
- consumer app — конкретные routes, query hooks, mutations, permissions, auth.

## Подключение UI-компонентов сейчас

В Security Sphere нет внешнего дизайн-системного пакета. UI живет внутри приложений.

`apps/web`:

- `src/shared/ui/primitives` — primitives сайта;
- `src/shared/ui` — публичный UI index;
- `src/widgets` — крупные сайт-блоки;
- активное использование CSS Modules для сложных website blocks;
- custom design tokens в `colors.css`.

`apps/admin`:

- `src/shared/components/ui` — shadcn-style primitives;
- `src/shared/components` — compositions: DataTable, ListView, CreateView, PageTabs, editor, confirmable action;
- `src/features/*` — form scenarios;
- `src/pages/*` — CRUD pages;
- Tailwind utility-first, semantic shadcn tokens, tailwind-variants.

Требование к будущей дизайн-системе:

- не заставлять consumer переписывать весь `shared/ui` сразу;
- разрешить постепенную замену локальных компонентов на external package;
- сохранить shadcn/Radix-совместимую модель `asChild`, CVA variants, Tailwind class override через `className`;
- договориться, какие локальные app components остаются adapters, а какие уходят в packages.

## Полезные UI-решения сайта

| Решение | Путь | Что взять как референс |
|---|---|---|
| Sticky header with scroll visibility | `apps/web/src/widgets/header/ui/Header.tsx` | Поведение header, который скрывается при scroll down и возвращается при scroll up. |
| Desktop nav + hover dropdown | `apps/web/src/widgets/header/ui/components/HeaderNav/HeaderNav.tsx` | Active link detection, submenu через HoverCard. |
| Mobile menu | `apps/web/src/widgets/header/ui/components/MobileMenu/MobileMenu.tsx` | Dialog-based mobile navigation, active links, secondary links, action zone. |
| LayoutHeroSlot | `apps/web/app/layout.tsx` | Удобный паттерн, когда страница передает hero в общий layout. |
| CourseCard | `apps/web/src/entities/course/ui/course-card/CourseCard.tsx` | Карточка каталога с image, meta, CTA и analytics data attributes. |
| ArticleCard | `apps/web/src/entities/article/ui/article-card/ArticleCard.tsx` | Карточка статьи с image, date, reading time, tag CTA. |
| Typography/numeric handling | `apps/web/src/shared/lib/utils.ts`, `apps/web/src/app/globals.css` | `font-numeric`, wrapping numeric parts, tabular nums. |
| Color scale | `apps/web/src/app/styles/colors.css` | Богатая шкала primary/secondary/neutral как референс token layer. |
| Content rendering | `apps/web/src/shared/content` | Рендеринг CMS-контента как отдельный слой. |
| Document signature dialog | `apps/web/src/entities/document/ui/DocumentSignatureDialog.tsx` | Полезный provider-specific action dialog для документов. |

## Полезные UI-решения админки

| Решение | Путь | Что взять как референс |
|---|---|---|
| Sidebar primitive | `apps/admin/src/shared/components/ui/sidebar.tsx` | Collapsed/expanded, mobile Sheet, cookie persistence, keyboard shortcut. |
| Admin sidebar composition | `apps/admin/src/widgets/admin-sidebar/ui/admin-sidebar.component.tsx` | Layout меню, группы и footer. |
| Sticky header with portal actions | `apps/admin/src/widgets/header/ui/header.component.tsx` | Header с `HEADER_ACTIONS_PORTAL_ID` для действий страницы. |
| ListView | `apps/admin/src/shared/components/list-view/ui/list-view.component.tsx` | Универсальный CRUD list shell: title/actions/filters/table/pagination. |
| DataTable | `apps/admin/src/shared/components/data-table/ui/data-table.component.tsx` | Table states: loading, error, empty, actions alignment. |
| CreateView | `apps/admin/src/shared/components/create-view/ui/create-view.component.tsx` | Универсальная shell-страница создания/редактирования. |
| PageTabs | `apps/admin/src/shared/components/page-tabs/ui/page-tabs.component.tsx` | Sticky tabs для длинных форм. |
| Combobox | `apps/admin/src/shared/components/ui/combobox.tsx` | Single/multiple, nested options, search, custom renderers. |
| Calendar | `apps/admin/src/shared/components/ui/calendar.tsx` | DayPicker wrapper с single/range styling hooks. |
| File upload field | `apps/admin/src/shared/form/ui/file-upload-field.tsx` | Загрузка файлов, preview/status/actions. |
| Lexical editor | `apps/admin/src/shared/components/editor` | Большой редакторский стек: toolbar, plugins, images, tables, embeds, markdown. |
| ConfirmableAction | `apps/admin/src/shared/components/confirmable-action` | Подтверждение опасных действий в CRUD. |
| Course list page | `apps/admin/src/pages/course/course-list/ui/courses-page.component.tsx` | Реальный пример CRUD list: filters, sync action, delete, pagination. |

## Слабые места и риски

- `apps/web` и `apps/admin` используют разные token systems: web — custom primary/secondary/neutral шкалы, admin — shadcn-like oklch semantic variables.
- `apps/web` и `apps/admin` имеют разные primitive namespaces: `shared/ui` против `shared/components/ui`.
- В админке много hardcoded русских labels/routes в sidebar и CRUD pages.
- Dashboard в admin фактически пустой: `DashboardPage` возвращает пустой layout.
- Metadata в admin root/dashboard layouts осталась default: `Create Next App`.
- Steiger rules частично ослаблены: `fsd/public-api`, `fsd/insignificant-slice`, `fsd/repetitive-naming` выключены в web config.
- В `apps/web` много CSS Modules, а в `apps/admin` больше Tailwind utilities: будущий пакет должен выдержать оба стиля потребления.
- Некоторые website cards выполняют data fetching внутри client component, например `CourseCard` догружает details через query; для дизайн-системы это нужно отделять от presentation component.
- `apps/admin` сильно завязан на generated GraphQL и конкретные mutations/refetch/toast в page components; это нельзя переносить в UI package.
- Нет Storybook и внешней документации по локальным компонентам в самом Security Sphere.
- Нет отдельного consumer integration check для внешнего дизайн-системного пакета.
- `BASE_PATH` у admin обязателен для deploy-сценария; компоненты не должны предполагать корневой `/` для ссылок.
- `output: standalone` и `turbo prune --docker` требуют аккуратной упаковки CSS/assets в пакетах дизайн-системы.

## Требования совместимости для дизайн-системы

### Runtime compatibility

- Поддерживать Next.js App Router.
- Поддерживать React 19.
- Поддерживать TypeScript strict и `isolatedModules`.
- Поддерживать pnpm workspace и `workspace:*` dependencies.
- Поддерживать Turborepo build graph.
- Не ломать Docker standalone output.
- Не требовать browser-only API в server components.
- Все интерактивные компоненты явно маркировать `"use client"` на границе entry point.

### CSS/token compatibility

- Работать с Tailwind CSS 4 и `@theme inline`.
- Экспортировать CSS variables/token layer отдельным стабильным файлом.
- Не требовать обязательного `tailwind.config.*`.
- Не зашивать цвета Security Sphere в core components.
- Поддерживать semantic tokens поверх base palette.
- Позволить consumer переопределять theme через CSS variables.

### Package compatibility

- Публиковать prebuilt JS/types или быть явно совместимым с Next `transpilePackages`.
- Не использовать `@/*` alias внутри экспортируемого package-кода.
- Иметь стабильные public exports.
- Разделять server-safe и client-only exports.
- Не импортировать consumer app modules.
- Не зависеть напрямую от `@repo/api`, `@repo/admin-api`, `@gql/*`, `next/navigation` внутри primitives/patterns.

### FSD compatibility

- Пакеты должны уважать FSD-слои consumer app.
- В `shared` consumer app можно подключать primitives/adapters.
- В `features` и `pages` consumer app остаются data fetching, mutations, routing и permissions.
- Product patterns должны быть нарезаны так, чтобы их можно было использовать внутри feature slices без обратных импортов в app layer.

### API compatibility

- UI-компоненты получают данные через props.
- Для REST/GraphQL допускаются отдельные adapter hooks, но не в `ui-react`.
- Query keys, mutations, refetch, toast, optimistic updates остаются в app feature/page layer.
- DTO конвертируются в component contracts через mapper/adapters.

## Будущие integration checks

Минимальный набор проверок, который нужно добавить в дизайн-систему после появления реальных пакетов:

1. `pnpm install --frozen-lockfile`.
2. `pnpm build` для всех packages.
3. `pnpm typecheck` для packages и apps.
4. `pnpm lint` через Biome.
5. `pnpm lint:fsd` для Next apps, где используется FSD.
6. Next consumer smoke build: импорт `@gigonom/ui-react` в `apps/playground`.
7. Next admin-like smoke build: импорт admin primitives/patterns в отдельную test surface или fixture.
8. CSS smoke check: подключение token CSS в `globals.css` без Tailwind config.
9. RSC boundary check: server route импортирует только server-safe exports, client route импортирует interactive components.
10. Docker compatibility check: `turbo prune <consumer> --docker` не теряет package assets/CSS.
11. Storybook build check: stories собираются с теми же package exports.
12. Consumer fixture с `basePath`, чтобы не сломать admin-style deploy под `/admin`.

## Рекомендуемый порядок дальнейших действий

1. Использовать Security Sphere как compatibility fixture при проектировании package exports.
2. В дизайн-системе держать отдельный документ `consumer-requirements/security-sphere.md` на основе этой карты.
3. Первым проверить совместимость primitives: Button, Badge, Input, Dialog, Popover, Tabs, Sidebar, Calendar, Combobox.
4. Затем проверить patterns: ListView, DataTable, CreateView, PageTabs, ConfirmableAction.
5. Только после этого переносить сложные editor/sidebar/site blocks.
6. Для первого реального integration test не тащить весь Security Sphere в дизайн-систему, а сделать маленький Next fixture, повторяющий его стек и ограничения.

## Критерии готовности INV-14

- Описан стек и frontend-структура.
- Перечислены полезные UI-решения сайта и админки.
- Отмечены слабые места.
- Зафиксированы требования совместимости.
- Предложены будущие integration checks.
