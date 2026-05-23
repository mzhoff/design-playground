# Website Blocks Motion Raw Kit

## Происхождение

Сырой набор собран по итогам `INV-11` из REVERIE `apps/site-web`:

- `apps/site-web/src/page-slices/landing/ui/landing-page.tsx`;
- `apps/site-web/src/widgets/landing/ui/HeroSection.tsx`;
- `apps/site-web/src/widgets/landing/ui/BenefitsSection.tsx`;
- `apps/site-web/src/widgets/landing/ui/FeaturesAccordion.tsx`;
- `apps/site-web/src/widgets/landing/ui/ToolsSection.tsx`;
- `apps/site-web/src/widgets/landing/ui/CTASection.tsx`.

## Что перенесено

- Hero browser mockup section.
- Image/benefit feature card grid.
- Sticky scroll-driven feature showcase с accordion rail и screen frame.
- Tool/case carousel с tabs и autoplay.
- Gradient CTA block.

## Текущие ограничения

- `motion/react`, REVERIE assets, i18n keys и Next router не перенесены.
- Scroll-driven showcase пока работает через локальный active state и sticky layout, без `useScroll/useTransform`.
- Реальный parallax/scroll detection нужно вернуть после Figma-слепка и выбора motion preset API.
- Assets заменены neutral mockup blocks.
- Carousel pause-on-hover, direction-aware transitions и reduced motion policy пока не реализованы.

## Следующий шаг

После Figma-слепка разделить набор на:

- `HeroBrowserMockupSection`;
- `ImageFeatureCardGrid`;
- `ScrollDrivenFeatureShowcase`;
- `ToolCaseCarousel`;
- `GradientCtaBlock`;
- shared motion primitives: `RevealOnView`, `StickyScrollRail`, `MotionCarousel`.
