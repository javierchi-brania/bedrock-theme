#!/usr/bin/env node
// Cascade-order check for refactors that move rules between files.
//
//   node scripts/order-check.mjs                  reference = latest tag
//   node scripts/order-check.mjs --base v1.1.0    any git ref
//   options: --json <file>  write the candidate pairs (for in-browser verification)
//
// Moving a declaration past another one only changes the result when both can
// hit the same element and property with the same importance and specificity.
// This lists every pair whose relative order flipped between the reference and
// the working tree and that passes those filters:
//   - same or overlapping property (a shorthand and its longhands: background vs background-color)
//   - same !important and same specificity
//   - different values
//   - subjects that can be the same element (no different tag, id or pseudo-element)
// Each pair is a *candidate*: confirm in the browser whether any element matches both.
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import Specificity from '@bramus/specificity';
import { parse, splitSelectors, toLF } from './lib/css.mjs';
import { labelsToCss } from './lib/labels.mjs';

const args = process.argv.slice(2);
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 << 20 });

const ref = opt('--base') ?? git('describe', '--tags', '--abbrev=0').trim();
const load = (read) =>
  JSON.parse(read('src/manifest.json')).files.map((f) => {
    const text = toLF(read(join('src', f).replace(/\\/g, '/')));
    return { file: f, css: f.endsWith('.json') ? labelsToCss(JSON.parse(text), `src/${f}`) : text };
  });
const before = load((p) => git('show', `${ref}:${p}`));
const after = load((p) => readFileSync(p, 'utf8'));

const family = (prop) => {
  const p = prop.replace(/^-(webkit|moz|ms)-/, '');
  if (p.startsWith('--')) return p;
  if (/^(inset|top|right|bottom|left)(-|$)/.test(p)) return 'inset';
  if (/^(row-gap|column-gap|gap)$/.test(p)) return 'gap';
  if (/^(place|align|justify)-/.test(p)) return 'align';
  return p.split('-')[0];
};

// Does shorthand `s` set longhand `l`? (only the overlaps that matter for order)
const COVERS = {
  all: /./,
  border: /^border-(top|right|bottom|left|width|style|color|image)(-|$)/,
  'border-top': /^border-top-(width|style|color)$/,
  'border-right': /^border-right-(width|style|color)$/,
  'border-bottom': /^border-bottom-(width|style|color)$/,
  'border-left': /^border-left-(width|style|color)$/,
  'border-width': /^border-(top|right|bottom|left)-width$/,
  'border-style': /^border-(top|right|bottom|left)-style$/,
  'border-color': /^border-(top|right|bottom|left)-color$/,
  'border-radius': /^border-(top|bottom)-(left|right)-radius$/,
  font: /^(font-|line-height$)/,
  inset: /^(top|right|bottom|left)$/,
  gap: /^(row|column)-gap$/,
  flex: /^flex-(grow|shrink|basis)$/,
  'flex-flow': /^flex-(direction|wrap)$/,
  'place-items': /^(align|justify)-items$/,
  'place-content': /^(align|justify)-content$/,
  'place-self': /^(align|justify)-self$/,
  overflow: /^overflow-[xy]$/,
};
const PREFIX = ['background', 'margin', 'padding', 'outline', 'transition', 'animation', 'list-style', 'text-decoration', 'mask', 'grid-template', 'border-image'];
const bare = (p) => p.replace(/^-(webkit|moz|ms)-/, '');
const covers = (s, l) => (COVERS[s] ? COVERS[s].test(l) : PREFIX.includes(s) && l.startsWith(s + '-'));
const overlaps = (a, b) => {
  const [x, y] = [bare(a), bare(b)];
  return x === y || covers(x, y) || covers(y, x);
};

