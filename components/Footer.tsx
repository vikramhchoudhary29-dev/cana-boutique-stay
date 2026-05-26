import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0B1F12] text-white">
      <div className="absolute inset-0 opacity-10">
        <div
          className="h-full w-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1800&auto=format&fit=crop')",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr_.8fr_.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-3xl text-[#E8D080]">✦</span>

              <div>
                <div className="font-serif text-4xl font-light text-[#E8D080]">
                  CANA BOUTIQUE STAY
                </div>

                <div className="mt-1 text-xs uppercase tracking-[0.35em] text-white/40">
                  Boutique Stay · North Goa
                </div>
              </div>
            </div>

            <p className="mt-8 max-w-md text-lg leading-8 text-white/60">
              A refined boutique stay experience in North Goa, crafted for
              comfort, calm and tropical elegance.
            </p>
          </div>

          <div>
            <div className="mb-6 font-serif text-2xl text-[#E8D080]">
              Explore
            </div>

            <div className="grid gap-4 text-white/60">
              <Link href="/">Home</Link>
              <Link href="/rooms">Rooms</Link>
              <Link href="/#amenities">Amenities</Link>
              <Link href="/#events">Experiences</Link>
              <Link href="/admin">Admin</Link>
            </div>
          </div>

          <div>
            <div className="mb-6 font-serif text-2xl text-[#E8D080]">
              Stay
            </div>

            <div className="grid gap-4 text-white/60">
              <div>Boutique Rooms</div>
              <div>Swimming Pool</div>
              <div>Dining</div>
              <div>Family Stay</div>
              <div>Goa Getaway</div>
            </div>
          </div>

          <div>
            <div className="mb-6 font-serif text-2xl text-[#E8D080]">
              Contact
            </div>

            <div className="grid gap-5 text-white/60">
              <div>
                Kamat Nagar, Socorro,
                <br />
                Bardez, North Goa
              </div>

              <div>Goa - 403501</div>

              <div>www.canaboutiquestay.com</div>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 text-sm text-white/35 md:flex-row">
          <div>© 2026 CANA BOUTIQUE STAY. All rights reserved.</div>

          <div className="flex gap-6">
            <div>Privacy Policy</div>
            <div>Terms</div>
            <div>Luxury Boutique Stay Experience</div>
          </div>
        </div>
      </div>
    </footer>
  );
}