import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "products.json");

export async function GET() {
  try {
    const data = await fs.readFile(dataFile, "utf8");
    const products = JSON.parse(data);
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    console.error("Failed to read products.json", err);
    return NextResponse.json({ error: "Failed to load products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const incoming = await req.json();
    // Basic validation
    if (!incoming || !incoming.name || !incoming.description) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const data = await fs.readFile(dataFile, "utf8");
    const products = JSON.parse(data) as any[];

    const now = new Date();
    const newProduct = {
      id: incoming.id || Date.now().toString(),
      name: incoming.name,
      nameAr: incoming.nameAr || "",
      nameFr: incoming.nameFr || "",
      nameDarija: incoming.nameDarija || "",
      description: incoming.description,
      descriptionAr: incoming.descriptionAr || "",
      descriptionFr: incoming.descriptionFr || "",
      descriptionDarija: incoming.descriptionDarija || "",
      price: Number(incoming.price) || 0,
      images: Array.isArray(incoming.images) && incoming.images.length > 0 ? incoming.images : ["/placeholder.svg"],
      category: incoming.category || "traditional",
      colors: Array.isArray(incoming.colors) ? incoming.colors.filter((c: string) => c && c.trim() !== "") : [],
      sizes: Array.isArray(incoming.sizes) ? incoming.sizes.filter((s: string) => s && s.trim() !== "") : [],
      stock: Number(incoming.stock) || 0,
      featured: Boolean(incoming.featured) || false,
      popularity: typeof incoming.popularity === "number" ? incoming.popularity : 50,
      createdAt: incoming.createdAt || now.toISOString().split("T")[0],
    };

    products.push(newProduct);
    await fs.writeFile(dataFile, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json(newProduct, { status: 201 });
  } catch (err) {
    console.error("Failed to create product", err);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
