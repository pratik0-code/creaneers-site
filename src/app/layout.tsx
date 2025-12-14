import type { Metadata } from "next";
import { Outfit, Geist, Geist_Mono, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignaturePreloader from "@/components/SignaturePreloader";
import DeveloperSignature from "@/components/DeveloperSignature";

const outfit = Outfit({ subsets: ["latin"] });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "CREANEERS | Design and Consult",
  description: "Sculpting spaces that inspire, endure, and elevate the human experience.",
  icons: {
    icon: "/icon.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${greatVibes.variable} ${poppins.variable} antialiased bg-background text-neutral-900 selection:bg-neutral-900 selection:text-white`}>
        <DeveloperSignature />
        <SignaturePreloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

