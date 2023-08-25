import FetchTestButton from "@/components/FetchTestButton";
import WeekView from "@/components/WeekView";

export default function HomePage() {
  return (
    <div className="bg-white rounded-xl flex flex-col items-center w-11/12 p-5 min-h-[500px] max-w-5xl">
      <h1 className="text-2xl text-center">Kalender</h1>
      <FetchTestButton/>
      <WeekView />
    </div>
  );
}
