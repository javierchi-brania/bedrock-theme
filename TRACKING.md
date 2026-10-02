# Tracking

Status of the Bedrock theme: section refactors, design fixes and open findings.
Update this file in every PR that changes the theme. How to build, verify and
publish is in [README.md](README.md).

**Live in the platform:** `v1.2.1` (custom CSS field, since 2026-10-02). `v1.2.2` is published: change the `@import` to use it.
**In progress:** `v1.2.3` (branch `fix/v1.2.3`).

## Releases

| Version | Type | What | Notes |
|---|---|---|---|
| v1.0.0 | — | Legacy CSS split into 54 segments, original order kept | |
| v1.0.1 | tooling | Node build, CI, automated releases, rules diff | |
| v1.1.0 | refactor | `00-tokens`; the build generates `embed/editor.css` | 0 visual diff |
| v1.2.0 | refactor | Base layer → `10-base`, `11-components`, `19-overrides` | ⚠️ 10px bottom gap in Conversaciones (fixed in v1.2.1). Do not use. |
| v1.2.1 | fixes | Global teal and pill fixes + v1.2.0 regression | loading bar, spinners, dashboard rings, avatars, channel badges, tags, secondary buttons |
| v1.2.2 | fixes | Second review round: survey (NPS), spinner, text-button icons, progress rings, header megaphone, empty-state icon | |
| v1.2.3 | fixes | Conversaciones and Marketing › Planificador (see below) | in progress |

