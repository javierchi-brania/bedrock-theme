# Tracking

Status of the Bedrock theme: section refactors, design fixes and open findings.
Update this file in every PR that changes the theme. How to build, verify and
publish is in [README.md](README.md).

**Live in the platform:** `v1.3.13` (saved 2026-10-02; checked on every module).
**In progress:** — Next work: the backlog from the full inspection (below).

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
| v1.3.2 | fixes | Consistency polish: Aplicaciones, Reputación, Informe de atribución, shared component patterns | |
| v1.3.3 | fixes | Loading skeletons (Contactos, Tareas, Oportunidades), Tareas header fixes | |
| v1.3.4 | fixes | Contactos filters drawer, "Anterior" in table pagination | live |
| v1.3.5 | fixes | Everything in Spanish: product guides hidden, Agentes de IA pages translated and themed, Membresías banner, Panel guide card edges | live |
| v1.3.6 | fixes | Oportunidades: board cards no longer clipped, accent view tab, list view with the Contactos table theme | live |
| v1.3.7 | fixes | Oportunidades board: stage headers and cards no longer clipped by the horizontal scrollers | live |
| v1.3.8 | labels, fixes | "Pregúntale a la IA" → "Ask BRANIA" (sidebar item and header AI button tooltip); Oportunidades board empty state | live |
| v1.3.9 | labels | The AI assistant label follows the profile language: "Pregúntale a BRANIA" (Spanish) / "Ask BRANIA" (other languages) | live |
| v1.3.10 | labels | Assistant labels always Spanish: `<html lang>` is not the UI language | live |
| v1.3.11 | fixes | Pagos › Enlaces de pago and Configuración no longer start under the header | live |
| v1.3.12 | fixes | Estudio de IA no longer under the sidebar and header; sidebar fits the screen height | |
| v1.3.13 | labels, fixes | Spanish sweep: Encuestas and Códigos QR landings, social planner "Comunidad", Labs card in teal | live |

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

## Backlog from the full inspection (2026-10-02, v1.3.13 live)

Six read-only inspections in parallel covered every module of the Capilea Mexico sub-account
(`qkTUUwSESyjvFnBVUzrZ`) and, for Agentes de IA and the assistant, Tamaulipas (`FdAFeRpEKIdcsvcFKvcO`).
Every page loaded `@v1.3.13`. Severity: **H** very visible, **M** visible, **L** minor.
Selectors were taken from the live DOM. Check them again before writing a rule.

### 1. Theme bugs (caused by the theme or regressions): fix first

