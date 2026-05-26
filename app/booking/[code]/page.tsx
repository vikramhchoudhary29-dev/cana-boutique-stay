import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/pricing";

export default async function BookingConfirmationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;

  const booking = await prisma.booking.findUnique({
    where: {
      code,
    },
    include: {
      roomType: true,
    },
  });

  if (!booking) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#F8F5EF]">
      <Navbar />

      <section className="relative overflow-hidden pt-36 pb-24">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1800&auto=format&fit=crop')",
          }}
        />

        <div className="absolute inset-0 bg-[#0F2E18]/85" />

        <div className="relative z-10 container text-center text-white">
          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#C49A28] text-5xl shadow-2xl">
            ✓
          </div>

          <div className="mt-8 luxury-subtitle text-[#E8D080]">
            Booking Created
          </div>

          <h1 className="mt-5 font-serif text-6xl font-light leading-none md:text-7xl">
            Your CANA Stay
            <span className="block italic text-[#E8D080]">
              Is Reserved
            </span>
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-white/65">
            Your boutique Goa stay has been saved successfully. Our team may
            connect with you for confirmation and arrival assistance.
          </p>
        </div>
      </section>

      <section className="-mt-16 pb-24">
        <div className="container">
          <div className="mx-auto max-w-5xl rounded-[2.5rem] bg-white p-8 shadow-[0_30px_100px_rgba(0,0,0,0.12)] md:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              <div>
                <div className="mb-8 flex flex-wrap items-center gap-4">
                  <div className="rounded-full bg-[#F5EFE2] px-5 py-3 text-sm font-black text-[#1B4A2A]">
                    Booking Code: {booking.code}
                  </div>

                  <div
                    className={`rounded-full px-5 py-3 text-sm font-black ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </div>

                  <div
                    className={`rounded-full px-5 py-3 text-sm font-black ${
                      booking.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    Payment: {booking.paymentStatus}
                  </div>
                </div>

                <div className="luxury-subtitle">
                  Booking Details
                </div>

                <h2 className="mt-4 font-serif text-5xl font-light">
                  {booking.roomType.name}
                </h2>

                <div className="mt-10 grid gap-5 md:grid-cols-2">
                  <div className="rounded-[2rem] bg-[#F8F5EF] p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                      Guest Name
                    </div>

                    <div className="mt-3 text-2xl font-black text-[#1B4A2A]">
                      {booking.guestName}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#F8F5EF] p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                      Contact
                    </div>

                    <div className="mt-3 text-lg font-bold text-[#1B4A2A]">
                      {booking.guestPhone}
                    </div>

                    <div className="mt-1 text-sm text-[#6A7A5A]">
                      {booking.guestEmail}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#F8F5EF] p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                      Check-in
                    </div>

                    <div className="mt-3 text-2xl font-black text-[#1B4A2A]">
                      {new Date(booking.checkIn).toDateString()}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#F8F5EF] p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                      Check-out
                    </div>

                    <div className="mt-3 text-2xl font-black text-[#1B4A2A]">
                      {new Date(booking.checkOut).toDateString()}
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#F8F5EF] p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                      Guests
                    </div>

                    <div className="mt-3 text-2xl font-black text-[#1B4A2A]">
                      {booking.adults} Adults · {booking.children} Children
                    </div>
                  </div>

                  <div className="rounded-[2rem] bg-[#F8F5EF] p-6">
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                      Rooms
                    </div>

                    <div className="mt-3 text-2xl font-black text-[#1B4A2A]">
                      {booking.roomsCount}
                    </div>
                  </div>
                </div>

                {booking.specialRequest && (
                  <div className="mt-8 rounded-[2rem] bg-[#0F2E18] p-8 text-white">
                    <div className="luxury-subtitle text-[#E8D080]">
                      Special Request
                    </div>

                    <p className="mt-5 text-lg leading-8 text-white/75">
                      {booking.specialRequest}
                    </p>
                  </div>
                )}
              </div>

              <aside className="space-y-6">
                <div className="rounded-[2rem] bg-[#0F2E18] p-8 text-white shadow-xl">
                  <div className="luxury-subtitle text-[#E8D080]">
                    Stay Summary
                  </div>

                  <div className="mt-5 border-b border-white/10 pb-5">
                    <div className="text-sm text-white/50">
                      Room
                    </div>

                    <div className="mt-1 text-xl font-bold">
                      {booking.roomType.name}
                    </div>
                  </div>

                  <div className="mt-5 border-b border-white/10 pb-5">
                    <div className="text-sm text-white/50">
                      Total Amount
                    </div>

                    <div className="mt-2 text-5xl font-black text-[#E8D080]">
                      {formatINR(booking.totalAmount)}
                    </div>
                  </div>

                  <div className="mt-5 text-sm leading-7 text-white/55">
                    Your booking is saved in CANA BOUTIQUE STAY reservation
                    system. Please keep your booking code for reference.
                  </div>
                </div>

                <div className="grid gap-4">
                  <Link
                    href="/rooms"
                    className="rounded-2xl bg-[#C49A28] px-6 py-5 text-center font-black text-[#0F2E18]"
                  >
                    Explore More Rooms
                  </Link>

                  <Link
                    href="/"
                    className="rounded-2xl border border-[#D8D0B8] px-6 py-5 text-center font-bold text-[#1B4A2A]"
                  >
                    Return Home
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}