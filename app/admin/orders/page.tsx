"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import { Search, ArrowLeft, Eye, MessageCircle } from "lucide-react"
import { getOrders, saveOrders, type Order } from "@/lib/orders"
import { formatPhoneForWhatsApp } from "@/lib/whatsapp"

export default function AdminOrdersPage() {
  const { t } = useLanguage()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    try {
      const data = getOrders()
      setOrders(data)
    } catch (e) {
      console.error("Failed to load orders", e)
    }
  }, [])

  const filteredOrders = orders.filter((order) => {
    const q = searchQuery.toLowerCase()
    const matchesSearch =
      order.customer.name.toLowerCase().includes(q) ||
      order.customer.email.toLowerCase().includes(q) ||
      order.id.toLowerCase().includes(q)
    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  function persist(newOrders: Order[]) {
    setOrders(newOrders)
    try {
      saveOrders(newOrders)
    } catch (e) {
      console.error("Failed to save orders", e)
    }
  }

  function updateOrderStatus(orderId: string, status: Order["status"]) {
    const updated = orders.map((o) => (o.id === orderId ? { ...o, status } : o))
    persist(updated)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-orange-100 text-orange-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

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
                {t("orderManagement")}
              </h1>
              <p className="text-lg text-moroccan-navy/70">
                {filteredOrders.length} {t("orders")}
              </p>
            </div>
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
                    placeholder={t("searchOrders")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-moroccan-terracotta"
              >
                <option value="all">{t("allStatuses")}</option>
                <option value="pending">{t("pending")}</option>
                <option value="shipped">{t("shipped")}</option>
                <option value="delivered">{t("delivered")}</option>
                <option value="cancelled">{t("cancelled")}</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="font-semibold text-lg text-moroccan-navy">{order.id}</h3>
                      <p className="text-sm text-moroccan-navy/70">{order.date}</p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>{t(order.status)}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Quick actions when pending */}
                    {order.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600 text-green-700"
                          onClick={() => updateOrderStatus(order.id, "shipped")}
                        >
                          Valider
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-700"
                          onClick={() => updateOrderStatus(order.id, "cancelled")}
                        >
                          Annuler
                        </Button>
                      </>
                    )}

                    {/* Status dropdown */}
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value as Order["status"])}
                      className="px-2 py-1 border rounded-md text-sm"
                    >
                      <option value="pending">{t("pending")}</option>
                      <option value="shipped">{t("shipped")}</option>
                      <option value="delivered">{t("delivered")}</option>
                      <option value="cancelled">{t("cancelled")}</option>
                    </select>

                    {/* View (placeholder) */}
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>

                    {/* WhatsApp contact customer */}
                    <a
                      href={`https://wa.me/${encodeURIComponent(
                        formatPhoneForWhatsApp(order.customer.phone),
                      )}?text=${encodeURIComponent(`Bonjour/Salam, concernant votre commande ${order.id}`)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-green-50"
                      title="WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Customer Info */}
                  <div>
                    <h4 className="font-medium text-moroccan-navy mb-2">{t("customerInfo")}</h4>
                    <div className="space-y-1 text-sm text-moroccan-navy/70">
                      <p className="font-medium text-moroccan-navy">{order.customer.name}</p>
                      <p>{order.customer.email}</p>
                      <p>{order.customer.phone}</p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-medium text-moroccan-navy mb-2">{t("orderItems")}</h4>
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="text-sm text-moroccan-navy/70">
                          <span className="text-balance">{item.name}</span> — {t("size")}: {item.size}, {t("color")}: {" "}
                          {item.color} × {item.quantity} — {item.price} MAD
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Total & Address */}
                  <div>
                    <h4 className="font-medium text-moroccan-navy mb-2">{t("orderTotal")}</h4>
                    <p className="text-xl font-bold text-moroccan-terracotta mb-3">{order.total} MAD</p>
                    <div className="text-sm text-moroccan-navy/70">
                      <p className="font-medium text-moroccan-navy">{t("shippingAddress")}:</p>
                      <p className="text-pretty">{order.customer.address}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-moroccan-navy/70">{t("noOrdersFound")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
