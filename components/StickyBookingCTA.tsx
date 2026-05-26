"use client";

import Link from "next/link";

export function StickyBookingCTA({
  roomSlug,
}: {
  roomSlug: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[998] border-t border-[#D8D0B8] bg-white/95 p-4 shadow-2xl backdrop-blur md:hidden">
      <div className="flex gap-3">
        <Link
          href={`/rooms/${roomSlug}#booking-form`}
          className="flex-1 rounded-2xl bg-[#0F2E18] px-4 py-4 text-center text-sm font-black text-white"
        >
          Book This Room
        </Link>

        <a
          href="https://wa.me/918055171338?text=Hello%20CANA%20Boutique%20Stay,%20I%20want%20to%20enquire%20about%20a%20room."
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-2xl bg-[#25D366] px-5 py-4 text-sm font-black text-white"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}