"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createGalleryImage(formData: FormData) {
  const title = String(formData.get("title"));
  const imageUrl = String(formData.get("imageUrl"));
  const category = String(formData.get("category") || "general");

  await (prisma as any).galleryImage.create({
    data: {
      title,
      imageUrl,
      category,
      isActive: true,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}

export async function deleteGalleryImage(formData: FormData) {
  const imageId = String(formData.get("imageId"));

  await (prisma as any).galleryImage.delete({
    where: {
      id: imageId,
    },
  });

  revalidatePath("/admin/gallery");
  revalidatePath("/gallery");
}