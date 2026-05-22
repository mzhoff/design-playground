# Figma and token workflow

## Purpose

The system must keep design and implementation connected through an explicit token contract.

The desired end state:

- manager or designer configures a project style in Playground;
- the style is exported as tokens and presets;
- tokens can be synchronized with Figma;
- developers consume the same token contract in code;
- client projects do not manually duplicate style decisions.

## Current phase

At the beginning, we do not need perfect automation.

The first goal is to make the contract explicit:

- which tokens exist;
- which tokens are editable;
- which tokens are semantic and stable;
- which tokens are component-specific;
- how a preset is exported;
- how a consumer project applies the preset.

## Design authority flow

Raw code is not the final design authority.

The authority flow is:

1. Existing projects provide raw working components.
2. Playground and Storybook expose them in one place.
3. Figma receives snapshots or reconstructed frames.
4. Designer standardizes and approves variants.
5. Code implements approved Figma with stable tokens.
6. Tokens are exported back to consuming projects.

## Token Studio direction

Token Studio or an equivalent token workflow may be used to synchronize Figma and repository tokens.

Expected future flow:

1. Create or edit theme preset in Playground.
2. Export token JSON.
3. Sync token JSON to Figma through Token Studio or a compatible workflow.
4. Apply tokens to approved Figma components.
5. Commit the same token source into the repository.
6. Compile CSS variables and package outputs for the consumer project.

This workflow must be proven with one internal consumer before becoming mandatory for all projects.

## Editable token categories

Allowed for Playground editing:

- base color scales;
- semantic color mappings;
- typography family;
- typography scale;
- line heights;
- letter spacing;
- spacing rhythm;
- radii;
- border widths;
- shadows;
- motion preset;
- icon set;
- image and illustration set references.

Restricted or controlled:

- component structural layout;
- accessibility states;
- focus behavior;
- keyboard interaction;
- required contrast rules;
- required component anatomy;
- data integration contracts.

## Color model

The color model has two levels.

Base palette:

- neutral;
- brand;
- accent;
- success;
- warning;
- destructive;
- chart palettes;
- custom generated scales.

Semantic layer:

- background;
- foreground;
- surface;
- card;
- muted;
- primary;
- secondary;
- accent;
- destructive;
- warning;
- success;
- border;
- input;
- ring;
- chart series.

The Playground should eventually support richer scale generation than fixed shadcn/ui presets, including controlled curve-based generation for neutral and brand scales.

## Typography model

Typography is project-specific but contract-driven.

Editable:

- font family;
- base font size;
- type scale;
- heading scale;
- line-height ratios;
- paragraph spacing;
- letter spacing;
- font weights;
- mono font where needed.

Stable:

- semantic text roles;
- heading hierarchy;
- label and helper text roles;
- error text roles;
- code text roles.

## Motion model

Motion should use presets instead of arbitrary per-component animation.

Example preset groups:

- minimal;
- precise;
- expressive;
- editorial;
- dense SaaS.

Each preset should define:

- duration scale;
- easing;
- entrance behavior;
- exit behavior;
- hover behavior;
- reduced-motion fallback.

## Preset export

A project preset should eventually export:

- token JSON;
- CSS variables;
- TypeScript theme object;
- optional Tailwind-compatible mapping;
- metadata such as preset name, version, author, and date.

## Readiness criteria for the first token milestone

The first token milestone is ready when:

- one theme preset exists as token JSON;
- token compiler can produce CSS variables;
- Playground can switch to the preset;
- Storybook can render components with the preset;
- one consumer can apply the preset without manual token duplication.

