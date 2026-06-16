import type { Metadata } from "next";
import { DM_Mono, DM_Sans } from "next/font/google";
import "./globals.scss";

const dmsans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const dmmono = DM_Mono({
  variable: "--font-dm-mono",
  weight: "400"
});

export const metadata: Metadata = {
  title: "Todo list",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmsans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
