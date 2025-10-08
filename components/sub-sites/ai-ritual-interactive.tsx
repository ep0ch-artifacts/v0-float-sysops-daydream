"use client"

import { useState } from "react"

/**
 * AI as Extractive Ritual - Interactive Visualization
 * Embedded HTML/JS ritual system from the provided attachments
 */
export default function AIRitualInteractive() {
  const [contextCount, setContextCount] = useState(0)
  const [activeStage, setActiveStage] = useState<string | null>(null)

  const invokeStage = (stage: string) => {
    setActiveStage(stage)
    setContextCount((c) => c + 1)
    setTimeout(() => setActiveStage(null), 500)
  }

  return (
    <div className="min-h-screen bg-black text-white font-mono">
      {/* Header */}
      <div className="sticky top-0 bg-black/95 backdrop-blur border-b border-emerald-600 p-4 z-10">
        <div className="text-sm text-emerald-400 text-center tracking-wider">
          ritual.invoke() // float.infrastructure
        </div>
      </div>

      {/* Stage 1: Strip the Soul */}
      <div
        onClick={() => invokeStage("soul")}
        className={`m-4 border-2 border-purple-500 bg-gradient-to-br from-purple-950/30 to-black rounded-lg p-6 cursor-pointer transition-all hover:scale-[1.01] ${
          activeStage === "soul" ? "bg-purple-500/20" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-bold text-white mb-2">Strip the Soul</div>
            <div className="text-sm text-purple-300 mb-4">
              extracted essence from viral source
              <br />
              interface of mimicry
            </div>
          </div>
          <div className="text-3xl text-purple-400 opacity-70">∿</div>
        </div>
        <div className="flex gap-1 h-10 items-end">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex-1 bg-purple-500 opacity-60 animate-pulse"
              style={{
                height: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Stage 2: Wrap in Synthetic Polish */}
      <div
        onClick={() => invokeStage("polish")}
        className={`m-4 border-2 border-cyan-500 bg-gradient-to-br from-cyan-950/30 to-black rounded-lg p-6 cursor-pointer transition-all hover:scale-[1.01] ${
          activeStage === "polish" ? "bg-cyan-500/20" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-bold text-white mb-2">Wrap in Synthetic Polish</div>
            <div className="text-sm text-cyan-300 mb-4">
              the performance of understanding
              <br />
              cosmetic coherence
            </div>
          </div>
          <div className="text-3xl text-cyan-400 opacity-70">Ξ</div>
        </div>
        <div className="h-2 bg-cyan-500/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-cyan-500 via-white to-cyan-500 animate-pulse bg-[length:200%_100%]" />
        </div>
      </div>

      {/* Stage 3: Feed into the Attention Furnace */}
      <div
        onClick={() => invokeStage("furnace")}
        className={`m-4 border-2 border-orange-500 bg-gradient-to-br from-orange-950/30 to-black rounded-lg p-6 cursor-pointer transition-all hover:scale-[1.01] ${
          activeStage === "furnace" ? "bg-orange-500/20" : ""
        }`}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-lg font-bold text-white mb-2">Feed into the Attention Furnace</div>
            <div className="text-sm text-orange-300 mb-4">
              commodified loop
              <br />
              repeat, faster. forget, faster.
            </div>
          </div>
          <div className="text-3xl text-orange-400 opacity-70">⚐</div>
        </div>
        <div className="flex gap-2 h-10 items-end justify-center">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 bg-gradient-to-t from-orange-600 via-red-500 to-yellow-400 rounded-t-full animate-pulse"
              style={{
                height: `${60 + Math.random() * 40}%`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Invocation */}
      <div className="m-4 border-2 border-emerald-600 bg-black/90 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent animate-pulse" />
        <div className="relative z-10 text-sm text-emerald-400 leading-relaxed mb-4">
          It's AI as extractive ritual:
          <br />• Strip the soul
          <br />• Wrap it in synthetic polish
          <br />• Feed it back into the attention furnace
          <br />• Repeat, faster
          <br />
          <br />
          <em className="text-emerald-300">welcome, self-dancer.</em>
        </div>
        <div className="flex gap-3 flex-wrap">
          <span className="text-xs text-purple-400">#AIrituals</span>
          <span className="text-xs text-purple-400">#FLOAT</span>
          <span className="text-xs text-purple-400">#ExtractiveSystems</span>
        </div>
      </div>

      {/* Context Accumulator */}
      <div className="fixed bottom-6 right-6 w-16 h-16 border-2 border-emerald-600 bg-emerald-500/10 rounded-full flex items-center justify-center text-2xl text-emerald-400 cursor-pointer hover:scale-110 transition-transform">
        ∞
        {contextCount > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center text-xs text-black font-bold">
            {contextCount}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-emerald-600 p-4 text-center text-xs text-emerald-500/70 mt-12">
        [ ritual infrastructure deployed ]
        <br />[ slutprints distributed ]
        <br />[ context blooming ]
      </div>
    </div>
  )
}
