import { Button } from "@/components/ui/button";
import { useSupabaseServer } from "@/modules/utils/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/settings");
  }

  return (
    <div className="mx-auto w-full max-w-2xl py-52">
      <div className="space-y-6">
        <header className="space-y-2 text-center">
          <h2 className="text-6xl font-bold tracking-tight">
            Supabase Modules
          </h2>
          <p className="text-muted-foreground text-xl">
            Build smarter with pre-built modules today
          </p>
        </header>
        <footer className="flex flex-col justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button variant="link">
            <Link href="/login/new">Create an account</Link>
          </Button>
        </footer>
      </div>
    </div>
  );
}
