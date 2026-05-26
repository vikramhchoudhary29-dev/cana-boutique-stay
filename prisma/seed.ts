import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@hotel.com" },
    update: {},
    create: {
      name: "Hotel Admin",
      email: "admin@hotel.com",
      passwordHash,
      role: Role.ADMIN
    }
  });

  const rooms = [
    {
      name: "Sea View Suite",
      slug: "sea-view-suite",
      description: "Premium suite with balcony, ocean breeze, king bed and luxury amenities.",
      basePrice: 8500,
      maxGuests: 3,
      sizeSqFt: 520,
      imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1200&auto=format&fit=crop",
      amenities: "Sea View,King Bed,Balcony,WiFi,Breakfast,AC"
    },
    {
      name: "Garden Deluxe Room",
      slug: "garden-deluxe-room",
      description: "Elegant room facing lush Goan greens, ideal for couples and families.",
      basePrice: 5200,
      maxGuests: 2,
      sizeSqFt: 360,
      imageUrl: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1200&auto=format&fit=crop",
      amenities: "Garden View,Queen Bed,WiFi,Breakfast,AC"
    },
    {
      name: "Family Villa",
      slug: "family-villa",
      description: "Spacious villa-style stay with two beds and private sit-out.",
      basePrice: 12000,
      maxGuests: 5,
      sizeSqFt: 760,
      imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
      amenities: "Private Sit-out,Two Beds,WiFi,Breakfast,AC,Mini Bar"
    }
  ];

  for (const room of rooms) {
    const roomType = await prisma.roomType.upsert({
      where: { slug: room.slug },
      update: room,
      create: room
    });

    for (let i = 1; i <= 5; i++) {
      await prisma.room.upsert({
        where: { number: `${room.slug.slice(0, 3).toUpperCase()}-${i}` },
        update: {},
        create: {
          number: `${room.slug.slice(0, 3).toUpperCase()}-${i}`,
          floor: String(Math.ceil(i / 2)),
          roomTypeId: roomType.id
        }
      });
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
