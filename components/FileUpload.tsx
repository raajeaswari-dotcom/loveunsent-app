"use client";

import { useState } from "react";

export default function FileUpload({ images, setImages }: any) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e: any) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      setImages((prev: string[]) => [...prev, data.secure_url]);
    }

    setUploading(false);
  }

  return (
    <div className="space-y-2">
      <label className="font-medium">Product Images</label>

      <input
        type="file"
        className="border p-2 rounded"
        onChange={handleUpload}
      />

      {uploading && <p className="text-sm">Uploading...</p>}

      <div className="flex gap-2 mt-2 flex-wrap">
        {images.map((img: string) => (
          <img
            key={img}
            src={img}
            className="w-24 h-24 object-cover rounded border"
          />
        ))}
      </div>
    </div>
  );
}
