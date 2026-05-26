"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(5)
});

export async function createEnquiry(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));

  if (!parsed.success) {
    throw new Error("Invalid enquiry");
  }

  await prisma.enquiry.create({
    data: {
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      message: parsed.data.message
    }
  });
}
