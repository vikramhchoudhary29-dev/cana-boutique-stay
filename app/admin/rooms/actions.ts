"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deleteRoom(formData: FormData) {
  const roomId = String(formData.get("roomId"));

  await (prisma as any).roomImage.deleteMany({
    where: {
      roomTypeId: roomId,
    },
  });

  await prisma.booking.deleteMany({
    where: {
      roomTypeId: roomId,
    },
  });

await (prisma as any).seasonalRate.deleteMany({    where: {
      roomTypeId: roomId,
    },
  });

  await prisma.roomType.delete({
    where: {
      id: roomId,
    },
  });

  revalidatePath("/admin/rooms");
  revalidatePath("/rooms");
}

export async function createRoom(formData: FormData) {
  const name = String(formData.get("name"));
  const slug = String(formData.get("slug"));
  const description = String(formData.get("description"));
  const basePrice = Number(formData.get("basePrice"));
  const maxGuests = Number(formData.get("maxGuests"));
  const sizeSqFt = Number(formData.get("sizeSqFt"));
  const imageUrl = String(formData.get("imageUrl"));
  const amenities = String(formData.get("amenities"));

  await prisma.roomType.create({
    data: {
      name,
      slug,
      description,
      basePrice,
      maxGuests,
      sizeSqFt,
      imageUrl,
      amenities,
    },
  });

  revalidatePath("/admin/rooms");
}

export async function updateRoom(formData: FormData) {
  const roomId = String(formData.get("roomId"));
  const name = String(formData.get("name"));
  const slug = String(formData.get("slug"));
  const description = String(formData.get("description"));
  const basePrice = Number(formData.get("basePrice"));
  const maxGuests = Number(formData.get("maxGuests"));
  const sizeSqFt = Number(formData.get("sizeSqFt"));
  const imageUrl = String(formData.get("imageUrl"));
  const amenities = String(formData.get("amenities"));

  await prisma.roomType.update({
    where: { id: roomId },
    data: {
      name,
      slug,
      description,
      basePrice,
      maxGuests,
      sizeSqFt,
      imageUrl,
      amenities,
    },
  });

  revalidatePath("/admin/rooms");
}