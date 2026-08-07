import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Layout/Navbar";
import Footer from "@/components/Layout/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: {
    default: "ClickMart — Everything You Need, Just a Click Away",
    template: "%s | ClickMart",
  },
  description:
    "Shop thousands of top-quality products across tech, fashion, home essentials, and more. Enjoy fast express delivery, exclusive deals, and secure checkout at ClickMart.",
  keywords: [
    "e-commerce",
    "online shopping",
    "buy electronics online",
    "fashion deals",
    "home essentials",
    "ClickMart",
    "express shipping",
  ],
  authors: [{ name: "ClickMart Team" }],
  creator: "ClickMart",
  publisher: "ClickMart Inc.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.clickmart.com"), // Replace with your production domain
  openGraph: {
    title: "ClickMart — Everything You Need, Just a Click Away",
    description:
      "Shop top-quality products with express shipping, exclusive discounts, and 100% secure checkout.",
    url: "https://www.clickmart.com",
    siteName: "ClickMart",
    images: [
      {
        url: "/og-image.jpg", // Place an 1200x630px image inside /public
        width: 1200,
        height: 630,
        alt: "ClickMart Online Shopping Store",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ClickMart — Everything You Need, Just a Click Away",
    description:
      "Shop top-quality products with express shipping and exclusive discounts.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">
          {children}
          <Toaster  position="top-right" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
