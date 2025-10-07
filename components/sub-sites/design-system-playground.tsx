"use client"

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import {
  Terminal,
  BookOpen,
  Code,
  Layers,
  Hash,
  FileText,
  PanelLeft,
  Workflow,
  ActivitySquare,
  AlertTriangle,
} from "lucide-react"

/*
  FLOAT UI — Design System Playground
  Single-file, runnable, JSON‑driven. Sharp corners, visible 1px borders,
  high-contrast dark shell. No gradients, no shadows. Tailwind for styling.

  What this provides
  - Tokens: colors, persona accents, roles
  - Components: AppShell, Panel, Tabs, Tag, Label, CodeBlock, Prose renderer
  - Ritual grammar chips (ctx::, protocol::, signal::, status::)
  - Boundary translator demo: parses "::" lines → typed annotations

  Scale path
  - Replace DEMO_SPEC with loader (vault/REST/MCP)
  - Extend BlockRenderer with new block types
  - Wire Tabs to routes; Panels to data sources
*/

/* ============================== TOKENS ============================== */
const TOKENS = {
  color: {
    bg: "#000000",
    panel: "#0A0014", // Ritual Dark
    text: "#f0f0f0",
    purple: "#B84DFF", // primary accent
    red: "#FF0040",
    yellow: "#FFFF40",
    green: "#28E07C",
    cyan: "#00E0FF",
    pink: "#FF3FD1",
    orange: "#FF8A00",
    border: "#2A2A2A",
  },
  persona: {
    sysop: "purple",
    karen: "pink",
    evna: "green",
    lf1m: "orange",
    qtb: "pink",
    float: "cyan",
  },
}

/* ============================== UTIL ============================== */
const cx = (...a: any[]) => a.filter(Boolean).join(" ")
const accent = (key: string) => TOKENS.color[key as keyof typeof TOKENS.color] || TOKENS.color.purple

/* ============================== DATA (DEMO) ============================== */
const DEMO_SPEC = {
  meta: {
    title: "FLOAT Stack UI Design System — v1.2",
    subtitle: "Ritual-glitch, terminal-first, JSON-driven",
    date: "2025-10-06",
  },
  sections: [
    {
      id: "ethos",
      icon: <Layers className="h-4 w-4" />,
      title: "Core Philosophy",
      persona: "sysop",
      blocks: [
        { type: "heading", level: 2, text: "Shacks, Not Cathedrals" },
        {
          type: "paragraph",
          text: "Favor modular, adaptable, expendable structures. Resilience over polish. The UI shows its scaffolding and lets you swap parts without ceremony.",
        },
        { type: "divider" },
        { type: "heading", level: 3, text: "Conversation as Infrastructure" },
        {
          type: "paragraph",
          text: ":: syntax is executable architecture. Labels like ctx::, protocol::, and signal:: must remain visible and machine-parseable.",
        },
        {
          type: "code",
          lang: "text",
          value: "ctx::2025-10-06 20:12\nprotocol:: skim → carve\nsignal:: vigilance-burn",
        },
      ],
    },
    {
      id: "visuals",
      icon: <ActivitySquare className="h-4 w-4" />,
      title: "Visual Rules",
      persona: "float",
      blocks: [
        {
          type: "list",
          style: "bullet",
          items: [
            "Dark shell (#000) with panel fill (#0A0014)",
            "1px visible borders; no drop shadows",
            "Sharp corners (rounded-none). Exception: code blocks may use rounded-sm",
            "Monospace everywhere (IBM Plex Mono / Fira Code / JetBrains Mono)",
            "Accent palette: purple, cyan, green, pink, red, yellow",
          ],
        },
      ],
    },
    {
      id: "components",
      icon: <Code className="h-4 w-4" />,
      title: "Components",
      persona: "karen",
      blocks: [
        { type: "heading", level: 3, text: "Panels" },
        {
          type: "paragraph",
          text: "Bordered containers that represent shacks. No rounding. Content density over chrome.",
        },
        { type: "heading", level: 3, text: "Tabs" },
        {
          type: "paragraph",
          text: "role='tab'; active tab has bottom border in persona accent. Keyboard 1..4 bound to tabs.",
        },
      ],
    },
    {
      id: "boundary",
      icon: <AlertTriangle className="h-4 w-4" />,
      title: "Translate‑at‑Boundaries",
      persona: "karen",
      blocks: [
        {
          type: "paragraph",
          text: "Fix conversions exactly at the handoff. Demo: parse :: lines into typed annotations below.",
        },
        {
          type: "code",
          lang: "text",
          value: "ctx::2025-10-06@20:14 | env:prod\nsignal::overwhelm | level:high\nstatus::OK",
        },
        { type: "annotation_demo" },
      ],
    },
  ],
}

