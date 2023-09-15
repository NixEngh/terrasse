"use client";

import { reservationWithUserData } from "@/lib/queries/reservations";
import { timeToString } from "@/lib/times";
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

  const timeStrings = {
    from: `${event.from.getHours()}:${timeToString(event.from.getMinutes())}`,
    to: `${event.to.getHours()}:${timeToString(event.to.getMinutes())}`,
  };

  return (
    <>
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
        {event.User.image ? (
          <div>
            <img
              className="w-6 h-6 rounded-full "
              src={event.User.image}
              alt="avatar"
            />
            <p className="absolute left-0 right-0 mx-auto">
              {event.User.name?.charAt(0).toUpperCase()}
            </p>
          </div>
        ) : (
          <p className="">{event.User.name?.charAt(0).toUpperCase()}</p>
        )}
        <p className="absolute bottom-0 px-2 text-sm font-light bg-black rounded-md translate-y-2/3">
          {timeStrings.from} - {timeStrings.to}
        </p>
      </div>
      <dialog
        ref={modalRef}
        className="p-0 outline-none rounded-md"
        onClick={(e) => {
          e.stopPropagation();
          if (modalRef.current?.open) {
            modalRef.current?.close();
          }
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-80 h-80 flex flex-col justify-center items-center bg-slate-700 text-white gap-3"
        >
          <img className={cn("w-20 h-20 rounded-full border-4 select-none", `border-${event.User.profileColor}-primary`)} src={event.User.image??undefined} />
          <h3 className="text-2xl">{event.User.name}</h3>
          <div className="h-px w-4/5 bg-slate-400"/>
          <p>Booket fra kl {timeStrings.from} til {timeStrings.to}</p>
        </div>
      </dialog>
    </>
  );
};

export default CalendarEvent;
