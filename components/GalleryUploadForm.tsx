"use client";
import { createGalleryImage } from "@/app/admin/gallery/actions";

import { useState } from "react";

export function GalleryUploadForm() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("general");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file || !title) return;

    setUploading(true);

    const uploadData = new FormData();
    uploadData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: uploadData,
    });

    const uploadJson = await uploadRes.json();

    if (!uploadJson.url) {
      alert("Upload failed");
      setUploading(false);
      return;
    }

    const saveData = new FormData();
    saveData.append("title", title);
    saveData.append("imageUrl", uploadJson.url);
    saveData.append("category", category);

  await createGalleryImage(saveData);

    setUploading(false);
    window.location.reload();
  }

  return (
    <div className="mb-10 grid gap-4 rounded-[2rem] bg-white p-6 shadow md:grid-cols-3">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Image title"
        className="rounded-2xl border p-4"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="rounded-2xl border p-4"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="rounded-2xl border p-4"
      >
        <option value="general">General</option>
        <option value="rooms">Rooms</option>
        <option value="pool">Pool</option>
        <option value="dining">Dining</option>
        <option value="exterior">Exterior</option>
      </select>

      <button
        type="button"
        onClick={handleUpload}
        disabled={uploading}
        className="rounded-2xl bg-[#0F2E18] px-6 py-4 font-black text-white md:col-span-3"
      >
        {uploading ? "Uploading..." : "Upload Gallery Image"}
      </button>
    </div>
  );
}