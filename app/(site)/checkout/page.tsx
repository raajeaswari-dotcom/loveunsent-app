"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cart } = useCart();
  const router = useRouter();

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0
  );

  async function handleSubmit(e: any) {
    e.preventDefault();

    const res = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        customer,
        items: cart,
        total,
      }),
    });

    if (res.ok) {
      router.push("/checkout/success");
    }
  }

  if (cart.length === 0) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-xl">Your cart is empty.</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* NAME */}
        <input
          className="border p-3 w-full rounded"
          placeholder="Full Name"
          value={customer.name}
          onChange={(e) =>
            setCustomer({ ...customer, name: e.target.value })
          }
        />

        {/* EMAIL */}
        <input
          className="border p-3 w-full rounded"
          placeholder="Email Address"
          value={customer.email}
          onChange={(e) =>
            setCustomer({ ...customer, email: e.target.value })
          }
        />

        {/* PHONE */}
        <input
          className="border p-3 w-full rounded"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={(e) =>
            setCustomer({ ...customer, phone: e.target.value })
          }
        />

        {/* ADDRESS */}
        <textarea
          className="border p-3 w-full rounded"
          placeholder="Delivery Address"
          rows={4}
          value={customer.address}
          onChange={(e) =>
            setCustomer({ ...customer, address: e.target.value })
          }
        />

        {/* ORDER SUMMARY */}
        <div className="p-4 bg-gray-100 border rounded mt-6">
          <h2 className="text-xl font-semibold mb-3">Order Summary</h2>

          {cart.map((item: any) => (
            <div key={item._id} className="flex justify-between mb-1">
              <p>
                {item.title} × {item.qty}
              </p>
              <p>${item.price * item.qty}</p>
            </div>
          ))}

          <hr className="my-3" />

          <h3 className="text-lg font-semibold">Total: ${total}</h3>
        </div>

        {/* SUBMIT */}
        <button className="mt-4 bg-black text-white py-3 px-6 rounded text-lg w-full">
          Place Order
        </button>
      </form>
    </div>
  );
}
