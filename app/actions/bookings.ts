"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createBooking(formData: FormData) {
  const roomTypeId = String(formData.get("roomTypeId") || "");
  const guestName = String(formData.get("guestName") || "");
  const guestEmail = String(formData.get("guestEmail") || "");
  const guestPhone = String(formData.get("guestPhone") || "");
  const checkIn = new Date(String(formData.get("checkIn")));
  const checkOut = new Date(String(formData.get("checkOut")));
  const adults = Number(formData.get("adults") || 1);
  const children = Number(formData.get("children") || 0);
  const roomsCount = Number(
    formData.get("roomsCount") || formData.get("rooms") || 1
  );
  const specialRequest = String(formData.get("specialRequest") || "");

  if (
    !roomTypeId ||
    !guestName ||
    !guestEmail ||
    !guestPhone ||
    !checkIn ||
    !checkOut ||
    isNaN(checkIn.getTime()) ||
    isNaN(checkOut.getTime())
  ) {
    throw new Error("Invalid booking details");
  }

  const roomType = await prisma.roomType.findUnique({
    where: {
      id: roomTypeId,
    },
  });

  if (!roomType) {
    throw new Error("Room not found");
  }

  const nights = Math.max(
    1,
    Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    )
  );

  const seasonalRate = await (prisma as any).seasonalRate.findFirst({
    where: {
      roomTypeId,
      isActive: true,
      startDate: {
        lte: checkIn,
      },
      endDate: {
        gte: checkIn,
      },
    },
  });

  const nightlyPrice = seasonalRate?.seasonPrice || roomType.basePrice;

  const totalAmount = nightlyPrice * nights * roomsCount;

  const code = `GOA-${Date.now()}`;

  const booking = await prisma.booking.create({
    data: {
      code,
      guestName,
      guestEmail,
      guestPhone,
      checkIn,
      checkOut,
      adults,
      children,
      roomsCount,
      totalAmount,
      specialRequest,
      roomTypeId,
      status: "PENDING",
      paymentStatus: "UNPAID",
    },
  });

  redirect(`/booking/${booking.code}`);
}