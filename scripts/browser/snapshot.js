// Computed-style snapshots for refactor checks. Paste into the console of a
// sub-account tab (or run it through browser automation). Defines window.bbSnap:
//
//   const a = bbSnap.take();                       // theme as loaded by the @import
//   await bbSnap.preview(bbSnap.cdn('v1.1.0'));    // same check through a <style>
//   const a2 = bbSnap.take(); bbSnap.diff(a, a2);  // must be 0: validates the method
//   await bbSnap.preview(bbSnap.cdn('<commitSHA>'));
//   const b = bbSnap.take(); bbSnap.diff(a2, b);   // the refactor: must be 0
//   bbSnap.restore();                              // back to the @import (nothing saved)
//
// preview() removes the @import from the live stylesheet in memory only and puts
// the fetched CSS in a <style> right before it, so the cascade order is the same.
// It never touches the custom CSS editor.
(() => {
  const PROPS = [
    'background-color', 'background-image', 'box-shadow', 'border-radius',
    'border-color', 'border-width', 'color', 'padding', 'gap', 'font-family',
    'font-weight', 'opacity',
  ];
  const HOST_ID = 'customCss';
  const PREVIEW_ID = 'bb-preview';
  const REPO = 'javierchi-brania/bedrock-theme';
  const settle = () =>
    new Promise((r) => setTimeout(() => requestAnimationFrame(() => requestAnimationFrame(r)), 1500));

  const label = (el) => {
    const cls = typeof el.className === 'string' ? el.className.trim().split(/\s+/).slice(0, 3).join('.') : '';
    return el.tagName.toLowerCase() + (el.id ? '#' + el.id : '') + (cls ? '.' + cls : '');
  };

  function take() {
    const rootStyle = getComputedStyle(document.documentElement);
    const tokens = {};
    for (const p of rootStyle) if (p.startsWith('--bb-')) tokens[p] = rootStyle.getPropertyValue(p).trim();
    const els = [document.documentElement, document.body, ...document.body.querySelectorAll('*')];
    const rows = els.map((el) => {
      const cs = getComputedStyle(el);
      return [label(el), PROPS.map((p) => cs.getPropertyValue(p))];
    });
    return { url: location.pathname, tokens, rows };
  }

  function diff(a, b, limit = 40) {
    const out = [];
    for (const k of new Set([...Object.keys(a.tokens), ...Object.keys(b.tokens)])) {
      if (a.tokens[k] !== b.tokens[k]) out.push({ el: ':root', prop: k, a: a.tokens[k], b: b.tokens[k] });
    }
    const domChanged = a.rows.length !== b.rows.length;
    const n = Math.min(a.rows.length, b.rows.length);
    for (let i = 0; i < n; i++) {
      const [la, va] = a.rows[i];
      const [lb, vb] = b.rows[i];
      if (la !== lb) continue; // DOM moved under us; skip rather than misreport
      va.forEach((v, j) => v !== vb[j] && out.push({ el: la, prop: PROPS[j], a: v, b: vb[j] }));
    }
    return { elements: n, domChanged, differences: out.length, sample: out.slice(0, limit) };
  }

  const host = () => document.getElementById(HOST_ID);
  let importText = null;

  async function preview(url) {
    const sheet = host().sheet;
    if (sheet.cssRules[0] instanceof CSSImportRule) {
      importText = sheet.cssRules[0].cssText;
      sheet.deleteRule(0);
    }
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`${res.status} ${url}`);
    let style = document.getElementById(PREVIEW_ID);
    if (!style) {
      style = document.createElement('style');
      style.id = PREVIEW_ID;
      host().before(style);
    }
    style.textContent = await res.text();
    await settle();
    return { url, rules: style.sheet.cssRules.length };
  }

  async function restore() {
    document.getElementById(PREVIEW_ID)?.remove();
    const sheet = host().sheet;
    if (importText && !(sheet.cssRules[0] instanceof CSSImportRule)) sheet.insertRule(importText, 0);
    importText = null;
    await settle();
    return sheet.cssRules[0]?.cssText;
  }

  const cdn = (ref) => `https://cdn.jsdelivr.net/gh/${REPO}@${ref}/dist/bedrock-theme.css`;

  window.bbSnap = { take, diff, preview, restore, cdn, PROPS };
  return 'bbSnap ready';
})();
