// Draft of the site's opening animation, as a standalone page (out/intro.html).
// Everything is inline SVG animated with CSS, so it stays sharp and small.
import { writeFileSync } from "node:fs";
import { INTRO_CSS, heroScene } from "./scene.mjs";

const svg = heroScene("a");

const css = `
*{box-sizing:border-box}html,body{margin:0;height:100%;background:#07070c;color:#f1f1f7;font:16px/1.5 Inter,system-ui,sans-serif;overflow:hidden}
.stage{position:fixed;inset:0;display:grid;grid-template-rows:1fr auto;justify-items:center;align-items:center;padding:4vh 0 7vh}
.scene{width:min(88vw,calc(70vh * 1.2),820px);height:auto;overflow:visible}
.headline{text-align:center;opacity:0;transform:translateY(16px);animation:up .8s cubic-bezier(.2,.8,.2,1) 3s forwards}
.headline h1{font:600 clamp(28px,4vw,44px)/1.1 "Space Grotesk",Inter,sans-serif;margin:0 0 8px;letter-spacing:-.02em}
.headline p{margin:0;color:#9090a6}
.skip{position:fixed;right:24px;top:20px;background:none;border:1px solid #2a2a38;color:#9090a6;border-radius:999px;padding:6px 14px;font:13px Inter;cursor:pointer}
.replay{position:fixed;left:24px;top:20px;background:none;border:0;color:#5b5b70;font:13px Inter;cursor:pointer}

${INTRO_CSS}
@keyframes up{to{opacity:1;transform:none}}
@media (prefers-reduced-motion: reduce){*{animation-duration:0s!important;animation-delay:0s!important}}
`;

const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Outlier intro draft</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600&family=Inter:wght@400;500&display=swap" rel="stylesheet">
<style>${css}</style></head><body>
<div class="stage intro">${svg}<div class="headline"><h1>Tell us what you are building.</h1><p>We will show you the team.</p></div></div>
<button class="skip" onclick="document.querySelectorAll('*').forEach(e=>e.getAnimations().forEach(a=>a.finish()))">Skip</button>
<button class="replay" onclick="location.reload()">Replay</button>
</body></html>`;
writeFileSync(new URL("./out/intro.html", import.meta.url), html);
console.log("intro written");
