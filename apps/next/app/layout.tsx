import { cn } from "@/lib/utils";
import { Schibsted_Grotesk as FontSans } from "next/font/google";
import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://supabase-modules-demo.vercel.app/"),
  title: "The Playground",
  description: "Supabase Modules - Build smarter with pre-built modules today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background flex min-h-dvh flex-col font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <nav className="bg-muted/80 sticky top-0 z-20 h-24 w-full backdrop-blur-lg" />
          <main className="z-10 p-4">{children}</main>
          <footer className="bg-muted/80 bottom-0 mt-auto h-48 w-full backdrop-blur-lg" />
        </Providers>
      </body>
    </html>
  );
}
