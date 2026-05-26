"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createSeasonalRate(formData: FormData) {
  const name = String(formData.get("name"));
  const roomTypeId = String(formData.get("roomTypeId"));
  const startDate = new Date(String(formData.get("startDate")));
  const endDate = new Date(String(formData.get("endDate")));
  const seasonPrice = Number(formData.get("seasonPrice"));

  await (prisma as any).seasonalRate.create({
    data: {
      name,
      roomTypeId,
      startDate,
      endDate,
      seasonPrice,
      isActive: true,
    },
  });

  revalidatePath("/admin/pricing");
}

export async function deleteSeasonalRate(formData: FormData) {
  const rateId = String(formData.get("rateId"));

  await (prisma as any).seasonalRate.delete({
    where: {
      id: rateId,
    },
  });

  revalidatePath("/admin/pricing");
}