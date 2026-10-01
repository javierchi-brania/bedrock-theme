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

// Effective declarations: context + single selector + property -> winning value,
// applying source order and !important. Does not model shorthand/longhand overlap.
export function effectiveDecls(root) {
  const map = new Map();
  root.walkDecls((decl) => {
    const rule = decl.parent;
    if (!rule || rule.type !== 'rule') return;
    const ctx = [];
    for (let p = rule.parent; p && p.type !== 'root'; p = p.parent) {
      if (p.type === 'atrule') ctx.unshift(`@${p.name} ${squash(p.params)}`.trim());
    }
    const value = squash(decl.value) + (decl.important ? ' !important' : '');
    for (const sel of splitSelectors(rule.selector)) {
      const key = [...ctx, sel].join(' » ') + ' → ' + decl.prop.trim();
      const prev = map.get(key);
      if (prev && prev.endsWith('!important') && !decl.important) continue;
      map.set(key, value);
    }
  });
  return map;
}
