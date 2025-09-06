"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useLanguage } from "@/contexts/LanguageContext"
import { useCart } from "@/contexts/CartContext"
import { getProducts, saveProducts } from "@/lib/products"
import { addOrder, type Order } from "@/lib/orders"
import { sendOrderToWhatsApp, formatPhoneForWhatsApp, type OrderData } from "@/lib/whatsapp"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import Link from "next/link"

interface CustomerInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  notes: string
}

export default function CheckoutPage() {
  const { t } = useLanguage()
  const { items, total, clearCart } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const handleInputChange = (field: keyof CustomerInfo, value: string) => {
    setCustomerInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    try {
      // Build structured order payload for WhatsApp
      const orderNumber = `${new Date().getFullYear()}-${Date.now().toString().slice(-6)}`
      const orderData: OrderData = {
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price * item.quantity,
          size: item.size,
          color: item.color,
        })),
        customer: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`.trim(),
          phone: formatPhoneForWhatsApp(customerInfo.phone),
          address: `${customerInfo.address}, ${customerInfo.city} ${customerInfo.postalCode}`.trim(),
        },
        total: Math.round(total * 1.2),
        orderNumber,
      }

      // Open WhatsApp with a professional order message to the business number
      sendOrderToWhatsApp(orderData)

      // Update stock: decrement per purchased quantity
      const products = getProducts()
      for (const ci of items) {
        const idx = products.findIndex((p) => p.id === ci.id)
        if (idx !== -1) {
          products[idx].stock = Math.max(0, (products[idx].stock ?? 0) - ci.quantity)
        }
      }
      saveProducts(products)

      // Persist order to localStorage for admin panel
      const today = new Date()
      const orderId = `ORD-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(
        today.getDate(),
      ).padStart(2, "0")}-${Date.now().toString().slice(-5)}`
      const order: Order = {
        id: orderId,
        date: `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
          today.getDate(),
        ).padStart(2, "0")}`,
        total: Math.round(total * 1.2),
        status: "pending",
        items: items.map((it) => ({
          productId: it.id,
          name: it.name,
          quantity: it.quantity,
          price: it.price * it.quantity,
          size: it.size,
          color: it.color,
        })),
        customer: {
          name: `${customerInfo.firstName} ${customerInfo.lastName}`.trim(),
          email: customerInfo.email,
          phone: formatPhoneForWhatsApp(customerInfo.phone),
          address: `${customerInfo.address}, ${customerInfo.city} ${customerInfo.postalCode}`.trim(),
        },
      }
      addOrder(order)

      // Clear cart and redirect to confirmation
      clearCart()
      router.push("/order-confirmation")
    } catch (error) {
      console.error("Error processing order:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-moroccan-cream/20 flex items-center justify-center">
        <div className="text-center space-y-6">
          <h1 className="font-amiri font-bold text-2xl text-moroccan-navy">{t("emptyCart")}</h1>
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
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="flex items-center text-moroccan-navy hover:text-moroccan-terracotta transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            {t("backToCart")}
          </Link>
          <h1 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy">{t("checkout")}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Customer Information */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-moroccan-navy">
                    <CreditCard className="w-5 h-5 mr-2" />
                    {t("customerInformation")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("firstName")} *</Label>
                      <Input
                        id="firstName"
                        value={customerInfo.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("lastName")} *</Label>
                      <Input
                        id="lastName"
                        value={customerInfo.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">{t("email")} *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("phone")} *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-moroccan-navy">
                    <Truck className="w-5 h-5 mr-2" />
                    {t("shippingInformation")}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">{t("address")} *</Label>
                    <Input
                      id="address"
                      value={customerInfo.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">{t("city")} *</Label>
                      <Input
                        id="city"
                        value={customerInfo.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">{t("postalCode")}</Label>
                      <Input
                        id="postalCode"
                        value={customerInfo.postalCode}
                        onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">{t("orderNotes")}</Label>
                    <Textarea
                      id="notes"
                      value={customerInfo.notes}
                      onChange={(e) => handleInputChange("notes", e.target.value)}
                      placeholder={t("orderNotesPlaceholder")}
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center text-moroccan-navy">
                    <Shield className="w-5 h-5 mr-2" />
                    {t("paymentMethod")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-moroccan-cream/50 p-4 rounded-lg">
                    <p className="text-moroccan-navy font-medium mb-2">{t("cashOnDelivery")}</p>
                    <p className="text-sm text-moroccan-navy/70">{t("cashOnDeliveryDescription")}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white"
                size="lg"
              >
                {isProcessing ? t("processingOrder") : t("placeOrder")}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="border-0 shadow-lg sticky top-8">
              <CardHeader>
                <CardTitle className="text-moroccan-navy">{t("orderSummary")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium text-moroccan-navy text-balance">{item.name}</p>
                        <p className="text-moroccan-navy/60">
                          {t("size")}: {item.size}, {t("color")}: {item.color} × {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-moroccan-terracotta">{item.price * item.quantity} MAD</p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-2">
                  <div className="flex justify-between text-moroccan-navy">
                    <span>{t("subtotal")}</span>
                    <span>{total} MAD</span>
                  </div>
                  <div className="flex justify-between text-moroccan-navy">
                    <span>{t("shipping")}</span>
                    <span>{t("free")}</span>
                  </div>
                  <div className="flex justify-between text-moroccan-navy">
                    <span>{t("tax")} (20%)</span>
                    <span>{Math.round(total * 0.2)} MAD</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg text-moroccan-navy pt-2 border-t border-gray-200">
                    <span>{t("total")}</span>
                    <span>{Math.round(total * 1.2)} MAD</span>
                  </div>
                </div>

                {/* Security Features */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-moroccan-navy/70">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>{t("secureCheckout")}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-moroccan-navy/70">
                      <Truck className="w-4 h-4 text-green-500" />
                      <span>{t("freeShipping")}</span>
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
