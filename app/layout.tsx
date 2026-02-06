import type React from "react"
import type { Metadata } from "next"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"
import "@/app/globals.css"

export const metadata: Metadata = {
  title: "Poton - Quantum Neural Network Simulator",
  description:
    "An interactive quantum neural network simulator combining quantum computing concepts with neural network training.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
            <footer className="border-t py-6">
              <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
                Poton — Quantum Neural Network Simulator
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
