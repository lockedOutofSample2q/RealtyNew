"use client";
// components/admin/ImageUploader.tsx
// ============================================================
// Drag & drop image uploader → Local Storage
//
// Props:
//   value    — current array of image URLs
//   onChange — called with updated array after add/remove/reorder
// ============================================================

import { useRef, useState, useCallback, DragEvent, ChangeEvent } from "react";
import { Upload, X, GripVertical, ImageIcon, AlertCircle, CheckCircle2, ExternalLink } from "lucide-react";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  maxImages?: number;
}

interface UploadItem {
  id: string;
  file?: File;
  url?: string;
  preview: string;
  status: "uploading" | "done" | "error";
  error?: string;
}

const GOLD = "#C9A84C";

export default function ImageUploader({ value, onChange, maxImages = 20 }: Props) {
  const [draggingOver, setDraggingOver] = useState(false);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Upload a single file ─────────────────────
  async function uploadFile(file: File): Promise<string> {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: form });
    const json = await res.json();
    if (!res.ok) throw new Error(json.error ?? "Upload failed");
    return json.url as string;
  }

  // ── Handle files (from drop or input) ──────────────────────
  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!arr.length) return;

    // Create upload items with previews
    const items: UploadItem[] = arr.map((f) => ({
      id: `${Date.now()}-${Math.random()}`,
      file: f,
      preview: URL.createObjectURL(f),
      status: "uploading" as const,
    }));
    setUploads((prev) => [...prev, ...items]);

    // Upload each file
    for (const item of items) {
      try {
        const url = await uploadFile(item.file!);
        setUploads((prev) => prev.map((u) => u.id === item.id ? { ...u, url, status: "done" } : u));
        onChange([...value, url]);
      } catch (err: any) {
        setUploads((prev) =>
          prev.map((u) => u.id === item.id ? { ...u, status: "error", error: err.message } : u)
        );
      }
    }

    // Cleanup previews after 3 seconds
    setTimeout(() => {
      items.forEach((i) => URL.revokeObjectURL(i.preview));
      setUploads((prev) => prev.filter((u) => u.status === "error"));
    }, 3000);
  }, [value, onChange]);

  // ── Drop zone handlers ──────────────────────────────────────
  function onDrop(e: DragEvent) {
    e.preventDefault();
    setDraggingOver(false);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
  }
  function onDragOver(e: DragEvent) { e.preventDefault(); setDraggingOver(true); }
  function onDragLeave() { setDraggingOver(false); }
  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) handleFiles(e.target.files);
    e.target.value = "";
  }

  // ── Add URL manually ────────────────────────────────────────
  function addUrl() {
    const u = urlInput.trim();
    if (!u || value.includes(u)) return;
    onChange([...value, u]);
    setUrlInput("");
  }

  // ── Remove image ────────────────────────────────────────────
  function remove(url: string) {
    onChange(value.filter((u) => u !== url));
  }

  // ── Drag-to-reorder ─────────────────────────────────────────
  function onItemDragStart(i: number) { setDragIndex(i); }
  function onItemDragOver(e: DragEvent, i: number) { e.preventDefault(); setDragOverIndex(i); }
  function onItemDrop(i: number) {
    if (dragIndex === null || dragIndex === i) { setDragIndex(null); setDragOverIndex(null); return; }
    const next = [...value];
    const [moved] = next.splice(dragIndex, 1);
    next.splice(i, 0, moved);
    onChange(next);
    setDragIndex(null);
    setDragOverIndex(null);
  }

  const cfConfigured = true; // optimistic — error shown on upload fail

  return (
    <div className="space-y-4">
      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all"
        style={{
          borderColor: draggingOver ? GOLD : "rgba(0,0,0,0.12)",
          backgroundColor: draggingOver ? "rgba(201,168,76,0.05)" : "#F7F6F3",
        }}
      >
        <Upload size={24} style={{ color: draggingOver ? GOLD : "#bbb" }} />
        <div className="text-center">
          <p className="font-body text-sm text-[#555]">
            <span style={{ color: GOLD }} className="font-medium">Click to upload</span> or drag & drop
          </p>
          <p className="font-body text-xs text-[#aaa] mt-1">
            PNG, JPG, WebP — uploads to local storage
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onInputChange}
        />
      </div>

      {/* Active uploads */}
      {uploads.length > 0 && (
        <div className="space-y-2">
          {uploads.map((u) => (
            <div key={u.id} className="flex items-center gap-3 bg-white border border-black/[0.07] rounded-lg p-3">
              <img src={u.preview} alt="" className="w-12 h-12 object-cover rounded-lg shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-body text-xs text-[#555] truncate">{u.file?.name}</p>
                {u.status === "uploading" && (
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-3 h-3 rounded-full border-2 animate-spin" style={{ borderColor: GOLD, borderTopColor: "transparent" }} />
                    <span className="font-body text-xs text-[#aaa]">Uploading...</span>
                  </div>
                )}
                {u.status === "done" && (
                  <div className="flex items-center gap-1.5 mt-1 text-green-600">
                    <CheckCircle2 size={12} /> <span className="font-body text-xs">Uploaded</span>
                  </div>
                )}
                {u.status === "error" && (
                  <div className="flex items-center gap-1.5 mt-1 text-red-500">
                    <AlertCircle size={12} />
                    <span className="font-body text-xs">{u.error}</span>
                  </div>
                )}
              </div>
              {u.status === "error" && (
                <button onClick={() => setUploads((p) => p.filter((x) => x.id !== u.id))}
                  className="text-[#bbb] hover:text-red-400 transition-colors">
                  <X size={14} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Image grid (uploaded) */}
      {value.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {value.map((url, i) => (
            <div
              key={url}
              draggable
              onDragStart={() => onItemDragStart(i)}
              onDragOver={(e) => onItemDragOver(e, i)}
              onDrop={() => onItemDrop(i)}
              className="relative group rounded-xl overflow-hidden border-2 transition-all cursor-grab active:cursor-grabbing"
              style={{
                borderColor: dragOverIndex === i ? GOLD : "rgba(0,0,0,0.08)",
                opacity: dragIndex === i ? 0.5 : 1,
              }}
            >
              <img src={url} alt="" className="w-full aspect-square object-cover" />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                <a href={url} target="_blank" rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="w-7 h-7 bg-white/90 rounded-lg flex items-center justify-center hover:bg-white transition-colors">
                  <ExternalLink size={12} className="text-[#333]" />
                </a>
                <button onClick={() => remove(url)}
                  className="w-7 h-7 bg-red-500 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <X size={12} className="text-white" />
                </button>
              </div>
              {/* Position badge */}
              <div className="absolute top-1.5 left-1.5 bg-black/60 text-white font-mono text-[10px] w-5 h-5 rounded flex items-center justify-center">
                {i + 1}
              </div>
              <GripVertical size={14} className="absolute top-1.5 right-1.5 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      )}

      {/* URL input (paste CDN link manually) */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <ImageIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#bbb]" />
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addUrl())}
            placeholder="Or paste an image URL directly..."
            className="w-full bg-[#F7F6F3] border border-black/[0.1] text-[#0A0A0A] font-body text-sm pl-8 pr-3 py-2.5 rounded-lg outline-none focus:border-amber-400 transition-colors placeholder:text-[#bbb]"
          />
        </div>
        <button
          type="button"
          onClick={addUrl}
          className="px-4 py-2.5 rounded-lg font-body text-sm font-medium transition-colors"
          style={{ backgroundColor: "rgba(201,168,76,0.1)", color: "#8a6d1f" }}
        >
          Add URL
        </button>
      </div>

      <p className="font-body text-xs text-[#aaa]">
        {value.length} image{value.length !== 1 ? "s" : ""} · Drag thumbnails to reorder · First image is the cover
      </p>
    </div>
  );
}
