import type { Metadata } from "next";
import { Outfit, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignaturePreloader from "@/components/SignaturePreloader";

const outfit = Outfit({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CREANEERS | Architecture & Interior",
  description: "Sculpting spaces that inspire, endure, and elevate the human experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased bg-background text-neutral-900 selection:bg-neutral-900 selection:text-white`}>
        <SignaturePreloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
