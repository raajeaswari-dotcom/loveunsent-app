"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import FileUpload from "@/components/FileUpload";

type ProductPayload = {
  title: string;
  description: string;
  price: number;
  tags: string[];
  images: string[];
  paperType?: string;
  writer?: string;
  designer?: string;
  category?: string;
};

export default function ProductForm({
  product,
  onSubmit,
}: {
  product?: any;
  onSubmit: (data: ProductPayload) => Promise<void>;
}) {
  const [title, setTitle] = useState<string>(product?.title || "");
  const [description, setDescription] = useState<string>(
    product?.description || ""
  );
  const [price, setPrice] = useState<number | "">(product?.price ?? "");
  const [tags, setTags] = useState<string>(
    product?.tags?.join(", ") || ""
  );
  const [images, setImages] = useState<string[]>(product?.images || []);

  // Dropdown data
  const [paperTypes, setPaperTypes] = useState<any[]>([]);
  const [writers, setWriters] = useState<any[]>([]);
  const [designers, setDesigners] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // Selected values
  const [paperType, setPaperType] = useState<string>(product?.paperType || "");
  const [writer, setWriter] = useState<string>(product?.writer || "");
  const [designer, setDesigner] = useState<string>(product?.designer || "");
  const [category, setCategory] = useState<string>(product?.category || "");

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

    loadData().catch((err) => console.error("loadData error:", err));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const payload: ProductPayload = {
      title,
      description,
      price: typeof price === "number" ? price : Number(price || 0),
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      images,
      paperType: paperType || undefined,
      writer: writer || undefined,
      designer: designer || undefined,
      category: category || undefined,
    };

    await onSubmit(payload);
  }

  // helpers to handle changes with proper types
  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.target.value);
  const onDescChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);
  const onPriceChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPrice(e.target.value === "" ? "" : Number(e.target.value));
  const onTagsChange = (e: ChangeEvent<HTMLInputElement>) =>
    setTags(e.target.value);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      {/* TITLE + AI BUTTON */}
      <div className="space-y-2">
        <input
          placeholder="Product Title"
          className="border p-2 w-full rounded"
          value={title}
          onChange={onTitleChange}
        />

        {/* AI Description Generator */}
        <button
          type="button"
          className="text-sm px-3 py-1 bg-purple-600 text-white rounded"
          onClick={async () => {
            if (!title) return alert("Enter a title first!");

            try {
              const res = await fetch("/api/ai/description", {
                method: "POST",
                body: JSON.stringify({ title }),
                headers: { "Content-Type": "application/json" },
              });

              const data = await res.json();

              if (data.description) setDescription(data.description);
              if (data.tags) setTags((data.tags as string[]).join(", "));
            } catch (err) {
              console.error("AI generation error:", err);
              alert("AI generation failed");
            }
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
        onChange={onDescChange}
      />

      {/* PRICE */}
      <input
        type="number"
        placeholder="Price"
        className="border p-2 w-full rounded"
        value={price === "" ? "" : price}
        onChange={onPriceChange}
      />

      {/* TAGS */}
      <input
        placeholder="Comma separated tags"
        className="border p-2 w-full rounded"
        value={tags}
        onChange={onTagsChange}
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
            <option key={w._1d ?? w._id} value={w.name}>
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
            <img src={img} className="w-24 h-24 object-cover rounded border" />

            <button
              type="button"
              onClick={() => {
                if (confirm("Remove this image?")) {
                  // typed filter callback: '_' is intentionally unused
                  setImages(images.filter((_: string, i: number) => i !== idx));
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
      <button
        type="submit"
        className="bg-black text-white rounded px-4 py-2"
      >
        Save Product
      </button>
    </form>
  );
}
