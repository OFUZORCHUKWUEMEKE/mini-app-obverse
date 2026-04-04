import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Figtree, Onest } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/ui/ClientLayout";
import { FarcasterProvider } from "@/providers/FarcasterProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

const onest = Onest({
  subsets: ["latin"],
  variable: "--font-onest",
});

const DOMAIN = process.env.NEXT_PUBLIC_APP_URL ?? "https://YOUR_DOMAIN.vercel.app";

const frameEmbed = JSON.stringify({
  version: "1",
  imageUrl: `${DOMAIN}/og-image.png`,
  button: {
    title: "Open Obverse",
    action: {
      type: "launch_miniapp",
      url: DOMAIN,
      name: "Obverse",
      splashImageUrl: `${DOMAIN}/splash.png`,
      splashBackgroundColor: "#141414",
    },
  },
});

export const metadata: Metadata = {
  title: "Obverse",
  description: "Stablecoin payments, simplified. Create payment links, receive USDC/USDT, and track invoices.",
  other: {
    "fc:miniapp": frameEmbed,
    "fc:frame": frameEmbed,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${onest.variable} ${figtree.variable} ${geistMono.variable} antialiased bg-[#141414]`}
      >
        <FarcasterProvider>
          <ClientLayout>{children}</ClientLayout>
        </FarcasterProvider>
      </body>
    </html>
  );
}
