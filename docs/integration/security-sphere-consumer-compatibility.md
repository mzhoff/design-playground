# Security Sphere как эталонный потребитель дизайн-системы

## Назначение

Security Sphere — первый эталонный проект-потребитель для Design Playground. Он нужен не как источник всех компонентов, а как проверка, что будущая дизайн-система нормально подключается в реальный клиентский монорепозиторий команды.

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`

## Базовый стек потребителя

- `pnpm@10.24.0` как package manager.
- Node.js `>=24`.
- Turborepo `^2.6.1`.
- Next.js `^16.0.7` через pnpm catalog.
- React `^19.1.0` через pnpm catalog.
- TypeScript `5.9.3`.
- Tailwind CSS `^4.1.17` через `@theme inline` и CSS variables.
- Feature-Sliced Design и Steiger.
- Biome.
- Docker standalone Next output.
- `apps/web` использует REST/OpenAPI boundary.
- `apps/admin` использует GraphQL/Apollo/codegen boundary.

## Что это означает для наших пакетов

Пакеты дизайн-системы должны быть data-agnostic. Они не должны напрямую импортировать backend DTO, GraphQL documents, REST clients, Next routes или env-переменные потребителя.

Правильная граница:

- `packages/ui-react` — primitives и headless visual components.
- `packages/patterns` — композиции с props contracts и Storybook mock-данными.
- consumer app — adapters к REST, GraphQL, Next routing, auth, permissions и mutations.

## Минимальные требования совместимости

1. Пакеты должны собираться в Turborepo через `build` и не ломать `dependsOn: ["^build"]`.
2. Пакеты должны проходить strict TypeScript без неявной зависимости от app-level aliases потребителя.
3. Пакеты не должны требовать runtime env на этапе build.
4. CSS должен быть совместим с Tailwind 4 и CSS variables.
5. Компоненты должны поддерживать `className` и не блокировать shadcn/Radix-подход.
6. Если компонент использует client hooks, файл должен явно иметь `"use client"`.
7. Если пакет требует transpilation, это должно быть явно документировано для Next `transpilePackages` или решено через prebuilt exports.
8. Пакеты не должны ломать `turbo prune <app> --docker`.
9. Assets/fonts должны попадать в standalone build предсказуемо.
10. Пакеты не должны использовать абсолютные пути локальной машины.

## REST и GraphQL boundary

### Web

`apps/web` получает данные через REST/OpenAPI и TanStack Query. Дизайн-система не должна импортировать `@repo/api` напрямую. App-level слой должен адаптировать DTO в props-контракты компонентов.

### Admin

`apps/admin` получает данные через Apollo и generated GraphQL documents. Дизайн-система не должна импортировать `@gql/*` или `@repo/admin-api`. GraphQL operations, optimistic updates, refetch и toast остаются в app-level features/pages.

## Требования к будущим integration checks

Для первого внутреннего релиза нужен минимальный consumer check против структуры Security Sphere:

1. Создать тестовое Next-приложение-потребитель с теми же базовыми ограничениями: Next 16, React 19, Tailwind 4, TypeScript strict.
2. Подключить `@design-playground/ui-react`, `@design-playground/patterns`, `@design-playground/tokens` как workspace/external packages.
3. Проверить импорт primitives, pattern-компонента и CSS tokens.
4. Проверить, что app-level adapter может передать REST/GraphQL-like data через props без backend-зависимости пакета.
5. Проверить `pnpm typecheck`.
6. Проверить `pnpm build` с Next standalone output.
7. Проверить, что Storybook mock-данные не попадают как обязательная runtime-зависимость consumer app.
8. Проверить Docker-oriented сценарий: package exports и CSS не ломают standalone build.

## Что не делаем на этапе 3

- Не копируем backend, API clients, GraphQL codegen и deploy scripts.
- Не переносим Security Sphere как шаблон монорепозитория внутрь Design Playground.
- Не переписываем текущие UI-пакеты под Security Sphere до Figma-сравнения.
- Не делаем общий adapter API преждевременно.

## Критерий готовности INV-14 на этапе 3

INV-14 считается закрытым для сырого импорта, если:

- эталонный стек потребителя описан;
- требования к пакетам дизайн-системы зафиксированы;
- frontend/backend boundaries описаны;
- будущие integration checks сформулированы;
- отдельно зафиксировано, что компонентный импорт на этом пункте не нужен.
