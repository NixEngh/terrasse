import DiscordButton from "@/components/DiscordButton";
import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Login() {
  const session = await getAuthSession();

  if (session) {
    return redirect("/home");
  }

  return (
    <main>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-center text-6xl md:text-8xl pb-3 mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-900 to-teal-950 ">
          Terrasse83!
        </h1>
        <div className="bg-gradient-to-b from-white to-slate-200 h-2/5 w-3/4 max-w-xl rounded-3xl flex flex-col items-center justify-center">
          <h2 className="text-4xl pb-3 mb-8 font-extrabold text-transparent bg-clip-text bg-gradient-to-l from-cyan-900 to-teal-950">
            Velkommen!
          </h2>
          <div className="flex flex-col space-y-3">
            <DiscordButton />
          </div>
        </div>
      </div>
    </main>
  );
}
