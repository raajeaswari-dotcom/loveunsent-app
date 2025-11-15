"use client";

import { useState, useEffect } from "react";
import FileUpload from "@/components/FileUpload";

export default function ProductForm({
  product,
  onSubmit,
}: {
  product?: any;
  onSubmit: (data: any) => Promise<void>;
}) {
  const [title, setTitle] = useState(product?.title || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [tags, setTags] = useState(product?.tags?.join(", ") || "");
  const [images, setImages] = useState(product?.images || []);

  // Dropdown data
  const [paperTypes, setPaperTypes] = useState<any[]>([]);
  const [writers, setWriters] = useState<any[]>([]);
  const [designers, setDesigners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Selected values
  const [paperType, setPaperType] = useState(product?.paperType || "");
  const [writer, setWriter] = useState(product?.writer || "");
  const [designer, setDesigner] = useState(product?.designer || "");
  const [category, setCategory] = useState(product?.category || "");

  // Load dropdown data
  useEffect(() => {
    async function loadData() {
      const [ptRes, wrRes, dsRes, catRes] = await Promise.all([
        fetch("/api/paper-types"),
        fetch("/api/writers"),
        fetch("/api/designers"),
        fetch("/api/categories"),
      ]);

      setPaperTypes(await ptRes.json());
      setWriters(await wrRes.json());
      setDesigners(await dsRes.json());
      setCategories(await catRes.json());
    }

    loadData();
  }, []);

  async function handleSubmit(e: any) {
    e.preventDefault();

    await onSubmit({
      title,
      description,
      price: Number(price),
      tags: tags.split(",").map((t) => t.trim()),
      images,
      paperType,
      writer,
      designer,
      category,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">

      {/* TITLE + AI BUTTON */}
      <div className="space-y-2">
        <input
          placeholder="Product Title"
          className="border p-2 w-full rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* AI Description Generator */}
        <button
          type="button"
          className="text-sm px-3 py-1 bg-purple-600 text-white rounded"
          onClick={async () => {
            if (!title) return alert("Enter a title first!");

            const res = await fetch("/api/ai/description", {
              method: "POST",
              body: JSON.stringify({ title }),
            });

            const data = await res.json();

            if (data.description) setDescription(data.description);
            if (data.tags) setTags(data.tags.join(", "));
          }}
        >
          Generate Description with AI
        </button>
      </div>

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        className="border p-2 w-full rounded"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      {/* PRICE */}
      <input
        type="number"
        placeholder="Price"
        className="border p-2 w-full rounded"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      {/* TAGS */}
      <input
        placeholder="Comma separated tags"
        className="border p-2 w-full rounded"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* PAPER TYPE */}
      <div>
        <label className="block mb-1 font-medium">Paper Type</label>
        <select
          className="border p-2 rounded w-full"
          value={paperType}
          onChange={(e) => setPaperType(e.target.value)}
        >
          <option value="">Select Paper Type</option>
          {paperTypes.map((pt: any) => (
            <option key={pt._id} value={pt.name}>
              {pt.name}
            </option>
          ))}
        </select>
      </div>

      {/* WRITER */}
      <div>
        <label className="block mb-1 font-medium">Writer</label>
        <select
          className="border p-2 rounded w-full"
          value={writer}
          onChange={(e) => setWriter(e.target.value)}
        >
          <option value="">Select Writer</option>
          {writers.map((w: any) => (
            <option key={w._id} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>
      </div>

      {/* DESIGNER */}
      <div>
        <label className="block mb-1 font-medium">Designer</label>
        <select
          className="border p-2 rounded w-full"
          value={designer}
          onChange={(e) => setDesigner(e.target.value)}
        >
          <option value="">Select Designer</option>
          {designers.map((d: any) => (
            <option key={d._id} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
      </div>

      {/* CATEGORY */}
      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          className="border p-2 rounded w-full"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((c: any) => (
            <option key={c._id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* CLOUDINARY UPLOAD */}
      <FileUpload images={images} setImages={setImages} />

      {/* IMAGE PREVIEW + DELETE */}
      <div className="flex gap-2 flex-wrap mt-4">
        {images.map((img: string, idx: number) => (
          <div key={idx} className="relative group">
            <img
              src={img}
              className="w-24 h-24 object-cover rounded border"
            />

            <button
              type="button"
              onClick={() => {
                if (confirm("Remove this image?")) {
                  setImages(images.filter((_, i) => i !== idx));
                }
              }}
              className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* SUBMIT BUTTON */}
      <button className="bg-black text-white rounded px-4 py-2">
        Save Product
      </button>
    </form>
  );
}
