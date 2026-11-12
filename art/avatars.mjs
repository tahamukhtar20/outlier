// Illustrated team portraits, so the site needs no stock photos of real people.
const PEOPLE = [
  { name: "lead", skin: "#c68a62", hair: "#1f1a17", style: "short", shirt: "#6d28d9", bg: ["#22d3ee", "#6366f1"], extra: "glasses" },
  { name: "designer", skin: "#f1c7a5", hair: "#9a3412", style: "bun", shirt: "#0e7490", bg: ["#f472b6", "#a855f7"] },
  { name: "frontend", skin: "#8d5a3b", hair: "#120e0c", style: "curly", shirt: "#1d4ed8", bg: ["#38bdf8", "#22d3ee"] },
  { name: "backend", skin: "#e0b48f", hair: "#3f2a1d", style: "beard", shirt: "#334155", bg: ["#818cf8", "#a855f7"] },
  { name: "ml", skin: "#d39a74", hair: "#0f172a", style: "hijab", shirt: "#7c3aed", bg: ["#2dd4bf", "#22d3ee"], scarf: "#4c1d95" },
  { name: "qa", skin: "#f5d0b5", hair: "#e5c07b", style: "long", shirt: "#be185d", bg: ["#a855f7", "#ec4899"] },
  { name: "mobile", skin: "#b07a52", hair: "#2b1d16", style: "short", shirt: "#0f766e", bg: ["#22d3ee", "#2dd4bf"] },
  { name: "game", skin: "#f0c2a0", hair: "#5b21b6", style: "curly", shirt: "#4338ca", bg: ["#818cf8", "#f472b6"] },
  { name: "art", skin: "#7a4a30", hair: "#0c0a09", style: "bun", shirt: "#9d174d", bg: ["#f472b6", "#fb923c"] },
  { name: "devops", skin: "#deae8c", hair: "#57534e", style: "beard", shirt: "#1e3a8a", bg: ["#38bdf8", "#818cf8"], extra: "glasses" },
];

function hair(p) {
  const h = p.hair;
  switch (p.style) {
    case "short":
      return { back: "", front: `<path d="M50 70 C48 44 66 32 82 32 C100 32 114 44 112 68 C106 56 96 52 82 52 C68 52 58 58 50 70 Z" fill="${h}"/>` };
    case "bun":
      return {
        back: `<circle cx="80" cy="30" r="15" fill="${h}"/><path d="M48 76 C44 46 62 34 80 34 C98 34 116 46 112 76 L106 92 C104 70 94 56 80 56 C66 56 56 70 54 92 Z" fill="${h}"/>`,
        front: `<path d="M52 66 C58 48 74 42 92 46 C80 50 66 56 52 66 Z" fill="${h}"/>`,
      };
    case "curly": {
      let c = "";
      for (const [x, y, r] of [[56, 58, 11], [64, 44, 12], [78, 38, 12], [94, 40, 12], [106, 50, 11], [110, 64, 9], [52, 72, 8]]) c += `<circle cx="${x}" cy="${y}" r="${r}" fill="${h}"/>`;
      return { back: "", front: c };
    }
    case "beard":
      return {
        back: "",
        front:
          `<path d="M52 66 C52 44 66 34 82 34 C100 34 112 46 110 66 C102 54 92 50 80 52 C68 52 58 58 52 66 Z" fill="${h}"/>` +
          `<path d="M56 84 C58 106 70 116 81 116 C92 116 104 106 106 84 C100 96 92 100 81 100 C70 100 62 96 56 84 Z" fill="${h}"/>`,
      };
    case "hijab":
      return {
        back: `<path d="M44 80 C40 46 60 28 81 28 C102 28 122 46 118 80 C120 104 112 124 100 132 L62 132 C50 124 42 104 44 80 Z" fill="${p.scarf}"/>`,
        front: `<path d="M54 74 C54 52 66 42 81 42 C96 42 108 52 108 74 C104 60 94 52 81 52 C68 52 58 60 54 74 Z" fill="${p.scarf}"/><path d="M58 60 C68 48 94 48 104 60" stroke="#fff" stroke-opacity=".18" stroke-width="3" fill="none"/>`,
      };
    case "long":
    default:
      return {
        back: `<path d="M46 78 C42 46 60 32 81 32 C102 32 120 46 116 78 C118 102 114 124 104 134 L58 134 C48 124 44 102 46 78 Z" fill="${h}"/>`,
        front: `<path d="M52 70 C56 48 70 40 88 42 C102 44 110 56 110 70 C100 58 84 52 66 58 C60 60 55 64 52 70 Z" fill="${h}"/>`,
      };
  }
}

export function avatar(p, id) {
  const hs = hair(p);
  const covered = p.style === "hijab";
  return `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" viewBox="0 0 160 160" width="160" height="160">
  <defs>
    <linearGradient id="${id}bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p.bg[0]}"/><stop offset="1" stop-color="${p.bg[1]}"/></linearGradient>
    <radialGradient id="${id}face" cx=".4" cy=".35" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".08"/></radialGradient>
    <clipPath id="${id}clip"><circle cx="80" cy="80" r="78"/></clipPath>
  </defs>
  <g clip-path="url(#${id}clip)">
    <rect width="160" height="160" fill="url(#${id}bg)"/>
    <circle cx="124" cy="34" r="46" fill="#fff" opacity=".12"/>
    ${hs.back}
    <path d="M30 168 C32 132 54 118 80 118 C106 118 128 132 130 168 Z" fill="${p.shirt}"/>
    <path d="M62 120 L80 140 L98 120" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3"/>
    <rect x="70" y="98" width="22" height="24" rx="8" fill="${p.skin}"/>
    <rect x="70" y="104" width="22" height="8" fill="#000" opacity=".1"/>
    ${covered ? "" : `<ellipse cx="54" cy="80" rx="6" ry="9" fill="${p.skin}"/><ellipse cx="108" cy="80" rx="6" ry="9" fill="${p.skin}"/>`}
    <ellipse cx="81" cy="76" rx="27" ry="32" fill="${p.skin}"/>
    <ellipse cx="81" cy="76" rx="27" ry="32" fill="url(#${id}face)"/>
    ${hs.front}
    <circle cx="71" cy="80" r="3" fill="#1b1b28"/><circle cx="91" cy="80" r="3" fill="#1b1b28"/>
    <path d="M66 71 Q71 68 76 71 M86 71 Q91 68 96 71" stroke="#1b1b28" stroke-width="2" stroke-linecap="round" fill="none" opacity=".7"/>
    <path d="M73 94 Q81 100 89 94" stroke="#1b1b28" stroke-width="2.4" stroke-linecap="round" fill="none"/>
    <path d="M81 82 L79 89 L83 89" stroke="#000" stroke-opacity=".2" stroke-width="1.6" fill="none" stroke-linecap="round"/>
    ${p.extra === "glasses" ? `<g fill="none" stroke="#1b1b28" stroke-width="2.2"><rect x="62" y="74" width="16" height="12" rx="5"/><rect x="84" y="74" width="16" height="12" rx="5"/><path d="M78 79 H84"/></g>` : ""}
  </g>
  <circle cx="80" cy="80" r="78" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="2"/>
</svg>`;
}

export const TEAM = PEOPLE;
