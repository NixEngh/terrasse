"use client";

import type { WeekDay } from "@/lib/times";

interface Event {
  startTime: string; // Format: 'HH:mm'
  endTime: string; // Format: 'HH:mm'
  title: string;
}

interface Props {
  weekday: WeekDay;
  initialEvents: Event[];
}
export default function CalendarDay({ weekday, initialEvents }: Props) {
  const getTopPosition = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
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
        >
          <span className="relative text-xs text-gray-600 -top-3 select-none">
            {hour}
          </span>
          <div
            key={hour}
            className="absolute inline-block h-px bg-gray-400 right-1 left-5"
          />
        </div>
      );
    }
    return hourMarks;
  };

  return (
    <div className="flex flex-col items-center justify-center w-32 h-32 p-2 transition-colors bg-white border border-gray md:border-white md:justify-start md:flex-grow md:h-full rounded-2xl hover:border-sky-700">
      <span>{weekday.slice(0, 3)}</span>
      <span></span>
      <div className="relative hidden w-full h-full my-3 md:block">
        {renderHourMarks()}
        {initialEvents.map((event) => (
          <div
            key={event.title}
            className="absolute w-3/4 h-px text-center text-white bg-blue-500 rounded-xl right-1"
            style={{
              top: getTopPosition(event.startTime),
              height: `calc(${getTopPosition(event.endTime)} - ${getTopPosition(
                event.startTime
              )})`,
            }}
          >
            <h5>{event.title}</h5>
            <p className="text-sm">{event.startTime} - {event.endTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
