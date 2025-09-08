"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { useCart } from "@/contexts/CartContext"
import Image from "next/image"
import Link from "next/link"
import { Search, Grid, List, ShoppingCart, Star } from "lucide-react"

export default function ProductListClient({ products }: { products: any[] }) {
  const { t, language } = useLanguage()
  const { addItem } = useCart()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedColor, setSelectedColor] = useState("all")
  const [priceRange, setPriceRange] = useState("all")
  const [sortBy, setSortBy] = useState("popularity")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = [
    { value: "all", label: t("allCategories") },
    { value: "traditional", label: t("traditional") },
    { value: "modern", label: t("modern") },
    { value: "luxury", label: t("luxury") },
  ]

  const colors = [
    { value: "all", label: t("allColors") },
    { value: "brown", label: t("brown") },
    { value: "black", label: t("black") },
    { value: "gold", label: t("gold") },
    { value: "white", label: t("white") },
    { value: "red", label: t("red") },
    { value: "blue", label: t("blue") },
  ]

  const priceRanges = [
    { value: "all", label: t("allPrices") },
    { value: "0-200", label: "0 - 200 MAD" },
    { value: "200-400", label: "200 - 400 MAD" },
    { value: "400+", label: "400+ MAD" },
  ]

  const filteredProducts = useMemo(() => {
    const filtered = (products || []).filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory

      const matchesColor = selectedColor === "all" || (product.colors || []).includes(selectedColor)

      let matchesPrice = true
      if (priceRange !== "all") {
        const [min, max] = priceRange.split("-").map((p) => p.replace("+", ""))
        if (max) {
          matchesPrice = product.price >= Number.parseInt(min) && product.price <= Number.parseInt(max)
        } else {
          matchesPrice = product.price >= Number.parseInt(min)
        }
      }

      return matchesSearch && matchesCategory && matchesColor && matchesPrice
    })

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.name.localeCompare(b.name)
        case "popularity":
        default:
          return (b.popularity || 0) - (a.popularity || 0)
      }
    })

    return filtered
  }, [products, searchQuery, selectedCategory, selectedColor, priceRange, sortBy])

  const getProductName = (product: any) => {
    switch (language) {
      case "ar":
        return product.nameAr
      case "fr":
        return product.nameFr
      case "darija":
        return product.nameDarija
      default:
        return product.name
    }
  }

  const getProductDescription = (product: any) => {
    switch (language) {
      case "ar":
        return product.descriptionAr
      case "fr":
        return product.descriptionFr
      case "darija":
        return product.descriptionDarija
      default:
        return product.description
    }
  }

  return (
    <div className="min-h-screen bg-moroccan-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy mb-4">{t("ourProducts")}</h1>
          <p className="text-lg text-moroccan-navy/70 text-pretty">{t("productsDescription")}</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
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

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moroccan-terracotta"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>

            {/* Color Filter */}
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moroccan-terracotta"
            >
              {colors.map((color) => (
                <option key={color.value} value={color.value}>
                  {color.label}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moroccan-terracotta"
            >
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moroccan-terracotta"
            >
              <option value="popularity">{t("popularity")}</option>
              <option value="price-low">{t("priceLowToHigh")}</option>
              <option value="price-high">{t("priceHighToLow")}</option>
              <option value="name">{t("name")}</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-moroccan-navy/70">
              {filteredProducts.length} {t("productsFound")}
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-moroccan-terracotta text-white" : ""}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-moroccan-terracotta text-white" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-moroccan-navy/70">{t("noProductsFound")}</p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
              >
                <div className={`relative overflow-hidden ${viewMode === "list" ? "w-48 h-32" : "h-64"}`}>
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={getProductName(product)}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.featured && (
                    <Badge className="absolute top-2 left-2 bg-moroccan-gold text-moroccan-navy">{t("featured")}</Badge>
                  )}
                  {product.stock < 5 && (
                    <Badge className="absolute top-2 right-2 bg-red-500 text-white">{t("lowStock")}</Badge>
                  )}
                </div>

                <CardContent className={`p-4 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="space-y-3">
                    <div>
                      <Link href={`/products/${product.id}`}>
                        <h3 className="font-semibold text-lg text-moroccan-navy hover:text-moroccan-terracotta transition-colors text-balance">
                          {getProductName(product)}
                        </h3>
                      </Link>
                      <p className="text-sm text-moroccan-navy/70 text-pretty line-clamp-2">
                        {getProductDescription(product)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? "text-moroccan-gold fill-current" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="text-sm text-moroccan-navy/70 ml-2">(4.5)</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-moroccan-terracotta">{product.price} MAD</p>
                        <p className="text-xs text-moroccan-navy/60">
                          {t("inStock")}: {product.stock}
                        </p>
                      </div>

                      <Button
                        onClick={() => addItem(product)}
                        size="sm"
                        className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {t("addToCart")}
                      </Button>
                    </div>

                    {/* Colors */}
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-moroccan-navy/60">{t("colors")}:</span>
                      <div className="flex space-x-1">
                        {(product.colors || []).slice(0, 3).map((color: string) => (
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
                        {(product.colors || []).length > 3 && (
                          <span className="text-xs text-moroccan-navy/60">+{(product.colors || []).length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
