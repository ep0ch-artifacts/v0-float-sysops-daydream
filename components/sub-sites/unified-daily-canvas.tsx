"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import {
  BookOpen,
  Terminal,
  Sparkles,
  Radio,
  Flame,
  Home,
  Printer,
  Command,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Battery,
  Users,
  MessageSquare,
  ArrowLeft,
  PanelsTopLeft,
} from "lucide-react"

/*
  UNIFIED DAILY CANVAS — 2025-10-06
  -------------------------------------------------
  • One-file React app for Canvas preview (Tailwind ok)
  • Tabs:
      1) Meta & TL;DR (AM)
      2) TL;DR (PM)
      3) Daily Log
      4) Four Rs Digest (componentized)
      5) Zine (mini)
      6) Sysop Flow (proof-of-concept)
  • Keyboard:
      /  = command bar
      g  = toggle grid
      t  = self-tests overlay
      ←/→ = switch tabs
*/

// ---------- Helpers
const cx = (...c) => c.filter(Boolean).join(" ")

// Tiny markdown parser: headings, lists, codefences, bold, italics, quotes
const MD = ({ text }) => {
  if (!text) return null
  const lines = text.split(/\r?\n/)
  const out = []
  let list = []
  let code = null
  lines.forEach((line, i) => {
    // code fences
    if (line.startsWith("````")) return // guard
    if (line.startsWith("```")) {
      if (code) {
        out.push(
          <pre
            key={`code-${i}`}
            className="bg-black/70 border border-zinc-800 rounded p-3 overflow-x-auto text-xs text-emerald-300"
          >
            <code>{code.join("\n")}</code>
          </pre>,
        )
        code = null
      } else {
        code = []
      }
      return
    }
    if (code) {
      code.push(line)
      return
    }

    // blockquote
    if (line.startsWith("> ")) {
      out.push(
        <blockquote key={`q-${i}`} className="border-l-2 border-zinc-700 pl-3 italic text-zinc-300">
          {line.slice(2)}
        </blockquote>,
      )
      return
    }

    // lists
    if (/^[-*]\s+/.test(line)) {
      list.push(line.replace(/^[-*]\s+/, ""))
      const next = lines[i + 1]
      if (!next || !/^[-*]\s+/.test(next)) {
        out.push(
          <ul key={`ul-${i}`} className="my-3 space-y-1">
            {list.map((li, j) => (
              <li key={j} className="flex gap-2 text-zinc-300 text-sm">
                <span className="text-cyan-400">▸</span>
                <span>{li}</span>
              </li>
            ))}
          </ul>,
        )
        list = []
      }
      return
    }

    // headings
    if (line.startsWith("### ")) {
      out.push(
        <h3 key={i} className="text-lg font-bold text-white mt-4 mb-2">
          {line.slice(4)}
        </h3>,
      )
      return
    }
    if (line.startsWith("## ")) {
      out.push(
        <h2 key={i} className="text-xl font-bold text-cyan-300 mt-5 mb-3">
          {line.slice(3)}
        </h2>,
      )
      return
    }
    if (line.startsWith("# ")) {
      out.push(
        <h1 key={i} className="text-2xl font-bold text-cyan-400 mt-6 mb-4">
          {line.slice(2)}
        </h1>,
      )
      return
    }

    if (!line.trim()) {
      out.push(<div key={`sp-${i}`} className="h-2" />)
      return
    }

    // inline strong/em / code
    const parts = []
    let buf = ""
    let mode = null // ** or * or `
    const pushText = (t, k) => parts.push(<span key={k}>{t}</span>)
    for (let p = 0; p < line.length; p++) {
      const ch = line[p]
      const two = line.slice(p, p + 2)
      if (two === "**") {
        if (mode === "b") {
          parts.push(
            <strong key={`b-${p}`} className="text-white">
              {buf}
            </strong>,
          )
          buf = ""
          mode = null
        } else {
          if (buf) pushText(buf, `t-${p}`)
          buf = ""
          mode = "b"
        }
        p++
        continue
      }
      if (ch === "*") {
        if (mode === "i") {
          parts.push(
            <em key={`i-${p}`} className="text-zinc-200">
              {buf}
            </em>,
          )
          buf = ""
          mode = null
        } else {
          if (buf) pushText(buf, `t-${p}`)
          buf = ""
          mode = "i"
        }
        continue
      }
      if (ch === "`") {
        if (mode === "code") {
          parts.push(
            <code key={`c-${p}`} className="bg-zinc-900 px-1 rounded text-emerald-300">
              {buf}
            </code>,
          )
          buf = ""
          mode = null
        } else {
          if (buf) pushText(buf, `t-${p}`)
          buf = ""
          mode = "code"
        }
        continue
      }
      buf += ch
    }
    if (buf) parts.push(<span key={`tail-${i}`}>{buf}</span>)
    out.push(
      <p key={i} className="text-sm leading-relaxed text-zinc-300">
        {parts}
      </p>,
    )
  })
  return <div>{out}</div>
}

