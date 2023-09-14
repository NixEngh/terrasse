import { getAuthSession } from "@/lib/auth";
import Link from "next/link";
import ProfileDropdown from "./ProfileDropdown";

export default async function Header() {
  const session = await getAuthSession();
  
  return (
    <header className="flex items-center justify-between w-full bg-white p-5 border">
      <Link
        href="/home"
        className="text-xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-cyan-900 via-purple-900 to-teal-950"
      >
        TERRASSE83
      </Link>

      
      <ProfileDropdown session={session}/>

    </header>
  );
}
