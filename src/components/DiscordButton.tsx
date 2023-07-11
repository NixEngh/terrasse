"use client";

import { signIn } from "next-auth/react";

export default function DiscordButton() {
  return (
    <button
      className="text bg-indigo-400 text-white hover:bg-white hover:text-indigo-400 border-2 border-indigo-400 p-5 rounded-lg transition-colors"
      onClick={() =>
        signIn("discord", { callbackUrl: "/home" }, { prompt: "none" })
      }
    >
      Logg inn med discord!
    </button>
  );
}
