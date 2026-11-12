// The hero scene with the classes the intro animation targets, plus that animation's CSS.
import { handDefs, robotHand } from "./hand.mjs";
import { butterfly, pieceDefs } from "./pieces.mjs";

export function heroScene(p = "hs") {
  const dots = [];
  for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) if (!(x === 2 && y === 0)) dots.push([x, y]);
  return `<svg class="scene" viewBox="0 0 720 600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
<defs>${handDefs(p)}${pieceDefs(p)}
  <linearGradient id="${p}capsule" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#d946ef"/></linearGradient>
  <radialGradient id="${p}sheen" cx=".3" cy=".1" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <linearGradient id="${p}inner" x1="0" x2="0" y1="0" y2="1"><stop offset=".6" stop-color="#1e1b4b" stop-opacity="0"/><stop offset="1" stop-color="#1e1b4b" stop-opacity=".45"/></linearGradient>
  <clipPath id="${p}clip"><rect x="-200" y="-200" width="1120" height="800"/></clipPath>
  <linearGradient id="${p}fadeBg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#07070c" stop-opacity="0"/><stop offset="1" stop-color="#07070c"/></linearGradient>
  <linearGradient id="${p}fadeY" x1="0" x2="0" y1="0" y2="1"><stop offset=".82" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="${p}bottom" maskUnits="userSpaceOnUse" x="-200" y="-200" width="1120" height="800"><rect x="-200" y="-200" width="1120" height="800" fill="url(#${p}fadeY)"/></mask>
</defs>
<g class="logo" transform="translate(316 256)">
  ${dots.map(([x, y], i) => `<circle class="dot" style="--i:${i}" cx="${x * 22}" cy="${y * 22}" r="7" fill="#3b3b52"/>`).join("")}
  <circle class="out" cx="60" cy="-16" r="9" fill="url(#${p}brand)"/>
</g>
<g class="capsule">
  <rect x="120" y="150" width="480" height="230" rx="115" fill="url(#${p}capsule)" filter="url(#${p}big)" opacity=".6"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#${p}capsule)"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#${p}inner)"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#${p}sheen)"/>
  <rect x="121" y="141" width="478" height="228" rx="114" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>
</g>
<path class="ring back" pathLength="1" d="M30 250 A330 120 0 0 1 690 250" fill="none" stroke="#c4b5fd" stroke-opacity=".35" stroke-width="1.4"/>
<g clip-path="url(#${p}clip)"><g class="hand"><g transform="translate(380 640) rotate(10) scale(1.38)">${robotHand(p, "reach", { arm: 200 })}</g></g></g>
<rect x="-200" y="520" width="1120" height="82" fill="url(#${p}fadeBg)"/>
<path class="ring front" pathLength="1" d="M30 250 A330 120 0 0 0 690 250" fill="none" stroke="#c4b5fd" stroke-opacity=".55" stroke-width="1.4"/>
<circle class="sat s1" cx="690" cy="250" r="6" fill="#22d3ee"/><circle class="sat s2" cx="96" cy="196" r="4" fill="#a855f7"/>
<g class="fly"><g transform="rotate(-14) scale(1.05)">${butterfly(p)}</g></g>
</svg>`;
}

/** Scoped under `.intro`; without that class the scene shows its final state. T shifts the timeline. */
export const INTRO_CSS = `
.scene .fly{offset-path:path("M760 40 C620 -20 520 120 600 170 C660 210 470 260 380 214");offset-rotate:0deg;offset-distance:100%}
.scene .wing{transform-box:view-box;transform-origin:0 0}
.scene .logo{opacity:0}
@media (prefers-reduced-motion: no-preference){
.scene .wing{animation:rest 2.4s ease-in-out infinite alternate}
.intro .scene .logo{opacity:1}
.intro .scene .dot{transform-box:fill-box;transform-origin:center;transform:scale(0);animation:pop .45s cubic-bezier(.3,1.6,.5,1) calc(var(--i)*55ms) forwards, fadeout .35s ease 1.05s forwards}
.intro .scene .out{transform-box:fill-box;transform-origin:center;opacity:0;animation:outlier .7s cubic-bezier(.2,.9,.2,1) .5s forwards, grow .55s cubic-bezier(.6,0,.4,1) 1.05s forwards}
.intro .scene .capsule{transform-box:fill-box;transform-origin:center;opacity:0;animation:capsule .8s cubic-bezier(.2,.9,.2,1) 1.2s both}
.intro .scene .ring{stroke-dasharray:1;stroke-dashoffset:1;animation:draw 1s cubic-bezier(.4,0,.2,1) 1.5s forwards}
.intro .scene .ring.front{animation-delay:1.7s}
.intro .scene .sat{opacity:0;animation:fadein .4s ease 2.3s forwards}
.intro .scene .hand{transform:translateY(340px);animation:rise 1.1s cubic-bezier(.16,1,.3,1) 1.75s forwards, flare 1s ease-in-out 2.5s}
.intro .scene .fly{offset-distance:0%;opacity:0;animation:flyin 1.4s cubic-bezier(.45,0,.2,1) 2.45s forwards}
.intro .scene .wing{animation:flap .22s ease-in-out 2.45s 7 alternate, rest 2.4s ease-in-out 4.1s infinite alternate}
}
@keyframes pop{to{transform:scale(1)}}
@keyframes fadeout{to{opacity:0;transform:scale(.4)}}
@keyframes outlier{0%{opacity:1;transform:translate(-16px,38px) scale(.7)}60%{transform:translate(4px,-6px) scale(1.15)}100%{opacity:1;transform:none}}
@keyframes grow{to{transform:translate(-16px,38px) scale(4);opacity:0}}
@keyframes capsule{0%{opacity:0;transform:scale(.05,.25)}35%{opacity:1;transform:scale(.4,.6)}100%{opacity:1;transform:none}}
@keyframes draw{to{stroke-dashoffset:0}}
@keyframes fadein{to{opacity:1}}
@keyframes rise{to{transform:none}}
@keyframes flare{50%{filter:brightness(1.35) drop-shadow(0 0 18px rgba(34,211,238,.6))}}
@keyframes flyin{0%{offset-distance:0%;opacity:0}10%{opacity:1}100%{offset-distance:100%;opacity:1}}
@keyframes flap{to{transform:scaleX(.25)}}
@keyframes rest{50%{transform:scaleX(.7)}}
`;
