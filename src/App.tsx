import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Mail, MapPin } from "lucide-react";
import { ART, AVATARS, ICONS } from "./art.gen.ts";
import { Builder } from "./Builder.tsx";

const REPO = "https://github.com/tahamukhtar20/outlier";
const INTRO_KEY = "outlier.intro";

const Svg = ({ html, className }: { html: string; className?: string }) => <span className={`svg ${className ?? ""}`} dangerouslySetInnerHTML={{ __html: html }} />;

/** Plays the opening animation once per visit, unless motion is turned down. */
function useIntro() {
  const [on, setOn] = useState(() => {
    if (typeof window === "undefined" || matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    try {
      return sessionStorage.getItem(INTRO_KEY) !== "1";
    } catch {
      return true;
    }
  });
  useEffect(() => {
    if (!on) return;
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
    const id = setTimeout(() => setOn(false), 4600);
    return () => clearTimeout(id);
  }, [on]);
  const skip = () => {
    document.querySelectorAll(".hero *").forEach((el) => el.getAnimations().forEach((a) => a.finish()));
    setOn(false);
  };
  return { on, skip };
}

/** Sections fade up as they scroll into view. */
function useReveal() {
  useEffect(() => {
    const els = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io: IntersectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

const STEPS = [
  { icon: "research", title: "Discovery", text: "One to three weeks with you and your users. We write down what the first release has to do, and what it does not." },
  { icon: "code", title: "Design and build", text: "Two-week sprints with a working build at the end of each, on a link you can open on your phone." },
  { icon: "rocket", title: "Launch", text: "Store listings, analytics, monitoring and a launch checklist, handled by the same team that built it." },
  { icon: "support", title: "After launch", text: "Stay with us for fixes and new features, or hand over to your own team with documentation and a walkthrough." },
];
const BUILD = [
  { icon: "code", title: "Web apps", text: "Dashboards, marketplaces and internal tools." },
  { icon: "rocket", title: "Mobile apps", text: "iOS and Android from one codebase where it makes sense." },
  { icon: "play", title: "Games", text: "Mobile and web games, from prototype to store." },
  { icon: "ai", title: "AI tools", text: "Assistants, search and classification, with evaluation built in." },
  { icon: "cloud", title: "Platforms", text: "APIs, data pipelines and the hosting under them." },
  { icon: "shield", title: "Security reviews", text: "Threat modelling and fixes before you go live." },
];
const WORK = [
  { art: "bolt", name: "Ferro", kind: "Web app · 14 weeks", text: "Maintenance scheduling for a fleet of 400 delivery vans. Breakdowns found before they happen fell from guesswork to a weekly report." },
  { art: "aiHead", name: "Lumi", kind: "AI tool · 20 weeks", text: "A study assistant that explains maths problems step by step and checks its own answers against a worked solution." },
  { art: "palm", name: "Nightshift", kind: "Mobile game · 24 weeks", text: "A two-minute puzzle game for the commute. One designer, two developers and an artist from first sketch to the App Store." },
];
const TEAM = [
  { role: "lead", name: "Amara Okafor", title: "Product lead" },
  { role: "designer", name: "Lena Hartmann", title: "Product designer" },
  { role: "frontend", name: "Kofi Mensah", title: "Frontend engineer" },
  { role: "backend", name: "Daniel Reyes", title: "Backend engineer" },
  { role: "mobile", name: "Ravi Iyer", title: "Mobile engineer" },
  { role: "ml", name: "Sara Haddad", title: "ML engineer" },
  { role: "game", name: "Mia Laurent", title: "Game developer" },
  { role: "art", name: "Zola Adeyemi", title: "Technical artist" },
  { role: "qa", name: "Freya Lund", title: "QA engineer" },
  { role: "devops", name: "Tomas Novak", title: "Platform engineer" },
];

function Contact() {
  const [state, setState] = useState<"idle" | "sent" | "invalid">("idle");
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const ok = String(f.get("name") ?? "").trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(f.get("email") ?? "")) && String(f.get("idea") ?? "").trim();
    setState(ok ? "sent" : "invalid");
    if (ok) e.currentTarget.reset();
  };
  return (
    <section className="contact sec" id="contact">
      <div data-reveal>
        <h2>Tell us about your idea</h2>
        <p className="sub">A paragraph is enough. We reply within two working days with questions or a first plan.</p>
        <ul className="details">
          <li>
            <Mail size={17} aria-hidden /> hello@outlier.example
          </li>
          <li>
            <MapPin size={17} aria-hidden /> Remote, with people in Lisbon, Lagos and Berlin
          </li>
        </ul>
        <Svg html={ART.stamp} className="stamp" />
      </div>
      <form className="form" onSubmit={submit} noValidate data-reveal>
        <label>
          Name
          <input name="name" autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" />
        </label>
        <label>
          What are you building?
          <textarea name="idea" rows={5} />
        </label>
        <button className="btn" type="submit">
          Send <ArrowRight size={16} aria-hidden />
        </button>
        {state !== "idle" && (
          <p className={state === "sent" ? "ok" : "bad"} role="status">
            {state === "sent" ? "Thank you. This is a demo site, so the message was not sent anywhere." : "Please add your name, a valid email and a line about your idea."}
          </p>
        )}
      </form>
    </section>
  );
}

export default function App() {
  const intro = useIntro();
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(scrollY > 8);
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <>
      <header className={`top${scrolled ? " scrolled" : ""}`}>
        <a className="logo" href="#top" aria-label="Outlier, back to top">
          <Svg html={ART.logo} className="mark" />
          Outlier
        </a>
        <nav className="nav" aria-label="Sections">
          <a href="#builder">Team builder</a>
          <a href="#how">How we work</a>
          <a href="#work">Work</a>
          <a href="#team">Team</a>
        </nav>
        <span className="sp" />
        <a className="btn ghost" href="#contact">
          Talk to us
        </a>
      </header>

      <main id="top">
        <section className={`hero${intro.on ? " intro" : ""}`}>
          <div className="hero-copy">
            <h1>
              Tell us what you are building. <span className="grad">We will show you the team.</span>
            </h1>
            <p className="lead">Outlier is a product studio for founders. Pick the product, the features and the deadline, and the builder below puts together the specialists you would need, a sprint plan and a cost range.</p>
            <div className="actions">
              <a className="btn" href="#builder">
                Build your team <ArrowRight size={16} aria-hidden />
              </a>
              <a className="btn ghost" href="#how">
                How we work
              </a>
            </div>
          </div>
          <div className="hero-art" dangerouslySetInnerHTML={{ __html: ART.hero }} />
          {intro.on && (
            <button type="button" className="skip" onClick={intro.skip}>
              Skip intro
            </button>
          )}
        </section>

        <Builder />

        <section className="sec how" id="how">
          <div className="sec-head" data-reveal>
            <h2>How we work</h2>
            <p className="sub">The same small team from the first call to launch day.</p>
          </div>
          <div className="how-grid">
            <ol className="steps">
              {STEPS.map((s, i) => (
                <li key={s.title} data-reveal style={{ ["--i" as string]: i }}>
                  <Svg html={ICONS[s.icon]} className="ic" />
                  <div>
                    <h3>
                      <span className="n">0{i + 1}</span> {s.title}
                    </h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Svg html={ART.about} className="about-art" />
          </div>
        </section>

        <section className="sec build">
          <div className="sec-head" data-reveal>
            <h2>What we build</h2>
            <p className="sub">Six kinds of work, often in one product.</p>
          </div>
          <div className="build-grid">
            <div className="cards">
              {BUILD.map((b, i) => (
                <article className="card" key={b.title} data-reveal style={{ ["--i" as string]: i % 3 }}>
                  <Svg html={ICONS[b.icon]} className="ic" />
                  <h3>{b.title}</h3>
                  <p>{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sec work" id="work">
          <div className="sec-head" data-reveal>
            <h2>Selected work</h2>
            <p className="sub">Three products from the last two years.</p>
          </div>
          <div className="work-grid">
            {WORK.map((w, i) => (
              <article className="project" key={w.name} data-reveal style={{ ["--i" as string]: i }}>
                <Svg html={ART[w.art as keyof typeof ART]} className={`p-art ${w.art}`} />
                <span className="kind">{w.kind}</span>
                <h3>{w.name}</h3>
                <p>{w.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="sec team" id="team">
          <div className="sec-head" data-reveal>
            <h2>The people in the builder</h2>
            <p className="sub">Every role the builder can add is a person on our team.</p>
          </div>
          <div className="people">
            {TEAM.map((t, i) => (
              <figure key={t.role} data-reveal style={{ ["--i" as string]: i % 5 }}>
                <Svg html={AVATARS[t.role]} className="portrait" />
                <figcaption>
                  <b>{t.name}</b>
                  <span>{t.title}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <figure className="quote" data-reveal>
            <blockquote>We had a prototype and a launch date. Outlier told us which half of the prototype to keep, and we made the date with a week to spare.</blockquote>
            <figcaption>
              <b>Noor Siddiqui</b>
              <span>Founder, Pebble Health</span>
            </figcaption>
          </figure>
        </section>

        <Contact />
      </main>

      <footer className="foot">
        <a className="logo" href="#top">
          <Svg html={ART.logo} className="mark" />
          Outlier
        </a>
        <p>An anonymised client project by tahamukhtar20. Outlier, its people, projects and quotes are fictional, and the illustrations are drawn in code.</p>
        <a href={REPO}>Source code</a>
      </footer>
    </>
  );
}
