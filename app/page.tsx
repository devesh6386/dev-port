"use client";

import dynamic from "next/dynamic";
import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Award,
  Brain,
  Briefcase,
  Check,
  Cloud,
  Code2,
  Command,
  Copy,
  Download,
  GitBranch,
  GraduationCap,
  Mail,
  MapPin,
  Network,
  Phone,
  Search,
  Send,
  Sparkles,
  Trophy,
  X,
} from "lucide-react";
import {
  P,
  answer,
  edu,
  jobs,
  projects,
  skillCategories,
  starters,
  wins,
  type Achievement,
  type BadgeTone,
  type PipelineStage,
  type Project,
} from "@/lib/data";

const Hero3DCharacter = dynamic(() => import("@/components/Hero3DCharacter"), {
  ssr: false,
  loading: () => (
    <div className="shimmer mono grid h-full min-h-[460px] place-items-center text-xs text-zinc-500">
      initializing 3D scene…
    </div>
  ),
});

const NAV = ["Projects", "Architecture", "Experience", "Skills", "Achievements"];

const go = (id: string) =>
  document
    .getElementById(id.toLowerCase())
    ?.scrollIntoView({ behavior: "smooth" });

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const move = (e: MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div
      onMouseMove={move}
      className={`spot rounded-2xl border border-white/[.08] bg-[#111114] p-6 ${className}`}
    >
      {children}
    </div>
  );
}

