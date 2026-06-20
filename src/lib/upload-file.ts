import { cloudinary } from "@/lib/cloudinary";

export const uploadFolders = {
  vendorLogos: "vendor-logos",
  vendorFactory: "vendor-factory",
  rfqDocuments: "rfq-documents",
  quoteDocuments: "quote-documents",
  quickBookingImages: "quick-booking-images",
  milestoneProof: "milestone-proof",
  projectMessages: "project-messages"
} as const;

export type UploadFolder = (typeof uploadFolders)[keyof typeof uploadFolders];

export type UploadedFile = {
  secure_url: string;
  public_id: string;
};

export async function uploadFile(file: File, folder: UploadFolder): Promise<UploadedFile> {
  const buffer = Buffer.from(await file.arrayBuffer());

  return new Promise<UploadedFile>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto"
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary upload failed"));
          return;
        }

        resolve({
          secure_url: result.secure_url,
          public_id: result.public_id
        });
      }
    );

    stream.end(buffer);
  });
}

export async function uploadFiles(files: File[], folder: UploadFolder) {
  const realFiles = files.filter((file) => file.size > 0);
  return Promise.all(realFiles.map((file) => uploadFile(file, folder)));
}