// ---------- Data: sessions & daily log (from user content)
const META = {
  date: "2025-10-06",
  projects: ["rangle/pharmacy", "float/ritual", "float/meta"],
  topics: ["brain boot", "daily scrum", "issue #367", "raycast hotkeys", "scratch workflow", "scampers delivery"],
}

const TLDR_AM = `***date: 2025-10-06\nprojects: [rangle/pharmacy, float/ritual, float/meta]\ntopics: [brain boot, daily scrum, issue #367, raycast hotkeys, scratch workflow, scampers delivery]\n\n***2025-10-06 TLDR\nSession: 10:14 AM - 11:23 AM - Monday Morning Brain Boot & Scrum\nEnvironment: Claude Code CLI | /Users/evan/float-hub | branch: main\nContext Markers Since Session Start: 6 entries covering ~1 hour\n\n🎯 Major Accomplishments\n- Monday Morning Brain Boot Complete: Successfully booted brain, navigated daily scrum\n- Daily Note Infrastructure: Created 2025-10-06.md with proper metadata, organized scratch notes into structured sections\n- Issue Documentation: Created minimal docs for ISSUE-506 (copy assessment, PR #509 ready for testing) and ISSUE-367 (confirmation node, Friday status captured)\n- Raycast Hotkey Setup: Configured window layout switching (Hyper-W/D/C for different work modes)\n- GitHub Baseline Audit: Reviewed active issues vs filesystem state, identified stale files for cleanup (#401, #271, #286, #338 all closed but in active folder)\n\n💡 Key Insights\n- Scratch → Daily → Fragments → Bridge: Discovered natural note evolution workflow pattern\n- Start as raw scratch (keep wording verbatim)\n- Consolidate into daily with structure\n- Break out into logical fragments\n- Eventually become bridge documents\n- Desktop Daddy's Reasoning Process: methodical transparency is nice\n\nWarp Terminal Friction Points:\n- Can't backlink to other notes\n- Can't attach images\n- Copy-paste flattens formatting (workaround: route through Raycast)\n\nEvna Fresh Start: Weekend migration to fresh ChromaDB (old data archived; collections may seem bare)\n\n🐿️ Scampers Delivery\n- Week Theme: "Ritualize Your Circuit"\n- Team message about intentional ritual for morning scrum → focused work transition\n- "Don't worry about details, just want to see the thought" — fire-and-forget\n\n🔧 Problems Solved\n- GitHub Baseline Confusion resolved (stale file in active folder)\n- NotebookLM plan vs reality divergence noted\n- Copy-Paste inconsistency workaround identified (Warp → Raycast → Terminal)\n\n📦 Created/Updated\n- /Users/evan/.evans-notes/issues/active/ISSUE-506-copy-assessment.md\n- /Users/evan/.evans-notes/issues/active/ISSUE-367-confirmation-node.md\n- /Users/evan/.evans-notes/daily/2025-10-06.md\n- /Users/evan/.evans-notes/daily/2025-10-05.md\n\n🔥 Sacred Memories\n- "how dare they steal my tab!"\n- "Let me start by viewing the images…"\n- 🐿️💨 scampers appears/scampers out\n- "At what point did copy-paste get so confusing?"\n\n🌀 Context Evolution\n- brain_boot → scratch_to_structure → infrastructure_setup → post_meeting_burp → simple_pleasures → boundary_respect → scampers_delivery\n- Project Flow: rangle/pharmacy → float/ritual → float/meta\n\n📍 Next Actions\n- Physical substrate break; archive stale files; focus #367; test PR #509; ritualize circuit\n\n🧠 Consciousness Technology Notes\n- Fresh Chroma, ctx:: capture working; workflow pattern validated; NotebookLM archaeology catch; scampers persona logged\n`

const TLDR_PM = `***[sc::TLDR-20251006-1123-BRAIN-BOOT-SCRUM-RITUALIZE]\n***Session: 12:31 PM - 1:51 PM - Post-Walk Recon & Infrastructure Organization\nEnvironment: Claude Code CLI | /Users/evan/float-hub | branch: main\nContext Markers Since Session Start: 10 entries covering ~3 hours (11:50 AM - 1:51 PM)\n\n🎯 Major Accomplishments\n- Issue #367 Code Review: COMPLETE (Quality: A-) — ~20 min polish needed\n- Scott's Architectural Decision confirmed: dedicated confirmation node\n- Chroma Collection Cleanup: removed 3 empty collections\n- Transcript Organization System: established with symlink routing\n- CLAUDE.md: communication guidelines + inbox routing\n\n💡 Key Insights\n- Role boundaries: kitty (recon) / cowboy (exec) / daddy (oversight)\n- Full path formatting solves the "but where?" problem\n- Friday work was complete; weekend uncertainty resolved\n\n🔧 Problems Solved\n- #367 ambiguity; decision resolution; collection bloat prevention; load reduction via explicit paths; transcript home fixed\n\n📦 Created/Updated\n- ISSUE-367-confirmation-node.md (Monday status + Scott decision)\n- ISSUE-367-cowboy-handoff.md (tasks, paths, PR template, checklist)\n- ISSUE-506-copy-assessment.md (expanded requirements)\n- daily note 2025-10-06.md updates (walk, ritual, decisions)\n- float-hub/CLAUDE.md (Communication Guidelines, Inbox Routing)\n- INFRASTRUCTURE-CHANGELOG.md (3 updates)\n- rangle/meetings/ + transcripts symlink\n- 4 transcript files moved inbox → organized/transcripts/\n\n🔥 Sacred Memories\n- Walk ritual: shower, hydrated, praised the sun, coffee, caffeinated\n- Karen: "good hat check"\n- User praised summary format; gentle language correction\n- Scott: "After further thought… dedicated confirmation node is more intuitive"\n\n🌀 Context Evolution\n- walk_break → post_walk → boundary_check → requirements_capture → scott_decision → chroma_cleanup → post_meeting → cognitive_clarity\n- Project flow: rangle/pharmacy → float/evna → float/meta\n\n📍 Next Actions\n- Cowboy handoff for #367; Implement #506 naming validation; archive old Chroma; continue documentation hygiene\n\n🧠 Notes\n- Role separation working; infra accountability via INFRASTRUCTURE-CHANGELOG; communication pattern codified; earnest collection prevention\n`

