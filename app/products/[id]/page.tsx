"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import { useCart } from "@/contexts/CartContext"
import { getProductById } from "@/lib/products"
import { sendWhatsAppMessage } from "@/lib/whatsapp"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Heart, Share2, Star, Minus, Plus, MessageCircle } from "lucide-react"
import { useParams } from "next/navigation"

export default function ProductDetailPage() {
  const params = useParams()
  const { t, language } = useLanguage()
  const { addItem } = useCart()
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    if (params.id) {
      const foundProduct = getProductById(params.id as string)
      setProduct(foundProduct)
      if (foundProduct) {
        setSelectedColor(foundProduct.colors[0])
        setSelectedSize(foundProduct.sizes[0])
      }
    }
  }, [params.id])

  if (!product) {
    return (
      <div className="min-h-screen bg-moroccan-cream/20 flex items-center justify-center">
        <p className="text-lg text-moroccan-navy">{t("productNotFound")}</p>
      </div>
    )
  }

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

  const handleAddToCart = () => {
    addItem({
      ...product,
      selectedColor,
      selectedSize,
      quantity,
    })
  }

  const handleWhatsAppInquiry = () => {
    const message = `${t("whatsappProductInquiry")} ${getProductName(product)} - ${product.price} MAD`
    sendWhatsAppMessage(message)
  }

  return (
    <div className="min-h-screen bg-moroccan-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-8">
          <Link
            href="/products"
            className="flex items-center text-moroccan-navy hover:text-moroccan-terracotta transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t("backToProducts")}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden shadow-lg">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={getProductName(product)}
                fill
                className="object-cover"
                priority
              />
              {product.featured && (
                <Badge className="absolute top-4 left-4 bg-moroccan-gold text-moroccan-navy">{t("featured")}</Badge>
              )}
            </div>

            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-moroccan-terracotta" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${getProductName(product)} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy mb-4 text-balance">
                {getProductName(product)}
              </h1>
              <p className="text-lg text-moroccan-navy/80 leading-relaxed text-pretty">
                {getProductDescription(product)}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-5 h-5 ${i < 4 ? "text-moroccan-gold fill-current" : "text-gray-300"}`} />
                ))}
              </div>
              <span className="text-moroccan-navy/70">(4.5) • 23 {t("reviews")}</span>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <p className="text-3xl font-bold text-moroccan-terracotta">{product.price} MAD</p>
              <p className="text-sm text-moroccan-navy/60">
                {t("inStock")}: {product.stock} {t("items")}
              </p>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-moroccan-navy">{t("selectColor")}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color: string) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 transition-colors ${
                      selectedColor === color ? "border-moroccan-terracotta" : "border-gray-300"
                    } ${
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
                                  : color === "tan"
                                    ? "bg-amber-600"
                                    : color === "green"
                                      ? "bg-green-500"
                                      : color === "beige"
                                        ? "bg-amber-100"
                                        : color === "gray"
                                          ? "bg-gray-400"
                                          : color === "navy"
                                            ? "bg-blue-900"
                                            : "bg-gray-400"
                    }`}
                  >
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
              <p className="text-sm text-moroccan-navy/70 capitalize">
                {t("selected")}: {selectedColor}
              </p>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
              <h3 className="font-semibold text-moroccan-navy">{t("selectSize")}</h3>
              <div className="grid grid-cols-5 gap-2">
                {product.sizes.map((size: string) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "border-moroccan-terracotta bg-moroccan-terracotta text-white"
                        : "border-gray-300 text-moroccan-navy hover:border-moroccan-terracotta"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="font-semibold text-moroccan-navy">{t("quantity")}</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium text-moroccan-navy w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex space-x-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white"
                  size="lg"
                  disabled={product.stock === 0}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.stock === 0 ? t("outOfStock") : t("addToCart")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={isWishlisted ? "text-red-500 border-red-500" : ""}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <Button
                onClick={handleWhatsAppInquiry}
                variant="outline"
                className="w-full border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                size="lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("inquireWhatsApp")}
              </Button>
            </div>

            {/* Product Features */}
            <Card className="border-0 shadow-sm bg-moroccan-cream/30">
              <CardContent className="p-6">
                <h3 className="font-semibold text-moroccan-navy mb-4">{t("productFeatures")}</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-moroccan-terracotta rounded-full"></div>
                    <span className="text-sm text-moroccan-navy">{t("handcrafted")}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-moroccan-terracotta rounded-full"></div>
                    <span className="text-sm text-moroccan-navy">{t("premiumMaterials")}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-moroccan-terracotta rounded-full"></div>
                    <span className="text-sm text-moroccan-navy">{t("comfortableFit")}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-moroccan-terracotta rounded-full"></div>
                    <span className="text-sm text-moroccan-navy">{t("authenticDesign")}</span>
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
