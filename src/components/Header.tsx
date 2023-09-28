import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";
import DiscordButton from "./DiscordButton";

export default async function Header() {
  const session = await getAuthSession();

  return (
    <header className="flex items-center justify-between w-full bg-white p-5 border">
      <Link
        href="/"
        className="text-xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-cyan-900 via-purple-900 to-teal-950"
      >
        TERRASSE83
      </Link>

      {session ? <ProfileDropdown session={session} /> : <DiscordButton className="h-10"/>}
    </header>
  );
}
