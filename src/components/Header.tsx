import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between w-full bg-white p-5 border">
      <h1 className="text-xl text-transparent font-extrabold bg-clip-text bg-gradient-to-r from-cyan-900 via-purple-900 to-teal-950">
        TERRASSE83
      </h1>
      <Link href="/profile">din side</Link>
    </header>
  );
}
