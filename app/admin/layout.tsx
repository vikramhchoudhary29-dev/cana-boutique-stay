import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8F5EF]">
      <div className="grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-[#D8D0B8] bg-[#0F2E18] p-8 text-white">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl text-[#E8D080]">✦</span>

              <div>
                <div className="font-serif text-2xl font-light text-[#E8D080]">
                  CANA Admin
                </div>

                <div className="mt-1 text-xs uppercase tracking-[0.35em] text-white/40">
                  Boutique Stay Dashboard
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-3">
              <Link
                href="/admin"
                className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/75 transition hover:border-[#C49A28]/40 hover:bg-[#C49A28]/10 hover:text-white"
              >
                Dashboard
              </Link>

              <Link
                href="/admin/bookings"
                className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/75 transition hover:border-[#C49A28]/40 hover:bg-[#C49A28]/10 hover:text-white"
              >
                Bookings
              </Link>

              <Link
                href="/admin/rooms"
                className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/75 transition hover:border-[#C49A28]/40 hover:bg-[#C49A28]/10 hover:text-white"
              >
                Rooms
              </Link>

              <Link
                href="/admin/pricing"
                className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/75 transition hover:border-[#C49A28]/40 hover:bg-[#C49A28]/10 hover:text-white"
              >
                Seasonal Pricing
              </Link>

              <Link
                href="/"
                className="block rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white/75 transition hover:border-[#C49A28]/40 hover:bg-[#C49A28]/10 hover:text-white"
              >
                View Website
              </Link>
            </div>
          </div>

          <div className="mt-16 rounded-[2rem] border border-[#C49A28]/20 bg-white/5 p-6">
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E8D080]">
              CANA Boutique Stay
            </div>

            <div className="mt-4 text-sm leading-7 text-white/60">
              Manage rooms, bookings, pricing and boutique hospitality
              operations from one dashboard.
            </div>
          </div>
        </aside>

        <main className="overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}