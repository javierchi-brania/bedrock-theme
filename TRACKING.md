# Tracking

Status of the Bedrock theme: section refactors, design fixes and open findings.
Update this file in every PR that changes the theme. How to build, verify and
publish is in [README.md](README.md).

**Live in the platform:** `v1.3.2` (saved 2026-10-02).
**In progress:** `v1.3.3` (branch `fix/v1.3.3`).

## Releases

| Version | Type | What | Notes |
|---|---|---|---|
| v1.0.0 | — | Legacy CSS split into 54 segments, original order kept | |
| v1.0.1 | tooling | Node build, CI, automated releases, rules diff | |
| v1.1.0 | refactor | `00-tokens`; the build generates `embed/editor.css` | 0 visual diff |
| v1.2.0 | refactor | Base layer → `10-base`, `11-components`, `19-overrides` | ⚠️ 10px bottom gap in Conversaciones (fixed in v1.2.1). Do not use. |
| v1.2.1 | fixes | Global teal and pill fixes + v1.2.0 regression | loading bar, spinners, dashboard rings, avatars, channel badges, tags, secondary buttons |
| v1.2.2 | fixes | Second review round: survey (NPS), spinner, text-button icons, progress rings, header megaphone, empty-state icon | |
| v1.2.3 | fixes | Conversaciones, Marketing › Planificador, Launchpad in Spanish | |
| v1.2.4 | fixes | Sub-tab sweep: list views (Tareas, Empresas), Pagos sub-tabs | |
| v1.2.5 | fixes | Sub-tab sweep: Calendarios, Oportunidades, Marketing; Spanish labels outside Launchpad | |
| v1.2.6 | fixes | Spanish labels everywhere from `src/labels.json`; Launchpad → Panel; odd translations | |
| v1.2.7 | fixes | Opaque header and dashboard toolbar (content showed through when scrolling); Panel and calendar backgrounds | |
| v1.2.8 | fixes | Contact detail page and the add-opportunity modal | |
| v1.3.0 | refactor | 20-sidebar + 21-sidebar-switcher | compare vs v1.2.8: 0 differences |
| v1.3.1 | fixes | Platform palette → teal everywhere (goal: theme the whole platform) | |
| v1.3.2 | fixes | Consistency polish: Aplicaciones, Reputación, Informe de atribución, shared component patterns | live |
| v1.3.3 | fixes | Contactos loading skeleton | in progress |

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
| 20-sidebar | 060, 190, 290, 410 (at the slot of 060) | ✅ v1.3.0 |
| 21-sidebar-switcher | 160 (stays at its slot: it overrides components of equal specificity) | ✅ v1.3.0 |
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

### v1.3.2 (in progress): consistency polish

| Fix | Where | Verified |
|---|---|---|
| Custom SVG icons keep `currentColor` (an inner `fill` was forced to a literal) | Aplicaciones and any `svg.custom-icon` | fill teal |
| Default avatar (`.hr-avatar.ui-avatar__default`) sunken on the page surface | every view | capture |
| Primary tags (`.hr-tag.ui-primary`, "Pagado") text in accent on a soft pill, like "Gratis" | Aplicaciones | capture |
| Component pagination (`.hr-pagination`): no outline, 14px corners, active sunken in accent; Spanish "Anterior / Siguiente" | Aplicaciones | capture |
| Segmented radio buttons (`.n-radio-button.radio-group-button`): soft pills, checked sunken in accent | Informe de atribución and any view | capture |
| Informe de atribución: sticky filter bar on the page surface; stat titles no longer run over the value; placeholder chart (canvas) shifted to the accent hue; third tab "Oportunidades" (was a second "Clientes potenciales") | Informes | capture |
| New section `52-reputacion`: Directorios headline highlight (inline `color: blue`) in accent, bordered promo boxes sunken; Resumen action cards ("Conectar Google Business Profile"…) soft raised | Reputación | captures |
| Disabled legacy inputs (`input.hl-text-input:disabled`) lost the platform `#ececec` fill | Planificador de redes, Afiliados | computed |
| Labels: Membresías module title; "Clave" column (was "Key") | Membresías, Configuración › Valores personalizados | capture |

