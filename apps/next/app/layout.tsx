import type { Metadata } from "next";
import { Schibsted_Grotesk as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

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
          "bg-background min-h-dvh font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <main className="mx-auto max-w-xl px-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
