# INV-02: Gigonom 2026 — WYSIWYG и редакторские панели

## Статус

Готово к ревью.

## Источник

Путь:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Дополнительный референс для редакторских панелей:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

## Цель

Найти WYSIWYG-редактор, панели редактора и UI генерации изображений для будущего editor kit.

## Что ищем

- WYSIWYG entry point;
- toolbar;
- панели редактора;
- блоки работы с текстом;
- панели генерации изображений;
- поля и настройки контента.

## Целевое место

Пакеты:

- `packages/patterns`;
- `packages/ui-react`.

Storybook:

- `Editors / WYSIWYG`.

Playground:

- `editor-preview`.

Figma:

- нужен слепок: `да`.

## Критерии готовности

- найден основной entry point редактора;
- перечислены панели и toolbar-компоненты;
- указаны зависимости;
- отделен UI от orchestration-логики;
- описаны mock-данные.

## Краткий вывод

В Gigonom 2026 WYSIWYG уже частично выделен в самостоятельные пакеты:

- `packages/editor-core` — React/Lexical UI runtime редактора;
- `packages/editor-ai-sdk` — контракт для upload, image generation и editor AI actions;
- `packages/editor-theme` — CSS-классы и токены рендера контента;
- `apps/admin/src/shared/editor` — admin adapter, который подключает реальные OpenRouter/media endpoints.

Основной entry point:

`packages/editor-core/src/ui/lexical-editor-field.component.tsx`

Компонент:

`LexicalEditorField`

Это лучший основной источник для дизайн-системы, потому что ядро уже отделено от конкретного backend через `EditorAiSdk`.

Reverie содержит похожий editor package, но часть файлов `editor-core` отличается, а `editor-ai-sdk` и `editor-theme` совпадают с Gigonom 2026. Поэтому Reverie нужно брать не как основной источник WYSIWYG-ядра, а как источник продуктовых панелей вокруг редактора: platform-aware toolbar, AI assistant, image picker, version history и preview.

## Найденные entry points

### Gigonom 2026: WYSIWYG core

| Слой | Source path | Что найдено |
| --- | --- | --- |
| Public export | `packages/editor-core/src/index.ts` | экспорт `LexicalEditorField` и `LexicalEditorFieldProps` |
| Main component | `packages/editor-core/src/ui/lexical-editor-field.component.tsx` | композиция Lexical editor, plugins, article/field variants |
| Runtime context | `packages/editor-core/src/ui/lexical-editor.runtime.ts` | контекст `aiSdk` и `annotationRenderMode` |
| Commands | `packages/editor-core/src/ui/lexical-editor.commands.ts` | команда `INSERT_ARTICLE_IMAGE_COMMAND` |
| Types | `packages/editor-core/src/ui/lexical-editor.types.ts` | image payload, serialized image node, cached selection |
| State utils | `packages/editor-core/src/ui/lexical-editor-state.ts` | initial/empty Lexical state |

### Gigonom 2026: admin integration

| Слой | Source path | Что найдено |
| --- | --- | --- |
| Editor config | `apps/admin/src/shared/editor/model/editor-config.ts` | подключение `adminEditorAiSdk`, режим отображения аннотаций из env |
| Admin SDK adapter | `apps/admin/src/shared/editor/model/admin-editor-ai-sdk.ts` | upload через media API, настройки и генерация через OpenRouter endpoints |
| Article editor panel | `apps/admin/src/features/admin-resource-form/ui/editorial-content-fields.component.tsx` | title field, article editor, annotations overlay |
| Generic field renderer | `apps/admin/src/features/admin-resource-form/ui/field-control.component.tsx` | подключает `LexicalEditorField` для `json` полей |
| Form composition | `apps/admin/src/features/admin-resource-form/ui/admin-resource-form-body.component.tsx` | решает, когда показывать article editor и спецпанели |

### Reverie: product editor reference

