"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Terminal, Sparkles, Zap, Home, ChevronRight, Search, Menu, X, PanelsTopLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const sites = [
  {
    id: "scampi-deep-dive",
    name: "SCAMPI Deep Dive",
    icon: Terminal,
    description: "Field guide to FLOAT",
  },
  {
    id: "queer-zine",
    name: "Queer Zine",
    icon: BookOpen,
    description: "Publishing house",
  },
  {
    id: "queer-zine-alt",
    name: "Queer Zine (Alt)",
    icon: Sparkles,
    description: "Deep-linked variant",
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
]

export function AppSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(true)
  const [isMobileOpen, setIsMobileOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

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
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {filteredSites.map((site) => {
            const Icon = site.icon
            const isActive = pathname.includes(site.id)

            return (
              <Link
                key={site.id}
                href={`/sites/${site.id}`}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg transition-all",
                  "hover:bg-accent hover:text-accent-foreground",
                  isActive && "bg-accent text-accent-foreground font-medium",
                )}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {isOpen && (
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{site.name}</div>
                    <div className="text-xs text-muted-foreground truncate">{site.description}</div>
                  </div>
                )}
                {isOpen && isActive && <ChevronRight className="h-4 w-4 flex-shrink-0" />}
              </Link>
            )
          })}
        </div>
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
