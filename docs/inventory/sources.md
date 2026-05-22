# Inventory sources

This file records where existing UI work lives and what we expect to extract.

## Inventory rule

Do not redesign during the first copy pass.

The first pass is for collecting working material. Standardization happens after comparison, Figma review, and token planning.

Each imported item should eventually record:

- source project;
- source path;
- target package;
- target Storybook group;
- dependencies;
- project-specific coupling;
- extraction risk;
- design status;
- implementation status.

## Source: REVERIE app

Path:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`

Expected inventory:

- chart components;
- chart cards;
- chart legends;
- chart tooltips;
- data visualization wrappers;
- analytical dashboard patterns.

Target package candidates:

- `packages/patterns`;
- `packages/ui-react`;
- `packages/tokens` for chart color semantics.

Target Storybook groups:

- `Charts`;
- `Dashboards`;
- `Data Display`.

Known risks:

- data formatting may be coupled to product-specific models;
- chart libraries may impose bundle and theme constraints;
- chart colors must be mapped to semantic chart tokens.

## Source: prodSQL

Path:

`/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`

Expected inventory:

- canvas components;
- layout panels;
- canvas cards;
- floating menus;
- context menus;
- node or block controls;
- modal windows;
- side panels;
- toolbar patterns.

Target package candidates:

- `packages/patterns`;
- `packages/ui-react`;
- `packages/icons`.

Target Storybook groups:

- `Canvas`;
- `Navigation`;
- `Overlays`;
- `Toolbars`.

Known risks:

- canvas logic may be tightly coupled to product state;
- drag and selection behavior must be separated from visual shell;
- keyboard interactions need accessibility review.

## Source: Security Sphere

Path:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`

Expected inventory:

- admin side navigation;
- menu patterns;
- WYSIWYG editors;
- text fields and content editing flows;
- field blocks;
- website cards;
- website sections;
- animated content blocks.

Target package candidates:

- `packages/ui-react`;
- `packages/patterns`;
- `packages/tokens`;
- `apps/docs` as reference documentation structure;
- `apps/playground` as reference Next.js runtime structure.

Target Storybook groups:

- `Admin`;
- `Navigation`;
- `Forms`;
- `Editors`;
- `Text`;
- `Website Blocks`;
- `Motion`.

Known risks:

- this is a reference architecture, so copying structure is useful;
- product-specific naming must be removed;
- some components may be visually good but too coupled to current content.

## Source: Gigonom 2026

Path:

`/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Expected inventory:

- first consumer integration points;
- website typography reference;
- content blocks;
- motion patterns;
- final validation environment.

Target package candidates:

- consumer app, not primary source package;
- `packages/patterns` only when a block should become reusable.

Target Storybook groups:

- `Website Blocks`;
- `Typography`;
- `Motion`.

Known risks:

- as first consumer, it may reveal missing APIs;
- avoid overfitting the design system to one website.

## Source: Figma Gigonom UI

URL:

`https://www.figma.com/design/bGfbfe3HaUmCfos86ULlFY/Gigonom-UI?node-id=429-38730&t=UyydRjwyXfB4c7Sy-1`

Known structure:

- page: `Assets`;
- large icon library area: `Lucide`;
- important node: `429:38730`, chat assistant section.

Expected inventory:

- chat assistant components;
- assistant onboarding;
- answer variants;
- context questions;
- assistant settings panels;
- icon assets;
- design decisions already present in frames.

Target package candidates:

- `packages/patterns`;
- `packages/ui-react`;
- `packages/icons`.

Target Storybook groups:

- `Chat Assistant`;
- `Forms`;
- `Navigation`;
- `Icons`.

Known risks:

- Figma file is large;
- inventory should inspect focused nodes rather than pulling everything at once;
- final implementation must use approved Figma nodes, not inferred screenshots.

