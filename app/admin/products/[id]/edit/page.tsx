import EditClient from "../EditClient"

// Static export: pre-generate params for all products
export function generateStaticParams() {
  const { getProducts } = require("@/lib/products") as typeof import("@/lib/products")
  const products = getProducts()
  return products.map((p: any) => ({ id: p.id }))
}

export default function Page({ params }: { params: { id: string } }) {
  return <EditClient productId={params.id} />
}
