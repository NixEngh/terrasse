import { Prisma } from "@prisma/client";
import prisma from "../prisma";

export const getReservations = async (startDate: Date, endDate: Date) => {
  return await prisma.reservation.findMany({
    where: {
      AND: [
        {
          from: {
            lte: endDate,
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
        }
      }
    }
  });
};

export type reservationWithUserData = Prisma.PromiseReturnType<typeof getReservations>[number];


export const getDayReservations = async (date: Date) => {
  const startDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const endDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() + 1
  );

  return await getReservations(startDate, endDate);


};
