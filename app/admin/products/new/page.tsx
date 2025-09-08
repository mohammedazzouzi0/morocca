"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/LanguageContext"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Plus, X } from "lucide-react"

export default function NewProductPage() {
  const { t } = useLanguage()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    nameAr: "",
    nameFr: "",
    nameDarija: "",
    description: "",
    descriptionAr: "",
    descriptionFr: "",
    descriptionDarija: "",
    price: "",
    category: "traditional",
    colors: [""],
    sizes: [""],
    stock: "",
    featured: false,
  })
  const [images, setImages] = useState<string[]>([])

  const handleInputChange = (field: string, value: any) => {
    setProduct((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageFiles = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return
    const files = Array.from(fileList).filter((f) => f.type.startsWith("image/"))
    const readAsDataURL = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = reject
        reader.readAsDataURL(file)
      })
    try {
      const dataUrls = await Promise.all(files.map((f) => readAsDataURL(f)))
      setImages((prev) => [...prev, ...dataUrls])
    } catch (err) {
      console.error("Error reading images", err)
    }
  }

  const removeImageAt = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleArrayChange = (field: "colors" | "sizes", index: number, value: string) => {
    const newArray = [...product[field]]
    newArray[index] = value
    setProduct((prev) => ({ ...prev, [field]: newArray }))
  }

  const addArrayItem = (field: "colors" | "sizes") => {
    setProduct((prev) => ({ ...prev, [field]: [...prev[field], ""] }))
  }

  const removeArrayItem = (field: "colors" | "sizes", index: number) => {
    const newArray = product[field].filter((_, i) => i !== index)
    setProduct((prev) => ({ ...prev, [field]: newArray }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const payload = {
        ...product,
        price: Number.parseFloat(product.price as unknown as string),
        stock: Number.parseInt(product.stock as unknown as string),
        colors: product.colors.filter((c) => c.trim() !== ""),
        sizes: product.sizes.filter((s) => s.trim() !== ""),
        images: images.length > 0 ? images : ["/placeholder.svg"],
        popularity: 50,
        createdAt: new Date().toISOString().split("T")[0],
      }

      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error("Failed to create product")
      router.push("/admin/products")
    } catch (error) {
      console.error("Error creating product:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-moroccan-cream/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/admin/products"
            className="flex items-center text-moroccan-navy hover:text-moroccan-terracotta transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t("backToProducts")}
          </Link>
          <h1 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy">{t("addNewProduct")}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-moroccan-navy">{t("basicInformation")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t("productName")} (English) *</Label>
                  <Input
                    id="name"
                    value={product.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameAr">{t("productName")} (Arabic)</Label>
                  <Input
                    id="nameAr"
                    value={product.nameAr}
                    onChange={(e) => handleInputChange("nameAr", e.target.value)}
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nameFr">{t("productName")} (French)</Label>
                  <Input
                    id="nameFr"
                    value={product.nameFr}
                    onChange={(e) => handleInputChange("nameFr", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nameDarija">{t("productName")} (Darija)</Label>
                  <Input
                    id="nameDarija"
                    value={product.nameDarija}
                    onChange={(e) => handleInputChange("nameDarija", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">{t("description")} (English) *</Label>
                <Textarea
                  id="description"
                  value={product.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="descriptionAr">{t("description")} (Arabic)</Label>
                <Textarea
                  id="descriptionAr"
                  value={product.descriptionAr}
                  onChange={(e) => handleInputChange("descriptionAr", e.target.value)}
                  rows={3}
                  dir="rtl"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Category */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-moroccan-navy">{t("pricingAndCategory")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">{t("price")} (MAD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={product.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">{t("category")} *</Label>
                  <select
                    id="category"
                    value={product.category}
                    onChange={(e) => handleInputChange("category", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moroccan-terracotta"
                    required
                  >
                    <option value="traditional">{t("traditional")}</option>
                    <option value="modern">{t("modern")}</option>
                    <option value="luxury">{t("luxury")}</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">{t("stock")} *</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={product.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={product.featured}
                  onChange={(e) => handleInputChange("featured", e.target.checked)}
                  className="rounded border-gray-300 text-moroccan-terracotta focus:ring-moroccan-terracotta"
                />
                <Label htmlFor="featured">{t("featuredProduct")}</Label>
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-moroccan-navy">Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="images">Upload product photos</Label>
                <Input
                  id="images"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => handleImageFiles(e.currentTarget.files)}
                />
                <p className="text-xs text-moroccan-navy/60">PNG, JPG, or WEBP. You can select multiple files.</p>
              </div>

              {images.length > 0 && (
                <div>
                  <p className="text-sm text-moroccan-navy mb-2">Preview ({images.length})</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {images.map((src, idx) => (
                      <div key={idx} className="relative group">
                        {/* Using img for data URL simplicity */}
                        <div className="aspect-square overflow-hidden rounded-lg border bg-white">
                          <img src={src} alt={`Upload ${idx + 1}`} className="w-full h-full object-cover" />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImageAt(idx)}
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-white text-xs px-2 py-1 rounded"
                          aria-label="Remove image"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Colors & Sizes */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="text-moroccan-navy">{t("colorsAndSizes")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Colors */}
              <div className="space-y-3">
                <Label>{t("availableColors")}</Label>
                {product.colors.map((color, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={color}
                      onChange={(e) => handleArrayChange("colors", index, e.target.value)}
                      placeholder={t("colorName")}
                      className="flex-1"
                    />
                    {product.colors.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem("colors", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("colors")}
                  className="border-moroccan-terracotta text-moroccan-terracotta hover:bg-moroccan-terracotta hover:text-white bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {t("addColor")}
                </Button>
              </div>

              {/* Sizes */}
              <div className="space-y-3">
                <Label>{t("availableSizes")}</Label>
                {product.sizes.map((size, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={size}
                      onChange={(e) => handleArrayChange("sizes", index, e.target.value)}
                      placeholder={t("sizeNumber")}
                      className="flex-1"
                    />
                    {product.sizes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArrayItem("sizes", index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => addArrayItem("sizes")}
                  className="border-moroccan-terracotta text-moroccan-terracotta hover:bg-moroccan-terracotta hover:text-white bg-transparent"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  {t("addSize")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              asChild
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
            >
              <Link href="/admin/products">{t("cancel")}</Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? t("saving") : t("saveProduct")}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
