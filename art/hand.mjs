// A mechanical hand drawn from parameters, so one design gives every pose.
// Local coordinates: the wrist is at (0, 0) and the fingers point up (negative y).

const f = (n) => +n.toFixed(2);

/** Shared gradients and filters. `p` prefixes every id so several drawings can share a page. */
export function handDefs(p) {
  return `
  <linearGradient id="${p}metal" x1="0" x2="1">
    <stop offset="0" stop-color="#262c3a"/><stop offset=".14" stop-color="#7c869b"/>
    <stop offset=".36" stop-color="#dfe4ee"/><stop offset=".5" stop-color="#ffffff"/>
    <stop offset=".7" stop-color="#c3cad8"/><stop offset=".88" stop-color="#5b6478"/><stop offset="1" stop-color="#2a3040"/>
  </linearGradient>
  <linearGradient id="${p}plate" x1="0" x2="1">
    <stop offset="0" stop-color="#f7f9fd" stop-opacity=".0"/><stop offset=".35" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".65" stop-color="#ffffff" stop-opacity=".2"/><stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
  </linearGradient>
  <linearGradient id="${p}dark" x1="0" x2="1">
    <stop offset="0" stop-color="#0b0e15"/><stop offset=".5" stop-color="#262d3d"/><stop offset="1" stop-color="#0b0e15"/>
  </linearGradient>
  <radialGradient id="${p}joint" cx=".38" cy=".32" r=".75">
    <stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#a7b0c2"/><stop offset="1" stop-color="#232937"/>
  </radialGradient>
  <linearGradient id="${p}palm" x1=".1" y1="0" x2=".9" y2="1">
    <stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#e3e8f1"/><stop offset=".75" stop-color="#9aa3b6"/><stop offset="1" stop-color="#4e576b"/>
  </linearGradient>
  <radialGradient id="${p}pad" cx=".4" cy=".35" r=".8">
    <stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#c9d0dc"/><stop offset="1" stop-color="#5f687c"/>
  </radialGradient>
  <linearGradient id="${p}glow" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#a855f7"/>
  </linearGradient>
  <linearGradient id="${p}fade" x1="0" x2="0" y1="0" y2="1">
    <stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/>
  </linearGradient>
  <mask id="${p}armfade" maskUnits="userSpaceOnUse" x="-120" y="-20" width="240" height="260"><rect x="-120" y="-20" width="240" height="260" fill="url(#${p}fade)"/></mask>
  <filter id="${p}blur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="2.2"/></filter>
  <filter id="${p}shadow" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#4c1d95" flood-opacity=".5"/>
  </filter>`;
}

