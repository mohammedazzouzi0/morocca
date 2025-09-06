"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { getProducts, saveProducts } from "@/lib/products"
import Image from "next/image"
import Link from "next/link"
import { Search, Plus, Edit, Trash2, Eye, ArrowLeft } from "lucide-react"

export default function AdminProductsPage() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const handleDeleteProduct = (productId: string) => {
    if (confirm(t("confirmDeleteProduct"))) {
      const updatedProducts = products.filter((p) => p.id !== productId)
      setProducts(updatedProducts)
      saveProducts(updatedProducts)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-moroccan-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin"
            className="flex items-center text-moroccan-navy hover:text-moroccan-terracotta transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t("backToAdmin")}
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy mb-4">
                {t("productManagement")}
              </h1>
              <p className="text-lg text-moroccan-navy/70">
                {filteredProducts.length} {t("products")}
              </p>
            </div>
            <Button asChild className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white">
              <Link href="/admin/products/new">
                <Plus className="w-4 h-4 mr-2" />
                {t("addProduct")}
              </Link>
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-moroccan-navy/40 w-4 h-4" />
                  <Input
                    placeholder={t("searchProducts")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moroccan-terracotta"
              >
                <option value="all">{t("allCategories")}</option>
                <option value="traditional">{t("traditional")}</option>
                <option value="modern">{t("modern")}</option>
                <option value="luxury">{t("luxury")}</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                {product.featured && (
                  <Badge className="absolute top-2 left-2 bg-moroccan-gold text-moroccan-navy">{t("featured")}</Badge>
                )}
                {product.stock < 5 && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white">{t("lowStock")}</Badge>
                )}
              </div>

              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg text-moroccan-navy text-balance">{product.name}</h3>
                    <p className="text-sm text-moroccan-navy/70 capitalize">{t(product.category)}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xl font-bold text-moroccan-terracotta">{product.price} MAD</p>
                      <p className="text-xs text-moroccan-navy/60">
                        {t("stock")}: {product.stock}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/products/${product.id}`}>
                          <Eye className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="w-4 h-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {product.colors.slice(0, 4).map((color: string) => (
                      <div
                        key={color}
                        className={`w-4 h-4 rounded-full border border-gray-300 ${
                          color === "brown"
                            ? "bg-amber-800"
                            : color === "black"
                              ? "bg-black"
                              : color === "gold"
                                ? "bg-yellow-400"
                                : color === "white"
                                  ? "bg-white"
                                  : color === "red"
                                    ? "bg-red-500"
                                    : color === "blue"
                                      ? "bg-blue-500"
                                      : "bg-gray-400"
                        }`}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-moroccan-navy/60">+{product.colors.length - 4}</span>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-moroccan-navy/70">{t("noProductsFound")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
