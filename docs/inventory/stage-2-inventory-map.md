# Этап 2: карта инвентаризации

## Статус

Черновая карта зафиксирована для работы по отдельным задачам.

На этом этапе мы не копируем код, не рефакторим исходные проекты и не проектируем финальные API компонентов. Цель этапа — понять, что именно нужно вынести, из какого проекта, в каком порядке и с какими рисками.

## Принцип нарезки

Один блок `INV-*` — одна будущая задача для агента.

Каждый блок должен быть достаточно маленьким, чтобы его можно было выполнить качественно за один проход:

- открыть один источник или один продуктовый домен;
- найти конкретные пути к коду;
- описать зависимости;
- зафиксировать, что переносим;
- зафиксировать, что не переносим;
- определить целевое место в дизайн-системе;
- записать риски и критерии готовности.

## Формат результата для каждой задачи

Каждая задача инвентаризации должна дать документ с такими полями:

- исходный проект;
- исходные пути к файлам;
- что забираем;
- что не забираем;
- зависимости и связка с бизнес-логикой;
- целевой пакет;
- целевая группа Storybook;
- целевой экран или режим Playground;
- нужен ли слепок Figma;
- риски;
- рекомендуемый способ переноса;
- критерии готовности следующего этапа.

## Общий порядок работ

Рекомендуемый порядок:

1. Сначала инвентаризировать самые важные продуктовые вертикали: админка Gigonom 2026, canvas/panels из prodSQL, чатовый интерфейс.
2. Затем инвентаризировать сильные отдельные компоненты: date picker, sidebar, drag-and-drop hook, WYSIWYG.
3. Затем инвентаризировать визуально сильные website blocks и motion-паттерны.
4. Затем разобрать эталонный стек Security Sphere и будущие ERP-зоны.
5. После карты перейти к сырому импорту вертикальных наборов.

## Источники

### Gigonom 2026

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Роль:

Первый внутренний потребитель дизайн-системы и важный источник admin/UI-наработок.

### prodSQL

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

Роль:

Источник canvas-логики, drag-and-drop, layout-системы панелей и редакторских интерфейсных паттернов.

### ChatModule

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/ChatModule/repos/ChatModule`

Роль:

Песочница логики чат-ассистента и будущий потребитель чатовых UI-компонентов.

### REVERIE app

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

Роль:

Флагманский продукт, источник чатовых решений, website blocks, motion-паттернов, графиков и сложных интерфейсов автоматизации контент-маркетинга.

### Security Sphere

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`

Роль:

Эталонный потребитель по стеку Next.js/pnpm/turbo и ранний источник решений сайта и админки.

## Блоки инвентаризации

### INV-01: Gigonom 2026 — CRUD views админки

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Что ищем:

- страницы и view для CRUD-сценариев админки;
- представление Kanban;
- представление списком;
- представление карточками;
- календарное представление;
- место под будущий timeline;
- фильтры, тулбары, действия, статусы и пустые состояния;
- компоненты, которые используются внутри этих view.

Целевая зона:

- `packages/patterns`;
- `packages/ui-react`;
- Storybook: `Admin / CRUD`;
- Playground: admin CRUD preview;
- Figma: обязательный слепок после сырого переноса.

Риски:

- сильная связка с данными конкретной админки;
- возможные hardcoded-статусы и модели;
- часть логики может относиться к приложению, а не к дизайн-системе.

Критерии готовности задачи:

- перечислены все найденные CRUD views;
- для каждого view указан путь к исходнику;
- отмечены общие компоненты, которые повторяются между view;
- отдельно отмечены компоненты-кандидаты в primitives;
- описано, какие данные нужно замокать для Storybook;
- предложен порядок сырого импорта.

### INV-02: Gigonom 2026 — WYSIWYG и редакторские панели

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Что ищем:

