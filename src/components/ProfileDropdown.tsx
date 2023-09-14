"use client";

import { Session } from "next-auth";
import { useState } from "react";
import ColorSelector from "./ColorSelector";

interface Props {
  session: Session | null;
}

const ProfileDropdown = ({ session }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!session) {
    return <div></div>;
  }

  return (
    <div>
      <button onClick={() => setIsOpen(!isOpen)}>
        <p className="">
          Hei {session.user.name || session.user.email}!{" "}
          {session.user.image && (
            <img
              className="inline-block h-6 rounded-full"
              src={session.user.image}
              alt="avatar"
            />
          )}
        </p>
      </button>
      {isOpen && (
        <ol className="absolute p-3 bg-white border rounded-md right-8 w-60">
          <li>
            <h4 className="text-md">Innstillinger</h4>
          </li>
          <div className="w-full h-px my-2 bg-slate-300"></div>
          <li>
            <h5 className="text-sm font-light">
              Farge
            </h5>
            <ColorSelector/>
          </li>
        </ol>
      )}
    </div>
  );
};

export default ProfileDropdown;
