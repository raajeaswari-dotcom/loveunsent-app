import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      <Link
        href="/dashboard/products/new"
        className="bg-black text-white px-4 py-2 rounded"
      >
        Add Product
      </Link>

      <div className="mt-6 space-y-4">
        {products.map((p: any) => (
          <div key={p._id} className="border p-4 rounded flex justify-between">
            <div>
              <h2 className="font-bold">{p.title}</h2>
              <p className="text-sm text-gray-600">${p.price}</p>
            </div>

            <Link
              href={`/dashboard/products/${p._id}`}
              className="text-blue-600 underline"
            >
              Edit
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
