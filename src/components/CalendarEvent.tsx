"use client";

import { reservationWithUserData } from "@/lib/queries/reservations";
import { cn } from "@/lib/utils";
import { Key, useRef } from "react";

interface Props {
  event: reservationWithUserData;
}

const CalendarEvent = ({ event }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const getAbsolutePosition = (time: Date): string => {
    const [hours, minutes] = [time.getHours(), time.getMinutes()];
    return `${((hours * 60 + minutes) * 100) / (24 * 60)}%`;
  };

  return (
    <div>
      <div
        className={cn(
          "absolute flex flex-col items-center justify-center w-3/4 p-2 text-center text-white break-words rounded-md right-1",
          `bg-${event.User.profileColor}-primary`
        )}
        style={{
          top: getAbsolutePosition(event.from),
          height: `calc(${getAbsolutePosition(
            event.to
          )} - ${getAbsolutePosition(event.from)})`,
        }}
        onClick={(e) => {
          e.stopPropagation();
          modalRef.current?.showModal();
        }}
      >
        {event.User.image && (
          <img
            className="w-6 h-6 rounded-full "
            src={event.User.image}
            alt="avatar"
          />
        )}
        <p className="text-sm"></p>
        <p className="absolute bottom-0 px-2 text-sm font-light bg-black rounded-md translate-y-2/3">
          {event.from.getHours()}:{event.from.getMinutes()} -{" "}
          {event.to.getHours()}:{event.to.getMinutes()}
        </p>
      </div>
      <dialog ref={modalRef} onClick={(e) => e.stopPropagation()}>
        <h3>Booket av: {event.User.name}</h3>
        <p>Booket fra kl: {event.to.getHours()}</p>
      </dialog>
    </div>
  );
};

export default CalendarEvent;