English text scan (visible text nodes, not hidden labels) on Tablero, Contactos, Oportunidades,
Pagos, Calendarios, Automatización, Sitios, Multimedia, Reputación: only live data (pipeline stage
"New Lead") and product guides from the platform (see Decisions pending).

### v1.3.1 (published): theme the whole platform

Goal (2026-10-02): neumorphism on every native view. A sweep over 60 sub-tabs of Sitios (14),
Reputación (8), Informes (8), Agentes de IA (9), Membresías (5), Multimedia, Aplicaciones and
Configuración (19) showed all of them are native (stylable); the most repeated issue by far is
platform blue (icons, radios, sort indicators, links, progress bars).

| Fix | Where | Verified |
|---|---|---|
| Teal ramp tokens `--bb-accent-25 … --bb-accent-900` (600 = accent, 700 = accent-dark) | 00-tokens | — |
| The platform palette variables `--primary-*` and `--blue-*` (its components read their brand color from them) remapped to the ramp on `:root` | every view | blue elements: Configuración › Etiquetas 14 → 0, Reputación 4 → 1, Cursos 0 |
| Tailwind `text-/bg-/border-` + `blue-*` / `primary-*` utilities (literal colors) → ramp | every view | same |
| New section `50-sitios`: forms/surveys/quizzes app surface (inline `!important` grey covered with a solid inset shadow), landing-page wells (features, template previews) sunken | Sitios › Formularios, Encuestas, Cuestionarios | captures |
| New section `51-informes`: ad report metric cards raised; Highcharts (any view) transparent background, platform-blue series (#3B82F6 line, light-blue area gradient) → accent | Informes › Google Ads, Meta | capture |
| Global patterns (19-overrides): Bootstrap-Vue tables (`.table-hl`) on the page surface with divider lines; Bootstrap pagination as soft pills, active sunken | Informes and any older view | captures |

Checked the global palette remap on the main views: Tablero / Conversaciones only change the
new tokens and elements that used the blue palette (select auxiliary icons, the selected inbox
item, now dark teal on an inset).

Items left open by the sweep were closed in v1.3.2.

### v1.2.8 (published, live)

| Fix | Where | Verified |
|---|---|---|
| The contact panel rules (sections as cards, headers, tabs) now cover the contact detail page too: `:is(#conversations-new-app, #record-details-new-ui) .bg-contacts-panel` (both ids, same specificity) | Contactos › detalle | capture; Conversaciones compare: only the intended elements |
| Segmented tabs (Todos los campos / DND / Acciones): white rail with separators → raised group, active segment sunken | contact panel (both pages) | capture |
| Contact header block outline, center "Conversaciones" tab and lead-source link (blue) → none / accent | Contactos › detalle | capture |
| AI promo banner ("Deja que AI redacte…"): gradient + outline + blue icon → theme card, accent icon | Contactos › detalle, Conversaciones | capture |
| Add-opportunity modal: active left-menu item → inset accent; "Gestionar campos" → accent; multi-select tag area (Seguidores) transparent | Oportunidades › Añadir oportunidad | capture |
| Labels: modal title "Añadir una nueva oportunidad", description, "Información de la oportunidad", "Embudo de venta", "Etapa"; panel section "Oportunidades" (was "Clientes Potenciales", wrapped on two lines) | modal, contact panel | capture |

Reviewed, nothing to change: opening an opportunity card leads to the contact detail (covered above); "Añadir lista inteligente" drawer is themed. English left: placeholders ("New smart list", "Introducir el nombre del cliente potencial") cannot be changed with CSS; activity feed sentences ("Opportunity … created in …") are live data.

### v1.2.7 (published)

| Fix | Where | Verified |
|---|---|---|
| Header box (pill + page tabs row) was transparent: scrolled content showed through the tabs → page surface, square box (the pill keeps its radius), solid 6px band above | every view with page tabs | Marketing scrolled: clean; compare: only the header (3 props) |
| Dashboard sticky toolbar (Dashboard / Nuevo / Últimos 30 días / Editar tablero) was transparent → page surface, extended 30px up to cover the band under the header | Tablero | scrolled capture |
| Panel page background was the platform near-white #f9fafb → page surface | Panel | compare: 2 elements |
| Calendar grid container white band (top and left) → page surface; the platform injects `#fc-calendar-container-v2 { background: #fff !important }` after the theme, so the rule uses `div#…` | Calendarios › Vista de calendario | compare: 1 element |

### v1.2.6 (published)

All Spanish label replacements now live in `src/labels.json` (55 labels); the hand-written
blocks were removed from the section files. Dropdown tabs keep their chevron (it was lost
on "Afiliados" in v1.2.5).

| Area | Original | Now |
|---|---|---|
| Sidebar | Launchpad · Clientes Potenciales · AI Studio · Suscripciones (memberships) · Contenido multimedia Unidad / dispositivo de almacenamiento · Aplicaciones del mercado | Panel · Oportunidades · Estudio de IA · Membresías · Multimedia · Aplicaciones |
| Header titles | same as the sidebar | same as the sidebar |
| Configuración menu | Clientes Potenciales & Pipelines · Email Services · Importar estadísticas · Gestionar la puntuación · Integraciones Privado | Oportunidades y embudos · Servicios de correo · Importar datos · Puntuación · Integraciones privadas |
| Oportunidades | Clientes Potenciales (title and tab) · Secuencia (pipelines) · High/Medium/Low risk | Oportunidades · Embudos de venta · Riesgo alto/medio/bajo |
| Pagos | Facturas y estimaciones · Estimaciones · Cajas abandonadas · Products/Collections/Inventory/Reviews · Coupons · Gift Cards | Facturas y cotizaciones · Cotizaciones · Carritos abandonados · Productos/Colecciones/Inventario/Reseñas · Cupones · Tarjetas de regalo |
| Marketing | Temporizadores de cuenta atrás · Affiliate Manager (Campaign, Affiliate, Payout, Media) | Cuentas regresivas · Afiliados (Campañas, Afiliados, Pagos a afiliados, Recursos) |
| Agentes de IA | Agent Studio · AIde voz · Conversation AI · Base de Conocimiento · Plantillas de Agentes · Content AI · Agent Logs · Industry Agents | Estudio de agentes · IA de voz · IA conversacional · Base de conocimiento · Plantillas de agentes · IA de contenido · Registros de agentes · Agentes por industria |
| Automatización, Reputación | Visión general · Listados | Resumen · Directorios |
| Sitios, Membresías | Analytics · Branded Mobile App · Certificado · Configuración del email | Analítica · App con tu marca · Certificados · Configuración de correo |
| Contactos › Tareas, Calendarios, Panel | Tasks · Añadir Task · Upcoming/Cancelled/All · "…nuevos leads…" | Tareas · Añadir tarea · Próximas/Canceladas/Todas · "…nuevos clientes potenciales…" |

Kept on purpose: brand and product names (Stripe, WordPress, WhatsApp, Google Ads, Meta, GBP,
Gokollab Marketplace), widely used Spanish loanwords (Marketing, Blogs, Widgets), "Testimonios
en vídeo" (holds a "Nueva" badge inside the label), and the "Fragmentos" tabs (snippets).
*Decide:* "Embudos de venta" (pipelines) sits next to Sitios › "Embudos" (funnels).

### v1.2.5 (published)

| Fix | Where | Verified |
|---|---|---|
| Appointment list: active tab underline and label → accent; fixed tabs Upcoming / Cancelled / All → Próximas / Canceladas / Todas | Calendarios › Vista de lista de citas | capture |
| Forecast chrome: risk settings link, summary chip, "missing close date" icon → accent / theme pills; totals row white → surface; risk titles → Riesgo alto / medio / bajo | Clientes Potenciales › Pronóstico | compare: only those elements |
| Ring spinner (`.lds-ring`) shown while embedded apps load: blue → accent | Marketing › Correos electrónicos (and any `.lds-ring`) | — |
| Spanish labels: Pagos tabs (Cupones, Tarjetas de regalo; Productos submenu: Productos, Colecciones, Inventario, Reseñas), Marketing "Affiliate Manager" → Afiliados (submenu: Campañas, Afiliados, Pagos a afiliados, Recursos), Tareas title and "Añadir tarea" | Pagos, Marketing, Contactos › Tareas | capture |
| Text replacements keep the original line height (`line-height: 0` on the hidden text, `inline-block` on `::after`). Fixes a v1.2.3 regression: the Launchpad sidebar item was 5px taller (45px vs 40px) | sidebar, Launchpad step, all replacements | compare: sidebar item 45 → 40px; Pronóstico cards unchanged |

### v1.2.4 (published)

| Fix | Where | Verified |
|---|---|---|
| List views on the shared table (`hlcontentwrap .wrapper`): the contacts table rules now also cover them (pill rows, sunken header, pagination, checkboxes), plus quick-filter pills, sort indicator and views bar in accent | Contactos › Tareas, Contactos › Empresas | compare: Empresas 526 changes (the table); Contactos 0 |
| Empty-state icon `.hl-empty-icon`: same light-blue ring as `.ui-empty-icon` | Pagos › Documentos, Pedidos, Enlaces, Transacciones, Productos | rule shared with `.ui-empty-icon` |
| Pagos › Configuración side menu: active item blue tint, blue text, 3px corners → inset, accent, radius sm | Pagos › Configuración | compare: 28 changes, all in the menu |
| "Ver documentación" links: blue → accent | Pagos › Tarjetas de regalo | — |

### v1.2.3 (published)

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
- [x] "Quick Question" pop-up and the "Learn More" / "Submit" banners: platform product guides in `#pendo-guide-container` (already themed). Their text is English and dynamic. *Decision pending: hide them.*
- [ ] User avatar (`.avatar_img`) is purple `rgb(127,117,189)`. *Decision pending.*
- [ ] Header translate icon (`#i18n-feedback`) and AI sparkle icon are purple. *Decision pending.*
- [x] Help icon `#hl_header--help-icon`: its blue background is inline `!important`, so the 40px inset shadow is the right workaround (documented in 070). Nothing to change.

**Sidebar**
- [x] Per-item color cycle: "Agentes de IA" was already in it (`[id="sb_AI Agents"]`); "Pregúntale a la IA" falls back to the accent, which is the color the cycle gives it (it sits before Panel/red).
- [ ] Conversaciones active color `#3f7396` is a muted blue from the mockup. *Decision pending: keep or move to teal.*

**Header (page tabs)**
- [x] Transparent tabs row → v1.2.7 (also the dashboard toolbar).

**Conversaciones**
- [x] Bubbles, contact panel sections, "Cargar más", channel switch icon → v1.2.3.

**Calendarios**
- [x] `#fc-calendar-container-v2` white band → v1.2.7.

**Launchpad**
- [x] `#launchpad-micro-app` near-white background → v1.2.7.
- [x] Language: reviewed the 5 guide categories with every step expanded; only "Launchpad" and "leads" were English (→ v1.2.3). Brand names (Facebook, Instagram, Messenger, Stripe, WordPress) and SMS/CRM stay. "Marketing" is accepted in Spanish; *decide* if it should be "Mercadotecnia".
- [ ] Text replacements are tied to the platform text (the step selector uses the step title as id): if the platform renames a step, the rule stops matching (no harm, the original text shows).

**Marketing › Planificador de redes**
- [x] White panel and blue illustration → v1.2.3.
- [x] Date inputs off palette (`#ececec`): disabled state → v1.3.2.
- [ ] Illustration cards use pastel gradients (lavender, mint, yellow, light blue). Left as illustration; decide if they should be neutral.

**Language**
- [x] Pagos tabs, Marketing "Affiliate Manager", Tareas title and button → v1.2.5.
- [ ] Left in English because the text is live data or carries live numbers: "262 Tasks" count, "Buscar para Tarea Título" (placeholder), Pronóstico risk rules ("Slipped 2+ times o 14+ days": thresholds come from settings), pipeline status names (Open / Won / Lost / Abandoned in the forecast table and canvas chart).
- [ ] Dates in list views use the English format ("Aug 18, 2026 07:14 PM") — not fixable with CSS.

**Clientes Potenciales › Pronóstico**
- [ ] The chart is a canvas: its "Ingresos esperados" series stays platform blue; the legend dot and the table column keep the same blue so they still match the bars.

**Marketing › Administrador de anuncios**
- [x] Feature cards verified: rounded and raised; the grey areas are the illustrations inside them (false positive).

**Clean in the last review:** Contactos, Oportunidades (board), Pagos (all sub-tabs), Ask AI, Configuración native pages
(calendars, objects, users, tags), Contactos › Acciones en lote, Conversaciones (all sub-tabs), Clientes Potenciales › Secuencia and Acciones en lote, Marketing › Fragmentos, Temporizadores, Enlaces de activación, Paneles de marca.

### Not stylable (cross-origin iframes)
Configuración › Empresa, Calendarios › Reuniones, Automatización, Email Marketing (Marketing › Correos electrónicos), Marketing › Affiliate Manager.
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
- `div.hr-input-container` 4px corners: the container is transparent; the field inside is rounded and sunken.
- Course "quick help" cards `rgb(230,240,242)`: that is `--bb-accent-50` from the palette remap.

## Decisions pending
1. Purple avatar and header icons: teal or keep?
2. Sidebar per-item colors (mockup cycle) vs a single teal; muted blue for Conversaciones.
3. Platform product guides (English announcements and surveys, `#pendo-guide-container`): keep themed or hide?
4. Dead selectors: remove the ones that match nothing in any visited view, or only after
   opening the states they could target (modals, menus, tooltips)?

## Lessons
- **v1.2.0 regression:** `margin` (030) vs a later `margin-bottom: 0` (050) on the same selector.
  The effective-declarations diff did not expand shorthands; now it does, and order-check
  reports shorthand/longhand pairs on the same selector.
- **Font reload noise:** swapping the stylesheet re-registers the web font, so widths and
  heights change everywhere until it loads. Use `bbSnap.compare(prevTag, sha)` (both sides
  through a `<style>`, waits for `document.fonts.ready`).
- **Replacing platform text:** `font-size: 0` on the text element + `::after { content: "…"; font-size: …; line-height: … }` with the original metrics. Only for fixed labels; dynamic text cannot be translated with CSS.
- **Injected component styles** can repeat the theme's selector with `!important` after the theme loads (calendar container): add a type or class to the selector to win on specificity.
- **Sticky/fixed bars** must be opaque (page surface), or scrolled content shows through them.
- **Brand variables first:** the platform reads its brand color from :root variables (`--primary-*`, `--blue-*`). Remapping them themes most components at once; Tailwind utilities with literal colors need their own rules.
- **Inline `!important` backgrounds** can be covered with `box-shadow: inset 0 0 0 100vmax <color>` (above the background, below the content).
- **Inline `!important`** (e.g. `border-radius: 0px !important` on "Cargar más") cannot be overridden from a stylesheet: shape and clip a same-size wrapper with `:has(> …)`.
- **Inline style matching:** `[style*="color: rgb(…)"]` also matches `background-color`; use `^=` and `"; color:"`.
- **compare() noise:** ignore `#claude-agent-*` elements: they belong to the browser automation extension, not to the page.
- **Text replacement metrics:** with only `font-size: 0`, the hidden text still leaves a strut and the `::after` sits on the baseline: rows grow (6px per title in Pronóstico, 5px on the sidebar item). Always pair `font-size: 0; line-height: 0` with `::after { display: inline-block; font-size; line-height }`.
- **Canvas charts** cannot be restyled: keep their legend and table colors as they are so they keep matching.
- **Background tabs:** timers are throttled, animations and lazy content do not run. Take a
  screenshot first to force rendering, and sleep with a worker.
