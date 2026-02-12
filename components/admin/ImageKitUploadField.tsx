"use client";

import { useRef, useState } from "react";

type ImageKitUploadFieldProps = {
  inputId: string;
  inputName: string;
  label?: string;
  defaultValue?: string;
  className?: string;
};

const UPLOAD_URL = "https://upload.imagekit.io/api/v1/files/upload";

export function ImageKitUploadField({
  inputId,
  inputName,
  label = "Image",
  defaultValue = "",
  className = "",
}: ImageKitUploadFieldProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setUploading(true);

    try {
      const authRes = await fetch("/api/imagekit-auth");
      if (!authRes.ok) {
        const data = await authRes.json().catch(() => ({}));
        throw new Error(data.error || "Failed to get upload credentials");
      }
      const { token, signature, expire } = await authRes.json();

      const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
      if (!publicKey) throw new Error("ImageKit is not configured");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("publicKey", publicKey);
      formData.append("signature", signature);
      formData.append("token", token);
      formData.append("expire", String(expire));

      const uploadRes = await fetch(UPLOAD_URL, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const errData = await uploadRes.json().catch(() => ({}));
        throw new Error(errData.message || errData.error || `Upload failed (${uploadRes.status})`);
      }

      const result = (await uploadRes.json()) as { url?: string };
      const imageUrl = result.url ?? "";
      if (imageUrl) {
        const input = document.getElementById(inputId) as HTMLInputElement | null;
        if (input) {
          input.value = imageUrl;
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="mt-1 flex gap-2">
        <input
          id={inputId}
          name={inputName}
          type="url"
          defaultValue={defaultValue}
          placeholder="Image URL or upload below"
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-slate-900 shadow-sm focus:border-[var(--logo-green)] focus:outline-none focus:ring-1 focus:ring-[var(--logo-green)]"
        />
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
          disabled={uploading}
          aria-label="Upload image"
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="shrink-0 rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:opacity-50"
        >
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
}
