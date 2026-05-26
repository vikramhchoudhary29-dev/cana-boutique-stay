"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createRoomImage(formData: FormData) {
  const roomTypeId = String(formData.get("roomTypeId"));
  const title = String(formData.get("title"));
  const imageUrl = String(formData.get("imageUrl"));
  const category = String(formData.get("category"));
  const isPrimary = String(formData.get("isPrimary")) === "true";

  if (isPrimary) {
    await (prisma as any).roomImage.updateMany({
      where: {
        roomTypeId,
      },
      data: {
        isPrimary: false,
      },
    });

    await prisma.roomType.update({
      where: {
        id: roomTypeId,
      },
      data: {
        imageUrl,
      },
    });
  }

  await (prisma as any).roomImage.create({
    data: {
      roomTypeId,
      title,
      imageUrl,
      category,
      isPrimary,
    },
  });

  revalidatePath(`/admin/rooms/${roomTypeId}/images`);
  revalidatePath("/rooms");
}

export async function deleteRoomImage(formData: FormData) {
  const imageId = String(formData.get("imageId"));
  const roomTypeId = String(formData.get("roomTypeId"));

  await (prisma as any).roomImage.delete({
    where: {
      id: imageId,
    },
  });

  revalidatePath(`/admin/rooms/${roomTypeId}/images`);
  revalidatePath("/rooms");
}