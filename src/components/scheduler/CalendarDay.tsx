"use client";

import { reservationWithUserData } from "@/lib/queries/reservations";
import { cn } from "@/lib/utils";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRef } from "react";
import ReservationForm from "../reservationForm";
import CalendarEvent from "./CalendarEvent";
import { weekdays } from "@/lib/times";

interface Props {
  date: Date;
  initialEvents: reservationWithUserData[];
  startOrEnd?: "start" | "end";
}

export default function CalendarDay({
  date,
  initialEvents,
  startOrEnd,
}: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const weekday = date.getDay();
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  return (
    <>
      <div
        className={cn(
          "flex flex-col items-center justify-center w-32 h-32 px-2 py-0 overflow-hidden transition-colors bg-white border rounded-2xl",
          "md:border-l-transparent md:border-y-0 md:bg-transparent md:border-gray-200 md:rounded-none md:justify-start md:flex-grow md:h-full",
          "hover:border-sky-700 hover:border-x",
          {
            "md:border-r-transparent": startOrEnd === "end",
            "md:border-l-transparent": startOrEnd === "start",
          }
        )}
        onClick={() => modalRef.current?.showModal()}
      >
        <p className="text-xl text-sky-700 md:hidden">{date.getDate()}.</p>
        <p className="text-gray-600 select-none text-md md:hidden">
          {weekdays[weekday]}
        </p>

        <div className="relative hidden w-full h-full md:block">
          <ol>
            {initialEvents.map((event, index) => {
              // Filter out events that are not on this day (due to timezone differences)
              if (
                event.to < startOfDay ||
                event.from > endOfDay
              ) {
                return null;
              }
              return (
                <li key={index}>
                  <CalendarEvent event={event} dateToRender={date} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
      <dialog
        ref={modalRef}
        className="p-0 outline-none"
        onClick={(e) => {
          if (modalRef.current?.open) {
            modalRef.current?.close();
          }
        }}
      >
        <div className="absolute p-2 border-none rounded-md hover:border-black top-3 left-3">
          <Cross1Icon onClick={() => modalRef.current?.close()} />
        </div>
        <ReservationForm date={date} />
      </dialog>
    </>
  );
}
