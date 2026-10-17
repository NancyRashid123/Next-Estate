import cloudinary from "@/lib/cloudinary";
export interface CloudinaryUploadResult {
  secureURL: string;
  publicID: string;
}
export const uploadToCloudinary = async (
  file: File,
): Promise<CloudinaryUploadResult> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "next\_estate", format: "webp" },
      (error, result) => {
        if (error || !result) {
          return reject(new Error("Failed to upload image to Cloudinary"));
        }
        resolve({ secureURL: result.secure_url, publicID: result.public_id });
      },
    );
    uploadStream.end(buffer);
  });
};
