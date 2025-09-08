import { Upload, Loader2 } from "lucide-react";
import React, { useState } from "react";

interface ImageUploaderProps {
  cloudName: string;
  uploadPreset: string;
  onUpload: (url: string) => void;
  onLoadingChange?: (loading: boolean) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  cloudName,
  uploadPreset,
  onUpload,
  onLoadingChange,
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Preview before upload
    setPreview(URL.createObjectURL(file));

    // Upload to Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    setLoading(true);
    onLoadingChange?.(true); // notify parent

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      if (data.secure_url) {
        onUpload(data.secure_url);
      }
    } catch (err) {
      console.error("Cloudinary Upload Error:", err);
    } finally {
      setLoading(false);
      onLoadingChange?.(false);
    }
  };

  return (
    <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center relative">
      {!preview && !loading && (
        <>
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-300">Drop or select your image</p>
        </>
      )}

      {preview && (
        <div className="relative ">
          <img
            src={preview}
            alt="Preview"
            className={`w-full h-60 object-cover rounded-lg border transition ${
              loading ? "opacity-50" : "opacity-100"
            }`}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg">
              <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
          )}
        </div>
      )}

      <input
        type="file"
        name="image"
        accept="image/*"
        className="absolute inset-0 opacity-0 cursor-pointer"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ImageUploader;