| Слой | Source path | Что найдено |
| --- | --- | --- |
| Product editor screen | `apps/prototype-web/src/pages/content-editor/ui/EditorView.tsx` | edit/preview tabs, right panel, image block, AI, versions, platform preview |
| Prototype Lexical editor | `apps/prototype-web/src/features/content-editor/ui/LexicalEditor.tsx` | markdown-based Lexical editor, static toolbar, floating toolbar |
| Platform toolbar | `apps/prototype-web/src/features/content-editor/ui/FloatingToolbar.tsx` | floating selection toolbar with platform-aware buttons and AI menu |
| Toolbar config | `apps/prototype-web/src/features/content-editor/model/toolbar-config.ts` | per-platform toolbar groups for Dzen, VC, VK, Telegram, Instagram, TikTok, LinkedIn, Twitter, Email |
| AI panel | `apps/prototype-web/src/pages/content-editor/ui/AIAssistantPanel.tsx` | sidebar AI actions grouped by rewrite/transform/generate |
| Image picker | `apps/prototype-web/src/pages/content-editor/ui/ImagePickerModal.tsx` | tabs `library`, `generate`, `upload`, basic crop/fit/fill controls |
| Version history | `apps/prototype-web/src/pages/content-editor/ui/VersionHistory.tsx` | version timeline, compare, restore, create version |
| Platform preview | `apps/prototype-web/src/pages/content-editor/ui/PlatformPreview.tsx` | Telegram, VK, Instagram, stories, article, email previews |

## Панели и toolbar-компоненты Gigonom 2026

### Floating text toolbar

Source path:

`packages/editor-core/src/ui/lexical-editor-toolbar.plugin.tsx`

Компонент:

`FloatingTextToolbar`

Функции:

- позиционирование toolbar относительно выделенного текста;
- форматирование `bold`, `italic`, `underline`, `strikethrough`, `code`;
- заголовки `H2`, `H3`, `H4`;
- ссылка через `TOGGLE_LINK_COMMAND`;
- списки `bullet`, `number`;
- quote block;
- AI menu.

AI actions:

- `Аннотация`;
- `Сократить`;
- `Добавить фактуры`.

UI можно переносить в дизайн-систему. Orchestration нужно оставить за callback-контрактом `EditorAssistantAction`.

### Slash insert menu

Source path:

`packages/editor-core/src/ui/lexical-editor-slash-menu.plugin.tsx`

Компонент:

`SlashInsertMenuPlugin`

Найденные команды:

- divider;
- image;
- table;
- columns;
- youtube.

Риск: часть команд может быть disabled или не иметь полной реализации. Для Storybook нужно показать меню как UI pattern и отдельно пометить команды, требующие future implementation.

### Block handle и block drag

Source path:

`packages/editor-core/src/ui/lexical-editor-block-handle.plugin.tsx`

Компонент:

`BlockHandlePlugin`

Функции:

- hover handle у блоков;
- native drag-and-drop блоков;
- drop target;
- drag preview;
- перемещение top-level nodes.

UI и interaction-паттерн ценные для `packages/patterns`. При переносе нужно проверить совместимость с будущим общим drag-and-drop hook из `INV-06`.

### Article image plugin

Source paths:

- `packages/editor-core/src/ui/lexical-editor-image.plugin.tsx`;
- `packages/editor-core/src/ui/lexical-editor-image.node.tsx`;
- `packages/editor-core/src/ui/lexical-editor-image.component.tsx`;
- `packages/editor-core/src/ui/lexical-editor-image-utils.ts`;
- `packages/editor-core/src/ui/use-article-image-resize.hook.ts`.

Найденные возможности:

- кастомный Lexical node `ArticleImageNode`;
- вставка изображения командой;
- paste/upload изображения из clipboard;
- prompt panel для генерации изображения;
- выбор модели;
- выбор aspect ratio;
- выбор image size;
- upload файла;
- replace/remove image;
- apply generated variant;
- insert generated variant below;
- caption field;
- align `left`, `center`, `right`;
- fit mode `fill`, `fit`, `crop`;
- frame width;
- frame height;
- zoom;
- focus X/Y;
- drag image focus внутри frame;
- resize handles `right`, `bottom`, `corner`.

