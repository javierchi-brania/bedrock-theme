# Tracking

Status of the Bedrock theme: section refactors, design fixes and open findings.
Update this file in every PR that changes the theme. How to build, verify and
publish is in [README.md](README.md).

**Live in the platform:** `v1.4.19` (2026-10-06).
**In progress:** `v1.4.20` (Conversaciones: softer column shadow light) in review.

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
| v1.4.0 | feature | Horizontal sidebar logo (hexagon in the raised disc + "BRANIA" wordmark); the uploaded logo doubles as the favicon | live |
| v1.4.1 | fixes | Iframe views as rounded cards below the header (Correos, Automatización, Afiliados, Perfil de empresa, Servicios de correo); single card in Cuentas regresivas; Pregúntale a BRANIA panel as a floating card below the header | live |
| v1.4.2 | fix | Pregúntale a BRANIA composer: typed text no longer doubled | live |
| v1.4.3 | fixes | Agentes de IA: every tab in the theme (Estudio de agentes under the header, Primeros pasos, IA de voz, Plantillas, Base de conocimiento, IA de contenido, Registros, Agentes por industria); theme radios round | live |
| v1.4.4 | fix | Pregúntale a BRANIA composer: 10px between the text field and the buttons | live |
| v1.4.5 | feature | Sidebar logo: raised sphere with the black hexagon and "BRANIA" inside, in relief (user choice after previews) | live |
| v1.4.6 | feature | Sidebar logo: "BRANIA" below the sphere (72px), same logo sizes and block height | live |
| v1.4.7 | fix | Configuración › Objetos: custom object banner grows with its text, theme card, visible button | live |
| v1.4.8 | fix | Configuración › Importar datos: CSV / HubSpot buttons at the same height; header page tabs fit smaller screens (≤1440 / ≤1280 / ≤1024px) | live |
| v1.4.9 | fix | Automatización (Resumen under the header, collapsed sidebar, scaled app on smaller screens); Sitios › Blogs cards and split button; header tabs scroll at every width; Reputación › Mis estadísticas (scrolling, carousel, AI alert, chart colors) | live |
| v1.4.10 | fix | Reputación: Solicitudes search, Widgets, Configuración (8 sub-sections: scrolling, clipped cards, truncated texts, radio cards); "NuevaNuevo" badge | live |
| v1.4.11 | fix | Informes: every tab below the header and within the screen, short tab names, leaderboard readable, theme fields and buttons, filter rails, Citas cards, audit card, chart colors | live |
| v1.4.12 | fix | Configuración: Usuarios, Servicios de correo, Sistema telefónico; Automatización scaling | live |
| v1.4.13 | fix | Team bug list: Objetos banner wrap, Asociaciones box, Contact views tiles, Integraciones privadas width, assistant greeting "Hola <nombre>, ¿cómo puedo ayudarte hoy?" | live |
| v1.4.14 | fix | Acciones rápidas theme, data table footers (pager not cut), dashboard filter menus wider | live |
| v1.4.15 | fix | Conversaciones: menu hover white, task due date/time layout, segment tab hover box, messages card corner, narrow-window column widths, "Contactos" label | live |
| v1.4.16 | fix | Calendarios narrow widths + Servicios theme, Contactos Tareas/Empresas card, Oportunidades embudo menu, selected pill, view tab, list view edges | live |
| v1.4.17 | fix | Oportunidades name hover, Pronóstico palette and table, Pagos tabs on two rows, Plantillas card, table header padding, Crear cupones, radio dot | live |
| v1.4.18 | feat | "Panel" (launchpad) hidden from the left menu | live |
| v1.4.19 | fix | Conversaciones: 20px column gaps, equal card shadows, 28px action buttons, contact details fit in narrow windows | live |
| v1.4.20 | fix | Conversaciones columns: new --bb-shadow-panel token, softer top-left light (no white border); right panel Asociaciones header and Pagos tables fit | in review |

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

