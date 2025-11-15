"use client";

import { useState, useEffect } from "react";

export default function CategoryPage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");

  async function loadList() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setList(data);
  }

  useEffect(() => {
    loadList();
  }, []);

  async function addCategory(e: any) {
    e.preventDefault();
    if (!name) return;

    await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({ name, parent }),
    });

    setName("");
    setParent("");
    loadList();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Product Categories</h1>

      {/* Add new */}
      <form onSubmit={addCategory} className="space-y-3 mb-6 max-w-md">
        <input
          className="border p-2 w-full rounded"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <select
          className="border p-2 w-full rounded"
          value={parent}
          onChange={(e) => setParent(e.target.value)}
        >
          <option value="">No Parent (Top level)</option>
          {list.map((c: any) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        <button className="bg-black text-white px-4 py-2 rounded">
          Add Category
        </button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {list.map((c: any) => (
          <div key={c._id} className="p-3 border rounded">
            <b>{c.name}</b>
            {c.parent && (
              <span className="text-sm text-gray-500"> (child of {c.parent})</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
