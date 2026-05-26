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
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <div className="text-xs font-black uppercase tracking-[0.35em] text-[#8A6C10]">
          CANA Admin
        </div>

        <h1 className="mt-3 font-serif text-5xl font-light">
          Gallery Manager
        </h1>

        <p className="mt-3 text-[#6A7A5A]">
          Upload, manage and remove gallery images shown on the public website.
        </p>
      </div>

      <GalleryUploadForm />

      <div className="grid gap-6 md:grid-cols-3">
        {images.map((image: any) => (
          <div
            key={image.id}
            className="overflow-hidden rounded-[2rem] bg-white shadow-xl"
          >
            <div
              className="h-64 bg-cover bg-center"
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

              <form action={deleteGalleryImage} className="mt-5">
                <input
                  type="hidden"
                  name="imageId"
                  value={image.id}
                />

                <button className="rounded-full bg-red-500 px-5 py-3 font-bold text-white">
                  Delete Image
                </button>
              </form>
            </div>
          </div>
        ))}

        {images.length === 0 && (
          <div className="rounded-[2rem] bg-white p-10 text-center shadow md:col-span-3">
            <div className="font-serif text-3xl">
              No gallery images added yet.
            </div>

            <p className="mt-3 text-[#6A7A5A]">
              Upload image files above to build the CANA gallery.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}