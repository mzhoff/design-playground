# INV-11: REVERIE — сайт, карточки и motion-паттерны

## Статус

Готово к ревью.

## Источник

- `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

## Цель

Найти сильные website blocks, карточки и motion-паттерны в сайте REVERIE, включая scroll/parallax-like блок с раскрывающейся левой панелью и экранными mockup-панелями справа.

## Короткое решение

Основной источник для сайта и motion-паттернов — `apps/site-web`.

Entry point сайта:

- `apps/site-web/src/app/page.tsx`
- `apps/site-web/src/page-slices/landing/ui/landing-page.tsx`
- `apps/site-web/src/widgets/landing/index.ts`

Ключевой scroll/parallax-like блок найден в `FeaturesAccordion`. В коде нет literal `parallax`, но поведение реализовано через sticky layout, scroll detection, `useScroll`, `useTransform`, раскрытие активного accordion item и движение/проявление screen frame справа. Это тот блок, который нужно брать как главный референс для сложных scroll-based website sections.

## Найденные website blocks

| Блок | Путь | Что ценно | Motion / interaction |
| --- | --- | --- | --- |
| Landing page composition | `apps/site-web/src/page-slices/landing/ui/landing-page.tsx` | Порядок секций сайта и общая композиция landing page | Композиционный shell без собственной анимации |
| Hero section | `apps/site-web/src/widgets/landing/ui/HeroSection.tsx` | Hero с badge, заголовком, CTA и browser mockup | Initial reveal stagger, scale-in screenshot, hover arrow shift, CTA router action |
| Logo marquee | `apps/site-web/src/widgets/landing/ui/LogoMarquee.tsx` | Бесконечная строка платформ с fade edges | Infinite horizontal motion `0% -> -50%`, 40s linear repeat |
| Benefits cards | `apps/site-web/src/widgets/landing/ui/BenefitsSection.tsx` | Сетка карточек с image area, icon overlay и текстом | While-in-view reveal, stagger delay, hover shadow, image opacity/scale |
| Features accordion | `apps/site-web/src/widgets/landing/ui/FeaturesAccordion.tsx` | Главный scroll-driven блок: sticky accordion + screen mockups | Scroll listener, sticky left panel, `useScroll`, `useTransform`, click-to-scroll, `AnimatePresence` раскрытия |
| Dark showcase | `apps/site-web/src/widgets/landing/ui/DarkShowcase.tsx` | Темный showcase с двумя карточками и широким промо-блоком | While-in-view reveal, card hover border, image opacity/scale |
| Analytics showcase | `apps/site-web/src/widgets/landing/ui/ShowcaseSection.tsx` | Метрики + две screenshot-карточки | Metrics reveal, left/right slide-in cards, hover shadow |
| Tools carousel | `apps/site-web/src/widgets/landing/ui/ToolsSection.tsx` | Крупная карточная карусель с tabs, quote, author и screenshot | Active card state, autoplay 5s, pause on hover, tab switching, prev/next, active/inactive card sizing |
| Testimonials carousel | `apps/site-web/src/widgets/landing/ui/TestimonialsSection.tsx` | Отзыв + screenshot + avatar + rating | Auto-advance 6s, prev/next, dots, direction-aware `AnimatePresence` transitions |
| Steps section | `apps/site-web/src/widgets/landing/ui/StepsSection.tsx` | Sticky image stack + vertical steps timeline + checklist | Sticky left media, while-in-view reveal, staggered steps |
| Integrations grid | `apps/site-web/src/widgets/landing/ui/IntegrationsSection.tsx` | Сетка интеграций с категориями и иконками | Scale reveal per item, hover border/shadow/icon color |
| CTA section | `apps/site-web/src/widgets/landing/ui/CTASection.tsx` | Большая gradient CTA-card с декоративными blur blobs | While-in-view reveal, hover arrow shift, router action |

## Главный parallax / scroll-driven блок

### Компонент

- `apps/site-web/src/widgets/landing/ui/FeaturesAccordion.tsx`

### Связанные screen mockups

- `apps/site-web/src/features/features-showcase/model/features-data.ts`
- `apps/site-web/src/features/features-showcase/ui/ScreenContext.tsx`
- `apps/site-web/src/features/features-showcase/ui/ScreenChannels.tsx`
- `apps/site-web/src/features/features-showcase/ui/ScreenStrategy.tsx`
- `apps/site-web/src/features/features-showcase/ui/ScreenPlan.tsx`
- `apps/site-web/src/features/features-showcase/ui/ScreenProduction.tsx`
- `apps/site-web/src/features/features-showcase/ui/ScreenAnalytics.tsx`

### Как работает desktop-режим

- Секция состоит из двух колонок.
- Левая колонка — sticky accordion с фиксированным `top: 60px`.
- Правая колонка — вертикальный стек screen frames, каждый высотой `85vh`.
- При scroll обработчик ищет screen frame, ближайший к detection line около верхней части viewport.
- Найденный индекс становится `active`.
- Активный пункт accordion раскрывает описание через `AnimatePresence` и height animation.
- Клик по пункту accordion делает smooth scroll к соответствующему screen frame.
- На время programmatic scroll включается `isScrollingRef`, чтобы scroll listener не конфликтовал с click-to-scroll.
- Screen frame обернут в `ScrollDrivenScreen`, где `useScroll` отслеживает прогресс появления элемента.
- `useTransform` меняет `opacity` от `0.1` до `1` и `x` от `50` до `0`.

### Mobile-режим

- При ширине ниже desktop breakpoint используется линейный stacked layout.
- Accordion перестает быть sticky.
- Каждый feature block идет как текст + screen mockup.
- Reveal остается через `whileInView`.

### Почему это важно для дизайн-системы

Этот блок нужно вынести не как компонент REVERIE, а как универсальный pattern `ScrollDrivenFeatureShowcase`. В нем должны быть стандартные зоны:

- sticky navigation / accordion rail;
- content panels / screen frames;
- scroll-driven active state;
- click-to-scroll navigation;
- mobile stacked fallback;
- configurable reveal motion;
- slots для mockup-компонентов или изображений.

## Сильные карточные паттерны

### `BenefitsSection`

- Сетка `1 / 2 / 3` колонки.
- Карточка: белый wrapper, скругление `24px`, image area, gradient background, overlay icon, title, description.
- Hover: shadow усиливается, изображение становится контрастнее и слегка scale.
- Универсализировать как `ImageFeatureCardGrid`.

### `DarkShowcase`

- Темная секция с двумя равными feature cards и одним full-width showcase block.
- Карточка: dark translucent background, border, image top, label, title, description.
- Hover: border светлеет, image opacity/scale.
- Универсализировать как `DarkFeatureShowcase`.

### `ShowcaseSection`

- Метрики над screenshot cards.
- Две карточки появляются с противоположных направлений по `x`.
- Универсализировать как `MetricScreenshotShowcase`.

### `ToolsSection`

- Наиболее сложный карточный website pattern после `FeaturesAccordion`.
- Карточка состоит из двух половин: quote/author слева и screenshot/texture справа.
- Есть tabs, active index, autoplay interval 5s, pause on hover, prev/next controls.
- Desktop меняет размер активной и неактивных карточек.
- Mobile рендерит компактную square-card версию.
- Универсализировать как `TabbedCaseCarousel` или `ToolCaseCarousel`.

### `TestimonialsSection`

- Синхронизированная смена screenshot и quote.
- Есть direction state для forward/back animation.
- Есть auto-advance 6s, prev/next, dot navigation.
- Универсализировать как `TestimonialScreenshotCarousel`.

### `IntegrationsSection`

- Простая сетка integration cards.
- Hover меняет фон иконки, цвет иконки, border и shadow.
- Универсализировать как `IntegrationGrid`.

### `CTASection`

- Gradient card с крупным текстом, CTA и декоративными blur blobs.
- Router-зависимость нужно заменить на `onAction` / `href`.
- Универсализировать как `GradientCtaBlock`.

## События и триггеры анимаций

| Trigger | Где используется | Что делает |
| --- | --- | --- |
| Initial mount | `HeroSection` | Последовательное появление badge, title, subtitle, CTA, browser mockup |
| While in view | Почти все landing sections | Reveal по `opacity/y`, иногда stagger по индексу |
| Hover | Benefits, DarkShowcase, Integrations, CTA, Hero button | Shadow, border, icon color, image opacity/scale, arrow translate |
| Infinite animation | `LogoMarquee` | Непрерывный горизонтальный marquee |
| Timer autoplay | `ToolsSection`, `TestimonialsSection` | Автопереключение активной карточки или отзыва |
| Hover pause | `ToolsSection` | Остановка autoplay при наведении |
| Click navigation | `FeaturesAccordion`, `ToolsSection`, `TestimonialsSection` | Переключение active item или smooth scroll |
| Scroll position | `FeaturesAccordion` | Вычисление active feature по близости screen frame к viewport top |
| Scroll transform | `FeaturesAccordion` | Opacity и x-offset screen frame при появлении |
| Sticky positioning | `FeaturesAccordion`, `StepsSection` | Фиксация левой панели или media stack во время прокрутки |

## Зависимости

### Runtime / UI

- `motion/react` для motion components, `AnimatePresence`, `useScroll`, `useTransform`.
- `react-i18next` и `@/src/shared/config/i18n` для текстов.
- `lucide-react` для иконок.
- `next/navigation` для CTA-навигации.
- Tailwind classes и inline styles.
- Static PNG assets из `apps/site-web/src/assets`.
- Figma SVG path import в `FeaturesAccordion`: `apps/site-web/src/imports/svg-d7cowlvhzz`.

### Что нельзя тащить напрямую в дизайн-систему

- `useRouter` и конкретные переходы `/register`.
- Жесткие i18n keys `landing.*` как обязательный контракт компонента.
- REVERIE-specific тексты, имена, роли, screenshots и platform list.
- Абсолютные asset imports из `apps/site-web/src/assets`.
- Hardcoded product semantics: контент-маркетинг, конкретные каналы, конкретные авторы отзывов.

## Целевая зона

### `packages/patterns/website-blocks`

- `LandingPageComposition`
- `HeroBrowserMockupSection`
- `LogoMarquee`
- `ImageFeatureCardGrid`
- `ScrollDrivenFeatureShowcase`
- `DarkFeatureShowcase`
- `MetricScreenshotShowcase`
- `TabbedCaseCarousel`
- `TestimonialScreenshotCarousel`
- `StepsTimelineSection`
- `IntegrationGrid`
- `GradientCtaBlock`

### Возможные shared motion primitives

- `RevealOnView`
- `StaggeredReveal`
- `HoverLiftCard`
- `InfiniteMarquee`
- `ScrollProgressPanel`
- `StickyScrollRail`
- `MotionCarousel`

## Storybook

Раздел: `Website Blocks / Motion`.

Сценарии:

- `Hero / Browser Mockup`
- `Motion / Reveal On View`
- `Motion / Logo Marquee`
- `Cards / Benefits Grid`
- `Showcase / Scroll Driven Feature Accordion`
- `Showcase / Dark Feature Cards`
- `Showcase / Metric Screenshots`
- `Carousel / Tool Cases`
- `Carousel / Testimonials`
- `Timeline / Steps With Sticky Media`
- `Grid / Integrations`
- `CTA / Gradient Card`

## Playground

Раздел: `website-blocks-preview`.

Минимальные controls:

- section theme: light / dark / gradient;
- motion preset: calm / expressive / no-motion;
- card radius;
- card density;
- media aspect ratio;
- autoplay on/off;
- autoplay interval;
- sticky top offset;
- mobile breakpoint;
- content preset.

## Mock-данные

Нужно подготовить нейтральный dataset без REVERIE-specific контента:

- feature list с `id`, `title`, `description`, `media`;
- benefits list с `icon`, `title`, `description`, `image`, `tone`;
- tool/case list с `tab`, `quote`, `author`, `role`, `avatar`, `background`, `screenshot`;
- testimonial list с `quote`, `author`, `role`, `avatar`, `screenshot`, `rating`;
- integration list с `name`, `category`, `icon`;
- steps list с `number`, `title`, `description`;
- metrics list с `value`, `label`;
- CTA content with `title`, `description`, `actionLabel`, `href`.

## Figma

Нужен обязательный слепок перед финальной реализацией.

Первый слепок:

- `HeroSection`;
- `BenefitsSection`;
- `FeaturesAccordion` desktop и mobile;
- `DarkShowcase`;
- `ToolsSection` desktop и mobile;
- `TestimonialsSection`;
- `CTASection`.

После слепка дизайнер уточняет визуальные варианты и motion-направление, затем переносим в `packages/patterns` уже с дизайн-токенами.

## План универсализации

1. Сначала переносить `FeaturesAccordion` как самый ценный сложный motion pattern.
2. Вынести `ScrollDrivenFeatureShowcase` без REVERIE i18n и assets: данные и screen slots должны приходить через props.
3. Отделить motion contract от визуального слоя: `motionPreset`, `reducedMotion`, `stickyTop`, `scrollOffset`, `revealDistance`.
4. Затем переносить карточные паттерны: `BenefitsSection`, `DarkShowcase`, `ShowcaseSection`.
5. Потом переносить интерактивные carousel patterns: `ToolsSection`, `TestimonialsSection`.
6. В конце переносить простые marketing blocks: `LogoMarquee`, `StepsSection`, `IntegrationsSection`, `CTASection`.
7. После сырого переноса сделать Figma snapshot и доводить визуал уже от дизайн-макета.

## Риски

- Много hardcoded Tailwind values, colors, radii и shadows.
- Сильная завязка на статичные PNG screenshots из REVERIE.
- Motion сейчас зашит внутри компонентов, а не описан единым контрактом.
- i18n и product copy смешаны с UI.
- `FeaturesAccordion` содержит ручной scroll listener, smooth scroll и sticky layout; нужно аккуратно протестировать accessibility и reduced motion.
- Автокарусели требуют pause/focus behavior, иначе будут мешать пользователю.

## Критерии готовности INV-11

- Перечислены сильные website blocks.
- Найден scroll/parallax-like блок: `FeaturesAccordion`.
- Описаны события и триггеры анимаций.
- Указаны зависимости от layout, content, i18n, assets и router.
- Предложены варианты универсализации.
- Зафиксированы Storybook-сценарии.
- Зафиксирован Playground preview.
- Зафиксирована необходимость Figma-слепка.
