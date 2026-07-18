import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Great_Vibes } from "next/font/google";
import AudioPlayer from "@/components/AudioPlayer"; // Import the new player
import "./globals.css";

const cinzel = Cinzel({ 
  subsets: ["latin"],
  variable: "--font-cinzel",
});

const cormorant = Cormorant_Garamond({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ['normal', 'italic'],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: "Kalyani & Sachin | You are invited",
  description: "Join us in celebrating our special day.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${cormorant.variable} ${greatVibes.variable} bg-[#FDFBF7] antialiased`}>
        {/* The Audio Player will now float over every page universally */}
        <AudioPlayer />
        {children}
      </body>
    </html>
  );
}