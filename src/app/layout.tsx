import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { VoiceTour } from "@/components/VoiceTour";
import { CookieBanner } from "@/components/CookieBanner";
import { LenisProvider } from "@/components/LenisProvider";
import { siteConfig } from "@/lib/site";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: {
    default: "SUPER Chris Pies and Pastries | Fresh Pies, Pastries and Baking Classes in Kenya",
    template: "%s | SUPER Chris Pies and Pastries",
  },
  description: siteConfig.oneLiner,
  metadataBase: new URL("https://super-chris-pies.vercel.app"),
  openGraph: {
    title: "SUPER Chris Pies and Pastries",
    description: siteConfig.oneLiner,
    type: "website",
    locale: "en_KE",
    siteName: "SUPER Chris Pies and Pastries",
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#e75b1e",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <LocaleProvider>
            <LenisProvider>
              <Header />
              <main id="main-content">{children}</main>
              <Footer />
              <FloatingWhatsApp />
              <VoiceTour />
              <CookieBanner />
            </LenisProvider>
          </LocaleProvider>
        </Providers>
      </body>
    </html>
  );
}
