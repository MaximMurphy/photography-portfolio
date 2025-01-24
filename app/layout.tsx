import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const font = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "35mm Photos - Maxim Murphy",
  description: "Maxim Murphy's 35mm Photography Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${font.variable} antialiased h-[100dvh] lg:overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
