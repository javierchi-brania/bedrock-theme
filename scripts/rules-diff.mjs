#!/usr/bin/env node
// Regression check: compares the rules of dist/ (comments ignored) against a reference.
//
//   node scripts/rules-diff.mjs                     reference = latest tag
//   node scripts/rules-diff.mjs --base v1.0.0       any git ref (tag, branch, SHA)
//   node scripts/rules-diff.mjs --base-file old.css a file on disk
//   options: --head-file <css>  (default dist/bedrock-theme.css)
//            --out <file.md>    also write the Markdown report to a file
//            --strict           exit 1 if the effective declarations differ
//
// Two views:
//   1. Rules: every top-level rule as canonical text, compared as a multiset,
//      plus whether the shared rules kept their relative order.
//   2. Effective declarations: (at-rule context, selector, property) -> winning
//      value after source order and !important. A pure refactor (merging patches,
//      removing duplicates) keeps this view identical even if view 1 changes a lot.
import { readFileSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { DIST, toLF, parse, topLevel, canonical, effectiveDecls } from './lib/css.mjs';

const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64 << 20 });

let baseLabel;
let baseCss;
if (opt('--base-file')) {
  baseLabel = opt('--base-file');
  baseCss = readFileSync(baseLabel, 'utf8');
} else {
  const ref = opt('--base') ?? git('describe', '--tags', '--abbrev=0').trim();
  baseLabel = ref;
  baseCss = git('show', `${ref}:${DIST}`);
}
const headLabel = opt('--head-file') ?? DIST;
const headCss = readFileSync(headLabel, 'utf8');

const base = parse(toLF(baseCss), 'base');
const head = parse(toLF(headCss), 'head');

// --- 1. Rules ---------------------------------------------------------------
const baseRules = topLevel(base).map(canonical);
const headRules = topLevel(head).map(canonical);
const counts = (list) => list.reduce((m, r) => m.set(r, (m.get(r) ?? 0) + 1), new Map());
const minus = (a, b) => {
  const left = counts(b);
  return a.filter((r) => {
    const n = left.get(r) ?? 0;
    if (n > 0) {
      left.set(r, n - 1);
      return false;
    }
    return true;
  });
};
const removed = minus(baseRules, headRules);
const added = minus(headRules, baseRules);
const sharedBase = minus(baseRules, removed);
const sharedHead = minus(headRules, added);
const sameOrder = sharedBase.length === sharedHead.length && sharedBase.every((r, i) => r === sharedHead[i]);

// --- 2. Effective declarations ---------------------------------------------
const eb = effectiveDecls(base);
const eh = effectiveDecls(head);
const declRemoved = [...eb.keys()].filter((k) => !eh.has(k));
const declAdded = [...eh.keys()].filter((k) => !eb.has(k));
const declChanged = [...eb.keys()].filter((k) => eh.has(k) && eh.get(k) !== eb.get(k));

// --- Report -----------------------------------------------------------------
const LIMIT = 60;
const clip = (s) => (s.length > 300 ? s.slice(0, 297) + '…' : s);
const block = (title, items, fmt = (x) => x) =>
  items.length
    ? `<details><summary>${title} (${items.length})</summary>\n\n\`\`\`css\n${items
        .slice(0, LIMIT)
        .map((x) => clip(fmt(x)))
        .join('\n')}${items.length > LIMIT ? `\n/* … ${items.length - LIMIT} more */` : ''}\n\`\`\`\n</details>\n`
    : '';

const unchanged = !removed.length && !added.length && sameOrder;
const declSame = !declRemoved.length && !declAdded.length && !declChanged.length;
const md = `### Rules diff: \`${baseLabel}\` → \`${headLabel}\`

| | ${baseLabel} | ${headLabel} |
|---|---:|---:|
| Top-level rules | ${baseRules.length} | ${headRules.length} |
| Effective declarations | ${eb.size} | ${eh.size} |

**Rules:** ${unchanged ? 'identical ✅' : `−${removed.length} / +${added.length}, shared rules order ${sameOrder ? 'kept' : '**changed** ⚠️'}`}
**Effective declarations:** ${declSame ? 'identical ✅' : `−${declRemoved.length} / +${declAdded.length} / ~${declChanged.length} ⚠️`}

${block('Effective declarations changed', declChanged, (k) => `${k}: ${eb.get(k)}  ⇒  ${eh.get(k)}`)}${block(
  'Effective declarations removed',
  declRemoved,
  (k) => `${k}: ${eb.get(k)}`,
)}${block('Effective declarations added', declAdded, (k) => `${k}: ${eh.get(k)}`)}${block('Rules removed', removed)}${block(
  'Rules added',
  added,
)}`;

console.log(md);
if (opt('--out')) writeFileSync(opt('--out'), md);
if (args.includes('--strict') && !declSame) process.exit(1);
