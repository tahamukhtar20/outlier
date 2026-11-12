// Smaller illustrations: butterfly, AI head, lightning bolt, gears, orbit rings.
const f = (n) => +n.toFixed(2);

/** Deterministic random numbers so every render is identical. */
export function rng(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) / 2147483647);
}

export function pieceDefs(p) {
  return `
  <linearGradient id="${p}wing" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#a855f7"/><stop offset="1" stop-color="#f472b6"/>
  </linearGradient>
  <linearGradient id="${p}wing2" x1="1" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#67e8f9"/><stop offset=".6" stop-color="#8b5cf6"/><stop offset="1" stop-color="#ec4899"/>
  </linearGradient>
  <linearGradient id="${p}brand" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#a855f7"/>
  </linearGradient>
  <linearGradient id="${p}bolt" x1=".2" y1="0" x2=".8" y2="1">
    <stop offset="0" stop-color="#67e8f9"/><stop offset=".55" stop-color="#818cf8"/><stop offset="1" stop-color="#a855f7"/>
  </linearGradient>
  <radialGradient id="${p}headGlow" cx=".55" cy=".42" r=".6">
    <stop offset="0" stop-color="#22d3ee" stop-opacity=".55"/><stop offset=".6" stop-color="#3b82f6" stop-opacity=".18"/><stop offset="1" stop-color="#0b1020" stop-opacity="0"/>
  </radialGradient>
  <filter id="${p}soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
  <filter id="${p}big" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>`;
}

/** A butterfly at the origin, about 120 wide, wings slightly turned for depth. */
export function butterfly(p) {
  const fore = "M0 0 C-14 -30 -44 -58 -70 -56 C-90 -54 -88 -30 -74 -16 C-60 -2 -26 2 0 0 Z";
  const hind = "M0 2 C-24 6 -50 18 -54 38 C-58 56 -38 62 -24 50 C-12 40 -4 22 0 2 Z";
  const veins = "M0 0 C-22 -18 -44 -38 -66 -46 M-6 -4 C-30 -12 -56 -20 -76 -24 M-4 2 C-22 14 -36 30 -44 46";
  const side = (sx, fill, op) =>
    `<g transform="scale(${sx} 1)" opacity="${op}">` +
    `<path d="${fore}" fill="url(#${p}${fill})"/><path d="${hind}" fill="url(#${p}${fill})"/>` +
    `<path d="${veins}" stroke="#1e1b4b" stroke-width="1.4" fill="none" opacity=".55"/>` +
    `<path d="${fore}" fill="none" stroke="#fff" stroke-width="1" opacity=".35"/>` +
    `<circle cx="-62" cy="-40" r="5" fill="#fff" opacity=".85"/><circle cx="-40" cy="40" r="3.5" fill="#fff" opacity=".7"/></g>`;
  return (
    `<g>` +
    `<g filter="url(#${p}soft)" opacity=".55">${side(1, "wing", 1)}${side(-0.72, "wing2", 1)}</g>` +
    // Each side sits in its own group so the intro animation can flap the wings.
    `<g class="wing wing-r">${side(-0.72, "wing2", 0.95)}</g><g class="wing wing-l">${side(1, "wing", 1)}</g>` +
    `<rect x="-3.5" y="-18" width="7" height="48" rx="3.5" fill="#1e1b2e"/>` +
    `<path d="M-1 -18 C-6 -34 -14 -42 -22 -46 M1 -18 C4 -34 10 -42 16 -46" stroke="#1e1b2e" stroke-width="1.6" fill="none"/>` +
    `<circle cx="-22" cy="-46" r="2.4" fill="#22d3ee"/><circle cx="16" cy="-46" r="2.4" fill="#a855f7"/></g>`
  );
}

/** A gear outline path centred at the origin. */
export function gearPath(r, teeth, depth = r * 0.18, hole = r * 0.4) {
  let d = "";
  const n = teeth * 4;
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const R = i % 4 === 0 || i % 4 === 1 ? r : r - depth;
    d += `${i ? "L" : "M"}${f(Math.cos(a) * R)} ${f(Math.sin(a) * R)} `;
  }
  d += "Z ";
  // Centre hole (drawn the other way round so it cuts out with nonzero fill).
  d += `M${hole} 0 A${hole} ${hole} 0 1 0 ${-hole} 0 A${hole} ${hole} 0 1 0 ${hole} 0 Z`;
  return d;
}

/** Three interlocking gears with metallic and gradient faces. */
export function gears(p) {
  const g = (x, y, r, t, rot, fill) =>
    `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="${gearPath(r, t)}" fill="${fill}" fill-rule="evenodd" stroke="#0f172a" stroke-width="1.2"/>` +
    `<circle r="${f(r * 0.62)}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/></g>`;
  return g(0, 0, 46, 12, 0, `url(#${p}brand)`) + g(64, -34, 28, 9, 12, `url(#${p}bolt)`) + g(58, 40, 22, 8, 4, "#e2e8f0");
}

/** A lightning bolt with a bevel highlight and glow, about 120 tall. */
export function bolt(p) {
  const d = "M18 -64 L-30 8 L-2 8 L-16 64 L32 -10 L4 -10 Z";
  return (
    `<path d="${d}" fill="url(#${p}bolt)" filter="url(#${p}big)" opacity=".75"/>` +
    `<path d="${d}" fill="url(#${p}bolt)" stroke="#e0e7ff" stroke-width="1.5" stroke-linejoin="round"/>` +
    `<path d="M14 -52 L-20 2 L-10 2" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".7"/>`
  );
}

