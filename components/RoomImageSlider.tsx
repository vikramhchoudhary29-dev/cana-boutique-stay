"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type RoomImage = {
  id: string;
  imageUrl: string;
  title?: string;
  category?: string;
};

export function RoomImageSlider({
  images,
  fallbackImage,
}: {
  images: RoomImage[];
  fallbackImage?: string | null;
}) {
  const finalImages =
    images.length > 0
      ? images
      : fallbackImage
      ? [
          {
            id: "fallback",
            imageUrl: fallbackImage,
            title: "Room Image",
            category: "room",
          },
        ]
      : [];

  if (finalImages.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        loop={finalImages.length > 1}
        className="h-[340px] md:h-[520px]"
      >
        {finalImages.map((image) => (
          <SwiperSlide key={image.id}>
            <div
              className="relative h-[340px] md:h-[520px] bg-cover bg-center"
              style={{
                backgroundImage: `url('${image.imageUrl}')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              <div className="absolute bottom-8 left-8 right-8 text-white">
                <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] backdrop-blur">
                  {image.category || "Room"}
                </div>

                {image.title && (
                  <h3 className="mt-4 font-serif text-4xl font-light">
                    {image.title}
                  </h3>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}