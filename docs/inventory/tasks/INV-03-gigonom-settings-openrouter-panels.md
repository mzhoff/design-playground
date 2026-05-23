# INV-03: Gigonom 2026 — настройки, OpenRouter и боковые панели

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

## Цель

Найти страницу настроек, подключение OpenRouter и боковые панели настроек как основу универсального `provider connection pattern`.

На этапе инвентаризации код не переносим. Фиксируем источники, структуру UI, границы между дизайн-системой и логикой приложения, mock-состояния для Storybook и порядок будущего сырого импорта.

## Найденные entry points

Основной route настроек:

`apps/admin/src/app/(dashboard)/settings/page.tsx`

Этот route не содержит собственного интерфейса. Он редиректит пользователя на раздел интеграций:

`/settings/integrations`

Фактические route-страницы разделов:

- `apps/admin/src/app/(dashboard)/settings/user/page.tsx` — раздел пользователя.
- `apps/admin/src/app/(dashboard)/settings/administration/page.tsx` — раздел администрирования.
- `apps/admin/src/app/(dashboard)/settings/integrations/page.tsx` — раздел интеграций и OpenRouter.

Основной slice настроек:

- `apps/admin/src/page-slices/settings/index.ts` — публичный экспорт `SettingsPage` и `SettingsSection`.
- `apps/admin/src/page-slices/settings/ui/settings-page.component.tsx` — весь текущий UI настроек, OpenRouter-карточка, форма подключения, форма деталей, баланс, статусы и placeholder-разделы.

Связанная оболочка админки и боковые панели:

- `apps/admin/src/widgets/admin-shell/ui/admin-shell.component.tsx` — общий layout админки с левой боковой навигацией, sticky header и content-shell.
- `apps/admin/src/widgets/admin-shell/ui/admin-navigation.component.tsx` — глобальная левая навигация, включая группу `Настройки`.
- `apps/admin/src/widgets/admin-shell/ui/admin-user-menu.component.tsx` — пользовательское меню в нижней части сайдбара.
- `apps/admin/src/shared/lib/admin-shell-header.tsx` — контекст для управления заголовком и actions в shell.

## Структура текущего сценария

`SettingsPage` строит настройки как двухколоночный layout:

- слева локальная навигация разделов настроек.
- справа содержимое выбранного раздела.
- для `integrations` рендерится `IntegrationsSection`.
- для `user` и `administration` сейчас используются placeholder-разделы.
- глобальная левая боковая панель приходит из `AdminShell`.

Разделы локальной навигации:

- `Пользователь` — профиль, уведомления и персональные параметры.
- `Администрирование` — роли, доступы, публикации и системные ограничения.
- `Интеграции` — внешние сервисы, ключи и AI-провайдеры.

OpenRouter сейчас реализован как один provider card внутри `IntegrationsSection`. Это хороший сырой референс для универсального паттерна `ProviderConnection`.

## Структура формы подключения

Состояние до подключения:

- карточка провайдера `OpenRouter`.
- status pill со статусом подключения.
- кнопка `Подключить`, которая раскрывает форму.
- поле `API ключ` с `type="password"`.
- placeholder `sk-or-...`.
- подсказка о том, что ключ сохраняется только после успешной проверки.
- кнопка подключения.
- validation error, если пользователь пытается подключиться без ключа.

Состояние после подключения:

- карточка провайдера с кнопками `Детали` и `Отключить`.
- раскрываемая форма деталей.
- справа aside `Баланс и лимиты`.
- данные ключа показываются только маской, реальный secret обратно не возвращается.

Поля формы деталей:

- `Модель изображений`.
- `Пропорции`.
- `Размер`.
- `Системная инструкция OpenRouter`.
- `Сюжет / visual focus`.
- `Композиция`.
- `Визуальный стиль`.
- `Negative prompt`.

Метрики в aside:

