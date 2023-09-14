import FetchTestButton from "@/components/FetchTestButton";
import WeekView from "@/components/WeekView";

export default function HomePage() {
  return (
    <div className="bg-white rounded-xl flex flex-col items-center w-11/12 p-5 h-full my-6 max-w-6xl">
      <h1 className="text-2xl text-center">Kalender</h1>
      <WeekView startDate={new Date}/>
    </div>
  );
}