- WYSIWYG-редактор;
- панели редактора;
- toolbar;
- блоки работы с текстом;
- панели генерации изображений;
- поля и настройки, связанные с контентом;
- сценарии редактирования, сохранения и генерации.

Целевая зона:

- `packages/patterns`;
- `packages/ui-react`;
- Storybook: `Editors / WYSIWYG`;
- Playground: editor preview;
- Figma: обязательный слепок.

Риски:

- редактор может быть связан с конкретной CMS-моделью;
- генерация изображений может быть связана с API и backend-сценариями;
- важно отделить UI от orchestration-логики.

Критерии готовности задачи:

- найден основной entry point редактора;
- перечислены все панели и toolbar-компоненты;
- указаны зависимости редактора;
- отмечено, какие части можно копировать как UI, а какие нужно оставить как app logic;
- описан минимальный набор mock-данных.

### INV-03: Gigonom 2026 — настройки, OpenRouter и боковые панели

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Что ищем:

- страницу настроек;
- подключение OpenRouter;
- формы настроек провайдера;
- боковые панели настроек;
- layout настроек;
- состояния подключения, ошибки и успешного сохранения.

Целевая зона:

- `packages/patterns`;
- `packages/ui-react`;
- Storybook: `Settings / Provider Connection`;
- Playground: settings preview.

Риски:

- OpenRouter относится к конкретной интеграции;
- секреты и env-значения нельзя переносить;
- UI должен быть универсализирован под разные provider connection сценарии.

Критерии готовности задачи:

- найден путь к странице настроек;
- описана структура формы подключения;
- отмечены UI-компоненты, которые можно вынести;
- отдельно перечислена логика, которую нельзя тащить в UI-пакеты;
- указаны состояния для Storybook.

### INV-04: Gigonom 2026 — новый date picker

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Что ищем:

- новый уникальный date picker;
- календарные popup/panel states;
- выбор даты;
- возможный выбор диапазона;
- keyboard/focus behavior;
- локализация;
- связи с формами и календарными view.

Целевая зона:

- `packages/ui-react`;
- Storybook: `Forms / Date Picker`;
- Playground: forms preview;
- Figma: обязательный слепок перед финальной реализацией.

Риски:

- date picker часто имеет сложные edge cases;
- важно не потерять доступность;
- нужно проверить, нет ли жесткой зависимости от конкретной даты/формата проекта.

Критерии готовности задачи:

- найден основной компонент date picker;
- описаны все режимы и состояния;
- отмечены зависимости;
- перечислены accessibility-вопросы;
- предложен план доведения до дизайн-системного компонента.

### INV-05: Gigonom 2026 — левая боковая навигация

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Что ищем:

- левую боковую панель;
- группы навигации;
- дочерние элементы;
- активное состояние;
- collapsed/expanded состояния;
- responsive behavior;
- будущий reorder UX.

Будущее требование:

Панель должна поддерживать drag-and-drop reorder:

- reorder групп целиком;
- reorder дочерних элементов внутри группы;
- возможно перемещение элементов между группами, если это будет согласовано отдельно.

Целевая зона:

- `packages/patterns`;
- `packages/ui-react`;
- Storybook: `Navigation / Sidebar`;
- Playground: admin navigation preview.

Риски:

- текущая панель может быть связана с роутингом конкретного проекта;
- reorder нужно будет строить на общем drag-and-drop hook из prodSQL;
- важно отделить визуальный компонент от структуры меню приложения.

Критерии готовности задачи:

- найден компонент sidebar;
- описана структура данных меню;
- отмечены состояния;
- указано, где нужен drag-and-drop;
- описано, какие props нужны для универсализации.

### INV-06: prodSQL — drag-and-drop hook

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

Что ищем:

- отточенный drag-and-drop hook;
- reorder-логику;
- поведение drag preview;
- drop zones;
- keyboard или pointer edge cases;
- зависимости от конкретного canvas/editor состояния.

Целевая зона:

