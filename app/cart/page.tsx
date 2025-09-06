"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react"

export default function CartPage() {
  const { t } = useLanguage()
  const { items, total, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-moroccan-cream/20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="w-24 h-24 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag className="w-12 h-12 text-moroccan-terracotta" />
          </div>
          <div className="space-y-2">
            <h1 className="font-amiri font-bold text-2xl text-moroccan-navy">{t("emptyCart")}</h1>
            <p className="text-moroccan-navy/70">{t("emptyCartDescription")}</p>
          </div>
          <Button asChild className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white">
            <Link href="/products">{t("continueShopping")}</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-moroccan-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy mb-4">{t("shoppingCart")}</h1>
          <p className="text-lg text-moroccan-navy/70">
            {items.length} {t("itemsInCart")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={`${item.id}-${item.size}-${item.color}`} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold text-moroccan-navy text-balance">{item.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-moroccan-navy/70">
                        <span>
                          {t("size")}: {item.size}
                        </span>
                        <span>
                          {t("color")}: {item.color}
                        </span>
                      </div>
                      <p className="font-bold text-moroccan-terracotta">{item.price} MAD</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-lg font-medium text-moroccan-navy w-8 text-center">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="pt-4">
              <Button
                variant="outline"
                onClick={clearCart}
                className="text-red-500 border-red-500 hover:bg-red-50 bg-transparent"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t("clearCart")}
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <h2 className="font-amiri font-bold text-xl text-moroccan-navy mb-6">{t("orderSummary")}</h2>

                <div className="space-y-4">
                  <div className="flex justify-between text-moroccan-navy">
                    <span>{t("subtotal")}</span>
                    <span>{total} MAD</span>
                  </div>
                  <div className="flex justify-between text-moroccan-navy">
                    <span>{t("shipping")}</span>
                    <span>{t("free")}</span>
                  </div>
                  <div className="flex justify-between text-moroccan-navy">
                    <span>{t("tax")}</span>
                    <span>{Math.round(total * 0.2)} MAD</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between font-bold text-lg text-moroccan-navy">
                      <span>{t("total")}</span>
                      <span>{Math.round(total * 1.2)} MAD</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <Button
                    asChild
                    className="w-full bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white"
                    size="lg"
                  >
                    <Link href="/checkout">
                      {t("proceedToCheckout")}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-moroccan-navy text-moroccan-navy hover:bg-moroccan-navy hover:text-white bg-transparent"
                  >
                    <Link href="/products">{t("continueShopping")}</Link>
                  </Button>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-moroccan-navy/70">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{t("secureCheckout")}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-moroccan-navy/70">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{t("freeShipping")}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-moroccan-navy/70">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{t("easyReturns")}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
