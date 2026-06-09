import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { BrandingProvider } from "@/components/providers/BrandingProvider";
import { SectionsProvider } from "@/components/providers/SectionsProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingChat from "@/components/ui/FloatingChat";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vulpine Limited | Design, Construction & Maintenance | East Africa",
  description: "Vulpine Limited is a registered NCA6 building and civil contractor operating across East Africa. Specializing in building, road construction, and electrical works.",
  keywords: "Vulpine Limited, construction company Kenya, NCA6 building contractor, civil works East Africa, building works, road works, electrical works",
  icons: {
    icon: "/vulpine-logo.png",
    apple: "/vulpine-logo.png",
    shortcut: "/vulpine-logo.png",
  },
  openGraph: {
    title: "Vulpine Limited | Premium Construction Company",
    description: "Design, Construction and Maintenance of Natural and Built Environment.",
    type: "website",
    locale: "en_KE",
    siteName: "Vulpine Limited",
    images: [{ url: "/vulpine-logo.png", width: 400, height: 150, alt: "Vulpine Limited" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-light-green text-primary font-sans antialiased selection:bg-accent selection:text-primary">
        <BrandingProvider>
          <SectionsProvider>
            <Navbar />
            <main className="flex-grow pt-32 lg:pt-40">
              {children}
            </main>
            <Footer />
            <FloatingChat />
          </SectionsProvider>
        </BrandingProvider>
      </body>
    </html>
  );
}