Это сильный кандидат на отдельный `EditorImageBlock` pattern. Реальный upload/generation должен идти только через `EditorAiSdk`, не через прямой API.

### Media upload fields в admin form

Source path:

`apps/admin/src/features/admin-resource-form/ui/media-upload-fields.component.tsx`

Компоненты:

- `MediaUploadField`;
- `MediaListUploadField`.

Найденные возможности:

- drag-and-drop file upload;
- upload file from local input;
- upload from external URL/drop;
- preview image;
- open file;
- clear file;
- prompt panel;
- compose prompt from content;
- reference image upload;
- generate image through OpenRouter endpoint;
- gallery item reorder;
- generate image into existing gallery tile;
- generate new gallery tile.

UI-часть полезная, но сейчас компонент напрямую вызывает `requestJson`, `uploadMedia` и endpoint `/api/cms/v1/openrouter-images`. При переносе нужно разделить:

- `MediaUploadFieldView` в `packages/ui-react`;
- `ImageGenerationPanel` в `packages/patterns`;
- `MediaDataSource` и `ImageGenerationDataSource` в contracts/adapters.

### Editorial content fields

Source path:

`apps/admin/src/features/admin-resource-form/ui/editorial-content-fields.component.tsx`

Компонент:

`EditorialContentFields`

Функции:

- большое поле заголовка статьи;
- article editor variant;
- подключение `LexicalEditorField`;
- загрузка аннотаций по `blogPostId`;
- создание аннотации из выделения;
- AI rewrite выделенного текста;
- save/regenerate/delete аннотаций;
- правый overlay аннотаций.

UI переносим как `EditorialArticleEditorPattern`. Операции `list/create/update/delete annotations`, `rewrite selection` и `blogPostId` должны стать adapter callbacks.

### Annotation panels

Source paths:

- `apps/admin/src/features/admin-resource-form/ui/article-annotations-overlay.component.tsx`;
- `apps/admin/src/features/admin-resource-form/ui/editable-article-annotation.component.tsx`;
- `apps/admin/src/features/admin-resource-form/ui/annotation-draft-generator.component.tsx`;
- `apps/admin/src/features/admin-resource-form/model/blog-post-annotations.ts`.

Найденные панели:

- overlay со списком аннотаций рядом с текстом;
- anchor matching по DOM-тексту редактора;
- editable annotation card;
- regenerate annotation draft;
- save annotation;
- delete annotation;
- standalone annotation draft generator для формы аннотации.

Риск: логика привязана к модели `blog-post-annotations`. В дизайн-систему переносить UI и контракт `AnnotationDataSource`, не REST endpoints.

### SEO generator panel

Source paths:

- `apps/admin/src/features/admin-resource-form/ui/seo-meta-generator.component.tsx`;
- `apps/admin/src/features/admin-resource-form/model/seo-meta-generator.ts`.

Найдено:

- кнопка генерации SEO;
- использование текущих `title`, `caption`, `content`, `meta*`;
- endpoint `/api/cms/v1/openrouter-seo-meta`;
- применение draft в форму.

Это app/editor-assistant pattern, но не чистый WYSIWYG. Нужно переносить как `EditorAssistantPanel / SEO generator preset`, а endpoint оставить в app adapter.

### Blog history panel

Source paths:

- `apps/admin/src/features/admin-resource-form/ui/blog-post-history-tab.component.tsx`;
- `apps/admin/src/features/admin-resource-form/model/blog-post-audit-log.ts`.

Найдено:

- tab `История` для `blog-posts`;
- список audit log events;
- payload summary;
- loading/error/empty states.

Для дизайн-системы это не WYSIWYG core, но важный редакторский product pattern: `EditorHistoryPanel`.

## Reverie: что имеет смысл взять

