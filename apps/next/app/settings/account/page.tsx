import { AccountForm } from "@/components/user/account-form";
import { useSupabaseServer } from "@/modules/utils/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !user.email) {
    redirect("/login");
  }

  return (
    <div className="min-h-dvh grid items-center">
      <AccountForm userEmail={user.email} />
    </div>
  );
}
