"use client";

import { useState } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateThumbnail = async () => {
    if (!title) {
      alert("Please enter a title");
      return;
    }

    setLoading(true);
    setImage(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      const data = await res.json();
      setImage(data.image);
    } catch (error) {
      alert("Error generating image");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 gap-6">
      <h1 className="text-4xl font-bold">AI Thumbnail Generator 🚀</h1>

      <input
        type="text"
        placeholder="Enter YouTube Title"
        className="border p-3 w-full max-w-md rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button
        onClick={generateThumbnail}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading ? "Generating..." : "Generate Thumbnail"}
      </button>

      {image && (
        <img
          src={image}
          alt="Generated Thumbnail"
          className="mt-6 w-[600px] rounded shadow-lg"
        />
      )}
    </div>
  );
}
