import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KJV Bible Reader",
  description: "Simple public-domain Bible reading website.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
