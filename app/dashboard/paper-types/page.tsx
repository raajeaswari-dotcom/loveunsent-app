"use client";

import { useState, useEffect } from "react";

export default function PaperTypePage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");

  async function loadList() {
    const res = await fetch("/api/paper-types");
    const data = await res.json();
    setList(data);
  }

  useEffect(() => {
    loadList();
  }, []);

  async function addPaperType(e: any) {
    e.preventDefault();
    if (!name) return;

    await fetch("/api/paper-types", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    setName("");
    loadList();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Paper Types</h1>

      {/* Add new */}
      <form onSubmit={addPaperType} className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Paper Type Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-black text-white px-4 rounded">Add</button>
      </form>

      {/* List */}
      <div className="space-y-2">
        {list.map((pt: any) => (
          <div key={pt._id} className="p-3 border rounded">
            {pt.name}
          </div>
        ))}
      </div>
    </div>
  );
}
