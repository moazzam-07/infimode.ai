import type { Metadata } from "next";
import { Geist, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "infimode.ai — AI Infrastructure That Never Stops",
  description:
    "We build autonomous AI systems and automation infrastructure that generate revenue 24/7. Done-for-you. Guaranteed results.",
  openGraph: {
    title: "infimode.ai — AI Infrastructure That Never Stops",
    description:
      "Done-for-you AI systems and automation infrastructure for ambitious companies.",
    type: "website",
    url: "https://infimode.ai",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-white text-[#1a1a1a] overflow-x-clip selection:bg-[#1a1a1a] selection:text-white">
        {children}
      </body>
    </html>
  );
}
