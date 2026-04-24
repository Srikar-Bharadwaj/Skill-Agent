import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";
import CursorBubbles from "@/components/CursorBubbles";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Catalyst | AI Skill Assessment",
  description: "AI-powered adaptive technical interviews.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">
        <CursorBubbles />
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40 p-4 font-semibold text-lg">
          Catalyst
        </nav>
        {children}
      </body>
    </html>
  );
}
