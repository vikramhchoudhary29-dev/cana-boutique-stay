import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatINR } from "@/lib/pricing";
import {
  createRoom,
  deleteRoom,
  updateRoom,
} from "./actions";

export default async function AdminRoomsPage() {
  const roomTypes = await prisma.roomType.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <div className="text-xs font-black uppercase tracking-[0.35em] text-[#8A6C10]">
          CANA Admin
        </div>

        <h1 className="mt-3 font-serif text-5xl font-light">
          Room Management
        </h1>

        <p className="mt-3 text-[#6A7A5A]">
          Add, edit, delete and manage room images for CANA Boutique Stay.
        </p>
      </div>

      <form
        action={createRoom}
        className="mb-10 grid gap-4 rounded-[2rem] bg-white p-6 shadow md:grid-cols-2"
      >
        <input name="name" placeholder="Room name" required className="rounded-2xl border p-4" />
        <input name="slug" placeholder="room-slug" required className="rounded-2xl border p-4" />
        <input name="basePrice" type="number" placeholder="Base price" required className="rounded-2xl border p-4" />
        <input name="maxGuests" type="number" placeholder="Max guests" required className="rounded-2xl border p-4" />
        <input name="sizeSqFt" type="number" placeholder="Size sq.ft" className="rounded-2xl border p-4" />
        <input name="imageUrl" placeholder="Main image URL" className="rounded-2xl border p-4" />

        <textarea
          name="description"
          placeholder="Room description"
          required
          className="rounded-2xl border p-4 md:col-span-2"
        />

        <textarea
          name="amenities"
          placeholder="Amenities comma separated"
          required
          className="rounded-2xl border p-4 md:col-span-2"
        />

        <button className="rounded-2xl bg-[#0F2E18] px-6 py-4 font-black text-white md:col-span-2">
          Add Room
        </button>
      </form>

      <div className="grid gap-6">
        {roomTypes.map((room: any) => (
          <div
            key={room.id}
            className="overflow-hidden rounded-[2rem] bg-white shadow-xl"
          >
            <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
              <div
                className="min-h-72 bg-cover bg-center"
                style={{
                  backgroundImage: `url('${room.imageUrl}')`,
                }}
              />

              <div className="p-6">
                <div className="flex flex-col justify-between gap-6 lg:flex-row">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                      Boutique Room
                    </div>

                    <h2 className="mt-2 font-serif text-4xl">
                      {room.name}
                    </h2>

                    <p className="mt-3 max-w-3xl text-[#6A7A5A]">
                      {room.description}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <span className="rounded-full bg-[#F8F5EF] px-4 py-2 text-sm font-bold text-[#1B4A2A]">
                        {formatINR(room.basePrice)}
                      </span>

                      <span className="rounded-full bg-[#F8F5EF] px-4 py-2 text-sm font-bold text-[#1B4A2A]">
                        {room.maxGuests} guests
                      </span>

                      <span className="rounded-full bg-[#F8F5EF] px-4 py-2 text-sm font-bold text-[#1B4A2A]">
                        {room.sizeSqFt ?? "-"} sq.ft.
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-start gap-3">
                    <Link
                      href={`/admin/rooms/${room.id}/images`}
                      className="rounded-full bg-[#0F2E18] px-5 py-3 text-sm font-black text-white"
                    >
                      Manage Images
                    </Link>

                    <form action={deleteRoom}>
                      <input type="hidden" name="roomId" value={room.id} />

                      <button className="rounded-full bg-red-500 px-5 py-3 text-sm font-black text-white">
                        Delete
                      </button>
                    </form>
                  </div>
                </div>

                <form
                  action={updateRoom}
                  className="mt-8 grid gap-4 rounded-[2rem] bg-[#F8F5EF] p-5 md:grid-cols-2"
                >
                  <input type="hidden" name="roomId" value={room.id} />

                  <input
                    name="name"
                    defaultValue={room.name}
                    className="rounded-2xl border p-4"
                  />

                  <input
                    name="slug"
                    defaultValue={room.slug}
                    className="rounded-2xl border p-4"
                  />

                  <input
                    name="basePrice"
                    type="number"
                    defaultValue={room.basePrice}
                    className="rounded-2xl border p-4"
                  />

                  <input
                    name="maxGuests"
                    type="number"
                    defaultValue={room.maxGuests}
                    className="rounded-2xl border p-4"
                  />

                  <input
                    name="sizeSqFt"
                    type="number"
                    defaultValue={room.sizeSqFt ?? ""}
                    className="rounded-2xl border p-4"
                  />

                  <input
                    name="imageUrl"
                    defaultValue={room.imageUrl ?? ""}
                    className="rounded-2xl border p-4"
                  />

                  <textarea
                    name="description"
                    defaultValue={room.description}
                    className="rounded-2xl border p-4 md:col-span-2"
                  />

                  <textarea
                    name="amenities"
                    defaultValue={room.amenities}
                    className="rounded-2xl border p-4 md:col-span-2"
                  />

                  <button className="rounded-2xl bg-[#C49A28] px-6 py-4 font-black text-[#0F2E18] md:col-span-2">
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {roomTypes.length === 0 && (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow">
            <div className="font-serif text-3xl">
              No rooms added yet.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}