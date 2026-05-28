import { prisma } from "@/lib/prisma";
import { deleteGalleryImage } from "./actions";
import { GalleryUploadForm } from "@/components/GalleryUploadForm";

export default async function AdminGalleryPage() {
  const images = await (prisma as any).galleryImage.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7] p-4 md:p-8">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="text-sm font-semibold uppercase tracking-[0.3em] text-[#7C6A46]">
            CANA Gallery
          </div>

          <h1 className="mt-2 text-3xl font-bold text-[#111] md:text-5xl">
            Gallery Manager
          </h1>

          <p className="mt-2 text-sm text-slate-500 md:text-base">
            Upload, organize and remove public gallery images.
          </p>
        </div>

        <div className="rounded-2xl bg-white px-5 py-3 text-sm font-bold text-slate-600 shadow-sm">
          {images.length} Images
        </div>
      </div>

      <div className="mb-8 rounded-[2rem] bg-white p-5 shadow-sm md:p-6">
        <GalleryUploadForm />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image: any) => (
          <div
            key={image.id}
            className="group overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-2xl"
          >
            <div
              className="relative h-72 bg-cover bg-center"
              style={{
                backgroundImage: `url('${image.imageUrl}')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-90" />

              <div className="absolute bottom-5 left-5 right-5">
                <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-white backdrop-blur">
                  {image.category}
                </div>

                <h2 className="mt-3 text-2xl font-black text-white">
                  {image.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                  Uploaded Image
                </div>

                <div className="mt-1 text-sm text-slate-500">
                  Public website gallery
                </div>
              </div>

              <form action={deleteGalleryImage}>
                <input
                  type="hidden"
                  name="imageId"
                  value={image.id}
                />

                <button className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-black text-white transition hover:bg-red-600">
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow-sm sm:col-span-2 xl:col-span-3">
            <div className="text-4xl">🖼️</div>

            <div className="mt-4 text-2xl font-black">
              No gallery images added yet.
            </div>

            <p className="mt-3 text-slate-500">
              Upload image files above to build the CANA public gallery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}