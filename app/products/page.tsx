import ProductListClient from "@/components/products/ProductListClient"
import { getAllProducts } from "@/lib/server/products"

export const revalidate = 0

export default async function ProductsPage() {
  const products = await getAllProducts()
  return <ProductListClient products={products} />
}
