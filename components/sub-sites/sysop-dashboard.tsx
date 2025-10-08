"use client"

import { useState } from "react"
import { Terminal, GitPullRequest, Bug, CheckCircle2, Clock, LinkIcon, Tag } from "lucide-react"
import conversationData from "@/data/conversation-ast-2025-10-06.json"

type ConversationAST = typeof conversationData

const NODE_TYPE_ICONS = {
  request: Terminal,
  "data.drop": LinkIcon,
  synthesis: CheckCircle2,
  spec: Terminal,
  qna: Terminal,
  debug: Bug,
  ops: CheckCircle2,
}

const NODE_TYPE_COLORS = {
  request: "text-cyan-400",
  "data.drop": "text-emerald-400",
  synthesis: "text-purple-400",
  spec: "text-fuchsia-400",
  qna: "text-yellow-400",
  debug: "text-red-400",
  ops: "text-green-400",
}

export function SysopDashboard() {
  const [activePanel, setActivePanel] = useState<string>("digest")
  const data = conversationData as ConversationAST

  const panels = data.render_hints.panels

  const getNodesByPanel = (panelId: string) => {
    const panel = panels.find((p) => p.id === panelId)
    if (!panel) return []
    return data.nodes.filter((node) => panel.source_nodes.includes(node.id))
  }

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-6">
      {/* Header */}
      <div className="border-2 border-green-400 p-4 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Terminal className="h-6 w-6" />
          <h1 className="text-2xl font-bold">{data.meta.title}</h1>
        </div>
        <div className="text-sm text-green-300 space-y-1">
          <div>Generated: {data.meta.generated_at}</div>
          <div>Participants: {data.meta.participants.join(", ")}</div>
          <div>Lenses: {data.meta.lenses.join(" • ")}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b-2 border-green-400 pb-2">
        {panels.map((panel) => (
          <button
            key={panel.id}
            onClick={() => setActivePanel(panel.id)}
            className={`px-4 py-2 border-2 transition-all ${
              activePanel === panel.id
                ? "border-green-400 bg-green-400 text-black"
                : "border-green-400 text-green-400 hover:bg-green-400/10"
            }`}
          >
            [{panel.title.toUpperCase()}]
          </button>
        ))}
        <button
          onClick={() => setActivePanel("timeline")}
          className={`px-4 py-2 border-2 transition-all ${
            activePanel === "timeline"
              ? "border-green-400 bg-green-400 text-black"
              : "border-green-400 text-green-400 hover:bg-green-400/10"
          }`}
        >
          [TIMELINE]
        </button>
        <button
          onClick={() => setActivePanel("receipts")}
          className={`px-4 py-2 border-2 transition-all ${
            activePanel === "receipts"
              ? "border-green-400 bg-green-400 text-black"
              : "border-green-400 text-green-400 hover:bg-green-400/10"
          }`}
        >
          [RECEIPTS]
        </button>
      </div>

      {/* Panel Content */}
      <div className="border-2 border-green-400 p-6">
        {activePanel === "timeline" && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              TIMELINE
            </h2>
            {data.timeline.map((event, idx) => (
              <div key={idx} className="border-l-2 border-green-400 pl-4 pb-4">
                <div className="text-green-300 text-sm mb-1">[{event.at}]</div>
                <div className="text-green-400">{event.label}</div>
                {event.refs && <div className="text-green-300 text-xs mt-1">refs: {event.refs.join(", ")}</div>}
              </div>
            ))}
          </div>
        )}

        {activePanel === "receipts" && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              RECEIPTS
            </h2>

            <div>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <GitPullRequest className="h-4 w-4" />
                GitHub
              </h3>
              <div className="space-y-2">
                {data.receipts.github.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-cyan-400 hover:text-cyan-300 underline text-sm"
                  >
                    {url}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <Terminal className="h-4 w-4" />
                Deployments
              </h3>
              <div className="space-y-2">
                {data.receipts.deployments.map((url, idx) => (
                  <a
                    key={idx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-emerald-400 hover:text-emerald-300 underline text-sm"
                  >
                    {url}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-2">Slack</h3>
              <div className="space-y-2">
                {data.receipts.slack.map((msg, idx) => (
                  <div key={idx} className="text-sm text-green-300">
                    {msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {panels.map((panel) => {
          if (activePanel !== panel.id) return null
          const nodes = getNodesByPanel(panel.id)

          return (
            <div key={panel.id} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">{panel.title.toUpperCase()}</h2>
              {nodes.map((node) => {
                const Icon = NODE_TYPE_ICONS[node.type as keyof typeof NODE_TYPE_ICONS] || Terminal
                const colorClass = NODE_TYPE_COLORS[node.type as keyof typeof NODE_TYPE_COLORS] || "text-green-400"

                return (
                  <div key={node.id} className="border border-green-400 p-4 space-y-2">
                    <div className="flex items-start gap-3">
                      <Icon className={`h-5 w-5 ${colorClass} flex-shrink-0 mt-1`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-300 text-sm">[{node.id}]</span>
                          <span className={`text-xs px-2 py-1 border ${colorClass} border-current`}>{node.type}</span>
                        </div>
                        <div className="text-green-400 mb-2">{node.summary}</div>

                        {node.tags && node.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {node.tags.map((tag) => (
                              <span key={tag} className="text-xs text-green-300 flex items-center gap-1">
                                <Tag className="h-3 w-3" />
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {node.anchors && node.anchors.length > 0 && (
                          <div className="text-xs text-green-300">anchors: {node.anchors.join(", ")}</div>
                        )}

                        {node.links && node.links.length > 0 && (
                          <div className="text-xs text-green-300">links: {node.links.join(" → ")}</div>
                        )}

                        {"fix" in node && node.fix && (
                          <div className="mt-2 p-2 border border-yellow-400 text-yellow-400 text-sm">
                            <div className="font-bold mb-1">FIX:</div>
                            <div>Action: {node.fix.action}</div>
                            {node.fix.module && <div>Module: {node.fix.module}</div>}
                            {node.fix.symbol && <div>Symbol: {node.fix.symbol}</div>}
                            <div>Status: {node.fix.status}</div>
                          </div>
                        )}

                        {"outcome" in node && node.outcome && (
                          <div className="mt-2 p-2 border border-cyan-400 text-cyan-400 text-sm">
                            <div className="font-bold mb-1">OUTCOME:</div>
                            <div>{node.outcome}</div>
                          </div>
                        )}

                        {"notes" in node && node.notes && (
                          <div className="mt-2 text-sm text-green-300">Note: {node.notes}</div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      {/* Themes */}
      <div className="border-2 border-green-400 p-4 mt-6">
        <h2 className="text-xl font-bold mb-4">THEMES</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {Object.entries(data.themes).map(([theme, items]) => (
            <div key={theme}>
              <h3 className="text-green-300 font-bold mb-2">{theme.replace(/_/g, " ").toUpperCase()}</h3>
              <ul className="space-y-1">
                {items.map((item) => (
                  <li key={item} className="text-sm text-green-400">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
