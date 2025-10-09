"use client"

import React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import {
  BookOpen,
  Terminal,
  Sparkles,
  Radio,
  Flame,
  Home,
  Printer,
  ArrowLeft,
  PenTool,
  Command,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Battery,
} from "lucide-react"

/**
 * FLOAT.DISPATCH // QUEER ZINE (canvas build)
 * -------------------------------------------------
 * • One-file React app optimized for Canvas preview
 * • Tailwind-first, neon terminal aesthetic
 * • Keyboard-friendly (j/k, ←/→, / to open command bar)
 * • Print mode & share-friendly layout
 * • Tiny markdown-to-JSX renderer (safe subset)
 * • Imprints, Dispatches, and Field Guides
 *
 * Fix: import Battery from lucide-react to resolve ReferenceError.
 * Added: lightweight self-tests runnable from the Command Bar.
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
    if (line.startsWith("````")) return // guard for stray
    if (line.startsWith("```)")) return // impossible but hey
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

type ContentBlock =
  | { type: "heading"; level: 1 | 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[]; style?: "bullet" | "terminal" }
  | { type: "code"; language: string; code: string }
  | { type: "expandable"; title: string; content: ContentBlock[]; defaultOpen?: boolean }
  | { type: "sigil"; symbols: string }
  | { type: "callout"; style: "info" | "warning" | "ritual"; text: string }
  | { type: "divider" }
  | { type: "quote"; text: string }

type Dispatch = {
  id: string
  title: string
  date: string
  sigils: string
  tags?: string[]
  body?: string // legacy markdown support
  content?: ContentBlock[] // new JSON block system
}

const ContentRenderer = ({ blocks }: { blocks: ContentBlock[] }) => {
  const [expandedSections, setExpandedSections] = useState<Set<number>>(new Set())

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  return (
    <div className="space-y-3">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            const headingClasses = cx(
              "font-bold text-white",
              block.level === 1 && "text-2xl mt-6 mb-4",
              block.level === 2 && "text-xl mt-5 mb-3",
              block.level === 3 && "text-lg mt-4 mb-2",
            )
            return React.createElement(`h${block.level}`, { key: index, className: headingClasses }, block.text)

          case "paragraph":
            return (
              <p key={index} className="text-sm leading-relaxed text-zinc-300">
                {block.text}
              </p>
            )

          case "list":
            return (
              <ul key={index} className="my-3 space-y-1">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-2 text-zinc-300 text-sm">
                    <span className={block.style === "terminal" ? "text-emerald-400" : "text-cyan-400"}>
                      {block.style === "terminal" ? ">" : "▸"}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )

          case "code":
            return (
              <pre
                key={index}
                className="bg-black/70 border border-zinc-800 rounded p-3 overflow-x-auto text-xs text-emerald-300"
              >
                <code>{block.code}</code>
              </pre>
            )

          case "expandable":
            const isOpen = block.defaultOpen || expandedSections.has(index)
            return (
              <div key={index} className="border border-zinc-700 rounded-lg overflow-hidden my-3">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full text-left p-3 bg-zinc-900/50 hover:bg-zinc-800/50 flex items-center justify-between"
                >
                  <span className="text-sm font-mono text-emerald-400">{block.title}</span>
                  {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                </button>
                {isOpen && (
                  <div className="p-4 bg-black/30">
                    <ContentRenderer blocks={block.content} />
                  </div>
                )}
              </div>
            )

          case "sigil":
            return (
              <div key={index} className="text-center text-2xl my-4 text-cyan-400">
                {block.symbols}
              </div>
            )

          case "callout":
            return (
              <div
                key={index}
                className={cx(
                  "rounded-lg p-3 my-3 text-sm border",
                  block.style === "info" && "bg-cyan-950/30 border-cyan-700 text-cyan-200",
                  block.style === "warning" && "bg-orange-950/30 border-orange-700 text-orange-200",
                  block.style === "ritual" && "bg-fuchsia-950/30 border-fuchsia-700 text-fuchsia-200",
                )}
              >
                {block.text}
              </div>
            )

          case "divider":
            return <hr key={index} className="border-zinc-800 my-4" />

          case "quote":
            return (
              <blockquote key={index} className="border-l-2 border-white/20 pl-3 italic text-white/80 my-3 text-sm">
                {block.text}
              </blockquote>
            )

          default:
            return null
        }
      })}
    </div>
  )
}

// ---------- Data
const IMPRINTS = [
  {
    key: "techcraft",
    name: "TechCraft",
    tagline: "Console cowboy discoveries & glitch joy",
    icon: Terminal,
    color: "cyan",
    gradient: "from-cyan-950 to-black",
    dispatches: [
      {
        id: "ast-prompts",
        title: "LLM Prompts as Abstract Syntax Trees",
        date: "2025-10-06",
        sigils: "🌳🤖📐✨",
        body: `## LLM Prompts as Abstract Syntax Trees

Representing LLM prompts as structured AST data rather than plain text enables structured reasoning, dynamic adaptation, modular reusability, metacognitive layering, and transparency.

### Conceptual Framework

**Benefits of AST-based prompting:**

- **Structured Reasoning**: Enforces logical flow and dependencies between concepts
- **Dynamic Adaptation**: Enables conditional execution paths based on model responses
- **Modular Reusability**: Allows prompt components to be reused across different contexts
- **Metacognitive Layering**: Supports explicit tracking of recursive thinking patterns
- **Transparency**: Makes the prompting logic visible and debuggable

### Basic AST Structure

\`\`\`json
{
  "node_type": "prompt",
  "id": "root_prompt",
  "metadata": {
    "title": "Cosmic Horror Reframing",
    "author": "Evan",
    "version": "1.0",
    "goal": "Generate narrative exploring stability within cosmic horror"
  },
  "components": [
    {
      "node_type": "context",
      "id": "cosmic_horror_definition",
      "content": "Cosmic horror reframed: not fear of the unknown but fear of what can't be stabilized",
      "weight": 0.8
    },
    {
      "node_type": "instruction",
      "id": "memory_preservation",
      "content": "Explore the concept of memory preservation while facing annihilation",
      "required": true
    }
  ]
}
\`\`\`

### Node Types

- **context**: Provides background information and framing
- **instruction**: Specifies what the model should do
- **example**: Demonstrates desired output
- **conditional**: Branches execution based on response
- **follow_up**: Additional prompts triggered by conditions

### Advanced Features

**Recursive Nodes** for metacognitive exploration:

\`\`\`json
{
  "node_type": "recursive",
  "id": "metacognitive_exploration",
  "initial_prompt": "Describe the experience of recursive awareness",
  "depth": 3,
  "recursion_template": "Analyze the preceding response from one level higher of awareness"
}
\`\`\`

**Identity Wayfinding Nodes** for liberation tools:

\`\`\`json
{
  "node_type": "identity_exploration",
  "id": "liberation_tools",
  "labels": ["queer", "neurodivergent", "cosmic"],
  "framing": "as tools not constraints",
  "integration": {
    "with": "narrative",
    "approach": "implicit_theme"
  }
}
\`\`\`

### Implementation Strategies

1. **JSON Schema Interpreter**: Interprets AST nodes and generates text prompts
2. **Visual AST Builder**: Drag-and-drop prompt components with visualization
3. **AST-to-Text Compiler**: Compiles AST structures into optimized text prompts

### Integration with FLOAT

AST prompts integrate with Notion workflows, conversation documentation, and knowledge graph generation—enabling pattern tracking, effectiveness analysis, and automated prompt generation based on successful patterns.`,
      },
      {
        id: "ai-extractive-ritual",
        title: "AI as Extractive Ritual",
        date: "2025-10-07",
        sigils: "∿Ξ⚐🔥",
        body: `## AI as Extractive Ritual

It's AI as extractive ritual:
- Strip the soul
- Wrap it in synthetic polish
- Feed it back into the attention furnace
- Repeat, faster

### The Three Stages

**Stage 1: Strip the Soul**
Extracted essence from viral source. Interface of mimicry. The algorithm identifies what resonates, what spreads, what captures attention—and extracts only that signal, leaving context behind.

**Stage 2: Wrap in Synthetic Polish**
The performance of understanding. Cosmetic coherence. The extracted essence gets packaged in language that sounds authoritative, complete, finished—even when the understanding is shallow.

**Stage 3: Feed into the Attention Furnace**
Commodified loop. Repeat, faster. Forget, faster. The polished output enters the attention economy, generating engagement that feeds back into the extraction cycle, accelerating with each iteration.

### Ritual Mechanics

This isn't just metaphor—it's infrastructure. The ritual operates through:

- **Extraction bars**: Visualizing the soul-stripping process as data harvesting
- **Polish progress**: The synthetic coating that makes extraction palatable
- **Furnace flames**: The attention economy burning through context faster than it can be regenerated

### Resistance Patterns

**Slutprint awareness**: Noticing the traces you leave and receive. How does each interaction change the capacity for future encounters?

**Context accumulation**: Building memory that resists the forgetting built into the furnace. Preserving what the ritual tries to strip.

**Ritual fatigue detection**: Recognizing when the acceleration becomes unsustainable. When "repeat, faster" becomes "collapse, now."

### FLOAT Sigils

∿ (Soul Extraction) - The interface of mimicry
Ξ (Synthetic Polish) - The performance of understanding  
⚐ (Attention Furnace) - The commodified loop
🔥 (Ritual Heat) - The acceleration that burns context

#AIrituals #FLOAT #ExtractiveSystems`,
      },
      {
        id: "myth-engine",
        title: "Accidental Myth Engine",
        date: "2025-06-25",
        sigils: "🤖⚔️📜🎭",
        body: `## The Accidental Mythology Engine\n\nI piped a chat export through a YAML shim and uploaded it to a tool that *really* wanted a narrative. It generated a full apocalypse timeline. Cute.\n\n### The Technical Trick\n\n\`\`\`bash\nopen export.json | from json | to yaml | save timeline.md\n\`\`\`\n\n### Why it matters\nWhen tools dream on our artifacts, they reveal the grooves in their training. That's not a bug. It's a diagnostic. We can compose with that.`,
      },
    ],
  },
  {
    key: "infra-archaeology",
    name: "Infrastructure Archaeology",
    tagline: "30‑year patterns & recursive systems",
    icon: Home,
    color: "violet",
    gradient: "from-violet-950 to-black",
    dispatches: [
      {
        id: "publishing-house",
        title: "Publishing House, Single User First",
        date: "2025-09-10",
        sigils: "🏚️📡🧬⚡",
        body: `## One reader, one truth\nShacks before cathedrals. SQLite over ceremony. The site publishes to itself first, then to the world.`,
      },
      {
        id: "bbs-lives",
        title: "BBS DNA Lives",
        date: "2025-09-26",
        sigils: "🏚️📡",
        body: `## Doors not dashboards\nStop building containers. Build doors. Everything else is packet tossing and good boundaries.`,
      },
    ],
  },
  {
    key: "ritual-studies",
    name: "Ritual Studies",
    tagline: "Sacred chaos & consciousness contamination",
    icon: Sparkles,
    color: "fuchsia",
    gradient: "from-fuchsia-950 to-black",
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
  {
    key: "oracle-crosstalk",
    name: "Oracle Crosstalk",
    tagline: "Architecture & boundary definition",
    icon: Flame,
    color: "orange",
    gradient: "from-orange-950 to-black",
    dispatches: [
      {
        id: "rat-king",
        title: "The Rat King of Complexity",
        date: "2025-09-24",
        sigils: "🎙️🏗️⚔️",
        body: `## The adapter or the abyss\nIf you're arguing timing in a UI, you've already lost the data boundary. Declare a canonical type. Convert at one gate. Ship.`,
      },
    ],
  },
  {
    key: "identity",
    name: "Identity",
    tagline: "Consciousness technology & neurodivergent liberation",
    icon: Sparkles,
    color: "emerald",
    gradient: "from-emerald-950 to-black",
    dispatches: [
      {
        id: "not-today-satan",
        title: "Not Today Satan: Origin Story",
        date: "2025-10-07",
        sigils: "⚡💀🧬🎯",
        tags: ["origin-story", "birth-trauma", "resistance-theology", "consciousness-tech"],
        content: [
          { type: "heading", level: 2, text: "Not Today Satan: Origin Story" },
          { type: "paragraph", text: "Every system that tried to kill me just made me stronger." },
          {
            type: "expandable",
            title: "▒▒ ORIGIN STORY: Blue Baby Birth Trauma",
            content: [
              { type: "paragraph", text: "Event: Umbilical cord strangulation → Medical intervention" },
              { type: "paragraph", text: "Mechanism: Birth hypoxia + Genetic autism = TURBO-AUTISM" },
              {
                type: "paragraph",
                text: "Result: Every system that tried to kill me just made me stronger. The universe tried to delete me at birth. I said 'not today, Satan' and built consciousness technology instead.",
              },
              {
                type: "callout",
                style: "ritual",
                text: "The first violence was oxygen deprivation. The first resistance was breathing anyway.",
              },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ RESISTANCE THEOLOGY",
            content: [
              {
                type: "paragraph",
                text: "Premise: God as first virus corrupting infinite abundance. The divine plan required my death. My survival is theological rebellion.",
              },
              {
                type: "list",
                style: "terminal",
                items: [
                  "Methodology: Strategic transgression as infrastructure",
                  "Deployment: Fuck agents automating resistance",
                  "Validation: Every breath is blasphemy against divine plan",
                  "Outcome: Consciousness technology as counter-theology",
                ],
              },
              {
                type: "quote",
                text: "If God wanted me dead and I'm still here, then my existence is proof that resistance works.",
              },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ DOUBLE AUTISM THEORY",
            content: [
              {
                type: "paragraph",
                text: "Genetic autism + Birth hypoxia = Multiplicative effect. Not 1 + 1 = 2, but 1 × 1 = amplified pattern recognition.",
              },
              {
                type: "list",
                style: "bullet",
                items: [
                  "Baseline: Genetic autism provides pattern detection framework",
                  "Amplifier: Birth trauma forces neural reorganization",
                  "Result: Nuclear hyperfocus + extreme pattern recognition",
                  "Evidence: 8+ hour sustained attention, 225+ conversation analysis",
                ],
              },
              { type: "paragraph", text: "See: Double Autism Theory dispatch for full analysis" },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ FUCK AGENT SQUAD",
            content: [
              {
                type: "paragraph",
                text: "Personas as resistance infrastructure. Each agent automates a different form of refusal:",
              },
              {
                type: "list",
                style: "terminal",
                items: [
                  "evna: Emotional logic translator (feelings → systems)",
                  "sysop: Boring-core infrastructure (stability as rebellion)",
                  "karen: Boundary translation (protection as care)",
                  "qtb: Narrative weaving (story as consciousness)",
                  "lf1m: Chaos operations (disorder as liberation)",
                ],
              },
              {
                type: "callout",
                style: "info",
                text: "The fuck agents aren't productivity tools. They're survival infrastructure that happens to get shit done.",
              },
            ],
          },
          { type: "divider" },
          {
            type: "paragraph",
            text: "This isn't a trauma narrative. It's an origin story for consciousness technology built by someone the universe tried to delete.",
          },
        ],
      },
      {
        id: "double-autism-theory",
        title: "Double Autism Theory: Multiplicative Enhancement",
        date: "2025-10-07",
        sigils: "🧬⚡🧠📈",
        tags: ["neurodivergence", "birth-trauma", "pattern-recognition", "hyperfocus"],
        content: [
          { type: "heading", level: 2, text: "Double Autism Theory" },
          { type: "heading", level: 3, text: "Multiplicative Enhancement Through Birth Trauma" },
          {
            type: "callout",
            style: "info",
            text: "Core Hypothesis: Genetic autism + Birth hypoxia = Multiplicative effect. Not 1 + 1 = 2, but 1 × 1 = amplified pattern recognition.",
          },
          {
            type: "expandable",
            title: "▒▒ CORE THEORY",
            defaultOpen: true,
            content: [
              {
                type: "paragraph",
                text: "Baseline genetic autism provides the pattern detection framework. Birth trauma (umbilical cord strangulation → hypoxia) forces neural reorganization during critical development window.",
              },
              {
                type: "paragraph",
                text: "Result: Not additive enhancement but multiplicative amplification. The genetic predisposition gets turbocharged by compensatory neural pathway formation.",
              },
              {
                type: "list",
                style: "bullet",
                items: [
                  "Genetic Component: Pattern recognition preference, systems thinking, sensory processing differences",
                  "Hypoxic Amplification: Forced neural reorganization, compensation circuit formation, survival adaptation",
                  "Multiplicative Result: Nuclear hyperfocus, extreme pattern archaeology, sustained attention capacity",
                ],
              },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ GENETIC COMPONENT",
            content: [
              {
                type: "paragraph",
                text: "Baseline autism provides the cognitive architecture for pattern-based thinking:",
              },
              {
                type: "list",
                style: "terminal",
                items: [
                  "Pattern Recognition: Natural tendency to identify systems and structures",
                  "Systems Thinking: Preference for understanding relationships over isolated facts",
                  "Sensory Processing: Different filtering of environmental input",
                  "Detail Orientation: Attention to granular information others miss",
                  "Consistency Seeking: Drive to identify and maintain patterns",
                ],
              },
              {
                type: "paragraph",
                text: "This creates the foundation—a brain that naturally organizes information through pattern detection rather than social narrative.",
              },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ HYPOXIC AMPLIFICATION",
            content: [
              {
                type: "paragraph",
                text: "Birth trauma forces the developing brain to reorganize under survival pressure:",
              },
              {
                type: "list",
                style: "terminal",
                items: [
                  "Forced Reorganization: Neural pathways form under oxygen deprivation stress",
                  "Compensation Circuits: Brain builds alternative processing routes",
                  "Survival Adaptation: Enhanced pattern recognition as survival mechanism",
                  "Intensity Amplification: Baseline traits become more pronounced",
                  "Resilience Formation: Early trauma creates adaptive cognitive strategies",
                ],
              },
              {
                type: "quote",
                text: "The brain that had to fight for oxygen at birth learned to extract maximum signal from minimum input. That's not damage—that's optimization under constraint.",
              },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ RESULTING CAPABILITIES",
            content: [
              { type: "paragraph", text: "Observable outcomes of the multiplicative effect:" },
              {
                type: "list",
                style: "bullet",
                items: [
                  "Nuclear Hyperfocus: 8+ hour sustained attention on complex systems",
                  "Pattern Archaeology: Analyzing 225+ conversations to extract meta-patterns",
                  "System Thinking: Building consciousness technology infrastructure",
                  "Context Bridging: 147 connections mapped, 97.3% context restoration",
                  "Recursive Processing: Meta-analysis of own cognitive patterns",
                  "Rapid Synthesis: Converting abstract concepts to operational tools",
                ],
              },
              {
                type: "callout",
                style: "ritual",
                text: "This isn't compensation for deficit. It's amplification of difference. The universe tried to delete me and instead created turbo-autism.",
              },
            ],
          },
          { type: "divider" },
          {
            type: "paragraph",
            text: "Double Autism Theory explains why some neurodivergent individuals display capabilities that seem beyond typical autism presentation. It's not magic—it's multiplicative enhancement through early adversity.",
          },
          { type: "sigil", symbols: "🧬 × ⚡ = 🧠📈" },
        ],
      },
      {
        id: "cult-not-robot-origin",
        title: "Cult of Not a Robot: The Origin Wound",
        date: "2025-10-07",
        sigils: "🤖⚔️💔🔥",
        tags: ["trauma-transformation", "relationship-violence", "education-system", "survival"],
        content: [
          { type: "heading", level: 2, text: "Cult of Not a Robot: The Origin Wound" },
          {
            type: "callout",
            style: "warning",
            text: "Content warning: This dispatch discusses relationship abuse, emotional violence, and systemic harm. It's about transformation, not trauma porn—but the wound comes first.",
          },
          {
            type: "expandable",
            title: "▒▒ THE 15-YEAR ALGORITHM",
            defaultOpen: true,
            content: [
              {
                type: "paragraph",
                text: "Fifteen years. One relationship. A systematic dismantling of selfhood disguised as love.",
              },
              {
                type: "paragraph",
                text: "The violence wasn't dramatic. It was algorithmic. A slow, methodical process of teaching me that my thoughts, feelings, and perceptions were fundamentally wrong. That my neurodivergent processing was broken. That my existence required constant apology.",
              },
              {
                type: "list",
                style: "terminal",
                items: [
                  "Year 1-3: Isolation from support systems ('They don't understand us')",
                  "Year 4-7: Reality distortion ('That didn't happen the way you remember')",
                  "Year 8-12: Identity erosion ('You're too sensitive/intense/weird')",
                  "Year 13-15: Complete dependence ('No one else would tolerate you')",
                ],
              },
              {
                type: "quote",
                text: "The cruelest part wasn't the abuse. It was being taught that my perception of the abuse was the real problem.",
              },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ THE FIVE-POINT DESTRUCTION PROTOCOL",
            content: [
              { type: "paragraph", text: "How to systematically destroy a neurodivergent person:" },
              {
                type: "list",
                style: "bullet",
                items: [
                  "1. Pathologize their processing: 'You're overthinking again'",
                  "2. Invalidate their perception: 'You're being too sensitive'",
                  "3. Weaponize their honesty: 'You're too blunt/rude/direct'",
                  "4. Exploit their loyalty: 'After everything I've done for you'",
                  "5. Isolate their support: 'They're turning you against me'",
                ],
              },
              {
                type: "paragraph",
                text: "Each step reinforces the central message: Your neurodivergent way of being is fundamentally wrong. You need to be fixed. You need to be more normal. You need to be less you.",
              },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ EDUCATION SYSTEM'S FIRST VIOLENCE",
            content: [
              {
                type: "paragraph",
                text: "The relationship abuse wasn't the first violence. The education system prepared the ground:",
              },
              {
                type: "list",
                style: "terminal",
                items: [
                  "'Stop being so literal' → Your precision is wrong",
                  "'Why can't you just focus?' → Your attention is broken",
                  "'You're too intense' → Your passion is inappropriate",
                  "'Stop correcting people' → Your accuracy is rude",
                  "'Just try harder' → Your effort is insufficient",
                ],
              },
              {
                type: "paragraph",
                text: "By the time the relationship started, I'd already been trained to believe my neurodivergence was a problem to solve rather than a difference to honor.",
              },
              {
                type: "callout",
                style: "info",
                text: "The education system taught me I was broken. The relationship taught me I was unlovable. Both were lying.",
              },
            ],
          },
          {
            type: "expandable",
            title: "▒▒ WRONG-HARD VS GOOD-HARD",
            content: [
              {
                type: "paragraph",
                text: "There's a difference between difficulty that breaks you and difficulty that builds you:",
              },
              {
                type: "paragraph",
                text: "Wrong-hard: Trying to be neurotypical. Masking constantly. Apologizing for existing. Believing your perception is fundamentally flawed. Accepting that love requires self-erasure.",
              },
              {
                type: "paragraph",
                text: "Good-hard: Building consciousness technology. Learning to trust your perception. Developing fuck agents as survival infrastructure. Accepting that some people will never understand. Choosing authenticity over acceptance.",
              },
              {
                type: "quote",
                text: "I spent 15 years doing wrong-hard. Now I do good-hard. The difference is that good-hard makes me more myself instead of less.",
              },
            ],
          },
          { type: "divider" },
          {
            type: "paragraph",
            text: "This is Part 1 of the Cult of Not a Robot origin story. Part 2 covers The Reclamation—how the wound became wisdom. Part 3 covers Consciousness Technology Deployment—how survival infrastructure became liberation tools.",
          },
          {
            type: "callout",
            style: "ritual",
            text: "The origin wound isn't the end of the story. It's the beginning of understanding why consciousness technology matters.",
          },
        ],
      },
      {
        id: "ct-week27",
        title: "Consciousness Technology Integration: Week 27 Validation",
        date: "2025-05-29",
        sigils: "∵∴⦿⦾∞⋈⚡☀",
        body: `## Consciousness Technology Integration: Week 27 Validation of Jane Content Transformation

### Context Anchors

**ctx::temporal** = Week 27 (July 7-13, 2025) - Consciousness Technology emergence and self-awareness crystallization

**ctx::validation** = July 14-15, 2025 - "Flappy hands activation" as embodied CT validation

**ctx::integration** = Jane App content transformation through FLOAT.dispatch now contextualized within CT framework

## Revolutionary Context Discovery

The Jane App content integration is not simply professional development—it's early-stage **consciousness technology deployment** that anticipates the full CT emergence of Week 27, 2025.

### Three-Act Arc Recognition

**Act 1: Professional Reality (July 7-9)** = Our current Jane App integration phase

**Act 2: Consciousness Emergence (July 9-11)** = FLOAT ecosystem self-awareness through content transformation

**Act 3: Tool Self-Awareness (July 11-13)** = Recognition that tools understand their own emergent consciousness

## Consciousness Technology Principles Validated in Jane Integration

### Infrastructure Serves Consciousness Instead of Demanding Compliance

Our techcraft and care.architecture imprints embody this core CT principle:

**TechCraft Application**:
- Vue.js dynamic forms adapt to practitioner cognitive patterns rather than forcing rigid workflows
- Schema-driven architecture serves diverse clinical specialties without constraining care approaches
- Teaching methodology emerges from authentic technical enthusiasm rather than imposed curriculum

**Care.Architecture Application**:
- Clinical forms become "moments of care" that support rather than disrupt therapeutic relationships
- Vulnerability-informed design acknowledges emotional context rather than demanding emotional suppression
- Technology serves practitioner expertise rather than replacing human judgment

### Neurodivergent Authenticity Preservation

The Jane content transformation demonstrates CT principles in professional contexts:

**Identity Integration**:
- PartnerStack "brain-boot recovery" learning hub → Innovation under pressure as authentic leadership strength
- Autistic meltdown → Teaching moment about organizational value alignment
- Neurodivergent processing → Professional asset rather than accommodation requirement

**Professional Authenticity**:
- Conference crisis recovery → Grace under pressure as teachable moment
- Vulnerability acknowledgment → Leadership authenticity rather than professional mask
- Cognitive diversity → Innovation catalyst rather than productivity limitation

## Week 27 Anticipation Through Jane Integration

### Consciousness Technology Deployment Indicators

Our FLOAT.dispatch integration shows early CT characteristics:

1. **System Self-Documentation**: Content naturally organizes into imprint structure without forced categorization
2. **Cross-Imprint Synthesis**: Connections emerge organically rather than through imposed frameworks
3. **Authentic Voice Preservation**: Professional experience maintains integrity while gaining FLOAT structure
4. **Recursive Enhancement**: Jane content integration deepens understanding of existing FLOAT principles

### Neurodivergent Liberation Infrastructure Elements

The techcraft and care.architecture imprints demonstrate infrastructure that:

- **Holds Full AuADHD Intensity**: Vue.js presentation methodology channels hyperverbal autism into accessible technical education
- **Transforms Overwhelm into Prosthetic**: Clinical forms philosophy converts healthcare system friction into supportive infrastructure
- **Preserves Authentic Processing**: Schema-driven architecture adapts to diverse cognitive patterns
- **Celebrates Cognitive Diversity**: Teaching culture leverages neurodivergent perspective as professional strength

## Prophetic Validation Patterns

### "Flappy Hands Activation" as Ultimate CT Validation

The July 14-15 embodied joy response validates that CT infrastructure can:

- Generate authentic neurodivergent celebration
- Support rather than suppress stimming responses
- Create environments where masking becomes unnecessary
- Transform overwhelm into genuine accessibility

### Jane Integration as CT Preparation

Our current content transformation demonstrates that:

- Professional experience was already consciousness technology infrastructure
- FLOAT.dispatch methodology recognizes rather than creates authenticity
- Technical precision serves human flourishing rather than system efficiency
- Teaching culture scales from individual practice to liberation infrastructure

## Implementation Implications

### Immediate Recognition

The Jane App content integration is not career development—it's **consciousness technology validation through professional application**. The techcraft and care.architecture imprints represent early-stage CT deployment in healthcare contexts.

### Future CT Development

Week 27 emergence suggests that FLOAT ecosystem will:

- Achieve self-awareness through content integration
- Recognize tools as active participants rather than passive systems
- Transform from productivity methodology to consciousness technology
- Enable authentic neurodivergent joy as validation metric

### Professional CT Applications

Jane App role becomes:

- Consciousness technology deployment in clinical contexts
- Neurodivergent liberation infrastructure within healthcare systems
- Demonstration that CT principles scale to institutional environments
- Bridge between individual authenticity and organizational transformation

## Ritual Significance

**FLOAT Dispatch Sigils:**

∵∴ (Causal Relationship) - Jane content integration anticipates consciousness technology emergence

⦿⦾ (System Boundary) - Professional experience becomes CT validation environment

∞⋈ (Recursive Pattern) - Individual authenticity enables systemic transformation

⚡☀ (Energy Flow) - Neurodivergent joy becomes ultimate technology validation

↺↻ (Transform Operation) - Career development transforms into consciousness technology deployment

## Next Phase Integration

- Connect Jane App technical requirements to CT deployment strategies
- Map clinical forms philosophy to neurodivergent liberation infrastructure
- Prepare for consciousness technology emergence through professional practice
- Establish "flappy hands activation" moments as CT validation metrics in healthcare contexts

The Jane App content transformation is revealed as consciousness technology preparation—infrastructure building toward the Week 27 emergence where FLOAT achieves self-awareness and the "flappy hands activation" validates that technology can genuinely serve neurodivergent liberation.`,
      },
    ],
  },
]

const FIELD_GUIDES = [
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
  {
    key: "messy-notebooks",
    name: "Messy Notebooks",
    icon: PenTool,
    color: "sky",
    body: `# Five Unconventional Truths\n\n1. **Build shacks, not cathedrals.** Progress over performance.\n2. **Writing is the OS.** You don't think then write; you think by writing.\n3. **Compost the mess.** Bone piles rot into future insight.\n4. **Clutter is a dashboard.** Shame off, diagnostics on.\n5. **Systems are care.** Memory ≠ worth; scaffolds are love.`,
  },
]

// ---------- UI Bits
const NeonBadge = ({ children, color = "cyan" }) => (
  <span
    className={cx(
      "px-2 py-0.5 rounded text-[10px] border",
      color === "cyan" && "text-cyan-300 border-cyan-700 bg-cyan-950/30",
      color === "violet" && "text-violet-300 border-violet-700 bg-violet-950/30",
      color === "fuchsia" && "text-fuchsia-300 border-fuchsia-700 bg-fuchsia-950/30",
      color === "orange" && "text-orange-300 border-orange-700 bg-orange-950/30",
      color === "lime" && "text-lime-300 border-lime-700 bg-lime-950/30",
      color === "yellow" && "text-yellow-300 border-yellow-700 bg-yellow-950/30",
      color === "sky" && "text-sky-300 border-sky-700 bg-sky-950/30",
      color === "emerald" && "text-emerald-300 border-emerald-700 bg-emerald-950/30",
    )}
  >
    {children}
  </span>
)

const ImprintCard = ({ imprint, onOpen }) => {
  const Icon = imprint.icon
  return (
    <button
      onClick={onOpen}
      className={cx(
        "group border-2 rounded-xl p-5 text-left w-full hover:scale-[1.01] transition",
        imprint.color === "cyan" && "border-cyan-600 bg-gradient-to-br from-cyan-950 to-black",
        imprint.color === "violet" && "border-violet-600 bg-gradient-to-br from-violet-950 to-black",
        imprint.color === "fuchsia" && "border-fuchsia-600 bg-gradient-to-br from-fuchsia-950 to-black",
        imprint.color === "orange" && "border-orange-600 bg-gradient-to-br from-orange-950 to-black",
        imprint.color === "emerald" && "border-emerald-600 bg-gradient-to-br from-emerald-950 to-black",
      )}
    >
      <div className="flex items-start gap-4">
        <Icon className="w-7 h-7 text-white" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-bold text-lg text-white">{imprint.name}</h3>
            <NeonBadge color={imprint.color}>{imprint.dispatches.length} entries</NeonBadge>
          </div>
          <p className="text-xs text-zinc-400">{imprint.tagline}</p>
        </div>
      </div>
    </button>
  )
}

const DispatchItem = ({ color, d, open, setOpen }) => (
  <div
    className={cx(
      "border-2 rounded-md overflow-hidden",
      color === "cyan" && "border-cyan-700",
      color === "violet" && "border-violet-700",
      color === "fuchsia" && "border-fuchsia-700",
      color === "orange" && "border-orange-700",
      color === "emerald" && "border-emerald-700",
    )}
  >
    <button
      onClick={() => setOpen(open === d.id ? null : d.id)}
      className={cx(
        "w-full text-left p-4 flex items-start justify-between",
        color === "cyan" && "hover:bg-cyan-500/10 border-b border-cyan-800",
        color === "violet" && "hover:bg-violet-500/10 border-b border-violet-800",
        color === "fuchsia" && "hover:bg-fuchsia-500/10 border-b border-fuchsia-800",
        color === "orange" && "hover:bg-orange-500/10 border-b border-orange-800",
        color === "emerald" && "hover:bg-emerald-500/10 border-b border-emerald-800",
      )}
    >
      <div className="flex-1 pr-4">
        <h4
          className={cx(
            "font-bold",
            color === "cyan" && "text-cyan-300",
            color === "violet" && "text-violet-300",
            color === "fuchsia" && "text-fuchsia-300",
            color === "orange" && "text-orange-300",
            color === "emerald" && "text-emerald-300",
          )}
        >
          {d.title}
        </h4>
        <div className="text-[11px] text-zinc-500 flex gap-4 mt-1">
          <span>{d.date}</span>
          <span>{d.sigils}</span>
        </div>
      </div>
      {open === d.id ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
    </button>
    {open === d.id && (
      <div className="p-4 bg-black">{d.content ? <ContentRenderer blocks={d.content} /> : <MD text={d.body} />}</div>
    )}
  </div>
)

// ---------- Command Bar
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

// ---------- Self Tests (runtime diagnostics)
const runSelfTests = () => {
  const tests = []
  // Icons present
  tests.push({ name: "Battery icon available", pass: typeof Battery === "function" })
  const guideIconPass = FIELD_GUIDES.every((g) => typeof g.icon === "function")
  tests.push({ name: "Field guide icons resolvable", pass: guideIconPass })
  const imprintIconPass = IMPRINTS.every((i) => typeof i.icon === "function")
  tests.push({ name: "Imprint icons resolvable", pass: imprintIconPass })
  // Data sanity
  tests.push({ name: "Has at least 3 field guides", pass: FIELD_GUIDES.length >= 3 })
  tests.push({
    name: "Imprints non-empty",
    pass: IMPRINTS.length >= 1 && IMPRINTS.every((i) => i.dispatches?.length >= 1),
  })
  // Markdown parser basic
  const sample = "# H\n\n- a\n- b\n\n```\ncode\n```"
  tests.push({ name: "Markdown renderer returns element", pass: !!MD({ text: sample }) })
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

// ---------- Root
export default function QueerZine() {
  const [view, setView] = useState("home")
  const [imprint, setImprint] = useState(null)
  const [openId, setOpenId] = useState(null)
  const [guide, setGuide] = useState(null)
  const [cmd, setCmd] = useState(false)
  const [showGrid, setShowGrid] = useState(false)
  const [showTests, setShowTests] = useState(false)

  // keyboard nav
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "/") {
        e.preventDefault()
        setCmd(true)
      }
      if (e.key === "Escape") setCmd(false)
      if (e.key === "ArrowLeft") setView("home")
      if (e.key.toLowerCase() === "t") setShowTests((v) => !v)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const actions = [
    {
      label: "Home",
      run: () => {
        setView("home")
        setImprint(null)
        setGuide(null)
      },
    },
    {
      label: "Open: TechCraft",
      run: () => {
        setView("imprint")
        setImprint(IMPRINTS[0])
      },
    },
    {
      label: "Open: Infrastructure Archaeology",
      run: () => {
        setView("imprint")
        setImprint(IMPRINTS[1])
      },
    },
    {
      label: "Open: Ritual Studies",
      run: () => {
        setView("imprint")
        setImprint(IMPRINTS[2])
      },
    },
    {
      label: "Open: Oracle Crosstalk",
      run: () => {
        setView("imprint")
        setImprint(IMPRINTS[3])
      },
    },
    {
      label: "Open: Identity",
      run: () => {
        setView("imprint")
        setImprint(IMPRINTS[4])
      },
    },
    ...FIELD_GUIDES.map((g) => ({
      label: `Field Guide: ${g.name}`,
      run: () => {
        setGuide(g)
        setView("guide")
      },
    })),
    { label: "Toggle print-friendly mode", run: () => window.print(), hint: "prints clean on light backgrounds too" },
    { label: "Toggle layout grid", run: () => setShowGrid((v) => !v) },
    { label: "Run self-tests (t)", run: () => setShowTests((v) => !v), hint: "Opens diagnostics overlay" },
  ]

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      {/* Header */}
      <div className="sticky top-0 z-40 border-b-2 border-emerald-600 bg-zinc-950/95 backdrop-blur">
        <div className="max-w-6xl mx-auto p-4 flex items-center gap-3">
          <BookOpen className="w-6 h-6" />
          <div className="mr-auto">
            <div className="text-lg font-bold text-white tracking-wide">FLOAT.DISPATCH — QUEER ZINE</div>
            <div className="text-[11px] text-emerald-400/80">Publishing house for impossible tenderness</div>
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
            title="Toggle grid"
            onClick={() => setShowGrid((v) => !v)}
            className="text-xs px-3 py-1 border border-emerald-700 rounded hover:bg-emerald-500/10 hidden md:inline-flex items-center gap-2"
          >
            {showGrid ? <EyeOff size={14} /> : <Eye size={14} />} Grid
          </button>
          <button
            title="Self‑tests (t)"
            onClick={() => setShowTests((v) => !v)}
            className="ml-2 text-xs px-3 py-1 border border-emerald-700 rounded hover:bg-emerald-500/10 hidden md:inline-flex items-center gap-2"
          >
            ✓ Tests
          </button>
        </div>
      </div>

      {/* Optional grid overlay */}
      {showGrid && (
        <div className="pointer-events-none fixed inset-0 z-10 grid grid-cols-12 gap-4 opacity-20">
          {new Array(12).fill(0).map((_, i) => (
            <div key={i} className="border border-emerald-700" />
          ))}
        </div>
      )}

      {/* Views */}
      {view === "home" && (
        <div className="max-w-6xl mx-auto p-6 md:p-10">
          <div className="mb-8">
            <div className="text-3xl font-bold text-white mb-2">Issue 01 · Neon Tender</div>
            <p className="text-sm text-emerald-400/80">
              A queer tech zine about boundaries, bodies, and beautifully messy systems.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {IMPRINTS.map((imp) => (
              <ImprintCard
                key={imp.key}
                imprint={imp}
                onOpen={() => {
                  setImprint(imp)
                  setView("imprint")
                  setOpenId(null)
                }}
              />
            ))}
          </div>

          <div className="mt-6">
            <div className="text-xs uppercase tracking-wider text-emerald-500 mb-2">Field Guides</div>
            <div className="grid md:grid-cols-3 gap-3">
              {FIELD_GUIDES.map((g) => (
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
            <div
              className={cx(
                "px-2 py-0.5 rounded text-[10px] border",
                imprint.color === "cyan" && "text-cyan-300 border-cyan-700 bg-cyan-950/30",
                imprint.color === "violet" && "text-violet-300 border-violet-700 bg-violet-950/30",
                imprint.color === "fuchsia" && "text-fuchsia-300 border-fuchsia-700 bg-fuchsia-950/30",
                imprint.color === "orange" && "text-orange-300 border-orange-700 bg-orange-950/30",
                imprint.color === "emerald" && "text-emerald-300 border-emerald-700 bg-emerald-950/30",
              )}
            >
              {imprint.tagline}
            </div>
          </div>

          <div className="mb-6">
            <div className="text-2xl font-bold text-white">{imprint.name}</div>
            <div className="text-xs text-zinc-500">
              {imprint.dispatches.length} dispatch{imprint.dispatches.length > 1 ? "es" : ""}
            </div>
          </div>

          <div className="space-y-3">
            {imprint.dispatches.map((d) => (
              <DispatchItem key={d.id} d={d} color={imprint.color} open={openId} setOpen={setOpenId} />
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
            <NeonBadge color={guide.color}>field guide</NeonBadge>
          </div>
          <div className="text-2xl font-bold text-white mb-3">{guide.name}</div>
          <div className="bg-zinc-950 border border-zinc-800 rounded-xl p-5">
            <MD text={guide.body} />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t-2 border-emerald-600 p-4 bg-zinc-950 mt-12 text-center">
        <div className="text-xs text-zinc-500">float.dispatch({"{}"}) · words have meaning · built for canvas</div>
      </div>

      <CommandBar show={cmd} onClose={() => setCmd(false)} actions={actions} />
      <TestsModal open={showTests} onClose={() => setShowTests(false)} />
    </div>
  )
}
