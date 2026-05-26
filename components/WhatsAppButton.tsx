"use client";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919404830921?text=Hello%20CANA%20Boutique%20Stay,%20I%20want%20to%20book%20a%20room."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-white shadow-2xl transition hover:scale-105"
    >
      <div className="text-2xl">💬</div>

      <div className="hidden sm:block">
        <div className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">
          WhatsApp
        </div>

        <div className="text-sm font-black">
          Book Instantly
        </div>
      </div>
    </a>
  );
}