- `packages/patterns` или отдельный будущий utility/core package;
- `packages/ui-react` только для UI-обвязки;
- Storybook: `Interaction / Drag and Drop`.

Риски:

- hook может быть глубоко связан с состоянием prodSQL;
- перенос может потребовать сильного рефакторинга;
- нужно не сломать уже проверенную логику.

Критерии готовности задачи:

- найден hook и все связанные helpers;
- описаны входы и выходы;
- отмечены зависимости от DOM, canvas или store;
- предложено, что переносить копипастом, а что перепроектировать;
- описаны smoke-сценарии для будущего теста.

### INV-07: prodSQL — canvas как переиспользуемый компонент

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

Что ищем:

- сам canvas;
- навигацию по canvas;
- pan/zoom;
- selection;
- карточки или ноды на canvas;
- связи canvas с панелями;
- поведение таблиц на canvas.

Целевая зона:

- `packages/patterns`;
- возможно будущий `canvas-core`;
- Storybook: `Canvas / Core`;
- Playground: canvas preview.

Риски:

- код может быть давно не отрефакторен;
- canvas может быть связан с конкретной доменной моделью SQL-схем;
- вероятно, потребуется копирование целиком и последующий рефакторинг до неузнаваемости.

Критерии готовности задачи:

- найден entry point canvas;
- перечислены связанные компоненты;
- описаны внешние зависимости;
- отделена визуальная часть от доменной SQL-логики;
- предложен минимальный сценарий для Storybook.

### INV-08: prodSQL — layout нижних и боковых панелей

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

Что ищем:

- нижние панели;
- боковые панели;
- layout окон;
- resize/collapse поведение;
- docking-паттерны;
- карточки и поля внутри панелей;
- таблицы внутри панелей.

Целевая зона:

- `packages/patterns`;
- Storybook: `Layouts / Panels`;
- Playground: editor workspace preview.

Риски:

- панели могут быть связаны с canvas-state;
- resize/docking может зависеть от конкретной разметки;
- нужно сохранить сильную редакторскую UX-логику.

Критерии готовности задачи:

- найден layout панелей;
- перечислены варианты панелей;
- описаны состояния resize/collapse/open/close;
- указаны общие компоненты поля, карточки, таблицы;
- предложена схема универсализации для будущего видео-редактора.

### INV-09: prodSQL — dashboard cards

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

Что ищем:

- простые минималистичные карточки на дашборде;
- метрики;
- summary cards;
- пустые состояния;
- hover/focus behavior;
- layout карточек.

Целевая зона:

- `packages/ui-react`;
- `packages/patterns`;
- Storybook: `Data Display / Dashboard Cards`;
- Playground: dashboard preview.

Риски:

- карточки могут быть простыми визуально, но связанными с данными проекта;
- нужно сохранить минималистичный характер, не обезличить компонент.

Критерии готовности задачи:

- перечислены все dashboard cards;
- указан путь к каждой карточке;
- описаны props и данные;
- выделены общие элементы;
- предложена базовая дизайн-системная модель карточки.

### INV-10: ChatModule и REVERIE — сравнение чатового UI

