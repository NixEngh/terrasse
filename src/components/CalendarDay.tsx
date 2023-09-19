"use client";

import { reservationWithUserData } from "@/lib/queries/reservations";
import { weekdays } from "@/lib/times";
import { Cross1Icon } from "@radix-ui/react-icons";
import { useRef } from "react";
import CalendarEvent from "./CalendarEvent";
import ReservationForm from "./reservationForm";


interface Props {
  date: Date;
  initialEvents: reservationWithUserData[];
}


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
        <div className="absolute inline-block h-px bg-gray-400 right-1 left-5 z-0" />
      </div>
    );
  }
  return hourMarks;
};

export default function CalendarDay({ date, initialEvents }: Props) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const weekday = date.getDay();


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
        <ReservationForm date={date}/>
      </dialog>
    </>
  );
}
