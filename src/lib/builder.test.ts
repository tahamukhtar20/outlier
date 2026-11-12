import { test } from "node:test";
import assert from "node:assert/strict";
import { DEFAULT_BRIEF, MAX_TEAM, MAX_WEEKS, MIN_WEEKS, plan } from "./builder.ts";
import type { Brief } from "./builder.ts";

const roles = (b: Brief) => plan(b).members.map((m) => m.role);

test("the same brief always gives the same plan", () => {
  assert.deepEqual(plan(DEFAULT_BRIEF), plan({ ...DEFAULT_BRIEF }));
});

test("every plan has a lead, a designer and QA", () => {
  for (const products of [["website"], ["game"], ["ai", "mobile"]] as Brief["products"][]) {
    const r = roles({ ...DEFAULT_BRIEF, products, features: [] });
    assert.ok(r.includes("lead") && r.includes("designer") && r.includes("qa"), products.join());
  }
});

test("roles follow the product", () => {
  assert.ok(roles({ ...DEFAULT_BRIEF, products: ["mobile"] }).includes("mobile"));
  assert.ok(!roles({ ...DEFAULT_BRIEF, products: ["website"], features: [] }).includes("mobile"));
  const game = roles({ ...DEFAULT_BRIEF, products: ["game"], features: [] });
  assert.ok(game.includes("game") && game.includes("art"));
  assert.ok(roles({ ...DEFAULT_BRIEF, features: ["aiFeatures"] }).includes("ml"));
});

test("a tighter deadline needs more people and costs more per week", () => {
  const slow = plan({ ...DEFAULT_BRIEF, weeks: 30 }), fast = plan({ ...DEFAULT_BRIEF, weeks: 10 });
  assert.ok(fast.people >= slow.people);
  assert.ok(fast.cost[0] / fast.weeks > slow.cost[0] / slow.weeks);
});

test("weeks are clamped and the schedule fits inside them", () => {
  for (const weeks of [1, 8, 18, 40, 99]) {
    const p = plan({ ...DEFAULT_BRIEF, weeks });
    assert.ok(p.weeks >= MIN_WEEKS && p.weeks <= MAX_WEEKS);
    for (const ph of p.phases) assert.ok(ph.start >= 0 && ph.start + ph.length <= p.weeks + 1, `${ph.name} in ${p.weeks}`);
  }
});

test("an impossible deadline suggests the shortest one that fits", () => {
  const p = plan({ products: ["webapp", "mobile", "game", "ai"], features: ["accounts", "payments", "realtime", "admin", "offline", "aiFeatures", "integrations"], weeks: 8, stage: "idea" });
  assert.ok(p.people > MAX_TEAM);
  assert.ok(p.tooTight && p.tooTight > 8);
  if (p.tooTight < MAX_WEEKS) assert.ok(plan({ ...p, products: ["webapp", "mobile", "game", "ai"], features: ["accounts", "payments", "realtime", "admin", "offline", "aiFeatures", "integrations"], stage: "idea", weeks: p.tooTight }).people <= MAX_TEAM);
});

test("a live product with less to build is cheaper than starting from an idea", () => {
  assert.ok(plan({ ...DEFAULT_BRIEF, stage: "live" }).cost[0] < plan({ ...DEFAULT_BRIEF, stage: "idea" }).cost[0]);
});

test("member ids are unique and every plan explains itself", () => {
  const p = plan({ ...DEFAULT_BRIEF, weeks: 9 });
  assert.equal(new Set(p.members.map((m) => m.id)).size, p.members.length);
  assert.ok(p.reasons.length >= 3);
  assert.ok(p.cost[0] < p.cost[1]);
});
