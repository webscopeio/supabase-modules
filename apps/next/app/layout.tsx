import type { Metadata } from "next"
import { Schibsted_Grotesk as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

import { Providers } from "./providers"

import "./globals.css"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://supabase-modules-demo.vercel.app/"),
  title: "The Playground",
  description: "Supabase Modules - Build smarter with pre-built modules today",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-dvh flex-col bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <nav className="sticky top-0 z-20 h-24 w-full bg-muted/80 backdrop-blur-lg" />
          <main className="z-10 p-4">{children}</main>
          <footer className="bottom-0 mt-auto h-48 w-full bg-muted/80 backdrop-blur-lg" />
        </Providers>
      </body>
    </html>
  )
}
