#!/usr/bin/env node
// Generates src/53-agentes-ia.css (Spanish texts and theme for Agentes de IA pages).
// Edit this file, not the CSS:  node scripts/gen-agentes-ia.mjs && npm run build
import { writeFileSync } from 'node:fs';
const L = '.ai-value-landing';
const q = (s) => s.replace(/["\\]/g, '\\$&');
const rules = [];
const label = (sel, text, m) => rules.push({ sel: `${L} ${sel}`, text, m });
const tab = (n) => `${L}:has(.ship-ai-tab:nth-child(${n}).ship-ai-tab--active)`;
const dyn = (n, sel, text, m) => rules.push({ sel: `${tab(n)} ${sel}`, text, m });

label('.hero-eyebrow', 'Plataforma impulsada por IA', '11px/16.5px');
label('.hero-toast:nth-of-type(1) .hero-toast-title', 'Reseña respondida', '13px/15.6px');
label('.hero-toast:nth-of-type(1) .hero-toast-time', 'hace 5 s', '11px/16.5px');
label('.hero-toast:nth-of-type(2) .hero-toast-title', 'Cita confirmada', '13px/15.6px');
label('.hero-toast:nth-of-type(2) .hero-toast-time', 'hace 8 s', '11px/16.5px');
label('.hero-stats-item:nth-of-type(1) .hero-stats-label', 'Llamadas atendidas', '11px/16.5px');
label('.hero-stats-item:nth-of-type(3) .hero-stats-label', 'Citas agendadas', '11px/16.5px');
label('.hero-stats-item:nth-of-type(5) .hero-stats-label', 'Mensajes', '11px/16.5px');
label('.compare-table-title', 'Los números no mienten', '28px/33.6px');
label('.compare-table-sub', 'El 80% de los leads se pierde en los primeros 5 minutos. Responde al instante y gánale a tu competencia.', '15px/24px');
label('th.compare-col-estimate .compare-header-cell > span:nth-of-type(2)', 'Estimado', '13px/19.5px');
label('.compare-table-native tbody tr:nth-of-type(1) .compare-impact-badge', 'Muy alta', '12px/18px');
label('.compare-table-native tbody tr:nth-of-type(6) .compare-impact-badge', 'Muy alta', '12px/18px');
['+$12k–$28k', '+$8k–$18k', '+$6k–$14k', '+$4k–$10k', '+$2k–$6k', '+$15k–$40k'].forEach((v, i) =>
  label(`.compare-table-native tbody tr:nth-of-type(${i + 1}) .compare-estimate-cell`, `${v}/mes`, '13px/19.5px'));
label('section.feature-row:nth-of-type(3) .feature-eyebrow > span', 'Agendador de citas', '11px/16.5px');
label('section.feature-row:nth-of-type(2) .agent-conversation-panel__title-text', 'Conversión de leads', '14px/21px');
label('section.feature-row:nth-of-type(3) .agent-conversation-panel__title-text', 'Agendador de citas', '14px/21px');
label('.agent-conversation-panel__agent-label-text', 'Agente de IA', '14px/21px');
const it = (f, i, row, cls) =>
  `section.feature-row:nth-of-type(${f}) .agent-conversation-panel__interaction:nth-child(${i}) > :nth-child(${row}) .agent-conversation-panel__${cls}`;
label(it(2, 2, 1, 'user-text'), 'Me parece bien. ¿Me puedes mandar los precios?', '14px/22.4px');
label(it(2, 2, 2, 'user-text'), 'Y, ¿cuál es la forma más rápida de empezar?', '14px/22.4px');
label(it(2, 2, 3, 'agent-text'), 'Claro. Ya te mandé los precios; el siguiente paso más rápido es agendar una llamada de bienvenida de 15 minutos.', '15px/25.5px');
label(it(3, 1, 1, 'user-text'), 'Necesito cambiar mi cita. ¿Tienes algo después de las 4 PM hoy?', '14px/22.4px');
label(it(3, 1, 2, 'agent-text'), 'Sí, puedo pasarte a las 4:30 PM hoy. ¿Confirmo ese horario?', '15px/25.5px');
label(it(3, 2, 1, 'user-text'), 'Las 4:30 PM me quedan bien.', '14px/22.4px');
label(it(3, 2, 2, 'user-text'), 'Mándame también la dirección por mensaje, por favor.', '14px/22.4px');
label(it(3, 2, 3, 'agent-text'), 'Listo. Tu cita quedó a las 4:30 PM y ya te mandé la dirección a tu celular.', '15px/25.5px');
label('.review-reply-preview-card__title', 'Agente de respuesta a reseñas', '14px/17.5px');
label('.review-reply-preview-card__subtitle', 'Respuestas con IA a las opiniones de tus clientes', '14px/19.6px');
label('.review-reply-preview-card__reply-label-text', 'Agente de IA · Respuesta automática', '14px/21px');
label('.trust-eyebrow', 'La confianza de toda la plataforma', '11px/16.5px');
label('.ship-ai-eyebrow', 'Encuentra los agentes ideales para tu negocio', '13px/18.2px');
label('.ship-ai-heading', 'Lanza IA a tu manera', '38px/41.8px');
const tabs = [
  ['Agente de voz', 'Configuración más rápida'],
  ['Agente de ventas', 'Ideal para captar leads'],
  ['Agendador de citas', 'Genera más citas'],
  ['Gestor de reputación con IA', 'Resultados con poco esfuerzo'],
];
tabs.forEach(([t, h], i) => {
  label(`.ship-ai-tab:nth-child(${i + 1}) .ship-ai-tab-title`, t, '15px/18px');
  label(`.ship-ai-tab:nth-child(${i + 1}) .ship-ai-tab-hint`, h, '12px/18px');
});
label('.ship-ai-tab-link', 'Empezar →', '13px/19.5px');
label('.ship-ai-card-footer p.hr-text', 'Activar ahora →', '14px/14px');
const panels = [
  {
    desc: 'No vuelvas a perder una llamada: agenda citas y conversa con tus leads. Se acabó la música de espera.',
    status: '0% de llamadas perdidas',
    stats: ['Llamadas perdidas', 'Respuesta promedio', 'Disponibilidad'],
    li: ['Contesta en automático todas las llamadas entrantes', 'Agenda citas con una conversación natural', 'Funciona fuera de horario y en horas pico', 'Transfiere a una persona cuando hace falta'],
  },
  {
    desc: 'Atiende a cada lead en cuanto te escribe por SMS, email, chat y más, y guíalo a tus siguientes pasos.',
    status: '48% de tasa de conversión',
    stats: ['Conversión', 'Chats perdidos', 'Disponibilidad'],
    li: ['Responde al instante por SMS, email y chat web', 'Califica leads con preguntas de seguimiento inteligentes', 'Envía ofertas, precios y enlaces para agendar', 'Pasa la conversación a tu equipo de ventas sin fricción'],
  },
  {
    desc: 'Convierte leads en citas agendadas a toda hora: recaba datos, propone horarios y llena tu calendario en automático.',
    status: '+38% más citas',
    stats: ['Más citas', 'Tiempo para agendar', 'Disponibilidad'],
    li: ['Propone horarios disponibles en automático', 'Recaba los datos del cliente antes de la llamada', 'Envía recordatorios para reducir inasistencias', 'Se sincroniza con tu calendario actual'],
  },
  {
    desc: 'Responde las reseñas de Google y Facebook con respuestas redactadas por IA que apruebas antes de publicarse.',
    status: '98% de tasa de respuesta',
    stats: ['Tasa de respuesta', 'Calificación promedio', 'Tiempo de respuesta'],
    li: ['Redacta respuestas personalizadas a reseñas', 'Funciona en Google y Facebook', 'Te deja aprobar antes de publicar', 'Mejora tu posicionamiento con respuestas recientes'],
  },
];
panels.forEach((p, i) => {
  const n = i + 1;
  dyn(n, '.ship-ai-tab-desc', p.desc, '13.5px/22.275px');
  dyn(n, '.ship-ai-card-name', tabs[i][0], '17px/22.1px');
  dyn(n, '.ship-ai-card-status', p.status, '13px/19.5px');
  dyn(n, '.ship-ai-card-badge', tabs[i][1], '12px/18px');
  p.stats.forEach((s, k) => dyn(n, `.ship-ai-card-stat:nth-child(${k + 1}) .ship-ai-card-stat-label`, s, '11px/14.3px'));
  p.li.forEach((s, k) => dyn(n, `.ship-ai-card li:nth-child(${k + 1}) > span`, s, '13.5px/20.25px'));
});

// Agentes por industria (#industry-agents-dashboard): page chrome and the template cards
// (keyed by their stable ids)
const IA = '#industry-agents-dashboard';
const free = (sel, text, m, wrap = false) => rules.push({ sel, text, m, wrap });
free(`${IA} .home-tabs__title`, 'Agentes por industria', '16px/24px');
free('#industry-agents-home-tabs .hr-tabs-tab[data-name="agents"] .hr-tabs-tab__label', 'Agentes', '14px/20px');
free('#industry-agents-home-tabs .hr-tabs-tab[data-name="logs"] .hr-tabs-tab__label', 'Registros', '14px/20px');
free(`${IA} .gallery-header .hr-space-inner > div > p:nth-child(1)`, 'Mis agentes', '13px/18px');
free(`${IA} .gallery-header .hr-space-inner > div > p:nth-child(2)`, 'Tus agentes de IA configurados y activos.', '12px/17px');
free('#add-industry-agent .hr-button__content > p', 'Añadir agente', '13px/18px');
free(`${IA} .gallery-empty > p:nth-of-type(1)`, 'Aún no hay agentes', '13px/18px');
free(`${IA} .gallery-empty > p:nth-of-type(2)`, 'Añade tu primer agente por industria para empezar.', '12px/17px');
free('#add-first-agent .hr-button__content > p', 'Añadir agente por industria', '14px/20px');
free(`${IA} .available-section__header .hr-space-inner > div > p:nth-child(1)`, 'Agentes disponibles', '13px/18px');
free(`${IA} .available-section__header .hr-space-inner > div > p:nth-child(2)`, 'Plantillas preconfiguradas: la mayoría de las secciones ya vienen llenas. Solo revisa y activa.', '12px/17px', true);
free(`${IA} .template-card__cta[id^="available-create-"] .hr-button__content > p`, 'Usar este agente', '14px/20px');
free(`${IA} .template-card__cta[id^="available-soon-"] .hr-button__content > p`, 'Próximamente', '14px/20px');
free(`${IA} .template-card__prefilled-inner`, 'Precargado', '11px/16px');
const cards = {
  'home-services-inbound': {
    sub: 'Servicios para el hogar · Entrante',
    pills: ['Climatización', 'Plomería', 'Electricidad'],
    desc: 'Capta leads, califica solicitudes de servicio y da cobertura 24/7 fuera de horario a negocios de servicios para el hogar.',
    caps: ['Citas entrantes', 'Captación de leads', 'Atención de emergencias', 'IA fuera de horario'],
  },
  'real-estate-followup': {
    sub: 'Bienes raíces · Saliente',
    pills: ['Residencial', 'Comercial', 'Rentas'],
    desc: 'Califica leads entrantes, les da seguimiento inmediato y agenda visitas para equipos inmobiliarios.',
    caps: ['Calificación de leads', 'Respuesta inmediata', 'Agenda de visitas', 'Seguimiento saliente'],
  },
  'health-wellness-appointment': {
    sub: 'Salud y bienestar · Entrante',
    pills: ['Bienestar', 'Spa', 'Fitness'],
    desc: 'Agenda citas, registra a clientes nuevos y responde preguntas frecuentes de negocios de bienestar.',
    caps: ['Agenda de citas', 'Registro de clientes nuevos', 'Preguntas frecuentes', 'Recordatorios'],
  },
};
for (const [id, c] of Object.entries(cards)) {
  const card = `#available-card-${id}`;
  free(`${card} .template-card__subtitle`, c.sub, '13px/18px');
  c.pills.forEach((p, k) => free(`${card} .template-card__subtype-pill:nth-of-type(${k + 1})`, p, '13px/18px'));
  free(`${card} .template-card__desc`, c.desc, '13px/20.8px', true);
  c.caps.forEach((p, k) => free(`${card} .template-card__cap-row:nth-child(${k + 1}) .template-card__cap-label`, p, '13px/18px'));
}

const metrics = (m) => m.split('/');
let css = `/**
 * 53-agentes-ia: Agentes de IA. New section (v1.3.5).
 *
 * Primeros pasos (.ai-value-landing) is a promotional page the platform only half
 * translated. Its fixed texts are replaced the way src/labels.json does it (hidden text,
 * Spanish text in ::after with the original metrics). They live here because the page
 * needs ::before parts (headings with an emphasized phrase) and per-tab variants of the
 * rotating "ship AI" panel, keyed on the active tab.
 *
 * Generated by scripts/gen-agentes-ia.mjs: edit the script, not this file.
 */

`;
css += `${rules.map((r) => r.sel).join(',\n')} {\n  font-size: 0 !important;\n  line-height: 0 !important;\n}\n`;
// Paragraphs may wrap; short labels sit in shrink-to-fit boxes (pills, flex items) whose own
// text is now 0px wide, so they must not wrap
const WRAPS = /compare-table-sub|user-text|agent-text|ship-ai-tab-desc|li:nth-child/;
for (const r of rules) {
  const [s, lh] = metrics(r.m);
  const ws = r.wrap || WRAPS.test(r.sel) ? '' : '\n  white-space: nowrap;';
  css += `${r.sel}::after {\n  display: inline-block;${ws}\n  content: "${q(r.text)}";\n  font-size: ${s};\n  line-height: ${lh};\n}\n`;
}
// Headings "<text> <em>phrase</em> <text>": ::before on the heading, ::after in the em
const headings = [
  ['.hero-heading', 'Tu negocio está ', 'perdiendo', ' clientes todos los días', '44px/48.4px'],
  ['section.feature-row:nth-of-type(1) .feature-heading', 'No vuelvas a perder ', 'ni una llamada', '', '40px/46px'],
  ['section.feature-row:nth-of-type(2) .feature-heading', 'Convierte leads en ', 'ventas, en automático', '', '40px/46px'],
  ['section.feature-row:nth-of-type(3) .feature-heading', 'Agenda más citas, ', 'en automático', '', '40px/46px'],
  ['section.feature-row:nth-of-type(4) .feature-heading', 'Construye una reputación de 5 estrellas ', 'en automático', '', '40px/46px'],
];
css += `\n/* Headings with an emphasized phrase */\n`;
css += `${headings.map((h) => `${L} ${h[0]}`).join(',\n')} {\n  font-size: 0 !important;\n  line-height: 0 !important;\n}\n`;
for (const [sel, before, em, after, m] of headings) {
  const [s, lh] = metrics(m);
  const base = `${L} ${sel}`;
  css += `${base}::before {\n  content: "${q(before)}";\n  font-size: ${s};\n  line-height: ${lh};\n}\n`;
  css += `${base} > em::after {\n  content: "${q(em)}";\n  font-size: ${s};\n  line-height: ${lh};\n}\n`;
  if (after) css += `${base}::after {\n  content: "${q(after)}";\n  font-size: ${s};\n  line-height: ${lh};\n}\n`;
}
css += `
/* Surfaces: the page brings its own white sections and purple accents → theme surfaces,
   raised cards and the accent */
.ai-value-landing,
.ai-value-landing :is(.hero, .trust-section) {
  background: var(--bb-bg) !important;
}
.ai-value-landing :is(.hero-toast, .hero-stats-bar, .compare-table-wrap, .ship-ai-card) {
  background: var(--bb-bg) !important;
  border-color: transparent !important;
  box-shadow: var(--bb-shadow-raised) !important;
}
.ai-value-landing .hero-toast {
  box-shadow: var(--bb-shadow-soft) !important;
}
.ai-value-landing .agent-conversation-panel__body {
  background: var(--bb-bg) !important;
}
.ai-value-landing :is(.hero-eyebrow, .hero-heading-em, .compare-text-cell, .feature-cta-link,
  .agent-conversation-panel__title-icon, .agent-conversation-panel__agent-label-icon,
  .agent-conversation-panel__agent-label-text, .review-reply-preview-card__reply-label,
  .review-reply-preview-card__reply-label-text, .trust-eyebrow, .ship-ai-tab-link,
  .ship-ai-card-icon-wrap, .ship-ai-card-icon, .ship-ai-card-badge) {
  color: var(--bb-accent) !important;
}
.ai-value-landing :is(.hero-eyebrow-dot, .hero-toast-dot, .ship-ai-card-status-dot) {
  background: var(--bb-accent) !important;
}
.ai-value-landing :is(.hero-eyebrow, .compare-header-badge, .compare-col-revenue,
  .review-reply-preview-card__reply, .ship-ai-card-icon-wrap, .ship-ai-card-badge) {
  background-color: var(--bb-accent-50) !important;
}
/* "Activar ahora" reads its colors from the platform purple palette (inline --n-color vars);
   a platform rule of the same specificity loads later, hence the extra class */
.ai-value-landing .ship-ai-card-footer .ship-ai-deploy-btn {
  --n-color: var(--bb-accent) !important;
  --n-color-hover: var(--bb-accent-dark) !important;
  --n-color-pressed: var(--bb-accent-dark) !important;
  --n-color-focus: var(--bb-accent-dark) !important;
  background: var(--bb-accent) !important;
  box-shadow: 6px 6px 16px var(--bb-accent-glow), -4px -4px 12px rgba(255, 255, 255, 0.75) !important;
}
.ai-value-landing .ship-ai-deploy-btn .n-button__border,
.ai-value-landing .ship-ai-deploy-btn .n-button__state-border {
  border-color: transparent !important;
}
.ai-value-landing .compare-col-revenue {
  border-color: var(--bb-accent-200) !important;
}
/* Estudio de agentes: the info banner is "<b>Managed Agents</b> are …" in English on light
   blue → Spanish text (bold part in the <b>), accent tint. Other texts: src/labels.json */
#agent-studio-container .agents-page__banner {
  background: var(--bb-accent-50) !important;
  border-color: transparent !important;
  color: var(--bb-accent) !important;
}
#agent-studio-container .agents-page__banner-text {
  font-size: 0 !important;
  line-height: 0 !important;
  color: var(--bb-accent-dark) !important;
}
#agent-studio-container .agents-page__banner-text > b {
  color: inherit !important;
}
#agent-studio-container .agents-page__banner-text > b::after {
  content: "Agentes gestionados";
  font-size: 13.5px;
  line-height: 19px;
}
#agent-studio-container .agents-page__banner-text::after {
  content: "\\00a0son agentes basados en instrucciones: dales un prompt, conocimiento, búsqueda web e integraciones, y úsalos en el chat o con disparadores.";
  font-size: 13.5px;
  line-height: 19px;
}
/* Illustrations: the hero orb (SVG gradients) and the voice test orb (canvas) can only be
   recolored with a filter: purple / blue → accent hue */
.ai-value-landing .hero-orb-svg {
  filter: hue-rotate(-70deg) saturate(0.7) !important;
}
.ai-value-landing .vto__canvas {
  filter: hue-rotate(-30deg) saturate(0.6) !important;
}
.ai-value-landing .vto__btn {
  background: var(--bb-bg) !important;
  border-color: transparent !important;
  box-shadow: var(--bb-shadow-soft) !important;
}
`;
writeFileSync('src/53-agentes-ia.css', css);
console.log(rules.length, 'labels +', headings.length, 'headings');
