import { weekdays } from "@/lib/times";
import CalendarDay from "./CalendarDay";

export default function WeekView() {

    return (
        <div className="flex flex-wrap items-center justify-around h-full w-full md:flex-nowrap">
            {weekdays.map(weekday => (
                <CalendarDay weekday={weekday} initialEvents={[{startTime:"15:00", endTime:"19:00", title:"yeet"}]}/>
            ))}
        </div>
    );
}
