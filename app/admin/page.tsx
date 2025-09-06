"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/LanguageContext"
import { getProducts } from "@/lib/products"
import Link from "next/link"
import { Package, ShoppingCart, Users, TrendingUp, Plus, Eye, Edit } from "lucide-react"

export default function AdminDashboard() {
  const { t } = useLanguage()
  const [products, setProducts] = useState<any[]>([])
  const [orders] = useState([
    { id: "1", customer: "Ahmed Benali", total: 299, status: "pending", date: "2024-01-15" },
    { id: "2", customer: "Sarah Johnson", total: 450, status: "shipped", date: "2024-01-14" },
    { id: "3", customer: "Marie Dubois", total: 199, status: "delivered", date: "2024-01-13" },
  ])

  useEffect(() => {
    setProducts(getProducts())
  }, [])

  const stats = {
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue: orders.reduce((sum, order) => sum + order.total, 0),
    pendingOrders: orders.filter((order) => order.status === "pending").length,
  }

  return (
    <div className="min-h-screen bg-moroccan-cream/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="font-amiri font-bold text-3xl md:text-4xl text-moroccan-navy mb-2">{t("adminDashboard")}</h1>
            <p className="text-lg text-moroccan-navy/70">{t("adminDashboardDescription")}</p>
          </div>
          <Button asChild variant="outline" className="border-moroccan-navy text-moroccan-navy bg-transparent">
            <Link href="/api/logout">Logout</Link>
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-moroccan-navy/70">{t("totalProducts")}</p>
                  <p className="text-2xl font-bold text-moroccan-navy">{stats.totalProducts}</p>
                </div>
                <div className="w-12 h-12 bg-moroccan-terracotta/10 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-moroccan-terracotta" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-moroccan-navy/70">{t("totalOrders")}</p>
                  <p className="text-2xl font-bold text-moroccan-navy">{stats.totalOrders}</p>
                </div>
                <div className="w-12 h-12 bg-moroccan-gold/10 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-moroccan-gold" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-moroccan-navy/70">{t("totalRevenue")}</p>
                  <p className="text-2xl font-bold text-moroccan-navy">{stats.totalRevenue} MAD</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-moroccan-navy/70">{t("pendingOrders")}</p>
                  <p className="text-2xl font-bold text-moroccan-navy">{stats.pendingOrders}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Products */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-moroccan-navy">{t("recentProducts")}</CardTitle>
              <Button asChild size="sm" className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white">
                <Link href="/admin/products">
                  <Plus className="w-4 h-4 mr-1" />
                  {t("addProduct")}
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 bg-moroccan-cream/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium text-moroccan-navy text-balance">{product.name}</h4>
                      <p className="text-sm text-moroccan-navy/70">
                        {product.price} MAD • {t("stock")}: {product.stock}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
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
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-moroccan-navy">{t("recentOrders")}</CardTitle>
              <Button asChild variant="outline" size="sm">
                <Link href="/admin/orders">{t("viewAll")}</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {orders.slice(0, 5).map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-3 bg-moroccan-cream/30 rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-medium text-moroccan-navy">{order.customer}</h4>
                      <p className="text-sm text-moroccan-navy/70">
                        {order.total} MAD • {order.date}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "pending"
                            ? "bg-orange-100 text-orange-800"
                            : order.status === "shipped"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                        }`}
                      >
                        {t(order.status)}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-moroccan-navy">{t("quickActions")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild className="bg-moroccan-terracotta hover:bg-moroccan-terracotta/90 text-white">
                <Link href="/admin/products/new">
                  <Plus className="w-4 h-4 mr-2" />
                  {t("addNewProduct")}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-moroccan-navy text-moroccan-navy hover:bg-moroccan-navy hover:text-white bg-transparent"
              >
                <Link href="/admin/orders">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  {t("manageOrders")}
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-moroccan-gold text-moroccan-gold hover:bg-moroccan-gold hover:text-white bg-transparent"
              >
                <Link href="/">
                  <Eye className="w-4 h-4 mr-2" />
                  {t("viewWebsite")}
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
