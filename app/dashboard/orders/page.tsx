async function getOrders() {
  const res = await fetch("http://localhost:3000/api/orders", {
    cache: "no-store",
  });
  return res.json();
}

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      {orders.length === 0 && (
        <p className="text-gray-600">No orders found.</p>
      )}

      <div className="space-y-6">
        {orders.map((order: any) => (
          <div
            key={order._id}
            className="block border p-5 rounded-lg hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold">
                  {order.customer.name}
                </h2>
                <p className="text-gray-600">{order.customer.email}</p>
                <p className="text-gray-600">{order.customer.phone}</p>
                <p className="text-gray-700 mt-1">{order.customer.address}</p>

                <p className="mt-3 font-semibold">
                  Total: ${order.total}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`
                    px-3 py-1 rounded text-sm font-medium 
                    ${
                      order.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "Confirmed"
                        ? "bg-blue-100 text-blue-700"
                        : order.status === "Shipped"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }
                  `}
                >
                  {order.status}
                </p>

                <p className="text-xs text-gray-500 mt-2">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
