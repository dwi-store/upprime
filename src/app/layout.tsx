import type { Metadata, Viewport } from "next";
import "./globals.css";
import PwaRegister from "./pwa-register";

export const metadata: Metadata = {
  title: "UPPRIME — Premium Services. Better Life.",
  description:
    "Temukan layanan dan langganan digital premium favoritmu dengan pengalaman pemesanan yang mudah di UPPRIME.",
  applicationName: "UPPRIME",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "UPPRIME" },
  manifest: "/upprime/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/upprime/favicon.svg", type: "image/svg+xml" },
      { url: "/upprime/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/upprime/favicon-180.png", sizes: "180x180", type: "image/png" }
    ],
    apple: [{ url: "/upprime/favicon-180.png", sizes: "180x180", type: "image/png" }]
  }
};

export const viewport: Viewport = {
  themeColor: "#080807",
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body><PwaRegister />{children}</body>
    </html>
  );
}