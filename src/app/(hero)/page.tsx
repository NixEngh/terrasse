import DiscordButton from "@/components/DiscordButton";
import { getAuthSession } from "@/lib/auth";

export default async function Login() {
  const session = await getAuthSession();

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center w-3/4 max-w-2xl bg-white rounded-md h-2/5 ">
        <h1 className="pb-3 mb-8 text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-900 to-teal-950 ">
          Terrasse83!
        </h1>
      </div>
    </main>
  );
}
