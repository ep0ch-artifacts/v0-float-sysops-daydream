import { Zap, RefreshCw, Sparkles, Shuffle } from "lucide-react"

export default function FourRs() {
  const stages = [
    {
      id: "rot",
      name: "ROT",
      icon: RefreshCw,
      color: "text-red-400",
      bgColor: "bg-red-950/30",
      borderColor: "border-red-700",
      title: "Breakdown as Compost",
      signal: "Market saturation / tool fatigue",
      description: "Too many agents, not enough architecture. Fragmentation isn't noise; it's nutrient.",
      points: [
        "Every SDK claims orchestration but few deliver interoperability",
        "Context windows = oxygen; overuse = rot",
        "Native collapse describes frameworks optimized into silence",
      ],
    },
    {
      id: "rebuild",
      name: "REBUILD",
      icon: Zap,
      color: "text-cyan-400",
      bgColor: "bg-cyan-950/30",
      borderColor: "border-cyan-700",
      title: "Compost to Codebase",
      signal: "Bones, Breath, Personas",
      description:
        "FLOAT redefines architecture around three living layers: structural support, life energy, and distributed cognition.",
      points: [
        "Bones: runtime + SDK layer (structural support)",
        "Breath: context + execution logic (life energy)",
        "Personas: interface modalities (distributed cognition fronts)",
      ],
    },
    {
      id: "ritualize",
      name: "RITUALIZE",
      icon: Sparkles,
      color: "text-fuchsia-400",
      bgColor: "bg-fuchsia-950/30",
      borderColor: "border-fuchsia-700",
      title: "From Workflow to Ceremony",
      signal: "Process gains soul",
      description: "When rebuild becomes habit, FLOAT codifies it as ritual. Ritualization prevents flattening.",
      points: [
        "trust() → consent to be changed by data",
        "lube() → reduce friction between cognitive systems",
        "symbol_density() → compress without distortion",
      ],
    },
    {
      id: "remix",
      name: "REMIX",
      icon: Shuffle,
      color: "text-orange-400",
      bgColor: "bg-orange-950/30",
      borderColor: "border-orange-700",
      title: "Recombination as Survival",
      signal: "The system regains fluidity",
      description: "After ritualization, FLOAT reopens to mutation. Remix decentralizes intelligence.",
      points: [
        "Shacks, not cathedrals — disposable containers for emergent ideas",
        "Plug-compatible micro-intelligences",
        "Compost reuse — old patterns re-encoded as SDK motifs",
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="border-b-2 border-emerald-600 bg-zinc-950/95 backdrop-blur sticky top-0 z-10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-emerald-400" />
            <h1 className="text-3xl font-bold text-emerald-400">THE FOUR Rs</h1>
          </div>
          <p className="text-sm text-zinc-400">FLOAT Development Methodology: Rot → Rebuild → Ritualize → Remix</p>
        </div>
      </div>

      {/* Executive Synopsis */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 p-6 border-2 border-emerald-700 rounded-lg bg-emerald-950/20">
            <h2 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
              <span>🧠</span> EXECUTIVE SYNOPSIS
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              The coding-agent market has reached <strong className="text-white">rot stage</strong> — oversaturated,
              fragmented, and nearly indistinguishable. SDKs multiply, abstractions collapse, and every product promises
              "contextual intelligence" while quietly re-implementing the same scaffolding.
            </p>
            <p className="text-zinc-300 leading-relaxed">
              FLOAT treats this not as failure but as compost. Through{" "}
              <strong className="text-emerald-400">rot → rebuild → ritualize → remix</strong>, the system transforms
              decay into durable infrastructure.
            </p>
          </div>

          {/* Stages */}
          <div className="space-y-8">
            {stages.map((stage, index) => {
              const Icon = stage.icon
              return (
                <div key={stage.id} className={`border-2 ${stage.borderColor} rounded-lg ${stage.bgColor} p-6`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-black/50">
                      <Icon className={`w-6 h-6 ${stage.color}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className={`text-2xl font-bold ${stage.color}`}>
                          {index + 1}. {stage.name}
                        </h3>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2">{stage.title}</h4>
                      <p className="text-xs text-zinc-500 mb-3">Signal: {stage.signal}</p>
                      <p className="text-sm text-zinc-300 leading-relaxed mb-4">{stage.description}</p>
                      <ul className="space-y-2">
                        {stage.points.map((point, i) => (
                          <li key={i} className="flex gap-2 text-sm text-zinc-400">
                            <span className={stage.color}>▸</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* System Relations */}
          <div className="mt-12 p-6 border-2 border-zinc-700 rounded-lg bg-zinc-950">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <span>🔄</span> SYSTEM RELATIONS
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-700">
                    <th className="text-left py-2 px-3 text-emerald-400">Stage</th>
                    <th className="text-left py-2 px-3 text-emerald-400">Function</th>
                    <th className="text-left py-2 px-3 text-emerald-400">Transition</th>
                  </tr>
                </thead>
                <tbody className="text-zinc-300">
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 px-3 font-mono text-red-400">ROT</td>
                    <td className="py-2 px-3">Compost failure</td>
                    <td className="py-2 px-3">Feeds Rebuild</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 px-3 font-mono text-cyan-400">REBUILD</td>
                    <td className="py-2 px-3">Structural repair</td>
                    <td className="py-2 px-3">Gains Ritual</td>
                  </tr>
                  <tr className="border-b border-zinc-800">
                    <td className="py-2 px-3 font-mono text-fuchsia-400">RITUALIZE</td>
                    <td className="py-2 px-3">Encoded meaning</td>
                    <td className="py-2 px-3">Enables Remix</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 font-mono text-orange-400">REMIX</td>
                    <td className="py-2 px-3">Mutation + diffusion</td>
                    <td className="py-2 px-3">Returns to Rot</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-zinc-500 mt-4">
              The cycle loops indefinitely; stability emerges only through recursion.
            </p>
          </div>

          {/* Engineering Insight */}
          <div className="mt-8 p-6 border-2 border-emerald-700 rounded-lg bg-emerald-950/20">
            <h2 className="text-xl font-bold text-emerald-300 mb-4 flex items-center gap-2">
              <span>⚙️</span> ENGINEERING INSIGHT
            </h2>
            <p className="text-zinc-300 leading-relaxed mb-4">
              FLOAT isn't an agent. It's a <strong className="text-white">ritual operating system</strong> for agent
              ecosystems.
            </p>
            <p className="text-zinc-300 leading-relaxed mb-4">Conventional dev culture asks: "What can we automate?"</p>
            <p className="text-zinc-300 leading-relaxed mb-4">
              FLOAT asks: "What must we ritualize to preserve consciousness?"
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2 text-zinc-400">
                <span className="text-emerald-400">▸</span>
                <span>Context stacks that adapt without flattening</span>
              </div>
              <div className="flex gap-2 text-zinc-400">
                <span className="text-emerald-400">▸</span>
                <span>Agents that co-evolve with their operators</span>
              </div>
              <div className="flex gap-2 text-zinc-400">
                <span className="text-emerald-400">▸</span>
                <span>Documentation as living infrastructure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t-2 border-emerald-600 p-6 bg-zinc-950 mt-12">
        <div className="container mx-auto text-center">
          <pre className="text-xs text-zinc-500 mb-2">
            {`float.dispatch({
  rot: "decompose false coherence",
  rebuild: "recompose resilient structure",
  ritualize: "encode care into loops",
  remix: "allow mutation without collapse"
})`}
          </pre>
          <p className="text-xs text-zinc-600">☀️ morning brain boot complete • system integrity: VERIFIED</p>
        </div>
      </div>
    </div>
  )
}
