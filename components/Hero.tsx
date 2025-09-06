"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-moroccan-cream to-moroccan-gold/10">
      {/* Moroccan Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="moroccan-pattern w-full h-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-amiri font-bold text-4xl md:text-6xl text-moroccan-navy leading-tight text-balance">
                {t("heroTitle")}
              </h1>
              <p className="text-lg md:text-xl text-moroccan-navy/80 leading-relaxed text-pretty">
                {t("heroSubtitle")}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white">
                <Link href="/products">{t("shopNow")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-moroccan-navy text-moroccan-navy hover:bg-moroccan-navy hover:text-white bg-transparent"
              >
                <Link href="/about">{t("learnMore")}</Link>
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-moroccan-terracotta font-bold">✓</span>
                </div>
                <p className="text-sm text-moroccan-navy font-medium">{t("handcrafted")}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-moroccan-terracotta font-bold">✓</span>
                </div>
                <p className="text-sm text-moroccan-navy font-medium">{t("authentic")}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-moroccan-terracotta font-bold">✓</span>
                </div>
                <p className="text-sm text-moroccan-navy font-medium">{t("comfortable")}</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/traditional-moroccan-leather-babouche-slippers.jpg"
                alt="Traditional Moroccan Babouche Slippers"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-moroccan-navy/20 to-transparent"></div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-moroccan-gold rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-moroccan-terracotta rounded-full opacity-30 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
