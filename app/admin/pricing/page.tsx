import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/pricing";
import {
  createSeasonalRate,
  deleteSeasonalRate,
} from "./actions";

export default async function SeasonalPricingPage() {
  const rates = await (prisma as any).seasonalRate.findMany({
    orderBy: {
      startDate: "asc",
    },
    include: {
      roomType: true,
    },
  });

  const rooms = await prisma.roomType.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return (
    <div>
      <div className="mb-8">
        <div className="font-black uppercase tracking-[0.35em] text-gold">
          Admin
        </div>

        <h1 className="mt-3 text-4xl font-black">Seasonal Pricing</h1>

        <p className="mt-3 text-slate-600">
          Add custom prices for specific rooms during holidays and peak seasons.
        </p>
      </div>

      <form
        action={createSeasonalRate}
        className="mb-8 grid gap-4 rounded-[2rem] bg-white p-6 shadow md:grid-cols-2"
      >
        <input
          type="text"
          name="name"
          placeholder="Season name e.g. New Year"
          required
          className="rounded-2xl border p-4"
        />

        <select
          name="roomTypeId"
          required
          className="rounded-2xl border p-4"
        >
          <option value="">Select Room</option>
          {rooms.map((room) => (
            <option key={room.id} value={room.id}>
              {room.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="seasonPrice"
          placeholder="Custom price e.g. 25000"
          required
          className="rounded-2xl border p-4"
        />

        <input
          type="date"
          name="startDate"
          required
          className="rounded-2xl border p-4"
        />

        <input
          type="date"
          name="endDate"
          required
          className="rounded-2xl border p-4"
        />

        <button className="rounded-2xl bg-black p-4 font-bold text-white md:col-span-2">
          Add Seasonal Price
        </button>
      </form>

      <div className="grid gap-5">
        {rates.map((rate: any) => (
          <div key={rate.id} className="rounded-[2rem] bg-white p-6 shadow">
            <div className="flex flex-wrap items-center justify-between gap-5">
              <div>
                <h2 className="text-2xl font-black">{rate.name}</h2>

                <div className="mt-2 font-bold text-slate-700">
                  Room: {rate.roomType?.name}
                </div>

                <div className="mt-1 text-slate-500">
                  {new Date(rate.startDate).toDateString()} →{" "}
                  {new Date(rate.endDate).toDateString()}
                </div>
              </div>

              <div>
                <div className="text-sm font-bold text-slate-500">
                  Custom Room Price
                </div>

                <div className="text-3xl font-black">
                  {formatINR(rate.seasonPrice)}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-4 py-2 text-sm font-bold ${
                    rate.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {rate.isActive ? "ACTIVE" : "INACTIVE"}
                </span>

                <form action={deleteSeasonalRate}>
                  <input type="hidden" name="rateId" value={rate.id} />

                  <button className="rounded-full bg-red-500 px-4 py-2 text-sm font-bold text-white">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {rates.length === 0 && (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow">
            <div className="text-2xl font-black">No Seasonal Pricing Added</div>
            <p className="mt-3 text-slate-500">
              Add room-specific peak-season pricing above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}