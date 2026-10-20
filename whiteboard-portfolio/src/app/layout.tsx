import type { Metadata } from "next";
import { Caveat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-marker",
  subsets: ["latin"],
  weight: "700",
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ermias Simegne — Software Engineer Portfolio",
  description:
    "Interactive 2.5D spatial portfolio of Ermias Simegne — Backend, AI & Full-Stack Software Engineer.",
  keywords: [
    "Ermias Simegne",
    "Software Engineer",
    "Backend",
    "AI",
    "Full-Stack",
    "Portfolio",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#070707] text-white font-sans">
        {children}
      </body>
    </html>
  );
}