- [ ] **H Informes › Informe del agente:** the leaderboard card `#reporting-agent-dashboard .card.leader-board` gets the page surface (#e9ebec) but keeps its white text (24px title; `th` at rgba(255,255,255,.7)), so it is unreadable. Make the text dark, or keep a dark card.
- [ ] **H Configuración menu:** `#sb_Opportunities-Pipelines` has no visible label. Its label `::after` "Oportunidades y embudos" is 175px inside a 164px `span.nav-title.hl_text-overflow`, and an overflowing atomic inline-block disappears under `text-overflow: ellipsis`. Shorten the label ("Embudos") or let long sidebar labels use `display: inline`. `#sb_domains-urlRedirects` is also cut ("Dominios y redireccion…").
- [ ] **H Membresías › Cursos › Tablero:** the "Haga realidad sus ideas" banner is solid black. `.rounded-xl.overflow-hidden.bg-blue-600 > .absolute.inset-0.bg-black.bg-opacity-20` computes to rgb(0,0,0) at full opacity: the Tailwind opacity variable is probably lost through a theme rule.
- [ ] **H Agentes de IA › Estudio de agentes:** the page header ("Agentes gestionados" and its buttons) is under the fixed header. `#agent-studio-container` padding-top is 92px but `header.hl_header` ends at 134px. Check whether this is a regression from the v1.3.12 header and sidebar changes.
- [ ] **H AI assistant panel** (Tamaulipas): its toolbar (Nuevo chat, Cerrar) is under `header.hl_header`, so the close button is hidden. `.askai-sidebar` / `.askai-sidebar__main` are #fff with 0 radius.
- [ ] **H Sitios › Códigos QR:** the page cannot scroll, so the feature cards are cut. `.qrCodeListApp div.h-full.w-full.overflow-hidden` is 751px tall for 829px of content.
- [ ] **M Pagos › Cupones:** the selected filter ("Todo") is raised. Selected must be sunken: `.n-button-group .n-button.hl-active-btn`.
- [ ] **M Contactos › Filtros drawer:** the last field of each group is outdented and grey (#8b9397, margin-left 0 instead of 14px): `.hr-drawer-body-content-wrapper .hr-collapse-transition > div:last-child`.
- [ ] **M Conversaciones › contact panel:** the phone-type button shows "Sele…" and the number is cut ("55 0000 00"): `[id^=phone-label-] .hr-button` is 64px. The sticky tabs/search area in `#record-details-lhs` has gaps, so labels show through when scrolling.
- [ ] **M Aplicaciones:** the sticky `footer.pagination-wrapper` lets the cards show through. **M Membresías analytics:** content shows above the sticky filter row (`.membershipAnalyticsApp .sticky.-top-2.z-10`).
- [ ] **L Contactos:** after Escape a black focus outline appears on `div.hr-config-provider`.

### 2. Surfaces and colors still off-theme

White or flat surfaces → page surface / raised or sunken:
- [ ] H Contactos › contact detail: field sections `#record-blocks-container .hr-collapse-item__content-inner` are #fff with square corners.
- [ ] H Tareas and Empresas: list on a flat #f9fafb full-width box with 0 radius (`#CustomObjectsList div.wrapper`, `#BusinessList div.wrapper`), with an empty ~90px gap above the Tareas list.
- [ ] H Agentes de IA › Agentes por industria: `div.ia-canvas` #fff with 1px #eaecf0 border; `div.home` #f9fafb; `div.home-tabs` #fff; card bodies `div.template-card__body` and pills `span.template-card__subtype-pill` white.
- [ ] H Agentes de IA › Estudio de agentes (`.sa-shell-host`, `.agents-shell`, `.agents-page`, `.agents-page__footer`), Registros de agentes (`#agent-logs-content`, `div.metrics-stat-card`, `div.metrics-chart-card`, `.chart-type-toggle`), IA de contenido (`div.hl-statistic`): white.
- [ ] H Sitios › Analítica: KPI cards `label.hr-radio-button.ui-radio-group-item.compact-radio-item` are white with 12px corners; the selected one has a 1px #155eef border and a blue title. Segment rail `.hr-tabs--segment-type .hr-tabs-rail` is flat #f7f7fa.
- [ ] H Reputación › Configuración: selected radio card `label.hr-radio-button--checked.ui-radio-group-item` is white with a #155eef border. Widgets segment: capsule white and raised, rail #f7f7fa (selected must be sunken).
- [ ] H Configuración › Objetos (`.custom-obj-list .ui-header` white with a 1px border, title #004eeb), Redireccionamiento de URL (`.hl-statistic` white with a 1px border, 8px radius), Integraciones (`.integration-card .card-header` #fff, card radius 4px).
- [ ] H Sitios › Widget de chat: header strip `.hr-tabs-nav--line-type.hr-tabs-nav` flat white with no padding; "+ Nuevo" touches the edge.
- [ ] M Facturación `#location-billing` #fcfcfd (white strip at the bottom); Aplicaciones `section` #fcfcfd; "Gratis" tags `div.hr-tag.ui-tag` white; Multimedia modal `.n-card.n-modal.hl-modal` #fff; Informes custom-report cards (`#location-custom-reports .grid-cols-3 > div.p-4`, 1px border, 4px radius), call-sources table (`#widget-data-table`), `#ads-date-picker-input` (also cut) and `div.search` / `#filter-input` white.
- [ ] M Agentes de IA › Primeros pasos: `div.feature-sections` #fafaf9 with 1px border; user chat bubbles white with 1px border; inactive "ship AI" tab titles #d7d3d0 (nearly invisible). IA de voz `section.welcome-stats` flat #f9fafb, `span.prompt-chip` white with border.
- [ ] M Membresías: `.n-input-group-label` and `.n-tag` #fafafc; off switch rail `.hr-switch__rail` #f2f4f7 (nearly invisible); checked `.n-checkbox--checked` shows no tick.
- [ ] M Pagos › Configuración › Recibos: editor `.editor-container` flat 1px #d0d5dd border. Pronóstico: "No close date" column header `.forecast1-column-header--undated` #fff.
- [ ] M Calendarios settings: active services sub-tab `.py-[8px].px-[10px].rounded-[4px]` flat with 4px radius; "Recomendado" badge `div.bg-primary-50` gets card padding (115×54).
- [ ] L Seguimiento externo `.cm-editor` dark #282c34 with 0 radius; Blogs split button `.hr-button-group` square right edge; WordPress `.n-carousel` clips the raised shadows; Fragmentos / Usuarios table header search and button flush with the card edge (`.hr-table-header-container`).

Platform blue or purple:
- [ ] H Calendarios (and settings): purple gradient AI tab `.calendar-ai-edge-tab`.
- [ ] H Configuración › Sistema telefónico: active tab underline #188bf6 (`ul.hl_affiliate--nav li.--active a`), hero `.phoneIntegrationApp .hero-section-container` #b2ccff with square corners, message ramp `#SettingMessageRamp` #155eef, Voz sub-nav selected #155eef, selected provider `label.hr-radio-button--checked` #eff4ff / #155eef.
- [ ] H Informes: `button.btn.btn-blue` ("Recuperar"), `button.btn.btn-link`, `button.btn.btn-outline-primary` and "Haga clic aquí" in platform blue.
- [ ] H Membresías: email settings active inner tab #004eeb, `#magic-link-expiry-alert` #edf5fe; Gokollab (`#gokollab`) purple banner and `#product-create`; sample-data banners #f5f8ff with blue border; analytics funnel blue→purple gradient.
- [ ] H Agentes de IA › IA de voz: orb `div.orb-shadow` / `span.orb-ring`, cursor, `div.tpl-header__eyebrow`, `button.tpl-browse-all__btn` #6938ef. IA de contenido: `button#ai-employee-upgrade` #5b25d0. Primeros pasos: Empezar button `.n-button__border` #6938ef.
- [ ] M Conversaciones: "Detalles" link #004EEB, outbound bubble #eaeffc with a 1px border. Citas: active `.n-pagination-item--active` #155eef (also Informes), status select with a 2px red border. Pronóstico: "Total" `.fd-summary-total-weighted` #1570ef. Etiquetas: active tab label #155eef. Membresías "Más información" #155eef. Aplicaciones "WL" tag #026aa2. Base de conocimiento `#kb-whats-new-banner` (blue border, lavender icon). Plantillas de agentes `div.bot-header` lavender image. Agentes por industria avatars `div.template-card__avatar` #3b82f6 / #8b5cf6. Planificador feature cards `button.sp-v3-feature-card > div` violet/blue gradients. Paneles de marca illustrations `svg [fill="#C3B5FD"]`. Cuestionarios mockups (`.quiz-slide__qcard`, `.quiz-btn--solid`, …) #155eef. Tarjetas de regalo illustration `#gift-cards-container img` blue. Header assistant icon `#hl_header--copilot-icon` #6938ef.
- [ ] Decision: per-module sidebar colors (Tablero copper, Calendarios / Automatización violet, Multimedia maroon, Reputación orange) — see Decisions pending.

### 3. Fixed English labels (`src/labels.json`)

- [ ] H Pagination component everywhere: "1 - 4 of 4", "0 - 0 of 0", "Page 1 of 1" (`[id$=pagination] p.hr-text.hr-text-xs`, 11px/16px; `#searchable-table-pagination`). These carry numbers in one text node: not translatable with a label; needs another approach (or accept).
- [ ] H Tablero: selects showing the raw value "all" → "Todos" (`#location-dashboard_select--task-user-selection`, `…--manual-action-campaign-selection`, `…--manual-action-user-selection`, `…--user-sales-efficiency` `.hr-base-selection-input__content`, 14px/18px).
- [ ] H Citas: status "New (action required)" → "Nueva (requiere acción)" (`div.n-select[id$=-status] .n-base-selection-input__content`, 15px/22.5px).
- [ ] H Pronóstico: Open / Won / Lost / Abandoned (`#fd-summary-table span.truncate`, 13px), "No close date" (`.forecast1-undated-header__title`, 14/20), months (`#ForecastDashboard div.truncate.text-sm.font-bold`, 14/20), "of" in `.forecast1-column-header__metric-line`.
- [ ] H Oportunidad modal: "Expected Close Date" (`span.hr-form-item-label__text`, 14/17.5), "Select Date" (`#OpportunityForecastExpectedCloseDate span`, 14/21).
- [ ] H Configuración: "Pipelines" tab (`#tb_Pipelines`), header "Clientes Potenciales & Pipelines" (`div.topmenu-navtitle`, 18/28), message ramp texts, "Learn More" ×4, "Start Registration", "No Data", "Actions" (`#import-history-table`), "Labs" (`#labs_title`).
- [ ] H Membresías: email-settings inner tabs `.n-tabs-tab[data-name=…] .n-tabs-tab__label` (14/21), magic-link alert, Gokollab texts, certificates typewriter (`span.whitespace-pre.text-blue-600`, cycles English: needs a different approach).
- [ ] H Agentes por industria › Registros: "Conversation logs", subtitle, "Add filter", column headers, empty state (selectors in `#industry-agents-dashboard .ia-canvas`). IA de contenido: "Content AI", tabs Text / Image, upgrade button. Aplicaciones instaladas: "Search", "App Name". AI assistant onboarding popovers `.askai-announce` (New, Work side by side, Skip, Got it…).
- [ ] M Fragmentos: column "Type". Pagos › Integraciones: "Manual Payment Methods" and the provider descriptions. Recibos editor placeholder "Write something ..." (`data-placeholder`). Registros de agentes "Default". Plantillas de agentes "+1 More". Reventa de apps category labels. Ganancias "Free". "0 Managed Agents" (count). "19 Tasks" (count). Contact type value "Lead" (select value). Membresías "less than a minute ago". Informes appointment cells "Third Party", "new".

### 4. Odd Spanish (machine translation, usted / tú, Spain Spanish)

Worst ones (meaningless or wrong):
- [ ] Tiendas onboarding modal `#stores-onboarding-modal` (also blocks the page: no close button).
- [ ] Formularios / Encuestas feature cards `#feature-card-N div.text-[15px]` ("Habilitar Clientes para Crear compra…", "Botón de opción Botón").
- [ ] Paneles de marca description and Voz de la marca empty state; Reputación › Directorios (`#online-listings-container`: "Una herramienta para Domine", "No salgas tu reputación…", `#pitch-button` "Listados de activadores").
- [ ] Sitios › Analítica: card label "in" / "in Tasa de conversión", "Página Visualizaciones".
- [ ] Cuentas regresivas "Cuenta atrás" (title, description, empty state).
- [ ] Enlaces de pago empty button "Generar Relación" → "Generar enlace"; Facturas "Factura(s) en Debido" / "en Atrasado".
- [ ] Oportunidad modal: "Actualización" (button) → "Actualizar", title "Añadir una nueva oportunidad" while editing, "Contacto Detalles", "contactos adicional (Máx.. : 10)", "Objetos de los miembros".
- [ ] Contact detail: "Contacto Detalles", "¡Adhiérase para llevar a cabo el seguimiento!".
- [ ] Tareas: "Debido a fecha" → "Fecha de vencimiento".
- [ ] Configuración: "Personalizar oportunidad Configuración", "Descargar-in Dominio", "Creada Activado", "Integraciones Privado", "Solo visible para Tú", "Interrupción de Llamar", and a translated code value `data-debug=«verdadero»` that breaks the instructions.
- [ ] Membresías: "…Portal del cliente y infantil Aplicaciones", "Habilitar O Deshabilitar el Correo electrónico Recordatorio…", "Credencial Emitido / Expirado".
- [ ] Agentes de IA › Primeros pasos hero paragraph ("estás desaparecido El 62%…", "200.000 dólares", "no-show").

Consistency (many pages): the platform mixes *usted* and *tú*, and uses Spain Spanish ("Añadir", "Coste", "vídeo", "Introduzca", "Recogida en tienda", « » quotes). Decide the policy (see Decisions pending) before rewriting it page by page.

### 5. Not fixable from the theme

- Cross-origin iframes: Automatización, Correos electrónicos, Afiliados, Perfil de empresa, Servicios de correo, Calendarios › Reuniones / Preferencias / Mi disponibilidad, Estudio de IA, Auditoría de Marketing Local.
- Canvas charts (labels and colors): Pronóstico "Oportunidades por estado", Sitios › Analítica legends and axes, Informes de citas (statuses, weekdays), Tablero legends.
- Live data and seeded defaults: widget titles, pipeline and stage names, example tasks and businesses, dispositions, SMS defaults, folder names, audit-log sources, conversation activity lines, US date formats.
- Text baked into images: Membresías app banner and tiles, Formularios / Encuestas / QR illustrations.
- White-label leaks seen in Configuración (the platform's own provider name in `#SettingCurrentProvider`, a tracking prefix, a backend service name): content of the platform, not of the theme.

## Design fixes

### v1.3.13 (published, live): Spanish sweep of the remaining views

| Fix | Where | Verified |
|---|---|---|
| Encuestas landing: the 4 bullets were odd machine translations ("Unidad / dispositivo de almacenamiento", "involucrar inmediatamente a Hecho…") and the buttons English / formal → rewritten; "Crear encuesta", "Ver vista previa de la encuesta" | Sitios › Encuestas | capture |
| Códigos QR landing: "Analytics" feature card → "Analítica"; odd bullet "Personalizar el diseño de tu QR y Apariencia" → "Personaliza el diseño y la apariencia de tu QR" | Sitios › Códigos QR | capture |
| Social planner channel "Community" → "Comunidad" | Marketing › Planificador | capture |
| New section `55-configuracion`: Labs welcome card was a platform-blue gradient → accent gradient, theme radius and elevation | Configuración › Labs | capture |

Swept and clean (only brand / product names or live data): Marketing › Fragmentos, Cuentas regresivas,
Enlaces de activación, Paneles de marca; Sitios › Sitios web, Blogs, Cuestionarios, Tiendas, Seminarios web,
Widget de chat; Reputación › Solicitudes, Testimonios en video, Widgets, Configuración; Pagos › Pedidos,
Suscripciones, Cupones, Configuración; Membresías › Cursos, Comunidades, Certificados; Multimedia;
Configuración › Embudos, Calendarios, Sistema telefónico, WhatsApp, Objetos, Registros de auditoría, Integraciones.

### v1.3.12 (published): Estudio de IA under the sidebar

| Fix | Where | Verified |
|---|---|---|
| Estudio de IA is a cross-origin iframe inside `.vibe-page` (absolute, top/left 0, full size) whose containing block was the whole page: it ran under the sidebar (its own menu hidden behind the expanded sidebar, overlapping the collapsed one) and under the header (top of its menu cut) → the section is its containing block; the studio sits as a view card: 6px from the sidebar, 6px under the header, rounded | Estudio de IA | measured both states: studio x = sidebar right + 6, top 70 (header ends at 64); captures |
| The sidebar was `100vh` + 6px top/bottom margins (12px taller than the screen): bottom corners cut and the page could scroll by up to 12px when toggling the sidebar → `height: calc(100vh - 12px)`, inner `.h-screen` columns `100%`; the menu keeps its own scroll | every view | container scrollHeight = clientHeight (935); no scroll after toggling |


### v1.3.11 (published, live): Pagos header overlap

| Fix | Where | Verified |
|---|---|---|
| The opaque fixed header (with the page tabs row) ends at y=134, but Enlaces de pago and Configuración start their content at y=128 (platform `#app .sidebar-v2-location .hl_wrapper.hl_topbar-tabs { padding-top: var(--v2-topbar-height) !important }` = 128px, no inner margin): the header covered the top 6px of the title and the "Crear un nuevo enlace de pago" button → content 12px lower (6px clear) | Pagos › Enlaces de pago, Configuración | measured: content top 140 vs header bottom 134; the other 9 Pagos tabs have their own margin (nothing under the header) |

Note: every view with page tabs gets `--v2-topbar-height` (128px) of padding while the theme header ends at 134px; most views have an inner margin. If another view looks cut at the top, check for content starting at 128.

### v1.3.10 (published, live): assistant labels always in Spanish

v1.3.9 keyed the assistant labels on `html:lang(es)`, but `<html lang>` is not the UI language: the "Brania.Ai" sub-account shows a Spanish UI ("Pregúntale a la IA", "Tablero"…) with `lang="en_US"`, so it got "Ask BRANIA". The labels are now unconditional ("Pregúntale a BRANIA", "¿En qué estás pensando, <name>?", composer reveal), in line with "todo en español".

| Fix | Where | Verified |
|---|---|---|
| Collapsed sidebar tooltips (assistant page): the Bootstrap tooltip showed the original platform name ("Launchpad"…) → each relabelled sidebar item gets the same label in its tooltip (`body:has(<item>:hover) .tooltip .tooltip-inner`, 12 items, generated from the sidebar labels) | assistant page and any collapsed sidebar | hover capture |
| Header view title on the assistant page "Pregúntale a la IA" → "Pregúntale a BRANIA" (theme rule in 310) | assistant page | capture |
| Assistant page left menu "Templates" / "Customize" → "Plantillas" / "Personalizar" | assistant page | capture |

Lesson: do not use `<html lang>` to pick a language; it follows a setting that can differ from the UI text.

### v1.3.9 (published, live): Pregúntale a BRANIA

Decision 2026-10-02 (user): in Spanish the assistant is "Pregúntale a BRANIA" (the platform's own "Pregúntale a la IA" wording with the brand); other languages keep "Ask BRANIA".

| Fix | Where | Verified |
|---|---|---|
| Sidebar item and header AI button tooltip keyed on `html:lang(es)` (the platform sets `<html lang>` from the profile language): Spanish → "Pregúntale a BRANIA", otherwise "Ask BRANIA" | sidebar, header | computed with `lang="es"`; `lang="en"` forced in the page → "Ask BRANIA" |
| Header AI button tooltip flashed the original "Pregúntale a la IA" when the mouse left: the label needs the trigger hovered and the Bootstrap tooltip faded out for 0.15s → Bootstrap tooltips hide instantly (opacity 0, no transition, once `.show` is removed) | header, any Bootstrap tooltip | class/opacity log on hover out: opacity 0 as soon as `.show` is removed |
| Assistant panel title "Ask AI" / "Preguntar a la AI" → fixed label "Pregúntale a BRANIA" (Spanish) / "Ask BRANIA" | Pregúntale a BRANIA panel | computed |
| Assistant panel mounts in English and gets its Spanish strings ~0.5s later (same DOM, only the text changes: not detectable). Greeting → "¿En qué estás pensando, <name>?" (user decision: informal; the name comes from the `user-name` attribute through `attr()` in a custom property, Chrome 133+; fallback "¿En qué estás pensando?"); the composer placeholder cannot be relabelled → with a Spanish profile the composer field fades in after 0.6s. ⚠️ If the platform gets slower, "Ask anything…" may show for a moment: raise the delay in `220-ask-ai-v6.5.css` | Pregúntale a BRANIA panel | mutation log: EN → ES in 0.46–0.51s over 6 opens |

Pattern for any label that must differ per language: prefix the selector with `html:lang(es)` / `html:not(:lang(es))`.

### v1.3.8 (published, live): Ask BRANIA, Oportunidades empty state

Decision 2026-10-02 (user): the AI assistant is "Ask BRANIA" (brand in capitals, like the logo), in the sidebar and the header button.

| Fix | Where | Verified |
|---|---|---|
| Sidebar item `#sb_ask-ai` "Pregúntale a la IA" → "Ask BRANIA" | sidebar | computed; item height unchanged (40px) |
| Header AI button tooltip → "Ask BRANIA". It is a Bootstrap tooltip appended to `<body>` with no link to its trigger, so the label targets `body:has(#hl_header--copilot-icon:hover) .tooltip .tooltip-inner` (while that button is hovered the visible tooltip is its own) | header | hover capture; other header tooltips unchanged |
| Board empty state ("Ninguna oportunidad coincide con los filtros actuales"): the platform overlay `.crm-opportunities-empty-state` (absolute, 60px down) had a solid near-white fill that covered the lower half of the stage headers → transparent (a platform rule kept the fill: `#app` + doubled class); its SVG illustration with white panels → dimmed to the page surface | Oportunidades › tablero vacío | capture |

Not changed: the button's native `title` / `aria-label` (attributes, not stylable).

### v1.3.7 (published, live): Oportunidades board edges

| Fix | Where | Verified |
|---|---|---|
| The board columns sit inside two horizontal scrollers (`stage-scrollable-container`, `opportunities-scroll`) that started 6-8px from the stage headers and cards: their shadows were still cut on the left (pale vertical band) and at the top. The outer one loses its side margin, the inner one gets 16px side padding (cards keep their x) and 10px at the top | Oportunidades › tablero | `bbAudit.clipped()`: 0; capture |

Lesson: v1.3.6 widened the column scroller but not its scrolling ancestors. Run `bbAudit.clipped()` after every shadow fix: it reports the nearest clipping ancestor, fix it and run again.

### v1.3.6 (published, live): Oportunidades

| Fix | Where | Verified |
|---|---|---|
| Board cards: each stage column is a scroller with 2px/6px around the cards, so the raised shadow was cut in straight lines (pale rectangle behind every card) → the scroller grows outward (negative margin + padding; cards keep their position) and cards use the soft shadow (hover a bit higher), which fits | Oportunidades › tablero | card at the same position; capture |
| Active view tab ("Oportunidades abiertas") underline `::after` `#004EEB` → accent | Oportunidades | computed |
| Board / list toggle: 1px outline removed | Oportunidades | computed |
| List view (Tabulator): white table, light header, square cells → the Contactos table theme, shared by widening the 080 / 510 selectors with `:is()` (same specificity: Contactos compare v1.3.5 vs branch = 0 differences) | Oportunidades › lista | capture |
| List cells: status / tag pills (inline white, 1px outline) → soft pills; active sort chip (inline light blue) → accent; contact avatar inline light blue → accent pastel | Oportunidades › lista | capture |
| Pronóstico: three nested scrollers flush with the cards (0px left/top) cut every raised card → outer scroller loses its side margin, content gets 34–48px room | Oportunidades › Pronóstico | `bbAudit.clipped()`: 0 |
| Pronóstico risk rows: straight 3px left border on rounded cards → rounded bar inside (danger / warning / success tokens) | Pronóstico | capture |
| Pronóstico: active "Resumen / Cronograma de previsiones" tab had no indicator → sunken, accent; pipeline select flat → sunken field | Pronóstico | capture |
| Embudos de venta and Acciones en lote: 16px page padding put the table cards against the right edge (shadow cut); the pipelines table sat in an overflow-hidden wrapper of its exact size → 24/36px side padding, wrapper visible, room under the pager | Embudos de venta, Acciones en lote | `bbAudit.clipped()`: 0 |
| Table cards (Acciones en lote, Embudos de venta, Pronóstico summary): a platform view sheet loaded after the theme forced 8px corners → id selectors keep 26px | Acciones en lote, Embudos de venta, Pronóstico | computed: 26px on the three |
| Labels: "Secuencias" page → "Embudos de venta" (title, description, "Crear embudo"), matching the tab; "Acciones en bloque" → "Acciones en lote" | Embudos de venta, Acciones en lote | capture |
| Labels: Pronóstico risk rules ("Slipped 2+ times o 14+ days"…) in Spanish **with the current thresholds hard-coded** (decision 2026-10-02, user). ⚠️ If "Ajuste la configuración de riesgo" changes, update the three texts in `src/labels.json` | Pronóstico | capture |
| Pronóstico summary table: "Ingresos esperados" values come with an inline platform blue → accent, like the legend dot | Pronóstico | computed |

Left in English (live data, not fixable with CSS): chart axis Open / Won / Lost / Abandoned (canvas) and the same names in the summary table: grouped by status, by owner or by close date the table has the same structure (rows only carry an index), so a CSS label would mislabel owners or dates, pager "1 - 2 of 2" / "Page 1 of 1"; the pipeline select default "Todas las secuencias" (its label also shows the chosen pipeline name).

New tool: `bbAudit.clipped()` lists box-shadows cut by an overflow container.
### v1.3.5 (published, live): everything in Spanish

Decision 2026-10-02 (user): "todo debe estar en español".

| Fix | Where | Verified |
|---|---|---|
| Platform product guides hidden (`#pendo-base`, guide container, backdrop, badges): announcements, NPS / "Quick Question" surveys and "Learn More" / "Submit" banners only come in English. Replaces the v1.2.2 survey styling | every view | rule in the preview |
| New section `53-agentes-ia` (generated by `scripts/gen-agentes-ia.mjs`): Primeros pasos promotional page in Spanish (hero, comparison table, 4 feature demos with chats, trust bar, rotating "ship AI" panel with its 4 variants keyed on the active tab) and themed (page surface, raised cards, accent instead of purple; orb and voice orb recolored with filters; deploy button) | Agentes de IA › Primeros pasos | captures, text scan of the whole page |
| Estudio de agentes: title, subtitle, buttons, sort, search, columns, empty state, info banner (accent tint), "Filas por página" / "Anterior" / "Siguiente" | Agentes de IA › Estudio de agentes | capture |
| Agentes por industria: title, tabs (Agentes / Registros), headers, buttons, empty state, the 3 template cards (subtitle, tags, description, capabilities, Precargado, Usar este agente / Próximamente) by their stable ids | Agentes de IA › Agentes por industria | capture |
| New section `54-membresias`: "Su marca. Su aplicación." banner was background images with an English "Learn More" drawn in them → raised themed card with a Spanish "Conocer más →" button | Membresías › Portal del cliente | capture |
| Panel guide card (`nav.launchpad-sidebar`): its scroller and row containers clipped it flush at the left and top, cutting the rounded corners and the raised shadow in a straight line → both containers grow 32px outward (negative margin + padding), nothing moves | Panel | capture; card and list keep their position |
| Labels: "Nuevo" badge in top menus (`.hl_new_badge_top_menu`), "Filas por página" in component pagination | Membresías and any view | capture |

English text sweep (visible text nodes) over Tablero, Conversaciones, Calendarios, Pagos, Oportunidades,
Automatización, Sitios, Configuración, Reputación, Informes, Agentes de IA, Membresías: what is left is
listed under Open findings › Language.

### v1.3.4 (published, live): filters drawer

| Fix | Where | Verified |
|---|---|---|
| Advanced filters drawer: the filter list sat on a white band (`bg-white`) and each group was a light grey box with a 1px border → drawer surface, groups as soft raised panels | Contactos › Filtros | capture |
| Labels: "Borrar todos los filtros" (was "Borra todos los filtros"); table pagination "Anterior" (was "Previo") | Contactos, Tareas | captures |

### v1.3.3 (published): loading states

| Fix | Where | Verified |
|---|---|---|
| List table skeleton (`.table-container > .skeleton-loader`): white overlay with grid lines → page surface, sunken bars | Contactos, Tareas | captures (skeleton forced visible) |
| Contactos: the skeleton started 40px from the top, over the bottom of the sunken header → below the header, inside the card padding | Contactos | capture |
| Component skeleton (`.hr-skeleton`): pulse colors for white cards (#eee → #ddd) → darker tones of the page surface | Oportunidades cards and any view | computed |
| Frozen right header column ("Acciones") opaque, continuing the sunken bar: the overflowing "Debido a fecha" header showed through | Tareas | capture |
| Label: "Contactos asociados" column (was "Asociado Contacts") | Tareas | capture |

Checked during load: Pagos › Facturas (spinner on the page surface) and Empresas: nothing to change.

### v1.3.2 (published): consistency polish

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
"New Lead") and product guides from the platform (hidden in v1.3.5).

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
- [x] "Quick Question" pop-up and the "Learn More" / "Submit" banners: platform product guides in `#pendo-guide-container` : English only and dynamic → hidden in v1.3.5 (decision 2026-10-02: everything in Spanish).
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
- [ ] Dynamic text that CSS cannot translate (live data mixed in one text node): conversation activity lines ("DnD enabled by customer for all channels", "Opportunity … created in …"), counters like "0 Managed Agents", "1 - 20 of 30", "0 - 0 of 0", contact type value "Lead".
- [ ] Dashboard widget titles in English in the Capilea Mexico sub-account ("Opportunity status", "Funnel", "Tasks", "Manual actions", "Lead source report"…) and pipeline / stage names ("Marketing Pipeline", "New Lead"): they are the account's own data; rename them in the platform.
- [ ] Not swept yet: modals and drawers in general (open each one), Agentes por industria › Registros. Agentes de IA now shows only "Agentes por industria" in this sub-account; the other tabs (IA de voz, IA conversacional, Base de conocimiento, Plantillas, IA de contenido, Registros) were clean when they were visible.
- [ ] Configuración › Labs: the beta features catalog (titles, descriptions, "Overview") is English platform content that changes often; left as is.
- [ ] Product names left as they are: "Gokollab Marketplace" (Membresías), Google Contacts / Forms, GBP.
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
1. Purple avatar and header icons: teal or keep? (The Agentes de IA pages were moved to teal in v1.3.5; the platform "AI" purple palette `--purple-*` is still untouched elsewhere.)
2. Sidebar per-item colors (mockup cycle) vs a single teal; muted blue for Conversaciones.
3. Dead selectors: remove the ones that match nothing in any visited view, or only after
   opening the states they could target (modals, menus, tooltips)?
4. Spanish register: the platform mixes *usted* and *tú* and uses Spain Spanish ("Añadir", "Coste", "vídeo"). Rewrite to *tú* + Mexican Spanish everywhere (large: many labels), or only fix wrong / meaningless texts?
5. Per-module sidebar colors confirmed by the inspection (Tablero copper, Calendarios and Automatización violet, Multimedia maroon, Reputación orange): keep the mockup cycle or make all teal (same question as 2).

## Lessons
- **v1.2.0 regression:** `margin` (030) vs a later `margin-bottom: 0` (050) on the same selector.
  The effective-declarations diff did not expand shorthands; now it does, and order-check
  reports shorthand/longhand pairs on the same selector.
- **Font reload noise:** swapping the stylesheet re-registers the web font, so widths and
  heights change everywhere until it loads. Use `bbSnap.compare(prevTag, sha)` (both sides
  through a `<style>`, waits for `document.fonts.ready`).
- **Replacing platform text:** `font-size: 0` on the text element + `::after { content: "…"; font-size: …; line-height: … }` with the original metrics. Only for fixed labels; dynamic text cannot be translated with CSS.
- **Injected component styles** can repeat the theme's selector with `!important` after the theme loads (calendar container): add a type or class to the selector to win on specificity.
- **Label specificity vs late platform sheets:** the platform appends view stylesheets (e.g. Contactos) after the theme, so an equal-specificity `!important` rule of theirs wins. If a label shows both texts, raise its selector above theirs (test by inserting the rule right after the theme `<style>`, not at the end of `<head>`, and wait for the 0.2s transitions before reading computed values).
- **Loading states** only exist for a moment: catch them with a MutationObserver started right after navigating, or force the hidden skeleton visible (`style.display`) to style it.
- **Reload flicker** comes from the platform: it injects the custom CSS (`<style id="customCss">`) after its own interface has painted (about 0.4 s later). Not fixable from CSS.
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