- остаток на ключе.
- лимит ключа.
- использовано сегодня.
- использовано за месяц.
- остаток аккаунта.
- всего куплено.
- всего использовано.
- masked label ключа.
- дата последней проверки.

## UI-компоненты-кандидаты на вынос

В `packages/patterns`:

- `SettingsShell` — общий layout настроек с локальной навигацией и content-area.
- `SettingsSectionNav` — вертикальная навигация по разделам настроек.
- `ProviderConnectionCard` — карточка интеграции с заголовком, описанием, статусом и actions.
- `ProviderConnectionForm` — форма ввода credentials для подключения провайдера.
- `ProviderDetailsDisclosure` — раскрываемая область деталей провайдера.
- `ProviderSettingsForm` — форма параметров провайдера после подключения.
- `ProviderMetricsAside` — правая панель метрик, лимитов и баланса.
- `ProviderConnectionPattern` — собранный сценарий provider connection без конкретной OpenRouter-логики.

В `packages/ui-react`:

- `StatusPill`.
- `MetricRow`.
- `MessageBanner`.
- `SelectControl`.
- `Field`.
- `SettingsNavItem`.
- `ProviderCardHeader`.
- базовые варианты `Button`, `Input`, `Textarea`, если текущие версии будут признаны качественными для сырого переноса.

Отдельно для будущих задач по shell/sidebar:

- `AdminShellSidebar`.
- `AdminNavigationGroup`.
- `AdminNavigationItem`.
- `AdminUserMenu`.
- `ShellHeaderActions`.

Эти элементы связаны с текущей задачей, но полноценную стандартизацию левой админской панели лучше вести отдельным блоком, чтобы не смешать provider connection и глобальную навигацию.

## Логика, которую нельзя тащить в UI-пакеты

Нельзя переносить в `packages/ui-react` и `packages/patterns` как часть универсального UI:

