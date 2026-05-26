import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { MobileMenu } from "@/components/MobileMenu";

export default async function HomePage() {
  const rooms = await prisma.roomType.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#F8F5EF] text-[#1A1208]">
      <section className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:"url('/images/hotel-front.webp')",
          }}
        />

        <div className="absolute inset-0 bg-black/55" />

        <nav className="relative z-50 border-b border-[#C49A28]/20 bg-[#0F2E18]/90 backdrop-blur">
          <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
            <Link href="/" className="flex items-center gap-3">
              <div>
                <div className="font-serif text-xl font-bold text-[#E8D080]">
                  CANA BOUTIQUE STAY
                </div>

                <div className="hidden text-xs uppercase tracking-[0.3em] text-white/60 sm:block">
                  Boutique Stay · North Goa
                </div>
              </div>
            </Link>

            <div className="hidden items-center gap-6 text-sm text-white/80 lg:flex">
              <Link href="/">Home</Link>
              <Link href="#rooms">Rooms</Link>
              <Link href="#amenities">Amenities</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/admin">Admin</Link>
            </div>

            <div className="flex items-center gap-3">
              <MobileMenu />

              <Link
                href="#rooms"
                className="rounded-lg bg-[#C49A28] px-4 py-2 text-sm font-bold text-[#0F2E18]"
              >
                Book Now
              </Link>
            </div>
          </div>
        </nav>

        <div className="relative z-10 flex h-[calc(100vh-80px)] items-center">
          <div className="mx-auto w-full max-w-7xl px-6">
            <div className="max-w-3xl">
              <div className="mb-5 text-xs font-bold uppercase tracking-[0.35em] text-[#E8D080]">
                Boutique Stay · Kamat Nagar · North Goa
              </div>

              <h1 className="font-serif text-4xl leading-none text-white md:text-7xl">
                Stay Slow.
                <span className="block italic text-[#E8D080]">
                  Feel Goa.
                </span>
              </h1>

              <p className="mt-8 max-w-2xl text-lg leading-8 text-white/80 md:text-2xl">
                A refined boutique stay crafted for comfort,
                calm and tropical elegance.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="rounded-full bg-white/10 px-5 py-3 text-sm text-white backdrop-blur">
                  🏊 Swimming Pool
                </div>

                <div className="rounded-full bg-white/10 px-5 py-3 text-sm text-white backdrop-blur">
                  🌴 North Goa
                </div>

                <div className="rounded-full bg-white/10 px-5 py-3 text-sm text-white backdrop-blur">
                  🍽 Dining
                </div>

                <div className="rounded-full bg-white/10 px-5 py-3 text-sm text-white backdrop-blur">
                  🛌 Boutique Rooms
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="rooms"
        className="bg-white px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-[#8A6C10]">
              Boutique Rooms
            </div>

            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Choose Your Stay
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="overflow-hidden rounded-[2rem] bg-[#F8F5EF] shadow-xl"
              >
                <div
                  className="h-72 bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${room.imageUrl})`,
                  }}
                />

                <div className="p-8">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#8A6C10]">
                    CANA BOUTIQUE STAY
                  </div>

                  <h3 className="mt-3 font-serif text-3xl">
                    {room.name}
                  </h3>

                  <p className="mt-4 text-[#6A7A5A]">
                    {room.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="text-2xl font-bold text-[#1B4A2A]">
                      ₹{room.basePrice}
                    </div>

                    <Link
                      href={`/rooms/${room.slug}`}
                      className="rounded-full bg-[#0F2E18] px-6 py-3 text-sm font-bold text-white"
                    >
                      View Room
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="amenities"
        className="bg-[#F8F5EF] px-6 py-20"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-14">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-[#8A6C10]">
              Amenities
            </div>

            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Everything You Need
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Swimming Pool",
              "Free WiFi",
              "Private Parking",
              "Room Service",
              "Air Conditioning",
              "Power Backup",
              "Restaurant",
              "Family Friendly",
            ].map((item) => (
              <div
                key={item}
                className="rounded-[2rem] bg-white p-8 shadow-lg"
              >
                <div className="text-xl font-bold text-[#1B4A2A]">
                  {item}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}