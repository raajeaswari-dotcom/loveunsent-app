"use client";

import { useState, useEffect } from "react";

export default function WriterPage() {
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState("");

  async function loadList() {
    const res = await fetch("/api/writers");
    const data = await res.json();
    setList(data);
  }

  useEffect(() => {
    loadList();
  }, []);

  async function addWriter(e: any) {
    e.preventDefault();
    if (!name) return;

    await fetch("/api/writers", {
      method: "POST",
      body: JSON.stringify({ name }),
    });

    setName("");
    loadList();
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Writers</h1>

      <form onSubmit={addWriter} className="flex gap-2 mb-6">
        <input
          className="border p-2 rounded"
          placeholder="Writer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="bg-black text-white px-4 rounded">Add</button>
      </form>

      <div className="space-y-2">
        {list.map((w: any) => (
          <div key={w._id} className="p-3 border rounded">
            {w.name}
          </div>
        ))}
      </div>
    </div>
  );
}
