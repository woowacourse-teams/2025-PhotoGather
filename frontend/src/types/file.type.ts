export interface LocalFile {
  id: number;
  originFile: File;
  previewUrl: string;
  capturedAt: string | null;
  capacityValue: number;
}

export interface PreviewFile {
  id: number;
  previewUrl: string;
}

export type UploadFileState = 'idle' | 'signed' | 'uploaded' | 'failed';

export interface UploadFile {
  id: number;
  originFile: File;
  objectKey: string;
  presignedUrl: string;
  capturedAt: string | null;
  capacityValue: number;
  state: UploadFileState;
}
