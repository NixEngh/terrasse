"use client";

import { BookingSchema } from "@/app/api/bookings/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Spinner from "./Spinner";
import { hours, minutes, timeToString } from "@/lib/times";
import { ReservationFormSchema, reservationFormSchema } from "@/lib/schemas";

interface Props {
  date: Date;
}

export default function ReservationForm({ date }: Props) {
  const [fetchResult, setFetchResult] = useState<{
    isError?: boolean;
    message?: string;
  }>({});

  const [fetchIsLoading, setFetchIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormSchema>({
    resolver: zodResolver(reservationFormSchema),
  });

  const onSubmit: SubmitHandler<ReservationFormSchema> = async (data) => {
    const newFromDate = new Date(date);
    const newToDate = new Date(date);

    newFromDate.setHours(data.from.hours, data.from.minutes);
    newToDate.setHours(data.to.hours, data.to.minutes);

    const newData: BookingSchema = {
      startTime: newFromDate,
      endTime: newToDate,
    };

    try {
      setFetchIsLoading(true);
      const response = await fetch("api/bookings", {
        method: "POST",
        body: JSON.stringify(newData),
      });

      setFetchIsLoading(false);
      const res = await response.text();
      if (!response.ok) throw res;

      setFetchResult({ isError: false, message: "success!" });
    } catch (e) {
      console.log(e);
      setFetchResult({ isError: true, message: e as string });
      setFetchIsLoading(false);
      return null;
    }
  };

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-3 p-3"
    >
      <h3 className="mb-3 text-center">Velg tid</h3>
      <div className="flex w-80">
        <p className="w-14">Fra kl:</p>
        <select
          {...register("from.hours")}
          id="hoursfrom"
          className="flex-grow mx-2"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {timeToString(hour)}
            </option>
          ))}
        </select>
        :
        <select
          {...register("from.minutes")}
          id="minutesfrom"
          className="flex-grow mx-2"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {timeToString(minute)}
            </option>
          ))}
        </select>
      </div>
      <p className="text-red-600">{errors.from?.hours?.message}</p>
      <p className="text-red-600">{errors.from?.minutes?.message}</p>
      <div className="flex w-80">
        <p className="w-14">Til kl:</p>
        <select
          {...register("to.hours")}
          id="hoursto"
          className="flex-grow mx-2"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {timeToString(hour)}
            </option>
          ))}
        </select>
        :
        <select
          {...register("to.minutes")}
          id="minutesto"
          className="flex-grow mx-2"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {timeToString(minute)}
            </option>
          ))}
        </select>
      </div>
      <p className="text-red-600">{errors.to?.hours?.message}</p>
      <p className="text-red-600">{errors.to?.minutes?.message}</p>

      {!fetchIsLoading ? (
        <button
          className="w-1/5 py-1 text-center text-white border rounded-lg select-none bg-slate-600 hover:bg-slate-500"
          type="submit"
        >
          velg
        </button>
      ) : (
        <Spinner />
      )}
      <p className="text-red-600">{errors.from?.root?.message}</p>
      {fetchResult.isError && (
        <p className="text-red-600">{`Error: ${fetchResult.message}`}</p>
      )}
      {fetchResult.isError === false && (
        <p className="text-green-600">{`${fetchResult.message}`}</p>
      )}
    </form>
  );
}
