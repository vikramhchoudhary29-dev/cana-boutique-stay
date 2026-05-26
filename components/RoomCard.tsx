import Link from "next/link";
import { formatINR } from "@/lib/pricing";

type RoomCardProps = {
  room: {
    id: string;
    name: string;
    slug: string;
    description: string;
    basePrice: number;
    imageUrl: string | null;
    maxGuests: number;
  };
};

export function RoomCard({ room }: RoomCardProps) {
  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
      <div
        className="h-72 bg-cover bg-center"
        style={{
          backgroundImage: `url(${room.imageUrl ?? "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"})`
        }}
      />
      <div className="p-7">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h3 className="text-2xl font-black">{room.name}</h3>
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-bold">
            {room.maxGuests} guests
          </span>
        </div>
        <p className="mb-5 line-clamp-3 text-slate-600">{room.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">
              From
            </div>
            <div className="text-xl font-black text-palm">{formatINR(room.basePrice)}</div>
          </div>
          <Link
            href={`/rooms/${room.slug}`}
            className="rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
          >
            View Room
          </Link>
        </div>
      </div>
    </article>
  );
}
