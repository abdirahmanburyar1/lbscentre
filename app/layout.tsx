import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: {
    default: "LBS Centre for Social & Agricultural Development",
    template: "%s | LBS Centre",
  },
  description:
    "LBS Centre for Social & Agricultural Development (LNGO – Somalia). Food security, sustainable agriculture, livestock, climate resilience, WASH, and youth empowerment.",
  icons: {
    icon: "/lbscentre.png",
    apple: "/lbscentre.png",
  },
  openGraph: {
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
