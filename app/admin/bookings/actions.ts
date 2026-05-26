"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function cancelBooking(formData: FormData) {
  const bookingId = String(formData.get("bookingId"));

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED" },
  });

  revalidatePath("/admin/bookings");
}

export async function confirmBooking(formData: FormData) {
  const bookingId = String(formData.get("bookingId"));

  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CONFIRMED" },
  });

  revalidatePath("/admin/bookings");
}

export async function deleteBooking(formData: FormData) {
  const bookingId = String(formData.get("bookingId"));

  await prisma.booking.delete({
    where: { id: bookingId },
  });

  revalidatePath("/admin/bookings");
}