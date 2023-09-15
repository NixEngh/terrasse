import WeekView from "@/components/WeekView";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center w-11/12 h-full max-w-6xl p-5 my-6 bg-white rounded-xl max-h-[72rem]">
      <h1 className="text-2xl text-center">Kalender</h1>
      <WeekView startDate={new Date}/>
    </div>
  );
}
