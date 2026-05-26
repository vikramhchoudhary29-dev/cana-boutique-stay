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
  ] = await Promise.all([
    prisma.booking.count(),

    prisma.room.count({
      where: { isActive: true },
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
  ]);

  const stats = [
    {
      label: "Total Bookings",
      value: totalBookings,
    },
    {
      label: "Confirmed",
      value: confirmedBookings,
    },
    {
      label: "Cancelled",
      value: cancelledBookings,
    },
    {
      label: "Paid Bookings",
      value: paidBookings,
    },
    {
      label: "Active Rooms",
      value: activeRooms,
    },
    {
      label: "Enquiries",
      value: enquiries,
    },
    {
      label: "Revenue",
      value: formatINR(revenue._sum.totalAmount ?? 0),
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
    <div>
      <div className="mb-10">
        <div className="font-black uppercase tracking-[0.35em] text-gold">
          Analytics
        </div>

        <h1 className="mt-3 text-5xl font-black">
          Hotel Dashboard
        </h1>

        <p className="mt-3 text-slate-600">
          Overview of bookings, revenue and operations.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[2rem] bg-white p-6 shadow"
          >
            <div className="text-sm font-bold text-slate-500">
              {stat.label}
            </div>

            <div className="mt-3 text-4xl font-black">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <AdminCharts
        bookingData={bookingData}
        statusData={statusData}
      />
    </div>
  );
}