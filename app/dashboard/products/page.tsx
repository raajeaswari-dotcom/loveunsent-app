import Link from "next/link";

async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  async function deleteProduct(id: string) {
    "use server";

    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
    });
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <Link
          href="/dashboard/products/new"
          className="bg-black text-white px-4 py-2 rounded"
        >
          + Add Product
        </Link>
      </div>

      <div className="space-y-3">
        {products.map((p: any) => {
          const img = p.images?.[0] || "/no-image.png"; // default fallback

          return (
            <div
              key={p._id}
              className="p-4 border rounded flex justify-between items-center"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={img}
                  alt={p.title}
                  className="w-20 h-20 object-cover rounded border"
                />

                <div>
                  <div className="font-bold">{p.title}</div>
                  <div className="text-gray-600">${p.price}</div>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex gap-3">
                <Link
                  href={`/dashboard/products/edit?id=${p._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </Link>

                <form action={deleteProduct.bind(null, p._id)}>
                  <button
                    type="submit"
                    className="text-red-600 hover:underline"
                    onClick={(e) => {
                      if (
                        !confirm(
                          "Are you sure you want to delete this product?"
                        )
                      ) {
                        e.preventDefault();
                      }
                    }}
                  >
                    Delete
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