- реальные API routes `/api/cms/v1/openrouter-settings`, `/api/cms/v1/openrouter-connect`, `/api/cms/v1/openrouter-disconnect`, `/api/cms/v1/openrouter-status`.
- `requestJson` и работу с backend proxy.
- `INTERNAL_API_URL`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_ADMIN_BASE_PATH`.
- хранение и проверку OpenRouter API key.
- любые реальные secrets и env-значения.
- бизнес-семантику OpenRouter credits, management key и тарифов.
- auth/session-логику админки.
- sign out из пользовательского меню.
- orchestration-логику сохранения, подключения, отключения и refresh.

В дизайн-систему должен уйти только контракт UI-состояний и presentation-компоненты. Интеграция с OpenRouter должна остаться adapter/app logic в приложении-потребителе.

## Предлагаемые универсальные контракты

Кандидаты на будущий контракт:

- `ProviderConnectionStatus` — connected, checkedAt, error, optional credentialsLabel, optional metrics.
- `ProviderConnectionSettings` — сериализуемые настройки провайдера без secrets.
- `ProviderCredentialsInput` — временное значение credentials формы, которое не хранится в UI-компоненте после успешного submit.
- `ProviderModelOption` — id, label, description, capabilities.
- `ProviderMetric` — label, value, tone, hint.
- `ProviderConnectionActions` — connect, disconnect, saveSettings, refreshStatus.

Принцип: UI получает данные и callbacks через props. UI не знает, какой именно backend, provider или secret-storage используется.

## Mock-данные для Storybook

Минимальный набор mock-сценариев:

- `Loading` — загрузка настроек интеграций.
- `DisconnectedCollapsed` — провайдер отключен, форма скрыта.
- `DisconnectedExpanded` — провайдер отключен, форма ввода ключа открыта.
- `DisconnectedValidationError` — попытка подключиться без ключа.
- `Connecting` — pending-состояние кнопки `Проверяю...`.
- `ConnectionError` — ошибка backend-проверки ключа.
- `ConnectedCollapsed` — провайдер подключен, детали скрыты.
- `ConnectedExpanded` — провайдер подключен, форма деталей и aside метрик открыты.
- `SavingSettings` — pending-состояние `Сохраняю...`.
- `SaveSuccess` — success message после сохранения.
- `SaveError` — ошибка сохранения настроек.
- `RefreshingLimits` — pending-состояние обновления лимитов.
- `ConnectedWithCredits` — подключено, есть credits/key metrics.
- `ConnectedWithoutCredits` — подключено, но credits недоступны.
- `ConnectedCreditsForbidden` — частичная ошибка `/credits failed with 403`.
- `UnknownSelectedModel` — выбранная модель отсутствует в списке и добавляется fallback-опцией.
- `UserSettingsPlaceholder` — placeholder-раздел пользователя.
- `AdministrationSettingsPlaceholder` — placeholder-раздел администрирования.
- `ShellSidebarOpen` — настройки внутри открытого admin shell.
- `ShellSidebarCollapsed` — настройки внутри свернутого admin shell.

## Порядок сырого импорта

1. Сначала вынести из `settings-page.component.tsx` OpenRouter UI во временный story-only компонент с props и mock-data.
2. Затем заменить OpenRouter-имена в UI-слое на generic provider connection, оставив OpenRouter только в demo/mock.
3. После этого отдельно вынести локальную навигацию настроек и layout настроек.
4. Затем сделать Storybook-раздел `Settings / Provider Connection`.
5. Затем сделать Playground preview `settings preview`.
6. Только после стабилизации UI добавить adapter-level пример для OpenRouter в приложении-потребителе.

## Целевое место

Пакеты:

- `packages/patterns/settings/provider-connection`.
- `packages/patterns/settings/settings-shell`.
- `packages/ui-react`.

Storybook:

- `Settings / Provider Connection`.

Playground:

- `settings-preview`.

Figma:

- нужен слепок: `да`.

## Риски

- OpenRouter относится к конкретной интеграции.
- Секреты и env-значения нельзя переносить.
- UI должен быть универсализирован под разные provider connection сценарии.
- Глобальная левая навигация админки пересекается с задачей настроек, но должна быть вынесена отдельным блоком.
- Сейчас часть UI, API-вызовов и OpenRouter-семантики находится в одном файле, поэтому при переносе важно сначала отделить presentation от orchestration.

## Критерии готовности

- найден путь к странице настроек: выполнено.
- описана структура формы подключения: выполнено.
- отмечены UI-компоненты для выноса: выполнено.
- отдельно перечислена app/backend logic: выполнено.
- указаны состояния для Storybook: выполнено.

## Этап 3: сырой импорт вертикального набора

Статус: перенесено в PR этапа 3.

Что добавлено:

- `packages/patterns/src/settings-provider` — сырой settings/provider connection kit;
- `SettingsProviderPreview` — settings shell с локальной навигацией, provider card, credential form, details form и metrics aside;
- `settingsProviderConnectedMock`, `settingsProviderDisconnectedMock`, `settingsProviderErrorMock` — mock-состояния для Storybook;
- `apps/storybook/src/stories/settings-provider.stories.tsx` — истории `Settings / Provider Connection / Raw Import`.

Принятое техническое решение:

- OpenRouter оставлен только как demo fixture, а компонент назван generic `SettingsProviderPreview`;
- реальные `/api/cms/v1/openrouter-*`, `requestJson`, env, secret storage и backend orchestration не переносятся в design-system package;
- глобальная левая админская навигация зафиксирована как пересечение, но переносится отдельно в `INV-05`.

Известный технический долг:

- `StatusPill`, `MetricRow`, `Field`, `SelectControl`, `MessageBanner` нужно позже выделить в `ui-react` или унифицировать с существующими primitives;
- provider settings schema пока описана простыми `select/textarea` полями, без финального API;
- accessibility и focus flow формы подключения нужно проверить после Figma-слепка и реального adapter-примера.
