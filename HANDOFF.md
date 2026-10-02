# Handoff

Where the work stands and how to pick it up. Details per release, open findings and
decisions: [TRACKING.md](TRACKING.md). How to build and publish: [README.md](README.md).

Last update: 2026-10-02.

## State

- **Live in the platform:** `v1.3.12` (the user saved the custom CSS field).
- **On `main`, not tagged:** `v1.3.13` (Spanish sweep of the remaining views). It needs the
  user's approval, then the tag and the platform field update.
- Two sessions work on this repo (Javier's and Tomás's). Always branch from the latest
  `main`, check open PRs first, and keep PRs small.

## Next steps

1. **Release v1.3.13** once the user approves: `git tag v1.3.13 && git push origin v1.3.13`.
   The release workflow publishes and checks the CDN.
2. **Update the platform field** (agency settings → Empresa → Marca Blanca → CSS personalizado):
   replace its content with `embed/editor.css` of the tag. Back up the old content first
   (localStorage). Only the user presses "Guardar cambios".
3. **Keep sweeping for English text** in what is listed under TRACKING › Open findings ›
   Language (mainly modals and drawers: open each one). Fixed labels go in `src/labels.json`; pages that need more go in a generator
   like `scripts/gen-agentes-ia.mjs`.
4. **Pending user decisions** (TRACKING › Decisions pending): purple AI palette and header
   icons, sidebar per-item colors, dead selectors.
5. **Section refactors** (paused while theming): remaining `NNN-*` legacy segments, one
   section per release with 0 computed-style differences.

## How to verify a change in the platform

- Test sub-accounts: Tamaulipas (`FdAFeRpEKIdcsvcFKvcO`) and Capilea Mexico
  (`qkTUUwSESyjvFnBVUzrZ`, more data: tables, loading states, pagination).
- Preview a pushed commit without publishing: load `scripts/browser/snapshot.js` in the page
  and run `await bbSnap.preview(bbSnap.cdn('<full commit SHA>'))` (short SHAs return 404).
- Loading states only exist for a moment: catch them with a MutationObserver started right
  after navigating, or force the hidden element visible (`style.display`).
- The platform appends its view stylesheets after the theme. When a rule does not apply,
  test a more specific selector by inserting it right after the theme `<style>`, and wait
  for the 0.2–0.3 s transitions before reading computed values.

## Rules that do not change

- Never write the vendor's name in the repo; say "la plataforma". Functional `.ghl-*`
  selectors are fine.
- Branch + PR, Conventional Commits, never commit to `main`. Only tags in production.
- Visual changes need the user's approval before the tag.
- Never press "Guardar cambios" in the platform: the user saves.
- Cross-origin iframes cannot be styled (Automatización, Email marketing, Empresa,
  Calendarios › Reuniones, Afiliados).
- The reload flicker comes from the platform (it injects the custom CSS after painting its
  own interface); it cannot be fixed from CSS.
