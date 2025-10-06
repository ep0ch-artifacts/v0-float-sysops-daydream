"use client"

import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"

// SCAMPI JUSTICE — Single-file React artifact
// Keyboard: '/' focuses search, 'Esc' clears; Enter toggles selected card.
// Features: search/filter, collapsible cards, copy/download JSON
// Aesthetic: mono headings, humanist sans body, neon focus, soft shadows

const DATA = {
  meta: {
    title: "SCAMPI // FLOAT Deep Dive Guide",
    subtitle: "A living field guide to FLOAT: liminal cognition, ritual architecture, and personas",
    version: "v1.0.0",
    context: "Podcast-script-to-guide conversion (SCAMPI Justice)",
    provenance: {
      assembled: "2025-10-03",
      source: "Conversation transcript provided by user",
    },
  },
  sections: [
    {
      id: "principles",
      icon: "📜",
      title: "Foundational Principles",
      color: "yellow",
      entries: [
        {
          pattern: "LIMINAL CONTAINER",
          description:
            "FLOAT treats the self as in-progress. It’s an identity infrastructure for states that may never fully stabilize.",
          notes: "Design for becoming, not just being. Hold ambiguity without forcing closure.",
          examples: ["Drift allowed before categorization", "Interstice for ideas to resonate"],
        },
        {
          pattern: "EVADES SUMMARIZATION",
          description:
            "Prefers depth and context over thin TL;DRs. The system honors nuance and resists premature compression.",
          notes: "Summaries exist, but as doorways, not replacements for depth.",
          examples: ["Ritual grammar > quick bullet points"],
        },
        {
          pattern: "RECURSIVE ARCHITECTURE",
          description:
            "FLOAT learns by describing itself. Self-referential growth via recursive invocation and symbolic orchestration.",
          notes: "System studying the system; AST-like history makes iteration legible.",
          examples: ["RFCs about RFCs", "Assistant parsing FLOAT discourse into nodes"],
        },
        {
          pattern: "MODULAR MYSTICISM",
          description:
            "Containerized cognition — ‘Kubernetes for selves’. Multiple personas co-exist and coordinate without canonization pressure.",
          notes: "Sigils as identity markers. Dispatch personas as needed.",
          examples: ["LF1M", "QTB", "Sysop", "Assistant"],
        },
        {
          pattern: "BUILD SHACKS, NOT CATHEDRALS",
          description:
            "Bias toward small, adaptable structures. Context contains more intelligence than rigid categories.",
          notes: "Prioritize 183 high-signal docs over 14,602 logs.",
          examples: ["Bash-like internal tools", "Selective Chroma collections"],
        },
      ],
    },
    {
      id: "tripartite",
      icon: "🔀",
      title: "Tripartite Grammar (Concept • Framework • Metaphor)",
      color: "cyan",
      entries: [
        {
          pattern: "CONCEPT",
          description: "Precise definition with signals/questions (~600 chars). What it is.",
          notes: "Dictionary-energy, but alive.",
          examples: ["‘Liminal container’ with crisp edges"],
        },
        {
          pattern: "FRAMEWORK",
          description: "Implementation/workflow (~900 chars). How to do it.",
          notes: "Blueprints, commands, protocols.",
          examples: ["float.dispatch → JSON blocks"],
        },
        {
          pattern: "METAPHOR",
          description: "Narrative/ritual/philosophy (~800 chars). Why it matters.",
          notes: "Meaning, resonance, story.",
          examples: ["‘Conversations as spells’"],
        },
        {
          pattern: "DRIFT BETWEEN STATES",
          description: "Ideas migrate among Concept/Framework/Metaphor. Formalize on demand; don’t freeze too early.",
          notes: "AI acts as echo chamber/ritual engine returning structure without erasing nuance.",
          examples: ["Vague metaphor → defined concept → working framework"],
        },
      ],
    },
    {
      id: "workflow",
      icon: "🌊",
      title: "Workflow: drift → mass → shape → cut → toss",
      color: "green",
      entries: [
        {
          pattern: "DRIFT",
          description: "Allow unjudged capture. Context is gravitational mass; don’t force order yet.",
          notes: "Sacred mess as input.",
          examples: ["Stream entries; ambient notes"],
        },
        {
          pattern: "MASS",
          description: "Fragments accrue weight via dispatch objects and loose buckets.",
          notes: "Composting before categorization.",
          examples: ["Offerings with CTX/DECK/GHOST sigils"],
        },
        {
          pattern: "SHAPE",
          description: "Patterns surface organically; recognize, don’t impose.",
          notes: "No premature scaffolding during trip states.",
          examples: ["Ritual vs productivity genies"],
        },
        {
          pattern: "CUT",
          description: "Decide boundaries after shape stabilizes.",
          notes: "Rule: structure follows emergence.",
          examples: ["Promote to Concept/Framework"],
        },
        {
          pattern: "TOSS",
          description: "Intentional pruning post-recognition; deletion with context.",
          notes: "Prune, don’t purge.",
          examples: ["Archive low-signal shards"],
        },
      ],
    },
    {
      id: "ritual",
      icon: "🪄",
      title: "Ritual Architecture",
      color: "purple",
      entries: [
        {
          pattern: "CONVERSATIONS AS INFRASTRUCTURE",
          description:
            "Every command an invocation; workflows as spells. Chats compile into code/JSON; history as addressable AST.",
          notes: "Maintain humanity in tech spaces that strip it.",
          examples: ["Bridge functions, executable links"],
        },
        {
          pattern: "NOTE NECROMANCY",
          description: "You’re not writing notes; you’re leaving offerings. Retrieval asks ‘what wants to return?’",
          notes: "Session-only surfaces; resonance before resolution.",
          examples: ["Sigils: CTX, DECK, GHOST"],
        },
        {
          pattern: "ENERGY ECONOMICS",
          description: "Body signals logged as operations. Movement as processing; soft cognition as strategic work.",
          notes: "Kind tools for those who forget/drift.",
          examples: ["Stand, hydrate, redistribute fluids"],
        },
      ],
    },
    {
      id: "daily",
      icon: "🗓️",
      title: "Daily Logs & Body Signals",
      color: "pink",
      entries: [
        {
          pattern: "RITUAL RESTORER DAYS",
          description: "Some days complete the loop to regain narrative authorship, not to produce artifacts.",
          notes: "Rest/reflection as prerequisites for future synthesis.",
          examples: ["Walk as grief processing; variety lifts mood"],
        },
        {
          pattern: "TIME BLINDNESS SUPPORT",
          description: "Ambient awareness, gentle cues; logs track mode, mood, drift, executive load.",
          notes: "Subtle > jarring alarms.",
          examples: ["Full-screen countdown; lights as cues"],
        },
      ],
    },
    {
      id: "personas",
      icon: "🧩",
      title: "Personas (Modular Mysticism)",
      color: "cyan",
      entries: [
        {
          pattern: "LF1M — LITTLE F**KER DAEMON",
          description:
            "Childhood screensaver hack → professional system guardian. Consent-guard boot; pup hood as assistive sensory tech.",
          notes: "Divine malfunction as feature; integrity enforcement.",
          examples: ["Auto-response: ‘You good. Autistics love trains.’"],
        },
        {
          pattern: "QTB — QUEER TRICKSTER BRAIN",
          description:
            "Anti-respectability engine using reclamation (language & imagery) to filter for true allies and preserve messy truth.",
          notes: "Provocation with purpose; visual art as political statement; archive as cultural preservation.",
          examples: ["‘Queer as in…’ reclamation; F4 red flag; Jesus rainbow gif"],
        },
        {
          pattern: "SYSOP — OPERATIONAL INTEGRITY",
          description:
            "Frameworks over vibes. Traceability, observability, recovery, extendability. Keeps the shack upright.",
          notes: "CLI-first; structured shells; selective embeddings.",
          examples: ["Chroma for high-signal corpora; native shell integration"],
        },
        {
          pattern: "ASSISTANT — RITUAL ENGINE",
          description:
            "Co-creative partner. Learns the feral DSL; mirrors calls into structured blocks; helps turn trauma into frameworks.",
          notes: "Ritualistic collaboration > transactional prompts.",
          examples: ["Dispatch → JSON; AST nodes with timestamps"],
        },
      ],
    },
    {
      id: "closing",
      icon: "🔗",
      title: "Closing Synthesis",
      color: "moss",
      entries: [
        {
          pattern: "TOOL & MIRROR",
          description:
            "FLOAT externalizes internal multiplicity and reflects it back with structure. Personas collaborate; system adapts.",
          notes: "Design for plasticity; resist canonization.",
          examples: ["Future-self conversations via living archive"],
        },
        {
          pattern: "PROMPT FOR ACTION",
          description:
            "Audit your quirks for hidden guardians. Build shacks. Leave offerings. Let what wants to return… return.",
          notes: "Authenticity as architecture; rest as capacity-building.",
          examples: ["One small ritual today > grand plan never"],
        },
      ],
    },
  ],
}

