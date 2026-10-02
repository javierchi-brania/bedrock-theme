#!/usr/bin/env node
// Builds dist/bedrock-theme.css from src/ in the order of src/manifest.json,
// and embed/editor.css (@import of this version + the :root tokens inline).
//
//   node scripts/build.mjs           write dist/ and embed/
//   node scripts/build.mjs --check   fail if dist/ or embed/ is stale (used by CI)
//
// Fails when: a src/*.css file is missing from the manifest (or vice versa),
// the CSS does not parse, a vendor name leaks into the repo, or a literal color
// that is not in scripts/color-baseline.json appears outside 00-tokens.
//   node scripts/build.mjs --accept-colors   record the current literal colors as the baseline
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, toLF, parse, topLevel, countStyleRules } from './lib/css.mjs';
import { labelsToCss } from './lib/labels.mjs';

const TOKENS = 'src/00-tokens.css';
const EMBED = 'embed/editor.css';

const check = process.argv.includes('--check');
const fail = (msg) => {
  console.error(`✖ ${msg}`);
  process.exit(1);
};

// 1. Manifest <-> src/ consistency
const manifest = JSON.parse(readFileSync('src/manifest.json', 'utf8'));
const listed = manifest.files;
// .css sections and .json data files (labels.json) that the build turns into CSS
const onDisk = readdirSync('src').filter((f) => f.endsWith('.css') || (f.endsWith('.json') && f !== 'manifest.json'));
const dupes = listed.filter((f, i) => listed.indexOf(f) !== i);
const unlisted = onDisk.filter((f) => !listed.includes(f));
const missing = listed.filter((f) => !onDisk.includes(f));
if (dupes.length) fail(`listed twice in src/manifest.json: ${dupes.join(', ')}`);
if (unlisted.length) fail(`not in src/manifest.json: ${unlisted.join(', ')}`);
if (missing.length) fail(`in src/manifest.json but not in src/: ${missing.join(', ')}`);

// 2. Concatenate, remembering where each file starts (for error messages)
let css = '';
const starts = [];
for (const file of listed) {
  starts.push({ file, line: css.split('\n').length });
  const text = toLF(readFileSync(join('src', file), 'utf8'));
  css += file.endsWith('.json') ? labelsToCss(JSON.parse(text), `src/${file}`) : text;
}
const origin = (line) => {
  const s = starts.findLast((x) => x.line <= line);
  return `src/${s.file}:${line - s.line + 1}`;
};

// 3. Syntax
let root;
try {
  root = parse(css, DIST);
} catch (err) {
  if (err.name !== 'CssSyntaxError') throw err;
  fail(`CSS syntax error at ${origin(err.line)}: ${err.reason}`);
}
const empty = [];
root.walkDecls((d) => {
  if (!d.value.trim()) empty.push(origin(d.source.start.line) + ` (${d.prop})`);
});
if (empty.length) fail(`declarations without value:\n  ${empty.join('\n  ')}`);

// 4. Vendor names must not appear anywhere (functional .ghl-* selectors are allowed)
const FORBIDDEN = /gohighlevel|\bhighlevel\b|leadconnector|\bgohl|\bghl\b(?!-)/i;
const files = ['README.md', 'TRACKING.md', 'package.json', 'embed', 'scripts', 'src', '.github']
  .filter(existsSync)
  .flatMap((p) =>
    statSync(p).isDirectory()
      ? readdirSync(p, { recursive: true }).map((f) => join(p, f)).filter((f) => statSync(f).isFile())
      : [p],
  )
  .filter((f) => !f.endsWith('build.mjs')); // contains the pattern itself
const leaks = [];
for (const file of files) {
  toLF(readFileSync(file, 'utf8'))
    .split('\n')
    .forEach((l, i) => FORBIDDEN.test(l) && leaks.push(`${file}:${i + 1}`));
}
if (leaks.length) fail(`vendor name found (say "la plataforma" / "the platform"):\n  ${leaks.join('\n  ')}`);