Источники:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/ChatModule/repos/ChatModule`

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

Что ищем:

- чат-ассистента;
- окно чата;
- compact panel;
- resizable window;
- fullscreen chat;
- page-level chat как ChatGPT;
- input composer;
- message list;
- toolbars;
- attachments;
- streaming/loading states;
- empty/onboarding states.

Цель сравнения:

Понять, где сейчас UI реализован качественнее: в ChatModule или в REVERIE.

Целевая зона:

- `packages/patterns`;
- `packages/ui-react`;
- Storybook: `Chat Assistant`;
- Playground: chat preview;
- Figma: обязательный слепок выбранного референса.

Риски:

- ChatModule может быть сильнее по логике, но слабее по UI;
- REVERIE может быть сильнее по UI, но связан с продуктовой логикой;
- оба проекта будут потребителями одного будущего чат-интерфейса.

Критерии готовности задачи:

- найден чатовый UI в обоих проектах;
- составлена сравнительная таблица;
- выбран лучший кодовый референс для сырого импорта;
- зафиксировано, какие режимы чата нужны дизайн-системе;
- отмечены backend/orchestration зависимости, которые не входят в UI-пакеты.

### INV-11: REVERIE — сайт, карточки и motion-паттерны

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

Что ищем:

- сайт REVERIE;
- карточки и секции сайта;
- hover-логика;
- анимации блоков;
- parallax-блок с двумя раскрывающимися панелями;
- scroll-based motion;
- решения уровня Framer-like experience.

Целевая зона:

- `packages/patterns`;
- Storybook: `Website Blocks / Motion`;
- Playground: website blocks preview;
- Figma: обязательный слепок.

Риски:

- анимации могут быть завязаны на конкретный контент;
- важно сохранить вкус и характер решений;
- нужно не превратить motion-паттерны в безликие универсальные блоки.

Критерии готовности задачи:

- перечислены сильные website blocks;
- найден parallax-блок;
- описаны события и триггеры анимаций;
- указаны зависимости от layout и контента;
- предложены варианты универсализации.

### INV-12: REVERIE — графики и аналитические компоненты

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

Что ищем:

- chart components;
- аналитические карточки;
- графики прогресса;
- legends;
- tooltips;
- dashboard-паттерны.

Целевая зона:

- `packages/patterns`;
- `packages/ui-react`;
- `packages/tokens` для chart color semantics;
- Storybook: `Charts / Analytics`.

Риски:

- графики могут быть связаны с конкретной структурой данных;
- нужно заранее заложить семантические chart tokens;
- часть решений может быть сырой и требовать перепроектирования.

Критерии готовности задачи:

- найден список chart components;
- указаны библиотеки графиков;
- описаны форматы данных;
- перечислены цвета и визуальные токены;
- предложен минимальный набор reusable chart patterns.

### INV-13: REVERIE — продуктовые интерфейсы автоматизации контент-маркетинга

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

Что ищем:

- сложные экраны автоматизации контент-маркетинга;
- сценарии управления контентом;
- продуктовые панели;
- workflow cards;
- состояния генерации;
- интерфейсы, где сейчас не хватает дизайн-системных компонентов.

Целевая зона:

- `packages/patterns`;
- Storybook: `Marketing Automation`;
- Playground: product workflow preview.

Риски:

- продукт большой и сложный;
- нельзя тащить весь REVERIE целиком;
- нужно сначала выделить повторяемые UI-задачи, а не доменную бизнес-логику.

Критерии готовности задачи:

- перечислены ключевые экраны;
- отмечены повторяемые UI-паттерны;
- указаны болевые места текущего UX;
- предложены кандидаты на будущие vertical kits;
- зафиксировано, что точно не переносим.

### INV-14: Security Sphere — эталонный стек и архитектурная совместимость

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`

Что ищем:

- структуру Next.js frontend;
- pnpm/turbo conventions;
- naming и deploy conventions;
- способ подключения UI-компонентов;
- границы frontend/backend;
- полезные решения сайта и админки.

Целевая зона:

- документация интеграции;
- `apps/playground` как совместимый runtime;
- будущие consumer integration checks;
- Storybook: только если есть готовые UI-решения для переноса.

Риски:

- админка слабая и сырая;
- проект больше важен как эталон стека, чем как источник финального UI;
- нельзя перетащить проектные assumptions в дизайн-систему.

Критерии готовности задачи:

- описан стек и структура frontend;
- перечислены полезные UI-решения;
- отмечены слабые места;
- зафиксированы требования совместимости дизайн-системы с типовым потребителем;
- предложены будущие integration checks.

### INV-15: Security Sphere — сайт и админка как ранний UI-референс

