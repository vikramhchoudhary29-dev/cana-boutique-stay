"use client";

import { useState } from "react";

export function LivePricePreview({
  roomTypeId,
  basePrice,
}: {
  roomTypeId: string;
  basePrice: number;
}) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [isSeasonal, setIsSeasonal] = useState(false);
  const [loading, setLoading] = useState(false);

  async function checkPrice() {
    if (!checkIn || !checkOut) return;

    setLoading(true);

    const res = await fetch(
      `/api/pricing?roomTypeId=${roomTypeId}&checkIn=${checkIn}&checkOut=${checkOut}`
    );

    const data = await res.json();

    setPrice(data.price);
    setIsSeasonal(data.isSeasonal);

    setLoading(false);
  }

  return (
    <div className="luxury-card overflow-hidden rounded-[2.5rem]">
      <div className="border-b border-[#D8D0B8]/60 bg-[#0F2E18] p-7 text-white">
        <div className="luxury-subtitle text-[#E8D080]">
          CANA Pricing
        </div>

        <h3 className="mt-3 font-serif text-4xl font-light">
          Check Your
          <span className="block italic text-[#E8D080]">
            Stay Price
          </span>
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/55">
          Select your stay dates to view the exact boutique room pricing and
          seasonal offers.
        </p>
      </div>

      <div className="p-7">
        <div className="rounded-[2rem] bg-[#F8F5EF] p-5">
          <div className="text-xs font-black uppercase tracking-[0.25em] text-[#8A6C10]">
            Starting Price
          </div>

          <div className="mt-2 text-3xl font-black text-[#1B4A2A]">
            ₹{basePrice}
          </div>

          <div className="mt-1 text-xs text-[#6A7A5A]">
            Base nightly room rate
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#8A6C10]">
            Check-in
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="luxury-input font-normal normal-case tracking-normal"
            />
          </label>

          <label className="grid gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#8A6C10]">
            Check-out
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="luxury-input font-normal normal-case tracking-normal"
            />
          </label>

          <button
            type="button"
            onClick={checkPrice}
            className="luxury-button rounded-2xl px-6 py-5 text-base"
          >
            {loading ? "Checking Price..." : "Check Final Price"}
          </button>
        </div>

        {price !== null && (
          <div className="mt-6 rounded-[2rem] border border-[#C49A28]/25 bg-[#FCF8E6] p-6">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-[#8A6C10]">
              Final Room Price
            </div>

            <div className="mt-3 text-5xl font-black text-[#0F2E18]">
              ₹{price}
            </div>

            <div className="mt-3 inline-flex rounded-full bg-[#1B4A2A] px-4 py-2 text-xs font-bold text-white">
              {isSeasonal
                ? "Seasonal Pricing Applied"
                : "Standard Pricing"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}