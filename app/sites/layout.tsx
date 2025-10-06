import type React from "react"
import { AppSidebar } from "@/components/app-sidebar"

export default function SitesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="flex-1 md:ml-64 transition-all duration-300">{children}</main>
    </div>
  )
}