/** A glowing seam: a soft blurred line under a crisp thin one. */
const seam = (p, d, w = 2) =>
  `<path d="${d}" stroke="url(#${p}glow)" stroke-width="${f(w * 3.2)}" fill="none" filter="url(#${p}blur)" opacity=".85" stroke-linecap="round"/>` +
  `<path d="${d}" stroke="url(#${p}glow)" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;

/** A tapered segment from (0,0) up to (0,-L), base width w, tip width wt, with rounded ends. */
function segPath(L, w, wt) {
  const a = w / 2, b = wt / 2;
  return `M${f(-a)} 0 L${f(-b)} ${f(-L)} Q${f(-b)} ${f(-L - b)} 0 ${f(-L - b)} Q${f(b)} ${f(-L - b)} ${f(b)} ${f(-L)} L${f(a)} 0 Q${f(a)} ${f(a * 0.7)} 0 ${f(a * 0.7)} Q${f(-a)} ${f(a * 0.7)} ${f(-a)} 0 Z`;
}

/**
 * A finger as nested segments. `segs` is a list of { len, angle, fore } where `angle` bends
 * the segment (degrees) and `fore` (0..1) shortens it, suggesting a curl towards the viewer.
 */
function finger(p, x, y, width, spread, segs) {
  let out = `<g transform="translate(${x} ${y}) rotate(${spread})">`;
  let closes = 1;
  segs.forEach((s, i) => {
    const fore = s.fore ?? 1;
    const L = s.len * fore;
    const w = width * (1 - i * 0.07), wt = w * 0.9;
    out += `<g transform="rotate(${s.angle})">`;
    closes++;
    out += `<path d="${segPath(L, w, wt)}" fill="url(#${p}metal)" stroke="#161b26" stroke-width="1.3"/>`;
    // Armour plate on top of the segment, and a dark gap ring near the base.
    out += `<path d="${segPath(L * 0.72, w * 0.62, wt * 0.58)}" transform="translate(0 ${f(-L * 0.14)})" fill="url(#${p}plate)"/>`;
    out += `<path d="M${f(-w * 0.46)} ${f(-w * 0.32)} Q0 ${f(-w * 0.12)} ${f(w * 0.46)} ${f(-w * 0.32)}" stroke="#161b26" stroke-width="1.4" fill="none" opacity=".55"/>`;
    if (fore < 1) out += `<path d="${segPath(L, w, wt)}" fill="#0a0d14" opacity="${f((1 - fore) * 0.5)}"/>`;
    if (i === segs.length - 1) out += seam(p, `M${f(-wt * 0.18)} ${f(-L - wt * 0.12)} H${f(wt * 0.18)}`, 1.5);
    // A small recessed joint pin at the base.
    out += `<circle r="${f(w * 0.24)}" fill="url(#${p}joint)" stroke="#161b26" stroke-width="1"/><circle r="${f(w * 0.09)}" fill="#22d3ee"/>`;
    out += `<g transform="translate(0 ${f(-L)})">`;
    closes++;
  });
  return out + "</g>".repeat(closes);
}

function palm(p) {
  const d = "M-48 0 C-56 -26 -76 -64 -78 -106 Q-79 -128 -58 -130 L58 -130 Q79 -128 78 -106 C76 -64 56 -26 48 0 Z";
  let out = `<path d="${d}" fill="url(#${p}palm)" stroke="#161b26" stroke-width="1.6"/>`;
  // Inner plate outline and the thumb's pad.
  out += `<path d="M-34 -16 C-40 -36 -54 -64 -56 -96 Q-56 -110 -44 -110 L44 -110 Q56 -110 56 -96 C54 -64 40 -36 34 -16 Z" fill="none" stroke="#8b94a8" stroke-width="1.3" opacity=".65"/>`;
  out += `<ellipse cx="-50" cy="-40" rx="26" ry="34" transform="rotate(-18 -50 -40)" fill="url(#${p}pad)" stroke="#161b26" stroke-width="1.4"/>`;
  out += seam(p, "M-58 -56 Q-46 -34 -34 -20", 1.4);
  // Knuckle caps.
  for (const [x, w] of [[-50, 30], [-17, 31], [17, 30], [50, 26]]) out += `<rect x="${x - w / 2}" y="-138" width="${w}" height="20" rx="10" fill="url(#${p}metal)" stroke="#161b26" stroke-width="1.2"/>`;
  // Centre emblem.
  const hex = Array.from({ length: 6 }, (_, i) => {
    const a = (Math.PI / 3) * i + Math.PI / 6;
    return `${f(8 + Math.cos(a) * 16)},${f(-70 + Math.sin(a) * 16)}`;
  }).join(" ");
  out += `<polygon points="${hex}" fill="url(#${p}dark)" stroke="#a7b0c2" stroke-width="1.5"/>`;
  out += `<circle cx="8" cy="-70" r="9" fill="url(#${p}glow)" filter="url(#${p}blur)"/><circle cx="8" cy="-70" r="5" fill="#e6fbff"/>`;
  out += seam(p, "M40 -100 L28 -100 L22 -92", 1.4);
  return out;
}

function forearm(p, len) {
  let out = `<g mask="url(#${p}armfade)">`;
  out += `<path d="M-46 2 C-50 60 -60 140 -64 ${len} L64 ${len} C60 140 50 60 46 2 Z" fill="url(#${p}metal)" stroke="#161b26" stroke-width="1.5"/>`;
  out += `<path d="M-12 8 C-13 70 -16 150 -18 ${len} L18 ${len} C16 150 13 70 12 8 Z" fill="url(#${p}dark)" opacity=".9"/>`;
  for (const y of [52, 104, 156]) out += `<path d="M${f(-48 - y * 0.08)} ${y} Q0 ${y + 10} ${f(48 + y * 0.08)} ${y}" stroke="#161b26" stroke-width="2" fill="none" opacity=".5"/>`;
  out += seam(p, `M30 18 C33 80 37 140 40 ${len - 30}`, 2);
  out += `</g>`;
  // Wrist collar.
  out += `<rect x="-54" y="-8" width="108" height="22" rx="11" fill="url(#${p}dark)" stroke="#a7b0c2" stroke-width="1.2"/>`;
  out += seam(p, "M-38 3 H38", 1.6);
  return out;
}

const POSES = {
  open: {
    thumb: { x: -62, y: -50, spread: -62, segs: [{ len: 40, angle: 0 }, { len: 32, angle: 12 }, { len: 24, angle: 12 }] },
    fingers: [
      { spread: -12, segs: [{ len: 50, angle: 0 }, { len: 34, angle: 4 }, { len: 26, angle: 4 }] },
      { spread: -3, segs: [{ len: 56, angle: 0 }, { len: 38, angle: 2 }, { len: 28, angle: 2 }] },
      { spread: 7, segs: [{ len: 52, angle: 0 }, { len: 34, angle: -3 }, { len: 26, angle: -3 }] },
      { spread: 17, segs: [{ len: 40, angle: 0 }, { len: 28, angle: -5 }, { len: 22, angle: -5 }] },
    ],
  },
  point: {
    thumb: { x: -60, y: -58, spread: -20, segs: [{ len: 36, angle: 34 }, { len: 28, angle: 40, fore: 0.8 }] },
    fingers: [
      { spread: -4, segs: [{ len: 56, angle: 0 }, { len: 40, angle: 2 }, { len: 30, angle: 2 }] },
      { spread: 0, segs: [{ len: 40, angle: 0, fore: 0.62 }, { len: 30, angle: 8, fore: 0.32 }, { len: 22, angle: 8, fore: 0.28 }] },
      { spread: 4, segs: [{ len: 38, angle: 0, fore: 0.58 }, { len: 28, angle: 6, fore: 0.3 }, { len: 22, angle: 6, fore: 0.28 }] },
      { spread: 8, segs: [{ len: 30, angle: 0, fore: 0.58 }, { len: 24, angle: 4, fore: 0.3 }, { len: 18, angle: 4, fore: 0.28 }] },
    ],
  },
  reach: {
    thumb: { x: -62, y: -52, spread: -50, segs: [{ len: 40, angle: 8 }, { len: 32, angle: 20 }, { len: 24, angle: 18 }] },
    fingers: [
      { spread: -8, segs: [{ len: 56, angle: 0 }, { len: 40, angle: 6 }, { len: 30, angle: 9 }] },
      { spread: -1, segs: [{ len: 52, angle: 0, fore: 0.9 }, { len: 36, angle: 10, fore: 0.72 }, { len: 26, angle: 12, fore: 0.6 }] },
      { spread: 6, segs: [{ len: 46, angle: 0, fore: 0.82 }, { len: 32, angle: 12, fore: 0.58 }, { len: 24, angle: 14, fore: 0.48 }] },
      { spread: 13, segs: [{ len: 36, angle: 0, fore: 0.78 }, { len: 26, angle: 14, fore: 0.52 }, { len: 20, angle: 14, fore: 0.42 }] },
    ],
  },
};

const BASES = [[-50, -130, 31], [-17, -132, 32], [17, -131, 31], [50, -128, 26]];

/** The hand and forearm as an SVG group (defs come from handDefs with the same prefix). */
export function robotHand(p, pose = "open", { arm = 220 } = {}) {
  const P = POSES[pose];
  const t = P.thumb;
  let out = `<g filter="url(#${p}shadow)">`;
  out += forearm(p, arm);
  out += finger(p, t.x, t.y, 33, t.spread, t.segs);
  out += palm(p);
  P.fingers.forEach((fi, i) => {
    const [x, y, w] = BASES[i];
    out += finger(p, x, y, w, fi.spread, fi.segs);
  });
  return out + "</g>";
}
