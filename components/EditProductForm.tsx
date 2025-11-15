"use client";

import ProductForm from "@/components/ProductForm";

export default function EditProductForm({ product }: { product: any }) {
  async function updateProduct(data: any) {
    await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });

    alert("Product updated");
  }

  return <ProductForm product={product} onSubmit={updateProduct} />;
}
