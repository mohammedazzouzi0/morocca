import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "products.json");

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await fs.readFile(dataFile, "utf8");
    const products = JSON.parse(data) as Array<{ id: string }>;
    const product = products.find((p) => p.id === params.id);
    if (!product) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.error("Failed to read products.json", err);
    return NextResponse.json({ error: "Failed to load product" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const incoming = await req.json();
    const data = await fs.readFile(dataFile, "utf8");
    const products = JSON.parse(data) as any[];
    const index = products.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const current = products[index];
    const updated = {
      ...current,
      ...incoming,
      id: current.id, // preserve id
      price: typeof incoming.price !== "undefined" ? Number(incoming.price) : current.price,
      stock: typeof incoming.stock !== "undefined" ? Number(incoming.stock) : current.stock,
      colors: Array.isArray(incoming.colors) ? incoming.colors : current.colors,
      sizes: Array.isArray(incoming.sizes) ? incoming.sizes : current.sizes,
      images: Array.isArray(incoming.images) && incoming.images.length > 0 ? incoming.images : current.images,
      featured: typeof incoming.featured === "boolean" ? incoming.featured : current.featured,
    };
    products[index] = updated;
    await fs.writeFile(dataFile, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("Failed to update product", err);
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await fs.readFile(dataFile, "utf8");
    const products = JSON.parse(data) as Array<{ id: string }>;
    const index = products.findIndex((p) => p.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    const [deleted] = products.splice(index, 1);
    await fs.writeFile(dataFile, JSON.stringify(products, null, 2), "utf8");
    return NextResponse.json({ ok: true, deleted }, { status: 200 });
  } catch (err) {
    console.error("Failed to delete product", err);
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
  }
}
