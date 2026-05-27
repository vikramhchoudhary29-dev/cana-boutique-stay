import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/pricing";
import {
  cancelBooking,
  confirmBooking,
  deleteBooking,
} from "./actions";

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    status?: string;
    payment?: string;
  }>;
}) {
  const params = await searchParams;

  const q = params.q || "";
  const status = params.status || "";
  const payment = params.payment || "";

  const bookings = await prisma.booking.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                {
                  code: {
                    contains: q,
                  },
                },
                {
                  guestName: {
                    contains: q,
                  },
                },
                {
                  guestEmail: {
                    contains: q,
                  },
                },
                {
                  guestPhone: {
                    contains: q,
                  },
                },
              ],
            }
          : {},
        status
          ? {
              status: status as any,
            }
          : {},
        payment
          ? {
              paymentStatus: payment as any,
            }
          : {},
      ],
    },

    orderBy: {
      createdAt: "desc",
    },

    include: {
      roomType: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-4 md:p-8">
      {/* HEADER */}

      <div className="mb-8">
        <div className="text-sm font-black uppercase tracking-[0.35em] text-[#8A6A2F]">
          CANA BOOKINGS
        </div>

        <h1 className="mt-3 text-3xl font-black text-[#111] md:text-5xl">
          Reservation Management
        </h1>

        <p className="mt-3 text-slate-500">
          Search, filter and manage all hotel bookings.
        </p>
      </div>

      {/* FILTERS */}

      <form className="sticky top-3 z-20 mb-8 grid gap-4 rounded-[2rem] bg-white p-5 shadow-sm md:grid-cols-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search guest, phone, booking code"
          className="rounded-2xl border border-slate-200 bg-[#F8F8F8] p-4 outline-none transition focus:border-violet-500"
        />

        <select
          name="status"
          defaultValue={status}
          className="rounded-2xl border border-slate-200 bg-[#F8F8F8] p-4 outline-none"
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="CANCELLED">Cancelled</option>
          <option value="CHECKED_IN">Checked In</option>
          <option value="CHECKED_OUT">Checked Out</option>
        </select>

        <select
          name="payment"
          defaultValue={payment}
          className="rounded-2xl border border-slate-200 bg-[#F8F8F8] p-4 outline-none"
        >
          <option value="">All Payments</option>
          <option value="UNPAID">Unpaid</option>
          <option value="PAID">Paid</option>
          <option value="CREATED">Created</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        <button className="rounded-2xl bg-black p-4 font-bold text-white transition hover:opacity-90">
          Apply Filters
        </button>
      </form>

      {/* COUNT */}

      <div className="mb-5 text-sm font-semibold text-slate-500">
        Showing {bookings.length} bookings
      </div>

      {/* MOBILE CARDS */}

      <div className="grid gap-5 lg:hidden">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-[2rem] bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-lg font-black">
                  {booking.guestName}
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  {booking.guestPhone}
                </div>

                <div className="text-sm text-slate-500">
                  {booking.guestEmail}
                </div>
              </div>

              <div className="rounded-full bg-[#F4F4F5] px-4 py-2 text-xs font-bold">
                {booking.code}
              </div>
            </div>

            <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-slate-400">
                  Room
                </div>

                <div className="font-semibold">
                  {booking.roomType.name}
                </div>
              </div>

              <div>
                <div className="text-slate-400">
                  Amount
                </div>

                <div className="font-black">
                  {formatINR(booking.totalAmount)}
                </div>
              </div>

              <div>
                <div className="text-slate-400">
                  Check In
                </div>

                <div className="font-medium">
                  {booking.checkIn.toDateString()}
                </div>
              </div>

              <div>
                <div className="text-slate-400">
                  Check Out
                </div>

                <div className="font-medium">
                  {booking.checkOut.toDateString()}
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <span
                className={`rounded-full px-4 py-2 text-xs font-bold ${
                  booking.paymentStatus === "PAID"
                    ? "bg-green-100 text-green-700"
                    : booking.paymentStatus === "FAILED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.paymentStatus}
              </span>

              <span
                className={`rounded-full px-4 py-2 text-xs font-bold ${
                  booking.status === "CONFIRMED"
                    ? "bg-green-100 text-green-700"
                    : booking.status === "CANCELLED"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {booking.status}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {booking.status !== "CONFIRMED" && (
                <form action={confirmBooking}>
                  <input
                    type="hidden"
                    name="bookingId"
                    value={booking.id}
                  />

                  <button className="rounded-xl bg-green-600 px-4 py-3 text-sm font-bold text-white">
                    Confirm
                  </button>
                </form>
              )}

              {booking.status !== "CANCELLED" && (
                <form action={cancelBooking}>
                  <input
                    type="hidden"
                    name="bookingId"
                    value={booking.id}
                  />

                  <button className="rounded-xl bg-red-500 px-4 py-3 text-sm font-bold text-white">
                    Cancel
                  </button>
                </form>
              )}

              <form action={deleteBooking}>
                <input
                  type="hidden"
                  name="bookingId"
                  value={booking.id}
                />

                <button className="rounded-xl bg-black px-4 py-3 text-sm font-bold text-white">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP TABLE */}

      <div className="hidden overflow-x-auto rounded-[2rem] bg-white shadow-sm lg:block">
        <table className="w-full text-left">
          <thead className="border-b bg-[#F8F8F8]">
            <tr>
              <th className="p-5">Guest</th>
              <th className="p-5">Room</th>
              <th className="p-5">Dates</th>
              <th className="p-5">Amount</th>
              <th className="p-5">Payment</th>
              <th className="p-5">Status</th>
              <th className="p-5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-b transition hover:bg-[#FAFAFA]"
              >
                <td className="p-5">
                  <div className="font-bold">
                    {booking.guestName}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {booking.guestPhone}
                  </div>

                  <div className="text-sm text-slate-500">
                    {booking.guestEmail}
                  </div>
                </td>

                <td className="p-5 font-medium">
                  {booking.roomType.name}
                </td>

                <td className="p-5 text-sm">
                  <div>
                    {booking.checkIn.toDateString()}
                  </div>

                  <div>
                    {booking.checkOut.toDateString()}
                  </div>
                </td>

                <td className="p-5 font-black">
                  {formatINR(booking.totalAmount)}
                </td>

                <td className="p-5">
                  <span
                    className={`rounded-full px-4 py-2 text-xs font-bold ${
                      booking.paymentStatus === "PAID"
                        ? "bg-green-100 text-green-700"
                        : booking.paymentStatus === "FAILED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.paymentStatus}
                  </span>
                </td>

                <td className="p-5">
                  <span
                    className={`rounded-full px-4 py-2 text-xs font-bold ${
                      booking.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "CANCELLED"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {booking.status}
                  </span>
                </td>

                <td className="p-5">
                  <div className="flex flex-wrap gap-2">
                    {booking.status !== "CONFIRMED" && (
                      <form action={confirmBooking}>
                        <input
                          type="hidden"
                          name="bookingId"
                          value={booking.id}
                        />

                        <button className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white">
                          Confirm
                        </button>
                      </form>
                    )}

                    {booking.status !== "CANCELLED" && (
                      <form action={cancelBooking}>
                        <input
                          type="hidden"
                          name="bookingId"
                          value={booking.id}
                        />

                        <button className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white">
                          Cancel
                        </button>
                      </form>
                    )}

                    <form action={deleteBooking}>
                      <input
                        type="hidden"
                        name="bookingId"
                        value={booking.id}
                      />

                      <button className="rounded-xl bg-black px-4 py-2 text-sm font-bold text-white">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}