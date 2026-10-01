// Design-consistency audit for the current view. Paste into the console of a
// sub-account tab (or run it through browser automation). Defines window.bbAudit:
//
//   bbAudit.run()           -> { view, scanned, groups: [{ rule, el, count, value, size }] }
//   bbAudit.run({ top: 30 })   limit the groups returned (sorted by count)
//   bbAudit.mark('blue')    outlines the offending elements of one rule on screen
//   bbAudit.unmark()
//
// Rules (Bedrock: teal accent, neumorphic depth, smooth edges):
//   blue        a blue color (platform accent) instead of the teal accent
//   sharp       a visible box (own background, border or shadow) with radius < 6px
//   off-palette a light surface that is not --bb-bg / --bb-bg-hover (e.g. platform greys)
//   white       a large white surface (Bedrock surfaces are --bb-bg with shadows)
//   box-border  an opaque border on all four sides (depth should come from shadows)
//   flat-control a button/input/select with its own box but no shadow
// Only same-origin DOM is scanned: content inside cross-origin iframes can't be styled.
(() => {
  const PALETTE = ['233,235,236', '230,232,233']; // --bb-bg, --bb-bg-hover
  const CONTROL = 'button, input:not([type=checkbox]):not([type=radio]):not([type=hidden]), select, textarea, [role=button], [role=tab], .n-button, .n-input, .n-base-selection';

  const rgba = (s) => {
    const m = s && s.match(/rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)/);
    return m ? { r: +m[1], g: +m[2], b: +m[3], a: m[4] === undefined ? 1 : +m[4] } : null;
  };
  const colorsIn = (s) => (s.match(/rgba?\([^)]+\)/g) || []).map(rgba);
  const hsl = ({ r, g, b }) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2, d = max - min;
    if (!d) return { h: 0, s: 0, l };
    const s = d / (1 - Math.abs(2 * l - 1));
    const h = max === r ? 60 * (((g - b) / d) % 6) : max === g ? 60 * ((b - r) / d + 2) : 60 * ((r - g) / d + 4);
    return { h: (h + 360) % 360, s, l };
  };
  // Teal accent is ~188deg; platform blues are ~205-250deg.
  const isBlue = (c) => {
    if (!c || c.a < 0.15) return false;
    const { h, s, l } = hsl(c);
    return h >= 200 && h <= 255 && s >= 0.35 && l > 0.15 && l < 0.9;
  };
  const key = (c) => `${c.r},${c.g},${c.b}`;
  const label = (el) => {
    const cls = (typeof el.className === 'string' ? el.className : el.className?.baseVal || '')
      .trim().split(/\s+/).filter((c) => c && !/^(hover|focus|active|w-|h-|p-|m-|text-|flex|items-|justify-|gap-)/.test(c)).slice(0, 2).join('.');
    return el.tagName.toLowerCase() + (el.id && !/\d{3,}/.test(el.id) ? '#' + el.id : '') + (cls ? '.' + cls : '');
  };
  const hasOwnText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
  const ownBg = (cs) => { const c = rgba(cs.backgroundColor); return c && c.a > 0.05 ? c : null; };
  const maxRadius = (cs) => Math.max(...['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'].map((c) => parseFloat(cs[`border${c}Radius`]) || 0));
  // A square box inside a rounded ancestor that clips it at the same corners still looks rounded.
  const clippedRound = (el, rect) => {
    for (let p = el.parentElement, i = 0; p && i < 4; p = p.parentElement, i++) {
      const cs = getComputedStyle(p);
      if (maxRadius(cs) < 6 || cs.overflow === 'visible') continue;
      const r = p.getBoundingClientRect();
      if (Math.abs(r.left - rect.left) < 3 && Math.abs(r.top - rect.top) < 3 && Math.abs(r.right - rect.right) < 3) return true;
    }
    return false;
  };
  // Human hint of where the element is: its own or nearest ancestor's label/text.
  const where = (el) => {
    for (let p = el, i = 0; p && i < 6; p = p.parentElement, i++) {
      const t = (p.getAttribute?.('aria-label') || p.getAttribute?.('title') || p.innerText || '').trim().replace(/s+/g, ' ');
      if (t) return t.slice(0, 28);
    }
    return '';
  };

  let hits = [];

  function run({ top = 40 } = {}) {
    hits = [];
    const els = document.body.querySelectorAll('*');
    let scanned = 0;
    for (const el of els) {
      // opacity is not checked: entrance animations sit at opacity 0 in background tabs.
      if (el.closest('#bb-audit-layer') || !el.checkVisibility?.({ visibilityProperty: true })) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) continue;
      scanned++;
      const cs = getComputedStyle(el);
      const add = (rule, value) => hits.push({ rule, el, value, size: `${Math.round(rect.width)}x${Math.round(rect.height)}` });
      const svg = el instanceof SVGElement;

      // blue
      const blue = [];
      if (svg) blue.push(rgba(cs.fill), rgba(cs.stroke));
      else {
        if (hasOwnText(el) || el.matches('i, svg')) blue.push(rgba(cs.color));
        blue.push(ownBg(cs));
        for (const side of ['Top', 'Right', 'Bottom', 'Left'])
          if (parseFloat(cs[`border${side}Width`]) > 0 && cs[`border${side}Style`] !== 'none') blue.push(rgba(cs[`border${side}Color`]));
        if (cs.outlineStyle !== 'none' && parseFloat(cs.outlineWidth) > 0) blue.push(rgba(cs.outlineColor));
        if (cs.boxShadow !== 'none') blue.push(...colorsIn(cs.boxShadow));
        if (cs.backgroundImage !== 'none') blue.push(...colorsIn(cs.backgroundImage));
      }
      const b = blue.find(isBlue);
      if (b) add('blue', `rgb(${key(b)})`);
      if (svg) continue;

      const bg = ownBg(cs);
      const borders = ['Top', 'Right', 'Bottom', 'Left'].map((s) => ({
        w: parseFloat(cs[`border${s}Width`]), style: cs[`border${s}Style`], c: rgba(cs[`border${s}Color`]),
      }));
      const visibleBorder = borders.filter((x) => x.w > 0 && x.style !== 'none' && x.c && x.c.a > 0.3);
      const shadow = cs.boxShadow !== 'none';
      const hasBox = !!bg || visibleBorder.length === 4 || shadow;
      const radius = maxRadius(cs);
      const isCell = /^(td|th|tr|thead|tbody|tfoot)$/i.test(el.tagName);

      // sharp
      if (hasBox && radius < 6 && rect.width >= 24 && rect.height >= 16 && !isCell && rect.width < innerWidth - 40 && !clippedRound(el, rect))
        add('sharp', `radius ${radius}px`);

      // off-palette / white surfaces
      if (bg && bg.a > 0.9) {
        const { s, l } = hsl(bg);
        const area = rect.width * rect.height;
        if (l > 0.97 && area > 120 * 40 && !isCell) add('white', `rgb(${key(bg)})`);
        else if (l > 0.82 && l <= 0.97 && s < 0.35 && !PALETTE.includes(key(bg)) && area > 60 * 24) add('off-palette', `rgb(${key(bg)})`);
      }

      // box-border
      if (visibleBorder.length === 4 && rect.width >= 24 && rect.height >= 16 && !isCell)
        add('box-border', `${visibleBorder[0].w}px rgb(${key(visibleBorder[0].c)})`);

      // flat-control
      if (el.matches(CONTROL) && (bg || visibleBorder.length) && !shadow && rect.width >= 24) add('flat-control', 'no box-shadow');
    }

    const groups = new Map();
    for (const h of hits) {
      const k = `${h.rule}|${label(h.el)}|${h.value}`;
      const g = groups.get(k) || { rule: h.rule, el: label(h.el), value: h.value, size: h.size, where: where(h.el), count: 0 };
      g.count++;
      groups.set(k, g);
    }
    const byRule = {};
    for (const h of hits) byRule[h.rule] = (byRule[h.rule] || 0) + 1;
    return {
      view: location.pathname.replace(/^\/v2\/location\/[^/]+/, ''),
      scanned,
      byRule,
      groups: [...groups.values()].sort((a, b) => b.count - a.count).slice(0, top),
    };
  }

  function mark(rule) {
    unmark();
    const layer = document.createElement('div');
    layer.id = 'bb-audit-layer';
    layer.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:2147483647';
    for (const h of hits.filter((x) => !rule || x.rule === rule)) {
      const r = h.el.getBoundingClientRect();
      const box = document.createElement('div');
      box.style.cssText = `position:fixed;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;outline:2px dashed #e0245e;`;
      layer.append(box);
    }
    document.body.append(layer);
    return layer.childElementCount;
  }
  const unmark = () => document.getElementById('bb-audit-layer')?.remove();

  window.bbAudit = { run, mark, unmark };
  return 'bbAudit ready';
})();