- [x] → v1.4.11. **H Informes › Informe del agente:** the leaderboard card `#reporting-agent-dashboard .card.leader-board` gets the page surface (#e9ebec) but keeps its white text (24px title; `th` at rgba(255,255,255,.7)), so it is unreadable. Make the text dark, or keep a dark card.
- [ ] **H Configuración menu:** `#sb_Opportunities-Pipelines` has no visible label. Its label `::after` "Oportunidades y embudos" is 175px inside a 164px `span.nav-title.hl_text-overflow`, and an overflowing atomic inline-block disappears under `text-overflow: ellipsis`. Shorten the label ("Embudos") or let long sidebar labels use `display: inline`. `#sb_domains-urlRedirects` is also cut ("Dominios y redireccion…").
- [ ] **H Membresías › Cursos › Tablero:** the "Haga realidad sus ideas" banner is solid black. `.rounded-xl.overflow-hidden.bg-blue-600 > .absolute.inset-0.bg-black.bg-opacity-20` computes to rgb(0,0,0) at full opacity: the Tailwind opacity variable is probably lost through a theme rule.
- [x] → v1.4.3. **H Agentes de IA › Estudio de agentes:** the page header ("Agentes gestionados" and its buttons) is under the fixed header. `#agent-studio-container` padding-top is 92px but `header.hl_header` ends at 134px. Check whether this is a regression from the v1.3.12 header and sidebar changes.
- [x] → v1.4.1. **H AI assistant panel** (Tamaulipas): its toolbar (Nuevo chat, Cerrar) is under `header.hl_header`, so the close button is hidden. `.askai-sidebar` / `.askai-sidebar__main` are #fff with 0 radius.
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
- [x] → v1.4.3. H Agentes de IA › Agentes por industria: `div.ia-canvas` #fff with 1px #eaecf0 border; `div.home` #f9fafb; `div.home-tabs` #fff; card bodies `div.template-card__body` and pills `span.template-card__subtype-pill` white.
- [x] → v1.4.3. H Agentes de IA › Estudio de agentes (`.sa-shell-host`, `.agents-shell`, `.agents-page`, `.agents-page__footer`), Registros de agentes (`#agent-logs-content`, `div.metrics-stat-card`, `div.metrics-chart-card`, `.chart-type-toggle`), IA de contenido (`div.hl-statistic`): white.
- [ ] H Sitios › Analítica: KPI cards `label.hr-radio-button.ui-radio-group-item.compact-radio-item` are white with 12px corners; the selected one has a 1px #155eef border and a blue title. Segment rail `.hr-tabs--segment-type .hr-tabs-rail` is flat #f7f7fa.
- [ ] H Reputación › Configuración: selected radio card `label.hr-radio-button--checked.ui-radio-group-item` is white with a #155eef border. Widgets segment: capsule white and raised, rail #f7f7fa (selected must be sunken).
- [ ] H Configuración › Objetos: the empty-state banner → v1.4.7; still open: (`.custom-obj-list .ui-header` white with a 1px border, title #004eeb), Redireccionamiento de URL (`.hl-statistic` white with a 1px border, 8px radius), Integraciones (`.integration-card .card-header` #fff, card radius 4px).
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

### v1.4.20 (in review): Conversaciones column shadow

| Change | Where | Verified |
|---|---|---|
| With the whole shadow visible (v1.4.19), the raised top-left light read as a white border around the tall column cards, most of all the right panel → new token --bb-shadow-panel (same drop, light 55% / 6px / 16px) on the list, messages and right panel cards | Conversaciones | capture before/after |
| Right panel, all ten views checked at 1420 and 1920: Asociaciones header ("Gestionar asociaciones" past the card, even at 1920) → actions wrap to a second row; Pagos tables scrolled sideways → card width | Right panel › Asociaciones, Pagos | 1420 frame and 1920: nothing past the card, no sideways scroll |
| Boxes cut by their scroll boxes: Asociaciones "Companies" box flush with the top (corners and shadow cut) → 10px on top; Contacto field sections flush with the virtual list sides → 6px each side | Right panel › Asociaciones, Contacto | 1920 capture |

### v1.4.19 (published, live): Conversaciones

| Change | Where | Verified |
|---|---|---|
| Column gaps 28px and 40px → 20px each at every width; right panel icon column 52 → 44px | Conversaciones | 1420: gaps 20/20, messages card 466px |
| List and right panel shadows clipped 20px above them (the messages card showed its whole shadow) → same shadow on all three | Conversaciones | capture |
| Action buttons (filter, call, star, mail, trash) 24px icons → 28px round theme buttons, 16px icons (like the inbox submenu) | Messages header | capture |
| Contact details card 226px at 1420: "Seguidores", tabs and phone row ran past it → right panel min 330px, thinner padding (card 272px), Propietario/Seguidores stack only when their content does not fit side by side | Right panel › Detalles del contacto | 1280 (submenu + contact open): card 272, messages 222, nothing past the card; 1420: stacked; 1920: side by side, messages 724 |

### v1.4.18 (published, live): hide "Panel"

| Change | Where | Verified |
|---|---|---|
| "Panel" (platform launchpad) entry hidden from the left menu at the team's request; the page itself still opens from a direct link | Left menu | capture: "Pregúntale a BRANIA" then "Tablero", no gap |

### v1.4.17 (published, live): bug list (Oportunidades, Pronóstico, Pagos)

| Change | Where | Verified |
|---|---|---|
| Bug 1: name hover in the platform blue → accent | Oportunidades, list view | computed color |
| Bug 2: Resumen values, legend, chart bars (canvas hue shift) and Cronograma progress, pill, amounts, won cards, white header/buttons → success/accent/theme; summary table side padding 22–24px; Total row aligned with its columns (it was shifted by the footer padding and overlapped at 1100px) | Oportunidades › Pronóstico | 1920 and 1100 |
| Bug 3: sections out of reach in narrow windows → wrap to a second row (Pagos only) + 22px more room on top up to 1600px | Pagos header | 1280 and 1100 frames: two rows, nothing overlaps (Facturas, Plantillas, Colecciones, Crear cupones) |
| Bug 4: table card in a same-color square box that clipped its shadow → rounded card with full shadow | Documentos y contratos › Plantillas | capture 1920, 1100 |
| Bug 5: search box touching the card's rounded corner (the pager overflow was already fixed in v1.4.14) → table header padding (global) | Productos › Colecciones | capture; Usuarios keeps its own header padding |
| Bug 6: "Atrás" a 33px circle → pill; white top/bottom bars → theme; two-column grid pushing the end date out of the card at 1100 → one column when two do not fit; checked radio dot ("Para siempre") off-centre by a newer platform rule → centred (global) | Cupones › Crear | 1920 and 1100; dot 2px each side |

### v1.4.16 (published, live): bug list (Calendarios, Contactos, Oportunidades)

| Change | Where | Verified |
|---|---|---|
| Bug 1: in narrow windows (1100px) the view toolbar, Alquileres/Servicios tabs and buttons, Tarifas adicionales header and Configuración global columns broke words or ran past the edge → whole words, second row; Servicios had no theme (white, blue) → the Alquileres rules cover it; its table card shadow was clipped at the corners → room for it | Calendarios (vista, Configuración › Alquileres, Servicios) | 1100 and 1280 frames; Reuniones/Conexiones are an embedded app from another domain (frame only) |
| Bug 2: Tareas and Empresas were a near-white square panel 86px below the tabs, cut at the bottom (pager hidden), filter chips on two lines → theme card filling the window, pager inside, chips on one line | Contactos › Tareas, Empresas | 1589px capture; 1100 frame: chips wrap, nothing past the card |
| Bug 3: embudo selector menu as narrow as the selector (names cut) → min 260px | Oportunidades | capture |
| Bug 4: "N clientes potenciales seleccionado" pill in platform blue → accent pill | Oportunidades (selecting cards) | capture |
| Bug 5: first view tab "Oportunidades abiertas" cut at 130px → 180px, filter bar moved; list view table wider than the toolbar with its header cut at both ends → aligned; up to 1366px the filter bar gets its own row (buttons were breaking into 2–3 lines) | Oportunidades | 1100, 1280, 1367, 1440 frames: no overlap, no wrapped buttons |
| Bug 6: ⋮ menu in Embudos de venta does not close when the ⋮ is clicked again: same with the theme off (platform behavior); it closes with a click outside or Esc | Oportunidades › Embudos de venta | theme on/off |

### v1.4.15 (published, live): Conversaciones bug list

| Change | Where | Verified |
|---|---|---|
| Bug 1: "Mi bandeja de entrada" / "Visualizaciones" turned near-white on hover (platform accordion hover) → theme background; same fix on the contact panel sections | Conversaciones, left menu | computed hover bg |
| Bug 2: task "Fecha de vencimiento" date, time and AM/PM squeezed in one row → date full width, time + 96px AM/PM below | Conversaciones › contact rail › Tareas › Añadir | 1920px rail capture |
| Bug 3: square box on hover over "Próximo"/"Pasado" (conversations tab hover rule) → no box, accent text | Citas / Documentos panel | hover "Pasado": bg transparent |
| Bug 4: messages card corner looked hard: parent overflow clipped the soft shadow flush → overflow clip with 32px margin | Conversaciones, messages card | capture |
| Narrow windows: at 1280 with submenu and right panel open the messages column was ~150px (one word per line) → list 250–320px and right panel 300–352px follow the window width; up to 1440 tighter gaps, rows, submenu and header actions; avatar/name hide when the header is too narrow for a readable name (≤290px) | Conversaciones | 1278px: messages 246px, header and Tareas header inside; 1440 (frame): messages 356px; 1920 unchanged |
| Task form at narrow right panel: "Objetos asociados" header wraps "Asociar a"; "Contacts (n/10)" label → "Contactos" (the platform count is one text node with the name, so it is not kept) | Conversaciones › Tareas › Añadir | 1278px: form fits, no horizontal scroll |

### v1.4.14 (published, live): team bug list 2

| Change | Where | Verified |
|---|---|---|
| Acciones rápidas popover: white, grey items, blue icons → raised card, raised items sinking on hover, accent icons | sidebar › Acciones rápidas | computed; capture |
| Data table footers (`.hr-data-table-wrapper-footer`, global): no side padding, last pager button in the 26px rounded corner, cut → 18px sides, 12px bottom | Tablero › Lead Source Report (and every hr-data-table) | "Siguiente" inside the card |
| Tablero filter menus as narrow as the filter (options cut) → min 220px | Tablero | full user names visible |
| Not theme (same with the theme disabled): filters open only on the second click right after the page loads (first click focuses); a filter or the ⋮ menu does not close when its trigger is clicked again (only clicking outside); clicking a task opens the contact detail with the Activity panel | Tablero | compared theme on/off with real clicks |

### v1.4.13 (published, live): team bug list

| Change | Where | Verified |
|---|---|---|
| Bug 1 (Objetos banner): the reported capture showed the pre-v1.4.7 look (white box, invisible button), already fixed; added: in narrow windows the button wraps below the text inside the card | Configuración › Objetos | 848px: text 304–764, button below it inside the card |
| Bug 2 (Asociaciones): white info box, fixed 68px, text spilling and the button overlapping the table title → grows, wraps, theme card, accent link | Objetos › Contactos › Asociaciones | 848px: box 233–355 holds text and button |
| Bug 3 (Personalice la vista): near-white page background, flat dashed "Añadir vista" tile → transparent, sunken theme tile, radius lg | Objetos › Contactos › Personalice la vista | capture |
| Bug 4 (Integraciones privadas): app as wide as the window but starting after the sidebar, "Crear Nueva Integración" past the right edge → fits | Configuración › Integraciones privadas | 848px: button 627–816 |
| Objetos › Contactos tabs: platform translation "Personalizar campos para añadir Contact" / "… detalles de contact" → "… añadir contactos" / "… detalles del contacto" (only on the Contactos object: keyed on its contact-views tab) | Objetos › Contactos | computed ::after |
| Bug 5: assistant greeting "Hola <nombre>, ¿cómo puedo ayudarte hoy?" (fallback "Hola, ¿cómo puedo ayudarte hoy?") | Pregúntale a BRANIA | computed ::after |

### v1.4.12 (published, live): Configuración › Usuarios, Servicios de correo, Sistema telefónico

| Change | Where | Verified |
|---|---|---|
| Sistema telefónico header card (title + tabs) started at y=48 under the header, no padding, container wider than its slot → starts at 76, padding, gutters, fits | Configuración › Sistema telefónico | header 248,76–1374,146 in a 1402px window |
| Configuraciones adicionales: selected radio card with the platform 1px blue focus outline → none (all radio cards); "Visible solo para propietarios" note clipped by its overflow-hidden column (cut corner) → visible, radius lg; KYC card shadow clipped by the tab pane → room | Sistema telefónico › Configuraciones adicionales (Proveedor de telefonía, Verificación KYC) | clip audit: pane clip gone; captures |
| Centro de confianza: "Learn More" text buttons with the theme pill shadow and no padding (20px) → 36px pills, "Más información"; "Start Registration" → "Iniciar registro"; hero banner light blue → accent tint card | Sistema telefónico › Centro de confianza | capture |
| Servicios de correo and Automatización (cross-origin apps that break on smaller screens): the iframe is laid out at least 1320px wide and scaled down to the card width (container query units + typed calc division; scale 1 when the card is wider). Replaces v1.4.9's fixed 0.88 under 1440px, which was not enough on smaller screens | Configuración › Servicios de correo, Automatización | 1244px window: scale 0.733, pill inside its card; Chrome 154 supports typed division |
| "Añadir usuario" in the top-right corner of the table card, cut by its 26px corner → header/footer padding; search 154px for a 353px placeholder → 410px (input 356px); p-1 wrapper clipped the card shadow → visible | Configuración › Usuarios | button 1264–1391 inside the card; input 356 ≥ 353 |

### v1.4.11 (published, live): Informes

| Change | Where | Verified |
|---|---|---|
| Dashboards in `section.hl_wrapper--inner` started at y=128 under the header ("Recuperar" cut) and were wider than their slot (right edge 1622 in a 1598px screen) → start at 140, fit, room for shadows | Informe del agente, Google Ads, Meta | wrapper 248,140–1580,913; button 141–181 |
| Scrolling dashboards started at y=128 (sticky filter bar under the header); Informes personalizados was 100vh from y=128 (last 128px unreachable) → start at 140, fit the screen | Llamadas, Atribución, Citas, Informes personalizados | scrollers 140–935 |
| Leaderboard card: white text on the theme surface → theme text; blue "Recuperar" / "Comparar" → accent; white selects / date pickers → sunken fields | Informe del agente (fields: all report dashboards) | capture |
| Auditoría: full-bleed cross-origin iframe past the right/bottom edges → card under the header | Auditoría de marketing local | frame 248,140–1580,917 |
| Table filter tabs (square raised, shadows cut) → sunken pill rail, active raised; "Fuentes" table header near-white → transparent | Llamadas, Citas (any table filter bar) | capture |
| Report tabs row did not fit (8 long names; "Informe de anuncios de Meta (anuncios de Facebook)" ~340px), the active tab ended cut at the edge → short names: Personalizados, Google Ads, Meta Ads, Atribución, Llamadas, Agentes, Citas, Auditoría (labels.json) | Informes (header tabs) | 1438px: row 1196/1196, no overflow |
| Citas status cards: width followed each label and two wrapped (taller, numbers lower) → equal grid columns (min 126px), one-line 13px labels, same height | Informes › Citas | 8 × 129.5px, all tops 302 |
| Google Ads / Meta Ads title bar: no padding (42px, title on the edge), date field 200px cutting the range → padding 16/20, 250px field, accent "Enviar comentarios" | Google Ads, Meta Ads | field 250px for a 214px value; captures |
| ECharts canvases: platform blue → teal via hue-rotate on Atribución and Citas only | Atribución, Citas | capture |

### v1.4.10 (published, live): Reputación › Solicitudes, Widgets, Configuración; header badge

| Change | Where | Verified |
|---|---|---|
| Configuración scrolling: the content column was not height-limited (block wrapper in the flex chain), the card ran ~130px past the screen; Solicitudes de SMS could not be scrolled to its end; Integraciones kept the platform list in a 329px inner scroller → tabs box fits the screen, content column scrolls, Integraciones card scrolls as a whole | Reputación › Configuración | pane 146–917 in a 935px viewport; Integraciones 3799/757 scroll |
| Clipped shadows/corners (cards flush with overflow wrappers; outer card 8px) → room, radius lg | Configuración (Reviews AI, Enlace de reseña, Reseñas spam, Integraciones) | clip audit: only partial shadow clips left |
| Connect-accounts banner fixed 238px: a wrapped account overlapped the list → auto height; cards min 240px (3 per row) | Configuración › Integraciones, Resumen | capture |
| Ellipsis-truncated texts with room (field labels, "Elige plantillas…", "Establecer plantillas…", integration names) → wrap; the row's labels share 40px so the selects stay aligned | Configuración (SMS, correo, Integraciones) | selects at the same top (333) |
| Integraciones search placeholder cut (183px in 124px) → 260px field | Configuración › Integraciones | measured |
| Radio cards (`label.hr-radio-button.ui-radio-group-item`, global): white, blue 1px border when selected, blue icon discs → theme cards, selected sunken, accent icons | Reviews AI, Enlace de reseña, Reseñas spam (same component elsewhere, e.g. Sitios › Analítica, not re-checked) | captures |
| Integraciones card corner: the wrapper around the card clipped its shadow square (light notch at the top-left corner) → overflow visible | Configuración › Integraciones | zoom capture |
| "Añadir página" (Enlaces personalizados): icon wrapped above the text, 45px of content in a 40px button → one line | Configuración › Integraciones | content 645–665 inside 635–675 |
| Radio dot centered at any size (inset 0 + margin auto; the 16px dot of the radio cards had it 1px off) | radios everywhere | center offset 0,0 |
| Left tab menu: the 2px active-tab bar had the theme inset shadow and read as a dark line sliding on every change → hidden (active tab keeps its accent text) | Configuración, any left bar-type tabs | zoom capture |
| Tab "Reviews AI" → "IA de reseñas"; upgrade sparkle image purple → accent (hue-rotate) | Configuración | |
| Widgets: below ~1100px the preview's min-content width kept the page section from shrinking, the page ran past the screen and the side panel ("Por defecto" card, "Editar el widget") was cut → section and preview column can shrink | Reputación › Widgets | 1024px sized iframe: section 230–1024, card 804–1008 |
| "Widgets guardados / Plantillas" segment: flat #f7f7fa rail, white raised capsule → raised group, active option sunken; saved widget cards radius lg | Reputación › Widgets | zoom capture |
| v1.4.8 regression: ≤1440px the tab font-size rule also hit the "Nuevo" badge and overrode the labels' font-size: 0, so it read "NuevaNuevo" → badge excluded | header tabs (Reputación › Testimonios en video) | computed: badge original text hidden again |
| Search field `#review-requests-search-filter` 320px for a 351px placeholder plus the icon → 450px (input 370px) | Reputación › Solicitudes | zoom capture: full placeholder |

### v1.4.9 (published, live): Automatización, Sitios › Blogs, header tabs, Reputación

| Change | Where | Verified |
|---|---|---|
| Mis estadísticas scrolling: the dashboard card (`#dashboard-layout-container`, fixed calc(100vh - 160px)) ran 25px past the screen and all statistics lived in a 385px inner scroller → card fits the screen and scrolls as a whole | Reputación › Resumen | card 254,185–1454,917; scrolled to the end |
| Connect-accounts carousel in the first (auto) grid column (arrows display:none): half width, next card cut → full width; accounts wrap in a grid (min 300px) instead of scrolling, so no card is cut | Reputación › Resumen | 3 accounts in one row 302–1440; capture |
| "Recapitulación de IA" alert: tint + 1px teal border (`.hr-alert__border`) → raised theme card | Reputación › Resumen | capture |
| Highcharts SVG: platform blues (#2caffe, #155eef, #2970ff, #5d7ffb, #528bff, #84adff, gradient stops) → accent shades; grid lines → divider; blue/purple icon chips → accent tint | Reputación › Resumen | 0 blue elements left in the dashboard |
| Not fixable here: chart axis labels "5 stars" and the date placeholders "DD / MM / YYYY" are generated text inside the charts / inputs | Reputación › Resumen | |
| Blogs: three nested raised layers (list card > stat wrappers 26px > bordered 12px boxes, shorter than their wrapper so a second broken edge showed; table card inside the list card) → list card and stat wrappers flat; each stat one theme card, same height | Sitios › Blogs | stats 253–394 all three; capture |
| "Crear un blog" split button: dropdown half was a separate round raised button over the square end of the main one (looked cut) → one pill, divider, one shadow | Sitios › Blogs | zoom capture |
| Header tabs: the sideways scroll now applies at every width (Sitios has 14 tabs and overflowed at 1314px); header min-height 128px because the scroller no longer sizes it | every page with header tabs | Sitios at 1314px: all tabs reachable, header 6–134 |
| Collapsed sidebar (≤1024px): `#workflowBuilder` gets `hl_sidebar-v2-collapse-container` instead of `-open-container`, so the v1.4.1 card rule did not apply (no gutters, past the right and bottom edges) → the rule covers both classes | Automatización (both tabs) | 1024px sized iframe: frame inside the viewport with gutters |
| Resumen mounts the workflows iframe in a plain `div.hl_topbar-tabs` (no `.hl_wrapper`, no topbar padding): the card started at y=12, its top under the header → 128px padding like the Flujos de trabajo tab | Automatización › Resumen | frame 248,140–1367,916 in a 934px viewport (18px bottom gap) |
| Inside the iframe the app breaks on smaller screens ("Requiere revisión" out of its card, sideways scrollbar at ~1024px) and cannot be styled (cross-origin) → ≤1440px the iframe is laid out 12% wider and scaled to 0.88 (same card size, the app gets the room of a larger screen) | Automatización (both tabs) | 1146px window: button inside its card; frame 80,140–1128,917 |

### v1.4.8 (published, live): Importar datos cards, header tabs on smaller screens

| Change | Where | Verified |
|---|---|---|
| Method cards (CSV / HubSpot): the cards stretched to the same height but not their content, so each footer (divider + button) sat under its own text and the buttons were at different heights → content fills the card (`.hr-card:has(#import-card-footer)` flex column), footer pinned to the bottom | Configuración › Importar datos | buttons both at 349–389; capture |
| Header page tabs (`.topmenu-nav`) on smaller screens: below ~1600px long modules did not fit, the title wrapped, the fixed header grew 128 → 156px and covered the page top (reported in Agentes de IA › Estudio de agentes at 1365px), and the last tabs were cut → header height fixed: title never wraps; ≤1440px compact tabs (13px, 5px padding); ≤1280px title hidden (module name is in the breadcrumb), 12px tabs; ≤1024px the row scrolls sideways (hidden scrollbar, right-edge fade) with 260px of pass-through room below so tab dropdowns are not clipped | every page with header tabs | 1365px (real window): header 134, last tab inside; 1024 and 768px (same page in a sized iframe): header ≤134, content not covered; Marketing › Afiliados dropdown fully visible at 1024px |

### v1.4.7 (published, live): Objetos banner

| Change | Where | Verified |
|---|---|---|
| "Cree su propio objeto personalizado" banner (`.custom-objects-list .bg-white.flex.ml-6 > .ui-header`): white, 1px border, fixed 72px height (its two lines spilled below the box in narrow windows), blue text and star → height grows with the text, theme card (radius lg, soft shadow), text / accent | Configuración › Objetos | at 1372px wide: box 636–752, text inside; capture |
| Its button `#empty-custom-objects-list-btn-primary`: pale blue fill under the theme's white primary text (label invisible) → accent fill | Configuración › Objetos | capture |
| Not fixable: Perfil de empresa header "Información general" overlapping "Id. de la ubicación" in narrow windows is inside the cross-origin settings iframe | Configuración › Perfil de empresa | iframe src checked |

### v1.4.6 (published, live): wordmark below the sphere

User choice: the "BRANIA outside" variant at the v1.4.5 logo sizes. Sphere 92 → 72px (top 6px) with only the hexagon (36px) in it; wordmark (72 × 9px) below, outside the sphere, both in relief. Block stays 108px tall, so the menu does not move. Collapsed: 40px sphere, top 8px (centered in the 56px block). Verified with an in-page override on the live v1.4.5 assets.

### v1.4.5 (published, live): bubble sidebar logo

User choice after in-page previews (vertical / horizontal, black / grey, flat / sphere / relief): the original bubble look in black. The uploaded logo (hexagon on a light disc) stays as the favicon; the theme draws the sidebar logo.

| Change | Where | Verified |
|---|---|---|
| Sphere 92px (`::before`: radial gradient lit from the top left, raised outer shadow, inner shading) with the black hexagon (36px, new `assets/brand/brania-mark-black.png` cropped from the brand artwork) and the wordmark (72px wide) inside, both in relief (`::after`, white highlight + soft shadow). Sizes follow the first bubble logo; block 80 → 108px tall | sidebar | in-page preview with absolute asset URLs, captures |
| Collapsed sidebar: 40px sphere with the hexagon only | sidebar (collapsed) | preview |
| Replaces the v1.4.0 horizontal layout (disc + wordmark to the right). Same key: nothing changes while the logo is the previous upload (`a180a840-…`) | sidebar | |

### v1.4.4 (published, live): assistant composer spacing

| Change | Where | Verified |
|---|---|---|
| The point / dictation / voice buttons touched the text field (0px) and each other (6px) → 10px gaps, also between "+" and the field | Pregúntale a BRANIA panel and page | rects: + 1393–1429, field 1439–1748, buttons 1758 / 1804 / 1850; zoom capture |

### v1.4.3 (published, live): Agentes de IA visual pass

New hand-written section `56-agentes-ia-fixes` (after `55-configuracion`; the generated `53-agentes-ia` keeps the texts).

| Change | Where | Verified |
|---|---|---|
| Container padding 92 → 118px: title and buttons start at y=140 (were under the header); near-white shells → page surface; table header/footer padding so the 26px corners do not cut the sort button and pager | Estudio de agentes | title rect 258,140 |
| Feature sections, demos, bubbles, badges, tabs, buttons in the theme | Primeros pasos | captures |
| Stats, chips, orb (accent glow, canvas hue-rotate), gradient text, hint | IA de voz | captures |
| Radios (global `.hr-radio`): the sunken shadow was on the square 18x24 dot wrapper, the dot white with a blue center → sunken round dot; checked: raised accent dot with a surface center. Constant 1px transparent border: the platform adds one on hover and the center is placed for it (without it the center sat 1px off and jumped on hover) | Plantillas de agentes (filters) and every theme radio | zoom capture |
| Template cards: lavender header artwork with square corners → accent tint, clipped by the card; "Gratis" pill accent tint; first row's shadow had no room at the scroller top | Plantillas de agentes | capture, clip audit |
| "What's new" carousel: mint/lavender gradient, blue border, purple icon → raised surface, accent icon and dots. Table card inside the list card (two cards, shadow cut on all sides) → one card | Base de conocimiento | clip audit |
| Stat cards white/8px → raised theme cards, accent icons; source filter (square raised buttons) → sunken pill rail with the active one raised; upgrade link purple → accent; the Texto/Imagen pane wrapper (overflow hidden) cut the cards' shadows flat → widened with negative margin + padding; labels "IA de contenido", "Texto", "Imagen", "Pasar al plan ilimitado de Empleado IA" | IA de contenido | capture, scan |
| Table header/footer padding (filter chips and pager were cut); "7/10 columnas" near-white → surface; Métricas: 20+ white stat/chart cards → soft raised; bars/line toggle → sunken pill | Registros de agentes | clip audit, capture |
| App 1696px wide in a 1654px slot (24px past the viewport) and starting at y=128 → fits, starts at 140; gallery taller than its slot (canvas bottom cut) → fits; near-white page, white canvas, blue/green/purple heroes and avatars → surface, accent | Agentes por industria | rects 248,140–1902,917; canvas 264,196–1886,901 |

### v1.4.2 (published, live): assistant composer text

| Change | Where | Verified |
|---|---|---|
| The composer draws the typed text in the textarea (theme font) and in a mirror layer on top (`.askai-composer-textarea__mirror`, Inter): different fonts, so the two copies did not line up and the text looked doubled → the mirror uses the theme font | Pregúntale a BRANIA panel and page | both copies start at the same point with the same font; zoom capture |

### v1.4.1 (published): iframe views and the assistant panel

Iframe views were full-bleed squares whose top was cut under the fixed header (ends at 134px with page tabs, 64px without). They are now cards starting 6px below the header, with 18px side gutters, radius lg and a soft shadow.

| Change | Where | Verified |
|---|---|---|
| `#emailHome` margin 45px 18px 0, height to the viewport bottom; iframe rounded | Marketing › Correos electrónicos | rect 266,140–1874,973 |
| `#workflowBuilder` (inside the 128px platform padding) margin 12px 18px 0; iframe rounded | Automatización | rect 248,140–1902,973 |
| Affiliate manager iframe: margin 12px 18px 0, rounded | Afiliados | capture |
| `#companySettingsPage` (inline 100vh inside 86px padding: bottom 86px cut) → height to the viewport bottom, gutters, iframe rounded | Configuración › Perfil de empresa | rect 266,86–1884,973 |
| `#isvAppSection` started at y=50 under the 64px header → margin 20px 18px 0; iframe rounded | Configuración › Servicios de correo | rect 248,70–1892,973 at the commit SHA |
| Table inside the page table card (`.ui-table-container__wrapper` > `.hr-data-table-wrapper`): two cards, each with its own shadow and radius (18 / 26) → one card: the inner one is flat and transparent, the outer clips it | Marketing › Cuentas regresivas (and any page with the same nesting) | capture at the commit SHA |
| Assistant panel opened from any section: top 0 under the header (toolbar with Nuevo chat / Cerrar hidden), white, square → floating card top 140, right/bottom 6, page surface, raised. The full assistant page (`#ask-ai-container-pmd`) is untouched | Pregúntale a BRANIA panel | rect 1404,140–1904,985, toolbar visible |

### v1.4.0 (published, live): horizontal logo and favicon

The platform has a single white-label "Logo" image, used for both the sidebar logo and the favicon (no separate favicon field). The previous upload had the bubble and the "BRANIA" text baked in, so the favicon was a squashed logo.

| Change | Where | Verified |
|---|---|---|
| New logo to upload: `assets/brand/brania-logo-upload-512.png` (black hexagon on a light disc, transparent outside; readable on dark and light tab bars). The user uploads it in agency settings › Company › White Label › Logo | favicon, sidebar | previews at 16/32/64px on dark/light tabs |
| Sidebar: hexagon disc (52px, soft shadow = raised) + wordmark `assets/brand/brania-wordmark.png` (cropped from the original artwork, black; its letters cannot be matched with a font) to the right; collapsed: only the disc (40px) | sidebar | in-page preview with the new image; logo block 122 → 80px tall |
| Keyed on the logo NOT being the previous upload (`a180a840-…` in the src): with the old image nothing changes, so the theme can ship before the upload | sidebar | old image: unchanged |

Notes: the wordmark is referenced relatively (`../assets/brand/…`), so it resolves on jsDelivr from the tagged `dist/`; in a `bbSnap.preview()` (CSS inlined in the page) it does not load — expected. If the logo is replaced again, update the `a180a840` key in 20-sidebar.

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