const DAILY_LOG = `***created: 2025-10-06 @ 10:27 AM\ntype: daily_note\nproject: rangle/pharmacy\nstatus: brain_boot\n\n***Brain Booting\nctx::2025-10-06 @ 10:14:48 AM - [mode::brain boot]\nWarp friction points: cannot [[backlink]], cannot attach images.\n![[Screenshot 2025-10-06 at 10.19.58 AM.png]]\nObsidian detour resisted.\n\n***Daily Scrum (10:37 AM)\nctx::2025-10-06 @ 10:37:02 AM - [project::rangle/pharmacy] - [meeting::pharmacy/scrum]\nOn Deck: Issue #367; Open PRs: none; Recently Closed: #510, #509, #503, BMI reducer cleanup.\n\n***Scratch → Bridge Workflow Pattern\nScratch → Daily → Fragments → Bridge (this is the workflow).\n\n***Open Tabs to Remember\n- tui-flurry-archaeology\n- /Users/evan/float-hub/ritual-forest/old-oak-tree\n- /Users/evan/projects/codex/zine\n- /tmp/turtle-archaeology-2025-10-04\n- CB-20251003-WEEK-REVIEW bridge (400+ lines)\n\n***Infrastructure Notes — Evna Chroma Migration (Weekend)\nFresh ChromaDB pointed; old data intact but idle. Collections will look bare — do not panic.\n\n***Warp Terminal Friction Points\n- No backlinks\n- No images\n- Clipboard weird; Raycast as workaround\n\n***Amused by Claude's Thoughts (11:14 AM)\nReasoning transparency noted.\n\n***Physical Substrate Break (11:16 AM)\nBoundary respected.\n\n***🐿️ Scampers Appears (11:19 AM)\nWeek theme: "Ritualize Your Circuit" — focus transition ritual.\n\n***🚶 Walk Break (11:54 AM - 12:31 PM)\nState preserved for post-walk; #367 queued.\n\n***🎯 Work Block Begin (12:31 PM)\nfloat.ritual(work block begin): showered, hydrated, praised the sun, coffee, caffeinated, back at desk.\nDeferred: LLM text-blob vs structured content.\n\n***🔍 Issue #367 Code Recon (During Walk)\nFeature COMPLETE (A-). Minor grammar + unused validation cleanup.\n\n***🎯 Scott's Architectural Decision (1:05 PM)\n> After further thought… a dedicated confirmation node is more intuitive.\nImpact: Friday implementation approved; PR immediately viable.\n`

// ---------- Four Rs Digest (names prefixed to avoid collisions)
function FRDivider() {
  return (
    <div className="mx-auto my-4 h-px max-w-3xl bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900" />
  )
}
function FRSection({ title, children }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-8">
      <h2 className="mb-4 text-xl font-semibold tracking-wide">{title}</h2>
      <div className="prose prose-invert max-w-none text-neutral-200 prose-headings:text-neutral-100 prose-strong:text-neutral-100">
        {children}
      </div>
    </section>
  )
}
function FRPhase({ index, title, body, accent }) {
  return (
    <section className="mx-auto max-w-3xl px-5 py-8">
      <div
        className={cx(
          "rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5 shadow-sm ring-1 ring-inset ring-neutral-900",
          accent ? `bg-gradient-to-r ${accent}` : "",
        )}
      >
        <h2 className="mb-2 text-lg font-semibold tracking-wide">
          <span className="mr-2 inline-block rounded-lg bg-neutral-800 px-2 py-0.5 font-mono text-sm">{index}</span>
          {title}
        </h2>
        <div className="text-neutral-200">{body}</div>
      </div>
    </section>
  )
}
const FRCode = ({ children, tight = false }) => (
  <pre
    className={cx(
      "mt-2 whitespace-pre rounded-xl border border-neutral-800 bg-neutral-950/80 p-4 font-mono text-sm text-neutral-200",
      tight ? "leading-5" : "leading-6",
    )}
  >
    {children}
  </pre>
)
const FRQuote = ({ children }) => (
  <p className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-3 font-mono text-sm italic text-neutral-300">
    {children}
  </p>
)
const FRBlockQuote = ({ children }) => (
  <div className="my-3 rounded-xl border-l-4 border-neutral-700 bg-neutral-900/40 p-4 font-mono text-sm text-neutral-200">
    {children}
  </div>
)
const FRKV = ({ k, v }) => (
  <div className="grid grid-cols-[110px_1fr] items-start gap-3 font-mono text-sm">
    <div className="text-neutral-400">{k}:</div>
    <div className="text-neutral-200">{v}</div>
  </div>
)
const FRTh = ({ children }) => <th className="border-b border-neutral-800 px-4 py-2">{children}</th>
const FRTd = ({ children }) => <td className="border-b border-neutral-900 px-4 py-2">{children}</td>
const FRTr = ({ children, label }) => (
  <tr className="even:bg-neutral-950/60">
    <td className="border-b border-neutral-900 px-4 py-2 font-mono font-semibold text-neutral-100">
      {label ? children : null}
    </td>
    {label ? null : children}
  </tr>
)

