// Draft of the site's opening animation, as a standalone page (out/intro.html).
// Everything is inline SVG animated with CSS, so it stays sharp and small.
import { writeFileSync } from "node:fs";
import { handDefs, robotHand } from "./hand.mjs";
import { butterfly, pieceDefs } from "./pieces.mjs";

const dots = [];
for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) if (!(x === 2 && y === 0)) dots.push([x, y]);

const svg = `<svg class="scene" viewBox="0 0 720 600" xmlns="http://www.w3.org/2000/svg">
<defs>${handDefs("a")}${pieceDefs("a")}
  <linearGradient id="capsule" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".5" stop-color="#8b5cf6"/><stop offset="1" stop-color="#d946ef"/></linearGradient>
  <radialGradient id="sheen" cx=".3" cy=".1" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".05"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
  <linearGradient id="inner" x1="0" x2="0" y1="0" y2="1"><stop offset=".6" stop-color="#1e1b4b" stop-opacity="0"/><stop offset="1" stop-color="#1e1b4b" stop-opacity=".45"/></linearGradient>
  <linearGradient id="sweep" x1="0" x2="0" y1="1" y2="0"><stop offset="0" stop-color="#22d3ee" stop-opacity="0"/><stop offset=".5" stop-color="#e0fbff" stop-opacity=".9"/><stop offset="1" stop-color="#a855f7" stop-opacity="0"/></linearGradient>
  <clipPath id="handClip"><rect x="0" y="0" width="720" height="600"/></clipPath>
</defs>
<!-- 1. The logo's dots settle; the outlier dot leaves the grid. -->
<g class="logo" transform="translate(316 256)">
  ${dots.map(([x, y], i) => `<circle class="dot" style="--i:${i}" cx="${x * 22}" cy="${y * 22}" r="7" fill="#3b3b52"/>`).join("")}
  <circle class="out" cx="60" cy="-16" r="9" fill="url(#abrand)"/>
</g>
<!-- 2. The light stretches into the capsule; the rings draw around it. -->
<g class="capsule">
  <rect x="120" y="150" width="480" height="230" rx="115" fill="url(#capsule)" filter="url(#abig)" opacity=".6"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#capsule)"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#inner)"/>
  <rect x="120" y="140" width="480" height="230" rx="115" fill="url(#sheen)"/>
  <rect x="121" y="141" width="478" height="228" rx="114" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="1.5"/>
</g>
<path class="ring back" pathLength="1" d="M30 250 A330 120 0 0 1 690 250" fill="none" stroke="#c4b5fd" stroke-opacity=".35" stroke-width="1.4"/>
<!-- 3. The hand rises; a light runs up through it. -->
<g clip-path="url(#handClip)"><g class="hand"><g transform="translate(380 640) rotate(10) scale(1.38)">${robotHand("a", "reach", { arm: 200 })}</g></g>
</g>
<path class="ring front" pathLength="1" d="M30 250 A330 120 0 0 0 690 250" fill="none" stroke="#c4b5fd" stroke-opacity=".55" stroke-width="1.4"/>
<circle class="sat s1" cx="690" cy="250" r="6" fill="#22d3ee"/><circle class="sat s2" cx="96" cy="196" r="4" fill="#a855f7"/>
<!-- 4. The butterfly flies in and lands on the fingertip. -->
<g class="fly"><g transform="rotate(-14) scale(1.05)">${butterfly("a")}</g></g>
</svg>`;