// 4b. Color lock: literal colors outside 00-tokens are a ratchet. The ones already
// in the theme are listed in scripts/color-baseline.json; a new one fails the build
// (use a --bb-* token). `--accept-colors` rewrites the baseline when a literal is
// intended; that change shows up in the PR diff.
const BASELINE = 'scripts/color-baseline.json';
const COLOR = /#[0-9a-f]{3,8}\b|\b(?:rgba?|hsla?)\([^()]*\)/gi;
const normColor = (c) => {
  const s = c.toLowerCase().replace(/\s+/g, '');
  return /^#[0-9a-f]{3}$/.test(s) ? '#' + [...s.slice(1)].map((x) => x + x).join('') : s;
};
const toRgb = (c) => {
  if (c.startsWith('#') && (c.length === 7 || c.length === 9)) return [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  const m = c.match(/^rgba?\(([\d.]+),([\d.]+),([\d.]+)/);
  return m ? m.slice(1, 4).map(Number) : null;
};
// Blue like the platform accent (teal --bb-accent is ~188deg, platform blues ~205-255deg)
const isBlue = (c) => {
  const rgb = toRgb(c);
  if (!rgb) return false;
  const [r, g, b] = rgb.map((x) => x / 255);
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min, l = (max + min) / 2;
  if (!d) return false;
  const s = d / (1 - Math.abs(2 * l - 1));
  const h = (max === r ? 60 * (((g - b) / d) % 6) : max === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4)) + 360;
  return h % 360 >= 200 && h % 360 <= 255 && s >= 0.35 && l > 0.15 && l < 0.9;
};
const found = new Map();
root.walkDecls((d) => {
  const where = origin(d.source.start.line);
  if (where.startsWith(`${TOKENS}:`)) return;
  for (const c of d.value.match(COLOR) ?? []) {
    const n = normColor(c);
    if (!found.has(n)) found.set(n, where);
  }
});
const baseline = existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')) : [];
if (process.argv.includes('--accept-colors')) {
  writeFileSync(BASELINE, JSON.stringify([...found.keys()].sort(), null, 1) + '\n');
  console.log(`✔ ${BASELINE}: ${found.size} accepted colors`);
} else {
  const fresh = [...found].filter(([c]) => !baseline.includes(c));
  if (fresh.length)
    fail(
      `new literal colors (use a --bb-* token from ${TOKENS}, or run with --accept-colors if intended):\n  ` +
        fresh.map(([c, w]) => `${c}${isBlue(c) ? '  ← BLUE, the theme accent is teal' : ''}  (${w})`).join('\n  '),
    );
}

// 5. embed/editor.css: @import of this version + the :root tokens inline
const pkg = JSON.parse(readFileSync('package.json', 'utf8'));
const repo = pkg.repository.url.match(/github\.com\/(.+?)(\.git)?$/)[1];
const tokens = parse(toLF(readFileSync(TOKENS, 'utf8')), TOKENS).nodes.find(
  (n) => n.type === 'rule' && n.selector === ':root',
);
if (!tokens) fail(`${TOKENS} has no :root rule`);
const embed = `@import url("https://cdn.jsdelivr.net/gh/${repo}@v${pkg.version}/${DIST}");
/* Critical tokens inline to avoid a flash while the theme loads.
   Generated from ${TOKENS} by \`npm run build\`: do not edit by hand. */
${tokens.toString()}
body { background: var(--bb-bg); }
`;

// 6. Write or compare
const stats = `${topLevel(root).length} top-level rules, ${countStyleRules(root)} style rules, ${Buffer.byteLength(css)} bytes`;
const outputs = [
  [DIST, css],
  [EMBED, embed],
];
if (check) {
  for (const [file, text] of outputs) {
    const current = existsSync(file) ? toLF(readFileSync(file, 'utf8')) : '';
    if (current !== text) fail(`${file} is stale: run \`npm run build\` and commit the result`);
  }
  console.log(`✔ ${DIST} and ${EMBED} are up to date (${stats})`);
} else {
  for (const [file, text] of outputs) writeFileSync(file, text);
  console.log(`✔ ${DIST}: ${stats}\n✔ ${EMBED}: @import v${pkg.version}`);
}
