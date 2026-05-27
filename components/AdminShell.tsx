"use client";

import Link from "next/link";
import { useState } from "react";

export function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { href: "/admin", label: "Dashboard", icon: "🏠" },
    { href: "/admin/bookings", label: "Bookings", icon: "📘" },
    { href: "/admin/rooms", label: "Rooms", icon: "🏨" },
    { href: "/admin/gallery", label: "Gallery", icon: "🖼️" },
    { href: "/admin/pricing", label: "Pricing", icon: "💰" },
    { href: "/", label: "Website", icon: "🌐" },
  ];

  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="bg-[#0F2E18] text-white lg:min-h-screen lg:border-r lg:border-[#D8D0B8] lg:p-8">
          <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0F2E18] px-4 py-4 lg:static lg:border-b-0 lg:bg-transparent lg:p-0">
            <div className="flex items-center justify-between gap-4">
              <Link href="/admin" className="min-w-0">
                <div className="truncate font-serif text-xl font-bold text-[#E8D080] lg:text-2xl">
                  CANA Admin
                </div>

                <div className="hidden text-xs uppercase tracking-[0.3em] text-white/40 sm:block">
                  Boutique Dashboard
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                className="rounded-xl bg-[#C49A28] px-4 py-2 text-sm font-black text-[#0F2E18] lg:hidden"
              >
                {open ? "Close" : "Menu"}
              </button>
            </div>

            <nav
              className={`mt-4 grid gap-3 overflow-hidden transition-all duration-300 lg:mt-10 lg:block lg:space-y-3 lg:overflow-visible ${
                open ? "max-h-[500px]" : "max-h-0 lg:max-h-none"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm font-semibold text-white/75 transition hover:border-[#C49A28]/40 hover:bg-[#C49A28]/10 hover:text-white"
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden px-8 pb-8 lg:block">
            <div className="mt-16 rounded-[2rem] border border-[#C49A28]/20 bg-white/5 p-6">
              <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8D080]">
                CANA Boutique Stay
              </div>

              <div className="mt-4 text-sm leading-7 text-white/60">
                Manage rooms, bookings, pricing and hospitality operations
                from one dashboard.
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}