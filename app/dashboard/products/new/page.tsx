"use client";

import ProductForm from "@/components/ProductForm";

export default function NewProductPage() {
  async function handleSubmit(data: any) {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });

    alert("Product created!");
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
