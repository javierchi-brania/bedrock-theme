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
//   await bbSnap.compare('v1.2.1', '<commitSHA>')  // preferred: both sides through a
//                                                  // <style>, waits for fonts; returns
//                                                  // { differences, groups: {"el prop": n} }
//
// Swapping the stylesheet re-registers the web font: until it loads, text falls back
// and widths/heights change everywhere. compare() avoids that noise; when comparing by
// hand, await document.fonts.ready and give it a few seconds before take().
//
// preview() removes the @import from the live stylesheet in memory only and puts
// the fetched CSS in a <style> right before it, so the cascade order is the same.
// It never touches the custom CSS editor.
(() => {
  const PROPS = [
    'background-color', 'background-image', 'box-shadow', 'border-radius',
    'border-color', 'border-width', 'color', 'padding', 'gap', 'font-family',
    'font-weight', 'opacity', 'margin', 'width', 'height', 'stroke', 'fill', 'filter',
  ];
  const HOST_ID = 'customCss';
  const PREVIEW_ID = 'bb-preview';
  const REPO = 'javierchi-brania/bedrock-theme';
  // setTimeout, not requestAnimationFrame: rAF never fires in a background tab.
  // getComputedStyle forces the style recalculation anyway.
  // Timers are throttled in background tabs; a worker's are not.
  const worker = new Worker(URL.createObjectURL(new Blob(['onmessage=e=>setTimeout(()=>postMessage(1),e.data)'])));
  const sleep = (ms) =>
    new Promise((r) => {
      const h = () => (worker.removeEventListener('message', h), r());
      worker.addEventListener('message', h);
      worker.postMessage(ms);
    });
  const settle = async () => {
    await document.fonts.ready;
    await sleep(2500);
  };

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
  // Kept on window so restore() still works if bbSnap is redefined mid-check.
  const IMPORT_KEY = '__bbSnapImport';

  async function preview(url) {
    const sheet = host().sheet;
    if (sheet.cssRules[0] instanceof CSSImportRule) {
      window[IMPORT_KEY] = sheet.cssRules[0].cssText;
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
    const text = window[IMPORT_KEY];
    if (text && !(sheet.cssRules[0] instanceof CSSImportRule)) sheet.insertRule(text, 0);
    delete window[IMPORT_KEY];
    await settle();
    return sheet.cssRules[0]?.cssText;
  }

  const cdn = (ref) => `https://cdn.jsdelivr.net/gh/${REPO}@${ref}/dist/bedrock-theme.css`;

  // Both refs through the same <style> mechanism, so only the CSS differs.
  async function compare(refA, refB, limit = 500) {
    await preview(cdn(refA));
    const a = take();
    await preview(cdn(refB));
    const b = take();
    await restore();
    const d = diff(a, b, limit);
    const groups = {};
    for (const s of d.sample) {
      const k = `${s.el.replace(/^(w+).*?([.#][w-]+)?.*$/, '$1$2')} ${s.prop}`;
      groups[k] = (groups[k] ?? 0) + 1;
    }
    return { view: location.pathname.split('/').slice(4, 6).join('/'), elements: d.elements, domChanged: d.domChanged, differences: d.differences, groups };
  }

  window.bbSnap = { take, diff, preview, restore, compare, cdn, PROPS };
  return 'bbSnap ready';
})();
