# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a **Next.js multi-site platform** built with v0.app that serves as a container for multiple self-contained sub-sites. It uses a modular architecture where each sub-site maintains its own functionality, styles, and content while sharing a unified navigation experience through a collapsible sidebar.

The project follows a "FLOAT" philosophy - focusing on liminal cognition, ritual architecture, and modular mysticism as documented in the SCAMPI Deep Dive sub-site.

## Development Commands

### Core Development
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linting
pnpm lint
```

### Package Management
```bash
# Install dependencies
pnpm install

# Add new dependency
pnpm add [package-name]

# Add dev dependency
pnpm add -D [package-name]
```

## Architecture

### File Structure
```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts & analytics
│   ├── page.tsx           # Homepage with site grid
│   └── globals.css        # Global styles
├── components/
│   ├── sub-sites/         # Self-contained sub-site components
│   │   ├── scampi-deep-dive.tsx    # FLOAT field guide
│   │   ├── unified-daily-canvas.tsx # Productivity dashboard
│   │   ├── queer-zine.tsx          # Publishing house interface
│   │   └── four-rs.tsx             # Methodology framework
│   ├── app-sidebar.tsx    # Global navigation sidebar
│   ├── theme-provider.tsx # Dark/light theme management
│   └── ui/                # shadcn/ui components
├── lib/
│   └── utils.ts           # Utility functions (cn helper)
└── public/                # Static assets
```

### Key Architectural Patterns

**Single-File Sub-Sites**: Each sub-site in `components/sub-sites/` is a complete, self-contained React component that could function independently. This follows the "shacks not cathedrals" philosophy.

**Modular Navigation**: The sidebar (`app-sidebar.tsx`) provides unified navigation while each sub-site maintains its own internal state and functionality.

**Component-Driven**: Uses shadcn/ui components with Tailwind CSS for consistent styling across sub-sites.

## Technical Stack

- **Framework**: Next.js 15.2.4 with App Router
- **React**: v19 with TypeScript
- **Styling**: Tailwind CSS 4.1.9 with shadcn/ui components
- **Icons**: Lucide React
- **Fonts**: Geist Sans & Mono
- **Analytics**: Vercel Analytics
- **Package Manager**: pnpm
- **Deployment**: Vercel (auto-synced with v0.app)

## Sub-Site Development

### Adding New Sub-Sites

1. Create component in `components/sub-sites/[name].tsx`
2. Add entry to sites array in both `app/page.tsx` and `components/app-sidebar.tsx`
3. Each sub-site should be self-contained with its own state management

### Sub-Site Patterns

**SCAMPI Deep Dive**: Searchable field guide with collapsible cards and keyboard shortcuts (`/` for search, `Esc` to clear)

**Daily Canvas**: Tabbed interface with command bar (`/` key), grid toggle (`g` key), and test overlay (`t` key)

**Command Bar Pattern**: Several sub-sites implement command bars activated with `/` key for quick actions and navigation

## Configuration Notes

### Next.js Config
- ESLint and TypeScript errors ignored during builds (configured for rapid prototyping)
- Image optimization disabled
- Tailwind CSS configured with shadcn/ui presets

### TypeScript
- Path aliases: `@/*` maps to project root
- Strict mode enabled
- Target ES6 for broader compatibility

### V0.app Integration
- Repository auto-syncs with v0.app deployments
- Changes made in v0.app interface automatically push to this repo
- Continue building at: https://v0.app/chat/projects/D4ysNWrRKsD

## Development Guidelines

### Component Philosophy
Follow the "FLOAT" principles documented in the SCAMPI sub-site:
- **Build shacks, not cathedrals**: Small, adaptable structures
- **Modular mysticism**: Components can coexist without canonization pressure
- **Context over categories**: Prioritize context-rich implementations

### Keyboard Interaction
Most sub-sites implement keyboard shortcuts:
- `/` - Open command bar or search
- `Esc` - Close overlays/clear search  
- `←/→` - Navigate tabs (where applicable)
- `g` - Toggle grid views (in Canvas)
- `t` - Toggle test overlays (in Canvas)

### Styling Patterns
- Dark theme as default with muted color palette
- Consistent use of `text-zinc-300` for secondary text
- `text-cyan-400` for primary accents
- Hover states with `hover:text-primary` transitions

## Command Bar Analysis

The project includes detailed analysis in `docs/COMMAND_BAR_ANALYSIS.md` for implementing global command bars. Consider this for future enhancements to create platform-wide shortcuts and actions.

## Deployment

Project is live at: https://vercel.com/evan-schultzs-projects/v0-next-js-sidebar-app

Changes deploy automatically through:
1. v0.app interface modifications → auto-push to repo
2. Vercel deploys latest from main branch
3. Manual git pushes also trigger deployments