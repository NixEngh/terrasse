import Calendar from "@/components/Calendar";

export default function HomePage() {
  return (
    <div className="bg-white rounded-xl flex flex-col justify-center items-center w-11/12 p-5 max-w-2xl">
      <h1 className="text-2xl text-center">Kalender</h1>
      <Calendar />
    </div>
  );
}
