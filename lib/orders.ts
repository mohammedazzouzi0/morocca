export type OrderStatus = "pending" | "shipped" | "delivered" | "cancelled"

export interface OrderItem {
  productId: string
  name: string
  quantity: number
  price: number // line total (unit * qty) or unit price; we'll store line total for simplicity
  size: string
  color: string
}

export interface OrderCustomer {
  name: string
  email: string
  phone: string
  address: string
}

export interface Order {
  id: string
  date: string // YYYY-MM-DD
  total: number
  status: OrderStatus
  items: OrderItem[]
  customer: OrderCustomer
}

const STORAGE_KEY = "moroccan-orders"

export function getOrders(): Order[] {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return []
  try {
    return JSON.parse(stored) as Order[]
  } catch {
    return []
  }
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
}

export function addOrder(order: Order) {
  const orders = getOrders()
  orders.unshift(order) // newest first
  saveOrders(orders)
}
