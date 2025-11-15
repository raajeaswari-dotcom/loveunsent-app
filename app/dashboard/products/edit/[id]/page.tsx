import EditProductForm from "@/components/EditProductForm";

async function getProduct(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  return res.json();
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      {/* Pass correct prop name */}
      <EditProductForm product={product} />
    </div>
  );
}
