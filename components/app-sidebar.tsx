"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Terminal,
  Sparkles,
  Zap,
  Home,
  ChevronRight,
  ChevronDown,
  Search,
  Menu,
  X,
  PanelsTopLeft,
  Palette,
  Network,
  GitBranch,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const sites = [
  {
    id: "queer-zine",
    name: "Queer Zine",
    icon: BookOpen,
    description: "Publishing house",
    imprints: [
      { id: "techcraft", name: "TechCraft", color: "cyan", dispatchCount: 3 },
      { id: "infra-archaeology", name: "Infrastructure Archaeology", color: "violet", dispatchCount: 2 },
      { id: "ritual-studies", name: "Ritual Studies", color: "fuchsia", dispatchCount: 4 },
      { id: "oracle-crosstalk", name: "Oracle Crosstalk", color: "orange", dispatchCount: 1 },
      { id: "identity", name: "Identity", color: "emerald", dispatchCount: 3 },
    ],
  },
  {
    id: "scampi-deep-dive",
    name: "SCAMPI Deep Dive",
    icon: Terminal,
    description: "Field guide to FLOAT",
  },
  {
    id: "four-rs",
    name: "The Four Rs",
    icon: Zap,
    description: "Development methodology",
  },
  {
    id: "daily-canvas",
    name: "Daily Canvas",
    icon: PanelsTopLeft,
    description: "Unified productivity dashboard",
  },
  {
    id: "design-system",
    name: "Design System",
    icon: Palette,
    description: "FLOAT UI playground",
  },
  {
    id: "ast-viewer",
    name: "AST Viewer",
    icon: Network,
    description: "Cognitive tree visualization",
  },
  {
    id: "ast-prompts",
    name: "AST Prompts",
    icon: GitBranch,
    description: "Structured prompt engineering",
  },
  {
    id: "sysop-dashboard",
    name: "Sysop Dashboard",
    icon: Terminal,
    description: "BBS-style conversation AST viewer",
  },
]

const recentDispatches = [
  {
    id: "float-evolution",
    title: "FLOAT: Evolution & Archaeology",
    imprint: "Ritual Studies",
    date: "2025-10-11",
    color: "fuchsia",
  },
  {
    id: "float-architecture",
    title: "FLOAT: Architecture & Learning Path",
    imprint: "Ritual Studies",
    date: "2025-10-11",
    color: "fuchsia",
  },
  {
    id: "float-infrastructure",
    title: "FLOAT: Consciousness Technology Infrastructure",
    imprint: "Ritual Studies",
    date: "2025-10-11",
    color: "fuchsia",
  },
  {
    id: "cult-not-robot",
    title: "Cult of Not a Robot: Origin Archaeology",
    imprint: "Identity",
    date: "2025-10-07",
    color: "emerald",
  },
  { id: "double-autism", title: "Double Autism Theory", imprint: "Identity", date: "2025-10-07", color: "emerald" },
]

