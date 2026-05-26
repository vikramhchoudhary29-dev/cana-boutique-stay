import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const roomTypeId = searchParams.get("roomTypeId");

  if (!roomTypeId) {
    return NextResponse.json(
      { error: "roomTypeId is required" },
      { status: 400 }
    );
  }

  const bookings = await prisma.booking.findMany({
    where: {
      roomTypeId,
      status: {
        in: ["PENDING", "CONFIRMED", "CHECKED_IN"],
      },
    },
    select: {
      checkIn: true,
      checkOut: true,
      roomsCount: true,
      status: true,
    },
  });

  return NextResponse.json({
    bookings,
  });
}