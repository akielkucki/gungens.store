import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Gungens - Minecraft Server Webstore | Exclusive In-Game Items",
    description:
        "Discover exclusive in-game items, plugins, and resources for your Minecraft server at Gungens Webstore. Enhance your gameplay with custom items designed for the ultimate Minecraft experience.",
    openGraph: {
        title: "Gungens - Minecraft Server Webstore",
        description:
            "Discover exclusive in-game items, plugins, and resources for your Minecraft server at Gungens Webstore.",
        url: "https://gungens.store",
        siteName: "Gungens Webstore",
        images: [
            {
                url: "https://gungens.store/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Gungens Webstore - Minecraft Items",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Gungens - Minecraft Server Webstore",
        description:
            "Discover exclusive in-game items, plugins, and resources for your Minecraft server at Gungens Webstore.",
        creator: "@yourtwitterhandle", // Update if applicable
        images: ["https://gungens.store/twitter-image.jpg"],
    },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <Head>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "name": "Gungens Webstore",
                    "url": "https://gungens.store",
                    "potentialAction": {
                        "@type": "SearchAction",
                        "target": "https://gungens.store/search?query={search_term_string}",
                        "query-input": "required name=search_term_string",
                    },
                }),
            }}
        />

    </Head>
    <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
    {children}
    </body>
    </html>
  );
}
