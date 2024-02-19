import { Settings } from "@/modules/user/ui";
import { useSupabaseServer } from "@/modules/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-dvh grid items-center">
      <Settings userId={user.id} />
    </div>
  );
}
