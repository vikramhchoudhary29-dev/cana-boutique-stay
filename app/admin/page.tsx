import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/pricing";
import { AdminCharts } from "@/components/AdminCharts";

export default async function AdminPage() {
  const [
    totalBookings,
    activeRooms,
    revenue,
    enquiries,
    confirmedBookings,
    cancelledBookings,
    paidBookings,
    recentBookings,
  ] = await Promise.all([
    prisma.booking.count(),

    prisma.room.count({
      where: {
        isActive: true,
      },
    }),

    prisma.booking.aggregate({
      _sum: {
        totalAmount: true,
      },
      where: {
        paymentStatus: "PAID",
      },
    }),

    prisma.enquiry.count(),

    prisma.booking.count({
      where: {
        status: "CONFIRMED",
      },
    }),

    prisma.booking.count({
      where: {
        status: "CANCELLED",
      },
    }),

    prisma.booking.count({
      where: {
        paymentStatus: "PAID",
      },
    }),

    prisma.booking.findMany({
      take: 5,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        roomType: true,
      },
    }),
  ]);

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
      icon: "📘",
    },
    {
      label: "Confirmed",
      value: confirmedBookings,
      icon: "✅",
    },
    {
      label: "Cancelled",
      value: cancelledBookings,
      icon: "❌",
    },
    {
      label: "Paid Bookings",
      value: paidBookings,
      icon: "💳",
    },
    {
      label: "Active Rooms",
      value: activeRooms,
      icon: "🏨",
    },
    {
      label: "Enquiries",
      value: enquiries,
      icon: "📩",
    },
  ];

  const bookingData = [
    {
      name: "Hotel",
      bookings: totalBookings,
      revenue: revenue._sum.totalAmount ?? 0,
    },
  ];

  const statusData = [
    {
      name: "Confirmed",
      value: confirmedBookings,
    },
    {
      name: "Cancelled",
      value: cancelledBookings,
    },
    {
      name: "Paid",
      value: paidBookings,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-4 md:p-8">
      {/* TOPBAR */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7C6A46]">
            CANA Boutique Stay
          </div>

          <h1 className="mt-2 text-3xl font-bold text-[#111] md:text-5xl">
            Welcome Admin 👋
          </h1>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Monitor bookings, revenue and hotel operations.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button className="rounded-2xl bg-black px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90">
            Share
          </button>

          <button className="rounded-2xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-violet-700">
            Download
          </button>
        </div>
      </div>

      {/* STATS */}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[2rem] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex items-center justify-between">
              <div className="text-4xl">
                {stat.icon}
              </div>

              <div className="rounded-full bg-[#F4F4F5] px-4 py-2 text-xs font-semibold text-slate-500">
                Live
              </div>
            </div>

            <div className="mt-6 text-sm font-medium text-slate-500">
              {stat.label}
            </div>

            <div className="mt-2 text-4xl font-black text-[#111]">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* REVENUE + PREDICTION */}

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="rounded-[2rem] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xl font-bold text-[#111]">
                Revenue Overview
              </div>

              <div className="mt-1 text-sm text-slate-500">
                Hotel performance and analytics
              </div>
            </div>

            <div className="rounded-full bg-[#F4F4F5] px-4 py-2 text-sm font-medium">
              Last 30 Days
            </div>
          </div>

          <div className="mt-8">
            <div className="text-sm text-slate-500">
              Total Revenue
            </div>

            <div className="mt-2 text-5xl font-black text-[#111]">
              {formatINR(revenue._sum.totalAmount ?? 0)}
            </div>
          </div>

          <div className="mt-10">
            <AdminCharts
              bookingData={bookingData}
              statusData={statusData}
            />
          </div>
        </div>

        {/* SIDE CARD */}

        <div className="rounded-[2rem] bg-gradient-to-br from-violet-700 to-black p-8 text-white shadow-sm">
          <div className="text-sm uppercase tracking-[0.3em] text-white/60">
            Prediction
          </div>

          <div className="mt-6 text-6xl font-black">
            75%
          </div>

          <div className="mt-3 text-lg text-white/70">
            Expected occupancy this month
          </div>

          <div className="mt-10 rounded-[2rem] bg-white/10 p-5 backdrop-blur">
            <div className="text-sm text-white/60">
              AI Insights
            </div>

            <div className="mt-3 text-xl font-semibold">
              Strong booking trend detected for North Goa season.
            </div>
          </div>
        </div>
      </div>

      {/* RECENT BOOKINGS */}

      <div className="mt-8 rounded-[2rem] bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-[#111]">
              Recent Bookings
            </div>

            <div className="mt-1 text-sm text-slate-500">
              Latest guest reservations
            </div>
          </div>

          <div className="rounded-full bg-[#F4F4F5] px-4 py-2 text-sm font-medium">
            {recentBookings.length} Recent
          </div>
        </div>

        {/* MOBILE CARDS */}

        <div className="mt-6 grid gap-4 lg:hidden">
          {recentBookings.map((booking) => (
            <div
              key={booking.id}
              className="rounded-[1.5rem] border border-slate-100 bg-[#FAFAFA] p-5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-bold">
                    {booking.guestName}
                  </div>

                  <div className="mt-1 text-sm text-slate-500">
                    {booking.roomType.name}
                  </div>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    booking.status === "CONFIRMED"
                      ? "bg-green-100 text-green-700"
                      : booking.status === "CANCELLED"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {booking.status}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  {booking.checkIn.toDateString()}
                </div>

                <div className="text-xl font-black">
                  {formatINR(booking.totalAmount)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP TABLE */}

        <div className="mt-6 hidden overflow-x-auto lg:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="p-4 text-sm font-semibold text-slate-500">
                  Guest
                </th>

                <th className="p-4 text-sm font-semibold text-slate-500">
                  Room
                </th>

                <th className="p-4 text-sm font-semibold text-slate-500">
                  Date
                </th>

                <th className="p-4 text-sm font-semibold text-slate-500">
                  Amount
                </th>

                <th className="p-4 text-sm font-semibold text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-slate-100 transition hover:bg-[#FAFAFA]"
                >
                  <td className="p-4">
                    <div className="font-bold">
                      {booking.guestName}
                    </div>

                    <div className="text-sm text-slate-500">
                      {booking.guestEmail}
                    </div>
                  </td>

                  <td className="p-4 font-medium">
                    {booking.roomType.name}
                  </td>

                  <td className="p-4 text-sm">
                    {booking.checkIn.toDateString()}
                  </td>

                  <td className="p-4 font-black">
                    {formatINR(booking.totalAmount)}
                  </td>

                  <td className="p-4">
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}