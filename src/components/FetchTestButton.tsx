"use client";

import { BookingSchema } from "@/app/api/bookings/route";
import { useState } from "react";

export default function FetchTestButton() {
  const data: BookingSchema = {
    startTime: new Date("2023-08-30T15:01"),
    endTime: new Date("2023-08-30T17:00"),
  };

  const [result, setResult] = useState<string|null>(null)

  const handler = async () => {
    console.log(JSON.stringify(data))
    const response = await fetch("api/bookings", {
      method: "POST",
      body: JSON.stringify(data),
    });
    setResult(await response.text());

  };

  return <button className="w-20 text-white bg-slate-600 rounded-xl hover:bg-slate-400" onClick={handler}>
    {result || "Test"}
  </button>;
}
