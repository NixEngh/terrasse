"use client";

import { BookingSchema } from "@/app/api/bookings/route";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import Spinner from "./Spinner";
import { hours, minutes } from "@/lib/times";

const validTime = z.object({
  hours: z.coerce
    .number()
    .int()
    .gte(0, "må være gyldig tid")
    .lt(24, "må være gyldig tid"),
  minutes: z.coerce
    .number()
    .int()
    .gte(0, "må være gyldig tid")
    .lt(60, "må være gyldig tid"),
});

export const reservationFormSchema = z
  .object({
    from: validTime,
    to: validTime,
  })
  .refine(
    (data) => {
      if (data.to.hours > data.from.hours) {
        return true;
      } else if (data.to.hours === data.from.hours) {
        return data.to.minutes > data.from.minutes;
      } else {
        return false;
      }
    },
    { message: "intervallet må være positivt", path: ["from"] }
  );

export type ReservationFormSchema = z.infer<typeof reservationFormSchema>;

export default function ReservationForm({ date }: { date: Date }) {


  const [fetchResult, setFetchResult] = useState<{
    isError?: boolean;
    message?: string;
  }>({});

  const [fetchIsLoading, setFetchIsLoading] = useState(false);

  const router = useRouter();

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

      if (!response.ok) throw response.statusText;

      setFetchResult({ isError: false, message: "success!" });

      router.refresh();
    } catch (e) {
      setFetchResult({ isError: true, message: e as string });
      setFetchIsLoading(false);
      return null;
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-3"
    >
      <h3 className="mb-3 text-center">Velg tid</h3>
      <div className="flex w-80">
        <p className="w-14">Fra kl:</p>
        <select
          {...register("from.hours")}
          id="hours"
          className="flex-grow mx-2"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        :
        <select
          {...register("from.minutes")}
          id="minutes"
          className="flex-grow mx-2"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
      <p className="text-red-600">{errors.from?.hours?.message}</p>
      <p className="text-red-600">{errors.from?.minutes?.message}</p>
      <div className="flex w-80">
        <p className="w-14">Til kl:</p>
        <select {...register("to.hours")} id="hours" className="flex-grow mx-2">
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        :
        <select
          {...register("to.minutes")}
          id="minutes"
          className="flex-grow mx-2"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
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
