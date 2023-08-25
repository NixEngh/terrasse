"use client";

import { BookingSchema } from "@/app/api/bookings/route";

export default function FetchTestButton() {
  const data: BookingSchema = {
    startTime: new Date("2024-09-01T02:01"),
    endTime: new Date("2024-09-01T05:00"),
  };

  

  const handler = async () => {
    console.log(JSON.stringify(data))
    const response = await fetch("api/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    });

    console.log(response)
  };

  return <button className="w-20 text-white bg-slate-600 rounded-xl hover:bg-slate-400" onClick={handler}>
    test
  </button>;
}
