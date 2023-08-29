"use client";

import { reservationWithUserData } from "@/lib/queries/reservations";
import { weekdays } from "@/lib/times";
import { Reservation, User } from "@prisma/client";

interface Props {
  date: Date;
  initialEvents: reservationWithUserData[];
}

export default function CalendarDay({ date, initialEvents }: Props) {
  const weekday = date.getDay();

  const getAbsolutePosition = (time: Date): string => {
    const [hours, minutes] = [time.getHours(), time.getMinutes()];
    return `${((hours * 60 + minutes) * 100) / (24 * 60)}%`;
  };

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
          <span className="relative text-xs text-gray-600 -top-3 select-none">
            {hour}
          </span>
          <div className="absolute inline-block h-px bg-gray-400 right-1 left-5" />
        </div>
      );
    }
    return hourMarks;
  };

  return (
    <div className="flex flex-col items-center justify-center w-32 h-32 p-2 transition-colors bg-white border border-gray md:border-white md:justify-start md:flex-grow md:h-full rounded-2xl hover:border-sky-700 overflow-hidden">
      <span>{weekdays[weekday].slice(0, 3)}</span>
      <span></span>
      <div className="relative hidden w-full h-full my-3 md:block">
        {renderHourMarks()}
        {initialEvents.map((event, index) => (
          <div
            key={index}
            className={`absolute w-3/4 h-px text-center text-white rounded-md right-1  bg-${event.User.profileColor}`}
            style={{
              top: getAbsolutePosition(event.from),
              height: `calc(${getAbsolutePosition(
                event.to
              )} - ${getAbsolutePosition(event.from)})`,
            }}
          >
            <h5>{event.User.name || event.User.email}</h5>
            <p className="text-sm">
              {event.from.getHours()} - {event.to.getHours()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
