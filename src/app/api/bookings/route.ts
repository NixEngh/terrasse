import { z } from "zod";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { getReservations } from "@/lib/queries/reservations";

const bookingSchema = z.object({
  startTime: z.string().pipe(z.coerce.date()),
  endTime: z.string().pipe(z.coerce.date()),
});

export type BookingSchema = z.infer<typeof bookingSchema>;

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const booking = bookingSchema.safeParse(await req.json());

  if (!booking.success) {
    return new Response(null, {
      status: 400,
    });
  }

  const reservations = await getReservations(
    booking.data.startTime,
    booking.data.endTime
  );

  if (reservations.length) {
    return new Response("Denne tiden er ikke tilgjengelig", {
      status: 400,
    });
  }

  await prisma.reservation.create({
    data: {
      from: booking.data.startTime,
      to: booking.data.endTime,
      userId: session.user.id,
    },
  });

  return new Response("Hurra!", {
    status: 200,
  });
};

const getBookingsSchema = z.object({
  from: z.string().pipe(z.coerce.date()),
  to: z.string().pipe(z.coerce.date()),
});

export type GetBookingsSchema = z.infer<typeof getBookingsSchema>;

export const GET = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const bookings = getBookingsSchema.safeParse(await req.json());

  if (!bookings.success) {
    return new Response(null, {
      status: 400,
    });
  }

  if (bookings.data.from >= bookings.data.to) {
    return new Response("Datoene må være riktig", {
      status: 400,
    });
  }

  const reservations = await getReservations(
    bookings.data.from,
    bookings.data.to
  );

  return new Response(JSON.stringify(reservations));
};
