"use client"

import { useEffect, useState } from "react"
import ProductListClient from "@/components/products/ProductListClient"

export default function ProductListFetcherClient() {
  const [products, setProducts] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const fetchProducts = async () => {
      try {
        const res = await fetch("/.netlify/functions/products", { cache: "no-store" })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        if (isMounted) setProducts(data)
      } catch (err: any) {
        if (isMounted) setError(err?.message || "Failed to load products")
        console.error(err)
      }
    }
    fetchProducts()
    return () => {
      isMounted = false
    }
  }, [])

  if (error) {
    return (
      <div className="min-h-screen bg-moroccan-cream/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-red-600">{error}</p>
        </div>
      </div>
    )
  }

  if (!products) {
    return (
      <div className="min-h-screen bg-moroccan-cream/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <p className="text-center text-moroccan-navy/70">Loading products…</p>
        </div>
      </div>
    )
  }

  return <ProductListClient products={products} />
}
