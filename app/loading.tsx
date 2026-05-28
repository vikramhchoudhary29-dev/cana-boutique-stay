export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#F8F5EF]/90 backdrop-blur">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-4 border-[#D8D0B8] border-t-[#0F2E18]" />

        <div className="mt-5 text-xs font-black uppercase tracking-[0.35em] text-[#8A6C10]">
          CANA Boutique Stay
        </div>

        <div className="mt-2 font-serif text-2xl text-[#0F2E18]">
          Loading...
        </div>
      </div>
    </div>
  );
}