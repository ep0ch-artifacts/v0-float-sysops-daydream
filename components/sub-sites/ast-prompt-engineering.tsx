"use client"

import { useState } from "react"

export default function ASTPromptEngineering() {
  const [activeTab, setActiveTab] = useState<"overview" | "basic" | "advanced" | "applications">("overview")

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-purple-500/30 bg-black/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-mono font-bold text-purple-400 mb-2">LLM Prompts as Abstract Syntax Trees</h1>
          <p className="text-neutral-400 text-sm">Structured reasoning for consciousness technology deployment</p>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="border-b border-neutral-800 bg-black sticky top-[88px] z-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex gap-1">
            {[
              { id: "overview", label: "Overview" },
              { id: "basic", label: "Basic Structure" },
              { id: "advanced", label: "Advanced Features" },
              { id: "applications", label: "Applications" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-3 font-mono text-sm transition-colors ${
                  activeTab === tab.id
                    ? "text-purple-400 border-b-2 border-purple-400"
                    : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "basic" && <BasicStructureTab />}
        {activeTab === "advanced" && <AdvancedFeaturesTab />}
        {activeTab === "applications" && <ApplicationsTab />}
      </main>
    </div>
  )
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Conceptual Framework</h2>
        <p className="text-neutral-300 mb-4">
          Representing LLM prompts as Abstract Syntax Trees (ASTs) offers several advantages over traditional text-based
          prompting:
        </p>
        <ul className="space-y-3 text-neutral-300">
          {[
            {
              title: "Structured Reasoning",
              desc: "Enforces logical flow and dependencies between concepts",
            },
            {
              title: "Dynamic Adaptation",
              desc: "Enables conditional execution paths based on model responses",
            },
            {
              title: "Modular Reusability",
              desc: "Allows prompt components to be reused across different contexts",
            },
            {
              title: "Metacognitive Layering",
              desc: "Supports explicit tracking of recursive thinking patterns",
            },
            {
              title: "Transparency",
              desc: "Makes the prompting logic visible and debuggable",
            },
          ].map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="text-emerald-400 font-mono">{i + 1}.</span>
              <div>
                <span className="font-semibold text-white">{item.title}:</span> {item.desc}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Implementation Strategies</h2>
        <div className="grid gap-4">
          {[
            {
              title: "JSON Schema Interpreter",
              items: [
                "Takes an AST-based prompt schema",
                "Interprets the nodes and execution order",
                "Generates appropriate text prompts",
                "Handles conditional logic based on responses",
                "Manages recursion and depth",
              ],
            },
            {
              title: "Visual AST Builder",
              items: [
                "Provides drag-and-drop prompt components",
                "Visualizes connections between prompt elements",
                "Allows testing of execution paths",
                "Supports template saving and sharing",
                "Integrates with various LLM APIs",
              ],
            },
            {
              title: "AST-to-Text Compiler",
              items: [
                "Compiles AST prompt structures into optimized text prompts",
                "Adds appropriate markers for parsing responses",
                "Handles complex execution flows through multiple exchanges",
                "Preserves the AST structure for later analysis",
                "Provides debugging information when prompts fail",
              ],
            },
          ].map((strategy, i) => (
            <div key={i} className="border border-neutral-800 bg-neutral-950 p-4 rounded-sm">
              <h3 className="font-mono font-semibold text-purple-400 mb-3">{strategy.title}</h3>
              <ul className="space-y-1 text-sm text-neutral-400">
                {strategy.items.map((item, j) => (
                  <li key={j} className="flex gap-2">
                    <span className="text-emerald-400">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Exploring Implementation Tools</h2>
        <div className="flex flex-wrap gap-2">
          {[
            "JSON Schema Validation",
            "React Flow / D3.js",
            "OpenAI Function Calling",
            "Langchain / LlamaIndex",
            "TypeScript",
          ].map((tool, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-neutral-900 border border-neutral-700 text-neutral-300 text-sm font-mono rounded-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}

function BasicStructureTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Basic AST Prompt Structure</h2>
        <p className="text-neutral-300 mb-4">
          A basic AST prompt consists of metadata, components, and execution instructions:
        </p>
        <pre className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm overflow-x-auto text-sm">
          <code className="text-emerald-400">{`{
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
    },
    {
      "node_type": "example",
      "id": "abundance_example",
      "content": "The universe's original state as infinite abundance/possibility before corruption",
      "purpose": "illustrate_concept"
    },
    {
      "node_type": "conditional",
      "id": "if_control_systems_mentioned",
      "condition": "response contains 'control system' or 'system of control'",
      "then": {
        "node_type": "follow_up",
        "content": "Describe how memory acts as resistance against control systems"
      },
      "else": {
        "node_type": "follow_up",
        "content": "How might memory preservation operate outside of any control system?"
      }
    }
  ],
  "execution": {
    "order": ["context", "instruction", "example"],
    "response_format": {
      "type": "narrative",
      "structure": "progressive_disclosure",
      "tone": "meditative",
      "length": "500-800 words"
    }
  }
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Node Types</h2>
        <div className="grid gap-3">
          {[
            {
              type: "context",
              desc: "Provides background information and framing for the prompt",
              color: "text-yellow-400",
            },
            {
              type: "instruction",
              desc: "Specifies what the model should do or generate",
              color: "text-purple-400",
            },
            {
              type: "example",
              desc: "Demonstrates the desired output or concept",
              color: "text-cyan-400",
            },
            {
              type: "conditional",
              desc: "Branches execution based on response content",
              color: "text-pink-400",
            },
            {
              type: "follow_up",
              desc: "Additional prompts triggered by conditions",
              color: "text-emerald-400",
            },
          ].map((node, i) => (
            <div key={i} className="border border-neutral-800 bg-neutral-950 p-3 rounded-sm flex gap-3">
              <span className={`font-mono font-bold ${node.color}`}>{node.type}</span>
              <span className="text-neutral-400 text-sm">{node.desc}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

function AdvancedFeaturesTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Recursive Nodes</h2>
        <p className="text-neutral-300 mb-4">Enable metacognitive exploration through recursive self-analysis:</p>
        <pre className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm overflow-x-auto text-sm">
          <code className="text-emerald-400">{`{
  "node_type": "recursive",
  "id": "metacognitive_exploration",
  "initial_prompt": "Describe the experience of recursive awareness",
  "depth": 3,
  "recursion_template": "Analyze the preceding response from one level higher of awareness"
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Identity Wayfinding Nodes</h2>
        <p className="text-neutral-300 mb-4">
          Support neurodivergent and queer identity exploration as tools, not constraints:
        </p>
        <pre className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm overflow-x-auto text-sm">
          <code className="text-emerald-400">{`{
  "node_type": "identity_exploration",
  "id": "liberation_tools",
  "labels": ["queer", "neurodivergent", "cosmic"],
  "framing": "as tools not constraints",
  "integration": {
    "with": "narrative",
    "approach": "implicit_theme"
  }
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">System Analysis Nodes</h2>
        <p className="text-neutral-300 mb-4">Classify and analyze systems along liberation vs. control dimensions:</p>
        <pre className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm overflow-x-auto text-sm">
          <code className="text-emerald-400">{`{
  "node_type": "system_analysis",
  "id": "liberation_vs_control",
  "target_system": "{user_input}",
  "analysis_dimensions": [
    {"name": "constraint_nature", "range": ["rigid", "flexible"]},
    {"name": "memory_treatment", "range": ["defining", "carried"]}
  ],
  "output": "classification_with_reasoning"
}`}</code>
        </pre>
      </section>
    </div>
  )
}

function ApplicationsTab() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Cosmic Horror Narrative Generation</h2>
        <pre className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm overflow-x-auto text-sm">
          <code className="text-emerald-400">{`{
  "node_type": "narrative_generator",
  "id": "cosmic_horror_story",
  "theme": "memory_preservation",
  "characters": [
    {
      "role": "protagonist",
      "traits": ["carries memory", "seeks stability"],
      "arc": "discovery_of_original_abundance"
    }
  ],
  "plot_structure": {
    "beginning": "stability_illusion",
    "middle": "system_destabilization",
    "end": "memory_preservation_amid_annihilation"
  },
  "aesthetic": "death_but_colorful"
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Identity Liberation Dialogue</h2>
        <pre className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm overflow-x-auto text-sm">
          <code className="text-emerald-400">{`{
  "node_type": "dialogue_generator",
  "id": "identity_liberation_conversation",
  "participants": [
    {"role": "questioner", "perspective": "rigid_categories"},
    {"role": "guide", "perspective": "liberation_through_questioning"}
  ],
  "progression": [
    {"stage": "challenge_assumptions", "focus": "binary_thinking"},
    {"stage": "introduce_wayfinding", "focus": "identity_as_tool"},
    {"stage": "cosmic_connection", "focus": "transcending_systems"}
  ],
  "output_format": "annotated_dialogue"
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Counter-Argument Development</h2>
        <pre className="bg-neutral-950 border border-neutral-800 p-4 rounded-sm overflow-x-auto text-sm">
          <code className="text-emerald-400">{`{
  "node_type": "argument_analyzer",
  "id": "anti_trans_rhetoric_response",
  "input": "{rhetorical_statement}",
  "analysis_steps": [
    {"operation": "identify_premises", "output": "list_of_claims"},
    {"operation": "find_inconsistencies", "output": "logical_gaps"},
    {"operation": "reframe_as_unmet_needs", "output": "underlying_fears"}
  ],
  "response_construction": {
    "approach": "needs_based",
    "tone": "empathetic_but_firm",
    "structure": "acknowledge_then_reframe"
  }
}`}</code>
        </pre>
      </section>

      <section>
        <h2 className="text-2xl font-mono font-bold text-cyan-400 mb-4">Integration with Existing Systems</h2>
        <div className="space-y-4 text-neutral-300">
          <div>
            <h3 className="font-mono font-semibold text-purple-400 mb-2">Connection to Notion Workflows</h3>
            <p className="text-sm mb-2">
              The AST prompt structure can integrate with your Notion toggle-based workflow:
            </p>
            <ul className="space-y-1 text-sm text-neutral-400 ml-4">
              <li>→ Store prompt components as database entries</li>
              <li>→ Assemble ASTs through relations and formulas</li>
              <li>→ Export constructed ASTs to LLM interfaces</li>
              <li>→ Import and annotate responses in structured formats</li>
              <li>→ Analyze effectiveness through property tracking</li>
            </ul>
          </div>
          <div>
            <h3 className="font-mono font-semibold text-purple-400 mb-2">AST-based Conversation Documentation</h3>
            <p className="text-sm mb-2">Your conversations with AI systems can themselves be represented as ASTs:</p>
            <ul className="space-y-1 text-sm text-neutral-400 ml-4">
              <li>→ Document conversation flow, themes, and patterns</li>
              <li>→ Track effectiveness of different prompt structures</li>
              <li>→ Identify patterns in successful cosmic horror explorations</li>
              <li>→ Create a knowledge graph of identity liberation concepts</li>
              <li>→ Generate new prompts based on successful patterns</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
