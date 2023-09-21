import { getDayReservations } from "@/lib/queries/reservations";
import { timeToString, weekdays } from "@/lib/times";
import CalendarDay from "./CalendarDay";

export const renderHourMarks = () => {
  const hourMarks = [];
  for (let hour = 0; hour < 24; hour++) {
    hourMarks.push(
      <div
        className="absolute hidden w-full md:block"
        style={{
          top: `${(hour * 100) / 24}%`,
        }}
        key={hour}
      >
        <span className="relative text-xs text-gray-600 select-none -top-3 -left-3">
          {timeToString(hour)}:00
        </span>
        <div className="absolute right-0 z-0 inline-block h-px bg-gray-400 left-5" />
      </div>
    );
  }
  hourMarks.push(
    <div
      className="absolute hidden w-full h-px bg-gray-400 md:block"
      style={{ top: "100%" }}
      key={24}
    />
  );
  return hourMarks;
};

interface Props {
  startDate: Date;
  numberOfDays: number;
}

export default function CalendarContainer({ startDate, numberOfDays }: Props) {
  const dates: Date[] = [];

  for (let i = 0; i < numberOfDays; i++) {
    const dateToAdd = new Date(startDate);
    dateToAdd.setDate(dateToAdd.getDate() + i);
    dateToAdd.setHours(0, 0, 0, 0);
    dates.push(dateToAdd);
  }

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="hidden mb-3 ml-5 md:flex">
        {dates.map((date) => (
          <div className="flex flex-col items-center flex-grow">
            <p className="text-xl text-sky-700">
              {date.getDate()}.
            </p>
            <p className="text-gray-600 select-none text-md">
              {weekdays[date.getDay()]}
            </p>
          </div>
        ))}
      </div>
      <div className="relative flex-grow">
        {renderHourMarks()}
        <div className="absolute top-0 bottom-0 right-0 flex flex-wrap items-center justify-around md:flex-nowrap left-5">
          {dates.map(async (date, index) => {
            return (
              <CalendarDay
                date={date}
                key={date.toISOString()}
                initialEvents={await getDayReservations(date)}
                startOrEnd={
                  index === 0
                    ? "start"
                    : index === dates.length - 1
                    ? "end"
                    : undefined
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
