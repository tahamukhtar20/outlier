// A duotone icon set on a 96 x 96 grid: a gradient stroke over a soft tinted fill.
import { gearPath } from "./pieces.mjs";

const defs = (p) => `<defs>
  <linearGradient id="${p}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset="1" stop-color="#a855f7"/></linearGradient>
  <linearGradient id="${p}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee" stop-opacity=".28"/><stop offset="1" stop-color="#a855f7" stop-opacity=".32"/></linearGradient>
  <filter id="${p}g" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="3"/></filter></defs>`;
const S = (p) => `stroke="url(#${p}s)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"`;
const F = (p) => `fill="url(#${p}f)"`;
const wrap = (p, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">${defs(p)}<g filter="url(#${p}g)" opacity=".55">${body}</g>${body}</svg>`;

export const ICONS = {
  briefcase: (p) => wrap(p, `<rect x="12" y="30" width="72" height="50" rx="10" ${F(p)}/><rect x="12" y="30" width="72" height="50" rx="10" ${S(p)}/><path d="M36 30v-8a6 6 0 0 1 6-6h12a6 6 0 0 1 6 6v8M12 50h72M42 50v8h12v-8" ${S(p)}/>`),
  cloud: (p) => wrap(p, `<path d="M28 58a16 16 0 0 1 2-32 22 22 0 0 1 41 6 13 13 0 0 1-1 26Z" ${F(p)}/><path d="M28 58a16 16 0 0 1 2-32 22 22 0 0 1 41 6 13 13 0 0 1-1 26Z" ${S(p)}/><path d="M38 58v12M48 58v20M58 58v12" ${S(p)}/><circle cx="38" cy="74" r="4" ${S(p)}/><circle cx="48" cy="82" r="3" ${S(p)}/><circle cx="58" cy="74" r="4" ${S(p)}/>`),
  code: (p) => wrap(p, `<rect x="10" y="14" width="64" height="52" rx="8" ${F(p)}/><rect x="10" y="14" width="64" height="52" rx="8" ${S(p)}/><path d="M10 28h64M32 40l-8 8 8 8M52 40l8 8-8 8" ${S(p)}/><circle cx="18" cy="21" r="1.5" fill="#22d3ee"/><circle cx="24" cy="21" r="1.5" fill="#a855f7"/>
    <g transform="translate(72 70)"><path d="${gearPath(15, 8, 3.5, 5)}" fill="#0b0b12" fill-rule="evenodd" stroke="url(#${p}s)" stroke-width="3.5" stroke-linejoin="round"/></g>`),
  gears: (p) => wrap(p, `<g transform="translate(38 40)"><path d="${gearPath(24, 10, 5, 8)}" ${F(p)} fill-rule="evenodd"/><path d="${gearPath(24, 10, 5, 8)}" ${S(p)}/></g><g transform="translate(70 68) rotate(14)"><path d="${gearPath(15, 8, 4, 5)}" ${S(p)}/></g><g transform="translate(70 22)"><path d="${gearPath(10, 7, 3, 3.5)}" ${S(p)}/></g>`),
  ai: (p) => wrap(p, `<path d="M48 12a36 36 0 0 0 0 72Z" ${F(p)}/><path d="M48 12a36 36 0 0 0 0 72" ${S(p)}/>
    ${[[10, 2], [18, 3], [26, 1], [34, 4], [42, 2], [50, 3]].map(([dy, n]) => "").join("")}
    <path d="M48 22h14l6 6h12M48 36h22M48 48h12l6-6h14M48 60h22M48 74h14l6-6h12" ${S(p)}/><circle cx="82" cy="28" r="3.5" ${S(p)}/><circle cx="74" cy="36" r="3.5" ${S(p)}/><circle cx="84" cy="42" r="3.5" ${S(p)}/><circle cx="74" cy="60" r="3.5" ${S(p)}/><circle cx="82" cy="68" r="3.5" ${S(p)}/>
    <path d="M30 30l-6-6M22 48h-8M30 66l-6 6" ${S(p)}/>`),
  support: (p) => wrap(p, `<g transform="translate(56 32)"><path d="${gearPath(18, 8, 4, 6)}" ${F(p)} fill-rule="evenodd"/><path d="${gearPath(18, 8, 4, 6)}" ${S(p)}/></g><path d="M8 64h14l14 6h18a5 5 0 0 1 0 10H38M22 84l30 2 34-16a6 6 0 0 0-6-10l-24 10" ${S(p)}/><path d="M8 60v28" ${S(p)}/>`),
  research: (p) => wrap(p, `<circle cx="42" cy="50" r="22" ${F(p)}/><circle cx="42" cy="50" r="22" ${S(p)}/><path d="M58 66l20 20" stroke="url(#${p}s)" stroke-width="7" stroke-linecap="round"/><path d="M34 50a8 8 0 0 1 8-8" ${S(p)}/>
    <path d="M70 26a10 10 0 1 0-14 9v5h8v-5a10 10 0 0 0 6-9ZM58 44h8" ${S(p)}/><path d="M60 8v4M76 14l-3 3M84 28h-4M44 14l3 3" ${S(p)}/>`),
  shield: (p) => wrap(p, `<path d="M48 10l30 10v24c0 20-13 34-30 42-17-8-30-22-30-42V20Z" ${F(p)}/><path d="M48 10l30 10v24c0 20-13 34-30 42-17-8-30-22-30-42V20Z" ${S(p)}/><path d="M34 48l10 10 18-20" ${S(p)}/>`),
  play: (p) => wrap(p, `<circle cx="48" cy="48" r="34" ${F(p)}/><circle cx="48" cy="48" r="34" ${S(p)}/><circle cx="48" cy="48" r="42" stroke="url(#${p}s)" stroke-width="1.5" fill="none" opacity=".5"/><path d="M41 34l20 14-20 14Z" fill="url(#${p}s)"/>`),
  rocket: (p) => wrap(p, `<path d="M58 14c14 0 24 10 24 24 0 14-14 28-30 36L22 44c8-16 22-30 36-30Z" ${F(p)}/><path d="M58 14c14 0 24 10 24 24 0 14-14 28-30 36L22 44c8-16 22-30 36-30Z" ${S(p)}/><circle cx="60" cy="36" r="7" ${S(p)}/><path d="M24 46l-10 2-4 12 14-4M50 72l-2 10-12 4 4-14M30 66l-14 14" ${S(p)}/>`),
  team: (p) => wrap(p, `<circle cx="48" cy="30" r="12" ${F(p)}/><circle cx="48" cy="30" r="12" ${S(p)}/><path d="M26 76a22 22 0 0 1 44 0" ${S(p)}/><circle cx="20" cy="40" r="8" ${S(p)}/><circle cx="76" cy="40" r="8" ${S(p)}/><path d="M6 72a14 14 0 0 1 20-12M90 72a14 14 0 0 0-20-12" ${S(p)}/>`),
  arrow: (p) => wrap(p, `<path d="M10 48h74M64 28l20 20-20 20" ${S(p)}/>`),
  star: (p) => wrap(p, `<path d="M48 10l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3Z" ${F(p)}/><path d="M48 10l11 24 26 3-19 18 5 26-23-13-23 13 5-26-19-18 26-3Z" ${S(p)}/>`),
};

/** A circular stamp with text on a ring and an arrow in the middle; spins in the site. */
export function stamp(p, text = "START A PROJECT · BUILD YOUR TEAM · ") {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">${defs(p)}
  <path id="${p}ring" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0" fill="none"/>
  <circle cx="100" cy="100" r="94" fill="#0b0b12" stroke="url(#${p}s)" stroke-width="2"/>
  <circle cx="100" cy="100" r="50" fill="url(#${p}f)" stroke="url(#${p}s)" stroke-width="1.5"/>
  <text font-family="JetBrains Mono, monospace" font-size="13.5" letter-spacing="3.2" fill="#e9e9f5"><textPath href="#${p}ring">${text}</textPath></text>
  <path d="M84 116l32-32M92 84h24v24" stroke="url(#${p}s)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>`;
}

/** Outlier's mark: a 3 x 3 grid of dots with one dot pulled out of line. */
export function logo(p, { dark = true } = {}) {
  const dot = dark ? "#3b3b52" : "#c7c7d6";
  let s = "";
  for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) if (!(x === 2 && y === 0)) s += `<circle cx="${18 + x * 22}" cy="${30 + y * 22}" r="7" fill="${dot}"/>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 96" width="96" height="96">${defs(p)}${s}
  <path d="M62 30 L74 16" stroke="url(#${p}s)" stroke-width="2" stroke-dasharray="2 4" stroke-linecap="round" opacity=".7"/>
  <circle cx="78" cy="14" r="12" fill="url(#${p}s)" filter="url(#${p}g)" opacity=".7"/><circle cx="78" cy="14" r="9" fill="url(#${p}s)"/></svg>`;
}

/** A short brush-stroke underline for headings. */
export function underline(p) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 16" width="200" height="16">${defs(p)}<path d="M4 11 C50 4 110 3 196 7" stroke="url(#${p}s)" stroke-width="5" stroke-linecap="round" fill="none"/></svg>`;
}
