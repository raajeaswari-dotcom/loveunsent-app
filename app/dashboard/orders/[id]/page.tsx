"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function OrderDetailPage({ params }: any) {
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then(setOrder);
  }, [params.id]);

  async function updateStatus(newStatus: string) {
    await fetch(`/api/orders/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ status: newStatus }),
    });

    setOrder({ ...order, status: newStatus });
  }

  if (!order) return <p className="p-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <button
        onClick={() => router.back()}
        className="text-sm underline text-gray-600 mb-6"
      >
        ← Back to Orders
      </button>

      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Customer Info */}
      <div className="border rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Customer Information</h2>
        <p><b>Name:</b> {order.customer.name}</p>
        <p><b>Email:</b> {order.customer.email}</p>
        <p><b>Phone:</b> {order.customer.phone}</p>
        <p><b>Address:</b> {order.customer.address}</p>
      </div>

      {/* Items */}
      <div className="border rounded p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">Items</h2>

        {order.items.map((item: any, idx: number) => (
          <div key={idx} className="flex justify-between border-b py-2">
            <div>
              <p className="font-medium">{item.title}</p>
              <p className="text-sm text-gray-600">Qty: {item.qty}</p>
            </div>
            <p>${item.price * item.qty}</p>
          </div>
        ))}

        <p className="text-lg font-bold mt-4">
          Total: ${order.total}
        </p>
      </div>

      {/* Status */}
      <div className="border rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Order Status</h2>

        <select
          value={order.status}
          onChange={(e) => updateStatus(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    </div>
  );
}
