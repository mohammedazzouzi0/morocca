import type { ReactNode } from "react"
import { products } from "@/lib/products"

// Generate static params for /products/[id] to support output: 'export'
export async function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export default function ProductLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
