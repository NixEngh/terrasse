import prisma from "../prisma"

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
    })
}


