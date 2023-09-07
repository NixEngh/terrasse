import { getDayReservations } from "@/lib/queries/reservations";
import CalendarDay from "./CalendarDay";

interface Props {
  startDate: Date;
}

export default function WeekView({ startDate }: Props) {

  const dates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const dateToAdd = new Date(startDate);
    dateToAdd.setDate(dateToAdd.getDate() + i);
    dateToAdd.setHours(0, 0, 0, 0);
    dates.push(dateToAdd);
  }

  return (
    <div className="flex flex-wrap items-center justify-around h-full w-full md:flex-nowrap">
      {dates.map(async (date) => {
        
        return <CalendarDay date={date} key={date.toISOString()} initialEvents={await getDayReservations(date)}/>;
      })}
    </div>
  );
}
