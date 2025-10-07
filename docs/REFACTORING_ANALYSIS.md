# FLOAT Multi-Site Platform: Refactoring Analysis

## Executive Summary

This document analyzes the current codebase architecture and identifies opportunities for improved maintainability, scalability, and code clarity. The analysis follows the "shacks not cathedrals" philosophy—focusing on modular improvements that enhance extensibility without over-engineering.

---

## Current Architecture Assessment

### Strengths
1. **Modular sub-site structure** - Each sub-site is self-contained in `components/sub-sites/`
2. **Clean routing** - Dynamic routes via `app/sites/[site]/page.tsx`
3. **Consistent navigation** - Single sidebar component manages all navigation
4. **No authentication complexity** - Personal app, no user management overhead

### Areas for Improvement
1. **Design token duplication** - Each sub-site defines its own color/styling tokens
2. **Component duplication** - Similar components (Panel, Tag, CodeBlock) exist in multiple files
3. **Keyboard shortcut conflicts** - Multiple sub-sites implement their own hotkey handlers
4. **Ritual grammar parsing** - Parsing logic scattered across components
5. **No shared state management** - Each sub-site manages state independently

---

## Refactoring Opportunities

### 1. Extract Shared Design Tokens

**Current State:**
- SCAMPI Deep Dive: `COLOR_TOKENS` with pink/cyan/green/yellow/purple/moss
- Design System: `TOKENS.color` with purple/red/yellow/green/cyan/pink/orange
- Daily Canvas: Inline neon colors (cyan/emerald/violet/fuchsia)
- Queer Zines: Various inline color definitions

**Proposed Solution:**
Create `lib/design-tokens.ts` with standardized FLOAT color palette:

