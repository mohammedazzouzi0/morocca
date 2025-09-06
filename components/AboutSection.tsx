"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"

export function AboutSection() {
  const { t } = useLanguage()

  return (
    <section className="py-20 bg-moroccan-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy text-balance">
                {t("aboutTitle")}
              </h2>
              <p className="text-lg text-moroccan-navy/80 leading-relaxed text-pretty">{t("aboutDescription")}</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-semibold text-moroccan-terracotta text-lg">{t("traditionalCraftsmanship")}</h4>
                <p className="text-sm text-moroccan-navy/70 text-pretty">{t("craftsmanshipDescription")}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-moroccan-terracotta text-lg">{t("premiumMaterials")}</h4>
                <p className="text-sm text-moroccan-navy/70 text-pretty">{t("materialsDescription")}</p>
              </div>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-moroccan-terracotta">50+</p>
                <p className="text-sm text-moroccan-navy/70">{t("yearsExperience")}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-moroccan-terracotta">1000+</p>
                <p className="text-sm text-moroccan-navy/70">{t("happyCustomers")}</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-moroccan-terracotta">100%</p>
                <p className="text-sm text-moroccan-navy/70">{t("handmade")}</p>
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/embroidered-silk-moroccan-babouche-slippers.jpg"
                    alt="Artisan crafting babouche"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/modern-comfortable-moroccan-babouche-slippers.jpg"
                    alt="Traditional tools"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-32 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/traditional-moroccan-leather-babouche-slippers.jpg"
                    alt="Leather materials"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src="/embroidered-silk-moroccan-babouche-slippers.jpg"
                    alt="Finished babouche"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-moroccan-gold/20 rounded-full"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-moroccan-terracotta/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