const fieldGuides = [
  { id: "grounding", name: "Grounding Rituals", icon: Sparkles },
  { id: "boundaries", name: "Boundary Scripts", icon: Sparkles },
  { id: "recovery", name: "Recovery Protocols", icon: Sparkles },
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(true)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [expandedSites, setExpandedSites] = React.useState<Set<string>>(new Set(["queer-zine"]))
  const [expandedSections, setExpandedSections] = React.useState<Set<string>>(new Set(["sites", "recent"]))

  const toggleSite = (siteId: string) => {
    setExpandedSites((prev) => {
      const next = new Set(prev)
      if (next.has(siteId)) {
        next.delete(siteId)
      } else {
        next.add(siteId)
      }
      return next
    })
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev)
      if (next.has(sectionId)) {
        next.delete(sectionId)
      } else {
        next.add(sectionId)
      }
      return next
    })
  }

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:text-primary transition-colors">
          <Home className="h-5 w-5" />
          {isOpen && <span>FLOAT Platform</span>}
        </Link>
      </div>

      {/* Search */}
      {isOpen && (
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search sites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {isOpen && (
          <div>
            <button
              onClick={() => toggleSection("recent")}
              className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 hover:text-foreground transition-colors w-full"
            >
              <Clock className="h-3 w-3" />
              <span className="flex-1 text-left">Recent Dispatches</span>
              {expandedSections.has("recent") ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
            {expandedSections.has("recent") && (
              <div className="space-y-1 ml-5">
                {recentDispatches.map((dispatch) => (
                  <Link
                    key={dispatch.id}
                    href={`/sites/queer-zine#${dispatch.id}`}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-2 py-1.5 rounded-md text-xs hover:bg-accent transition-colors"
                  >
                    <div className="font-medium truncate">{dispatch.title}</div>
                    <div className="text-[10px] text-muted-foreground flex items-center gap-2 mt-0.5">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full",
                          dispatch.color === "fuchsia" && "bg-fuchsia-500",
                          dispatch.color === "emerald" && "bg-emerald-500",
                          dispatch.color === "cyan" && "bg-cyan-500",
                        )}
                      />
                      <span>{dispatch.imprint}</span>
                      <span>·</span>
                      <span>{dispatch.date}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        <div>
          {isOpen && (
            <button
              onClick={() => toggleSection("sites")}
              className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 hover:text-foreground transition-colors w-full"
            >
              <PanelsTopLeft className="h-3 w-3" />
              <span className="flex-1 text-left">Sites</span>
              {expandedSections.has("sites") ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
          )}
          {(!isOpen || expandedSections.has("sites")) && (
            <div className="space-y-1">
              {filteredSites.map((site) => {
                const Icon = site.icon
                const isActive = pathname.includes(site.id)
                const isExpanded = expandedSites.has(site.id)
                const hasImprints = site.imprints && site.imprints.length > 0

                return (
                  <div key={site.id}>
                    <div className="flex items-center gap-1">
                      {hasImprints && isOpen && (
                        <button
                          onClick={() => toggleSite(site.id)}
                          className="p-1 hover:bg-accent rounded transition-colors"
                        >
                          {isExpanded ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
                        </button>
                      )}
                      <Link
                        href={`/sites/${site.id}`}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition-all flex-1",
                          "hover:bg-accent hover:text-accent-foreground",
                          isActive && "bg-accent text-accent-foreground font-medium",
                          !hasImprints && isOpen && "ml-6",
                        )}
                      >
                        <Icon className="h-4 w-4 flex-shrink-0" />
                        {isOpen && (
                          <div className="flex-1 min-w-0">
                            <div className="font-medium truncate text-sm">{site.name}</div>
                            <div className="text-[10px] text-muted-foreground truncate">{site.description}</div>
                          </div>
                        )}
                      </Link>
                    </div>

                    {hasImprints && isExpanded && isOpen && (
                      <div className="ml-9 mt-1 space-y-1 border-l-2 border-border pl-3">
                        {site.imprints.map((imprint) => (
                          <Link
                            key={imprint.id}
                            href={`/sites/queer-zine#${imprint.id}`}
                            onClick={() => setIsMobileOpen(false)}
                            className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs hover:bg-accent transition-colors"
                          >
                            <span
                              className={cn(
                                "w-2 h-2 rounded-full flex-shrink-0",
                                imprint.color === "cyan" && "bg-cyan-500",
                                imprint.color === "violet" && "bg-violet-500",
                                imprint.color === "fuchsia" && "bg-fuchsia-500",
                                imprint.color === "orange" && "bg-orange-500",
                                imprint.color === "emerald" && "bg-emerald-500",
                              )}
                            />
                            <span className="flex-1 truncate">{imprint.name}</span>
                            <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4">
                              {imprint.dispatchCount}
                            </Badge>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {isOpen && (
          <div>
            <button
              onClick={() => toggleSection("guides")}
              className="flex items-center gap-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 hover:text-foreground transition-colors w-full"
            >
              <Sparkles className="h-3 w-3" />
              <span className="flex-1 text-left">Field Guides</span>
              {expandedSections.has("guides") ? (
                <ChevronDown className="h-3 w-3" />
              ) : (
                <ChevronRight className="h-3 w-3" />
              )}
            </button>
            {expandedSections.has("guides") && (
              <div className="space-y-1 ml-5">
                {fieldGuides.map((guide) => {
                  const Icon = guide.icon
                  return (
                    <Link
                      key={guide.id}
                      href={`/sites/queer-zine#guide-${guide.id}`}
                      onClick={() => setIsMobileOpen(false)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs hover:bg-accent transition-colors"
                    >
                      <Icon className="h-3 w-3" />
                      <span className="truncate">{guide.name}</span>
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)} className="w-full justify-start">
          <Menu className="h-4 w-4" />
          {isOpen && <span className="ml-2">Collapse</span>}
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden bg-transparent"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-card border-r border-border transition-all duration-300",
          isOpen ? "w-64" : "w-16",
          isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
