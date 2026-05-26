"use client";

import { useEffect, useState } from "react";

type Booking = {
  checkIn: string;
  checkOut: string;
};

export function AvailabilityCalendar({
  roomTypeId,
}: {
  roomTypeId: string;
}) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAvailability() {
      const res = await fetch(`/api/availability?roomTypeId=${roomTypeId}`);
      const data = await res.json();

      setBookings(data.bookings || []);
      setLoading(false);
    }

    loadAvailability();
  }, [roomTypeId]);

  if (loading) {
    return (
      <div className="luxury-card rounded-[2.5rem] p-7">
        <div className="text-sm font-bold text-[#6A7A5A]">
          Loading CANA availability...
        </div>
      </div>
    );
  }

  return (
    <div className="luxury-card overflow-hidden rounded-[2.5rem]">
      <div className="bg-[#0F2E18] p-7 text-white">
        <div className="luxury-subtitle text-[#E8D080]">
          Room Availability
        </div>

        <h3 className="mt-3 font-serif text-4xl font-light">
          Booked Dates
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/55">
          Check unavailable dates before confirming your CANA Boutique Stay
          booking.
        </p>
      </div>

      <div className="p-7">
        {bookings.length === 0 ? (
          <div className="rounded-[2rem] border border-green-200 bg-green-50 p-6">
            <div className="text-sm font-black uppercase tracking-[0.25em] text-green-700">
              Fully Available
            </div>

            <p className="mt-3 text-green-800">
              This room currently has no blocked dates.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {bookings.map((booking, index) => (
              <div
                key={index}
                className="rounded-[2rem] border border-red-200 bg-red-50 p-5"
              >
                <div className="text-xs font-black uppercase tracking-[0.25em] text-red-700">
                  Not Available
                </div>

                <div className="mt-2 font-bold text-red-800">
                  {new Date(booking.checkIn).toDateString()} →{" "}
                  {new Date(booking.checkOut).toDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}