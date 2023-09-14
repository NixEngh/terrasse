"use client";

import { reservationWithUserData } from "@/lib/queries/reservations";
import { weekdays } from "@/lib/times";
import { useRef } from "react";
import ReservationForm from "./reservationForm";
import CalendarEvent from "./CalendarEvent";
import { Cross1Icon } from "@radix-ui/react-icons";
interface Props {
  date: Date;
  initialEvents: reservationWithUserData[];
}

export default function CalendarDay({ date, initialEvents }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const weekday = date.getDay();

  const renderHourMarks = () => {
    const hourMarks = [];
    for (let hour = 0; hour < 25; hour++) {
      hourMarks.push(
        <div
          className="absolute w-full "
          style={{
            top: `${(hour * 100) / 24}%`,
          }}
          key={hour}
        >
          <span className="relative text-xs text-gray-600 select-none -top-3">
            {hour}
          </span>
          <div className="absolute inline-block h-px bg-gray-400 right-1 left-5" />
        </div>
      );
    }
    return hourMarks;
  };

  return (
    <>
      <div
        className="flex flex-col items-center justify-center w-32 h-32 p-2 overflow-hidden transition-colors bg-white border border-gray md:border-white md:justify-start md:flex-grow md:h-full rounded-2xl hover:border-sky-700"
        onClick={() => modalRef.current?.showModal()}
      >
        <span>{weekdays[weekday].slice(0, 3)}</span>
        <div className="relative hidden w-full h-full my-3 md:block">
          {renderHourMarks()}
          <ol>
            {initialEvents.map((event, index) => (
              <li key={index}>
                <CalendarEvent event={event} />
              </li>
            ))}
          </ol>
        </div>
      </div>
      <dialog ref={modalRef} className="p-3">
        <div className="absolute p-2 border border-transparent hover:border-slate-300 rounded-md top-3 left-3">
          <Cross1Icon onClick={() => modalRef.current?.close()} />
        </div>
        <ReservationForm date={date} />
      </dialog>
    </>
  );
}