### Platform-aware floating toolbar

Source paths:

- `apps/prototype-web/src/features/content-editor/ui/FloatingToolbar.tsx`;
- `apps/prototype-web/src/features/content-editor/model/toolbar-config.ts`.

Ценность:

- toolbar конфигурируется под площадку публикации;
- для каждой платформы свой набор допустимого форматирования;
- есть AI quick actions menu;
- есть группы buttons.

Это лучше, чем жестко зашитый toolbar, если мы хотим использовать редактор для разных каналов: блог, email, Telegram, VK, LinkedIn, Twitter, Dzen, VC, Instagram.

Нужно взять идею и контракт, но не переносить код как есть без ревизии: это prototype-web код, он markdown-based и менее зрелый, чем Gigonom editor-core.

### Product editor layout

Source path:

`apps/prototype-web/src/pages/content-editor/ui/EditorView.tsx`

Ценность:

- edit/preview tabs;
- right panel с вкладками `meta`, `ai`, `versions`;
- image placement variants;
- character counter;
- AI regenerate;
- channel/platform preview;
- version restore.

Это кандидат в `packages/patterns` как `ContentProductionEditorShell`.

### AI assistant panel

Source path:

`apps/prototype-web/src/pages/content-editor/ui/AIAssistantPanel.tsx`

Ценность:

- actions сгруппированы как `rewrite`, `transform`, `generate`;
- есть custom prompt;
- есть result/apply flow.

Сейчас логика mock. UI можно использовать как референс, orchestration нужно проектировать заново через editor assistant contracts.

### Image picker modal

Source path:

`apps/prototype-web/src/pages/content-editor/ui/ImagePickerModal.tsx`

Ценность:

- tabs `library`, `generate`, `upload`;
- image library grid;
- prompt для генерации;
- upload;
- fit/crop/fill controls.

Можно объединить с Gigonom `MediaUploadField` и `ArticleImageComponent`: Gigonom сильнее по реальной генерации, Reverie сильнее как отдельный modal/picker pattern.

### Version history and previews

Source paths:

- `apps/prototype-web/src/pages/content-editor/ui/VersionHistory.tsx`;
- `apps/prototype-web/src/pages/content-editor/ui/PlatformPreview.tsx`.

Ценность:

- version timeline;
- compare/restore;
- previews под разные платформы.

Это не core WYSIWYG, но важная часть редакторского UX для Reverie и будущего editor kit.

## Зависимости редактора

### Runtime dependencies Gigonom editor-core

Из `packages/editor-core/package.json`:

- `@lexical/link`;
- `@lexical/list`;
- `@lexical/react`;
- `@lexical/rich-text`;
- `@lexical/selection`;
- `@lexical/utils`;
- `lexical`;
- `@gigonom/editor-ai-sdk`;
- `@gigonom/editor-theme`;
- `lucide-react`;
- `react`;
- `clsx`;
- `tailwind-merge`.

### Theme dependencies

Из `packages/editor-theme/package.json`:

- `style-dictionary` для сборки токенов;
- экспорт `styles.css`;
- экспорт `tokens.css`.

### App-level dependencies

Gigonom admin adapter использует:

- `requestJson`;
- `uploadMedia`;
- `/api/cms/v1/openrouter-settings`;
- `/api/cms/v1/openrouter-images`;
- `/api/cms/v1/openrouter-annotation-drafts`;
- `/api/cms/v1/openrouter-text-rewrites`;
- `/api/cms/v1/openrouter-seo-meta`;
- `/api/cms/v1/blog-post-annotations`;
- `/api/cms/v1/blog-audit-logs`.

Эти зависимости нельзя переносить в `editor-core` или `ui-react`.

## Что можно копировать как UI

Кандидаты на сырой перенос:

