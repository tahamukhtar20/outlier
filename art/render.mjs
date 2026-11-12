// Writes every artwork as an SVG file into art/out and a contact sheet to review them.
import { writeFileSync, mkdirSync } from "node:fs";
import { handDefs, robotHand } from "./hand.mjs";
import { aiHead, bolt, butterfly, gears, orbits, pieceDefs } from "./pieces.mjs";
import { ICONS, logo, stamp, underline } from "./icons.mjs";
import { TEAM, avatar } from "./avatars.mjs";

const out = new URL("./out/", import.meta.url);
mkdirSync(out, { recursive: true });
const svg = (w, h, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">${body}</svg>`;
const files = {};

for (const pose of ["open", "point", "reach"]) {
  files[`hand-${pose}`] = svg(420, 620, `<defs>${handDefs("h")}</defs><g transform="translate(210 400)">${robotHand("h", pose)}</g>`);
}

const defs = (p) => `<defs>${handDefs(p)}${pieceDefs(p)}</defs>`;

// Hero: a glass capsule of colour with orbit rings, the hand rising through it towards a butterfly.
const ring = (half) => `<path d="M30 250 A330 120 0 0 ${half === "back" ? 1 : 0} 690 250" fill="none" stroke="#c4b5fd" stroke-opacity="${half === "back" ? 0.35 : 0.55}" stroke-width="1.4"/>`;
files["hero"] = svg(720, 600, `${defs("a")}
  <defs>
    <linearGradient id="capsule" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#d946ef"/></linearGradient>
    <radialGradient id="sheen" cx=".3" cy=".1" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <linearGradient id="inner" x1="0" x2="0" y1="0" y2="1"><stop offset=".6" stop-color="#1e1b4b" stop-opacity="0"/><stop offset="1" stop-color="#1e1b4b" stop-opacity=".45"/></linearGradient>
  </defs>
  <rect x="120" y="150" width="480" height="230" rx="115" fill="url(#capsule)" filter="url(#abig)" opacity=".6"/>
  ${ring("back")}
  <ellipse cx="360" cy="250" rx="390" ry="150" fill="none" stroke="#c4b5fd" stroke-opacity=".18" stroke-width="1"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#capsule)"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#inner)"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#sheen)"/>
  <rect x="121" y="141" width="478" height="228" rx="114" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>
  <g transform="translate(380 640) rotate(10) scale(1.38)">${robotHand("a", "reach", { arm: 200 })}</g>
  ${ring("front")}
  <circle cx="690" cy="250" r="6" fill="#22d3ee"/><circle cx="96" cy="196" r="4" fill="#a855f7"/>
  <g transform="translate(380 214) rotate(-14) scale(1.05)">${butterfly("a")}</g>`);

// About: a hand pointing up-left towards turning gears, linked by a dotted path.
files["about"] = svg(560, 560, `${defs("b")}
  <circle cx="160" cy="150" r="120" fill="url(#bbrand)" filter="url(#bbig)" opacity=".25"/>
  <g transform="translate(140 140) scale(1.5)">${gears("b")}</g>
  <path d="M250 300 C230 270 220 250 212 230" stroke="#c4b5fd" stroke-width="2" stroke-dasharray="2 7" stroke-linecap="round" fill="none"/>
  <g transform="translate(420 610) rotate(-30) scale(1.05)">${robotHand("b", "point", { arm: 220 })}</g>`);

// Work: an open palm on its side, holding a glowing orb.
files["palm"] = svg(640, 420, `${defs("c")}
  <circle cx="300" cy="120" r="54" fill="url(#cbrand)" filter="url(#cbig)" opacity=".7"/>
  <circle cx="300" cy="120" r="30" fill="url(#cbrand)"/><circle cx="290" cy="110" r="10" fill="#fff" opacity=".7"/>
  <g transform="translate(560 300) rotate(-80)">${robotHand("c", "open", { arm: 260 })}</g>`);

files["ai-head"] = svg(400, 400, `${defs("d")}${aiHead("d")}`);
files["bolt"] = svg(200, 200, `${defs("e")}<g transform="translate(100 100)">${bolt("e")}</g>`);
files["butterfly"] = svg(200, 160, `${defs("f")}<g transform="translate(100 86)">${butterfly("f")}</g>`);

for (const [name, draw] of Object.entries(ICONS)) files[`icon-${name}`] = draw(`i${name}`);
TEAM.forEach((person, i) => (files[`avatar-${person.name}`] = avatar(person, `av${i}`)));
files["stamp"] = stamp("st");
files["logo"] = logo("lg");
files["underline"] = underline("ul");

for (const [name, s] of Object.entries(files)) writeFileSync(new URL(`${name}.svg`, out), s);
writeFileSync(new URL("sheet.html", out), `<!doctype html><body style="margin:0;padding:24px;background:#0b0b12;display:flex;flex-wrap:wrap;gap:24px;font:13px sans-serif;color:#9a9ab0">${Object.keys(files).map((n) => `<figure style="margin:0;background:#15151f;border-radius:14px;padding:12px"><img src="${n}.svg" style="height:${n.startsWith("icon-") || n === "logo" ? 96 : n.startsWith("avatar-") ? 140 : n === "stamp" ? 160 : n === "underline" ? 24 : 380}px;max-width:560px;display:block"><figcaption>${n}</figcaption></figure>`).join("")}</body>`);
console.log(Object.keys(files).length, "files");
