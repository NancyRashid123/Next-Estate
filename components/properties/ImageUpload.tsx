"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { TbPhotoPlus } from "react-icons/tb";

interface ImageUploadProps {
  preview: string | null;
  onChange: (file: File) => void;
}

export default function ImageUpload({ preview, onChange }: ImageUploadProps) {
  const t = useTranslations("ImageUpload");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    onChange(file);
  };

  return (
    <div className="relative w-full">
      <label
        htmlFor="image-upload"
        className="relative flex min-h-55 cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border-2 border-dashed border-gray-300 p-10 transition hover:bg-gray-50"
      >
        {!preview ? (
          <>
            <TbPhotoPlus size={36} className="text-gray-400" />

            <p className="text-sm font-medium text-gray-700">{t("upload")}</p>

            <p className="text-xs text-gray-500">{t("count")}</p>
          </>
        ) : (
          <Image
            src={preview}
            alt={t("alt")}
            className="rounded-xl object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
          />
        )}
      </label>

      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
      />
    </div>
  );
}
