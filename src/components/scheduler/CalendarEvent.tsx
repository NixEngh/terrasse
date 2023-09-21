"use client";

import { reservationWithUserData } from "@/lib/queries/reservations";
import { timeToString } from "@/lib/times";
import { cn } from "@/lib/utils";
import { useRef } from "react";

interface Props {
  event: reservationWithUserData;
  dateToRender: Date;
}

const CalendarEvent = ({ event, dateToRender }: Props) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const startsBefore = event.from.getDate() < dateToRender.getDate();
  const endsAfter = event.to.getDate() > dateToRender.getDate();

  const getAbsolutePosition = (time: Date): string => {
    // If the time is before the date to render, return 0%
    if (time.getDate() < dateToRender.getDate()) {
      return "0%";
    }
    // If the time is after the date to render, return 100%
    if (time.getDate() > dateToRender.getDate()) {
      return "100%";
    }
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
          "absolute hidden flex-col items-center justify-center w-10/12 p-2 text-center text-white break-words rounded-md left-0 right-0 mx-auto",
          `bg-${event.User.profileColor}-primary`,
          {
            flex:
              getAbsolutePosition(event.from) !== "100%" &&
              getAbsolutePosition(event.to) !== "0%",
            "rounded-t-none": startsBefore,
            "rounded-b-none": endsAfter,
          }
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
        {!endsAfter && (
          <p className="absolute bottom-0 px-2 text-sm font-light bg-black rounded-md translate-y-2/3">
            {timeStrings.from} - {timeStrings.to}
          </p>
        )}
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
          <img
            className={cn(
              "w-20 h-20 rounded-full border-4 select-none",
              `border-${event.User.profileColor}-primary`
            )}
            src={event.User.image ?? undefined}
          />
          <h3 className="text-2xl">{event.User.name}</h3>
          <div className="h-px w-4/5 bg-slate-400" />
          <p className="text-lg">
            {event.from.getDate()}
            {event.to.getDate() === event.from.getDate()
              ? ""
              : `. - ${event.to.getDate()}`}
            .
          </p>
          <p>
            Booket fra kl {timeStrings.from} til {timeStrings.to}
          </p>
        </div>
      </dialog>
    </>
  );
};

export default CalendarEvent;
