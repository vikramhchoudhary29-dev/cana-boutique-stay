import { NextResponse } from "next/server";
import { getRoomPriceForDates } from "@/lib/pricing";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const roomTypeId = searchParams.get("roomTypeId");
  const checkInParam = searchParams.get("checkIn");
  const checkOutParam = searchParams.get("checkOut");

  if (!roomTypeId || !checkInParam || !checkOutParam) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const roomType = await prisma.roomType.findUnique({
    where: {
      id: roomTypeId,
    },
  });

  if (!roomType) {
    return NextResponse.json(
      { error: "Room not found" },
      { status: 404 }
    );
  }

  const price = await getRoomPriceForDates({
    roomTypeId,
    basePrice: roomType.basePrice,
    checkIn: new Date(checkInParam),
    checkOut: new Date(checkOutParam),
  });

  return NextResponse.json({
    price,
    basePrice: roomType.basePrice,
    isSeasonal: price !== roomType.basePrice,
  });
}