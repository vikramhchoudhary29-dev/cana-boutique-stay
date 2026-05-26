import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { RoomImageUploadForm } from "@/components/RoomImageUploadForm";
import { deleteRoomImage } from "./actions";

export default async function RoomImagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const room = await prisma.roomType.findUnique({
    where: {
      id,
    },
  });

  if (!room) {
    notFound();
  }

  const images = await (prisma as any).roomImage.findMany({
    where: {
      roomTypeId: room.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <div className="text-xs font-black uppercase tracking-[0.35em] text-[#8A6C10]">
          Room Images
        </div>

        <h1 className="mt-3 font-serif text-5xl font-light">
          {room.name}
        </h1>

        <p className="mt-3 text-[#6A7A5A]">
          Upload and manage room-specific images for this room.
        </p>
      </div>

      <RoomImageUploadForm roomTypeId={room.id} />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {images.map((image: any) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-[2rem] bg-white shadow-xl"
          >
            <div
              className="h-72 bg-cover bg-center"
              style={{
                backgroundImage: `url('${image.imageUrl}')`,
              }}
            />

            <div className="p-5">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                {image.category}
              </div>

              <h2 className="mt-2 font-serif text-2xl">
                {image.title}
              </h2>

              {image.isPrimary && (
                <div className="mt-4 inline-flex rounded-full bg-[#0F2E18] px-4 py-2 text-xs font-black text-white">
                  Primary Image
                </div>
              )}

              <form action={deleteRoomImage} className="mt-5">
                <input
                  type="hidden"
                  name="imageId"
                  value={image.id}
                />

                <input
                  type="hidden"
                  name="roomTypeId"
                  value={room.id}
                />

                <button className="rounded-full bg-red-500 px-5 py-3 text-sm font-black text-white">
                  Delete Image
                </button>
              </form>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow md:col-span-3">
            <div className="font-serif text-3xl">
              No room images uploaded yet.
            </div>

            <p className="mt-3 text-[#6A7A5A]">
              Upload images above to build this room gallery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}