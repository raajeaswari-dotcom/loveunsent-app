import ProductForm from "@/components/products/ProductForm";

async function getProduct(id: string) {
  const res = await fetch(`https://loveunsent-app.vercel.app/api/products/${id}`);
  return res.json();
}

export default async function EditProductPage({ searchParams }: any) {
  const product = await getProduct(searchParams.id);

  async function updateProduct(data: any) {
    await fetch(`/api/products/${product._id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit Product</h1>
      <ProductForm product={product} onSubmit={updateProduct} />
    </div>
  );
}
