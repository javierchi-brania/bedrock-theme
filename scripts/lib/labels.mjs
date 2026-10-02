// Spanish labels: src/labels.json -> CSS. The platform has no Spanish text for some
// fixed labels; the original text is hidden and the Spanish one is drawn with ::after.
//
// labels.json:
//   "fonts":  { "<name>": "<font-size>/<line-height>" }   metrics of the original text
//   "labels": [{ "sel": "<element that holds the text>", "text": "…", "font": "<name>",
//                "icon": true }]   icon: the element also holds an <i> icon (dropdown
//                                  chevron) that must keep its size and stay after the text
//
// Only for fixed labels: text that carries live data cannot be replaced with CSS.
export function labelsToCss({ fonts, labels }, source = 'src/labels.json') {
  const metrics = (l) => {
    const m = fonts[l.font];
    if (!m) throw new Error(`${source}: unknown font "${l.font}" for ${l.sel}`);
    const [size, lineHeight] = m.split('/');
    return { size, lineHeight };
  };
  const list = (sels) => sels.join(',\n');
  const icons = labels.filter((l) => l.icon);
  const out = [
    `\n/* ── generated from ${source} (Spanish labels): edit the JSON, not this block ── */`,
    `${list(labels.map((l) => l.sel))} {\n  font-size: 0 !important;\n  line-height: 0 !important;\n}`,
    `${list(labels.map((l) => `${l.sel}::after`))} {\n  display: inline-block;\n}`,
  ];
  for (const l of icons) {
    const { size, lineHeight } = metrics(l);
    out.push(`${l.sel} > i {\n  font-size: ${size} !important;\n  line-height: ${lineHeight} !important;\n}`);
  }
  for (const l of labels) {
    const { size, lineHeight } = metrics(l);
    const text = l.text.replace(/["\\]/g, '\\$&');
    out.push(
      `${l.sel}::after {\n  content: "${text}";\n  font-size: ${size};\n  line-height: ${lineHeight};${l.icon ? '\n  order: -1;' : ''}\n}`,
    );
  }
  return out.join('\n') + '\n';
}
