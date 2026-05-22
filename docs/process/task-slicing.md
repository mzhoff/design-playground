# Task slicing rules for future work

## Why this exists

The design-system project has many moving parts: code inventory, Figma, tokens, documentation, Storybook, Playground, and consumer integration.

Tasks must be small enough that an implementation agent can keep the full local context and finish without guessing.

## Default task size

One task should usually touch one of these units:

- one app shell;
- one package foundation;
- one source project inventory;
- one vertical kit import;
- one component family;
- one token layer;
- one documentation section;
- one consumer integration point;
- one quality gate.

## Good task examples

Good:

- inspect `prodSQL` and produce inventory for canvas components;
- scaffold Storybook and render one placeholder package component;
- import raw admin sidebar from Security Sphere without redesign;
- define neutral color token scale and compile CSS variables;
- implement approved Button from Figma;
- connect Gigonom 2026 to local token CSS output.

Too large:

- import all components from all projects;
- build the whole Playground;
- standardize all primitives;
- make the design system production-ready;
- add visual tests everywhere.

## Context rule

Every task should start from a written source of truth:

- roadmap stage;
- inventory note;
- Figma node;
- accepted RFC;
- existing source path;
- explicit user decision.

If there is no source of truth, the task should first produce documentation or an inventory note.

## Copy rule

During inventory imports, copy working code first and standardize later.

Do not rewrite line by line if copying is safer.

After copying:

- isolate project-specific dependencies;
- replace hardcoded styles with temporary compatibility tokens only when necessary;
- document what remains coupled;
- avoid final abstractions until visual comparison is done.

## Figma rule

Pixel-perfect implementation starts only after a Figma node is approved.

Before approval, code can be rough inventory material.

After approval, implementation should follow Figma and the token contract.

## Documentation rule

Every finished component family should eventually have:

- product guide;
- technical Storybook docs;
- examples;
- props or API notes;
- accessibility notes;
- token usage notes;
- known limitations if any.

## Stop conditions

Stop and ask before continuing when:

- source project has unexpected uncommitted changes that block safe copying;
- component depends on unclear business logic;
- Figma contradicts existing implemented behavior;
- token decision affects many components and no rule exists;
- implementation would require creating a new local repo copy or worktree.

