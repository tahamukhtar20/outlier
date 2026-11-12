// The team builder: turns what someone wants to build into a team, a schedule and a cost.
// Everything is a fixed rule written down here, so the same choices always give the same plan,
// and every number can be explained.

export const PRODUCTS = [
  { id: "website", name: "Website" },
  { id: "webapp", name: "Web app" },
  { id: "mobile", name: "Mobile app" },
  { id: "game", name: "Game" },
  { id: "ai", name: "AI tool" },
] as const;
export const FEATURES = [
  { id: "accounts", name: "Accounts" },
  { id: "payments", name: "Payments" },
  { id: "realtime", name: "Real-time" },
  { id: "admin", name: "Admin dashboard" },
  { id: "offline", name: "Offline mode" },
  { id: "aiFeatures", name: "AI features" },
  { id: "integrations", name: "Integrations" },
] as const;
export const STAGES = [
  { id: "idea", name: "Idea" },
  { id: "prototype", name: "Prototype" },
  { id: "live", name: "Live product" },
] as const;

export type ProductId = (typeof PRODUCTS)[number]["id"];
export type FeatureId = (typeof FEATURES)[number]["id"];
export type StageId = (typeof STAGES)[number]["id"];
export type Brief = { products: ProductId[]; features: FeatureId[]; weeks: number; stage: StageId };

export const MIN_WEEKS = 8;
export const MAX_WEEKS = 40;
export const MAX_TEAM = 12;

type Track = "frontend" | "backend" | "mobile" | "game" | "art" | "ml";

/** Engineer-weeks each product and feature adds to each track. */
const EFFORT: Record<ProductId | FeatureId, Partial<Record<Track, number>>> = {
  website: { frontend: 6 },
  webapp: { frontend: 10, backend: 9 },
  mobile: { mobile: 14, backend: 6 },
  game: { game: 20, art: 10, backend: 3 },
  ai: { ml: 12, frontend: 5, backend: 5 },
  accounts: { backend: 3, frontend: 1 },
  payments: { backend: 5, frontend: 1 },
  realtime: { backend: 6, frontend: 2 },
  admin: { frontend: 5, backend: 2 },
  offline: { mobile: 4, frontend: 2, backend: 2 },
  aiFeatures: { ml: 8, backend: 2 },
  integrations: { backend: 4 },
};

/** Work already done shrinks the job; starting from an idea adds discovery. */
const STAGE_FACTOR: Record<StageId, number> = { idea: 1.15, prototype: 1, live: 0.85 };
const DISCOVERY_WEEKS: Record<StageId, number> = { idea: 3, prototype: 2, live: 1 };

export type RoleId = "lead" | "designer" | "frontend" | "backend" | "mobile" | "game" | "art" | "ml" | "qa" | "devops";
export const ROLES: Record<RoleId, { name: string; focus: string; rate: number }> = {
  lead: { name: "Product lead", focus: "Scope, priorities, releases", rate: 4200 },
  designer: { name: "Product designer", focus: "Flows and interface", rate: 3800 },
  frontend: { name: "Frontend engineer", focus: "Web interface", rate: 4000 },
  backend: { name: "Backend engineer", focus: "APIs and data", rate: 4200 },
  mobile: { name: "Mobile engineer", focus: "iOS and Android", rate: 4200 },
  game: { name: "Game developer", focus: "Gameplay and engine", rate: 4200 },
  art: { name: "Technical artist", focus: "Art, animation, shaders", rate: 3600 },
  ml: { name: "ML engineer", focus: "Models and evaluation", rate: 5000 },
  qa: { name: "QA engineer", focus: "Tests and release checks", rate: 3000 },
  devops: { name: "Platform engineer", focus: "Hosting and monitoring", rate: 4400 },
};

export type Member = { id: string; role: RoleId; fte: number; weeks: number };
export type Phase = { id: string; name: string; start: number; length: number; kind: "plan" | "build" | "feature" | "check" };
export type Plan = {
  members: Member[];
  phases: Phase[];
  weeks: number;
  buildWeeks: number;
  people: number;
  partTime: number;
  cost: [number, number];
  reasons: string[];
  /** Shortest schedule that keeps the team at MAX_TEAM or fewer, when the chosen one does not. */
  tooTight: number | null;
};

const round1k = (n: number) => Math.round(n / 1000) * 1000;

function efforts(b: Brief): Record<Track, number> {
  const e: Record<Track, number> = { frontend: 0, backend: 0, mobile: 0, game: 0, art: 0, ml: 0 };
  for (const id of [...b.products, ...b.features]) for (const [t, v] of Object.entries(EFFORT[id])) e[t as Track] += v!;
  // Offline mode only means something on an app.
  if (b.features.includes("offline") && !b.products.some((p) => p === "mobile" || p === "webapp")) {
    e.mobile -= EFFORT.offline.mobile ?? 0;
  }
  for (const t of Object.keys(e) as Track[]) e[t] = Math.max(0, e[t] * STAGE_FACTOR[b.stage]);
  return e;
}

/**
 * People needed for a track, in half-time steps: an engineer delivers about 0.85
 * engineer-weeks per calendar week once meetings and reviews are counted.
 */
function staff(effort: number, weeks: number): number[] {
  if (effort <= 0) return [];
  const fte = Math.max(0.5, Math.ceil((effort / (weeks * 0.85)) * 2) / 2);
  const crew = Array.from({ length: Math.floor(fte) }, () => 1);
  if (fte % 1) crew.push(0.5);
  return crew;
}

