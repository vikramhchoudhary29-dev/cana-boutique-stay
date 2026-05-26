"use client";

import { useState } from "react";

export function RazorpayButton({
  bookingCode,
}: {
  bookingCode: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}) {
  const [loading, setLoading] = useState(false);

  async function payNow() {
    setLoading(true);

    const res = await fetch("/api/bookings/mark-paid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bookingCode }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Payment update failed");
      setLoading(false);
      return;
    }

    window.location.href = `/booking/${bookingCode}`;
  }

  return (
    <button
      onClick={payNow}
      disabled={loading}
      className="rounded-full bg-yellow-500 px-8 py-4 font-bold text-black"
    >
      {loading ? "Confirming..." : "Pay with Razorpay"}
    </button>
  );
}