"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Products", href: "/dashboard/products" },
  { name: "Orders", href: "/dashboard/orders" },
  { name: "Writers", href: "/dashboard/writers" },
  { name: "Designers", href: "/dashboard/designers" },
  { name: "Paper Types", href: "/dashboard/paper-types" },
  { name: "Coupons", href: "/dashboard/coupons" },
  { name: "Settings", href: "/dashboard/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-100 border-r hidden md:block">
      <div className="p-4 font-bold text-xl">LOVEUNSENT Admin</div>

      <nav className="flex flex-col gap-1 mt-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`p-3 pl-5 block ${
              pathname === link.href
                ? "bg-black text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