const css = `
*{box-sizing:border-box}html,body{margin:0;height:100%;background:#07070c;color:#f1f1f7;font:16px/1.5 Inter,system-ui,sans-serif;overflow:hidden}
.stage{position:fixed;inset:0;display:grid;grid-template-rows:1fr auto;justify-items:center;align-items:center;padding:4vh 0 7vh}
.scene{width:min(88vw,calc(70vh * 1.2),820px);height:auto;overflow:visible}
.headline{text-align:center;opacity:0;transform:translateY(16px);animation:up .8s cubic-bezier(.2,.8,.2,1) 3s forwards}
.headline h1{font:600 clamp(28px,4vw,44px)/1.1 "Space Grotesk",Inter,sans-serif;margin:0 0 8px;letter-spacing:-.02em}
.headline p{margin:0;color:#9090a6}
.skip{position:fixed;right:24px;top:20px;background:none;border:1px solid #2a2a38;color:#9090a6;border-radius:999px;padding:6px 14px;font:13px Inter;cursor:pointer}
.replay{position:fixed;left:24px;top:20px;background:none;border:0;color:#5b5b70;font:13px Inter;cursor:pointer}

/* 1. logo */
.dot{transform-box:fill-box;transform-origin:center;transform:scale(0);animation:pop .45s cubic-bezier(.3,1.6,.5,1) calc(var(--i)*55ms) forwards, fadeout .35s ease 1.05s forwards}
.out{transform-box:fill-box;transform-origin:center;opacity:0;animation:outlier .7s cubic-bezier(.2,.9,.2,1) .5s forwards, grow .55s cubic-bezier(.6,0,.4,1) 1.05s forwards}
@keyframes pop{to{transform:scale(1)}}
@keyframes fadeout{to{opacity:0;transform:scale(.4)}}
@keyframes outlier{0%{opacity:1;transform:translate(-16px,38px) scale(.7)}60%{transform:translate(4px,-6px) scale(1.15)}100%{opacity:1;transform:none}}
@keyframes grow{to{transform:translate(-16px,38px) scale(4);opacity:0}}

/* 2. capsule and rings */
.capsule{transform-box:fill-box;transform-origin:center;transform:scale(.05,.25);opacity:0;animation:capsule .8s cubic-bezier(.2,.9,.2,1) 1.2s forwards}
@keyframes capsule{0%{opacity:0;transform:scale(.05,.25)}35%{opacity:1;transform:scale(.4,.6)}100%{opacity:1;transform:none}}
.ring{stroke-dasharray:1;stroke-dashoffset:1;animation:draw 1s cubic-bezier(.4,0,.2,1) 1.5s forwards}
.ring.front{animation-delay:1.7s}
@keyframes draw{to{stroke-dashoffset:0}}
.sat{opacity:0;animation:fadein .4s ease 2.3s forwards}
@keyframes fadein{to{opacity:1}}

/* 3. hand and light sweep */
.hand{transform:translateY(340px);animation:rise 1.1s cubic-bezier(.16,1,.3,1) 1.75s forwards}
@keyframes rise{to{transform:none}}
/* As the hand arrives, its seams flare once. */
.hand{animation:rise 1.1s cubic-bezier(.16,1,.3,1) 1.75s forwards, flare 1s ease-in-out 2.5s}
@keyframes flare{50%{filter:brightness(1.35) drop-shadow(0 0 18px rgba(34,211,238,.6))}}

/* 4. butterfly: flies along a curve, flapping, and lands */
.fly{offset-path:path("M760 40 C620 -20 520 120 600 170 C660 210 470 260 380 214");offset-rotate:0deg;offset-distance:0%;opacity:0;animation:flyin 1.4s cubic-bezier(.45,0,.2,1) 2.45s forwards}
@keyframes flyin{0%{offset-distance:0%;opacity:0}10%{opacity:1}100%{offset-distance:100%;opacity:1}}
.wing{transform-box:view-box;transform-origin:0 0;animation:flap .22s ease-in-out 2.45s 7 alternate, rest 2.4s ease-in-out 4.1s infinite alternate}
@keyframes flap{to{transform:scaleX(.25)}}
@keyframes rest{50%{transform:scaleX(.7)}}

@keyframes up{to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){*{animation-duration:0s!important;animation-delay:0s!important}}
`;

const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Outlier intro draft</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style></head><body>
<div class="stage">${svg}<div class="headline"><h1>Tell us what you are building.</h1><p>We will show you the team.</p></div></div>
<button class="skip" onclick="document.querySelectorAll('*').forEach(e=>e.getAnimations().forEach(a=>a.finish()))">Skip</button>
<button class="replay" onclick="location.reload()">Replay</button>
</body></html>`;
writeFileSync(new URL("./out/intro.html", import.meta.url), html);
console.log("intro written");
