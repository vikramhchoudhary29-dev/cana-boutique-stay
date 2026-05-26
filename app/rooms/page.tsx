import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/pricing";

export default async function RoomsPage() {
  const rooms = await prisma.roomType.findMany({
    orderBy: {
      basePrice: "asc",
    },
  });

  return (
    <main className="bg-[#F8F5EF]">
      <Navbar />

      <section className="relative overflow-hidden pt-40 pb-28">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop')",
          }}
        />

        <div className="hero-overlay absolute inset-0" />

        <div className="relative z-10 container text-white">
          <div className="luxury-subtitle">
            CANA Boutique Stay · North Goa
          </div>

          <h1 className="mt-6 max-w-4xl font-serif text-6xl font-light leading-none md:text-8xl">
            Boutique Rooms &
            <br />
            <span className="text-gradient italic">
              Calm Goa Stays
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/65">
            Discover peaceful boutique rooms designed for family getaways,
            relaxed North Goa vacations and premium stay experiences.
          </p>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container">
          <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="luxury-subtitle">
                Stay Experience
              </div>

              <h2 className="luxury-section-title mt-4">
                Choose Your
                <span className="block italic text-[#1B4A2A]">
                  Boutique Retreat
                </span>
              </h2>
            </div>

            <div className="max-w-md text-lg leading-8 text-[#6A7A5A]">
              Each room combines comfort, privacy and warm Goan hospitality for
              a relaxed boutique stay.
            </div>
          </div>

          <div className="grid gap-12">
            {rooms.map((room, index) => (
              <Link
                key={room.id}
                href={`/rooms/${room.slug}`}
                className={`group grid overflow-hidden rounded-[2.5rem] bg-white shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_100px_rgba(0,0,0,0.14)] ${
                  index % 2 === 0
                    ? "lg:grid-cols-[1.05fr_.95fr]"
                    : "lg:grid-cols-[.95fr_1.05fr]"
                }`}
              >
                <div
                  className={`relative min-h-[520px] overflow-hidden ${
                    index % 2 !== 0 ? "lg:order-2" : ""
                  }`}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url(${room.imageUrl})`,
                    }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-8 left-8">
                    <div className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur">
                      Boutique Room
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center p-8 md:p-14">
                  <div className="luxury-subtitle">
                    CANA Boutique Stay
                  </div>

                  <h3 className="mt-5 font-serif text-5xl font-light leading-tight">
                    {room.name}
                  </h3>

                  <p className="mt-6 text-lg leading-9 text-[#6A7A5A]">
                    {room.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {room.amenities
                      .split(",")
                      .slice(0, 5)
                      .map((amenity) => (
                        <div
                          key={amenity}
                          className="rounded-full bg-[#F5EFE2] px-4 py-2 text-sm font-semibold text-[#1B4A2A]"
                        >
                          {amenity.trim()}
                        </div>
                      ))}
                  </div>

                  <div className="mt-10 grid grid-cols-3 gap-4">
                    <div className="rounded-2xl bg-[#F8F5EF] p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                        Price
                      </div>

                      <div className="mt-2 text-2xl font-black text-[#1B4A2A]">
                        {formatINR(room.basePrice)}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#F8F5EF] p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                        Guests
                      </div>

                      <div className="mt-2 text-2xl font-black text-[#1B4A2A]">
                        {room.maxGuests}
                      </div>
                    </div>

                    <div className="rounded-2xl bg-[#F8F5EF] p-5">
                      <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                        Space
                      </div>

                      <div className="mt-2 text-2xl font-black text-[#1B4A2A]">
                        {room.sizeSqFt ?? "-"}
                      </div>
                    </div>
                  </div>

                  <div className="mt-10">
                    <div className="inline-flex items-center gap-3 rounded-full bg-[#0F2E18] px-7 py-4 font-bold text-white transition group-hover:bg-[#C49A28] group-hover:text-[#0F2E18]">
                      View Room
                      <span>→</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}