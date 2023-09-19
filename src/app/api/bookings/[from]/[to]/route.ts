import { getAuthSession } from "@/lib/auth";
import { getReservations } from "@/lib/queries/reservations";
import { getBookingsSchema, type GetBookingsSchema } from "@/lib/schemas";

export const GET = async (
  req: Request,
  { params }: { params: { from: string; to: string } }
) => {
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
