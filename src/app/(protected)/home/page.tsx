import CalendarContainer from "@/components/scheduler/CalendarContainer";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-11/12 max-w-6xl h-full p-5 my-6 bg-white rounded-xl max-h-[72rem]">
      <h1 className="text-2xl text-center">Kalender</h1>
      <CalendarContainer startDate={new Date} numberOfDays={7}/>
    </div>
  );
}
