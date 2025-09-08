import { promises as fs } from "fs";
import path from "path";

export interface Product {
  id: string;
  name: string;
  nameAr: string;
  nameFr: string;
  nameDarija: string;
  description: string;
  descriptionAr: string;
  descriptionFr: string;
  descriptionDarija: string;
  price: number;
  images: string[];
  category: string;
  colors: string[];
  sizes: string[];
  stock: number;
  featured: boolean;
  popularity: number;
  createdAt: string;
}

const dataFile = path.join(process.cwd(), "data", "products.json");

export async function getAllProducts(): Promise<Product[]> {
  const data = await fs.readFile(dataFile, "utf8");
  return JSON.parse(data) as Product[];
}

export async function getProductByIdServer(id: string): Promise<Product | undefined> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id);
}