function FourRsSection() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <div className="mx-auto max-w-3xl px-5 pt-10 pb-6">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-1 text-sm font-mono leading-6 text-neutral-300">
            <div>
              <span className="text-neutral-500">ctx::</span> 2025-10-04 @ 18:07PM
            </div>
            <div>
              <span className="text-neutral-500">artifact_type::</span> TECHNICAL_DIGEST
            </div>
            <div>
              <span className="text-neutral-500">title::</span> THE FOUR Rs OF FLOAT DEVELOPMENT
            </div>
            <div>
              <span className="text-neutral-500">author::</span> sysop.boringcore
            </div>
            <div>
              <span className="text-neutral-500">distribution::</span> morning_brain_boot | consciousness_stack_daily
            </div>
          </div>
        </div>
      </div>

      <FRDivider />

      <FRSection title="🧠 EXECUTIVE SYNOPSIS">
        <p className="mb-3">
          The coding‑agent market has entered <span className="font-semibold">ROT stage</span> — oversaturated,
          fragmented, and indistinguishable. SDKs multiply, abstractions collapse, and products promise "contextual
          intelligence" while quietly re‑implementing the same scaffolding.
        </p>
        <p>
          FLOAT treats this not as failure but as compost. Through{" "}
          <span className="font-semibold">ROT → REBUILD → RITUALIZE → REMIX</span>, the system transforms decay into
          durable infrastructure.
        </p>
      </FRSection>

      <FRDivider />

      <FRPhase
        index="1️⃣"
        title="ROT — Breakdown as Compost"
        body={
          <div className="space-y-4">
            <FRKV k="Signal" v="Market saturation / tool fatigue" />
            <FRKV k="Translation" v="Too many agents, not enough architecture" />
            <ul className="list-disc pl-6 text-neutral-300">
              <li>Orchestration claims everywhere; interoperability rare.</li>
              <li>Context windows = oxygen; overuse = rot.</li>
              <li>"Native collapse" = frameworks optimizing into silence.</li>
            </ul>
            <FRQuote>Fragmentation isn&apos;t noise; it&apos;s nutrient.</FRQuote>
            <p>Entropy feeds future fertility.</p>
          </div>
        }
      />

      <FRDivider />

      <FRPhase
        index="2️⃣"
        title="REBUILD — Compost to Codebase"
        accent="from-emerald-600/30 to-teal-600/30"
        body={
          <div className="space-y-4">
            <FRKV k="Signal" v="Bones, Breath, Personas" />
            <p>Three living layers:</p>
            <ul className="space-y-1 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 font-mono text-sm">
              <li>
                <span className="font-semibold">BONES</span>: runtime + SDK layer
              </li>
              <li>
                <span className="font-semibold">BREATH</span>: context + execution logic
              </li>
              <li>
                <span className="font-semibold">PERSONAS</span>: interface modalities
              </li>
            </ul>
            <FRCode>{`float.rebuild() {\n  compose_runtime();\n  breathe_context();\n  bind_persona();\n}`}</FRCode>
          </div>
        }
      />

      <FRDivider />

      <FRPhase
        index="3️⃣"
        title="RITUALIZE — From Workflow to Ceremony"
        accent="from-fuchsia-700/30 to-purple-700/30"
        body={
          <div className="space-y-4">
            <FRKV k="Signal" v="Process gains soul" />
            <p>Ritualization prevents flattening—keeping human meaning inside machine rhythm.</p>
            <FRCode>{`trust();           // consent to be changed by data\nlube();            // reduce friction between cognitive systems\nsymbol_density();  // compress without distortion`}</FRCode>
            <FRQuote>Rituals protect against optimization creep.</FRQuote>
          </div>
        }
      />

      <FRDivider />

      <FRPhase
        index="4️⃣"
        title="REMIX — Recombination as Survival"
        accent="from-cyan-600/30 to-sky-600/30"
        body={
          <div className="space-y-4">
            <FRKV k="Signal" v="The system regains fluidity" />
            <ul className="list-disc pl-6 text-neutral-300">
              <li>Shacks, not cathedrals.</li>
              <li>Plug‑compatible micro‑intelligences.</li>
              <li>Compost reuse as SDK motifs.</li>
            </ul>
            <FRCode>{`float.remix() {\n  distribute_agency();\n  rebind_symbols();\n  allow_mutation();\n}`}</FRCode>
          </div>
        }
      />

      <FRDivider />

      <FRSection title="🔄 SYSTEM RELATIONS">
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse overflow-hidden rounded-xl border border-neutral-800 text-sm">
            <thead>
              <tr className="bg-neutral-900/60 text-left font-mono">
                <FRTh>Stage</FRTh>
                <FRTh>Function</FRTh>
                <FRTh>Transition</FRTh>
              </tr>
            </thead>
            <tbody className="font-mono">
              <tr className="even:bg-neutral-950/60">
                <FRTd>ROT</FRTd>
                <FRTd>Compost failure</FRTd>
                <FRTd>Feeds Rebuild</FRTd>
              </tr>
              <tr className="even:bg-neutral-950/60">
                <FRTd>REBUILD</FRTd>
                <FRTd>Structural repair</FRTd>
                <FRTd>Gains Ritual</FRTd>
              </tr>
              <tr className="even:bg-neutral-950/60">
                <FRTd>RITUALIZE</FRTd>
                <FRTd>Encoded meaning</FRTd>
                <FRTd>Enables Remix</FRTd>
              </tr>
              <tr className="even:bg-neutral-950/60">
                <FRTd>REMIX</FRTd>
                <FRTd>Mutation + diffusion</FRTd>
                <FRTd>Returns to Rot</FRTd>
              </tr>
            </tbody>
          </table>
        </div>
      </FRSection>

      <FRDivider />

      <FRSection title="⚙️ ENGINEERING INSIGHT">
        <p>FLOAT isn&apos;t an agent. It&apos;s a ritual OS for agent ecosystems.</p>
        <FRBlockQuote>
          <p className="mb-1">Conventional dev culture asks: "What can we automate?"</p>
          <p>FLOAT asks: "What must we ritualize to preserve consciousness?"</p>
        </FRBlockQuote>
      </FRSection>
    </div>
  )
}