/** Concentric orbit rings with a few satellites. */
export function orbits(p, rx, ry, n = 3) {
  let s = "";
  for (let i = 0; i < n; i++) {
    const k = 1 + i * 0.16;
    s += `<ellipse rx="${f(rx * k)}" ry="${f(ry * k)}" fill="none" stroke="#c4b5fd" stroke-opacity="${f(0.45 - i * 0.12)}" stroke-width="1.2"/>`;
  }
  s += `<circle cx="${f(rx * 1.16)}" cy="0" r="5" fill="#22d3ee"/><circle cx="${f(-rx * 0.6)}" cy="${f(-ry * 1.12)}" r="3.5" fill="#a855f7"/>`;
  return s;
}

// A head in profile facing right, inside a 400 x 400 box.
const HEAD =
  "M104 400 C108 340 86 300 80 250 C66 168 92 92 170 64 C244 38 316 72 334 132 C340 158 338 176 342 190 " +
  "C348 204 364 220 362 232 C360 240 346 242 344 248 C348 256 342 262 338 266 C344 272 340 280 332 284 " +
  "C328 300 320 316 298 318 C280 320 262 318 256 330 C250 346 254 372 260 400 Z";

/** An AI head: a profile filled with circuit traces, nodes and a glow, with data columns behind. */
export function aiHead(p, seed = 11) {
  const r = rng(seed);
  const G = 14, C = 5; // grid step and corner cut
  let traces = "", nodes = "", pads = "";
  // Traces run on a grid, turn with a small 45-degree chamfer, and end in a ringed node.
  for (let i = 0; i < 46; i++) {
    let x = G * Math.round((96 + r() * 230) / G), y = G * Math.round((80 + r() * 300) / G);
    const pts = [[x, y]];
    let dirH = r() > 0.5;
    const steps = 2 + Math.floor(r() * 3);
    for (let k = 0; k < steps; k++) {
      const len = G * (2 + Math.floor(r() * 4)) * (r() > 0.5 ? 1 : -1);
      if (dirH) x += len; else y += len;
      pts.push([x, y]);
      dirH = !dirH;
    }
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let k = 1; k < pts.length; k++) {
      const [px, py] = pts[k - 1], [cx, cy] = pts[k];
      const next = pts[k + 1];
      if (!next) { d += ` L${cx} ${cy}`; break; }
      const ux = Math.sign(cx - px), uy = Math.sign(cy - py), vx = Math.sign(next[0] - cx), vy = Math.sign(next[1] - cy);
      d += ` L${cx - ux * C} ${cy - uy * C} L${cx + vx * C} ${cy + vy * C}`;
    }
    const w = r() > 0.75 ? 2.6 : 1.5;
    traces += `<path d="${d}" stroke="url(#${p}brand)" stroke-width="${w}" fill="none" stroke-linejoin="round" stroke-linecap="round" opacity="${f(0.55 + r() * 0.45)}"/>`;
    const [ex, ey] = pts[pts.length - 1];
    nodes += `<circle cx="${ex}" cy="${ey}" r="${w > 2 ? 4.5 : 3.2}" fill="#0b1226" stroke="#67e8f9" stroke-width="1.6"/>`;
    if (r() > 0.6) nodes += `<circle cx="${pts[0][0]}" cy="${pts[0][1]}" r="2.2" fill="#a5f3fc"/>`;
  }
  // A few chips with pins, like components on the board.
  for (const [cx, cy, w, h] of [[196, 168, 56, 40], [252, 252, 40, 30], [150, 276, 34, 26]]) {
    pads += `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="5" fill="#0f1c3a" stroke="url(#${p}brand)" stroke-width="1.6"/>`;
    for (let k = 1; k < w / 8; k++) pads += `<path d="M${cx - w / 2 + k * 8} ${cy - h / 2} v-6 M${cx - w / 2 + k * 8} ${cy + h / 2} v6" stroke="#67e8f9" stroke-width="1.4" opacity=".8"/>`;
  }
  pads += `<rect x="178" y="155" width="36" height="26" rx="3" fill="url(#${p}brand)" opacity=".35"/>`;
  let data = "";
  for (let c = 0; c < 8; c++) {
    const x = 316 + c * 12;
    for (let k = 0; k < 24; k++) {
      if (r() < 0.45) continue;
      data += `<text x="${x}" y="${50 + k * 14}" font-family="JetBrains Mono, monospace" font-size="10" fill="#67e8f9" opacity="${f((0.12 + r() * 0.45) * (1 - c / 9))}">${r() > 0.5 ? 1 : 0}</text>`;
    }
  }
  return (
    `<defs><clipPath id="${p}headClip"><path d="${HEAD}"/></clipPath></defs>` +
    `<rect width="400" height="400" fill="url(#${p}headGlow)"/>` + data +
    `<path d="${HEAD}" fill="#0b1226" opacity=".92"/>` +
    `<g clip-path="url(#${p}headClip)"><circle cx="210" cy="200" r="110" fill="#22d3ee" opacity=".14" filter="url(#${p}big)"/>${traces}${pads}${nodes}</g>` +
    `<path d="${HEAD}" fill="none" stroke="#67e8f9" stroke-width="9" opacity=".22" filter="url(#${p}soft)"/>` +
    `<path d="${HEAD}" fill="none" stroke="url(#${p}brand)" stroke-width="2.4"/>`
  );
}
