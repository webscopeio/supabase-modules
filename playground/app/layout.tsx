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
  title: "The Playground",
  description: "Supabase Modules by Webscope.io",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers>
          <main className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
