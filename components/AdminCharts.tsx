"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function AdminCharts({
  bookingData,
  statusData,
}: {
  bookingData: { name: string; bookings: number; revenue: number }[];
  statusData: { name: string; value: number }[];
}) {
  return (
    <div className="mt-10 grid gap-6 xl:grid-cols-2">
      <div className="rounded-[2rem] bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-black">Bookings & Revenue</h2>

        <div className="h-80">
<ResponsiveContainer width="100%" height="100%">            <BarChart data={bookingData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" />
              <Bar dataKey="revenue" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow">
        <h2 className="mb-6 text-2xl font-black">Booking Status</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                outerRadius={110}
                label
              >
                {statusData.map((_, index) => (
                  <Cell key={index} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}