"use client";

import { useState } from "react";
import { IKContext, IKUpload } from "imagekitio-react";
import Image from "next/image";
import { X, Upload, Loader2, Image as ImageIcon } from "lucide-react";

type GalleryUploadProps = {
  currentImages?: { id: string; imageUrl: string }[];
  onImagesChange: (newImages: string[], removedIds: string[]) => void;
};

export function GalleryUpload({ currentImages = [], onImagesChange }: GalleryUploadProps) {
  const [newImages, setNewImages] = useState<string[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const displayedExistingImages = currentImages.filter(
    (img) => !removedImageIds.includes(img.id)
  );

  const onError = (err: any) => {
    console.error("Error", err);
    setIsUploading(false);
  };
  
  const onSuccess = (res: any) => {
    console.log("Success", res);
    setIsUploading(false);
    if (res && res.url) {
      const updatedNewImages = [...newImages, res.url];
      setNewImages(updatedNewImages);
      onImagesChange(updatedNewImages, removedImageIds);
    }
  };

  const handleUploadStart = () => {
    setIsUploading(true);
  };

  const removeNewImage = (index: number) => {
    const updated = newImages.filter((_, i) => i !== index);
    setNewImages(updated);
    onImagesChange(updated, removedImageIds);
  };

  const removeExistingImage = (id: string) => {
    const updatedRemoved = [...removedImageIds, id];
    setRemovedImageIds(updatedRemoved);
    onImagesChange(newImages, updatedRemoved);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-slate-700">Gallery Images</label>
        {isUploading && (
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Loader2 className="h-3 w-3 animate-spin" /> Uploading...
          </span>
        )}
      </div>

      <IKContext
        urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
        publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
        authenticator={async () => {
          try {
            const response = await fetch("/api/imagekit-auth");
            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Authentication failed: ${response.status} ${errorText}`);
            }
            const data = await response.json();
            return data;
          } catch (error) {
            console.error("ImageKit auth error:", error);
            throw error;
          }
        }}
      >
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {displayedExistingImages.map((img) => (
            <div
              key={img.id}
              className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
            >
              <Image src={img.imageUrl} alt="Gallery image" fill className="object-cover" />
              <button
                type="button"
                onClick={() => removeExistingImage(img.id)}
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          {newImages.map((url, idx) => (
            <div
              key={`new-${idx}`}
              className="group relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-100 ring-2 ring-[var(--logo-green)]/50"
            >
              <Image src={url} alt="New upload" fill className="object-cover" />
              <div className="absolute left-0 top-0 rounded-br bg-[var(--logo-green)] px-1.5 py-0.5 text-[10px] text-white">
                New
              </div>
              <button
                type="button"
                onClick={() => removeNewImage(idx)}
                className="absolute right-1 top-1 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}

          <div className="relative flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100">
            <IKUpload
              fileName="gallery-upload"
              onError={onError}
              onSuccess={onSuccess}
              onUploadStart={handleUploadStart}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              accept="image/*"
            />
            <div className="pointer-events-none flex flex-col items-center gap-2 text-slate-500">
              {isUploading ? (
                <Loader2 className="h-8 w-8 animate-spin text-[var(--logo-green)]" />
              ) : (
                <Upload className="h-8 w-8" />
              )}
              <span className="text-xs font-medium">
                {isUploading ? "Uploading..." : "Add Image"}
              </span>
            </div>
          </div>
        </div>
      </IKContext>

      {displayedExistingImages.length === 0 && newImages.length === 0 && !isUploading && (
        <div className="rounded-lg border-2 border-dashed border-slate-200 py-4 text-center text-sm text-slate-500">
          No images selected. Add some images to your gallery event.
        </div>
      )}
    </div>
  );
}