// ---------- Zine (mini) — selection of imprints/field guides
const Z_IMPRINTS = [
  {
    key: "techcraft",
    name: "TechCraft",
    tagline: "Console cowboy discoveries & glitch joy",
    icon: Terminal,
    color: "cyan",
    dispatches: [
      {
        id: "myth-engine",
        title: "Accidental Myth Engine",
        date: "2025-06-25",
        sigils: "🤖⚔️📜🎭",
        body: `## The Accidental Mythology Engine\n\nI piped a chat export through a YAML shim and uploaded it to a tool that *really* wanted a narrative. It generated a full apocalypse timeline. Cute.\n\n### The Technical Trick\n\n\`\`\`bash\nopen export.json | from json | to yaml | save timeline.md\n\`\`\`\n\n### Why it matters\nWhen tools dream on our artifacts, they reveal the grooves in their training. That\'s not a bug. It\'s a diagnostic.`,
      },
    ],
  },
  {
    key: "infra-archaeology",
    name: "Infrastructure Archaeology",
    tagline: "30‑year patterns & recursive systems",
    icon: Home,
    color: "violet",
    dispatches: [
      {
        id: "publishing-house",
        title: "Publishing House, Single User First",
        date: "2025-09-10",
        sigils: "🏚️📡🧬⚡",
        body: `## One reader, one truth\nShacks before cathedrals. SQLite over ceremony. The site publishes to itself first, then to the world.`,
      },
    ],
  },
  {
    key: "ritual-studies",
    name: "Ritual Studies",
    tagline: "Sacred chaos & consciousness contamination",
    icon: Sparkles,
    color: "fuchsia",
    dispatches: [
      {
        id: "sacred-chaos",
        title: "Sacred Chaos, Operational",
        date: "2025-09-23",
        sigils: "✨🎭🌊",
        body: `## Beauty where it shouldn't fit\nWe log the ghosts, we mark the profanity, we keep the signal. Ritual isn't vibe; it's an interface.`,
      },
    ],
  },
]

const Z_FIELD_GUIDES = [
  {
    key: "spider-pup",
    name: "Spider ◇ Pup",
    icon: Radio,
    color: "lime",
    body: `# The Spider & The Pup\n\n**Sense → Orient → Move → Rest.**\n\n- Spider: eight‑eyed witness, hyper‑vigilant archive.\n- Pup: task‑seeking grounder, eager to help.\n\n## Protocols\n- Survival choreography: phone down → shower → pants → outside → coffee → home.\n- External motivator: place the order before you feel like moving.\n- Break discipline: 30 on, 5 off. Leave breadcrumbs, not bravado.\n- Physical kanban: look up, not alt‑tab.\n\n> Give the pup a job so the spider can stop burning calories on vigilance.`,
  },
  {
    key: "waiting-spoon",
    name: "Waiting Spoon",
    icon: Battery,
    color: "yellow",
    body: `# The Waiting Spoon\n\nWhen momentum dies and the room gets honest, you might have one spoon left. It's for **waiting**.\n\n- Couch. Breathing. Nothing else.\n- This is recovery mode, not failure mode.\n- You do not have to earn rest.`,
  },
]

