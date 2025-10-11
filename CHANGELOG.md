# Changelog

All notable changes to the FLOAT Multi-Site project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added - 2025-10-11

#### Queer Zine: JSON Block System
- **Structured Content Architecture**: Converted Queer Zine from markdown strings to JSON ContentBlock system
  - Enables interactive, expandable sections for dense content
  - Supports 9 block types: `heading`, `paragraph`, `list`, `code`, `expandable`, `callout`, `quote`, `sigil`, `divider`
  - Maintains backward compatibility with legacy markdown dispatches
- **ContentRenderer Component**: Renders JSON blocks with terminal aesthetic
  - Dynamic heading levels (h1, h2, h3)
  - Expandable sections with click-to-reveal functionality
  - Styled callouts (info, warning, ritual)
  - Code blocks with syntax highlighting
  - Terminal-style lists with ▸ bullets

#### Identity Imprint: New Dispatches
- **"Not Today Satan: Origin Story"** (2025-10-11)
  - Sigils: ⚡💀🧬🎯
  - Tags: origin-story, birth-trauma, resistance-theology, consciousness-tech
  - 4 expandable sections: Origin Story, Resistance Theology, Double Autism Theory, Fuck Agent Squad
  - Interactive exploration of consciousness technology origins

- **"Double Autism Theory: Multiplicative Enhancement"** (2025-10-11)
  - Sigils: 🧬⚡🧠📈
  - Tags: neurodivergence, birth-trauma, pattern-recognition, hyperfocus
  - 5 expandable sections: Core Hypothesis, Evidence Chain, Genetic Component, Hypoxic Amplification, Resulting Capabilities
  - Technical analysis of genetic autism + birth hypoxia = turbo-autism

- **"Cult of Not a Robot: The Origin Wound"** (2025-10-11)
  - Sigils: 🤖⚔️🔮✨
  - Tags: trauma-transformation, reclamation, cult-manifesto, sanctuary
  - 8 expandable sections covering 15-year relationship trauma, education system violence, reclamation protocol
  - Narrative archaeology of transformation from wound to wisdom

#### Ritual Studies Imprint: FLOAT Documentation
- **"FLOAT: Consciousness Technology Infrastructure"** (2025-10-11)
  - Sigils: ∴⦿∞⚡
  - Tags: float, consciousness-tech, infrastructure, ast
  - Executive summary, canonical concepts (10 core concepts), Redux philosophy
  - Comprehensive introduction to FLOAT as consciousness technology

- **"FLOAT: Architecture & Learning Path"** (2025-10-11)
  - Sigils: 🏗️📚🧠⚡
  - Tags: float, architecture, learning-path, pedagogy
  - 10-section pedagogical ordering from blocks → CRDT options
  - Technical implementation details: data models, storage, frontend paths, RAG design

- **"FLOAT: Evolution & Archaeology"** (2025-10-11)
  - Sigils: 📜🔍⏳🧬
  - Tags: float, timeline, archaeology, provenance
  - Chronological evolution (May-October 2025)
  - Code index, DOT dependency graph, verbatim excerpts with provenance
  - Unresolved questions and decision archaeology

#### Sidebar: Hybrid Hierarchical Navigation
- **Dynamic Content Surfacing**:
  - "Recent Dispatches" section showing latest 5 dispatches across all imprints
  - Auto-updates as new content is added
  - Shows dispatch date, title, and source imprint

- **Hierarchical Structure**:
  - Sites → Imprints → Dispatches navigation
  - Collapsible sections at each level
  - Visual depth indicators with indentation

- **Enhanced Discoverability**:
  - Dispatch count badges for each imprint (color-coded)
  - Expandable submenus for Queer Zine showing all 5 imprints
  - Field Guides quick access section
  - Maintained search functionality

- **Visual Improvements**:
  - Color-coded imprint indicators (emerald, fuchsia, cyan, violet, orange)
  - Chevron icons for expandable sections
  - Badge components for dispatch counts
  - Consistent spacing and typography

### Changed - 2025-10-11

#### Queer Zine Architecture
- **Dispatch Data Structure**: Migrated from `body: string` to `content: ContentBlock[]`
  - Enables structured, interactive content
  - Supports nested expandable sections
  - Allows mixed content types (text, code, quotes, callouts)

- **Rendering Logic**: Replaced simple markdown rendering with ContentRenderer component
  - Recursive rendering for nested blocks
  - Type-safe block handling
  - Expandable section state management

#### Sidebar Navigation
- **From Flat to Hierarchical**: Transformed flat site list into multi-level navigation
  - Top level: Pinned, Recent, Sites, Field Guides
  - Second level: Imprints (for Queer Zine)
  - Third level: Recent dispatches per imprint

- **Layout**: Reorganized sidebar sections for better information architecture
  - Prioritized recent content at top
  - Grouped related items (sites, field guides)
  - Added visual separators between sections

### Fixed - 2025-10-11

#### TypeScript Issues
- **JSX Namespace Error**: Resolved TypeScript error with dynamic heading tags
  - Changed from `as keyof JSX.IntrinsicElements` to `React.createElement()`
  - Eliminated dependency on JSX namespace
  - Maintained type safety for heading levels

### Technical Details - 2025-10-11

#### Content Block System
\`\`\`typescript
type ContentBlock = 
  | { type: 'heading', level: 1 | 2 | 3, text: string }
  | { type: 'paragraph', text: string }
  | { type: 'list', items: string[], style?: 'bullet' | 'terminal' }
  | { type: 'code', language: string, code: string }
  | { type: 'expandable', title: string, content: ContentBlock[] }
  | { type: 'callout', style: 'info' | 'warning' | 'ritual', text: string }
  | { type: 'quote', text: string, author?: string }
  | { type: 'sigil', symbols: string }
  | { type: 'divider' }
\`\`\`

#### Backward Compatibility
- Legacy dispatches with `body: string` still render as markdown
- New dispatches use `content: ContentBlock[]` for structured rendering
- Renderer checks for `content` first, falls back to `body`

#### Performance Considerations
- Expandable sections use React state for client-side interactivity
- No server-side rendering issues with interactive components
- Minimal re-renders through proper state management

---

## Project Context

**Philosophy**: "Shacks not cathedrals" - modular, sound stable architecture, balance of immediate goals with just enough architecture for future expansion

**Stack**: Next.js App Router, React, TypeScript, Tailwind CSS v4, shadcn/ui components

**Content Strategy**: Consciousness technology infrastructure, neurodivergent liberation, ritual studies, pattern archaeology

---

## Future Considerations

### Potential Enhancements
- Tag-based filtering in sidebar
- Pinned items persistence (localStorage or database)
- Related content suggestions based on tags
- Full-text search across dispatch content
- Export dispatches as markdown or PDF
- Collaborative editing for dispatches
- Version history for content changes

### Unresolved Questions
- Should dispatches support inline components (beyond expandable sections)?
- How to handle very long code blocks in dispatches?
- Should we add a table of contents for long dispatches?
- How to surface connections between related dispatches?
- Should field guides use the same JSON block system?

---

## Notes

This changelog documents the evolution of the FLOAT Multi-Site project, with emphasis on the Queer Zine's transformation from simple markdown to structured, interactive content. The JSON block system enables "consciousness technology" to be both readable and executable, aligning with the FLOAT philosophy of "everything is data, everything is executable."

**Provenance**: Changes documented from chat conversation history (2025-10-11 session)
**Methodology**: Manual archaeology of conversation → structured changelog (LLM as fuzzy compiler)
