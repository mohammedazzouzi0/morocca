import EditClient from "../EditClient"

export default function Page({ params }: { params: { id: string } }) {
  return <EditClient productId={params.id} />
}