Источник:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`

Что ищем:

- интерфейс сайта;
- интерфейс админки;
- компоненты, ставшие родителями решений Gigonom 2026;
- карточки;
- формы;
- navigation patterns;
- контентные секции.

Целевая зона:

- `packages/patterns`;
- `packages/ui-react`;
- Storybook: `Website Blocks`, `Admin`, `Forms`.

Риски:

- часть решений устарела относительно Gigonom 2026;
- нужно сравнивать с потомками, а не слепо переносить;
- возможно, Security Sphere будет не источником кода, а источником архитектурных решений.

Критерии готовности задачи:

- найден список UI-компонентов;
- отмечено, какие решения уже лучше представлены в Gigonom 2026;
- указаны кандидаты на перенос;
- указаны кандидаты только на референс;
- предложен порядок сравнения.

### INV-16: Будущая ERP-зона Gigonom — место под отчеты, таблицы и графики

Источник:

Пока не один конкретный источник. Основной будущий потребитель — Gigonom 2026.

Что закладываем:

- таблицы;
- отчеты;
- графики;
- календарь;
- timeline;
- dashboard;
- аналитические состояния.

Целевая зона:

- `packages/patterns`;
- `packages/ui-react`;
- Storybook: `ERP / Analytics`;
- Playground: ERP preview в будущем.

Риски:

- текущие наработки сырые;
- слишком ранняя реализация может создать плохие API;
- нужно заложить место в карте, но не начинать перенос без конкретного источника.

Критерии готовности задачи:

- описаны ожидаемые будущие UI-задачи ERP;
- зафиксировано, какие текущие источники можно использовать позже;
- не принято преждевременных API-решений;
- создан backlog placeholder для будущего этапа.

## Сводка целевых пакетов

### `packages/ui-react`

Кандидаты:

- date picker;
- primitives из CRUD views;
- sidebar primitives;
- cards;
- forms;
- editor controls;
- chat primitives;
- chart primitives.

### `packages/patterns`

Кандидаты:

- CRUD admin views;
- WYSIWYG/editor workflow;
- settings/provider connection;
- sidebar navigation;
- canvas workspace;
- panel layout system;
- chat assistant;
- website blocks;
- marketing automation workflows;
- ERP analytics patterns.

### `packages/tokens`

Кандидаты:

- chart color semantics;
- admin state semantics;
- editor state semantics;
- motion presets;
- sidebar/navigation states.

### `packages/icons`

Кандидаты:

- icons used in admin navigation;
- editor icons;
- chat icons;
- canvas toolbar icons;
- provider/settings icons.

## Сводка Storybook-иерархии

Будущие группы:

- `Admin / CRUD`;
- `Navigation / Sidebar`;
- `Forms / Date Picker`;
- `Editors / WYSIWYG`;
- `Settings / Provider Connection`;
- `Canvas / Core`;
- `Layouts / Panels`;
- `Interaction / Drag and Drop`;
- `Chat Assistant`;
- `Website Blocks / Motion`;
- `Charts / Analytics`;
- `Marketing Automation`;
- `ERP / Analytics`.

## Сводка Playground-поверхностей

Будущие preview-зоны:

- admin CRUD preview;
- editor preview;
- settings preview;
- forms preview;
- navigation preview;
- canvas workspace preview;
- chat preview;
- website blocks preview;
- dashboard preview;
- ERP preview.

## Что не делаем в Этапе 2

- не копируем исходный код;
- не создаем финальные компоненты;
- не делаем Figma-слепки;
- не финализируем API;
- не переносим backend/orchestration logic;
- не чистим исходные проекты.

## Готовность Этапа 2

Этап 2 считается готовым, когда:

- карта инвентаризации согласована;
- каждый `INV-*` блок можно отдать как отдельную задачу;
- для каждого блока понятен источник;
- для каждого блока понятен целевой пакет или поверхность;
- для каждого блока описаны риски;
- для каждого блока есть критерии готовности;
- создан PR этапа с зелеными проверками.

