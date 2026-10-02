// Shared helpers for the build and the rules diff.
import postcss from 'postcss';

export const DIST = 'dist/bedrock-theme.css';

export const toLF = (s) => s.replace(/\r\n?/g, '\n');

export const parse = (css, from) => postcss.parse(css, { from });

const squash = (s) => s.replace(/\s+/g, ' ').trim();

// Split a selector list on top-level commas (ignores commas inside (), [] and strings).
export function splitSelectors(selector) {
  const out = [];
  let depth = 0;
  let quote = null;
  let cur = '';
  for (const ch of selector) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === '(' || ch === '[') {
      depth++;
    } else if (ch === ')' || ch === ']') {
      depth--;
    } else if (ch === ',' && depth === 0) {
      out.push(squash(cur));
      cur = '';
      continue;
    }
    cur += ch;
  }
  out.push(squash(cur));
  return out.filter(Boolean);
}

const declString = (d) => `${d.prop.trim()}: ${squash(d.value)}${d.important ? ' !important' : ''}`;

// Canonical text of a node: no comments, normalized whitespace, one line.
export function canonical(node) {
  switch (node.type) {
    case 'decl':
      return declString(node);
    case 'rule':
      return `${splitSelectors(node.selector).join(', ')} { ${children(node)} }`;
    case 'atrule':
      return `@${node.name}${node.params ? ' ' + squash(node.params) : ''}${node.nodes ? ` { ${children(node)} }` : ';'}`;
    default:
      return '';
  }
}

const children = (node) =>
  node.nodes
    .filter((n) => n.type !== 'comment')
    .map((n) => (n.type === 'decl' ? declString(n) + ';' : canonical(n)))
    .join(' ');

// Top-level nodes that are not comments (what the browser counts as cssRules, roughly).
export const topLevel = (root) => root.nodes.filter((n) => n.type !== 'comment');

// Number of style rules at any depth (inside @media, @supports, @keyframes...).
export function countStyleRules(root) {
  let n = 0;
  root.walkRules(() => n++);
  return n;
}

// Split a value on top-level whitespace (keeps var(...), calc(...) and strings whole).
const words = (value) => {
  const out = [];
  let depth = 0;
  let cur = '';
  for (const ch of value.trim()) {
    if (ch === '(') depth++;
    if (ch === ')') depth--;
    if (depth === 0 && /\s/.test(ch)) {
      if (cur) out.push(cur);
      cur = '';
    } else cur += ch;
  }
  if (cur) out.push(cur);
  return out;
};

const SIDES = ['top', 'right', 'bottom', 'left'];
const CORNERS = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
// 1-4 values -> top/right/bottom/left (or the four corners)
const box = (value) => {
  const w = words(value);
  if (w.length < 1 || w.length > 4 || value.includes('var(')) return null; // var() may hold several values
  const [t, r = t, b = t, l = r] = w;
  return [t, r, b, l];
};
const sideProps = {
  margin: (s) => `margin-${s}`,
  padding: (s) => `padding-${s}`,
  inset: (s) => s,
  'border-width': (s) => `border-${s}-width`,
  'border-style': (s) => `border-${s}-style`,
  'border-color': (s) => `border-${s}-color`,
};
// Shorthands that are not expanded value by value: every longhand they reset is
// keyed with the whole shorthand declaration, so a later longhand still diffs.
const RESETS = {
  border: SIDES.flatMap((s) => ['width', 'style', 'color'].map((p) => `border-${s}-${p}`)),
  ...Object.fromEntries(SIDES.map((s) => [`border-${s}`, ['width', 'style', 'color'].map((p) => `border-${s}-${p}`)])),
  background: ['color', 'image', 'position', 'size', 'repeat', 'attachment', 'origin', 'clip'].map((p) => `background-${p}`),
  font: ['font-family', 'font-size', 'font-weight', 'font-style', 'font-variant', 'font-stretch', 'line-height'],
  outline: ['outline-color', 'outline-style', 'outline-width'],
  flex: ['flex-grow', 'flex-shrink', 'flex-basis'],
  'flex-flow': ['flex-direction', 'flex-wrap'],
  'list-style': ['list-style-type', 'list-style-position', 'list-style-image'],
  'text-decoration': ['text-decoration-line', 'text-decoration-style', 'text-decoration-color', 'text-decoration-thickness'],
};

// Shorthand -> [longhand, value] pairs; other properties pass through.
export function expand(prop, value) {
  const p = prop.trim().toLowerCase();
  if (sideProps[p]) {
    const v = box(value);
    return SIDES.map((s, i) => [sideProps[p](s), v ? v[i] : `${p}: ${value}`]);
  }
  if (p === 'border-radius') {
    const v = value.includes('/') ? null : box(value);
    return CORNERS.map((c, i) => [`border-${c}-radius`, v ? v[i] : `${p}: ${value}`]);
  }
  if (p === 'gap' || p === 'overflow') {
    const w = value.includes('var(') ? [] : words(value);
    const [a, b = a] = w.length && w.length <= 2 ? w : [`${p}: ${value}`];
    return p === 'gap' ? [['row-gap', a], ['column-gap', b]] : [['overflow-x', a], ['overflow-y', b]];
  }
  if (RESETS[p]) return RESETS[p].map((l) => [l, `${p}: ${value}`]);
  return [[p, value]];
}

// Effective declarations: context + single selector + longhand -> winning value,
// applying source order and !important. Shorthands are expanded (see expand), so
// `margin` followed by `margin-bottom` on the same selector is compared per side.
export function effectiveDecls(root) {
  const map = new Map();
  root.walkDecls((decl) => {
    const rule = decl.parent;
    if (!rule || rule.type !== 'rule') return;
    const ctx = [];
    for (let p = rule.parent; p && p.type !== 'root'; p = p.parent) {
      if (p.type === 'atrule') ctx.unshift(`@${p.name} ${squash(p.params)}`.trim());
    }
    const imp = decl.important ? ' !important' : '';
    const longhands = expand(decl.prop, squash(decl.value));
    for (const sel of splitSelectors(rule.selector)) {
      for (const [prop, value] of longhands) {
        const key = [...ctx, sel].join(' » ') + ' → ' + prop;
        const prev = map.get(key);
        if (prev && prev.endsWith('!important') && !decl.important) continue;
        map.set(key, value + imp);
      }
    }
  });
  return map;
}
