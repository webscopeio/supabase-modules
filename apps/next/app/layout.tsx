import type { Metadata } from "next"
import { Schibsted_Grotesk as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

import { Providers } from "./providers"

import "./globals.css"

import { ApplicationLayout } from "@/components/application-layout"

import { createClient } from "@/modules/utils/server"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://supabase-modules-demo.vercel.app/"),
  title: "The Playground",
  description: "Supabase Modules - Build smarter with pre-built modules today",
  appleWebApp: {
    title: "The Playground",
    statusBarStyle: "default",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "flex min-h-dvh flex-col bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <ApplicationLayout userId={user?.id}>{children}</ApplicationLayout>
        </Providers>
      </body>
    </html>
  )
}
