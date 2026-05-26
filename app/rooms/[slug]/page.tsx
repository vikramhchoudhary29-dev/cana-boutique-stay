import { StickyBookingCTA } from "@/components/StickyBookingCTA";
import { AvailabilityCalendar } from "@/components/AvailabilityCalendar";
import { LivePricePreview } from "@/components/LivePricePreview";
import { RoomImageSlider } from "@/components/RoomImageSlider";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { BookingForm } from "@/components/BookingForm";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/pricing";

export default async function RoomDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const room = await prisma.roomType.findUnique({
    where: { slug },
  });

  if (!room) notFound();

  const roomImages = await (prisma as any).roomImage.findMany({
    where: {
      roomTypeId: room.id,
    },
    orderBy: [{ isPrimary: "desc" }, { createdAt: "desc" }],
  });

  const heroImage = roomImages[0]?.imageUrl || room.imageUrl;

  const amenities = room.amenities
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <main className="bg-[#F8F5EF]">
      <Navbar />

      <section className="relative min-h-[88vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-[#0F2E18]/40 to-black/85" />

        <div className="relative z-10 container flex min-h-[88vh] items-end pb-20 pt-40 text-white">
          <div className="max-w-5xl">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px w-12 bg-[#E8D080]" />

              <span className="text-xs font-bold uppercase tracking-[0.35em] text-[#E8D080]">
                CANA Boutique Stay · North Goa
              </span>
            </div>

            <h1 className="font-serif text-6xl font-light leading-none md:text-8xl">
              {room.name}
            </h1>

            <p className="mt-8 max-w-3xl text-xl leading-9 text-white/70">
              Peaceful boutique accommodation designed for modern Goa travelers,
              combining comfort, warmth and premium stay experiences.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-bold backdrop-blur">
                {formatINR(room.basePrice)} / night
              </div>

              <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-bold backdrop-blur">
                Up to {room.maxGuests} guests
              </div>

              <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 font-bold backdrop-blur">
                {room.sizeSqFt ?? "-"} sq.ft.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="text-xs font-bold uppercase tracking-[0.35em] text-[#8A6C10]">
              Room Gallery
            </div>

            <h2 className="mt-4 font-serif text-5xl font-light">
              Explore This{" "}
              <span className="italic text-[#1B4A2A]">
                Boutique Room
              </span>
            </h2>
          </div>

          <RoomImageSlider
            images={roomImages}
            fallbackImage={room.imageUrl}
          />
        </div>
      </section>

      <section className="section-spacing">
        <div className="container grid gap-10 lg:grid-cols-[1fr_430px]">
          <div className="space-y-10">
            <div className="luxury-card rounded-[2.5rem] p-8 md:p-12">
              <div className="luxury-subtitle">Boutique Stay</div>

              <h2 className="mt-4 font-serif text-5xl font-light leading-tight">
                Relaxed comfort for
                <span className="block italic text-[#1B4A2A]">
                  your Goa escape.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-9 text-[#6A7A5A]">
                Designed for calm mornings, peaceful evenings and memorable Goa
                vacations, every room combines boutique comfort with modern
                hospitality.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              <div className="rounded-[2rem] bg-white p-6 shadow">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                  Starting Price
                </div>

                <div className="mt-3 text-2xl font-black text-[#1B4A2A] md:text-3xl">
                  {formatINR(room.basePrice)}
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                  Guests
                </div>

                <div className="mt-3 text-2xl font-black text-[#1B4A2A] md:text-3xl">
                  {room.maxGuests}
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                  Room Space
                </div>

                <div className="mt-3 text-2xl font-black text-[#1B4A2A] md:text-3xl">
                  {room.sizeSqFt ?? "-"} sq.ft.
                </div>
              </div>
            </div>

            <div className="rounded-[2.5rem] bg-[#0F2E18] p-8 text-white md:p-12">
              <div className="luxury-subtitle text-[#E8D080]">
                Room Amenities
              </div>

              <h2 className="mt-4 font-serif text-5xl font-light">
                Everything You Need
              </h2>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="rounded-2xl border border-white/10 bg-white/5 p-5 text-white/75"
                  >
                    ✦ {amenity}
                  </div>
                ))}
              </div>
            </div>

            <AvailabilityCalendar roomTypeId={room.id} />
          </div>

<aside id="booking-form" className="space-y-6 lg:sticky lg:top-28 lg:self-start">            <BookingForm
              roomTypeId={room.id}
              roomName={room.name}
              basePrice={room.basePrice}
            />

            <LivePricePreview
              roomTypeId={room.id}
              basePrice={room.basePrice}
            />
          </aside>
        </div>
      </section>
      <StickyBookingCTA roomSlug={room.slug} />
    </main>
  );
}