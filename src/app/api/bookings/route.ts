import { z } from "zod";
import prisma from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { getReservations } from "@/lib/queries/reservations";
import { bookingAPISchema, getBookingsSchema } from "@/lib/schemas";



export type BookingSchema = z.infer<typeof bookingAPISchema>;

export const POST = async (req: Request) => {
  const session = await getAuthSession();

  if (!session) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const booking = bookingAPISchema.safeParse(await req.json());

  if (!booking.success) {
    return new Response(null, {
      status: 400,
    });
  }

  const reservations = await getReservations(
    booking.data.startTime,
    booking.data.endTime
  );
  
  console.log(reservations);
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


