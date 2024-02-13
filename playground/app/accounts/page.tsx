import { useSupabaseServer } from "@/modules/utils/supabase-server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Accounts } from "./Accounts";

export default async function Page() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <Accounts userId={user.id} />;
}
