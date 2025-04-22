import type { Metadata } from "next";
import {  Mona_Sans } from "next/font/google";
import "./globals.css";

const geistSans = Mona_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const MonaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepWise",
  description: "A mock interview preparation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${MonaSans.className}  antialiased pattern`}
      >
        {children}
      </body>
    </html>
  );
}
