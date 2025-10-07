import type React from "react"
import { Suspense } from "react"
import { AppSidebar } from "@/components/app-sidebar"

function SidebarFallback() {
  return (
    <aside className="fixed top-0 left-0 z-40 h-screen w-64 bg-card border-r border-border">
      <div className="p-4 border-b border-border">
        <div className="h-6 w-32 bg-muted animate-pulse rounded" />
      </div>
    </aside>
  )
}

export default function SitesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <Suspense fallback={<SidebarFallback />}>
        <AppSidebar />
      </Suspense>
      <main className="flex-1 md:ml-64 transition-all duration-300">{children}</main>
    </div>
  )
}
