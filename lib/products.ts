export interface Product {
  id: string
  name: string
  nameAr: string
  nameFr: string
  nameDarija: string
  description: string
  descriptionAr: string
  descriptionFr: string
  descriptionDarija: string
  price: number
  images: string[]
  category: string
  colors: string[]
  sizes: string[]
  stock: number
  featured: boolean
  popularity: number
  createdAt: string
}

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Traditional Leather Babouche",
    nameAr: "بلغة جلدية تقليدية",
    nameFr: "Babouche en Cuir Traditionnel",
    nameDarija: "بلغة ديال الجلد التقليدية",
    description: "Handcrafted traditional Moroccan babouche made from premium leather",
    descriptionAr: "بلغة مغربية تقليدية مصنوعة يدوياً من الجلد الفاخر",
    descriptionFr: "Babouche marocaine traditionnelle faite à la main en cuir premium",
    descriptionDarija: "بلغة مغربية تقليدية مصنوعة بيد من جلد زوين",
    price: 299,
    images: ["/traditional-moroccan-leather-babouche-slippers.jpg"],
    category: "traditional",
    colors: ["brown", "black", "tan"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44"],
    stock: 25,
    featured: true,
    popularity: 95,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    name: "Embroidered Silk Babouche",
    nameAr: "بلغة حريرية مطرزة",
    nameFr: "Babouche en Soie Brodée",
    nameDarija: "بلغة ديال الحرير المطرزة",
    description: "Elegant silk babouche with intricate traditional embroidery",
    descriptionAr: "بلغة حريرية أنيقة مع تطريز تقليدي معقد",
    descriptionFr: "Babouche en soie élégante avec broderie traditionnelle complexe",
    descriptionDarija: "بلغة ديال الحرير زوينة مع تطريز تقليدي",
    price: 450,
    images: ["/embroidered-silk-moroccan-babouche-slippers.jpg"],
    category: "luxury",
    colors: ["gold", "red", "blue", "green"],
    sizes: ["36", "37", "38", "39", "40", "41", "42"],
    stock: 15,
    featured: true,
    popularity: 88,
    createdAt: "2024-01-20",
  },
  {
    id: "3",
    name: "Modern Comfort Babouche",
    nameAr: "بلغة عصرية مريحة",
    nameFr: "Babouche Moderne Confortable",
    nameDarija: "بلغة عصرية مريحة",
    description: "Contemporary babouche design with enhanced comfort and modern styling",
    descriptionAr: "تصميم بلغة معاصر مع راحة محسنة وتصميم عصري",
    descriptionFr: "Design de babouche contemporain avec confort amélioré et style moderne",
    descriptionDarija: "بلغة عصرية مريحة وزوينة",
    price: 199,
    images: ["/modern-comfortable-moroccan-babouche-slippers.jpg"],
    category: "modern",
    colors: ["white", "beige", "gray", "navy"],
    sizes: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45"],
    stock: 30,
    featured: false,
    popularity: 75,
    createdAt: "2024-02-01",
  },
]

export const products = mockProducts

export function getProducts(): Product[] {
  if (typeof window === "undefined") return mockProducts
  const stored = localStorage.getItem("moroccan-products")
  if (stored) {
    try {
      return JSON.parse(stored)
    } catch {
      return mockProducts
    }
  }
  return mockProducts
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("moroccan-products", JSON.stringify(products))
}

export function getProductById(id: string): Product | undefined {
  const products = getProducts()
  return products.find((product) => product.id === id)
}

export function getFeaturedProducts(): Product[] {
  return getProducts().filter((product) => product.featured)
}

export function getProductsByCategory(category: string): Product[] {
  return getProducts().filter((product) => product.category === category)
}
