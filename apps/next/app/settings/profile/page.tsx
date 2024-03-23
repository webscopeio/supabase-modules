import { cookies } from "next/headers";
import { ProfileForm } from "@/components/user/profile-form";
import { redirect } from "next/navigation";
import { useSupabaseServer } from "@/modules/utils/server";

export default async function Page() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <ProfileForm userId={user.id} />;
}
