import { createBooking } from "@/app/actions/bookings";
import { formatINR } from "@/lib/pricing";

type BookingFormProps = {
  roomTypeId: string;
  roomName: string;
  basePrice: number;
};

export function BookingForm({
  roomTypeId,
  roomName,
  basePrice,
}: BookingFormProps) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      action={createBooking}
      className="luxury-card rounded-[2.5rem] p-7 shadow-2xl"
    >
      <input type="hidden" name="roomTypeId" value={roomTypeId} />

      <div className="mb-7">
        <div className="luxury-subtitle">CANA Reservations</div>

        <h2 className="mt-3 font-serif text-4xl font-light leading-none">
          Book Your
          <span className="block italic text-[#1B4A2A]">
            Boutique Stay
          </span>
        </h2>

        <p className="mt-4 text-sm leading-7 text-[#6A7A5A]">
          {roomName} starts from{" "}
          <span className="font-black text-[#1B4A2A]">
            {formatINR(basePrice)}
          </span>{" "}
          per night.
        </p>
      </div>

      <div className="grid gap-4">
        <input
          className="luxury-input"
          name="guestName"
          placeholder="Full name"
          required
        />

        <input
          className="luxury-input"
          name="guestEmail"
          type="email"
          placeholder="Email address"
          required
        />

        <input
          className="luxury-input"
          name="guestPhone"
          placeholder="Phone number"
          required
        />

        <div className="grid gap-4 md:grid-cols-2">
          <label className="grid gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#8A6C10]">
            Check-in
            <input
              className="luxury-input font-normal normal-case tracking-normal"
              name="checkIn"
              type="date"
              min={today}
              required
            />
          </label>

          <label className="grid gap-2 text-xs font-black uppercase tracking-[0.22em] text-[#8A6C10]">
            Check-out
            <input
              className="luxury-input font-normal normal-case tracking-normal"
              name="checkOut"
              type="date"
              min={today}
              required
            />
          </label>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <input
            className="luxury-input"
            name="adults"
            type="number"
            min="1"
            defaultValue="2"
            placeholder="Adults"
            required
          />

          <input
            className="luxury-input"
            name="children"
            type="number"
            min="0"
            defaultValue="0"
            placeholder="Children"
            required
          />

          <input
            className="luxury-input"
            name="rooms"
            type="number"
            min="1"
            defaultValue="1"
            placeholder="Rooms"
            required
          />
        </div>

        <textarea
          className="luxury-input min-h-28 resize-none"
          name="specialRequest"
          placeholder="Special request, arrival notes..."
        />

        <button className="luxury-button mt-2 rounded-2xl px-6 py-5 text-base">
          Continue Booking
        </button>
      </div>
    </form>
  );
}