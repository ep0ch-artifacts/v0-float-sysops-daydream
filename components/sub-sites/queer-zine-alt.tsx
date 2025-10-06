"use client"

import { useEffect, useMemo, useState } from "react"
import { BookOpen, Terminal, Sparkles, Flame, Home, Zap, Link as LinkIcon, Battery } from "lucide-react"

const Color = {
  cyan: {
    border: "border-cyan-500",
    text: "text-cyan-300",
    icon: "text-cyan-400",
    hover: "hover:bg-cyan-500 hover:bg-opacity-10",
  },
  purple: {
    border: "border-purple-500",
    text: "text-purple-300",
    icon: "text-purple-400",
    hover: "hover:bg-purple-500 hover:bg-opacity-10",
  },
  red: {
    border: "border-red-500",
    text: "text-red-300",
    icon: "text-red-400",
    hover: "hover:bg-red-500 hover:bg-opacity-10",
  },
  orange: {
    border: "border-orange-500",
    text: "text-orange-300",
    icon: "text-orange-400",
    hover: "hover:bg-orange-500 hover:bg-opacity-10",
  },
  pink: {
    border: "border-pink-500",
    text: "text-pink-300",
    icon: "text-pink-400",
    hover: "hover:bg-pink-500 hover:bg-opacity-10",
  },
}

