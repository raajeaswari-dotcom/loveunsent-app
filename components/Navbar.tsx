"use client";

import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-white">
      <h1 className="text-lg font-semibold">Admin Panel</h1>

      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Logout
      </button>
    </header>
  );
}
