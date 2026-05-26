import Link from "next/link";

export function Navbar() {
  return (
<header className="relative z-50">      <div className="mx-auto mt-4 flex w-[min(1320px,calc(100%-2rem))] items-center justify-between rounded-full border border-white/10 bg-[#0F2E18]/85 px-5 py-3 text-white shadow-2xl backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <span className="text-2xl">✦</span>

          <div>
            <div className="font-serif text-xl font-bold tracking-wide text-[#E8D080]">
              CANA BOUTIQUE STAY
            </div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-white/45">
              Boutique Stay · North Goa
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/65 md:flex">
         <Link className="hover:text-[#E8D080]" href="/gallery">
  Gallery
</Link>
          <Link className="hover:text-[#E8D080]" href="/">
            Home
          </Link>
          <Link className="hover:text-[#E8D080]" href="/rooms">
            Rooms
          </Link>
          <Link className="hover:text-[#E8D080]" href="/#amenities">
            Amenities
          </Link>
          <Link className="hover:text-[#E8D080]" href="/#events">
            Experiences
          </Link>
          <Link className="hover:text-[#E8D080]" href="/admin">
            Admin
          </Link>
        </nav>

        <Link
          href="/rooms"
          className="rounded-full bg-[#C49A28] px-5 py-2.5 text-sm font-black text-[#0F2E18] transition hover:bg-[#8A6C10] hover:text-white"
        >
          Book Stay
        </Link>
      </div>
    </header>
  );
}