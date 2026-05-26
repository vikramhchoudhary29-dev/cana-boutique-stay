"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xl text-[#E8D080]"
      >
        ☰
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-56 rounded-2xl border border-white/10 bg-[#0F2E18] p-3 shadow-2xl">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            Home
          </Link>

          <Link
            href="#rooms"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            Rooms
          </Link>

          <Link
            href="#amenities"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            Amenities
          </Link>

          <Link
            href="/gallery"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            Gallery
          </Link>

          <Link
            href="#location"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            Location
          </Link>

          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className="block rounded-xl px-4 py-3 text-sm font-bold text-white/80 hover:bg-white/10"
          >
            Admin
          </Link>
        </div>
      )}
    </div>
  );
}