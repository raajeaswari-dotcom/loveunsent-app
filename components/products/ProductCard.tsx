"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/app/context/CartContext";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart } = useCart();
  const img = product.images?.[0] || "/no-image.png";

  return (
    <Link href={`/product/${product._id}`} className="group">
      <Card className="rounded-2xl overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
        {/* Image */}
        <div className="relative w-full h-64 overflow-hidden">
          <img
            src={img}
            alt={product.title}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <h2 className="text-lg font-semibold line-clamp-2">
            {product.title}
          </h2>

          <p className="text-pink-600 font-bold mt-2 text-xl">
            ${product.price}
          </p>

          <div className="mt-4 flex gap-2">
            <Link
              href={`/product/${product._id}`}
              onClick={(e) => {
                /* allow normal link navigation */
              }}
              className="flex-1 py-2 rounded-md bg-white border text-sm text-center"
            >
              View
            </Link>

            <button
              className="flex-1 py-2 rounded-md bg-pink-600 text-white text-sm hover:opacity-95 transition"
              onClick={(e) => {
                // prevent the parent Link navigation when clicking Add
                e.preventDefault();
                addToCart(product);
              }}
            >
              Add
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
