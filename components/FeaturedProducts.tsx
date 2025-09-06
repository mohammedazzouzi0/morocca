"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/LanguageContext"
import { useCart } from "@/contexts/CartContext"
import { products } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart, Star } from "lucide-react"

export function FeaturedProducts() {
  const { t } = useLanguage()
  const { addItem } = useCart()

  const featuredProducts = products.slice(0, 3)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy mb-4">{t("featuredProducts")}</h2>
          <p className="text-lg text-moroccan-navy/70 max-w-2xl mx-auto text-pretty">
            {t("featuredProductsDescription")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg text-moroccan-navy mb-2 text-balance">{product.name}</h3>
                    <p className="text-sm text-moroccan-navy/70 text-pretty">{product.description}</p>
                  </div>

                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? "text-moroccan-gold fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-moroccan-navy/70 ml-2">({product.rating})</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-2xl font-bold text-moroccan-terracotta">{product.price} MAD</p>
                      {product.originalPrice && (
                        <p className="text-sm text-gray-500 line-through">{product.originalPrice} MAD</p>
                      )}
                    </div>

                    <Button
                      onClick={() => addItem(product)}
                      className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      {t("addToCart")}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-moroccan-terracotta text-moroccan-terracotta hover:bg-moroccan-terracotta hover:text-white bg-transparent"
          >
            <Link href="/products">{t("viewAllProducts")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