/* ============================== COMPONENTS ============================== */
function AppShell({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen w-full bg-black font-mono text-white">{children}</div>
}

function AppHeader({ meta }: { meta: typeof DEMO_SPEC.meta }) {
  return (
    <header className="sticky top-0 z-10 border-b" style={{ borderColor: TOKENS.color.border, background: "#000" }}>
      <div className="mx-auto flex max-w-[1200px] items-center gap-3 px-4 py-3">
        <Terminal className="h-4 w-4" style={{ color: accent("purple") }} />
        <div className="text-sm uppercase tracking-widest text-zinc-400">FLOAT UI</div>
        <div className="ml-2 text-sm text-zinc-200">{meta.title}</div>
        <div className="ml-auto text-xs text-zinc-500">{meta.date}</div>
      </div>
    </header>
  )
}

function Panel({
  title,
  persona,
  icon,
  children,
}: { title: string; persona: string; icon: React.ReactNode; children: React.ReactNode }) {
  const color = accent(TOKENS.persona[persona as keyof typeof TOKENS.persona] || "purple")
  return (
    <section className="rounded-none border" style={{ borderColor: color, background: TOKENS.color.panel }}>
      <div className="flex items-center gap-2 border-b px-4 py-2" style={{ borderColor: color }}>
        <div className="text-xs" style={{ color }}>
          {icon}
        </div>
        <h3 className="text-xs font-semibold tracking-wide" style={{ color }}>
          {title}
        </h3>
      </div>
      <div className="p-4 text-[13px] text-zinc-200">{children}</div>
    </section>
  )
}

function Tabs({ tabs, active, setActive }: { tabs: any[]; active: string; setActive: (key: string) => void }) {
  return (
    <div className="flex overflow-x-auto border-b" style={{ borderColor: TOKENS.color.border }} role="tablist">
      {tabs.map((t) => (
        <button
          key={t.key}
          role="tab"
          aria-selected={active === t.key}
          onClick={() => setActive(t.key)}
          className={cx("px-3 py-2 text-xs", active === t.key && "font-semibold")}
          style={{
            borderBottom: `2px solid ${active === t.key ? accent(t.accent) : "transparent"}`,
            color: active === t.key ? accent(t.accent) : "#9CA3AF",
          }}
        >
          <span className="inline-flex items-center gap-2">
            {t.icon}
            {t.label}
          </span>
        </button>
      ))}
    </div>
  )
}

function Tag({ children, tone = "cyan" }: { children: React.ReactNode; tone?: string }) {
  return (
    <span
      className="mr-2 inline-flex items-center gap-1 border px-2 py-[1px] text-[10px]"
      style={{ borderColor: accent(tone), color: accent(tone) }}
    >
      <Hash className="h-3 w-3" /> {children}
    </span>
  )
}

function Label({ k, v }: { k: string; v: string }) {
  return (
    <div
      className="inline-flex items-center gap-2 border px-2 py-0.5 text-[10px]"
      style={{ borderColor: TOKENS.color.border }}
    >
      <span className="text-zinc-400">{k}</span>
      <span className="text-zinc-200">{v}</span>
    </div>
  )
}

function CodeBlock({ value, lang = "text" }: { value: string; lang?: string }) {
  return (
    <pre
      className="mt-2 rounded-sm border p-3 text-[12px] leading-tight"
      style={{ borderColor: TOKENS.color.border, background: "#000" }}
    >
      {value}
    </pre>
  )
}

/* Block renderer (JSON-driven) */
function BlockRenderer({ block }: { block: any }) {
  if (block.type === "heading") {
    const level = block.level || 2
    const HeadingTag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
    const headingProps = {
      className: "mt-2 mb-1 text-[13px] uppercase tracking-wider",
      style: { color: accent("purple") },
    }

    if (level === 1) return <h1 {...headingProps}>{block.text}</h1>
    if (level === 2) return <h2 {...headingProps}>{block.text}</h2>
    if (level === 3) return <h3 {...headingProps}>{block.text}</h3>
    if (level === 4) return <h4 {...headingProps}>{block.text}</h4>
    if (level === 5) return <h5 {...headingProps}>{block.text}</h5>
    return <h6 {...headingProps}>{block.text}</h6>
  }
  if (block.type === "paragraph") return <p className="mt-2 text-[13px] text-zinc-200">{block.text}</p>
  if (block.type === "list")
    return (
      <ul className="mt-2 list-disc pl-5 text-zinc-200">
        {block.items.map((it: string, i: number) => (
          <li key={i} className="mb-1">
            {it}
          </li>
        ))}
      </ul>
    )
  if (block.type === "code") return <CodeBlock value={block.value} lang={block.lang} />
  if (block.type === "divider") return <div className="my-3 border-t" style={{ borderColor: TOKENS.color.border }} />
  if (block.type === "annotation_demo") return <AnnotationDemo />
  return null
}

/* ============================== BOUNDARY DEMO ============================== */
function translateAtBoundary(input: string) {
  // Parses lines like "ctx::2025-10-06@20:14 | env:prod"
  const lines = input
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean)
  return lines.map((l) => {
    const [label, rest] = l.split("::")
    const [value, ...pairs] = (rest || "").split("|").map((s) => s.trim())
    const meta = Object.fromEntries(pairs.map((p) => p.split(":").map((s) => s.trim())).filter(([k, v]) => k && v))
    return { label: label || "unknown", value, meta }
  })
}

