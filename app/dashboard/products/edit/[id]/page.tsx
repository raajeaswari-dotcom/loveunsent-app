import EditProductForm from "@/components/products/EditProductForm";

interface Props {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: Props) {
  const { id } = params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products/${id}`, {
    cache: "no-store",
  });
  const product = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <EditProductForm product={product} />
    </div>
  );
}
