import { prisma } from "@/lib/prisma";

export async function getAvailableRoomsCount(roomTypeId: string, checkIn: Date, checkOut: Date) {
  const totalRooms = await prisma.room.count({
    where: { roomTypeId, isActive: true }
  });

  const overlappingBookings = await prisma.booking.aggregate({
    where: {
      roomTypeId,
      status: { in: ["PENDING", "CONFIRMED", "CHECKED_IN"] },
      checkIn: { lt: checkOut },
      checkOut: { gt: checkIn }
    },
    _sum: { roomsCount: true }
  });

  const reserved = overlappingBookings._sum.roomsCount ?? 0;
  return Math.max(0, totalRooms - reserved);
}
