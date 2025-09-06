"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-moroccan-navy text-moroccan-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-amiri font-bold text-xl text-moroccan-gold">{t("siteName")}</h3>
            <p className="text-sm leading-relaxed">{t("footerDescription")}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-moroccan-cream hover:text-moroccan-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-moroccan-cream hover:text-moroccan-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-moroccan-cream hover:text-moroccan-gold transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-moroccan-gold">{t("quickLinks")}</h4>
            <div className="space-y-2">
              <Link href="/" className="block text-sm hover:text-moroccan-gold transition-colors">
                {t("home")}
              </Link>
              <Link href="/products" className="block text-sm hover:text-moroccan-gold transition-colors">
                {t("products")}
              </Link>
              <Link href="/about" className="block text-sm hover:text-moroccan-gold transition-colors">
                {t("about")}
              </Link>
              <Link href="/contact" className="block text-sm hover:text-moroccan-gold transition-colors">
                {t("contact")}
              </Link>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="font-semibold text-moroccan-gold">{t("categories")}</h4>
            <div className="space-y-2">
              <Link
                href="/products?category=traditional"
                className="block text-sm hover:text-moroccan-gold transition-colors"
              >
                {t("traditional")}
              </Link>
              <Link
                href="/products?category=modern"
                className="block text-sm hover:text-moroccan-gold transition-colors"
              >
                {t("modern")}
              </Link>
              <Link
                href="/products?category=luxury"
                className="block text-sm hover:text-moroccan-gold transition-colors"
              >
                {t("luxury")}
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-moroccan-gold">{t("contactInfo")}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-moroccan-gold" />
                <span>Marrakech, Morocco</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-moroccan-gold" />
                <span>+212 6XX XXX XXX</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-moroccan-gold" />
                <span>info@babouchemaroc.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-moroccan-gold/20 mt-8 pt-8 text-center text-sm">
          <p>
            &copy; 2024 {t("siteName")}. {t("allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  )
}
