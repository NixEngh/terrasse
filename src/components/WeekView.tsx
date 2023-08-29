import { weekdays } from "@/lib/times";
import CalendarDay from "./CalendarDay";
import { User } from "@prisma/client";
import { getDayReservations, getReservations } from "@/lib/queries/reservations";

interface Props {
  startDate: Date;
}

export default function WeekView({ startDate }: Props) {
  const mockuser: User = {
    id: "12334",
    name: "Yuck",
    email: "arsoiten@oairsent.com",
    emailVerified: null,
    image: null,
    profileColor: "profileBlue",
  };

  const dates: Date[] = [];

  for (let i = 0; i < 7; i++) {
    const dateToAdd = new Date();
    dateToAdd.setDate(dateToAdd.getDate() + i);
    dateToAdd.setHours(0, 0, 0, 0);
    dates.push(dateToAdd);
  }

  return (
    <div className="flex flex-wrap items-center justify-around h-full w-full md:flex-nowrap">
      {dates.map(async (date) => {
        
        return <CalendarDay date={date}  initialEvents={await getDayReservations(date)}/>;
      })}
    </div>
  );
}
