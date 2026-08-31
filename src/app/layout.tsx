import type { Metadata, Viewport } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kunal Naskar — Sr. Software Developer (App / Web)",
  description:
    "Portfolio of Kunal Naskar, a software engineer with 6+ years of experience building scalable, high-performance web and mobile products with React, React Native, Next.js and TypeScript.",
  keywords: [
    "Kunal Naskar",
    "React Native developer",
    "Senior Software Engineer",
    "Next.js",
    "TypeScript",
    "Pune",
  ],
  authors: [{ name: "Kunal Naskar" }],
  openGraph: {
    title: "Kunal Naskar — Sr. Software Developer (App / Web)",
    description:
      "6+ years building scalable web and mobile products with React Native, Next.js and TypeScript.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#000A36",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-navy-900 text-ice">{children}</body>
    </html>
  );
}
