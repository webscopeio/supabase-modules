import { Button } from "@/components/ui/button";
import { useSupabaseServer } from "@/modules/utils/supabase-server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/accounts");
  }

  return (
    <div className="space-y-6 py-24 min-h-screen flex flex-col justify-center">
      <header className="space-y-2 text-center">
        <h2 className="text-6xl font-bold tracking-tight">Supabase Modules</h2>
        <p className="text-xl text-muted-foreground">
          Build smarter with pre-built modules today
        </p>
      </header>
      <footer className="md:flex w-full md:w-fit max-w-md mx-auto">
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
