import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Amiri } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { CartProvider } from "@/contexts/CartContext"
import { LanguageProvider } from "@/contexts/LanguageContext"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { WhatsAppButton } from "@/components/WhatsAppButton"
import "./globals.css"
import { Suspense } from "react"

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
})

export const metadata: Metadata = {
  title: "Babouche Maroc - Authentic Moroccan Slippers",
  description:
    "Discover authentic handcrafted Moroccan babouche slippers. Traditional craftsmanship meets modern comfort.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" dir="ltr">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${amiri.variable}`}>
        <LanguageProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <Navbar />
              {children}
              <Footer />
              <WhatsAppButton />
            </Suspense>
          </CartProvider>
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  )
}
