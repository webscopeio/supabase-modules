import type { Metadata } from "next"
import { Schibsted_Grotesk as FontSans } from "next/font/google"

import { cn } from "@/lib/utils"

import { Providers } from "./providers"

import "./globals.css"

import type { Viewport } from "next"

import Navigation from "./navigation"

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
          <Navigation>{children}</Navigation>
        </Providers>
      </body>
    </html>
  )
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#000000" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://supabase-modules-demo.vercel.app/"),
  title: "The Playground",
  description: "Supabase Modules - Build smarter with pre-built modules today",
  appleWebApp: {
    title: "The Playground",
    capable: true,
    statusBarStyle: "black-translucent",
    startupImage: [
      "/apple-icon.png",
      {
        url: "/apple-launch-1242x2688.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/apple-launch-828x1792.png",
        media:
          "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-launch-1125x2436.png",
        media:
          "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/apple-launch-1242x2208.png",
        media:
          "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)",
      },
      {
        url: "/apple-launch-750x1334.png",
        media:
          "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-launch-2048x2732.png",
        media:
          "(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-launch-1668x2388.png",
        media:
          "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-launch-1668x2224.png",
        media:
          "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)",
      },
      {
        url: "/apple-launch-1536x2048.png",
        media:
          "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)",
      },
    ],
  },
}
