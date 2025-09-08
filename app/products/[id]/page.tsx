import ProductDetailClient from "@/components/products/ProductDetailClient"
import { getProductByIdServer } from "@/lib/server/products"
import { notFound } from "next/navigation"

export const revalidate = 0

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string }
}) {
  const product = await getProductByIdServer(params.id)
  if (!product) return notFound()
  return <ProductDetailClient product={product} />
}
