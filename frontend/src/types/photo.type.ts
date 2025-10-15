export interface PresignedUrlResponse {
  signedUrls: Record<string, string>;
}

export interface UploadedPhoto {
  uploadFileName: string;
  originalName: string;
}

export interface Photo {
  id: number;
  originalName: string;
  path: string;
}
