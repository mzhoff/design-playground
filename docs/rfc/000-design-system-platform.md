# RFC 000: Design Playground as internal design-system platform

## Status

Accepted for implementation.

## Purpose

Design Playground is an internal platform for building, configuring, documenting, and validating the Gigonom design system.

The product must solve four practical tasks:

1. Collect proven UI work from existing projects into one controlled monorepo.
2. Standardize the collected components without losing useful visual individuality.
3. Let the team configure visual style through tokens and presets before starting a client project.
4. Export a stable React/Next.js component package and token contract back into real projects.

The first target is internal use. External product packaging is out of scope until the design system proves that it saves time and reduces delivery risk inside Gigonom projects.

## Product principles

The system separates structure from style.

Structure is strict:

- component responsibilities;
- interaction patterns;
- accessibility rules;
- props contracts;
- data integration boundaries;
- Storybook hierarchy;
- documentation format.

Style is configurable:

- color palettes;
- semantic color mapping;
- typography scales;
- font families;
- spacing rhythm;
- radii;
- borders;
- icon sets;
- illustration and image sets;
- animation presets.

This lets us reuse the same product UX patterns across SaaS products while giving every client project a distinct visual skin.

## Technical baseline

The primary runtime target is Next.js.

The repository must follow the same strategic direction as the reference project:

- reference consumer: `/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`;
- first internal consumer: `/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`;
- package manager: `pnpm`;
- monorepo orchestration: `turbo`;
- frontend baseline: `Next.js`, `React`, TypeScript;
- UI base: Radix UI and shadcn/ui-compatible semantics where useful;
- package output: reusable React/Next-compatible packages first;
- future output: React, Vue, Angular adapters only after internal stabilization.

Nest.js API integration is not part of this repository, but components must not be tightly coupled to a specific backend implementation.

## Repository role

This repository is not just a component package.

It contains:

- `apps/playground`: visual configurator for tokens, themes, presets, and client-ready style exports;
- `apps/docs`: human-facing documentation for the team and future clients;
- `apps/storybook`: technical component documentation, interactive states, props, QA, and visual tests;
- `packages/tokens`: design-token source contract;
- `packages/theme-compiler`: token compilation and export pipeline;
- `packages/ui-react`: standardized React components;
- `packages/patterns`: higher-level product patterns and vertical kits;
- `packages/icons`: icon registry and adapters;
- `packages/assets`: shared visual assets;
- `packages/typescript-config`: shared TypeScript configuration.

## Documentation strategy

Documentation is split into three layers.

Product documentation:

Explains why a component or pattern exists, when to use it, and what UX rules apply. The reference style is Rostelecom design documentation:

- `https://design.rt.ru/preview`;
- `https://design.rt.ru/gen2/components/btn/guide`.

Technical documentation:

Shows imports, props, variants, states, examples, constraints, and engineering notes. The reference style is Rostelecom Storybook:

- `https://design.rt.ru/gen2/vue-storybook/?path=/docs/components-buttons-button--docs`.

Process documentation:

Explains how the team moves from raw project code to standardized design-system components.

For the first implementation, documentation may use a ready documentation framework such as Nextra. A custom documentation engine is not required until we prove that a ready framework blocks the product.

## Figma strategy

Figma is the design authority after inventory.

The flow is:

1. Move raw working components into this repository.
2. Render and inspect them in Playground and Storybook.
3. Create or update Figma snapshots.
4. Designer edits and standardizes in Figma.
5. Implement final components pixel-perfect from approved Figma nodes.
6. Bind final components to token contracts.

Current design-system source file:

- `https://www.figma.com/design/bGfbfe3HaUmCfos86ULlFY/Gigonom-UI?node-id=429-38730&t=UyydRjwyXfB4c7Sy-1`

Known important node:

- `429:38730`: chat assistant area and related assistant components.

## Token strategy

Tokens are split into layers.

Foundation tokens:

- base color scales;
- typography primitives;
- spacing;
- radii;
- border widths;
- shadows;
- motion timings and easing;
- icon sizing.

Semantic tokens:

- background;
- foreground;
- surface;
- card;
- border;
- muted;
- primary;
- secondary;
- accent;
- destructive;
- warning;
- success;
- chart colors;
- focus rings;
- text hierarchy.

Component tokens:

- button;
- input;
- checkbox;
- dialog;
- sidebar;
- chat;
- canvas;
- charts;
- cards;
- content blocks.

The Playground must eventually allow controlled editing of allowed style attributes and export the result as a project preset.

## Inventory sources

Code inventory starts from existing project work, not from abstract component design.

Initial sources:

- charts: `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/REVERIE app/Repos`;
- canvas and layout: `/Users/m.pyzhov/WORKSPACEs/Development/PRODaction/prodSQL/Repos`;
- admin, sidebar, editors, text fields, site patterns: `/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/SecurityShere/Repos/security-sphere`;
- first consumer and website pattern validation: `/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`.

## Migration strategy

We do not rewrite useful components line by line during inventory.

Inventory rule:

- copy raw code when safe;
- preserve behavior first;
- remove project-specific dependencies second;
- standardize tokens third;
- redesign in Figma fourth;
- implement final form fifth.

This reduces migration errors and lets the team compare real existing solutions before forcing a shared abstraction.

## First internal consumer

The first real consumer is Gigonom 2026.

Purpose:

- test the package in a real website;
- validate token export;
- validate documentation usefulness;
- validate whether the system reduces implementation time;
- discover missing primitives before using the system in client projects.

## Non-goals for the first phase

The first phase does not include:

- external SaaS product packaging;
- Vue and Angular adapters;
- marketplace-ready documentation;
- fully automated client onboarding;
- complete token synchronization with every consumer repository;
- final visual language.

These become relevant only after internal usage proves the system.

## Accepted decisions

The previous Vite-based spike is discarded as implementation foundation.

The repository is rebuilt as a clean pnpm/turbo monorepo with Next.js as the primary target.

Storybook is required, but it is a technical QA and documentation surface, not the only product interface.

Playground is the product interface for configuring styles and showing clients how a theme behaves across real components.

Docs are allowed to start on a ready framework to avoid wasting time on a custom documentation engine too early.

Figma remains central to design finalization. Code inventory feeds Figma; approved Figma feeds final implementation.