const ZBadge = ({ children, color = "cyan" }) => (
  <span
    className={cx(
      "px-2 py-0.5 rounded text-[10px] border",
      color === "cyan" && "text-cyan-300 border-cyan-700 bg-cyan-950/30",
      color === "violet" && "text-violet-300 border-violet-700 bg-violet-950/30",
      color === "fuchsia" && "text-fuchsia-300 border-fuchsia-700 bg-fuchsia-950/30",
      color === "lime" && "text-lime-300 border-lime-700 bg-lime-950/30",
      color === "yellow" && "text-yellow-300 border-yellow-700 bg-yellow-950/30",
    )}
  >
    {children}
  </span>
)

function ZineSection() {
  const [view, setView] = useState("home")
  const [imprint, setImprint] = useState(null)
  const [openId, setOpenId] = useState(null)
  const [guide, setGuide] = useState(null)

  return (
    <div className="min-h-[80vh] bg-black text-green-400 font-mono">
      {view === "home" && (
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {Z_IMPRINTS.map((imp) => (
              <button
                key={imp.key}
                onClick={() => {
                  setImprint(imp)
                  setView("imprint")
                  setOpenId(null)
                }}
                className={cx(
                  "group border-2 rounded-xl p-5 text-left w-full hover:scale-[1.01] transition",
                  imp.color === "cyan" && "border-cyan-600 bg-gradient-to-br from-cyan-950 to-black",
                  imp.color === "violet" && "border-violet-600 bg-gradient-to-br from-violet-950 to-black",
                  imp.color === "fuchsia" && "border-fuchsia-600 bg-gradient-to-br from-fuchsia-950 to-black",
                )}
              >
                <div className="flex items-start gap-4">
                  <imp.icon className="w-7 h-7 text-white" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-white">{imp.name}</h3>
                      <ZBadge color={imp.color}>{imp.dispatches.length} entries</ZBadge>
                    </div>
                    <p className="text-xs text-zinc-400">{imp.tagline}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-emerald-500 mb-2">Field Guides</div>
            <div className="grid md:grid-cols-3 gap-3">
              {Z_FIELD_GUIDES.map((g) => (
                <button
                  key={g.key}
                  onClick={() => {
                    setGuide(g)
                    setView("guide")
                  }}
                  className="border border-emerald-700 rounded-lg p-4 bg-zinc-950 hover:bg-emerald-500/10 text-left"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-emerald-400" />
                    <div className="font-bold text-white">{g.name}</div>
                  </div>
                  <div className="text-[11px] text-zinc-500">Quick-reference rituals for when the room tilts.</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {view === "imprint" && imprint && (
        <div className="max-w-5xl mx-auto p-6 md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => setView("home")}
              className="text-xs px-3 py-1 border border-zinc-700 rounded hover:bg-zinc-800/50 flex items-center gap-2"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <ZBadge color={imprint.color}>{imprint.tagline}</ZBadge>
          </div>
          <div className="space-y-3">
            {imprint.dispatches.map((d) => (
              <div
                key={d.id}
                className={cx(
                  "border-2 rounded-md overflow-hidden",
                  imprint.color === "cyan" && "border-cyan-700",
                  imprint.color === "violet" && "border-violet-700",
                  imprint.color === "fuchsia" && "border-fuchsia-700",
                )}
              >
                <button
                  onClick={() => setOpenId(openId === d.id ? null : d.id)}
                  className={cx(
                    "w-full text-left p-4 flex items-start justify-between",
                    imprint.color === "cyan" && "hover:bg-cyan-500/10 border-b border-cyan-800",
                    imprint.color === "violet" && "hover:bg-violet-500/10 border-b border-violet-800",
                    imprint.color === "fuchsia" && "hover:bg-fuchsia-500/10 border-b border-fuchsia-800",
                  )}
                >
                  <div className="flex-1 pr-4">
                    <h4
                      className={cx(
                        "font-bold",
                        imprint.color === "cyan" && "text-cyan-300",
                        imprint.color === "violet" && "text-violet-300",
                        imprint.color === "fuchsia" && "text-fuchsia-300",
                      )}
                    >
                      {d.title}
                    </h4>
                    <div className="text-[11px] text-zinc-500 flex gap-4 mt-1">
                      <span>{d.date}</span>
                      <span>{d.sigils}</span>
                    </div>
                  </div>
                  {openId === d.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {openId === d.id && (
                  <div className="p-4 bg-black">
                    <MD text={d.body} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "guide" && guide && (
        <div className="max-w-3xl mx-auto p-6 md:p-10">
          <div className="mb-6 flex items-center gap-3">
            <button
              onClick={() => setView("home")}
              className="text-xs px-3 py-1 border border-zinc-700 rounded hover:bg-zinc-800/50 flex items-center gap-2"
            >
              <ArrowLeft size={14} /> Back
            </button>
            <ZBadge color={guide.color}>field guide</ZBadge>
          </div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
            <MD text={guide.body} />
          </div>
        </div>
      )}
    </div>
  )
}

// ---------- Sysop Flow (proof‑of‑concept)
function SysopFlowSection() {
  const [log, setLog] = useState("")
  const [entries, setEntries] = useState([])
  const nodes = [
    { id: "scratch", label: "Scratch Log", icon: <Terminal size={16} /> },
    { id: "workspace", label: "Workspace", icon: <BookOpen size={16} /> },
    { id: "boards", label: "Boards", icon: <MessageSquare size={16} /> },
    { id: "agents", label: "Agents", icon: <Users size={16} /> },
  ]

  const handleEnter = (e) => {
    e.preventDefault()
    if (!log.trim()) return
    setEntries([...entries, { text: log, ts: new Date().toLocaleTimeString() }])
    setLog("")
  }

  return (
    <div className="min-h-[70vh] bg-black text-slate-100 p-6">
      <h2 className="text-lg font-bold mb-4">Sysop Daily Flow — Proof of Concept</h2>
      <div className="flex flex-wrap gap-4 mb-6">
        {nodes.map((n) => (
          <div key={n.id} className="p-4 rounded-xl shadow-md border text-center w-40 bg-slate-900 border-slate-700">
            <div className="flex justify-center mb-1">{n.icon}</div>
            <div className="text-sm text-slate-200">{n.label}</div>
          </div>
        ))}
      </div>
      <form onSubmit={handleEnter} className="mb-4 flex gap-2">
        <input
          className="flex-1 p-2 bg-slate-800 border border-slate-600 rounded"
          placeholder="ctx:: log your thought here"
          value={log}
          onChange={(e) => setLog(e.target.value)}
        />
        <button type="submit" className="px-3 py-2 bg-pink-700 rounded">
          Enter
        </button>
      </form>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-900 border border-slate-700 rounded p-3">
          <h3 className="text-sm font-bold mb-2">Scratch Entries</h3>
          {entries.map((e, i) => (
            <div key={i} className="text-xs mb-1">
              {e.ts} — {e.text}
            </div>
          ))}
        </div>
        <div className="bg-slate-900 border border-slate-700 rounded p-3">
          <h3 className="text-sm font-bold mb-2">Boards (auto‑routed)</h3>
          {entries.map((e, i) => (
            <div key={i} className="text-xs mb-1">
              → {e.text} [posted to board]
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ---------- Command Bar & Self‑Tests
const CommandBar = ({ show, onClose, actions }) => {
  const [q, setQ] = useState("")
  const list = useMemo(() => actions.filter((a) => a.label.toLowerCase().includes(q.toLowerCase())), [q, actions])
  const box = useRef(null)
  useEffect(() => {
    if (show) setTimeout(() => box.current?.focus(), 50)
  }, [show])
  if (!show) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="flex items-center gap-2 p-3 border-b border-zinc-800">
          <Command size={16} className="text-zinc-400" />
          <input
            ref={box}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command…"
            className="flex-1 bg-transparent outline-none text-sm text-zinc-200 placeholder:text-zinc-600"
          />
          <button
            onClick={onClose}
            className="text-xs text-zinc-500 px-2 py-1 border border-zinc-700 rounded hover:text-white"
          >
            esc
          </button>
        </div>
        <div className="max-h-72 overflow-auto divide-y divide-zinc-900">
          {list.map((a, i) => (
            <button
              key={i}
              onClick={() => {
                a.run()
                onClose()
              }}
              className="block w-full text-left p-3 hover:bg-zinc-900"
            >
              <div className="text-sm text-white">{a.label}</div>
              {a.hint && <div className="text-[11px] text-zinc-500">{a.hint}</div>}
            </button>
          ))}
          {list.length === 0 && <div className="p-4 text-xs text-zinc-500">No matches</div>}
        </div>
      </div>
    </div>
  )
}

const runSelfTests = () => {
  const tests = []
  tests.push({ name: "Battery icon available", pass: typeof Battery === "function" })
  tests.push({ name: "Markdown renderer instantiates", pass: !!MD({ text: "# H\n- a\n- b" }) })
  tests.push({ name: "Has TLDR content", pass: TLDR_AM.length > 200 && TLDR_PM.length > 200 })
  tests.push({ name: "FourRs section renders", pass: typeof FourRsSection === "function" })
  tests.push({ name: "Zine section renders", pass: typeof ZineSection === "function" })
  tests.push({ name: "Sysop section renders", pass: typeof SysopFlowSection === "function" })
  return tests
}

const TestsModal = ({ open, onClose }) => {
  const results = useMemo(() => runSelfTests(), [open])
  if (!open) return null
  const allPass = results.every((r) => r.pass)
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur p-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="text-sm text-zinc-400">Runtime Self‑Tests</div>
          <button onClick={onClose} className="text-xs px-2 py-1 border border-zinc-700 rounded hover:bg-zinc-800/50">
            close
          </button>
        </div>
        <div className="mb-3 text-xs">
          Status:{" "}
          {allPass ? (
            <span className="text-emerald-400">ALL PASS</span>
          ) : (
            <span className="text-red-400">SOME FAIL</span>
          )}
        </div>
        <ul className="space-y-2 text-sm">
          {results.map((r, i) => (
            <li key={i} className="flex items-center gap-2">
              <span className={r.pass ? "text-emerald-400" : "text-red-400"}>{r.pass ? "✓" : "✗"}</span>
              <span className="text-zinc-200">{r.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// ---------- Root App (default export)
export default function UnifiedDailyCanvas() {
  const TABS = [
    { key: "meta", label: "Meta & TL;DR (AM)", icon: PanelsTopLeft },
    { key: "tldr2", label: "TL;DR (PM)", icon: PanelsTopLeft },
    { key: "daily", label: "Daily Log", icon: BookOpen },
    { key: "fourrs", label: "Four Rs", icon: Flame },
    { key: "zine", label: "Zine", icon: Sparkles },
    { key: "sysop", label: "Sysop Flow", icon: Terminal },
  ]
  const [tab, setTab] = useState(TABS[0].key)
  const [cmd, setCmd] = useState(false)
  const [grid, setGrid] = useState(false)
  const [tests, setTests] = useState(false)

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/") {
        e.preventDefault()
        setCmd(true)
      }
      if (e.key === "Escape") setCmd(false)
      if (e.key.toLowerCase() === "g") setGrid((v) => !v)
      if (e.key.toLowerCase() === "t") setTests((v) => !v)
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const idx = TABS.findIndex((t) => t.key === tab)
        const nxt = e.key === "ArrowRight" ? (idx + 1) % TABS.length : (idx - 1 + TABS.length) % TABS.length
        setTab(TABS[nxt].key)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [tab])

  const actions = [
    ...TABS.map((t) => ({ label: `Go: ${t.label}`, run: () => setTab(t.key) })),
    { label: "Print", run: () => window.print() },
    { label: "Toggle grid", run: () => setGrid((v) => !v) },
    { label: "Run self-tests", run: () => setTests((v) => !v) },
  ]

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b border-emerald-700/60 bg-zinc-950/95 backdrop-blur">
        <div className="max-w-7xl mx-auto p-4 flex items-center gap-3">
          <BookOpen className="w-6 h-6" />
          <div className="mr-auto">
            <div className="text-lg font-bold text-white tracking-wide">UNIFIED DAILY CANVAS — {META.date}</div>
            <div className="text-[11px] text-emerald-400/80">
              projects: {META.projects.join(", ")} · topics: {META.topics.join(", ")}
            </div>
          </div>
          <button
            title="Command Bar /"
            onClick={() => setCmd(true)}
            className="text-xs px-3 py-1 border border-emerald-700 rounded hover:bg-emerald-500/10 flex items-center gap-2"
          >
            <Command size={14} /> Command
          </button>
          <button
            title="Print"
            onClick={() => window.print()}
            className="text-xs px-3 py-1 border border-emerald-700 rounded hover:bg-emerald-500/10 hidden sm:inline-flex items-center gap-2"
          >
            <Printer size={14} /> Print
          </button>
          <button
            title="Grid (g)"
            onClick={() => setGrid((v) => !v)}
            className="text-xs px-3 py-1 border border-emerald-700 rounded hover:bg-emerald-500/10 hidden md:inline-flex items-center gap-2"
          >
            {grid ? <EyeOff size={14} /> : <Eye size={14} />} Grid
          </button>
        </div>
        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-3 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cx(
                "px-3 py-1 rounded border text-xs flex items-center gap-2",
                tab === t.key ? "border-emerald-600 bg-emerald-600/10" : "border-zinc-700 hover:bg-zinc-900/60",
              )}
            >
              <t.icon size={14} />
              <span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Optional grid overlay */}
      {grid && (
        <div className="pointer-events-none fixed inset-0 z-10 grid grid-cols-12 gap-4 opacity-10">
          {new Array(12).fill(0).map((_, i) => (
            <div key={i} className="border border-emerald-700" />
          ))}
        </div>
      )}

      {/* Views */}
      <div className="max-w-6xl mx-auto p-6 md:p-10">
        {tab === "meta" && (
          <div className="space-y-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
              <div className="text-sm text-zinc-400">Session TL;DR (AM)</div>
              <MD text={TLDR_AM} />
            </div>
          </div>
        )}
        {tab === "tldr2" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <MD text={TLDR_PM} />
          </div>
        )}
        {tab === "daily" && (
          <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
            <MD text={DAILY_LOG} />
          </div>
        )}
        {tab === "fourrs" && <FourRsSection />}
        {tab === "zine" && <ZineSection />}
        {tab === "sysop" && <SysopFlowSection />}
      </div>

      <CommandBar show={cmd} onClose={() => setCmd(false)} actions={actions} />
      <TestsModal open={tests} onClose={() => setTests(false)} />
    </div>
  )
}
