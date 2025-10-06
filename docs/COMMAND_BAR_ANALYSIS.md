# Command Bar Feature Analysis

## Overview
The Unified Daily Canvas includes a sophisticated command bar (activated with `/`) that provides quick access to navigation and actions. This document analyzes how this feature could be adapted for the container application.

## Current Implementation (Daily Canvas)

### Features
- **Keyboard Activation**: Press `/` to open command bar
- **Fuzzy Search**: Filter commands by typing
- **Quick Actions**: Navigate to tabs, toggle features, print
- **Escape to Close**: Press `Esc` to dismiss
- **Arrow Key Navigation**: `←/→` to switch tabs

### Technical Details
\`\`\`tsx
const CommandBar = ({ show, onClose, actions }) => {
  const [q, setQ] = useState("");
  const list = useMemo(() => 
    actions.filter(a => a.label.toLowerCase().includes(q.toLowerCase())), 
    [q, actions]
  );
  // ... modal with search input and filtered action list
}
\`\`\`

## Potential Container-Level Enhancements

### 1. Global Command Bar
**Concept**: Elevate the command bar to work across all sub-sites

**Benefits**:
- Quick navigation between any sub-site from anywhere
- Consistent UX across the entire platform
- Reduced cognitive load (one shortcut to rule them all)

**Implementation**:
\`\`\`tsx
// In app/sites/layout.tsx or root layout
const globalActions = [
  // Navigation
  { label: "Go to: SCAMPI Deep Dive", run: () => router.push("/sites/scampi-deep-dive") },
  { label: "Go to: Queer Zine", run: () => router.push("/sites/queer-zine") },
  { label: "Go to: Daily Canvas", run: () => router.push("/sites/daily-canvas") },
  // Global actions
  { label: "Toggle Sidebar", run: () => toggleSidebar() },
  { label: "Search All Sites", run: () => openGlobalSearch() },
  { label: "Print Current Page", run: () => window.print() },
]
\`\`\`

### 2. Context-Aware Actions
**Concept**: Command bar shows different actions based on current sub-site

**Benefits**:
- Sub-sites can register their own commands
- Global + local actions in one interface
- Extensible architecture

**Implementation**:
\`\`\`tsx
// Each sub-site exports its commands
export const dailyCanvasCommands = [
  { label: "Daily Canvas: Switch to Meta", run: () => setTab("meta") },
  { label: "Daily Canvas: Toggle Grid", run: () => setGrid(v => !v) },
  { label: "Daily Canvas: Run Tests", run: () => setTests(true) },
]

// Container merges global + current site commands
const allActions = [...globalActions, ...currentSiteCommands]
\`\`\`

### 3. Keyboard Shortcuts Registry
**Concept**: Centralized keyboard shortcut management

**Benefits**:
- Prevent conflicts between sub-sites
- Consistent shortcut documentation
- Easy to discover available shortcuts

**Implementation**:
\`\`\`tsx
const shortcuts = {
  "/": { action: "Open command bar", scope: "global" },
  "g": { action: "Toggle grid", scope: "daily-canvas" },
  "t": { action: "Run tests", scope: "daily-canvas" },
  "←/→": { action: "Navigate tabs", scope: "daily-canvas" },
  "Cmd+K": { action: "Quick search", scope: "global" },
}
\`\`\`

### 4. Search Integration
**Concept**: Command bar includes search across all sub-sites

**Benefits**:
- Find content anywhere in the platform
- Jump directly to specific sections
- Unified discovery experience

**Implementation**:
\`\`\`tsx
const searchActions = [
  { label: "Search: SCAMPI patterns", run: () => searchInSite("scampi", query) },
  { label: "Search: Zine dispatches", run: () => searchInSite("zine", query) },
  { label: "Search: Daily logs", run: () => searchInSite("canvas", query) },
]
\`\`\`

## Design Recommendations

### Visual Consistency
- Use the same dark modal with backdrop blur
- Maintain the zinc-950 background with zinc-800 borders
- Keep the Command icon and "esc" button pattern

### Accessibility
- Ensure focus management (auto-focus input on open)
- Support keyboard navigation through results
- Provide clear visual feedback for selected items

### Performance
- Lazy load sub-site commands (only when needed)
- Debounce search input for large action lists
- Use React.memo for command items

## Implementation Priority

1. **Phase 1**: Add global command bar to container layout
   - Basic navigation between sub-sites
   - Sidebar toggle
   - Print current page

2. **Phase 2**: Context-aware actions
   - Sub-sites register their commands
   - Merge global + local actions

3. **Phase 3**: Advanced features
   - Search across all content
   - Keyboard shortcut registry
   - Command history

## Code Example: Global Command Bar

\`\`\`tsx
// components/global-command-bar.tsx
"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter, usePathname } from 'next/navigation'
import { Command } from 'lucide-react'

export function GlobalCommandBar() {
  const [show, setShow] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)

  // Global keyboard listener
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !show) {
        e.preventDefault()
        setShow(true)
      }
      if (e.key === "Escape" && show) {
        setShow(false)
        setQuery("")
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [show])

  // Auto-focus input
  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [show])

  const actions = useMemo(() => [
    { label: "Go to: SCAMPI Deep Dive", run: () => router.push("/sites/scampi-deep-dive") },
    { label: "Go to: Queer Zine", run: () => router.push("/sites/queer-zine") },
    { label: "Go to: Queer Zine (Alt)", run: () => router.push("/sites/queer-zine-alt") },
    { label: "Go to: The Four Rs", run: () => router.push("/sites/four-rs") },
    { label: "Go to: Daily Canvas", run: () => router.push("/sites/daily-canvas") },
    { label: "Go to: Home", run: () => router.push("/") },
    { label: "Print Current Page", run: () => window.print() },
  ], [router])

  const filtered = useMemo(
    () => actions.filter(a => a.label.toLowerCase().includes(query.toLowerCase())),
    [query, actions]
  )

  if (!show) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 bg-black/60 backdrop-blur">
      <div className="w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl mt-20">
        <div className="flex items-center gap-2 p-3 border-b border-zinc-800">
          <Command size={16} className="text-zinc-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent outline-none text-sm text-zinc-200 placeholder:text-zinc-600"
          />
          <button
            onClick={() => setShow(false)}
            className="text-xs text-zinc-500 px-2 py-1 border border-zinc-700 rounded hover:text-white"
          >
            esc
          </button>
        </div>
        <div className="max-h-72 overflow-auto divide-y divide-zinc-900">
          {filtered.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                action.run()
                setShow(false)
                setQuery("")
              }}
              className="block w-full text-left p-3 hover:bg-zinc-900 text-sm text-white"
            >
              {action.label}
            </button>
          ))}
          {filtered.length === 0 && (
            <div className="p-4 text-xs text-zinc-500">No matches</div>
          )}
        </div>
      </div>
    </div>
  )
}
\`\`\`

## Conclusion

The command bar is a powerful pattern that could significantly enhance the container application's UX. Starting with a global command bar for navigation and gradually adding context-aware features would provide immediate value while maintaining the "shacks not cathedrals" philosophy of incremental, modular improvements.
