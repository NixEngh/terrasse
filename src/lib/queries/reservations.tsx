import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const getReservations = async (startDate: Date, endDate: Date) => {
  return await prisma.reservation.findMany({
    where: {
      AND: [
        {
          from: {
            lt: endDate,
          },
        },
        {
          to: {
            gte: startDate,
          },
        },
      ],
    },
    include: {
      User: {
        select: {
          profileColor: true,
          email: true,
          name: true,
          image: true,
        }
      }
    }
  });
};

export type reservationWithUserData = Prisma.PromiseReturnType<typeof getReservations>[number];


export const getDayReservationsSupersetUTC = async (date: Date) => {
  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()-1
  );

  const endDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 2
  );

  return await getReservations(startDate, endDate);


};
