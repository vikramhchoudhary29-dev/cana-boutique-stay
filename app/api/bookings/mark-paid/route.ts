import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const booking = await prisma.booking.update({
      where: {
        code: body.bookingCode,
      },
      data: {
        paymentStatus: "PAID",
        status: "CONFIRMED",
      },
    });

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update payment" },
      { status: 500 }
    );
  }
}