function Section({
  id,
  num,
  eyebrow,
  title,
  subtitle,
  rightSlot,
  children,
}: {
  id: string;
  num: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-5 py-20">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">
            <span className="text-emerald-400">{num}</span> · {eyebrow}
          </p>
          <h2 className="mt-2.5 text-3xl font-bold text-white md:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 max-w-2xl text-sm text-zinc-400 md:text-base">
              {subtitle}
            </p>
          )}
        </div>
        {rightSlot}
      </div>
      {children}
    </section>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: BadgeTone }) {
  const styles: Record<BadgeTone, { wrap: string; dot: string }> = {
    emerald: {
      wrap: "border-emerald-500/25 bg-emerald-500/[0.08] text-emerald-300",
      dot: "bg-emerald-400",
    },
    cyan: {
      wrap: "border-cyan-500/25 bg-cyan-500/[0.08] text-cyan-300",
      dot: "bg-cyan-400",
    },
    violet: {
      wrap: "border-violet-500/25 bg-violet-500/[0.08] text-violet-300",
      dot: "bg-violet-400",
    },
  };
  const s = styles[tone];
  return (
    <span
      className={`mono inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] ${s.wrap}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label}
    </span>
  );
}

function PipelineDiagram({ stages }: { stages: PipelineStage[] }) {
  return (
    <div className="flex flex-col items-stretch gap-3 lg:flex-row lg:items-center">
      {stages.map((st, idx) => (
        <div
          key={st.stage}
          className="flex flex-1 flex-col items-center gap-3 lg:flex-row"
        >
          <div className="flex w-full flex-1 flex-col gap-2.5">
            {st.nodes.map((node) => (
              <div
                key={node}
                className="flex flex-col items-center justify-center rounded-xl border border-white/[.08] bg-[#16161a] px-4 py-3.5 text-center transition hover:border-emerald-500/30"
              >
                <span className="mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {st.stage}
                </span>
                <span className="mono mt-1 text-xs font-medium text-zinc-100 md:text-[13px]">
                  {node}
                </span>
              </div>
            ))}
          </div>
          {idx < stages.length - 1 && (
            <div className="mono flex shrink-0 items-center justify-center text-xs text-emerald-500/70">
              <span className="hidden lg:inline">···&gt;</span>
              <span className="lg:hidden">↓</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function Modal({
  open,
  onClose,
  children,
  side = "center",
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  side?: "center" | "right";
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-[60] flex bg-black/70 backdrop-blur-sm ${
            side === "right"
              ? "justify-end"
              : "items-start justify-center pt-[15vh]"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal
            initial={side === "right" ? { x: 40 } : { y: 12, scale: 0.98 }}
            animate={{ x: 0, y: 0, scale: 1 }}
            exit={side === "right" ? { x: 40 } : { y: 12 }}
            className={
              side === "right"
                ? "flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0d0d10]"
                : "mx-4 h-fit w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d10] shadow-2xl"
            }
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectCard({
  p,
  inspect,
}: {
  p: Project;
  inspect: (p: Project) => void;
}) {
  return (
    <Card
      className={
        p.featured ? "p-7 md:col-span-2" : "flex flex-col justify-between p-6"
      }
    >
      <div
        className={
          p.featured && p.flow
            ? "grid items-start gap-8 lg:grid-cols-[1.35fr_1fr]"
            : ""
        }
      >
        <div>
          <div className="mb-3.5 flex flex-wrap gap-2">
            {p.badges.map((b) => (
              <StatusBadge key={b.label} label={b.label} tone={b.tone} />
            ))}
          </div>

          <h3
            className={`font-bold text-white ${
              p.featured ? "text-2xl md:text-[26px]" : "text-xl"
            }`}
          >
            {p.title}
          </h3>
          <p className="mt-0.5 text-sm text-zinc-400">{p.subtitle}</p>

          {p.summary && (
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-300">
              {p.summary}
            </p>
          )}

          <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-zinc-400">
            {p.points.map((x) => (
              <li key={x} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                <span>{x}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => (
              <span
                key={s}
                className="mono rounded-md border border-white/[.08] bg-[#16161a] px-2.5 py-1 text-[11px] text-zinc-300"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs">
            <button
              onClick={() => inspect(p)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[.04] px-3.5 py-2 font-medium text-white transition hover:border-emerald-500/40 hover:bg-white/[.08]"
            >
              <Network size={14} className="text-emerald-400" />
              Inspect Architecture
            </button>
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-zinc-400 transition hover:text-white"
            >
              <GitBranch size={14} />
              GitHub
            </a>
            {p.demo !== "#" && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-zinc-400 transition hover:text-white"
              >
                Live Demo <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {p.featured && p.flow && (
          <div className="rounded-xl border border-white/[.07] bg-[#0b0b0e] p-5">
            <p className="mono mb-4 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
              SYSTEM FLOW
            </p>
            <div className="space-y-2.5">
              {p.flow.map((f) => (
                <div key={f.step} className="flex items-center gap-3">
                  <span className="mono w-5 shrink-0 text-[11px] text-zinc-600">
                    {f.step}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {f.items.map((item) => (
                      <span
                        key={item}
                        className="mono rounded-lg border border-white/[.08] bg-[#131317] px-3 py-1.5 text-xs text-zinc-200"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function Telemetry({ tab }: { tab: string }) {
  if (tab === "trace")
    return (
      <div className="mono space-y-3 p-8 pt-16 text-sm">
        {[
          ["User Query", "", 0],
          ["BM25 + Dense Retrieval", "38ms", 1],
          ["Groq LLaMA-3.3-70B Tool Call", "94ms", 2],
          ["Pydantic Structured JSON", "11ms", 3],
        ].map(([n, ms, d]) => (
          <div
            key={n as string}
            style={{ marginLeft: (d as number) * 18 }}
            className="flex items-center justify-between rounded-lg border border-white/[.08] bg-white/[.03] px-3 py-2"
          >
            <span className="text-zinc-200">{n}</span>
            <span className="text-emerald-400">{ms}</span>
          </div>
        ))}
        <div className="pt-2 text-right text-cyan-300">Total: 143ms</div>
      </div>
    );
  return (
    <div className="mono space-y-6 p-8 pt-16 text-sm">
      {[
        ["Keyword Baseline", 58, "bg-zinc-500"],
        ["Hybrid RAG", 98, "bg-emerald-400"],
      ].map(([n, v, c]) => (
        <div key={n as string}>
          <div className="mb-1 flex justify-between">
            <span>{n}</span>
            <span>{v}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/10">
            <motion.div
              className={`h-2 rounded-full ${c}`}
              initial={{ width: 0 }}
              animate={{ width: `${v}%` }}
              transition={{ duration: 0.9 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function AchievementIcon({
  icon,
  tone,
}: {
  icon: Achievement["icon"];
  tone: Achievement["tone"];
}) {
  const color =
    tone === "violet"
      ? "text-violet-400"
      : tone === "cyan"
      ? "text-cyan-400"
      : "text-emerald-400";
  const Icon =
    icon === "trophy"
      ? Trophy
      : icon === "brain"
      ? Brain
      : icon === "cloud"
      ? Cloud
      : Award;
  return (
    <div className="grid h-9 w-9 place-items-center rounded-lg border border-white/[.08] bg-white/[.03]">
      <Icon size={17} className={color} />
    </div>
  );
}

export default function Page() {
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [toast, setToast] = useState("");
  const [tab, setTab] = useState("3d");
  const [palette, setPalette] = useState(false);
  const [chat, setChat] = useState(false);
  const [arch, setArch] = useState<Project | null>(null);
  const [selectedArchId, setSelectedArchId] = useState(projects[0].id);
  const [filter, setFilter] = useState("All");
  const [active, setActive] = useState("");

  const say = useCallback((m: string) => {
    setToast(m);
    setTimeout(() => setToast(""), 1800);
  }, []);

  const copy = useCallback(
    (v: string, label: string) => {
      navigator.clipboard?.writeText(v);
      say(`${label} copied`);
    },
    [say]
  );

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPalette((v) => !v);
      }
      if (e.key === "Escape") {
        setPalette(false);
        setChat(false);
        setArch(null);
      }
    };
    window.addEventListener("keydown", k);
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.toLowerCase());
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("keydown", k);
      io.disconnect();
    };
  }, []);

  const open = (u: string) => window.open(u, "_blank", "noopener");
  const commands: [string, () => void][] = [
    ...NAV.map((n) => [`Go to ${n}`, () => go(n)] as [string, () => void]),
    ["Ask Devesh's AI", () => setChat(true)],
    ["Copy email", () => copy(P.email, "Email")],
    ["Copy phone", () => copy(P.phone, "Phone")],
    ["Open GitHub", () => open(P.github)],
    ["Open LinkedIn", () => open(P.linkedin)],
    ["Open LeetCode", () => open(P.leetcode)],
    ["Download resume (PDF)", () => open(P.resume)],
  ];

  const activePipelineProject =
    projects.find((p) => p.id === selectedArchId) ?? projects[0];

  const visibleSkillCategories =
    filter === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.filterGroup === filter);

  return (
    <main>
      <motion.div
        style={{ scaleX: bar }}
        className="fixed inset-x-0 top-0 z-[70] h-0.5 origin-left bg-emerald-500"
      />

      <header className="glass sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
          <div className="flex items-center gap-3">
            <a href="#" className="mono font-bold text-white">
              &lt;DG <span className="text-emerald-400">/&gt;</span>
            </a>
            <span className="pill mono hidden items-center gap-2 xl:flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Open to AI Engineering Internships • Bengaluru / Gurugram / Remote
            </span>
          </div>

          <nav className="hidden items-center gap-1 text-sm text-zinc-400 lg:flex">
            {NAV.map((n) => {
              const isCurrent = active === n.toLowerCase();
              return (
                <button
                  key={n}
                  onClick={() => go(n)}
                  className={`rounded-md px-3 py-1.5 transition ${
                    isCurrent
                      ? "bg-white/[.08] font-medium text-white"
                      : "hover:text-white"
                  }`}
                >
                  {n}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 text-zinc-400">
            <button
              onClick={() => setPalette(true)}
              className="mono hidden items-center gap-1 rounded-md border border-white/10 bg-white/[.03] px-2 py-1 text-xs text-zinc-400 hover:text-white sm:flex"
              aria-label="Open command palette"
            >
              <Command size={11} />K
            </button>
            <a
              href={P.github}
              aria-label="GitHub"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <GitBranch size={17} />
            </a>
            <a
              href={P.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <LinkedInIcon size={17} />
            </a>
            <a
              href={P.leetcode}
              aria-label="LeetCode"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white"
            >
              <Code2 size={17} />
            </a>
            <a
              href={P.resume}
              className="flex items-center gap-1.5 rounded-lg bg-emerald-400 px-3.5 py-1.5 text-sm font-semibold text-black transition hover:bg-emerald-300"
            >
              <Download size={14} />
              Download Resume
            </a>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-12 pt-14 lg:grid-cols-[1.08fr_0.92fr]">
        <div>
          <span className="pill mono inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            B.Tech EE @ NIT Patna &apos;28 • 900+ LeetCode (1858 Peak Rating)
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.06] text-white md:text-[56px]">
            Engineering{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              stateful AI agents,
            </span>{" "}
            semantic search &amp; low-latency backends.
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-[17px]">
            I’m Devesh Gupta. I build tool-calling LLM workflows, hybrid RAG
            retrieval engines, and production FastAPI + PostgreSQL systems that
            turn messy data into reliable actions.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3 text-sm">
            <button
              onClick={() => go("projects")}
              className="flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 font-semibold text-black transition hover:bg-emerald-300"
            >
              View Case Studies
              <ArrowDown size={15} />
            </button>
            <button
              onClick={() => setChat(true)}
              className="flex items-center gap-2 rounded-lg border border-white/10 bg-[#141418] px-4 py-2.5 font-medium text-zinc-200 transition hover:border-violet-500/40 hover:text-white"
            >
              <Sparkles size={15} className="text-violet-400" />
              Ask My AI Agent
            </button>
          </div>

          <button
            onClick={() => copy(P.email, "Email")}
            className="mono mt-4 inline-flex items-center gap-2 text-xs text-zinc-400 transition hover:text-white"
          >
            <Copy size={13} />
            {P.email}
          </button>

          <dl className="mono mt-8 grid grid-cols-2 divide-y divide-white/[.08] rounded-xl border border-white/[.08] bg-[#111114]/80 sm:grid-cols-4 sm:divide-x sm:divide-y-0">
            {[
              ["DSA PROBLEMS", "900+"],
              ["LEETCODE RATING", "1858"],
              ["RAG RELEVANCE", "+40%"],
              ["ML ACCURACY", "92%"],
            ].map(([label, val]) => (
              <div key={label} className="px-4 py-3.5">
                <dt className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
                  {label}
                </dt>
                <dd className="mt-1 text-2xl font-bold text-white">{val}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div>
          <div className="relative min-h-[460px] overflow-hidden rounded-2xl border border-white/[.08] bg-[radial-gradient(circle_at_50%_40%,rgba(16,185,129,0.08),rgba(14,17,19,0.95)_70%)] backdrop-blur">
            <div className="mono absolute left-4 top-4 z-10 flex items-center gap-1.5 text-[11px] text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Live
            </div>

            <div className="absolute right-3 top-3 z-10 flex rounded-lg border border-white/10 bg-black/60 p-1 text-xs">
              {[
                ["3d", "3D Developer"],
                ["trace", "Agent Trace"],
                ["eval", "Eval Metrics"],
              ].map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`rounded-md px-3 py-1 transition ${
                    tab === k
                      ? "bg-white/[.12] font-medium text-white"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            {tab === "3d" ? (
              <div className="h-[460px]">
                <Hero3DCharacter />
              </div>
            ) : (
              <Telemetry tab={tab} />
            )}
          </div>
          {tab === "3d" && (
            <p className="mono mt-3 text-center text-[11px] uppercase tracking-[0.2em] text-zinc-500">
              CLICK THE DEVELOPER TO SAY HI
            </p>
          )}
        </div>
      </section>

      <Section
        id="projects"
        num="01"
        eyebrow="FEATURED PROJECTS"
        title="Case studies in agents, retrieval & ML."
        subtitle="Shipped systems with measured outcomes — latency, relevance and accuracy, not just demos."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} inspect={setArch} />
          ))}
        </div>
      </Section>

      <Section
        id="architecture"
        num="02"
        eyebrow="ARCHITECTURE"
        title="How the systems are wired."
        subtitle="Pick a project to trace its request path from input to output."
      >
        <div className="mb-6 flex flex-wrap gap-2.5">
          {projects.map((p) => {
            const isSel = p.id === activePipelineProject.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedArchId(p.id)}
                className={`rounded-lg border px-3.5 py-2 text-xs font-medium transition ${
                  isSel
                    ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                    : "border-white/[.08] bg-[#111114] text-zinc-400 hover:text-white"
                }`}
              >
                {p.title}
              </button>
            );
          })}
        </div>

        <Card className="p-6 md:p-8">
          <PipelineDiagram stages={activePipelineProject.pipeline} />
        </Card>
      </Section>

      <Section
        id="experience"
        num="03"
        eyebrow="EXPERIENCE & EDUCATION"
        title="Where I've been building."
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="mono mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-400">
              <Briefcase size={14} className="text-emerald-400" />
              EXPERIENCE
            </h3>
            <ol className="space-y-8 border-l border-white/10 pl-6">
              {jobs.map((j) => (
                <li key={j.role} className="relative">
                  <span className="absolute -left-[28.5px] top-1.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  <p className="mono text-xs text-zinc-500">{j.when}</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {j.role}
                  </p>
                  <p className="text-sm font-medium text-emerald-400">
                    {j.org}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                    {j.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="mono mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-zinc-400">
              <GraduationCap size={14} className="text-emerald-400" />
              EDUCATION
            </h3>
            <ol className="space-y-8 border-l border-white/10 pl-6">
              {edu.map((e) => (
                <li key={e.institution} className="relative">
                  <span className="absolute -left-[28.5px] top-1.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981]" />
                  <p className="mono text-xs text-zinc-500">{e.topMeta}</p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {e.institution}
                  </p>
                  <p className="text-sm font-medium text-emerald-400">
                    {e.degree}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      <Section
        id="skills"
        num="04"
        eyebrow="TECHNICAL SKILLS"
        title="The toolkit."
        rightSlot={
          <div className="flex flex-wrap gap-2 text-xs">
            {["All", "AI & Agents", "Backend & SQL", "Languages & Cloud"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-lg border px-3 py-1.5 font-medium transition ${
                    filter === f
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-[#111114] text-zinc-400 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              )
            )}
          </div>
        }
      >
        <div className="grid gap-5 md:grid-cols-2">
          {visibleSkillCategories.map((cat) => (
            <Card key={cat.title} className="p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-white">
                  {cat.title}
                </h3>
                <span className="mono text-xs text-zinc-500">
                  {cat.items.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((skill) => (
                  <span
                    key={skill}
                    className="mono rounded-md border border-white/[.08] bg-[#16161a] px-2.5 py-1 text-xs text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <Section
        id="achievements"
        num="05"
        eyebrow="ACHIEVEMENTS & CREDENTIALS"
        title="Proof of work."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {wins.map((w) => (
            <Card key={w.id} className="flex flex-col justify-between p-6">
              <div>
                <div className="flex items-start justify-between">
                  <AchievementIcon icon={w.icon} tone={w.tone} />
                  {w.href && (
                    <a
                      href={w.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={w.title}
                      className="text-zinc-500 transition hover:text-emerald-400"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
                <p className="mono mt-5 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
                  {w.tag}
                </p>
                <p className="mt-1.5 text-base font-semibold leading-snug text-white">
                  {w.title}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                  {w.subtitle}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      <footer className="mt-12 border-t border-white/[.08]">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 px-5 py-12 md:flex-row md:items-end">
          <div>
            <span className="mono text-sm font-bold text-white">
              &lt;DG <span className="text-emerald-400">/&gt;</span>
            </span>
            <p className="mt-2 text-2xl font-bold text-white md:text-3xl">
              Let&apos;s build something that reasons.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-zinc-400">
              <a
                href={`mailto:${P.email}`}
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Mail size={14} className="text-emerald-400" />
                {P.email}
              </a>
              <a
                href={`tel:${P.phone}`}
                className="flex items-center gap-2 transition hover:text-white"
              >
                <Phone size={14} className="text-emerald-400" />
                {P.phone}
              </a>
              <span className="flex items-center gap-2">
                <MapPin size={14} className="text-emerald-400" />
                Patna, India
              </span>
            </div>
          </div>

          <div className="flex flex-col md:items-end">
            <div className="flex items-center gap-4 text-zinc-400">
              <a
                href={P.github}
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                <GitBranch size={18} />
              </a>
              <a
                href={P.linkedin}
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                <LinkedInIcon size={18} />
              </a>
              <a
                href={P.leetcode}
                aria-label="LeetCode"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white"
              >
                <Code2 size={18} />
              </a>
            </div>
            <p className="mono mt-4 text-xs text-zinc-500">
              Built with Next.js, Three.js &amp; Tailwind CSS
            </p>
          </div>
        </div>
      </footer>

      <button
        onClick={() => setChat(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full border border-emerald-500/40 bg-[#0d1412]/95 px-4 py-2.5 text-sm font-medium text-zinc-100 shadow-[0_0_24px_rgba(16,185,129,0.2)] backdrop-blur transition hover:border-emerald-400"
      >
        <Sparkles size={15} className="text-emerald-400" />
        Ask AI about Devesh ✨
      </button>

      <Palette
        open={palette}
        onClose={() => setPalette(false)}
        commands={commands}
      />
      <Chat open={chat} onClose={() => setChat(false)} />
      <Modal open={!!arch} onClose={() => setArch(null)}>
        {arch && (
          <div className="p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="mono text-[10px] uppercase tracking-[0.18em] text-emerald-400">
                  SYSTEM ARCHITECTURE
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">
                  {arch.title}
                </h3>
              </div>
              <button
                onClick={() => setArch(null)}
                aria-label="Close"
                className="rounded-lg p-1 text-zinc-400 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
            <PipelineDiagram stages={arch.pipeline} />
          </div>
        )}
      </Modal>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed bottom-20 left-1/2 z-[80] flex -translate-x-1/2 items-center gap-2 rounded-lg border border-emerald-500/40 bg-[#0d1512] px-4 py-2 text-sm text-emerald-300"
          >
            <Check size={14} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function Palette({
  open,
  onClose,
  commands,
}: {
  open: boolean;
  onClose: () => void;
  commands: [string, () => void][];
}) {
  const [q, setQ] = useState("");
  const list = commands.filter(([l]) =>
    l.toLowerCase().includes(q.toLowerCase())
  );
  const run = (f: () => void) => {
    onClose();
    setQ("");
    f();
  };
  return (
    <Modal open={open} onClose={onClose}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4">
        <Search size={16} className="text-zinc-500" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && list[0] && run(list[0][1])}
          placeholder="Jump to a section, copy contact, open a profile…"
          className="w-full bg-transparent py-3.5 text-sm outline-none placeholder:text-zinc-600"
        />
      </div>
      <ul className="max-h-72 overflow-auto p-2">
        {list.map(([l, f], i) => (
          <li key={l}>
            <button
              onClick={() => run(f)}
              className={`w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-white/[.06] ${
                i === 0 ? "bg-white/[.04]" : ""
              }`}
            >
              {l}
            </button>
          </li>
        ))}
        {!list.length && (
          <li className="px-3 py-6 text-center text-sm text-zinc-500">
            No matching command
          </li>
        )}
      </ul>
    </Modal>
  );
}

function Chat({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [msgs, setMsgs] = useState<{ r: "u" | "a"; t: string }[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);

  const ask = (q: string) => {
    if (!q.trim() || busy) return;
    const words = answer(q).split(" ");
    setMsgs((m) => [...m, { r: "u", t: q }, { r: "a", t: "" }]);
    setText("");
    setBusy(true);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setMsgs((m) =>
        m.map((x, j) =>
          j === m.length - 1 ? { ...x, t: words.slice(0, i).join(" ") } : x
        )
      );
      if (i >= words.length) {
        clearInterval(id);
        setBusy(false);
      }
    }, 28);
  };

  return (
    <Modal open={open} onClose={onClose} side="right">
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <p className="font-medium text-white">Ask Devesh&apos;s AI</p>
        <button onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>
      <div className="flex-1 space-y-3 overflow-auto p-4 text-sm">
        {!msgs.length && (
          <>
            <p className="text-zinc-400">
              Answers come only from Devesh&apos;s projects, metrics and resume.
            </p>
            {starters.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="block w-full rounded-lg border border-white/10 p-3 text-left text-zinc-300 hover:border-emerald-500/40"
              >
                {s}
              </button>
            ))}
          </>
        )}
        {msgs.map((m, i) => (
          <div
            key={i}
            className={
              m.r === "u"
                ? "ml-8 rounded-xl bg-emerald-500/10 p-3 text-emerald-100"
                : "mr-4 rounded-xl bg-white/[.04] p-3 leading-relaxed text-zinc-300"
            }
          >
            {m.t || "…"}
          </div>
        ))}
      </div>
      <div className="flex gap-2 border-t border-white/10 p-3">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask(text)}
          placeholder="Ask about a project, skill or result"
          className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500/50"
        />
        <button
          onClick={() => ask(text)}
          aria-label="Send"
          className="rounded-lg bg-emerald-400 px-3 text-black"
        >
          <Send size={16} />
        </button>
      </div>
    </Modal>
  );
}