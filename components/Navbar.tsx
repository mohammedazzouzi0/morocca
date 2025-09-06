"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { useLanguage } from "@/contexts/LanguageContext"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { items } = useCart()
  const { language, setLanguage, t } = useLanguage()

  const cartItemsCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <nav className="bg-moroccan-cream border-b-2 border-moroccan-terracotta sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-moroccan-terracotta rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-amiri font-bold text-xl text-moroccan-navy">{t("siteName")}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-moroccan-navy hover:text-moroccan-terracotta transition-colors">
              {t("home")}
            </Link>
            <Link href="/products" className="text-moroccan-navy hover:text-moroccan-terracotta transition-colors">
              {t("products")}
            </Link>
            <Link href="/about" className="text-moroccan-navy hover:text-moroccan-terracotta transition-colors">
              {t("about")}
            </Link>
            <Link href="/contact" className="text-moroccan-navy hover:text-moroccan-terracotta transition-colors">
              {t("contact")}
            </Link>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="text-moroccan-navy hover:text-moroccan-terracotta"
                onClick={() => {
                  const languages = ["en", "ar", "fr", "darija"]
                  const currentIndex = languages.indexOf(language)
                  const nextIndex = (currentIndex + 1) % languages.length
                  setLanguage(languages[nextIndex] as any)
                }}
              >
                <Globe className="w-4 h-4 mr-1" />
                {language.toUpperCase()}
              </Button>
            </div>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative text-moroccan-navy hover:text-moroccan-terracotta">
                <ShoppingCart className="w-5 h-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-moroccan-terracotta text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-moroccan-navy"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-moroccan-terracotta/20">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-moroccan-navy hover:text-moroccan-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("home")}
              </Link>
              <Link
                href="/products"
                className="text-moroccan-navy hover:text-moroccan-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("products")}
              </Link>
              <Link
                href="/about"
                className="text-moroccan-navy hover:text-moroccan-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("about")}
              </Link>
              <Link
                href="/contact"
                className="text-moroccan-navy hover:text-moroccan-terracotta transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("contact")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