/** Team size alone, for the shortest-schedule search (no recursion into plan). */
function headcount(b: Brief): number {
  return core(b).members.length;
}

export function plan(b: Brief): Plan {
  const c = core(b);
  // If the team is too big, find the shortest schedule that fits.
  let tooTight: number | null = null;
  if (c.members.length > MAX_TEAM) {
    for (let w = c.weeks + 1; w <= MAX_WEEKS; w++) if (headcount({ ...b, weeks: w }) <= MAX_TEAM) { tooTight = w; break; }
    tooTight ??= MAX_WEEKS;
  }
  return { ...c, tooTight };
}

function core(b: Brief): Omit<Plan, "tooTight"> {
  const weeks = Math.min(MAX_WEEKS, Math.max(MIN_WEEKS, Math.round(b.weeks)));
  const discovery = DISCOVERY_WEEKS[b.stage];
  const launch = 2;
  const buildStart = discovery + 1;
  const buildWeeks = Math.max(3, weeks - buildStart - launch);
  const e = efforts(b);
  const total = Object.values(e).reduce((a, n) => a + n, 0);
  const reasons: string[] = [];
  const members: Member[] = [];
  const add = (role: RoleId, fte: number, w: number) => members.push({ id: `${role}-${members.filter((m) => m.role === role).length + 1}`, role, fte, weeks: w });

  add("lead", total > 30 ? 1 : 0.5, weeks);
  add("designer", total > 20 ? 1 : 0.5, Math.min(weeks, Math.round(weeks * 0.6)));
  reasons.push(`Every team has a product lead and a designer; they are full-time once the work passes 20 to 30 engineer-weeks (this plan is about ${Math.round(total)}).`);

  const tracks: [Track, RoleId, string][] = [
    ["frontend", "frontend", "web screens"],
    ["backend", "backend", "APIs, data and integrations"],
    ["mobile", "mobile", "the iOS and Android apps"],
    ["game", "game", "gameplay"],
    ["art", "art", "game art and animation"],
    ["ml", "ml", "models and evaluation"],
  ];
  for (const [t, role, what] of tracks) {
    const crew = staff(e[t], buildWeeks);
    crew.forEach((fte) => add(role, fte, buildWeeks));
    if (crew.length) {
      const fte = crew.reduce((a, n) => a + n, 0);
      const name = ROLES[role].name.toLowerCase();
      const label = fte === 0.5 ? `a half-time ${name}` : fte === 1 ? `a ${name}` : `${fte} ${name}s' worth of time`;
      reasons.push(`About ${Math.round(e[t])} engineer-weeks of ${what} over ${buildWeeks} build weeks needs ${label}.`);
    }
  }
  const testWeeks = Math.max(2, Math.round(buildWeeks * 0.45));
  add("qa", total > 25 ? 1 : 0.5, testWeeks + launch);
  reasons.push(`Testing runs through the last ${testWeeks} weeks of the build and the launch.`);
  if (b.features.includes("realtime") || b.stage === "live" || total > 45) {
    add("devops", 0.5, buildWeeks + launch);
    reasons.push(b.stage === "live" ? "A live product needs a platform engineer to keep it running while it changes." : "Real-time features and larger systems need a platform engineer for hosting and monitoring.");
  }

  // Schedule. Feature tracks sit inside the build window, staggered so the plan reads in order.
  const phases: Phase[] = [
    { id: "discovery", name: "Discovery", start: 0, length: discovery, kind: "plan" },
    { id: "design", name: "Design", start: Math.max(0, discovery - 1), length: Math.max(2, Math.round(weeks * 0.25)), kind: "plan" },
    { id: "build", name: `Build · ${Math.max(1, Math.round(buildWeeks / 2))} sprints`, start: buildStart, length: buildWeeks, kind: "build" },
  ];
  const featureNames = FEATURES.filter((f) => b.features.includes(f.id));
  featureNames.forEach((f, i) => {
    const len = Math.max(2, Math.round(buildWeeks * 0.35));
    const start = buildStart + Math.min(buildWeeks - len, Math.round((i / Math.max(1, featureNames.length)) * (buildWeeks - len)));
    phases.push({ id: f.id, name: f.name, start, length: len, kind: "feature" });
  });
  phases.push({ id: "testing", name: "Testing", start: buildStart + buildWeeks - testWeeks, length: testWeeks + 1, kind: "check" });
  phases.push({ id: "launch", name: "Launch", start: weeks - launch, length: launch, kind: "check" });

  const people = members.length;
  // Bigger teams spend more time coordinating: 5% more per person beyond eight.
  const overhead = 1 + 0.05 * Math.max(0, people - 8);
  if (overhead > 1) reasons.push(`A team of ${people} spends more time coordinating, which adds ${Math.round((overhead - 1) * 100)}% to the cost.`);
  const raw = members.reduce((sum, m) => sum + ROLES[m.role].rate * m.fte * m.weeks, 0) * overhead;

  return {
    members,
    phases,
    weeks,
    buildWeeks,
    people,
    partTime: members.filter((m) => m.fte < 1).length,
    cost: [round1k(raw * 0.9), round1k(raw * 1.12)],
    reasons,
  };
}

export const DEFAULT_BRIEF: Brief = { products: ["webapp", "mobile"], features: ["accounts", "payments", "admin"], weeks: 18, stage: "prototype" };
