# Implementation stages and readiness criteria

This file is the working roadmap. Each stage is intentionally small enough to be assigned as a separate task without losing context.

## Stage 0: Clean foundation

Goal:

Create a clean repository foundation and record the project contract.

Scope:

- remove the old Vite spike from the repository foundation;
- create pnpm/turbo monorepo structure;
- create placeholder apps and packages;
- document architecture, stages, inventory sources, and token flow;
- connect the repository to `mzhoff/design-playground.git`;
- make the first clean commit.

Done when:

- root package is named `design-playground`;
- workspace structure is clear;
- old spike files are removed;
- documentation explains the project goal and process;
- the first commit exists in git.

Out of scope:

- working Playground UI;
- working Storybook;
- copied components from source projects;
- final tokens;
- visual tests.

## Stage 1: Runtime scaffold

Goal:

Make the monorepo runnable without adding real design-system logic yet.

Scope:

- initialize `apps/playground` as a minimal Next.js app;
- initialize `apps/docs` as a minimal documentation app, likely Nextra unless a blocker appears;
- initialize `apps/storybook` as a Storybook app for React components;
- make shared TypeScript config usable by all apps and packages;
- add minimal CI-like scripts for linting, typechecking, and building the scaffold.

Done when:

- `pnpm install` completes;
- `pnpm dev` can start the main development surface;
- `pnpm --filter @gigonom/playground dev` starts the Playground shell;
- `pnpm --filter @gigonom/docs dev` starts documentation;
- `pnpm --filter @gigonom/storybook storybook` starts Storybook;
- empty package imports work from at least one app.

Recommended task size:

One task for package setup and app shells. No inventory in this stage.

## Stage 2: Inventory map

Goal:

Create a clear map of what to extract from each existing project before copying code.

Scope:

- inspect source projects;
- list candidate vertical kits and components;
- mark dependencies and project-specific coupling;
- assign each item to a target package and Storybook hierarchy;
- decide copy order.

Source projects:

- `REVERIE app`: charts;
- `prodSQL`: canvas and layout;
- `security-sphere`: admin navigation, editors, text work, site components;
- `gigonom-2026`: first consumer and validation target.

Done when:

- `docs/inventory/*.md` contains a structured list of candidates;
- every candidate has source path, target package, expected risk, and extraction priority;
- no source code has been copied blindly without an inventory note.

Recommended task size:

One source project per task, or one vertical domain per task if the source is large.

## Stage 3: Raw vertical kit import

Goal:

Bring working vertical slices into the monorepo with minimal behavior changes.

Scope:

- copy selected raw components;
- isolate them from project-specific routing, data fetching, and environment assumptions;
- keep behavior close to source;
- add simple Storybook stories for visual inspection;
- mark known technical debt directly in inventory docs.

Initial vertical kits:

- chat assistant;
- canvas toolkit;
- chart components;
- admin sidebar and navigation;
- rich text and editor blocks;
- website content blocks and animations.

Done when:

- copied components render in Storybook or Playground;
- project-specific dependencies are either removed or explicitly documented;
- each imported kit has a short README explaining origin and current limitations;
- no final abstraction is forced before visual comparison.

Recommended task size:

One vertical kit per task.

## Stage 4: Figma snapshot and design review

Goal:

Turn raw working components into design-review material.

Scope:

- render imported kits in stable states;
- create Figma snapshots or equivalent frames;
- compare duplicates and overlapping components;
- let the designer standardize and approve final structure;
- record approved node links.

Done when:

- every reviewed component has an approved Figma reference;
- rejected or merged components are documented;
- final variants and states are listed;
- implementation can be done from Figma without guessing.

Recommended task size:

One vertical kit or one component family per task.

## Stage 5: Foundations and token contract

Goal:

Define the stable design-token layers used by final components.

Scope:

- foundation color scales;
- semantic color mappings;
- typography scales and font configuration;
- spacing rhythm;
- radii;
- borders;
- shadows;
- motion presets;
- component token naming.

Done when:

- token names are stable enough for consumers;
- token output can generate CSS variables;
- at least one theme preset works in Playground and Storybook;
- token decisions are documented in Russian for the team.

Recommended task size:

One token layer per task.

## Stage 6: Standardized component implementation

Goal:

Rebuild approved components against the stable token contract.

Scope:

- implement primitives and components from approved Figma;
- use Radix UI where it gives accessible structure;
- keep shadcn/ui-compatible semantics when useful;
- avoid hidden project-specific assumptions;
- expose stable props contracts;
- document UX rules and technical usage.

Done when:

- component has final React implementation;
- component has Storybook stories for variants and states;
- component has docs page;
- component uses semantic tokens, not hardcoded project colors;
- component can be consumed by a Next.js app.

Recommended task size:

One component family per task.

## Stage 7: Playground configurator

Goal:

Make the Playground useful for configuring and previewing project styles.

Scope:

- token editor UI;
- theme preset management;
- live preview across primitives and vertical kits;
- export to CSS variables and package-consumable config;
- import existing preset;
- client-friendly preview mode.

Done when:

- a user can change allowed visual settings without editing code;
- changes affect real components;
- exported preset can be applied back to the Playground;
- preset format is documented;
- invalid token values are blocked or clearly reported.

Recommended task size:

One editor area per task: colors, typography, spacing, motion, export.

## Stage 8: Consumer integration

Goal:

Prove the system in a real product.

First consumer:

- `/Users/m.pyzhov/WORKSPACEs/Development/GIGONOM/Projects/Сайт Gigonom/Repos/gigonom-2026`

Scope:

- connect local package consumption;
- apply generated tokens;
- replace selected website blocks or primitives;
- document integration gaps;
- measure whether reuse is actually faster than project-local implementation.

Done when:

- Gigonom 2026 consumes at least one package from the design system;
- tokens are applied without manual duplication;
- integration instructions are documented;
- missing capabilities are tracked as backlog.

Recommended task size:

One page or one block family per task.

## Stage 9: Quality gates

Goal:

Turn the repository into a reliable internal product.

Scope:

- Storybook interaction tests;
- visual regression tests with Playwright;
- accessibility checks;
- package build checks;
- consumer integration checks;
- release notes discipline.

Done when:

- visual changes are visible before merge;
- component behavior has smoke coverage;
- package build catches broken exports;
- team can safely update consumers.

Recommended task size:

One quality gate per task.

## Stage 10: Internal product hardening

Goal:

Make the platform stable enough for repeated internal project use.

Scope:

- versioning strategy;
- migration notes;
- project bootstrap guide;
- preset library;
- contribution rules;
- design review checklist;
- package publishing or internal distribution.

Done when:

- a new internal project can start from documented steps;
- manager/designer can create a theme preset;
- developer can install and use packages without reverse engineering;
- team has a repeatable update process.

Recommended task size:

One operational workflow per task.

## Later: External product evaluation

Goal:

Decide whether the system can become a sellable product.

This starts only after internal usage proves value.

Possible scope:

- public documentation packaging;
- client-facing preset marketplace;
- framework adapters for React, Vue, and Angular;
- paid onboarding flow;
- external support model.

Done when:

- internal ROI is proven;
- support burden is understood;
- framework expansion cost is estimated;
- product positioning is clear.

