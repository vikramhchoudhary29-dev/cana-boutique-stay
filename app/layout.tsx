import "./globals.css";
import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
export const metadata: Metadata = {
  title: "CANA BOUTIQUE STAY | North Goa Boutique Hotel",
  description:
    "CANA BOUTIQUE STAY is a premium boutique stay experience in Kamat Nagar, Socorro, Bardez, North Goa.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );
}