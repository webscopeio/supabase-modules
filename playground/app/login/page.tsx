import { useSupabaseServer } from "@/modules/utils/supabase-server";
import { cookies } from "next/headers";

export default async function Login() {
  const supabase = useSupabaseServer({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="space-y-4">
      <h1 className="font-semibold text-4xl tracking-tight">Login</h1>
      <code>{JSON.stringify(user)}</code>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, asperiores
        corrupti aliquid doloremque iste laudantium accusantium porro obcaecati
        esse quod. Aliquam exercitationem impedit minima quia nesciunt iste
        magni non? Labore!
      </p>
    </div>
  );
}
