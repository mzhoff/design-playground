# INV-15: Security Sphere — сайт и админка как ранний UI-референс

## Статус

Готово к ревью.

## Источник

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`

## Цель задачи

Найти UI-решения сайта и админки Security Sphere, которые можно использовать как ранний референс, источник кода или материал для сравнения с более поздними решениями Gigonom 2026.

Эта задача не переносит код. Результат — карта UI-кандидатов, оценка пригодности и порядок сравнения.

## Короткий вывод

Security Sphere полезен как ранний слой UI-наработок и как первый проект, где закрепились многие подходы, позже развитые в Gigonom 2026.

Главная ценность:

- сайтовые блоки: каталог, карточки, course detail sections, FAQ, отзывы, формы, popup, banner, running logos;
- admin primitives: sidebar, ListView, DataTable, CreateView, PageTabs, Combobox, Calendar, FileUploadField;
- редакторский стек на Lexical;
- формавая архитектура с `react-hook-form`, tab errors и save action через portal в header.

Главное ограничение:

- админка Security Sphere проще и сырее, чем текущая линия Gigonom 2026;
- CRUD в Security Sphere в основном table/list-first, без kanban/card/calendar представлений;
- часть компонентов сильно завязана на курсы, документы, образовательную модель и конкретные API;
- визуальный язык сайта качественный, но специфичен под Security Sphere и не должен переноситься как финальная стилистика дизайн-системы.

## Найденные UI-компоненты сайта

| Компонент / блок | Путь | Тип решения | Вердикт |
|---|---|---|---|
| Sticky header | `apps/web/src/widgets/header/ui/Header.tsx` | Header скрывается при scroll down и возвращается при scroll up. | Референс поведения. Код можно смотреть, но финальную реализацию делать универсальной. |
| Desktop navigation | `apps/web/src/widgets/header/ui/components/HeaderNav/HeaderNav.tsx` | Active links, hover dropdown через HoverCard. | Кандидат на navigation pattern. Сравнить с Gigonom 2026 site/header. |
| Mobile menu | `apps/web/src/widgets/header/ui/components/MobileMenu/MobileMenu.tsx` | Dialog-based mobile menu, active links, secondary links, action zone. | Хороший early reference для responsive navigation. |
| Promo banner | `apps/web/src/widgets/course-banner/ui/CourseBanner.tsx` | Top promo banner с cookie hide на 4 часа. | Кандидат на Website Blocks / Promo Banner. Нужно отвязать от курса и cookie key. |
| Newsletter popup | `apps/web/src/widgets/newsletter-popup/ui/NewsletterPopup.tsx` | Popup/sheet с form/success/error состояниями, mobile drag handle. | Сильный кандидат на перенос после отделения hook/model. |
| Contact form | `apps/web/src/features/contact-form/ui/contact-form/ContactForm.tsx` | Lead form: name, phone, email, agreement, validation, metrika. | Кандидат на Forms / Lead Form. API/analytics оставить adapter layer. |
| CoursesCatalog | `apps/web/src/widgets/courses/ui/CoursesCatalog.tsx` | Большой каталог с URL search params, multi-select filters, sort, pagination. | Кандидат на Website Blocks / Catalog. Нужно обобщить под любой каталог. |
| Popular Courses | `apps/web/src/widgets/courses/ui/Courses.tsx` | Компактный блок популярных карточек с search/tag filters. | Кандидат на website pattern. Вероятно, проще взять как референс. |
| CourseCard | `apps/web/src/entities/course/ui/course-card/CourseCard.tsx` | Карточка курса: image, code, hours, price, CTA, analytics attrs. | Кандидат на Product/Website Card, но fetching из карточки надо убрать. |
| ArticleCard | `apps/web/src/entities/article/ui/article-card/ArticleCard.tsx` | Карточка статьи: image, date, reading time, tag CTA. | Кандидат на Content Card pattern. |
| CourseDetails | `apps/web/src/widgets/course-details/ui/CourseDetails.tsx` | Композиция детальной страницы курса из секций. | Референс для long-form product detail page. |
| CourseDetailHero | `apps/web/src/widgets/course-details/ui/components/CourseDetailHero/CourseDetailHero.tsx` | Product detail hero: title, subtitle, price action, image rings, info cards. | Сильный website block candidate. Требуется Figma-слепок. |
| CourseDetailInfoCard | `apps/web/src/widgets/course-details/ui/components/CourseDetailInfoCard/CourseDetailInfoCard.tsx` | Маленькая info-card с иконкой и строками данных. | Кандидат в `ui-react` или `patterns`. |
| CourseDetailProgramOverview | `apps/web/src/widgets/course-details/ui/components/CourseDetailProgramOverview/CourseDetailProgramOverview.tsx` | Program overview, documents, expandable list, download links. | Референс сложной контентной секции. Домен курса убрать. |
| Categories | `apps/web/src/widgets/categories/ui/Categories.tsx` | Интерактивные image cards с active state. | Кандидат на Website Blocks / Category Cards. |
| FAQ | `apps/web/src/widgets/faq/ui/Faq.tsx` | FAQ section с загрузкой из API, empty/loading/error. | UI-сценарий переносить, API вынести. |
| FaqItem | `apps/web/src/entities/faq/ui/faq-item/FaqItem.tsx` | Accordion item с controlled open state. | Кандидат на primitive/pattern, но сравнить с Radix Accordion. |
| Reviews | `apps/web/src/widgets/reviews/ui/Reviews.tsx` | Swiper carousel + responsive dialog для полного отзыва. | Кандидат на Website Blocks / Reviews Carousel. Зависимость Swiper обсудить отдельно. |
| RunningLogo | `apps/web/src/widgets/running-logos/ui/RunningLogo.tsx` | Бесконечная лента логотипов. | Кандидат на Website Blocks / Logo Marquee. Нужно заменить локальные картинки на props. |
| AboutCenter | `apps/web/src/widgets/about-center/ui/AboutCenter.tsx` | Раздел с desktop/mobile switcher, документами и CMS content. | Референс для Documentation/Content Navigation, но сильно доменный. |
| Footer | `apps/web/src/widgets/footer/ui/Footer.tsx` | Footer из Brand/Contacts/About blocks. | Только референс структуры. |
| Hero | `apps/web/src/widgets/hero/ui/Hero.tsx` | Главный hero сайта с licenses/images/text subcomponents. | Референс, сравнить с Gigonom 2026 site hero. |

## Найденные UI-компоненты админки

| Компонент / блок | Путь | Тип решения | Вердикт |
|---|---|---|---|
| Sidebar primitive | `apps/admin/src/shared/components/ui/sidebar.tsx` | Collapsed/mobile/sidebar state, Sheet, cookie, keyboard shortcut. | Сильный technical reference. Визуально сравнить с Gigonom 2026 sidebar. |
| AdminSidebar | `apps/admin/src/widgets/admin-sidebar/ui/admin-sidebar.component.tsx` | Сборка sidebar из content/group/footer. | Только референс композиции, меню hardcoded. |
| AdminSidebarMenu | `apps/admin/src/widgets/admin-sidebar/ui/admin-sidebar-menu.component.tsx` | Навигационные группы и subitems. | Референс структуры, но не переносить как код из-за hardcoded routes. |
| Header with actions portal | `apps/admin/src/widgets/header/ui/header.component.tsx` | Sticky header + `HEADER_ACTIONS_PORTAL_ID` для действий страницы. | Хороший pattern для admin forms. Кандидат на перенос. |
| WithSidebarLayout | `apps/admin/src/app/layouts/with-sidebar-layout.component.tsx` | Dashboard shell: SidebarProvider, sidebar, header, content. | Референс admin layout shell. |
| ListView | `apps/admin/src/shared/components/list-view/ui/list-view.component.tsx` | CRUD list shell: title, actions, filters, table, pagination. | Кандидат на Admin / ListView, но Gigonom 2026 CRUD богаче. |
| DataTable | `apps/admin/src/shared/components/data-table/ui/data-table.component.tsx` | Table states: loading, error, empty, actions alignment. | Кандидат на Admin / DataTable baseline. |
| CreateView | `apps/admin/src/shared/components/create-view/ui/create-view.component.tsx` | Create/edit page shell с title, description, header actions. | Кандидат на Admin / Form Page Shell. |
| PageTabs | `apps/admin/src/shared/components/page-tabs/ui/page-tabs.component.tsx` | Sticky tabs with `useSticky`. | Кандидат на Forms / Sticky Tabs. |
| Combobox | `apps/admin/src/shared/components/ui/combobox.tsx` | Single/multiple, nested options, search, custom renderer. | Сильный кандидат на `ui-react`. |
| Calendar | `apps/admin/src/shared/components/ui/calendar.tsx` | DayPicker wrapper, single/range styling hooks. | Референс. Gigonom 2026 date picker важнее как финальный продуктовый компонент. |
| CourseForm | `apps/admin/src/features/course-form/ui/course-form.component.tsx` | Multi-tab form: general, relations, plan, documents, SEO, integrations. | Хороший form architecture reference. Не переносить доменную схему курса. |
| CourseForm GeneralTab | `apps/admin/src/features/course-form/ui/tabs/general-tab.component.tsx` | Status, title, subtitle, image upload, price, Lexical editor. | Референс формы с editor/file upload. |
| CourseForm RelationsTab | `apps/admin/src/features/course-form/ui/tabs/relations-tab.component.tsx` | Много multi-combobox связей. | Кандидат на relational fields pattern. |
| CourseForm PlanTab | `apps/admin/src/features/course-form/ui/tabs/plan-tab.component.tsx` | `useFieldArray`, empty state, add/remove plan items. | Кандидат на Forms / Repeater Field. |
| BlogPostForm | `apps/admin/src/features/blog-post-form/ui/blog-post-form.component.tsx` | Form tabs + save button portal + tab error states. | Хороший reference для content forms. |
| BlogPost GeneralTab | `apps/admin/src/features/blog-post-form/ui/tabs/general-tab.component.tsx` | Tags, publish date, preview upload, Lexical editor. | Сравнить с Gigonom 2026 WYSIWYG/editor panels. |
| BlogPost SeoTab | `apps/admin/src/features/blog-post-form/ui/tabs/seo-tab.component.tsx` | Slug generation, meta title/description/keywords. | Кандидат на reusable SEO tab. |
| PageForm | `apps/admin/src/features/page-form/ui/page-form.component.tsx` | CMS page form: parent selection, content editor, SEO. | Референс для CMS forms. Gigonom 2026 вероятно лучше. |
| FileUploadField | `apps/admin/src/shared/form/ui/file-upload-field.tsx` | Upload field with fetch/upload override, status, preview, actions. | Сильный candidate на перенос после отделения media API. |
| FileUploadPreview | `apps/admin/src/shared/form/ui/file-upload/file-upload-preview.tsx` | Image/file preview, extension badge, size. | Кандидат в `ui-react/forms`. |
| FileUploadActions | `apps/admin/src/shared/form/ui/file-upload/file-upload-actions.tsx` | Clear/open actions. | Кандидат в `ui-react/forms`. |
| DocumentForm | `apps/admin/src/features/document-form/ui/document-form.component.tsx` | Form with status, sort, file upload, portal save action. | Референс для file/document forms. |
| DocumentsPage | `apps/admin/src/pages/document/document-list/ui/documents-page.component.tsx` | CRUD list with local pagination over GraphQL data. | Референс, но слабее будущего универсального CRUD. |
| Document columns | `apps/admin/src/pages/document/document-list/lib/useDocumentColumns.tsx` | Status badge, signature state, sign/edit/delete actions. | Референс action columns and status cells. |
| Lexical editor | `apps/admin/src/shared/components/editor` | Rich editor plugins, toolbar, images, tables, embeds, markdown. | Технический source candidate, но сравнить с Gigonom 2026 и REVERIE editor flows. |

## Что уже лучше представлено в Gigonom 2026

| Зона | Security Sphere | Gigonom 2026 / другие источники | Решение |
|---|---|---|---|
| CRUD views | В основном `ListView` + `DataTable`. | В Gigonom 2026 есть CRUD views: kanban, list, cards, calendar, future timeline. | Security использовать как baseline table/list, не как главный CRUD source. |
| Admin sidebar | Есть сильный shadcn sidebar primitive, но меню hardcoded. | В Gigonom 2026 левая панель визуально и продуктово ближе к целевому UX. | Объединить: technical behavior из Security, visual/product direction из Gigonom 2026. |
| Date picker | Есть DayPicker wrapper. | В Gigonom 2026 есть уникальный date picker и range date picker. | Security calendar только reference для DayPicker styling, не финальный источник. |
| WYSIWYG | Есть большой Lexical stack. | В Gigonom 2026 и REVERIE нужны AI/image/editor panels и более богатые сценарии. | Security editor использовать как technical source plugins, финальный UX брать из Gigonom/REVERIE. |
| Settings/provider connection | Нет сильного отдельного сценария. | В Gigonom 2026 есть настройки и OpenRouter provider connection. | По settings Security не использовать. |
| Marketing/content automation | Нет. | REVERIE покрывает content marketing automation. | Не смешивать с Security Sphere. |
| Website blocks | Есть сильные сайт-блоки. | Gigonom 2026 будет первым потребителем и может дать более актуальный визуальный язык. | Security использовать как раннее сырье и сравнивать с Gigonom site blocks. |

## Кандидаты на перенос кода

### Высокий приоритет

| Кандидат | Причина | Целевая зона |
|---|---|---|
| `FileUploadField` + preview/actions/status | Хорошая универсальная форма загрузки, уже поддерживает override `uploadFile/fetchFile`. | `packages/ui-react`, `packages/patterns/forms` |
| `Combobox` | Single/multiple, nested options, custom renderers, search. | `packages/ui-react` |
| `PageTabs` | Sticky tabs полезны для длинных форм. | `packages/ui-react`, `packages/patterns/forms` |
| `Header actions portal` | Хороший admin UX: кнопка сохранения живет в header, форма в content. | `packages/patterns/admin` |
| `ListView` + `DataTable` | Базовый CRUD table/list shell. | `packages/patterns/admin` |
| `CreateView` | Универсальный form page shell. | `packages/patterns/admin` |
| `NewsletterPopup` | Хороший multi-state popup/sheet сценарий. | `packages/patterns/website` |
| `ContactForm` | Базовая lead-form логика и состояния. | `packages/patterns/forms` |
| `CoursesCatalog` filter mechanics | URL-driven filters/sort/pagination полезны для любого каталога. | `packages/patterns/website` |
| `CourseDetailInfoCard` | Простая переиспользуемая data/info card. | `packages/ui-react`, `packages/patterns` |

### Средний приоритет

| Кандидат | Причина | Целевая зона |
|---|---|---|
| Sidebar primitive | Технически зрелый, но визуально нужно сверять с Gigonom 2026. | `packages/ui-react/navigation` |
| Calendar wrapper | Полезный DayPicker wrapper, но не главный date picker source. | `packages/ui-react/forms` |
| FAQ/FaqItem | Простая accordion-секция, но лучше сравнить с Radix Accordion. | `packages/patterns/website` |
| Reviews carousel | Хороший блок, но зависимость Swiper нужно согласовать. | `packages/patterns/website` |
| RunningLogo | Простая marquee-лента логотипов. | `packages/patterns/website` |
| Promo banner | Поведение cookie-hide полезно, визуал и копирайтинг доменные. | `packages/patterns/website` |
| CourseDetailHero | Хороший product-detail hero, но домен курса нужно вычистить. | `packages/patterns/website` |
| CourseForm tab architecture | Полезно для complex forms, но поля доменные. | `packages/patterns/forms` |
| SEO tab | Часто повторяется в CMS/admin. | `packages/patterns/forms` |

## Кандидаты только на референс

| Кандидат | Почему не переносить напрямую |
|---|---|
| `AdminSidebarMenu` | Hardcoded routes и образовательная структура. Нужна data-driven модель. |
| `CourseDetails` composition | Сильно привязано к курсам, можно брать только layout principles. |
| `CourseDetailProgramOverview` | Домен курса, документы и учебный план смешаны в одном блоке. |
| `AboutCenter` | Сильно завязан на страницы, документы и SEO Security Sphere. |
| `Footer` | Структура полезна, но контент и визуал доменные. |
| `CourseCard` | UI полезен, но внутри есть data fetching; для дизайн-системы нужна pure card. |
| `Document signing action` | Привязано к криптографии и документам Security Sphere. Можно выделить только pattern action cell/status. |
| `Lexical editor` whole folder | Слишком большой и технический блок. Переносить только после отдельной editor-инвентаризации и сравнения с Gigonom 2026/REVERIE. |
| API/query hooks | Не часть дизайн-системы. Остаются adapters в consumer app. |
| Analytics/metrika attributes | Не часть core UI. Нужен generic analytics props contract. |

## Storybook-структура

### Website Blocks

- `Website Blocks / Header / Sticky Hide On Scroll`
- `Website Blocks / Navigation / Desktop Dropdown Nav`
- `Website Blocks / Navigation / Mobile Menu`
- `Website Blocks / Promo / Top Banner`
- `Website Blocks / Promo / Newsletter Popup`
- `Website Blocks / Forms / Lead Form`
- `Website Blocks / Catalog / Filtered Catalog`
- `Website Blocks / Catalog / Product Card`
- `Website Blocks / Product Detail / Hero`
- `Website Blocks / Product Detail / Info Card`
- `Website Blocks / Product Detail / Program Overview`
- `Website Blocks / Content / FAQ`
- `Website Blocks / Content / Reviews Carousel`
- `Website Blocks / Content / Logo Marquee`
- `Website Blocks / Content / Category Cards`

### Admin

- `Admin / Layout / Sidebar Shell`
- `Admin / Layout / Header Actions Portal`
- `Admin / CRUD / ListView`
- `Admin / CRUD / DataTable`
- `Admin / CRUD / Action Column`
- `Admin / Forms / CreateView`
- `Admin / Forms / Sticky Page Tabs`
- `Admin / Forms / Complex Tabbed Form`
- `Admin / Forms / Repeater Field`
- `Admin / Forms / SEO Tab`
- `Admin / Forms / File Upload Field`
- `Admin / Navigation / Combobox`
- `Admin / Date / Calendar Wrapper`

### Forms

- `Forms / Lead Form`
- `Forms / File Upload / Image Preview`
- `Forms / File Upload / File Preview`
- `Forms / Relation Picker`
- `Forms / SEO Fields`
- `Forms / Agreement Checkbox`
- `Forms / Submit States`

## Playground previews

- `website-blocks-preview`: header, banner, newsletter popup, catalog, cards, FAQ, reviews, logo marquee.
- `admin-crud-preview`: ListView/DataTable/CreateView/PageTabs/action column.
- `forms-preview`: LeadForm, FileUploadField, Combobox, SEO tab, repeater field.
- `navigation-preview`: sidebar, desktop nav, mobile nav.

## Figma

Слепки нужны только для переносимых решений.

Приоритет слепков:

1. `CoursesCatalog` как catalog/filter pattern.
2. `CourseDetailHero` + `CourseDetailInfoCard` как product-detail pattern.
3. `NewsletterPopup` mobile/desktop states.
4. `ContactForm` dark/light variants.
5. `Reviews` carousel card + dialog.
6. `Admin ListView/DataTable` baseline.
7. `FileUploadField` image/file states.
8. `Admin sidebar` после сравнения с Gigonom 2026 sidebar.

## Mock-данные для Storybook

- catalog item: title, code, price, hours, image, category, tag, popularity;
- catalog filters: groups, tags, sort options, search query, page;
- product detail: title, subtitle, price, image, info cards, program modules, documents;
- review: company, logo, person, position, text;
- FAQ item: question, answer, open state;
- lead form: fields, agreement, pending, success, error;
- file upload: empty, fetching, uploading, image uploaded, file uploaded, error;
- admin row: id, title, status, meta, actions;
- form tabs: clean, invalid tab, submitting, server error.

## Порядок сравнения

1. Сравнить primitives Security Sphere admin с текущим `packages/ui-react`: Button, Badge, Input, Dialog, Popover, Tabs, Sidebar, Calendar, Combobox.
2. Сравнить `ListView/DataTable/CreateView/PageTabs` с Gigonom 2026 CRUD views.
3. Для CRUD оставить Security Sphere как baseline table/list, а главным источником complex views считать Gigonom 2026.
4. Сравнить Security Sphere Lexical editor с Gigonom 2026 WYSIWYG и REVERIE editor flows.
5. Для editor сначала выделить технические plugins/nodes, потом отдельно проектировать UX-панели.
6. Сравнить site blocks Security Sphere с Giganom 2026 website blocks перед переносом в `Website Blocks`.
7. Переносить сначала маленькие независимые компоненты: Combobox, FileUploadField, PageTabs, info cards.
8. Затем переносить compositions: ListView/DataTable, lead form, newsletter popup, catalog filters.
9. Только после Figma-слепков переносить визуально насыщенные website blocks.

## Критерии готовности INV-15

- Найден список UI-компонентов сайта и админки.
- Отмечено, какие решения уже лучше представлены в Gigonom 2026.
- Указаны кандидаты на перенос.
- Указаны кандидаты только на референс.
- Предложены Storybook, Playground, Figma и порядок сравнения.
