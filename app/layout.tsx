import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://floren.at";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Floren — Social Media Agency",
    template: "%s — Floren",
  },

  description:
    "Creative social media agency helping brands grow through strategy, content creation and short-form video.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Floren — Social Media Agency",
    description:
      "Creative social media strategy, content creation and branding for modern businesses.",
    url: siteUrl,
    siteName: "Floren",
    locale: "de_AT",
    type: "website",
    images: [
      {
        url: "/logos/floren_full_color_withoutbg.png",
        width: 1200,
        height: 630,
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Floren — Social Media Agency",
    description:
      "Creative social media strategy, content creation and branding.",
    images: ["/logos/floren_full_color_withoutbg.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full font-sans">{children}</body>
    </html>
  );
}
