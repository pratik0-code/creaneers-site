import type { Metadata } from "next";
import { Outfit, Great_Vibes, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SignaturePreloader from "@/components/SignaturePreloader";
import DeveloperSignature from "@/components/DeveloperSignature";

const outfit = Outfit({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
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
  openGraph: {
    title: "CREANEERS | Design and Consult",
    description: "Sculpting spaces that inspire, endure, and elevate the human experience.",
    images: [{ url: "/icon.jpg" }],
    siteName: "CREANEERS",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} ${greatVibes.variable} ${poppins.variable}`}>
        <DeveloperSignature />
        <SignaturePreloader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

