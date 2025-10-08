"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Dithering } from "@paper-design/shaders-react"
import { useEffect } from "react"

export function HeroWithDithering() {
  useEffect(() => {
    const handleError = (e: ErrorEvent) => {
      if (e.message.includes("ResizeObserver loop")) {
        e.stopImmediatePropagation()
      }
    }
    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  return (
    <div className="border-b border-border relative overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* Left side - Content */}
        <div className="w-full md:w-1/2 container mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-balance">FLOAT Multi-Site Platform</h1>
            <p className="text-xl text-muted-foreground mb-8 text-pretty">
              A modular container for self-contained sub-sites. Each section maintains its own functionality, styles,
              and content while seamlessly integrating into a unified navigation experience.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/sites/scampi-deep-dive">
                  Explore Sites
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#sites">View All</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Right side - Dithering Effect */}
        <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative">
          <Dithering
            style={{ height: "100%", width: "100%" }}
            colorBack="hsl(0, 0%, 0%)"
            colorFront="hsl(160, 100%, 50%)"
            shape="circle"
            type="4x4"
            pxSize={3}
            offsetX={0}
            offsetY={0}
            scale={1.2}
            rotation={0}
            speed={0.15}
          />
        </div>
      </div>
    </div>
  )
}