// Top-level split of a selector into compounds; returns the last one (the subject).
const subject = (sel) => {
  let depth = 0;
  let cur = '';
  for (const ch of sel) {
    if (ch === '(' || ch === '[') depth++;
    if (ch === ')' || ch === ']') depth--;
    if (depth === 0 && /[\s>+~]/.test(ch)) {
      if (cur) cur = '';
      continue;
    }
    cur += ch;
  }
  const flat = cur.replace(/\((?:[^()]|\([^()]*\))*\)/g, '()').replace(/\[[^\]]*\]/g, '[]');
  return {
    tag: (flat.match(/^[a-z][\w-]*/i) || [''])[0].toLowerCase(),
    id: (flat.match(/#[\w-]+/) || [''])[0],
    pseudo: (flat.match(/::?(before|after|placeholder|marker|selection|backdrop|-webkit-[\w-]+|first-line|first-letter)\b/i) || [''])[0]
      .replace(/^:+/, ''),
  };
};
const compatible = (a, b) =>
  !(a.tag && b.tag && a.tag !== b.tag) && !(a.id && b.id && a.id !== b.id) && a.pseudo === b.pseudo;

// Identical declarations (same context, selector, property, value, importance) collapse
// into the last occurrence: that is the only one that matters for the cascade.
function decls(files) {
  const byKey = new Map();
  let pos = 0;
  for (const { file, css } of files) {
    parse(css, file).walkDecls((d) => {
      const rule = d.parent;
      if (rule.type !== 'rule') return;
      const ctx = [];
      for (let p = rule.parent; p && p.type !== 'root'; p = p.parent) if (p.type === 'atrule') ctx.unshift(`@${p.name} ${p.params}`);
      if (ctx.some((c) => c.startsWith('@keyframes'))) return;
      for (const sel of splitSelectors(rule.selector)) {
        const value = d.value.replace(/\s+/g, ' ').trim();
        const key = [ctx.join(' '), sel, d.prop, value, d.important].join('|');
        let spec;
        try {
          spec = Specificity.calculate(sel)[0].value;
        } catch {
          spec = { a: -1, b: -1, c: -1 };
        }
        byKey.set(key, { id: key, file, ctx: ctx.join(' '), sel, prop: d.prop, value, imp: d.important, spec: `${spec.a},${spec.b},${spec.c}`, pos: pos++ });
      }
    });
  }
  return [...byKey.values()].sort((x, y) => x.pos - y.pos);
}

const a = decls(before);
const b = new Map(decls(after).map((d) => [d.id, d]));
const shared = a.filter((d) => b.has(d.id)).map((d) => ({ ...d, newPos: b.get(d.id).pos, newFile: b.get(d.id).file, subj: subject(d.sel) }));

const buckets = new Map();
for (const d of shared) {
  const k = [d.ctx, family(d.prop), d.imp, d.spec].join('|');
  if (!buckets.has(k)) buckets.set(k, []);
  buckets.get(k).push(d);
}
const pairs = [];
for (const list of buckets.values()) {
  for (let i = 0; i < list.length; i++) {
    for (let j = i + 1; j < list.length; j++) {
      const x = list[i];
      const y = list[j]; // x before y in the reference
      if (x.newPos < y.newPos) continue; // order kept
      // Same selector and property is covered by the effective-declarations diff;
      // a shorthand vs its longhand on the same selector (margin vs margin-bottom) is not.
      if ((x.sel === y.sel && x.prop === y.prop) || (x.prop === y.prop && x.value === y.value)) continue;
      if (!overlaps(x.prop, y.prop)) continue;
      if (!compatible(x.subj, y.subj)) continue;
      pairs.push({ was_first: x, now_first: y });
    }
  }
}

console.log(`order-check vs ${ref}: ${shared.length} declarations tracked, ${pairs.length} candidate conflicts`);
for (const { was_first: x, now_first: y } of pairs.slice(0, 80)) {
  console.log(`- ${x.prop}${x.imp ? ' !important' : ''} spec(${x.spec})${x.ctx ? ' ' + x.ctx : ''}
    was 1st: ${x.sel}  {${x.value}}  [${x.file} → ${x.newFile}]
    now 1st: ${y.sel}  {${y.value}}  [${y.file} → ${y.newFile}]`);
}
if (pairs.length > 80) console.log(`… ${pairs.length - 80} more`);
if (opt('--json')) {
  const slim = (d) => ({ sel: d.sel, prop: d.prop, value: d.value, file: d.file, newFile: d.newFile });
  writeFileSync(opt('--json'), JSON.stringify(pairs.map((p) => ({ was_first: slim(p.was_first), now_first: slim(p.now_first) })), null, 1));
}
