import { getAuthSession } from "@/lib/auth";
import Link from "next/link";

export default async function Header() {
  const session = await getAuthSession();

  return (
    <header className="flex justify-between w-full bg-white p-5 border">
      <Link href="/home" className="text-xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-cyan-900 via-purple-900 to-teal-950">
        TERRASSE83
      </Link>

      {session?.user.name || session?.user.email}

      <Link href="/profile">din side</Link>
    </header>
  );
}