Tooling without a release: rules diff expands shorthands, build color lock (#6).

## Sections

Refactor releases must show **0 computed-style differences**. Fixes go in a
separate release, with before/after captures.

| Section | Source segments | Status |
|---|---|---|
| 00-tokens | 000 | ✅ v1.1.0 |
| 10-base | 010, 050, 180 (right after tokens) | ✅ v1.2.0 |
| 11-components | 110, 210, 230, 240, 250, 260, 270 (at the slot of 110) | ✅ v1.2.0 |
| 19-overrides | 390, 430, 520 (at the slot of 430: late global layer) | ✅ v1.2.0 |
| 20-sidebar | 060, 160, 190, 290, 410 | ⬜ |
| 30-header | 070, 310, 330, 500 | ⬜ |
| 40-launchpad | 440 | ⬜ |
| 41-tablero | 020, 460 | ⬜ |
| 42-conversaciones | 030, 100, 320, 340, 380, 470 | ⬜ |
| 43-calendarios | 040, 130, 400, 490 | ⬜ |
| 44-contactos | 080, 510 | ⬜ |
| 45-oportunidades | 090, 140 | ⬜ |
| 46-pagos | 350, 360, 370 | ⬜ |
| 47-configuracion | 200, 280, 450, 480, 530 | ⬜ |
| 48-marketing | 150, 170 | ⬜ |
| 49-ask-ai | 220, 300, 420 | ⬜ |
| 90-agencia | 120 | ⬜ |

Why 11 and 19 are not at the top: moving them past the view segments flips the
cascade against view rules of equal specificity (see README). Each view refactor
resolves its own conflicts with them.

## Design fixes

### v1.2.3 (in progress)

| Fix | Where | Verified |
|---|---|---|
| Incoming chat bubbles: 1px grey outline → transparent | Conversaciones | compare vs v1.2.2: 3 bubbles |
| Contact panel sections (`#opportunities`, `#workflows`, `#client-portal`): 1px outline → transparent | Conversaciones | compare: 3 elements |
| "Cargar más": accent text; pill + soft shadow on its wrapper (the button forces `border-radius: 0 !important` inline) | Conversaciones, end of the list | computed radius 16px |
| Composer channel switch icon: blue → accent | Conversaciones | compare: 2 icons |
| Social Planner onboarding panel: inline white surface → theme card (radius lg, raised) | Marketing › Planificador | compare: 1 element, capture |
| Social Planner illustration: inline blue labels, badge and day pills → accent; light-blue chips → theme pills (brand dots keep their colors) | Marketing › Planificador | capture |
| No English in Launchpad: sidebar item and header title "Launchpad" → "Primeros pasos"; step "Captura nuevos leads…" → "…clientes potenciales…" | Launchpad | capture |

### v1.2.2 (published)

| Fix | Where | Verified |
|---|---|---|
| Survey (NPS) contents: number scale as soft pills, selected = inset teal, open text as sunken field, buttons themed | any view (Pendo guide) | Conversaciones: 61 changes, all inside the survey |
| Page spinner (`.v-spinner` moon): inline blue → accent | Contactos while loading | — (transient) |
| Text-button icons (`+ Filtros rápidos`, `Ir a tareas`, `Ir a Acciones manuales`): blue → accent | Tablero, Launchpad, Pagos | compare: only the expected elements |
| Progress rings (`.hr-progress-graph-circle-fill`): inline blue stroke → accent | Launchpad steps | — (0% today) |
| "Novedades" header pill megaphone (`<img>`): accent via `--bb-accent-filter` | header (Contactos, Pagos) | visual check |
| Payments empty-state icon: light-blue 8px ring removed | Pagos | compare: 1 element |

New token: `--bb-accent-filter` paints any monochrome `<img>` icon in the exact accent.

### Open findings (by view)

**Global / header**
- [ ] User avatar (`.avatar_img`) is purple `rgb(127,117,189)`. *Decision pending.*
- [ ] Header translate icon (`#i18n-feedback`) and AI sparkle icon are purple. *Decision pending.*
- [ ] Help icon `#hl_header--help-icon`: blue background hidden behind a 40px inset shadow. Set the background to a token (no visual change, less fragile).

**Sidebar**
- [ ] Per-item color cycle is missing `#sb_ask-ai` and `#sb_AI\ Agents` (the id has a space); AI Studio (`#sb_vibe`) breaks the order of the cycle.
- [ ] Conversaciones active color `#3f7396` is a muted blue from the mockup. *Decision pending: keep or move to teal.*

**Header (page tabs)**
- [ ] The tabs bar under the header is transparent: content scrolled under it shows through the tabs (seen in Marketing › Planificador).

**Conversaciones**
- [x] Bubbles, contact panel sections, "Cargar más", channel switch icon → v1.2.3.

**Calendarios**
- [ ] `#fc-calendar-container` computes a white background; looks covered by the grid. Verify.

**Launchpad**
- [ ] `#launchpad-micro-app` computes `#f9fafb`; looks covered by the content. Verify.
- [x] Language: reviewed the 5 guide categories with every step expanded; only "Launchpad" and "leads" were English (→ v1.2.3). Brand names (Facebook, Instagram, Messenger, Stripe, WordPress) and SMS/CRM stay. "Marketing" is accepted in Spanish; *decide* if it should be "Mercadotecnia".
- [ ] Text replacements are tied to the platform text (the step selector uses the step title as id): if the platform renames a step, the rule stops matching (no harm, the original text shows).

**Marketing › Planificador de redes**
- [x] White panel and blue illustration → v1.2.3.
- [ ] Date inputs off palette (`#ececec`) (not seen in this review; recheck when the scheduler is open).
- [ ] Illustration cards use pastel gradients (lavender, mint, yellow, light blue). Left as illustration; decide if they should be neutral.

**Clean in the last review:** Contactos, Oportunidades (board), Pagos, Ask AI, Configuración native pages
(calendars, objects, users, tags).

### Not stylable (cross-origin iframes)
Configuración › Empresa, Calendarios › Reuniones, Automatización, Email Marketing.
Probably also Informes, Medios, Reputación, Sitios, Membresías, Integraciones (content did not
load in the audit; confirm one by one).

### Audit false positives
- `#i18n-feedback` square wrapper: same color as the header, the button itself is round.
- Layout containers reported as "sharp" (`#location-dashboard`, `#crm-contacts-view`,
  `.askai-*`…): clipped by the rounded frame.
- Social network brand colors (Facebook, LinkedIn, Bluesky…): intentional.
- Contactos pagination "Prev Page" flat: it is disabled on page 1; the active page is inset and "Next" raised, as designed.
- Conversaciones list tabs ("No leído"…) flat: inline tabs with an underline, as designed.
- Oportunidades header actions group 1px border: not reproducible.

## Decisions pending
1. Purple avatar and header icons: teal or keep?
2. Sidebar per-item colors (mockup cycle) vs a single teal; muted blue for Conversaciones.
3. Dead selectors: remove the ones that match nothing in any visited view, or only after
   opening the states they could target (modals, menus, tooltips)?

## Lessons
- **v1.2.0 regression:** `margin` (030) vs a later `margin-bottom: 0` (050) on the same selector.
  The effective-declarations diff did not expand shorthands; now it does, and order-check
  reports shorthand/longhand pairs on the same selector.
- **Font reload noise:** swapping the stylesheet re-registers the web font, so widths and
  heights change everywhere until it loads. Use `bbSnap.compare(prevTag, sha)` (both sides
  through a `<style>`, waits for `document.fonts.ready`).
- **Replacing platform text:** `font-size: 0` on the text element + `::after { content: "…"; font-size: …; line-height: … }` with the original metrics. Only for fixed labels; dynamic text cannot be translated with CSS.
- **Inline `!important`** (e.g. `border-radius: 0px !important` on "Cargar más") cannot be overridden from a stylesheet: shape and clip a same-size wrapper with `:has(> …)`.
- **Inline style matching:** `[style*="color: rgb(…)"]` also matches `background-color`; use `^=` and `"; color:"`.
- **compare() noise:** ignore `#claude-agent-*` elements: they belong to the browser automation extension, not to the page.
- **Background tabs:** timers are throttled, animations and lazy content do not run. Take a
  screenshot first to force rendering, and sleep with a worker.
