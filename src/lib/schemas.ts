import { ProfileColor } from "@prisma/client";
import { z } from "zod";

const bookingAPISchema = z.object({
  startTime: z.string().pipe(z.coerce.date()),
  endTime: z.string().pipe(z.coerce.date()),
});

const colorSchema = z.object({
  color: z.enum([
    ProfileColor.profileBlue,
    ProfileColor.profileGreen,
    ProfileColor.profileRed,
    ProfileColor.profileYellow,
  ]),
});

type ColorSchema = z.infer<typeof colorSchema>;

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

const reservationFormSchema = z
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

type ReservationFormSchema = z.infer<typeof reservationFormSchema>;

export type { ReservationFormSchema, ColorSchema };
export { bookingAPISchema, colorSchema, reservationFormSchema };