function AnnotationDemo() {
  const demo = "ctx::2025-10-06@20:14 | env:prod\nsignal::overwhelm | level:high\nstatus::OK"
  const parsed = useMemo(() => translateAtBoundary(demo), [])
  return (
    <div className="mt-2">
      <div className="mb-2 text-[12px] text-zinc-400">Boundary translation result:</div>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
        {parsed.map((a, i) => (
          <div key={i} className="border p-2" style={{ borderColor: TOKENS.color.border }}>
            <div className="mb-1 text-[11px] uppercase tracking-wider" style={{ color: accent("cyan") }}>
              {a.label}::
            </div>
            <div className="text-[12px] text-zinc-200">{a.value}</div>
            <div className="mt-1 flex flex-wrap gap-1">
              {Object.entries(a.meta).map(([k, v]) => (
                <Label key={k} k={k} v={v} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ============================== MAIN ============================== */
const TABS = [
  { key: "overview", label: "Overview", icon: <BookOpen className="h-4 w-4" />, accent: "purple" },
  { key: "visuals", label: "Visuals", icon: <ActivitySquare className="h-4 w-4" />, accent: "cyan" },
  { key: "components", label: "Components", icon: <Code className="h-4 w-4" />, accent: "pink" },
  { key: "boundary", label: "Boundary", icon: <Workflow className="h-4 w-4" />, accent: "yellow" },
]

export default function FloatDesignSystemPlayground() {
  const [active, setActive] = useState("overview")

  // Keyboard 1..4
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4"].includes(e.key)) setActive(TABS[Number(e.key) - 1].key)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const sec = useMemo(() => {
    const map = Object.fromEntries(DEMO_SPEC.sections.map((s) => [s.id, s]))
    if (active === "overview") return map.ethos
    if (active === "visuals") return map.visuals
    if (active === "components") return map.components
    if (active === "boundary") return map.boundary
    return map.ethos
  }, [active])

  return (
    <AppShell>
      <AppHeader meta={DEMO_SPEC.meta} />
      <main className="mx-auto max-w-[1200px] px-4 py-4">
        <Tabs tabs={TABS} active={active} setActive={setActive} />
        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
          <section className="space-y-4">
            <Panel title="Meta" persona="sysop" icon={<FileText className="h-3 w-3" />}>
              <div className="space-x-2">
                <Tag tone="purple">spec</Tag>
                <Tag tone="cyan">json-driven</Tag>
                <Tag tone="green">terminal-first</Tag>
              </div>
              <div className="mt-3 text-[12px] text-zinc-400">{DEMO_SPEC.meta.subtitle}</div>
            </Panel>
            <Panel title="Personas" persona="float" icon={<PanelLeft className="h-3 w-3" />}>
              <div className="grid grid-cols-2 gap-2 text-[12px]">
                {Object.entries(TOKENS.persona).map(([name, col]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between border px-2 py-1"
                    style={{ borderColor: TOKENS.color.border }}
                  >
                    <span className="uppercase tracking-wider text-zinc-400">{name}</span>
                    <span className="h-3 w-8" style={{ background: accent(col) }} />
                  </div>
                ))}
              </div>
            </Panel>
          </section>

          <section className="space-y-4">
            <Panel title={sec.title} persona={sec.persona} icon={sec.icon}>
              {sec.blocks.map((b: any, i: number) => (
                <BlockRenderer key={i} block={b} />
              ))}
            </Panel>
          </section>
        </div>
      </main>
    </AppShell>
  )
}
