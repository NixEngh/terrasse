"use client";

import Link from "next/link";

export default function LoginButton() {
    return (
        <Link href="/" className="bg-black text-white font-bold py-2 px-4 rounded">
        Logg inn
        </Link>
    );
}