- `packages/editor-ai-sdk`;
- `packages/editor-theme`;
- `LexicalEditorField`;
- `FloatingTextToolbar`;
- `SlashInsertMenuPlugin`;
- `BlockHandlePlugin`;
- `ArticleImageNode`;
- `ArticleImagePlugin`;
- `ArticleImageComponent`;
- image resize hook;
- image utility functions;
- `EditorialContentFields` после замены REST на callbacks;
- `ArticleAnnotationsOverlay` как UI;
- `EditableArticleAnnotation` как UI;
- `MediaUploadField` и `MediaListUploadField` после разрыва с `requestJson/uploadMedia`;
- `SeoMetaGenerator` как UI panel;
- `BlogPostHistoryTab` как UI panel;
- Reverie `FloatingToolbar` idea/config;
- Reverie `AIAssistantPanel`;
- Reverie `ImagePickerModal`;
- Reverie `VersionHistory`;
- Reverie `PlatformPreview`.

## Что оставить как app logic

Нельзя переносить в дизайн-систему как прямую зависимость:

- `requestJson`;
- `uploadMedia`;
- OpenRouter endpoint paths;
- CMS REST paths;
- `blogPostId` как обязательная модель;
- создание, обновление, удаление blog annotations через конкретные routes;
- audit log loading через конкретный route;
- prompt-тексты с жесткой привязкой к Gigonom brand;
- admin form save flow;
- env `NEXT_PUBLIC_EDITOR_ANNOTATION_RENDER_MODE` как единственный способ конфигурации;
- Reverie prototype store/actions из `useContentProduction`;
- mock AI transform из Reverie как реальную бизнес-логику.

Нужные контракты:

- `EditorAiSdk`;
- `MediaDataSource`;
- `ImageGenerationDataSource`;
- `AnnotationDataSource`;
- `SeoGenerationDataSource`;
- `EditorHistoryDataSource`;
- `PlatformToolbarConfig`;
- `ContentVersionDataSource`.

## Минимальный набор mock-данных для Storybook

### Editor state

Нужно подготовить serialized Lexical state:

- empty state;
- paragraph;
- H2/H3/H4;
- bold/italic/underline/strikethrough/code;
- ordered/unordered list;
- quote;
- link;
- divider;
- article image node with caption;
- article image node with crop/fill/fit settings.

### AI SDK mock

Mock `EditorAiSdk`:

- `media.uploadImage(file)` возвращает fake `EditorMediaAsset`;
- `images.getSettings()` возвращает `defaultModel`, `defaultAspectRatio`, `defaultImageSize`, `models`;
- `images.generateImage(input)` возвращает fake generated media;
- delayed success state;
- error state.

### Image data

Нужны:

- uploaded media asset;
- generated media variants;
- reference image;
- gallery list из 3-5 элементов;
- unsupported file;
- upload error;
- generation error.

### Annotation data

Нужны:

- 3-5 аннотаций с разными `kind`;
- annotation loading state;
- annotation error state;
- annotation not found in text;
- editable annotation draft;
- regenerate success/error.

### Form/editor context

Нужны:

- title;
- caption;
- meta title;
- meta description;
- meta keywords;
- content text;
- `resourceTitle`: `статью`, `услугу`, `кейс`;
- active tab `text`, `seo`, `history`;
- disabled/submitting state.

### Reverie product editor mocks

Нужны:

- content unit;
- active version;
- version list;
- platform `telegram`, `vk`, `instagram`, `email`, `dzen`, `vc`;
- image placement `before-text`, `after-text`, `inline`, `none`;
- char limit;
- AI action result;
- platform preview image.

## Рекомендуемый порядок сырого импорта