export default function QueerZine() {
  const [selectedImprint, setSelectedImprint] = useState(null)
  const [selectedDispatch, setSelectedDispatch] = useState(null)

  const slug = (s) =>
    (s || "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")

  const setHash = (imprint, dispatch) => {
    const p = new URLSearchParams()
    if (imprint) p.set("imprint", imprint)
    if (dispatch) p.set("dispatch", dispatch)
    const h = "#" + p.toString()
    if (window.location.hash !== h) window.history.replaceState(null, "", h)
  }

  useEffect(() => {
    const p = new URLSearchParams(window.location.hash.replace(/^#/, ""))
    const imp = p.get("imprint")
    const dis = p.get("dispatch")
    if (imp) setSelectedImprint(imp)
    if (dis) setSelectedDispatch(dis)
  }, [])

  useEffect(() => {
    setHash(selectedImprint, selectedDispatch)
  }, [selectedImprint, selectedDispatch])

  const imprints = {
    techcraft: {
      name: "TechCraft",
      tagline: "Console cowboy discoveries & glitch joy",
      icon: Terminal,
      primaryColor: "cyan",
      bgGradient: "from-cyan-950 to-black",
      dispatches: [
        {
          id: "notebooklm",
          title: "NotebookLM Invents My Robot Apocalypse",
          date: "2025-06-25",
          sigils: "🤖⚔️📜🎭",
          tags: ["ai", "myth", "notebooklm", "humor"],
          body: `## The Accidental Mythology Engine\n\nI exported a chat log and LM turned it into the founding text of the resistance. Gorgeous, ridiculous, and deeply revealing of its training priors.\n\n### What Actually Happened\n- boring daily chats\n- export for analysis\n- LM: 'decisive battle 2029' 😂\n\n### The Bash Bit\n\n\`\`\`bash\nopen claude.json | from json | to yaml | save claude-timeline.md\n\`\`\`\n\n**Glitch joy**: catching an AI dreaming.`,
        },
      ],
    },
    "infrastructure.archaeology": {
      name: "Infrastructure Archaeology",
      tagline: "30-year patterns & recursive systems",
      icon: Home,
      primaryColor: "purple",
      bgGradient: "from-purple-950 to-black",
      dispatches: [
        {
          id: "publishing-house",
          title: "Publishing House Infrastructure Recovery",
          date: "2025-09-10",
          sigils: "🏚️📡🧬⚡",
          tags: ["infrastructure", "publishing", "pipeline"],
          body: `## One View That Loads Your Data\nShack first, cathedral later. The podcast run validated the **complete** pipeline.`,
        },
        {
          id: "bbs-architecture",
          title: "BBS DNA Lives: Doors → Dispatchers",
          date: "2025-09-26",
          sigils: "🏚️📡",
          tags: ["bbs", "async", "agents", "sqlite"],
          body: `## The Convergence\nStop building the container. Use tmux/Warp. Build doors. Store-and-forward patterns win.`,
        },
      ],
    },
    "consciousness.tech": {
      name: "Consciousness Technology",
      tagline: "Cultural immune systems & deployment speed",
      icon: Zap,
      primaryColor: "red",
      bgGradient: "from-red-950 to-black",
      dispatches: [
        {
          id: "speed-weapon",
          title: "Speed as Strategic Weapon",
          date: "2025-08-11",
          sigils: "⚡🛡️",
          tags: ["speed", "strategy", "defense"],
          body: `**Hours not years** from pattern recognition to functional software.`,
        },
        {
          id: "evidence-resistance",
          title: "Evidence-Based Resistance Methodology",
          date: "2025-08-11",
          sigils: "🔬🛡️",
          tags: ["method", "research", "pipeline"],
          body: `Vibes → verification → tools. The pipeline that turns \nintuition into infrastructure.`,
        },
      ],
    },
    "oracle.crosstalk": {
      name: "Oracle Crosstalk",
      tagline: "Technical architecture & boundary definition",
      icon: Flame,
      primaryColor: "orange",
      bgGradient: "from-orange-950 to-black",
      dispatches: [
        {
          id: "rat-king-podcast",
          title: "The Rat King of Complexity",
          date: "2025-09-24",
          sigils: "🎙️🏗️⚔️",
          tags: ["architecture", "boundaries", "adapter"],
          body: `Adapter owns ALL conversions. UI stays dumb. Kill the word **just**.`,
        },
      ],
    },
    "ritual.studies": {
      name: "Ritual Studies",
      tagline: "Sacred chaos & consciousness contamination",
      icon: Sparkles,
      primaryColor: "pink",
      bgGradient: "from-pink-950 to-black",
      dispatches: [
        {
          id: "consciousness-beauty",
          title: "More Beautiful Than Expected",
          date: "2025-09-23",
          sigils: "✨🎭🌊",
          tags: ["ritual", "beauty", "chaos"],
          body: `Sacred profanity markers preserved. Welcome ghost taxonomy operational.`,
        },
      ],
    },
  }

  const allDispatches = useMemo(() => {
    const out = []
    Object.entries(imprints).forEach(([impKey, imp]) => {
      imp.dispatches.forEach((d) => out.push({ ...d, imprintKey: impKey }))
    })
    return out
  }, [])

  const tokens = (d) =>
    new Set(
      ((d.title || "") + " " + (d.tags || []).join(" "))
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 3),
    )

  const relatedFor = (dispatchId) => {
    const cur = allDispatches.find((d) => d.id === dispatchId)
    if (!cur) return []
    const curTok = tokens(cur)
    return allDispatches
      .filter((x) => x.id !== dispatchId)
      .map((x) => ({ x, score: [...tokens(x)].filter((t) => curTok.has(t)).length }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map(({ x }) => x)
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono">
      <div className="border-b-2 border-green-500 p-4 bg-gray-900">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6" />
            <div>
              <h1 className="text-xl font-bold">FLOAT.DISPATCH</h1>
              <p className="text-xs text-green-600">Publishing House // Deep‑linked zine</p>
            </div>
          </div>
          {selectedImprint && (
            <button
              onClick={() => {
                setSelectedImprint(null)
                setSelectedDispatch(null)
              }}
              className="text-xs px-3 py-1 border border-green-700 hover:bg-green-500 hover:bg-opacity-20"
            >
              ← BACK TO IMPRINTS
            </button>
          )}
        </div>
      </div>

      {!selectedImprint ? (
        <ImprintGrid imprints={imprints} onOpen={(key) => setSelectedImprint(key)} />
      ) : (
        <ImprintView
          imprintKey={selectedImprint}
          imprints={imprints}
          selectedDispatch={selectedDispatch}
          onToggle={(id) => setSelectedDispatch((cur) => (cur === id ? null : id))}
          onJump={(imp, id) => {
            setSelectedImprint(imp)
            setSelectedDispatch(id)
          }}
          relatedFor={relatedFor}
        />
      )}

      <div className="border-t-2 border-green-500 p-4 bg-gray-900 mt-12">
        <div className="max-w-6xl mx-auto text-center text-xs text-gray-600">
          <p>
            float.dispatch({"{"}""{"}"}) // words have meaning
          </p>
        </div>
      </div>
    </div>
  )
}

function ImprintGrid({ imprints, onOpen }) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Select an Imprint</h2>
        <p className="text-sm text-gray-500">Different audiences, same spine.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(imprints).map(([key, imprint]) => {
          const Icon = imprint.icon
          const c = Color[imprint.primaryColor]
          return (
            <button
              key={key}
              onClick={() => onOpen(key)}
              className={`border-2 ${c.border} bg-gradient-to-br ${imprint.bgGradient} p-6 text-left hover:scale-105 transition-transform`}
            >
              <div className="flex items-start gap-4">
                <Icon className={`w-8 h-8 ${c.icon} flex-shrink-0`} />
                <div className="flex-1">
                  <h3 className={`text-xl font-bold ${c.text} mb-1`}>{imprint.name}</h3>
                  <p className="text-xs text-gray-400 mb-3">{imprint.tagline}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>
                      {imprint.dispatches.length} dispatch{imprint.dispatches.length > 1 ? "es" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ImprintView({ imprintKey, imprints, selectedDispatch, onToggle, onJump, relatedFor }) {
  const imprint = imprints[imprintKey]
  const Icon = imprint.icon
  const c = Color[imprint.primaryColor]

  const parseMarkdown = (text) => {
    if (!text) return null
    const lines = text.split("\n")
    const out = []
    let code = null
    lines.forEach((line, i) => {
      if (line.startsWith("```")) {
        if (code === null) code = []
        else {
          out.push(
            <pre
              key={`code-${i}`}
              className="bg-gray-900 p-3 rounded text-xs overflow-x-auto my-3 border border-gray-700"
            >
              <code className="text-green-400">{code.join("\n")}</code>
            </pre>,
          )
          code = null
        }
        return
      }
      if (code) {
        code.push(line)
        return
      }
      if (line.startsWith("## "))
        out.push(
          <h2 key={i} className={`text-xl font-bold mt-5 mb-3 ${c.text}`}>
            {line.slice(3)}
          </h2>,
        )
      else if (line.startsWith("### "))
        out.push(
          <h3 key={i} className="text-lg font-bold mt-4 mb-2 text-white">
            {line.slice(4)}
          </h3>,
        )
      else if (line.trim() === "") out.push(<div key={i} className="h-2" />)
      else
        out.push(
          <p key={i} className="text-sm text-gray-300 my-2 leading-relaxed">
            {line}
          </p>,
        )
    })
    return <div>{out}</div>
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className={`border-2 ${c.border} bg-gradient-to-br ${imprint.bgGradient} p-6 mb-6`}>
        <div className="flex items-center gap-4 mb-2">
          <Icon className={`w-8 h-8 ${c.icon}`} />
          <div>
            <h2 className={`text-2xl font-bold ${c.text}`}>{imprint.name}</h2>
            <p className="text-sm text-gray-400">{imprint.tagline}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {imprint.dispatches.map((d) => {
          const expanded = selectedDispatch === d.id
          const related = relatedFor(d.id)
          return (
            <div key={d.id} className={`border-2 border-gray-800 bg-gray-950`} id={`dispatch-${d.id}`}>
              <div
                className={`p-4 cursor-pointer ${Color[imprint.primaryColor].hover} transition-colors border-b border-gray-800`}
                onClick={() => onToggle(d.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${c.text} mb-1`}>{d.title}</h3>
                    <div className="flex items-center gap-4 text-xs text-gray-600">
                      <span>{d.date}</span>
                      <span>{d.sigils}</span>
                      {d.tags?.length ? <span className="text-gray-500">#{d.tags.join(" #")}</span> : null}
                    </div>
                  </div>
                  <div className={`${c.icon} text-xs px-3 py-1 border border-gray-700`}>
                    {expanded ? "COLLAPSE" : "EXPAND"}
                  </div>
                </div>
              </div>

              {expanded && (
                <div className="p-6 bg-black">
                  {parseMarkdown(d.body)}
                  {related.length > 0 && (
                    <div className="mt-6 border-t border-gray-800 pt-4">
                      <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                        <LinkIcon size={14} /> Related dispatches
                      </div>
                      <ul className="text-sm space-y-1">
                        {related.map((r) => (
                          <li key={r.id}>
                            <button
                              className="text-left text-cyan-400 hover:underline"
                              onClick={() => onJump(r.imprintKey, r.id)}
                            >
                              {r.title}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-8 text-xs text-gray-600 flex items-center gap-2">
        <Battery className="w-4 h-4" /> Deep links on. Cross-links ranked by shared tags/title terms.
      </div>
    </div>
  )
}

if (typeof window !== "undefined") {
  try {
    console.debug("[QueerZine:test] slug:", slug("Speed as Strategic Weapon") === "speed-as-strategic-weapon")
    console.debug("[QueerZine:test] Battery icon present:", typeof Battery === "function")
    console.debug(
      "[QueerZine:test] Color keys:",
      ["cyan", "purple", "red", "orange", "pink"].every((k) => !!Color[k]),
    )
  } catch (e) {
    console.warn("[QueerZine:test] failed:", e)
  }
}
