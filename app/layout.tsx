import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://floren.at";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Floren — Premium Social Media Agency Austria", template: "%s — Floren" },
  description: "Premium social media strategy, content and growth systems for ambitious brands in Austria.",
  alternates: { canonical: "/" },
  openGraph: { title: "Floren — Premium Social Media Agency", description: "Elegant social media systems that convert attention into trust.", url: siteUrl, siteName: "Floren", locale: "de_AT", type: "website", images: [{ url: "/logos/floren_full_color_withoutbg.png", width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", title: "Floren — Premium Social Media Agency", description: "Premium social media for modern brands.", images: ["/logos/floren_full_color_withoutbg.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="de" className="h-full antialiased"><body className="min-h-full font-sans">{children}</body></html>;
}
