import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

// NOTE: this sandbox has no network access to fonts.googleapis.com, so
// Newsreader/Archivo are loaded here as a system-font fallback stack under
// the same CSS variable names the design tokens expect. In a real deploy
// (with normal internet access) swap this block for:
//
//   import { Newsreader, Archivo } from "next/font/google";
//   const newsreader = Newsreader({ subsets: ["latin"], variable: "--font-newsreader", style: ["normal", "italic"], weight: ["400","500","600"], display: "swap" });
//   const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo", weight: ["400","500","600","700"], display: "swap" });
//
// and use `${newsreader.variable} ${archivo.variable}` on <body> below.

export const metadata: Metadata = {
  title: {
    default: "VisitLappi — Discover Finnish Lapland",
    template: "%s | VisitLappi",
  },
  description:
    "An independent travel guide to Finnish Lapland: Arctic destinations, Northern Lights, wilderness experiences and practical trip planning.",
  metadataBase: new URL("https://visitlappi.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="antialiased"
        style={
          {
            "--font-newsreader":
              "Georgia, 'Iowan Old Style', 'Palatino Linotype', serif",
            "--font-archivo":
              "'Helvetica Neue', Helvetica, Arial, sans-serif",
          } as React.CSSProperties
        }
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
