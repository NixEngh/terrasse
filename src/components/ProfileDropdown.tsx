"use client";

import { Session } from "next-auth";
import { useRef, useState } from "react";
import ColorSelector from "./ColorSelector";
import { cn } from "@/lib/utils";
import Spinner from "./Spinner";

interface Props {
  session: Session | null;
}

const ProfileDropdown = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  if (!session) {
    return <Spinner/>;
  }

  return (
    <div className="">
      <button className="" onClick={() => setIsOpen(!isOpen)}>
        <p className="">
          Innstillinger{" "}
          {session.user.image && (
            <img
              className={cn("inline-block h-6 transition-transform duration-75 rounded-full", {"rotate-90": isOpen})}
              src={session.user.image}
              alt="avatar"
            />
          )}
        </p>
      </button>
      {isOpen && (
        <ol className="absolute z-10 p-3 bg-white border rounded-md right-8 w-60 transition-opacity duration-75">
          <li>
            <h4 className="text-md">Innstillinger</h4>
          </li>
          <div className="w-full h-px my-2 bg-slate-300"></div>
          <li>
            <h5 className="mb-3 text-sm font-light">Farge</h5>
            <ColorSelector />
          </li>
        </ol>
      )}
    </div>
  );
};

export default ProfileDropdown;