\`\`\`typescript
export const FLOAT_TOKENS = {
  colors: {
    // Base
    bg: "#000000",
    panel: "#0A0014",
    text: "#f0f0f0",
    border: "#2A2A2A",
    
    // Accents (from Design System)
    purple: "#B84DFF",
    cyan: "#00E0FF",
    green: "#28E07C",
    pink: "#FF3FD1",
    red: "#FF0040",
    yellow: "#FFFF40",
    orange: "#FF8A00",
  },
  
  personas: {
    sysop: "purple",
    karen: "pink",
    evna: "green",
    lf1m: "orange",
    qtb: "pink",
    float: "cyan",
  },
  
  // Utility function
  accent: (key: string) => FLOAT_TOKENS.colors[key] || FLOAT_TOKENS.colors.purple,
}
\`\`\`

**Benefits:**
- Single source of truth for colors
- Easy to update palette globally
- Consistent persona-color mapping
- Type-safe color references

---

### 2. Create Shared Component Library

**Current Duplication:**

| Component | SCAMPI | Design System | Daily Canvas | Queer Zine |
|-----------|--------|---------------|--------------|------------|
| Panel/Card | ✓ | ✓ | ✓ | ✓ |
| Tag/Badge | - | ✓ | ✓ | ✓ |
| CodeBlock | - | ✓ | - | - |
| Search Input | ✓ | - | ✓ | ✓ |

**Proposed Solution:**
Create `components/float-ui/` with reusable primitives:

\`\`\`
components/float-ui/
├── panel.tsx          # Bordered container with persona colors
├── tag.tsx            # Ritual grammar tags (ctx::, signal::, etc.)
├── code-block.tsx     # Syntax-highlighted code display
├── search-bar.tsx     # Keyboard-enabled search (/ to focus)
├── tabs.tsx           # Keyboard-navigable tabs (1-4 keys)
└── index.ts           # Barrel export
\`\`\`

**Implementation Strategy:**
1. Extract Design System components as base implementations
2. Add TypeScript types for props
3. Migrate sub-sites one at a time (non-breaking)
4. Keep original components until migration complete

---

### 3. Centralized Keyboard Shortcut Registry

**Current Conflicts:**
- `/` - Search (SCAMPI, Daily Canvas, Queer Zine)
- `Esc` - Clear/Close (multiple)
- `1-4` - Tab navigation (Design System, Daily Canvas)
- `g` - Grid toggle (Daily Canvas)
- `t` - Self-tests (Daily Canvas)

**Proposed Solution:**
Create `lib/keyboard-shortcuts.ts` with global registry:

\`\`\`typescript
export const KEYBOARD_SHORTCUTS = {
  global: {
    '/': 'Open command bar',
    'Esc': 'Close overlays',
  },
  
  scoped: {
    'design-system': { '1-4': 'Switch tabs' },
    'daily-canvas': { 'g': 'Toggle grid', 't': 'Self-tests' },
    'scampi': { 'Enter': 'Toggle card' },
  },
}

// Hook for scoped shortcuts
export function useKeyboardShortcuts(scope: string, handlers: Record<string, () => void>) {
  // Implementation with scope awareness
}
\`\`\`

**Benefits:**
- Prevent conflicts between sub-sites
- Document all shortcuts in one place
- Enable help overlay (? key)
- Scope-aware handlers

---

### 4. Shared Ritual Grammar Parser

**Current State:**
- Design System: `translateAtBoundary()` parses `ctx::`, `signal::`, etc.
- Daily Canvas: Inline parsing for ritual markers
- Other sub-sites: No structured parsing

**Proposed Solution:**
Create `lib/ritual-grammar.ts`:

\`\`\`typescript
export interface RitualAnnotation {
  label: string;      // ctx, signal, protocol, status
  value: string;      // Main content
  meta: Record<string, string>; // Key-value pairs after |
}

export function parseRitualGrammar(input: string): RitualAnnotation[] {
  // Unified parsing logic
}

export function formatRitualGrammar(annotation: RitualAnnotation): string {
  // Reverse: object → string
}
\`\`\`

**Benefits:**
- Consistent parsing across all sub-sites
- Easier to extend grammar (new markers)
- Type-safe annotation objects
- Testable in isolation

---

### 5. Improve State Management

**Current State:**
- Each sub-site uses local `useState`
- No cross-site state sharing
- No persistence (refresh loses state)

**Proposed Solution (Lightweight):**
Use URL state + localStorage for persistence:

\`\`\`typescript
// lib/use-persisted-state.ts
export function usePersistedState<T>(key: string, defaultValue: T) {
  const [state, setState] = useState<T>(() => {
    if (typeof window === 'undefined') return defaultValue;
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  });
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  
  return [state, setState] as const;
}
\`\`\`

**Use Cases:**
- Persist search queries across sessions
- Remember collapsed/expanded cards
- Save tab preferences
- Track last visited sub-site

---

## Implementation Roadmap

### Phase 1: Foundation (Non-Breaking)
1. Create `lib/design-tokens.ts` with FLOAT color palette
2. Create `lib/ritual-grammar.ts` with parser
3. Create `components/float-ui/` with base components
4. Add `lib/use-persisted-state.ts` hook

**Effort:** 2-3 hours  
**Risk:** Low (additive only)

### Phase 2: Migration (Incremental)
1. Migrate Design System to use shared tokens
2. Migrate SCAMPI Deep Dive to use shared components
3. Migrate Daily Canvas to use shared keyboard shortcuts
4. Migrate Queer Zines to use ritual grammar parser

**Effort:** 4-6 hours  
**Risk:** Medium (requires testing each sub-site)

### Phase 3: Enhancement (Optional)
1. Add global command bar (container-level)
2. Create keyboard shortcut help overlay
3. Add cross-site search
4. Implement theme switcher (light/dark/custom)

**Effort:** 6-8 hours  
**Risk:** Medium (new features, potential bugs)

---

## Architectural Principles

### Shacks, Not Cathedrals
- **Favor composition over inheritance** - Small, reusable pieces
- **Explicit over implicit** - Clear imports, no magic
- **Escape hatches** - Allow sub-sites to override shared components
- **Progressive enhancement** - New features don't break existing code

### Modularity Guidelines
1. **Each sub-site remains self-contained** - Can be extracted as standalone app
2. **Shared code is opt-in** - Sub-sites choose what to use
3. **No forced conventions** - Shared components are suggestions, not requirements
4. **Version independence** - Updating shared code doesn't force sub-site updates

---

## Metrics for Success

### Before Refactoring
- **Lines of duplicated code:** ~800 (color tokens, components, parsers)
- **Component reusability:** 0% (all inline)
- **Keyboard shortcut conflicts:** 3 known
- **Time to add new sub-site:** ~2 hours (copy-paste-modify)

### After Refactoring (Target)
- **Lines of duplicated code:** <200
- **Component reusability:** 60%+ (shared Panel, Tag, CodeBlock, etc.)
- **Keyboard shortcut conflicts:** 0 (registry prevents)
- **Time to add new sub-site:** ~30 minutes (import shared components)

---

## Conclusion

The current architecture is solid for a personal rapid prototype. The proposed refactoring maintains the "shacks not cathedrals" philosophy while improving:

1. **Maintainability** - Shared tokens/components reduce duplication
2. **Scalability** - Easy to add new sub-sites with consistent patterns
3. **Code clarity** - Centralized parsing, shortcuts, and state management

**Recommendation:** Implement Phase 1 (foundation) immediately, then migrate sub-sites incrementally as needed. Phase 3 (enhancements) can wait until specific pain points emerge.
