#!/usr/bin/env node
// Builds dist/bedrock-theme.css from src/ in the order of src/manifest.json,
// and embed/editor.css (@import of this version + the :root tokens inline).
//
//   node scripts/build.mjs           write dist/ and embed/
//   node scripts/build.mjs --check   fail if dist/ or embed/ is stale (used by CI)
//
// Fails when: a src/*.css file is missing from the manifest (or vice versa),
// the CSS does not parse, or a vendor name leaks into the repo.
import { readFileSync, writeFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { DIST, toLF, parse, topLevel, countStyleRules } from './lib/css.mjs';

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
const onDisk = readdirSync('src').filter((f) => f.endsWith('.css'));
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
  css += toLF(readFileSync(join('src', file), 'utf8'));
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
const files = ['README.md', 'package.json', 'embed', 'scripts', 'src', '.github']
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
