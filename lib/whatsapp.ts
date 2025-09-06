export interface OrderData {
  items: Array<{
    name: string
    quantity: number
    price: number
    size: string
    color: string
  }>
  customer: {
    name: string
    phone: string
    address: string
  }
  total: number
  orderNumber: string
}

const WHATSAPP_BUSINESS_NUMBER = "+212673717955" // Business WhatsApp number

export function generateWhatsAppOrderMessage(orderData: OrderData): string {
  const { items, customer, total, orderNumber } = orderData

  let message = `🛍️ *طلب جديد - New Order*\n\n`
  message += `📋 *رقم الطلب - Order #:* ${orderNumber}\n\n`
  message += `👤 *معلومات العميل - Customer Info:*\n`
  message += `الاسم - Name: ${customer.name}\n`
  message += `الهاتف - Phone: ${customer.phone}\n`
  message += `العنوان - Address: ${customer.address}\n\n`
  message += `🛒 *المنتجات - Products:*\n`

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`
    message += `   المقاس - Size: ${item.size}\n`
    message += `   اللون - Color: ${item.color}\n`
    message += `   الكمية - Quantity: ${item.quantity}\n`
    message += `   السعر - Price: ${item.price} MAD\n\n`
  })

  message += `💰 *المجموع الكلي - Total: ${total} MAD*\n\n`
  message += `شكرا لك - Thank you! 🙏`

  return encodeURIComponent(message)
}

export function generateWhatsAppLink(message: string, phoneNumber = WHATSAPP_BUSINESS_NUMBER): string {
  return `https://wa.me/${phoneNumber}?text=${message}`
}

export function generateCustomerWhatsAppMessage(orderData: OrderData): string {
  const { orderNumber, total } = orderData

  let message = `✅ *تأكيد الطلب - Order Confirmation*\n\n`
  message += `شكرا لك على طلبك! - Thank you for your order!\n\n`
  message += `📋 رقم طلبك - Your order number: *${orderNumber}*\n`
  message += `💰 المبلغ الإجمالي - Total amount: *${total} MAD*\n\n`
  message += `سنتواصل معك قريبا لتأكيد التفاصيل\n`
  message += `We will contact you soon to confirm the details\n\n`
  message += `🚚 التوصيل خلال 2-3 أيام عمل\n`
  message += `Delivery within 2-3 business days`

  return encodeURIComponent(message)
}

export function sendWhatsAppMessage(message: string): void {
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = generateWhatsAppLink(encodedMessage)
  window.open(whatsappUrl, "_blank")
}

export function generateProductInquiryMessage(productName: string, productPrice: number): string {
  let message = `👋 *مرحبا - Hello!*\n\n`
  message += `أنا مهتم بهذا المنتج:\n`
  message += `I'm interested in this product:\n\n`
  message += `📦 *${productName}*\n`
  message += `💰 السعر - Price: *${productPrice} MAD*\n\n`
  message += `هل يمكنكم إعطائي المزيد من المعلومات؟\n`
  message += `Can you give me more information?\n\n`
  message += `شكرا - Thank you! 🙏`

  return message
}

export function generateSupportMessage(type: "general" | "order" | "product" | "shipping", details?: string): string {
  let message = `👋 *مرحبا - Hello!*\n\n`

  switch (type) {
    case "general":
      message += `أحتاج مساعدة عامة\n`
      message += `I need general help\n\n`
      break
    case "order":
      message += `لدي سؤال حول طلبي\n`
      message += `I have a question about my order\n\n`
      if (details) {
        message += `رقم الطلب - Order #: ${details}\n\n`
      }
      break
    case "product":
      message += `لدي سؤال حول منتج\n`
      message += `I have a question about a product\n\n`
      if (details) {
        message += `المنتج - Product: ${details}\n\n`
      }
      break
    case "shipping":
      message += `لدي سؤال حول التوصيل\n`
      message += `I have a question about shipping\n\n`
      break
  }

  message += `شكرا لكم - Thank you! 🙏`
  return message
}

export function sendOrderToWhatsApp(orderData: OrderData): void {
  const message = generateWhatsAppOrderMessage(orderData)
  const whatsappUrl = generateWhatsAppLink(message)
  window.open(whatsappUrl, "_blank")
}

export function isWhatsAppAvailable(): boolean {
  return typeof window !== "undefined" && "navigator" in window
}

export function formatPhoneForWhatsApp(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, "")

  // Add country code if not present
  if (cleaned.startsWith("0")) {
    return "+212" + cleaned.substring(1)
  } else if (cleaned.startsWith("212")) {
    return "+" + cleaned
  } else if (cleaned.startsWith("+212")) {
    return cleaned
  } else {
    return "+212" + cleaned
  }
}
