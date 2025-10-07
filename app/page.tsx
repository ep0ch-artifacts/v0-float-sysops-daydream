import Link from "next/link"
import { BookOpen, Terminal, Sparkles, Zap, ChevronRight, PanelsTopLeft, Palette, Network } from "lucide-react"
import { HeroWithDithering } from "@/components/hero-with-dithering"

export default function HomePage() {
  const sites = [
    {
      id: "scampi-deep-dive",
      name: "SCAMPI Deep Dive",
      description: "A living field guide to FLOAT: liminal cognition, ritual architecture, and personas",
      icon: Terminal,
      color: "cyan",
      tags: ["Field Guide", "Patterns", "Architecture"],
    },
    {
      id: "queer-zine",
      name: "Queer Zine",
      description: "Publishing house for impossible tenderness - dispatches, imprints, and field guides",
      icon: BookOpen,
      color: "emerald",
      tags: ["Zine", "Dispatches", "Culture"],
    },
    {
      id: "queer-zine-alt",
      name: "Queer Zine (Deep Link)",
      description: "Alternative zine interface with deep-linking and related content discovery",
      icon: Sparkles,
      color: "fuchsia",
      tags: ["Zine", "Navigation", "Discovery"],
    },
    {
      id: "four-rs",
      name: "The Four Rs",
      description: "Rot → Rebuild → Ritualize → Remix: FLOAT development methodology",
      icon: Zap,
      color: "orange",
      tags: ["Methodology", "Process", "Philosophy"],
    },
    {
      id: "daily-canvas",
      name: "Daily Canvas",
      description: "Unified productivity dashboard with session tracking, daily logs, and workflow visualization",
      icon: PanelsTopLeft,
      color: "emerald",
      tags: ["Productivity", "Tracking", "Workflow"],
    },
    {
      id: "design-system",
      name: "Design System",
      description: "Interactive FLOAT UI playground with tokens, components, and ritual grammar parsing",
      icon: Palette,
      color: "purple",
      tags: ["Design", "Components", "Tokens"],
    },
    {
      id: "ast-viewer",
      name: "AST Viewer",
      description: "Cognitive prosthetic for visualizing hierarchical conversation structures and concept evolution",
      icon: Network,
      color: "emerald",
      tags: ["Visualization", "AST", "Cognition"],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <HeroWithDithering />

      {/* Sites Grid */}
      <div id="sites" className="container mx-auto px-6 py-16">
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-3">Available Sites</h2>
          <p className="text-muted-foreground">
            Navigate between different sub-sites, each with unique content and functionality
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {sites.map((site) => {
            const Icon = site.icon
            return (
              <Link
                key={site.id}
                href={`/sites/${site.id}`}
                className="group border border-border rounded-lg p-6 hover:border-primary/50 transition-all hover:shadow-lg bg-card"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{site.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{site.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {site.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 rounded-md bg-muted text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Features */}
      <div className="border-t border-border bg-muted/30">
        <div className="container mx-auto px-6 py-16">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-2">Modular Architecture</h3>
              <p className="text-sm text-muted-foreground">
                Each sub-site is self-contained with its own styles, functionality, and content
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Seamless Navigation</h3>
              <p className="text-sm text-muted-foreground">
                Collapsible sidebar with smooth transitions between sections
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Responsive Design</h3>
              <p className="text-sm text-muted-foreground">Optimized for desktop and mobile with adaptive layouts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
