export function nightsBetween(checkIn: Date, checkOut: Date) {
  const ms = checkOut.getTime() - checkIn.getTime();

  return Math.max(
    1,
    Math.ceil(ms / (1000 * 60 * 60 * 24))
  );
}

export function formatINR(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function getRoomPriceForDates({
  roomTypeId,
  basePrice,
  checkIn,
  checkOut,
}: {
  roomTypeId: string;
  basePrice: number;
  checkIn: Date;
  checkOut: Date;
}) {
  const { prisma } = await import("@/lib/prisma");

  const seasonalRate = await (prisma as any).seasonalRate.findFirst({
    where: {
      roomTypeId,
      isActive: true,
      startDate: {
        lte: checkOut,
      },
      endDate: {
        gte: checkIn,
      },
    },
    orderBy: {
      seasonPrice: "desc",
    },
  });

  return seasonalRate?.seasonPrice ?? basePrice;
}

export async function calculateTotal({
  roomTypeId,
  basePrice,
  checkIn,
  checkOut,
  roomsCount,
}: {
  roomTypeId: string;
  basePrice: number;
  checkIn: Date;
  checkOut: Date;
  roomsCount: number;
}) {
  const nights = nightsBetween(checkIn, checkOut);

  const finalRoomPrice = await getRoomPriceForDates({
    roomTypeId,
    basePrice,
    checkIn,
    checkOut,
  });

  return finalRoomPrice * nights * roomsCount;
}