1. Перенести `editor-ai-sdk` как контрактный пакет без изменений, потому что он уже отделяет UI от provider logic.
2. Перенести `editor-theme` как foundation для контентной типографики, но сразу привязать к будущей token pipeline.
3. Перенести `editor-core` из Gigonom 2026 как основное WYSIWYG-ядро.
4. Собрать Storybook stories для `LexicalEditorField`: `field`, `article`, `empty`, `rich text`, `image block`, `toolbar`, `slash menu`.
5. Перенести `ArticleImageComponent` stories отдельно: upload, generate, variants, crop/fill/fit, resize, caption.
6. Перенести admin `EditorialContentFields` как pattern, заменив API calls на mock callbacks.
7. Перенести `MediaUploadField` и `MediaListUploadField` как UI/pattern, вытащив `requestJson/uploadMedia` наружу.
8. Перенести annotation overlay/cards как UI, а `blog-post-annotations.ts` оставить только как пример adapter.
9. Добавить Reverie `PlatformToolbarConfig` как отдельный контракт для channel-aware editor toolbar.
10. Добавить Reverie panels как отдельные pattern stories: AI assistant, image picker, version history, platform preview.
11. Подготовить Playground `editor-preview`: переключатель `field/article/product`, toolbar mode, platform, annotation visibility, image state, AI state.
12. После сырого переноса сделать обязательный Figma-слепок editor shell, toolbar, image panel, annotation panel, AI panel, image picker, version panel.

## Целевая раскладка после переноса

В `packages/patterns`:

- `editors/wysiwyg`;
- `editors/article-editor`;
- `editors/editor-image-block`;
- `editors/image-generation-panel`;
- `editors/media-picker`;
- `editors/annotation-panel`;
- `editors/seo-generator-panel`;
- `editors/history-panel`;
- `editors/platform-toolbar`;
- `editors/platform-preview`;
- `editors/content-production-shell`;
- `editors/mock-data`.

В `packages/ui-react`:

- `floating-toolbar`;
- `slash-menu`;
- `segmented-control`;
- `range-control`;
- `image-frame`;
- `upload-dropzone`;
- `prompt-panel`;
- `side-panel`;
- `tabs`;
- `status-message`;
- `version-card`.

Storybook:

- `Editors / WYSIWYG / Field`;
- `Editors / WYSIWYG / Article`;
- `Editors / WYSIWYG / Floating toolbar`;
- `Editors / WYSIWYG / Slash menu`;
- `Editors / WYSIWYG / Image block`;
- `Editors / WYSIWYG / Media upload`;
- `Editors / WYSIWYG / Gallery upload`;
- `Editors / WYSIWYG / Annotations`;
- `Editors / WYSIWYG / SEO generator`;
- `Editors / WYSIWYG / History`;
- `Editors / WYSIWYG / Platform toolbar`;
- `Editors / WYSIWYG / Product editor shell`;

Playground:

- `editor-preview`;
- выбор режима `field`, `article`, `content-production`;
- выбор платформы;
- включение/выключение annotations;
- включение/выключение AI SDK mock;
- состояния upload/generation success/error;
- preview serialized state.

## Риски и решения

| Риск | Что найдено | Как резать при переносе |
| --- | --- | --- |
| Backend leakage | admin adapter вызывает OpenRouter и media endpoints | Оставить endpoints в consumer adapter, в UI передавать `EditorAiSdk` |
| CMS model coupling | `EditorialContentFields` требует `blogPostId` и blog annotations routes | Ввести `AnnotationDataSource`, `entityId` сделать generic |
| Prompt привязан к Gigonom | `media-fields.ts` содержит Gigonom/B2B prompt language | Вынести как `PromptPreset`, не зашивать в UI |
| Image UI слишком большой | `ArticleImageComponent` совмещает upload, generation, crop, resize, variants | Разделить на image frame, image controls, prompt panel, generation variants |
| Toolbar не channel-aware | Gigonom toolbar один для article mode | Добавить контракт из Reverie `PlatformToolbarConfig` |
| Reverie prototype менее зрелый | markdown editor, mock AI, prototype state | Брать идеи и UI-паттерны, не считать код production-ready |
| Serialized state compatibility | Lexical JSON может стать breaking contract | Нужны versioned fixtures и migration notes |
| Visual regression | редактор завязан на точную типографику и image layout | Нужны Storybook screenshots и Figma слепок до стандартизации |
