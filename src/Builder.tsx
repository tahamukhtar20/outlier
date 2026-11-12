// The team builder: choices on the left, the team, numbers and schedule on the right.
// New specialists fly in from the option that brought them; the rest of the cards glide to their new places.
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Check, ChevronDown, TriangleAlert } from "lucide-react";
import { AVATARS } from "./art.gen.ts";
import { DEFAULT_BRIEF, FEATURES, MAX_TEAM, MAX_WEEKS, MIN_WEEKS, PRODUCTS, ROLES, STAGES, plan } from "./lib/builder.ts";
import type { Brief, FeatureId, Member, ProductId } from "./lib/builder.ts";

const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const money = (n: number) => (n >= 1e6 ? `$${(n / 1e6).toFixed(2)}m` : `$${Math.round(n / 1000)}k`);

/** A number that eases to its new value instead of jumping. */
function useTween(target: number, ms = 600) {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (reduced()) return setV(target);
    const start = performance.now(), a = from.current;
    let id = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const x = a + (target - a) * (1 - Math.pow(1 - t, 3));
      from.current = x;
      setV(x);
      if (t < 1) id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, [target, ms]);
  return v;
}

type Card = { member: Member; state: "in" | "new" | "leave" };

export function Builder() {
  const [brief, setBrief] = useState<Brief>(DEFAULT_BRIEF);
  const [open, setOpen] = useState(false);
  const p = useMemo(() => plan(brief), [brief]);
  const [cards, setCards] = useState<Card[]>(() => p.members.map((member) => ({ member, state: "in" })));
  const squad = useRef<HTMLDivElement>(null);
  const origin = useRef<DOMRect | null>(null);
  const rects = useRef(new Map<string, DOMRect>());

  // Merge the new team with the cards on screen: new ones enter, missing ones leave.
  useEffect(() => {
    setCards((prev) => {
      const ids = new Set(p.members.map((m) => m.id));
      const had = new Set(prev.filter((c) => c.state !== "leave").map((c) => c.member.id));
      const next: Card[] = p.members.map((member) => ({ member, state: had.has(member.id) ? "in" : "new" }));
      prev.forEach((c, i) => {
        if (!ids.has(c.member.id) && c.state !== "leave") next.splice(Math.min(i, next.length), 0, { ...c, state: "leave" });
      });
      return next;
    });
    const id = setTimeout(() => setCards((cs) => cs.filter((c) => c.state !== "leave").map((c) => ({ ...c, state: "in" }))), 700);
    return () => clearTimeout(id);
  }, [p]);

  // FLIP: cards that stay glide from where they were; new cards fly from the clicked option.
  useLayoutEffect(() => {
    const box = squad.current;
    if (!box) return;
    const els = [...box.querySelectorAll<HTMLElement>("[data-key]")];
    const motion = !reduced();
    let n = 0;
    for (const el of els) {
      const key = el.dataset.key!;
      const now = el.getBoundingClientRect();
      const before = rects.current.get(key);
      if (motion && el.classList.contains("new")) {
        const from = origin.current;
        const dx = from ? from.left + from.width / 2 - (now.left + now.width / 2) : -80;
        const dy = from ? from.top + from.height / 2 - (now.top + now.height / 2) : 0;
        el.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(.35) rotate(-8deg)`, opacity: 0, offset: 0 },
            { opacity: 1, offset: 0.25 },
            { transform: "translate(0, 0) scale(1.04) rotate(1deg)", offset: 0.82 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 720, delay: n++ * 70, easing: "cubic-bezier(.2,.8,.2,1)", fill: "backwards" },
        );
      } else if (motion && before && (before.left !== now.left || before.top !== now.top) && !el.classList.contains("leave")) {
        el.animate([{ transform: `translate(${before.left - now.left}px, ${before.top - now.top}px)` }, { transform: "none" }], {
          duration: 450,
          easing: "cubic-bezier(.2,.8,.2,1)",
        });
      }
    }
    rects.current = new Map(els.map((el) => [el.dataset.key!, el.getBoundingClientRect()]));
  }, [cards]);

  const toggle = <K extends "products" | "features">(key: K, id: Brief[K][number], el: HTMLElement) => {
    origin.current = el.getBoundingClientRect();
    setBrief((b) => {
      const list = b[key] as string[];
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id];
      // Keep at least one product.
      if (key === "products" && next.length === 0) return b;
      return { ...b, [key]: next };
    });
  };

  const people = useTween(p.people);
  const low = useTween(p.cost[0]);
  const high = useTween(p.cost[1]);
  const weeks = p.weeks;

  return (
    <section className="builder" id="builder" aria-labelledby="builder-title">
      <div className="b-config">
        <h2 id="builder-title" className="sr">
          Team builder
        </h2>
        <fieldset>
          <legend>What are you building?</legend>
          <div className="chips">
            {PRODUCTS.map((x) => (
              <Chip key={x.id} on={brief.products.includes(x.id)} onClick={(e) => toggle("products", x.id as ProductId, e)}>
                {x.name}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>Features</legend>
          <div className="chips">
            {FEATURES.map((x) => (
              <Chip key={x.id} on={brief.features.includes(x.id)} onClick={(e) => toggle("features", x.id as FeatureId, e)}>
                {x.name}
              </Chip>
            ))}
          </div>
        </fieldset>
        <fieldset>
          <legend>
            Launch in <b className="val">{brief.weeks} weeks</b>
          </legend>
          <input
            type="range"
            min={MIN_WEEKS}
            max={MAX_WEEKS}
            value={brief.weeks}
            aria-label="Weeks until launch"
            style={{ ["--pct" as string]: `${((brief.weeks - MIN_WEEKS) / (MAX_WEEKS - MIN_WEEKS)) * 100}%` } as CSSProperties}
            onChange={(e) => {
              origin.current = e.currentTarget.getBoundingClientRect();
              setBrief((b) => ({ ...b, weeks: +e.target.value }));
            }}
          />
          <div className="range-ends">
            <span>{MIN_WEEKS} weeks</span>
            <span>{MAX_WEEKS} weeks</span>
          </div>
        </fieldset>
        <fieldset>
          <legend>Where are you now?</legend>
          <div className="seg" role="radiogroup" aria-label="Stage">
            {STAGES.map((s) => (
              <button
                key={s.id}
                type="button"
                role="radio"
                aria-checked={brief.stage === s.id}
                className={brief.stage === s.id ? "on" : ""}
                onClick={(e) => {
                  origin.current = e.currentTarget.getBoundingClientRect();
                  setBrief((b) => ({ ...b, stage: s.id }));
                }}
              >
                {s.name}
              </button>
            ))}
          </div>
        </fieldset>
      </div>

      <div className="b-board">
        <div className="b-head">
          <div>
            <h3>Your team</h3>
            <p className="muted">
              {p.people} specialists{p.partTime ? `, ${p.partTime} of them half-time` : ""}
            </p>
          </div>
          <div className="stats" aria-live="polite">
            <div className="stat">
              <span>Team</span>
              <b>{Math.round(people)}</b>
            </div>
            <div className="stat">
              <span>Launch</span>
              <b>{weeks} wks</b>
            </div>
            <div className="stat wide">
              <span>Estimate</span>
              <b className="grad">
                {money(low)}–{money(high)}
              </b>
            </div>
          </div>
        </div>

        {p.tooTight && (
          <p className="warn">
            <TriangleAlert size={16} aria-hidden /> {p.people} people is more than one team of {MAX_TEAM}. With {p.tooTight} weeks it fits in one team.
            <button type="button" className="link" onClick={() => setBrief((b) => ({ ...b, weeks: p.tooTight! }))}>
              Use {p.tooTight} weeks
            </button>
          </p>
        )}

        <div className="squad" ref={squad}>
          {cards.map(({ member, state }) => (
            <div key={member.id} data-key={member.id} className={`member ${state}`} aria-hidden={state === "leave" || undefined}>
              <span className="av" dangerouslySetInnerHTML={{ __html: AVATARS[member.role] }} />
              <span className="who">
                <b>{ROLES[member.role].name}</b>
                <small>{ROLES[member.role].focus}</small>
              </span>
              {member.fte < 1 && (
                <span className="fte">half-time</span>
              )}
            </div>
          ))}
        </div>

        <div className="gantt" aria-label={`Schedule over ${weeks} weeks`}>
          <div className="g-weeks" aria-hidden>
            {Array.from({ length: weeks }, (_, i) => (
              <span key={i}>{i % Math.ceil(weeks / 8) === 0 ? `w${i + 1}` : ""}</span>
            ))}
          </div>
          {p.phases.map((ph) => (
            <div className="g-row" key={ph.id}>
              <span className="g-name">{ph.name}</span>
              <span className="g-track">
                <span
                  className={`g-bar ${ph.kind}`}
                  style={{ left: `${(ph.start / weeks) * 100}%`, width: `${(Math.min(ph.length, weeks - ph.start) / weeks) * 100}%` }}
                  title={`Weeks ${ph.start + 1}–${Math.min(weeks, ph.start + ph.length)}`}
                />
              </span>
            </div>
          ))}
        </div>

        <div className="why-plan">
          <button type="button" className="link" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            How this is worked out <ChevronDown size={15} aria-hidden style={{ transform: open ? "rotate(180deg)" : "none" }} />
          </button>
          {open && (
            <ul>
              {p.reasons.map((r) => (
                <li key={r}>{r}</li>
              ))}
              <li>Rates are illustrative weekly rates per role, plus or minus about 10%.</li>
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}

function Chip({ on, onClick, children }: { on: boolean; onClick: (el: HTMLElement) => void; children: string }) {
  return (
    <button type="button" className={`chip${on ? " on" : ""}`} aria-pressed={on} onClick={(e) => onClick(e.currentTarget)}>
      {on && <Check size={14} aria-hidden />}
      {children}
    </button>
  );
}
