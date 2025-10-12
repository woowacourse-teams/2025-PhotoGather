export interface PresignedUrlResponse {
  signedUrls: Record<string, string>;
}

export interface UploadedPhoto {
  uploadFileName: string;
  originalName: string;
}