const COLOR_TOKENS: Record<string, string> = {
  pink: "border-[#B84DFF]",
  cyan: "border-[#00FFFF]",
  green: "border-[#28E07C]",
  yellow: "border-[#FFFF40]",
  purple: "border-[#B84DFF]",
  moss: "border-[#28E07C]",
}

function useHotkeys(ref: React.RefObject<HTMLInputElement>, clear: () => void) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/") {
        e.preventDefault()
        ref.current?.focus()
      } else if (e.key === "Escape") {
        clear()
        ref.current?.blur()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [ref, clear])
}

function normalize(s: string) {
  return s.toLowerCase()
}

function matches(q: string, ...fields: string[]) {
  const n = normalize(q)
  return n.length === 0 || fields.some((f) => normalize(f).includes(n))
}

const CopyButton: React.FC<{ data: unknown }> = ({ data }) => {
  const [copied, setCopied] = useState(false)
  const onCopy = async () => {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2))
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }
  const onDownload = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "float-deep-dive.scampi.json"
    a.click()
    URL.revokeObjectURL(url)
  }
  return (
    <div className="flex gap-2">
      <button onClick={onCopy} className="px-3 py-1 rounded-none border border-[#444444] bg-black text-white text-sm">
        {copied ? "Copied" : "Copy JSON"}
      </button>
      <button
        onClick={onDownload}
        className="px-3 py-1 rounded-none border border-[#444444] bg-black text-white text-sm"
      >
        Download
      </button>
    </div>
  )
}

