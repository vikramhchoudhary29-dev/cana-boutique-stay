import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/pricing";
import { cancelBooking, confirmBooking, deleteBooking } from "./actions";

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
    <div>
      <div className="mb-8">
        <div className="font-black uppercase tracking-[0.35em] text-gold">
          Admin
        </div>

        <h1 className="mt-3 text-4xl font-black">
          All Bookings
        </h1>

        <p className="mt-3 text-slate-600">
          Search, filter and manage all hotel reservations.
        </p>
      </div>

      <form className="mb-6 grid gap-4 rounded-[2rem] bg-white p-5 shadow md:grid-cols-4">
        <input
          name="q"
          defaultValue={q}
          placeholder="Search guest, phone, code"
          className="rounded-2xl border p-4"
        />

        <select
          name="status"
          defaultValue={status}
          className="rounded-2xl border p-4"
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
          className="rounded-2xl border p-4"
        >
          <option value="">All Payments</option>
          <option value="UNPAID">Unpaid</option>
          <option value="PAID">Paid</option>
          <option value="CREATED">Created</option>
          <option value="FAILED">Failed</option>
          <option value="REFUNDED">Refunded</option>
        </select>

        <button className="rounded-2xl bg-black p-4 font-bold text-white">
          Apply Filters
        </button>
      </form>

      <div className="mb-4 text-sm font-bold text-slate-500">
        Showing {bookings.length} bookings
      </div>

      <div className="overflow-x-auto rounded-[2rem] bg-white shadow">
        <table className="w-full min-w-[1200px] text-left">
          <thead className="bg-sand">
            <tr>
              <th className="p-4">Code</th>
              <th className="p-4">Guest</th>
              <th className="p-4">Room</th>
              <th className="p-4">Dates</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Payment</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id} className="border-t">
                <td className="p-4 font-black">
                  {booking.code}
                </td>

                <td className="p-4">
                  <div className="font-bold">
                    {booking.guestName}
                  </div>
                  <div className="text-sm text-slate-500">
                    {booking.guestPhone}
                  </div>
                  <div className="text-sm text-slate-500">
                    {booking.guestEmail}
                  </div>
                </td>

                <td className="p-4">
                  {booking.roomType.name}
                </td>

                <td className="p-4 text-sm">
                  <div>
                    {booking.checkIn.toDateString()}
                  </div>
                  <div>
                    {booking.checkOut.toDateString()}
                  </div>
                </td>

                <td className="p-4 font-black">
                  {formatINR(booking.totalAmount)}
                </td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold ${
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

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-bold ${
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

                <td className="p-4">
                  <div className="flex gap-2">
                    {booking.status !== "CONFIRMED" && (
                      <form action={confirmBooking}>
                        <input
                          type="hidden"
                          name="bookingId"
                          value={booking.id}
                        />

                        <button className="rounded-full bg-green-600 px-4 py-2 text-sm font-bold text-white">
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

                        <button className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
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

                      <button className="rounded-full bg-black px-4 py-2 text-sm font-bold text-white">
                        Delete
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}

            {bookings.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="p-8 text-center font-bold text-slate-500"
                >
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}