"use client";

import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

interface Props {
  className?: string;
  callBackUrl?: string;
}

export default function DiscordButton({ className, callBackUrl }: Props) {
  return (
    <button
      className={cn(
        "bg-indigo-400 text-white hover:bg-white hover:text-indigo-400 border-2 border-indigo-400 transition-colors p-5 shadow-lg rounded-md",
        className
      )} 
      onClick={() =>
        signIn(
          "discord",
          { callbackUrl: callBackUrl ?? "/home" },
          { prompt: "none" }
        )
      }
    >
      Logg inn med discord!
    </button>
  );
}
