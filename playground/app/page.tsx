import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-y-8 py-24">
      <header className="space-y-2 text-center">
        <h2 className="text-6xl font-bold tracking-tight">Supabase Modules</h2>
        <p className="text-xl text-muted-foreground">
          Build smarter with pre-built modules today
        </p>
      </header>
      <footer className="w-full">
        <Link href="/login" className="w-full">
          <Button className="w-full">Sign in</Button>
        </Link>
        <Link href="/register" className="w-full">
          <Button variant="link" className="w-full">
            Create an account
          </Button>
        </Link>
      </footer>
    </div>
  );
}
