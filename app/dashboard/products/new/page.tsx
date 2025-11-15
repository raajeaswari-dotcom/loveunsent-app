import ProductForm from "@/components/products/ProductForm";

export default function NewProductPage() {
  async function createProduct(data: any) {
    await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Create Product</h1>
      <ProductForm onSubmit={createProduct} />
    </div>
  );
}