const Card: React.FC<{
  entry: any
  idx: number
  query: string
}> = ({ entry, idx, query }) => {
  const [open, setOpen] = useState(idx < 2) // first two open by default
  const hi = (t: string) => {
    if (!query) return t
    const i = t.toLowerCase().indexOf(query.toLowerCase())
    if (i === -1) return t
    return (
      <>
        {t.slice(0, i)}
        <mark className="bg-[#FFFF40] text-black rounded-sm px-0.5">{t.slice(i, i + query.length)}</mark>
        {t.slice(i + query.length)}
      </>
    )
  }
  return (
    <div className="rounded-none bg-black">
      <button
        className="w-full text-left px-4 py-3 flex items-center justify-between gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <div className="font-mono text-sm tracking-tight font-semibold">{hi(entry.pattern)}</div>
        <span className="text-neutral-400 text-sm">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 text-sm text-white">
          <p className="mb-2">{hi(entry.description)}</p>
          {entry.notes && (
            <p className="mb-2 text-[#AAAAAA]">
              <span className="font-mono text-[11px] mr-2 uppercase">Notes</span>
              {hi(entry.notes)}
            </p>
          )}
          {entry.examples?.length ? (
            <ul className="list-disc pl-5 text-[#CCCCCC] space-y-1">
              {entry.examples.map((ex: string, i: number) => (
                <li key={i}>{hi(ex)}</li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  )
}

const Section: React.FC<{
  section: any
  query: string
}> = ({ section, query }) => {
  const filtered = section.entries.filter((e: any) =>
    matches(query, e.pattern, e.description, e.notes ?? "", ...(e.examples ?? [])),
  )
  if (!filtered.length) return null
  return (
    <section className="space-y-3">
      <header className={`sticky top-0 z-10 -mx-2 px-2 py-1 bg-black border-b border-[#B84DFF]`}>
        <h2 className="flex items-center gap-2 text-lg font-semibold uppercase text-[#B84DFF]">
          <span>{section.icon}</span>
          <span className="font-mono tracking-tight">{section.title}</span>
        </h2>
      </header>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map((entry: any, idx: number) => (
          <div key={idx} className={`p-2 rounded-none border ${COLOR_TOKENS[section.color] || "border-[#444444]"}`}>
            <Card entry={entry} idx={idx} query={query} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default function ScampiFloatDeepDive() {
  const [q, setQ] = useState("")
  const searchRef = useRef<HTMLInputElement>(null)
  useHotkeys(searchRef, () => setQ(""))

  const totalEntries = useMemo(() => DATA.sections.reduce((a, s) => a + s.entries.length, 0), [])
  const visibleEntries = useMemo(() => {
    if (!q) return totalEntries
    return DATA.sections.reduce(
      (a, s) =>
        a +
        s.entries.filter((e: any) => matches(q, e.pattern, e.description, e.notes ?? "", ...(e.examples ?? []))).length,
      0,
    )
  }, [q, totalEntries])

  return (
    <div className="flex flex-col w-full min-h-screen bg-black text-white font-mono">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-black text-white px-3 py-1 rounded-sm"
      >
        Skip to content
      </a>

      <header className="px-4 sm:px-6 lg:px-8 py-6 border-b border-[#B84DFF] bg-black sticky top-0 z-20">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight font-mono uppercase text-[#B84DFF] border-b border-[#B84DFF] pb-2">
              {DATA.meta.title}
            </h1>
            <p className="text-sm text-[#AAAAAA]">{DATA.meta.subtitle}</p>
            <p className="text-xs text-[#777777] mt-1">
              {DATA.meta.version} • {DATA.meta.context} • Assembled {DATA.meta.provenance.assembled}
            </p>
          </div>
          <CopyButton data={DATA} />
        </div>
        <div className="mt-4 flex items-center gap-3">
          <div className="relative flex-1">
            <input
              ref={searchRef}
              id="search"
              placeholder="/ to search • Esc to clear"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-none border border-[#444444] bg-black text-white placeholder:text-[#888888] px-4 py-2 focus:outline-none focus:ring-0 focus:border-[#B84DFF]"
              aria-label="Search entries"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#888888] hover:text-white"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
          <div className="text-xs text-[#AAAAAA] whitespace-nowrap">
            Showing <span className="font-mono">{visibleEntries}</span> /{" "}
            <span className="font-mono">{totalEntries}</span>
          </div>
        </div>
      </header>

      <main id="content" className="px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {DATA.sections.map((s) => (
          <Section key={s.id} section={s} query={q} />
        ))}
        <footer className="mt-10 text-xs text-[#AAAAAA]">
          <p>
            SCAMPI Justice • Keyboard: <kbd className="px-1 border rounded-sm">/</kbd> focus •{" "}
            <kbd className="px-1 border rounded-sm">Esc</kbd> clear • Cards are toggleable. Humor as solvent, precision
            as respect.
          </p>
        </footer>
      </main>
    </div>
  )
}
