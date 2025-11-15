"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";

export default function EditProductForm({ productId }: { productId: string }) {
  const router = useRouter();
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!productId) return;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${productId}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [productId]);

  async function handleUpdate(data: any) {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Update failed");
      // optional: go back to product list or the edit page
      router.push("/dashboard/products");
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  }

  if (loading) {
    return <div className="p-6">Loading product…</div>;
  }

  if (!product) {
    return <div className="p-6">Product not found.</div>;
  }

  return <ProductForm product={product} onSubmit={handleUpdate} />;
}
