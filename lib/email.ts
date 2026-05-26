import nodemailer from "nodemailer";

export async function sendBookingEmail({
  to,
  guestName,
  guestPhone,
  guestEmail,
  roomName,
  checkIn,
  checkOut,
  amount,
  bookingCode,
}: {
  to: string;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  bookingCode: string;
}) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  console.log("Email skipped: SMTP credentials missing");
  return;
}
    const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject: `Booking Confirmation - ${bookingCode}`,
    html: `
      <h2>Booking Confirmed</h2>

      <p><strong>Booking Code:</strong> ${bookingCode}</p>
      <p><strong>Guest:</strong> ${guestName}</p>
      <p><strong>Email:</strong> ${guestEmail}</p>
      <p><strong>Phone:</strong> ${guestPhone}</p>
      <p><strong>Room:</strong> ${roomName}</p>
      <p><strong>Check In:</strong> ${checkIn}</p>
      <p><strong>Check Out:</strong> ${checkOut}</p>
      <p><strong>Total Amount:</strong> ₹${amount}</p>

      <br/>
      <p>Thank you for booking with Aurelia Goa Luxury Hotel.</p>
    `,
  });
}