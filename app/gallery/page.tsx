import { Navbar } from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export default async function GalleryPage() {
  const images = await (prisma as any).galleryImage.findMany({
    where: {
      isActive: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="bg-[#F8F5EF]">
      <Navbar />

      <section className="relative overflow-hidden px-6 py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-xs font-bold uppercase tracking-[0.35em] text-[#8A6C10]">
            CANA Gallery
          </div>

          <h1 className="mt-5 font-serif text-6xl font-light md:text-8xl">
            A Glimpse Of{" "}
            <span className="italic text-[#1B4A2A]">
              Boutique Goa
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#6A7A5A]">
            Explore the calm spaces, boutique rooms, poolside comfort and
            tropical atmosphere of CANA BOUTIQUE STAY.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {images.map((image: any, index: number) => (
            <div
              key={image.id}
              className={`group overflow-hidden rounded-[2rem] bg-white shadow-xl ${
                index === 0 || index === 4
                  ? "md:row-span-2"
                  : ""
              }`}
            >
              <div
                className={`bg-cover bg-center transition duration-700 group-hover:scale-105 ${
                  index === 0 || index === 4
                    ? "h-[620px]"
                    : "h-[300px]"
                }`}
                style={{
                  backgroundImage: `url('${image.imageUrl}')`,
                }}
              />

              <div className="border-t border-[#ECE7DA] p-5">
                <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#8A6C10]">
                  {image.category}
                </div>

                <h2 className="mt-2 font-serif text-2xl">
                  {image.title}
                </h2>
              </div>
            </div>
          ))}

          {images.length === 0 && (
            <div className="rounded-[2rem] bg-white p-16 text-center shadow md:col-span-3">
              <div className="font-serif text-4xl">
                Gallery Coming Soon
              </div>

              <p className="mt-4 text-[#6A7A5A]">
                Boutique visuals will appear here once uploaded from admin panel.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-5xl rounded-[3rem] bg-[#0F2E18] px-10 py-20 text-center text-white shadow-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.35em] text-[#E8D080]">
            Boutique Goa Experience
          </div>

          <h2 className="mt-5 font-serif text-5xl font-light md:text-6xl">
            Experience Peaceful
            <span className="block italic text-[#E8D080]">
              North Goa Luxury
            </span>
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/65">
            From relaxing poolside mornings to boutique interiors and warm
            hospitality, CANA BOUTIQUE STAY offers a calm modern Goa stay
            experience.
          </p>

          <a
            href="/rooms"
            className="mt-10 inline-flex rounded-full bg-[#C49A28] px-8 py-4 font-black text-[#0F2E18]"
          >
            Explore Rooms →
          </a>
        </div>
      </section>
    </main>
  );
}